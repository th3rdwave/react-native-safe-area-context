import * as React from 'react';
import { Button, Text } from 'react-native';
import { ScreenProps } from '../types/Navigation';
import { SafeAreaViewVisualizer } from './SafeAreaViewVisualizer';

export default function ReactNavigationDetailScreen({
  navigation,
}: ScreenProps<'Details'>) {
  const isV5 = typeof navigation.setOptions === 'function';
  const [headerShown, setHeaderShown] = React.useState(true);

  React.useLayoutEffect(() => {
    if (isV5) {
      navigation.setOptions({ headerShown });
    }
  }, [navigation, isV5, headerShown]);

  return (
    <SafeAreaViewVisualizer>
      <Text>Details Screen</Text>
      <Button
        title="Go to Details... again"
        onPress={() => navigation.push('Details')}
      />
      <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
      <Button title="Go back" onPress={() => navigation.goBack()} />
      {isV5 && (
        <Button
          title="Toggle header"
          onPress={() => {
            setHeaderShown((state) => !state);
          }}
        />
      )}
    </SafeAreaViewVisualizer>
  );
}
