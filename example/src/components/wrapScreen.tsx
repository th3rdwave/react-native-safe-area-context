import * as React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-view';

const WRAP = false;

export function wrapScreen<T>(Component: React.ComponentType<T>) {
  return function WrappedScreen(props: T) {
    if (!WRAP) {
      return <Component {...props} />;
    }
    return (
      <SafeAreaProvider>
        <Component {...props} />
      </SafeAreaProvider>
    );
  };
}
