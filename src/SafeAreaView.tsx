import * as React from 'react';
import type {
  NativeSafeAreaViewInstance,
  NativeSafeAreaViewProps,
} from './SafeArea.types';
import NativeSafeAreaView from './specs/NativeSafeAreaView';

export type SafeAreaViewProps = NativeSafeAreaViewProps;

export const SafeAreaView = React.forwardRef<
  NativeSafeAreaViewInstance,
  SafeAreaViewProps
>(({ edges, minPadding, ...props }, ref) => {
  return (
    <NativeSafeAreaView
      {...props}
      // Codegen doesn't support default values for array types so
      // set it here.
      edges={edges ?? ['bottom', 'left', 'right', 'top']}
      minPadding={minPadding ?? { top: 0, bottom: 0, left: 0, right: 0 }}
      ref={ref}
    />
  );
});
