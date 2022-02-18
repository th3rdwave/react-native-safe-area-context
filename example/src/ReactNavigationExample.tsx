import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import ReactNavigationDetailScreen from './components/ReactNavigationDetailScreen';
import ReactNavigationHomeScreen from './components/ReactNavigationHomeScreen';
import ReactNavigationSettingsScreen from './components/ReactNavigationSettingsScreen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import ReactNavigationModalDetailScreen from './components/ReactNavigationModalDetailScreen';
import { withProvider } from './components/withProvider';

const HomeScreenWithProvider = withProvider(ReactNavigationHomeScreen);
const SettingsScreenWithProvider = withProvider(ReactNavigationSettingsScreen);
const DetailScreenWithProvider = withProvider(ReactNavigationDetailScreen);
const ModalDetailScreenWithProvider = withProvider(
  ReactNavigationModalDetailScreen,
);

const Tab = createBottomTabNavigator();

function TabsScreen() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreenWithProvider} />
      <Tab.Screen name="Settings" component={SettingsScreenWithProvider} />
    </Tab.Navigator>
  );
}

const Stack = createStackNavigator();

export default function ReactNavigationExample() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            gestureEnabled: true,
          }}
        >
          <Stack.Screen name="Root">
            {() => (
              <Stack.Navigator>
                <Stack.Screen
                  name="Tabs"
                  component={TabsScreen}
                  options={{ title: 'React Navigation 5' }}
                />
                <Stack.Screen
                  name="Details"
                  component={DetailScreenWithProvider}
                />
              </Stack.Navigator>
            )}
          </Stack.Screen>
          <Stack.Screen
            name="ModalDetails"
            component={ModalDetailScreenWithProvider}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
