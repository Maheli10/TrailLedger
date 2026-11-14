import React from 'react';
import { Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ThemeProvider, useTheme } from './src/ThemeContext';

import HomeScreen from './src/screens/HomeScreen';
import RoutesScreen from './src/screens/RoutesScreen';
import RouteDetailScreen from './src/screens/RouteDetailScreen';
import PlannerScreen from './src/screens/PlannerScreen';
import PlanHikeScreen from './src/screens/PlanHikeScreen';
import LogScreen from './src/screens/LogScreen';
import AddLogScreen from './src/screens/AddLogScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Bottom tabs = the 4 main areas of the app
function Tabs() {
  const { colors } = useTheme();
  // Tab icons are PNG images; tintColor colours them (active / inactive) to match the theme
  const icon = (src) => ({ color }) => (
    <Image source={src} style={{ width: 26, height: 26, tintColor: color }} resizeMode="contain" />
  );
  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.header },
        headerTintColor: '#fff',
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.sub,
        tabBarStyle: { backgroundColor: colors.tabBar, borderTopColor: colors.border },
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false, tabBarIcon: icon(require('./assets/tab-home.png')) }} />
      <Tab.Screen name="Routes" component={RoutesScreen} options={{ tabBarIcon: icon(require('./assets/tab-routes.png')) }} />
      <Tab.Screen name="Planner" component={PlannerScreen} options={{ tabBarIcon: icon(require('./assets/tab-planner.png')) }} />
      <Tab.Screen name="Log" component={LogScreen} options={{ title: 'Hike Log', tabBarIcon: icon(require('./assets/tab-log.png')) }} />
    </Tab.Navigator>
  );
}

function AppNavigation() {
  const { colors, isDark } = useTheme();
  const base = isDark ? DarkTheme : DefaultTheme;
  const navTheme = {
    ...base,
    colors: { ...base.colors, background: colors.bg, card: colors.header, text: '#fff', border: colors.border, primary: colors.primary },
  };
  return (
    <NavigationContainer theme={navTheme}>
      <StatusBar style="light" />
      <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: colors.header }, headerTintColor: '#fff' }}>
        <Stack.Screen name="Main" component={Tabs} options={{ headerShown: false }} />
        <Stack.Screen name="RouteDetail" component={RouteDetailScreen} options={{ title: 'Route Details' }} />
        <Stack.Screen name="PlanHike" component={PlanHikeScreen} options={{ title: 'Plan a Hike' }} />
        <Stack.Screen name="AddLog" component={AddLogScreen} options={{ title: 'New Log Entry' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppNavigation />
    </ThemeProvider>
  );
}
