import * as React from 'react';
import { StyleSheet } from 'react-native';
import NativeSafeAreaView from './NativeSafeAreaView';
import { EdgeInsets, InsetChangedEvent, Metrics, Rect } from './SafeArea.types';

export const SafeAreaInsetsContext = React.createContext<EdgeInsets | null>(
  null,
);

export const SafeAreaFrameContext = React.createContext<Rect | null>(null);

export interface SafeAreaViewProps {
  children?: React.ReactNode;
  initialMetrics?: Metrics | null;
}

export function SafeAreaProvider({
  children,
  initialMetrics,
}: SafeAreaViewProps) {
  const parentInsets = useParentSafeAreaInsets();
  const parentFrame = useParentSafeAreaFrame();
  const [insets, setInsets] = React.useState<EdgeInsets | null>(
    initialMetrics?.insets ?? parentInsets ?? null,
  );
  const [frame, setFrame] = React.useState<Rect | null>(
    initialMetrics?.frame ?? parentFrame ?? null,
  );
  const onInsetsChange = React.useCallback((event: InsetChangedEvent) => {
    setInsets(event.nativeEvent.insets);
    setFrame(event.nativeEvent.frame);
  }, []);

  return (
    <NativeSafeAreaView style={styles.fill} onInsetsChange={onInsetsChange}>
      {insets != null && frame != null ? (
        <SafeAreaFrameContext.Provider value={frame}>
          <SafeAreaInsetsContext.Provider value={insets}>
            {children}
          </SafeAreaInsetsContext.Provider>
        </SafeAreaFrameContext.Provider>
      ) : null}
    </NativeSafeAreaView>
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

/**
 * @deprecated
 */
export function useSafeArea(): EdgeInsets {
  console.warn('useSafeArea is deprecated, use useSafeAreaInsets instead.');
  return useSafeAreaInsets();
}
