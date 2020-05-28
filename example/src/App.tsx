import 'react-native-gesture-handler';
import * as React from 'react';
import { DevSettings, View, Text, StatusBar } from 'react-native';
import { enableScreens } from 'react-native-screens';
import AsyncStorage from '@react-native-community/async-storage';
import HooksExample from './HooksExample';
import SafeAreaViewExample from './SafeAreaViewExample';
import ReactNavigation4Example from './ReactNavigation4Example';
import ReactNavigation5Example from './ReactNavigation5Example';
import NativeStackExample from './NativeStackExample';
import ReactNativeSafeAreaView from './ReactNativeSafeAreaView';

enableScreens();

const STORAGE_KEY = 'rnsac-current-example';

export default function App() {
  const [currentExample, setCurrentExample] = React.useState<string | null>(
    null,
  );
  const [statusBarHidden, setStatusBarHidden] = React.useState(false);

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
    DevSettings.addMenuItem('Toggle Status Bar', () => {
      setStatusBarHidden((s) => !s);
    });
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
    DevSettings.addMenuItem('Show React Native Safe Area View Example', () => {
      setCurrentExample('react-native-safe-area-view');
    });
  }, []);

  let content: React.ReactElement<unknown>;
  switch (currentExample) {
    case 'safe-area-view':
      content = <SafeAreaViewExample />;
      break;
    case 'hooks':
      content = <HooksExample />;
      break;
    case 'react-navigation-4':
      content = <ReactNavigation4Example />;
      break;
    case 'react-navigation-5':
      content = <ReactNavigation5Example />;
      break;
    case 'native-stack':
      content = <NativeStackExample />;

      break;
    case 'react-native-safe-area-view':
      content = <ReactNativeSafeAreaView />;
      break;
    default:
      content = (
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
      break;
  }

  return (
    <>
      <StatusBar
        hidden={statusBarHidden}
        backgroundColor="rgba(0, 0, 0, 0.3)"
      />
      {content}
    </>
  );
}
