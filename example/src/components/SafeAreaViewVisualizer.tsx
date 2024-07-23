import * as React from 'react';
import { Text, View } from 'react-native';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { DataView } from './DataView';

export function SafeAreaViewVisualizer({
  children,
}: {
  children: React.ReactNode;
}) {
  const insets = useSafeAreaInsets();
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: 'red',
      }}
    >
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'white',
        }}
      >
        {children}
      </View>
      <View
        style={{
          position: 'absolute',
          top: insets.top + 16,
          left: insets.left + 16,
          borderColor: '#eee',
          borderWidth: 1,
          borderRadius: 3,
          padding: 8,
        }}
      >
        <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 4 }}>
          Insets
        </Text>
        <DataView data={insets} />
      </View>
    </SafeAreaView>
  );
}
