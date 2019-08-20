import * as React from 'react';
import { StyleSheet } from 'react-native';
import { EdgeInsets, InsetChangedEvent } from './SafeArea.types';
import NativeSafeAreaView from './NativeSafeAreaView';

export const SafeAreaContext = React.createContext<EdgeInsets | null>(null);

export interface SafeAreaViewProps {
  children?: React.ReactNode;
}

export function SafeAreaProvider({ children }: SafeAreaViewProps) {
  const [insets, setInsets] = React.useState<EdgeInsets | null>(null);
  const onInsetsChange = React.useCallback((event: InsetChangedEvent) => {
    setInsets(event.nativeEvent.insets);
  }, []);

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

export const SafeAreaConsumer = SafeAreaContext.Consumer;

export function useSafeArea(): EdgeInsets {
  const safeArea = React.useContext(SafeAreaContext);
  if (safeArea == null) {
    throw new Error(
      'No safe area value available. Make sure you are rendering `<SafeAreaProvider>` at the top of your app.',
    );
  }
  return safeArea;
}

export { EdgeInsets };
