import * as React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import NativeSafeAreaProvider from './NativeSafeAreaProvider';
import { EdgeInsets, InsetChangedEvent, Metrics, Rect } from './SafeArea.types';

export const SafeAreaInsetsContext = React.createContext<EdgeInsets | null>(
  null,
);

export const SafeAreaFrameContext = React.createContext<Rect | null>(null);

export interface SafeAreaViewProps {
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
}: SafeAreaViewProps) {
  const parentInsets = useParentSafeAreaInsets();
  const parentFrame = useParentSafeAreaFrame();
  const [insets, setInsets] = React.useState<EdgeInsets | null>(
    initialMetrics?.insets ?? initialSafeAreaInsets ?? parentInsets ?? null,
  );
  const [frame, setFrame] = React.useState<Rect>(
    initialMetrics?.frame ??
      parentFrame ?? {
        // Backwards compat so we render anyway if we don't have frame.
        x: 0,
        y: 0,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
      },
  );
  const onInsetsChange = React.useCallback((event: InsetChangedEvent) => {
    // Backwards compat with old native code that won't send frame.
    if (event.nativeEvent.frame != null) {
      setFrame(event.nativeEvent.frame);
    }
    setInsets(event.nativeEvent.insets);
  }, []);

  return (
    <NativeSafeAreaProvider style={styles.fill} onInsetsChange={onInsetsChange}>
      {insets != null ? (
        <SafeAreaFrameContext.Provider value={frame}>
          <SafeAreaInsetsContext.Provider value={insets}>
            {children}
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

export function useSafeAreaInsets(): EdgeInsets {
  const safeArea = React.useContext(SafeAreaInsetsContext);
  if (safeArea == null) {
    throw new Error(
      'No safe area insets value available. Make sure you are rendering `<SafeAreaProvider>` at the top of your app.',
    );
  }
  return safeArea;
}

export function useSafeAreaFrame(): Rect {
  const frame = React.useContext(SafeAreaFrameContext);
  if (frame == null) {
    throw new Error(
      'No safe area frame value available. Make sure you are rendering `<SafeAreaProvider>` at the top of your app.',
    );
  }
  return frame;
}

export function withSafeAreaInsets<T>(
  WrappedComponent: React.ComponentType<T>,
) {
  return (props: T) => (
    <SafeAreaConsumer>
      {(insets) => <WrappedComponent {...props} insets={insets} />}
    </SafeAreaConsumer>
  );
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
