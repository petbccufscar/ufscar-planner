import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Entypo, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/core";

import HomeNavigator from './tabs/HomeNavigator';
import TaskNavigator from './tabs/TaskNavigator';
import CalendarNavigator from './tabs/CalendarNavigator';
import RestaurantNavigator from './tabs/RestaurantNavigator';
import { IconButton } from "react-native-paper";
import { useTheme } from "react-native-paper";


const Tab = createBottomTabNavigator();

export default function MyTabs() {
  const navigation = useNavigation()

  const theme = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

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
        title: 'UFSCar Planner',
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="home" size={size} color={color} />
        ),
      }} />
      <Tab.Screen name="CalendarTab" component={CalendarNavigator} options={{
        tabBarLabel: 'Planner',
        title: 'UFSCar Planner',
        // headerShown: false,
        tabBarIcon: ({ color, size }) => (
          <MaterialIcons name="class" size={size} color={color} />
        ),
      }} />
      <Tab.Screen name="RestaurantTab" component={RestaurantNavigator} options={{
        tabBarLabel: 'Restaurante',
        title: 'UFSCar Planner',
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="silverware-fork-knife" size={size} color={color} />
        ),
      }} />
      <Tab.Screen name="TaskTab" component={TaskNavigator} options={{
        tabBarLabel: 'Mais',
        title: 'UFSCar Planner',
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="menu" size={size} color={color} />
        ),
      }} />
    </Tab.Navigator>
  );
}
