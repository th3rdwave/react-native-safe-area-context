import * as React from 'react';
import {
  requireNativeComponent,
  NativeSyntheticEvent,
  ViewStyle,
  StyleSheet,
} from 'react-native';

const NativeSafeAreaView = requireNativeComponent('RNCSafeAreaView');

export interface EdgeInsets {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

export interface SafeAreaViewProps {
  children: (insets: EdgeInsets) => React.ReactNode;
  style?: ViewStyle;
}

export default function SafeAreaView({ children, style }: SafeAreaViewProps) {
  const [insets, setInsets] = React.useState<EdgeInsets | null>(null);
  const onInsetsChange = React.useCallback(
    (event: NativeSyntheticEvent<{ insets: EdgeInsets }>) => {
      setInsets(event.nativeEvent.insets);
    },
    [],
  );

  console.warn(insets);

  return (
    <NativeSafeAreaView
      style={[styles.fill, style]}
      onInsetsChange={onInsetsChange}
    >
      {insets !== null ? children(insets) : null}
    </NativeSafeAreaView>
  );
}

const styles = StyleSheet.create({
  fill: { flex: 1 },
});
