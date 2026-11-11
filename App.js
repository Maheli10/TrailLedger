import React from 'react';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { colors } from './src/theme';

import HomeScreen from './src/screens/HomeScreen';
import RoutesScreen from './src/screens/RoutesScreen';
import RouteDetailScreen from './src/screens/RouteDetailScreen';
import PlannerScreen from './src/screens/PlannerScreen';
import PlanHikeScreen from './src/screens/PlanHikeScreen';
import CheckpointsScreen from './src/screens/CheckpointsScreen';
import PackingScreen from './src/screens/PackingScreen';
import LogScreen from './src/screens/LogScreen';
import AddLogScreen from './src/screens/AddLogScreen';
import LogDetailScreen from './src/screens/LogDetailScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Bottom tabs = the 4 main areas of the app
function Tabs() {
  const icon = (e) => () => <Text style={{ fontSize: 20 }}>{e}</Text>;
  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.primary },
        headerTintColor: '#fff',
        tabBarActiveTintColor: colors.primary,
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarIcon: icon('🏠') }} />
      <Tab.Screen name="Routes" component={RoutesScreen} options={{ tabBarIcon: icon('🥾') }} />
      <Tab.Screen name="Planner" component={PlannerScreen} options={{ tabBarIcon: icon('📅') }} />
      <Tab.Screen name="Log" component={LogScreen} options={{ title: 'Hike Log', tabBarIcon: icon('📒') }} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: colors.primary },
          headerTintColor: '#fff',
        }}
      >
        <Stack.Screen name="Main" component={Tabs} options={{ headerShown: false }} />
        <Stack.Screen name="RouteDetail" component={RouteDetailScreen} options={{ title: 'Route Details' }} />
        <Stack.Screen name="PlanHike" component={PlanHikeScreen} options={{ title: 'Plan a Hike' }} />
        <Stack.Screen name="Checkpoints" component={CheckpointsScreen} options={{ title: 'Checkpoints' }} />
        <Stack.Screen name="Packing" component={PackingScreen} options={{ title: 'Packing List' }} />
        <Stack.Screen name="AddLog" component={AddLogScreen} options={{ title: 'New Log Entry' }} />
        <Stack.Screen name="LogDetail" component={LogDetailScreen} options={{ title: 'Log Entry' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
