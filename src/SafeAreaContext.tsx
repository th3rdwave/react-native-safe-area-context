import * as React from 'react';
import { Dimensions, StyleSheet, ViewProps } from 'react-native';
import { NativeSafeAreaProvider } from './NativeSafeAreaProvider';
import type {
  EdgeInsets,
  InsetChangedEvent,
  Metrics,
  InitialMetricsState,
  Rect,
} from './SafeArea.types';

const isDev = process.env.NODE_ENV !== 'production';

export const SafeAreaInsetsContext = React.createContext<EdgeInsets | null>(
  null,
);
if (isDev) {
  SafeAreaInsetsContext.displayName = 'SafeAreaInsetsContext';
}

export const SafeAreaFrameContext = React.createContext<Rect | null>(null);
if (isDev) {
  SafeAreaFrameContext.displayName = 'SafeAreaFrameContext';
}

export const SafeAreaGetLatestWindowMetricsContext = React.createContext<
  (() => InitialMetricsState | Metrics) | null
>(null);
if (isDev) {
  SafeAreaGetLatestWindowMetricsContext.displayName =
    'SafeAreaGetLatestWindowMetricsContext';
}

export const SafeAreaAddListenerContext = React.createContext<
  ((callback: (metrics: Metrics) => void) => () => void) | null
>(null);

export interface SafeAreaProviderProps extends ViewProps {
  children?: React.ReactNode;
  initialMetrics?: Metrics | null;
  /**
   * @deprecated
   */
  initialSafeAreaInsets?: EdgeInsets | null;
}

export function SafeAreaProvider({
  children,
  initialMetrics,
  initialSafeAreaInsets,
  style,
  ...others
}: SafeAreaProviderProps) {
  const listeners = React.useRef<((metrics: Metrics) => void)[]>([]);

  const parentInsets = useParentSafeAreaInsets();
  const parentFrame = useParentSafeAreaFrame();

  const [metrics, setMetrics] = React.useState<Metrics | InitialMetricsState>({
    frame: initialMetrics?.frame ??
      parentFrame ?? {
        // Backwards compat so we render anyway if we don't have frame.
        x: 0,
        y: 0,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
      },

    insets:
      initialMetrics?.insets ?? initialSafeAreaInsets ?? parentInsets ?? null,
  });

  const latestMetrics = React.useRef(metrics);

  const onInsetsChange = React.useCallback(
    (event: InsetChangedEvent) => {
      const {
        nativeEvent: { frame: nextFrame, insets: nextInsets },
      } = event;

      setMetrics((currentMetrics) => {
        const { frame, insets } = currentMetrics;

        const didFrameChange =
          nextFrame &&
          (nextFrame.height !== frame.height ||
            nextFrame.width !== frame.width ||
            nextFrame.x !== frame.x ||
            nextFrame.y !== frame.y);

        const didInsetsChange =
          !insets ||
          nextInsets.bottom !== insets.bottom ||
          nextInsets.left !== insets.left ||
          nextInsets.right !== insets.right ||
          nextInsets.top !== insets.top;

        if (didFrameChange || didInsetsChange) {
          const nextMetrics = {
            frame: didFrameChange ? nextFrame : frame,
            insets: didInsetsChange ? nextInsets : insets,
          };

          latestMetrics.current = nextMetrics;

          listeners.current.forEach((listener) => listener(nextMetrics));

          return nextMetrics;
        } else {
          return currentMetrics;
        }
      });
    },
    [setMetrics],
  );

  const getLatestWindowMetrics = React.useCallback(() => {
    return latestMetrics.current;
  }, [latestMetrics]);

  const addListener = React.useCallback(
    (listener: (metrics: Metrics) => void) => {
      listeners.current.push(listener);

      const unsubscribe = () => {
        const index = listeners.current.indexOf(listener);
        if (index > -1) {
          listeners.current.splice(index, 1);
        }
      };

      return unsubscribe;
    },
    [listeners],
  );

  return (
    <NativeSafeAreaProvider
      style={StyleSheet.compose(styles.fill, style)}
      onInsetsChange={onInsetsChange}
      {...others}
    >
      {metrics.insets != null ? (
        <SafeAreaFrameContext.Provider value={metrics.frame}>
          <SafeAreaInsetsContext.Provider value={metrics.insets}>
            <SafeAreaGetLatestWindowMetricsContext.Provider
              value={getLatestWindowMetrics}
            >
              <SafeAreaAddListenerContext.Provider value={addListener}>
                {children}
              </SafeAreaAddListenerContext.Provider>
            </SafeAreaGetLatestWindowMetricsContext.Provider>
          </SafeAreaInsetsContext.Provider>
        </SafeAreaFrameContext.Provider>
      ) : null}
    </NativeSafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  fill: { flex: 1 },
});

function useParentSafeAreaInsets(): EdgeInsets | null {
  return React.useContext(SafeAreaInsetsContext);
}

function useParentSafeAreaFrame(): Rect | null {
  return React.useContext(SafeAreaFrameContext);
}

const NO_INSETS_ERROR =
  'No safe area value available. Make sure you are rendering `<SafeAreaProvider>` at the top of your app.';

export function useSafeAreaInsets(): EdgeInsets {
  const insets = React.useContext(SafeAreaInsetsContext);
  if (insets == null) {
    throw new Error(NO_INSETS_ERROR);
  }
  return insets;
}

export function useSafeAreaFrame(): Rect {
  const frame = React.useContext(SafeAreaFrameContext);
  if (frame == null) {
    throw new Error(NO_INSETS_ERROR);
  }
  return frame;
}

export function useSafeAreaGetLatestWindowMetrics() {
  const getLatestWindowMetrics = React.useContext(
    SafeAreaGetLatestWindowMetricsContext,
  );
  if (getLatestWindowMetrics == null) {
    throw new Error(NO_INSETS_ERROR);
  }
  return getLatestWindowMetrics;
}

export function useSafeAreaAddListener() {
  const addListener = React.useContext(SafeAreaAddListenerContext);
  if (addListener == null) {
    throw new Error(NO_INSETS_ERROR);
  }
  return addListener;
}

export type WithSafeAreaInsetsProps = {
  insets: EdgeInsets;
};

export function withSafeAreaInsets<T>(
  WrappedComponent: React.ComponentType<T & WithSafeAreaInsetsProps>,
): React.ForwardRefExoticComponent<
  React.PropsWithoutRef<T> & React.RefAttributes<unknown>
> {
  return React.forwardRef((props: T, ref: React.Ref<unknown>) => {
    const insets = useSafeAreaInsets();
    return <WrappedComponent {...props} insets={insets} ref={ref} />;
  });
}

/**
 * @deprecated
 */
export function useSafeArea(): EdgeInsets {
  return useSafeAreaInsets();
}

/**
 * @deprecated
 */
export const SafeAreaConsumer = SafeAreaInsetsContext.Consumer;

/**
 * @deprecated
 */
export const SafeAreaContext = SafeAreaInsetsContext;

function useLatest<T>(value: T) {
  const ref = React.useRef(value);
  ref.current = value;

  return ref;
}

export default useLatest;
