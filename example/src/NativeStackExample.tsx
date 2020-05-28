import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import * as React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-view';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import ReactNavigationDetailScreen from './components/ReactNavigationDetailScreen';
import ReactNavigationHomeScreen from './components/ReactNavigationHomeScreen';
import ReactNavigationModalDetailScreen from './components/ReactNavigationModalDetailScreen';
import ReactNavigationSettingsScreen from './components/ReactNavigationSettingsScreen';
import { wrapScreen } from './components/wrapScreen';

const Tab = createBottomTabNavigator();

const TabsScreen = wrapScreen(() => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={ReactNavigationHomeScreen} />
      <Tab.Screen name="Settings" component={ReactNavigationSettingsScreen} />
    </Tab.Navigator>
  );
});

const Stack = createNativeStackNavigator();

export default function NativeStackExample() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{ headerShown: false, stackPresentation: 'modal' }}
        >
          <Stack.Screen name="Root">
            {() => (
              <Stack.Navigator>
                <Stack.Screen
                  name="Tabs"
                  component={TabsScreen}
                  options={{ title: 'Native Stack' }}
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
