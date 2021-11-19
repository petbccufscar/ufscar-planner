import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SideBar from './navigation/SideBar';
import BottomNavBar from './navigation/BottomNavBar';
import { createStackNavigator } from '@react-navigation/stack';
import EditEvent from './components/EditEvent';
import { NavigationContainer } from '@react-navigation/native';
import {Provider} from 'react-redux';
import { store, persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";

const HomeStackRoutes = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <HomeStackRoutes.Navigator screenOptions={{ headerShown: false }}>
            <HomeStackRoutes.Screen name="SideBar" component={SideBar} />
            <HomeStackRoutes.Screen name="EditEvent" component={EditEvent} />
          </HomeStackRoutes.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
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
