import * as React from 'react';
import { View, Text, StatusBar, ScrollView } from 'react-native';

import {
  SafeAreaProvider,
  useSafeAreaInsets,
  initialWindowMetrics,
  useSafeAreaFrame,
} from 'react-native-safe-area-context';

const DataView = ({ data }: { data: object | null | undefined }) => (
  <Text style={{ fontSize: 16, lineHeight: 24, color: '#292929' }}>
    {data == null
      ? 'null'
      : Object.entries(data)
          .map(([key, value]) => `${key}: ${value}`)
          .join('\n')}
  </Text>
);

const Card = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <View style={{ padding: 16, backgroundColor: 'white', marginBottom: 4 }}>
    <Text
      style={{
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
        color: '#292929',
      }}
    >
      {title}
    </Text>
    {children}
  </View>
);

const BORDER_WIDTH = 8;

function SimpleExampleScreen() {
  const insets = useSafeAreaInsets();
  const frame = useSafeAreaFrame();

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" />
      <View
        style={{
          width: frame.width,
          height: frame.height,
          backgroundColor: 'red',
          paddingTop: insets.top - BORDER_WIDTH,
          paddingLeft: insets.left - BORDER_WIDTH,
          paddingBottom: insets.bottom - BORDER_WIDTH,
          paddingRight: insets.right - BORDER_WIDTH,
          borderColor: 'blue',
          borderWidth: BORDER_WIDTH,
        }}
      >
        <ScrollView style={{ flex: 1, backgroundColor: '#eee' }}>
          <Card title="Provider insets">
            <DataView data={insets} />
          </Card>
          <Card title="Provider frame">
            <DataView data={frame} />
          </Card>
          <Card title="Initial window insets">
            <DataView data={initialWindowMetrics?.insets} />
          </Card>
          <Card title="Initial window frame">
            <DataView data={initialWindowMetrics?.frame} />
          </Card>
        </ScrollView>
      </View>
    </>
  );
}

export default function SimpleExample() {
  return (
    <View style={{ marginTop: 0, flex: 1 }}>
      <SafeAreaProvider>
        <SimpleExampleScreen />
      </SafeAreaProvider>
    </View>
  );
}
