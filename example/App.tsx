import * as React from 'react';
import { View, Text, StatusBar } from 'react-native';

// import { SafeAreaProvider, useSafeArea } from 'react-native-safe-area-context'; in your app.
import {
  SafeAreaProvider,
  useSafeArea,
  initialWindowSafeAreaInsets,
} from '../src';

const Screen = () => {
  const insets = useSafeArea();

  return (
    <>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor="transparent"
      />
      <View
        style={{
          flex: 1,
          backgroundColor: 'red',
          paddingTop: insets.top,
          paddingLeft: insets.left,
          paddingBottom: insets.bottom,
          paddingRight: insets.right,
        }}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: 'white',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text>Insets: {JSON.stringify(insets, null, 2)}</Text>
          <Text>
            Initial insets:{' '}
            {JSON.stringify(initialWindowSafeAreaInsets, null, 2)}
          </Text>
        </View>
      </View>
    </>
  );
};

export default function App() {
  return (
    <SafeAreaProvider>
      <Screen />
    </SafeAreaProvider>
  );
}
