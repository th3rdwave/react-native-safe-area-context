import * as React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import ReactNavigationDetailScreen from './components/ReactNavigationDetailScreen';
import ReactNavigationHomeScreen from './components/ReactNavigationHomeScreen';
import ReactNavigationSettingsScreen from './components/ReactNavigationSettingsScreen';

const TabNavigator = createBottomTabNavigator({
  Home: ReactNavigationHomeScreen,
  Settings: ReactNavigationSettingsScreen,
});

TabNavigator.navigationOptions = {
  title: 'React Navigation 4',
};

const AppNavigator = createStackNavigator(
  {
    Tabs: TabNavigator,
    Details: ReactNavigationDetailScreen,
  },
  {
    initialRouteName: 'Tabs',
  },
);

const AppContainer = createAppContainer(AppNavigator);

export default function ReactNavigation4Example() {
  return (
    <SafeAreaProvider>
      <AppContainer />
    </SafeAreaProvider>
  );
}
