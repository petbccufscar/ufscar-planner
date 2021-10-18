import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Home from '../screens/Home';
import Restaurant from '../screens/Restaurant';
import Task from '../screens/Task';
import Calendar from '../screens/Calendar';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Entypo, MaterialCommunityIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();


export default function MyTabs(props) {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'home', title: 'Home', icon: 'home' },
    { key: 'task', title: 'Tarefas', icon: 'clipboard-text' },
    { key: 'calendar', title: 'Calendário', icon: "calendar-range" },
    { key: 'restaurant', title: 'Restaurante', icon: 'silverware-fork-knife' },
  ]);


  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" size={size} color={color} />
          ),
        }}/>
      <Tab.Screen name="Task" component={Task} options={{
          tabBarLabel: 'Updates',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="clipboard-text" size={size} color={color} />

          ),
        }}/>
      <Tab.Screen name="Calendar" component={Calendar} options={{
          tabBarLabel: 'Calendário',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="calendar-range" size={size} color={color} />
          ),
        }}/>
      <Tab.Screen name="Restaurant" component={Restaurant} options={{
          tabBarLabel: 'Restaurante',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="silverware-fork-knife" size={size} color={color} />
          ),
        }}/>
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
