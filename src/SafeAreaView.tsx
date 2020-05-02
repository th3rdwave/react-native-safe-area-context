import * as React from 'react';
import { View, ViewProps } from 'react-native';
import { useSafeAreaInsets } from './SafeAreaContext';

export function SafeAreaView({
  style,
  ...rest
}: ViewProps & { children: React.ReactNode }) {
  const insets = useSafeAreaInsets();

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
