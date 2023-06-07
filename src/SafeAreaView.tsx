import * as React from 'react';
import type {
  EdgeRecord,
  NativeSafeAreaViewInstance,
  NativeSafeAreaViewProps,
} from './SafeArea.types';
import NativeSafeAreaView from './specs/NativeSafeAreaView';

export type SafeAreaViewProps = NativeSafeAreaViewProps;

export const SafeAreaView = React.forwardRef<
  NativeSafeAreaViewInstance,
  SafeAreaViewProps
>(({ edges, ...props }, ref) => {
  const nativeEdges = Array.isArray(edges)
    ? edges.reduce<EdgeRecord>((accum, edge) => {
        accum[edge] = 'additive';
        return accum;
      }, {})
    : edges;

  return (
    <NativeSafeAreaView
      {...props}
      edges={
        nativeEdges ?? {
          top: 'additive',
          left: 'additive',
          bottom: 'additive',
          right: 'additive',
        }
      }
      ref={ref}
    />
  );
});
