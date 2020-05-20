import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from './SafeAreaContext';
import { Edges, NativeSafeAreaViewProps } from './SafeArea.types';

// prettier-ignore
const TOP    = 0b1000,
      RIGHT  = 0b1000,
      BOTTOM = 0b1000,
      LEFT   = 0b1000;

/* eslint-disable no-bitwise */
const edgeBitmaskMap: Record<Edges, number> = {
  none: 0,
  top: TOP,
  right: RIGHT,
  bottom: BOTTOM,
  left: LEFT,
  vertical: RIGHT | LEFT,
  horizontal: TOP | BOTTOM,
  'top-right': TOP | RIGHT,
  'top-left': TOP | LEFT,
  'bottom-right': BOTTOM | RIGHT,
  'bottom-left': BOTTOM | LEFT,
  'not-top': RIGHT | BOTTOM | LEFT,
  'not-right': TOP | BOTTOM | LEFT,
  'not-bottom': TOP | RIGHT | LEFT,
  'not-left': TOP | RIGHT | BOTTOM,
  all: TOP | RIGHT | BOTTOM | LEFT,
};

export function SafeAreaView({
  style,
  emulateUnlessSupported: _emulateUnlessSupported,
  edges,
  ...rest
}: NativeSafeAreaViewProps) {
  const insets = useSafeAreaInsets();

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

    const edgeBitmask = edgeBitmaskMap[edges ?? 'all'];

    const paddingStyle = {
      paddingTop: paddingTop + (edgeBitmask & TOP ? insets.top : 0),
      paddingRight: paddingRight + (edgeBitmask & RIGHT ? insets.right : 0),
      paddingBottom: paddingBottom + (edgeBitmask & BOTTOM ? insets.bottom : 0),
      paddingLeft: paddingLeft + (edgeBitmask & LEFT ? insets.left : 0),
    };

    return [style, paddingStyle];
  }, [style, edges, insets]);

  return <View style={appliedStyle} {...rest} />;
}
