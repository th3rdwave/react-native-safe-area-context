import * as React from 'react';
import { Button, Text } from 'react-native';
import { ScreenProps } from '../types/Navigation';
import { SafeAreaViewVisualizer } from './SafeAreaViewVisualizer';
import { wrapScreen } from './wrapScreen';

function ReactNavigationModalDetailScreen({
  navigation,
}: ScreenProps<'ModalDetails'>) {
  const isV5 = typeof navigation.setOptions === 'function';
  const [headerShown, setHeaderShown] = React.useState(false);

  React.useLayoutEffect(() => {
    if (isV5) {
      navigation.setOptions({ headerShown });
    }
  }, [navigation, isV5, headerShown]);

  return (
    <SafeAreaViewVisualizer>
      <Text>Modal Details Screen</Text>
      <Button
        title="Go to Modal Details... again"
        onPress={() => navigation.push('ModalDetails')}
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

export default wrapScreen(ReactNavigationModalDetailScreen);
