import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState, useRef } from "react";
import { StyleSheet, Platform, UIManager, View, Button, Text } from "react-native";
import SideBar from "./navigation/SideBar";
import { createStackNavigator } from "@react-navigation/stack";
import Event from "./components/Event";
import { NavigationContainer } from "@react-navigation/native";
import { Provider, useDispatch, useSelector } from "react-redux";
import { store } from "./redux/store";
import { persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { loadEvents } from "./redux/actions/eventActions";
import { Subject } from "./components/Subject";
import Restaurant from "./screens/Restaurant";
import * as Notifications from "expo-notifications";
import Toast from 'react-native-toast-message';

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const HomeStackRoutes = createStackNavigator();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function App() {
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {

      Toast.show({
        type: 'success',
        text1: notification.request.content.title,
        text2: notification.request.content.body
      });
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Loader />
      </PersistGate>
    </Provider>
  );
}

function Loader() {
  const events = useSelector(state => state.events).events
  const dispatch = useDispatch()
  dispatch(loadEvents(events))

  return (<>
    <NavigationContainer>

      <HomeStackRoutes.Navigator>

        <HomeStackRoutes.Group screenOptions={{ headerShown: false }}>
          <HomeStackRoutes.Screen name="SideBar" component={SideBar} />
        </HomeStackRoutes.Group>
        <HomeStackRoutes.Screen
          name="Event"
          component={Event}
          options={() => ({
            headerStyle: {
              backgroundColor: "#e8243c",
            },
            headerTintColor: "#fff",
            headerTitleAlign: "center",
          })}
        />
        <HomeStackRoutes.Screen
          name="Restaurant"
          component={Restaurant}
          options={() => ({
            title: "Carteirinha",
            headerStyle: {
              backgroundColor: "#e8243c",
            },
            headerTintColor: "#fff",
            headerTitleAlign: "center",
          })}
        />
        <HomeStackRoutes.Screen
          name="Subject"
          component={Subject}
          options={() => ({
            headerStyle: {
              backgroundColor: "#e8243c",
            },
            headerTintColor: "#fff",
            headerTitleAlign: "center",
          })}
        />
      </HomeStackRoutes.Navigator>
    </NavigationContainer>
    <Toast
      bottomOffset={20}
    />
  </>)
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
