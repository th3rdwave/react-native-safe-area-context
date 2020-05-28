import * as React from 'react';
import { Button, Text } from 'react-native';
import { ScreenProps } from '../types/Navigation';
import { SafeAreaViewVisualizer } from './SafeAreaViewVisualizer';
import { wrapScreen } from './wrapScreen';

function ReactNavigationHomeScreen({ navigation }: ScreenProps<'Home'>) {
  return (
    <SafeAreaViewVisualizer>
      <Text>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      />
      <Button
        title="Go to Modal Details"
        onPress={() => navigation.push('ModalDetails')}
      />
    </SafeAreaViewVisualizer>
  );
}

export default wrapScreen(ReactNavigationHomeScreen);
