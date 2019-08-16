import * as React from 'react';
import {
  requireNativeComponent,
  NativeSyntheticEvent,
  StyleSheet,
} from 'react-native';

const NativeSafeAreaView = requireNativeComponent('RNCSafeAreaView');

export interface EdgeInsets {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

const SafeAreaContext = React.createContext<EdgeInsets | null>(null);

export interface SafeAreaViewProps {
  children?: React.ReactNode;
}

export function SafeAreaProvider({ children }: SafeAreaViewProps) {
  const [insets, setInsets] = React.useState<EdgeInsets | null>(null);
  const onInsetsChange = React.useCallback(
    (event: NativeSyntheticEvent<{ insets: EdgeInsets }>) => {
      setInsets(event.nativeEvent.insets);
    },
    [],
  );

  return (
    <NativeSafeAreaView style={styles.fill} onInsetsChange={onInsetsChange}>
      {insets !== null ? (
        <SafeAreaContext.Provider value={insets}>
          {children}
        </SafeAreaContext.Provider>
      ) : null}
    </NativeSafeAreaView>
  );
}

const styles = StyleSheet.create({
  fill: { flex: 1 },
});

export function useSafeArea(): EdgeInsets {
  const safeArea = React.useContext(SafeAreaContext);
  if (safeArea == null) {
    throw new Error(
      'No safe area value available. Make sure you are rendering `<SafeAreaProvider>` at the top of your app.',
    );
  }
  return safeArea;
}
