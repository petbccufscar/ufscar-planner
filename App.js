import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Platform, UIManager } from "react-native";
import SideBar from "./navigation/SideBar";
import { createStackNavigator } from "@react-navigation/stack";
import Event from "./components/Event";
import { NavigationContainer } from "@react-navigation/native";
import { Provider, useDispatch, useSelector } from "react-redux";
import { store } from "./redux/store";
import {persistor} from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { loadEvents } from "./redux/actions/eventActions";
import { Subject } from "./components/Subject";

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const HomeStackRoutes = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Loader/>
      </PersistGate>
    </Provider>
  );
}

function Loader(){
  const events = useSelector(state => state.events).events
  const dispatch = useDispatch()
  dispatch(loadEvents(events))

  return (<NavigationContainer>
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
  </NavigationContainer>)
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
