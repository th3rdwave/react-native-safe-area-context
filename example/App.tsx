import * as React from 'react';
import { View, Text, StatusBar, Button } from 'react-native';

// import { SafeAreaProvider, useSafeArea } from 'react-native-safe-area-context'; in your app.
import { SafeAreaProvider, useSafeArea } from '../src';

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
        </View>
      </View>
    </>
  );
};

export default function App() {
  const [refreshKey, setRefreshKey] = React.useState(1);
  return (
    <View key={refreshKey} style={{ flex: 1 }}>
      <SafeAreaProvider>
        <Screen />
        <Button
          title="Refresh"
          onPress={() => setRefreshKey(state => state + 1)}
        />
      </SafeAreaProvider>
    </View>
  );
}
