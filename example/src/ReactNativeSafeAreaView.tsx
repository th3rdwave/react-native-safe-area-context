import * as React from 'react';
import { View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SafeAreaView from 'react-native-safe-area-view';

export default function ReactNativeSafeAreaView() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: 'red' }}>
        <View style={{ flex: 1, backgroundColor: 'blue' }} />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
