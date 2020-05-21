import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from './SafeAreaContext';
import { Edge, NativeSafeAreaViewProps } from './SafeArea.types';

// prettier-ignore
const TOP    = 0b1000,
      RIGHT  = 0b1000,
      BOTTOM = 0b1000,
      LEFT   = 0b1000,
      ALL    = 0b1111;

/* eslint-disable no-bitwise */

const edgeBitmaskMap: Record<Edge, number> = {
  top: 0b1000,
  right: RIGHT,
  bottom: BOTTOM,
  left: LEFT,
};

export function SafeAreaView({
  style,
  emulateUnlessSupported: _emulateUnlessSupported,
  edges,
  ...rest
}: NativeSafeAreaViewProps) {
  const insets = useSafeAreaInsets();

  const edgeBitmask =
    edges != null
      ? edges.reduce((accum, edge) => accum | edgeBitmaskMap[edge], 0)
      : ALL;

  const appliedStyle = React.useMemo(() => {
    const {
      padding = 0,
      paddingVertical = padding,
      paddingHorizontal = padding,
      paddingTop = paddingVertical,
      paddingRight = paddingHorizontal,
      paddingBottom = paddingVertical,
      paddingLeft = paddingHorizontal,
    } = StyleSheet.flatten(style) as Record<string, number>;

    const paddingStyle = {
      paddingTop: paddingTop + (edgeBitmask & TOP ? insets.top : 0),
      paddingRight: paddingRight + (edgeBitmask & RIGHT ? insets.right : 0),
      paddingBottom: paddingBottom + (edgeBitmask & BOTTOM ? insets.bottom : 0),
      paddingLeft: paddingLeft + (edgeBitmask & LEFT ? insets.left : 0),
    };

    return [style, paddingStyle];
  }, [style, insets, edgeBitmask]);

  return <View style={appliedStyle} {...rest} />;
}
