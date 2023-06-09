import * as React from 'react';
import type {
  EdgeRecord,
  NativeSafeAreaViewInstance,
  NativeSafeAreaViewProps,
} from './SafeArea.types';
import NativeSafeAreaView from './specs/NativeSafeAreaView';
import { useMemo } from 'react';

const defaultEdges: EdgeRecord = {
  top: 'additive',
  left: 'additive',
  bottom: 'additive',
  right: 'additive',
};

export type SafeAreaViewProps = NativeSafeAreaViewProps;

export const SafeAreaView = React.forwardRef<
  NativeSafeAreaViewInstance,
  SafeAreaViewProps
>(({ edges, ...props }, ref) => {
  const nativeEdges = useMemo(() => {
    const _edges = Array.isArray(edges)
      ? edges.reduce<EdgeRecord>((accum, edge) => {
          accum[edge] = 'additive';
          return accum;
        }, {})
      : edges;
    return _edges ?? defaultEdges;
  }, [edges]);

  return <NativeSafeAreaView {...props} edges={nativeEdges} ref={ref} />;
});
