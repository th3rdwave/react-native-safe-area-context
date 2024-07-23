import * as React from 'react';
import { Text } from 'react-native';

export function DataView({ data }: { data: object | null | undefined }) {
  return (
    <Text style={{ fontSize: 16, lineHeight: 24, color: '#292929' }}>
      {data == null
        ? 'null'
        : Object.entries(data)
            .map(([key, value]) => `${key}: ${value}`)
            .join('\n')}
    </Text>
  );
}
