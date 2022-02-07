import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Entypo, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/core";

import HomeNavigator from './tabs/HomeNavigator';
import TaskNavigator from './tabs/TaskNavigator';
import CalendarNavigator from './tabs/CalendarNavigator';
import RestaurantNavigator from './tabs/RestaurantNavigator';
import { IconButton } from "react-native-paper";


const Tab = createBottomTabNavigator();

export default function MyTabs() {
  const navigation = useNavigation()

  return (
    <Tab.Navigator screenOptions={{
      headerLeft: () => (
        <IconButton
          icon={"menu"}
          size={24}
          onPress={() => {
            navigation.openDrawer()
          }}
        />
      ),
    }}>
      <Tab.Screen name="HomeTab" component={HomeNavigator} options={{
        tabBarLabel: 'Home',
        title: 'Home',
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="home" size={size} color={color} />
        ),
      }} />
      <Tab.Screen name="TaskTab" component={TaskNavigator} options={{
        tabBarLabel: 'Matérias',
        title: 'Matérias',
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="clipboard-text" size={size} color={color} />

        ),
      }} />
      <Tab.Screen name="CalendarTab" component={CalendarNavigator} options={{
        tabBarLabel: 'Calendário',
        // headerShown: false,
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="calendar-range" size={size} color={color} />
        ),
      }} />
      <Tab.Screen name="RestaurantTab" component={RestaurantNavigator} options={{
        tabBarLabel: 'Restaurante',
        title: 'Restaurante Universitário',
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
