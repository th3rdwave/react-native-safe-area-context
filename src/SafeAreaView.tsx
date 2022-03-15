import * as React from 'react';
import type { NativeSafeAreaViewProps } from './SafeArea.types';
import NativeSafeAreaView from './specs/NativeSafeAreaView';

type NativeSafeAreaViewInstance = InstanceType<typeof NativeSafeAreaView>;

export type SafeAreaViewProps = NativeSafeAreaViewProps;

export const SafeAreaView = React.forwardRef<
  NativeSafeAreaViewInstance,
  SafeAreaViewProps
>(({ edges, ...props }, ref) => {
  return (
    <NativeSafeAreaView
      {...props}
      // Codegen doesn't support default values for array types so
      // set it here.
      edges={edges ?? ['bottom', 'left', 'right', 'top']}
      ref={ref}
    />
  );
});
