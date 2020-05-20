import 'react-native-gesture-handler';
import * as React from 'react';
import { DevSettings, View, Text } from 'react-native';
import { enableScreens } from 'react-native-screens';
import AsyncStorage from '@react-native-community/async-storage';
import ReactNavigation4Example from './ReactNavigation4Example';
import ReactNavigation5Example from './ReactNavigation5Example';
import HooksExample from './HooksExample';
import NativeStackExample from './NativeStackExample';
import SafeAreaViewExample from './SafeAreaViewExample';

enableScreens();

const STORAGE_KEY = 'rnsac-current-example';

export default function App() {
  const [currentExample, setCurrentExample] = React.useState<string | null>(
    null,
  );

  React.useEffect(() => {
    async function loadCurrentExample() {
      const example = await AsyncStorage.getItem(STORAGE_KEY);
      setCurrentExample(example ?? null);
    }
    loadCurrentExample();
  }, []);

  React.useEffect(() => {
    async function saveCurrentExample() {
      if (currentExample != null) {
        await AsyncStorage.setItem(STORAGE_KEY, currentExample);
      }
    }
    saveCurrentExample();
  }, [currentExample]);

  React.useEffect(() => {
    DevSettings.addMenuItem('Show SafeAreaView Example', () => {
      setCurrentExample('safe-area-view');
    });
    DevSettings.addMenuItem('Show Hooks Example', () => {
      setCurrentExample('hooks');
    });
    DevSettings.addMenuItem('Show React Navigation 4 Example', () => {
      setCurrentExample('react-navigation-4');
    });
    DevSettings.addMenuItem('Show React Navigation 5 Example', () => {
      setCurrentExample('react-navigation-5');
    });
    DevSettings.addMenuItem('Show Native Stack Example', () => {
      setCurrentExample('native-stack');
    });
  }, []);

  switch (currentExample) {
    case 'safe-area-view':
      return <SafeAreaViewExample />;
    case 'hooks':
      return <HooksExample />;
    case 'react-navigation-4':
      return <ReactNavigation4Example />;
    case 'react-navigation-5':
      return <ReactNavigation5Example />;
    case 'native-stack':
      return <NativeStackExample />;
    default:
      return (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            padding: 24,
          }}
        >
          <Text style={{ textAlign: 'center', fontSize: 14 }}>
            Open the dev menu to choose an example
          </Text>
        </View>
      );
  }
}
