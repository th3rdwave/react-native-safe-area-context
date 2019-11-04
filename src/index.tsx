import * as React from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';
import { EdgeInsets as EdgeInsetsT, InsetChangedEvent } from './SafeArea.types';
import NativeSafeAreaView from './NativeSafeAreaView';

export const SafeAreaContext = React.createContext<EdgeInsetsT | null>(null);

export interface SafeAreaViewProps {
  children?: React.ReactNode;
  initialSafeAreaInsets?: EdgeInsetsT | null;
}

export function SafeAreaProvider({
  children,
  initialSafeAreaInsets,
}: SafeAreaViewProps) {
  const parentInsets = useParentSafeArea();
  const [insets, setInsets] = React.useState<EdgeInsetsT | null | undefined>(
    initialSafeAreaInsets || parentInsets,
  );
  const onInsetsChange = React.useCallback((event: InsetChangedEvent) => {
    setInsets(event.nativeEvent.insets);
  }, []);

  return (
    <NativeSafeAreaView style={styles.fill} onInsetsChange={onInsetsChange}>
      {insets != null ? (
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

function useParentSafeArea(): React.ContextType<typeof SafeAreaContext> {
  return React.useContext(SafeAreaContext);
}

export function useSafeArea(): EdgeInsetsT {
  const safeArea = React.useContext(SafeAreaContext);
  if (safeArea == null) {
    throw new Error(
      'No safe area value available. Make sure you are rendering `<SafeAreaProvider>` at the top of your app.',
    );
  }
  return safeArea;
}

export function SafeAreaView({
  style,
  ...rest
}: ViewProps & { children: React.ReactNode }) {
  const insets = useSafeArea();

  return (
    <View
      style={[
        {
          paddingTop: insets.top,
          paddingRight: insets.right,
          paddingBottom: insets.bottom,
          paddingLeft: insets.left,
        },
        style,
      ]}
      {...rest}
    />
  );
}

export type EdgeInsets = EdgeInsetsT;
