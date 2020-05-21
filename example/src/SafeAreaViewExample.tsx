import * as React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function ReactNativeSafeAreaView() {
  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={{ flex: 1, backgroundColor: 'red', padding: 10 }}
        // This is the default - change it to see how it works!
        edges={['top', 'right', 'bottom', 'left']}
      >
        <View
          style={{ flex: 1, backgroundColor: 'blue', justifyContent: 'center' }}
        >
          <Text style={{ color: 'white', textAlign: 'center' }}>
            Safe area with 10px padding added
          </Text>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
