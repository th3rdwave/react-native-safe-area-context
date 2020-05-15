import 'react-native-gesture-handler';
import * as React from 'react';
import { DevSettings } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import ReactNavigation4Example from './ReactNavigation4Example';
import SimpleExample from './SimpleExample';

const STORAGE_KEY = 'rnsac-current-example';

export default function App() {
  const [currentExample, setCurrentExample] = React.useState<string | null>(
    null,
  );

  React.useEffect(() => {
    async function loadCurrentExample() {
      const example = await AsyncStorage.getItem(STORAGE_KEY);
      setCurrentExample(example ?? 'simple');
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
    DevSettings.addMenuItem('Show Simple Example', () => {
      setCurrentExample('simple');
    });
    DevSettings.addMenuItem('Show React Navigation 4 Example', () => {
      setCurrentExample('react-navigation-4');
    });
  }, []);

  switch (currentExample) {
    case 'simple':
      return <SimpleExample />;
    case 'react-navigation-4':
      return <ReactNavigation4Example />;
    default:
      return null;
  }
}
