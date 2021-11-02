import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Restaurant from '../screens/Restaurant';
import Task from '../screens/Task';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Entypo, MaterialCommunityIcons } from '@expo/vector-icons';

import HomeNavigator from './tabs/HomeNavigator';
import TaskNavigator from './tabs/TaskNavigator';
import CalendarNavigator from './tabs/CalendarNavigator';
import RestaurantNavigator from './tabs/RestaurantNavigator';


const Tab = createBottomTabNavigator();

export default function MyTabs(props) {

  return (
    <Tab.Navigator screenOptions={{
      headerShown: false,
    }}>
      <Tab.Screen name="HomeTab" component={HomeNavigator} options={{
        tabBarLabel: 'Home',
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="home" size={size} color={color} />
        ),
      }} />
      <Tab.Screen name="TaskTab" component={TaskNavigator} options={{
        tabBarLabel: 'Updates',
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="clipboard-text" size={size} color={color} />

        ),
      }} />
      <Tab.Screen name="CalendarTab" component={CalendarNavigator} options={{
        tabBarLabel: 'Calendário',
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="calendar-range" size={size} color={color} />
        ),
      }} />
      <Tab.Screen name="RestaurantTab" component={RestaurantNavigator} options={{
        tabBarLabel: 'Restaurante',
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="silverware-fork-knife" size={size} color={color} />
        ),
      }} />
    </Tab.Navigator>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
