import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import * as React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ReactNavigationDetailScreen from './components/ReactNavigationDetailScreen';
import ReactNavigationHomeScreen from './components/ReactNavigationHomeScreen';
import ReactNavigationModalDetailScreen from './components/ReactNavigationModalDetailScreen';
import ReactNavigationSettingsScreen from './components/ReactNavigationSettingsScreen';
import { withProvider } from './components/withProvider';

const HomeScreenWithProvider = withProvider(ReactNavigationHomeScreen);
const SettingsScreenWithProvider = withProvider(ReactNavigationSettingsScreen);
const DetailScreenWithProvider = withProvider(ReactNavigationDetailScreen);
const ModalDetailScreenWithProvider = withProvider(
  ReactNavigationModalDetailScreen,
);

const Tab = createBottomTabNavigator();

const TabsScreenWithProvider = withProvider(() => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreenWithProvider} />
      <Tab.Screen name="Settings" component={SettingsScreenWithProvider} />
    </Tab.Navigator>
  );
});

const Stack = createNativeStackNavigator();

export default function ReactNavigationNativeStackExample() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{ headerShown: false, presentation: 'modal' }}
        >
          <Stack.Screen name="Root">
            {() => (
              <Stack.Navigator>
                <Stack.Screen
                  name="Tabs"
                  component={TabsScreenWithProvider}
                  options={{ title: 'Native Stack' }}
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
