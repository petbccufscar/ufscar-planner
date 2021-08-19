import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Home from '../screens/Home';
import Restaurant from '../screens/Restaurant';
import Task from '../screens/Task';
import Calendar from '../screens/Calendar';
import { BottomNavigation, Text } from 'react-native-paper';


export default function MyTabs() {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'home', title: 'Home', icon: 'home' },
    { key: 'task', title: 'Tarefas', icon: 'clipboard-text' },
    { key: 'calendar', title: 'Calendário', icon: "calendar-range" },
    { key: 'restaurant', title: 'Restaurante', icon: 'silverware-fork-knife' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    home: Home,
    task: Task,
    calendar: Calendar,
    restaurant: Restaurant
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
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
