import * as React from 'react';
import type {
  EdgeRecord,
  NativeSafeAreaViewInstance,
  NativeSafeAreaViewProps,
} from './SafeArea.types';
import NativeSafeAreaView from './specs/NativeSafeAreaView';
import { useMemo } from 'react';

export type SafeAreaViewProps = NativeSafeAreaViewProps;

export const SafeAreaView = React.forwardRef<
  NativeSafeAreaViewInstance,
  SafeAreaViewProps
>(({ edges, ...props }, ref) => {
  const nativeEdges = useMemo(() => {
    return Array.isArray(edges)
      ? edges.reduce<EdgeRecord>((accum, edge) => {
          accum[edge] = 'additive';
          return accum;
        }, {})
      : edges;
  }, [edges]);

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
