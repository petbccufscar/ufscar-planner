import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import BottomNavBar from './BottomNavBar';
import FAQ from '../screens/FAQ';
import Progress from '../screens/Progress';
import Home from '../screens/Home';
import AboutUs from '../screens/AboutUs';
import Config from '../screens/Config';
import { Drawer as PaperDrawer } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
const Drawer = createDrawerNavigator();

export default function SideBar(props) {
  return (
    <Drawer.Navigator initialRouteName="Home" screenOptions={{
      headerShown: false,
    }}>

      <Drawer.Screen
        name="Home"
        options={{
          drawerIcon: ({ focused, size }) => (
            <MaterialIcons name="home" size={size} color="black" />
          ),
        }}
        component={BottomNavBar} />
      <Drawer.Screen
        name="Progresso"
        options={{
          drawerIcon: ({ focused, size }) => (
            <MaterialIcons name="hourglass-bottom" size={size} color="black" />
          ),
        }}
        component={Progress} />
      <Drawer.Screen
        name="Configurações"
        options={{
          drawerIcon: ({ focused, size }) => (
            <MaterialIcons name="settings" size={size} color="black" />
          ),
        }}
        component={Config} />

      <Drawer.Screen
        name="Sobre Nós"
        options={{
          drawerIcon: ({ focused, size }) => (
            <MaterialIcons name="group" size={size} color="black" />
          ),
        }}
        component={AboutUs} />
      <Drawer.Screen
        name="FAQ"
        options={{
          drawerIcon: ({ focused, size }) => (
            <MaterialIcons name="help" size={size} color="black" />
          ),
        }}
        component={FAQ} />
    </Drawer.Navigator>
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
