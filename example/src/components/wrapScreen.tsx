import * as React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-view';

export function wrapScreen<T>(Component: React.ComponentType<T>) {
  return function WrappedScreen(props: T) {
    return (
      <SafeAreaProvider>
        <Component {...props} />
      </SafeAreaProvider>
    );
  };
}
