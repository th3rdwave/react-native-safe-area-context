import * as React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-view';

type Routes = {
  Home: undefined;
  Details: undefined;
  ModalDetails: undefined;
  Settings: undefined;
};

export function wrapScreen<T>(Component: React.ComponentType<T>) {
  return function WrappedScreen(props: T) {
    return (
      <SafeAreaProvider>
        <Component {...props} />
      </SafeAreaProvider>
    );
  };
}
