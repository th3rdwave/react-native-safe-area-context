import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import ReactNavigationDetailScreen from './components/ReactNavigationDetailScreen';
import ReactNavigationHomeScreen from './components/ReactNavigationHomeScreen';
import ReactNavigationSettingsScreen from './components/ReactNavigationSettingsScreen';
import { SafeAreaProvider } from 'react-native-safe-area-view';
import ReactNavigationModalDetailScreen from './components/ReactNavigationModalDetailScreen';

const Tab = createBottomTabNavigator();

function TabsScreen() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={ReactNavigationHomeScreen} />
      <Tab.Screen name="Settings" component={ReactNavigationSettingsScreen} />
    </Tab.Navigator>
  );
}

const Stack = createStackNavigator();

export default function ReactNavigation5Example() {
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
                  component={ReactNavigationDetailScreen}
                />
              </Stack.Navigator>
            )}
          </Stack.Screen>
          <Stack.Screen
            name="ModalDetails"
            component={ReactNavigationModalDetailScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
