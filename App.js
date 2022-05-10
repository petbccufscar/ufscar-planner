import {
  NavigationContainer
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as Notifications from "expo-notifications";
import React, { useEffect, useRef } from "react";
import {
  Platform, StyleSheet, UIManager, AppRegistry
} from "react-native";
import {
  Provider as PaperProvider
} from "react-native-paper";
import Toast from "react-native-toast-message";
import {
  Provider as ReduxProvider,
  useDispatch,
  useSelector
} from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import Event from "./components/Event";
import { Subject } from "./components/Subject";
import SideBar from "./navigation/SideBar";
import { loadEvents } from "./redux/actions/eventActions";
import { persistor, store } from "./redux/store";
import Restaurant from "./screens/Restaurant";
import { PreferencesContext } from "./theme/PreferencesContext";
import {CombinedDefaultTheme, CombinedDarkTheme} from "./theme/Themes";



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
AppRegistry.registerComponent('X', () => App);
export default function App() {
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        Toast.show({
          type: "success",
          text1: notification.request.content.title,
          text2: notification.request.content.body,
        });
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return (
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Loader />
      </PersistGate>
    </ReduxProvider>
  );
}

function Loader() {
  const events = useSelector((state) => state.events).events;
  const dispatch = useDispatch();
  dispatch(loadEvents(events));

  const [isThemeDark, setIsThemeDark] = React.useState(false);

  let theme = isThemeDark ? CombinedDarkTheme : CombinedDefaultTheme;

  const toggleTheme = React.useCallback(() => {
    return setIsThemeDark(!isThemeDark);
  }, [isThemeDark]);

  const preferences = React.useMemo(
    () => { 
      return({
      toggleTheme,
      isThemeDark,
    })},
    [toggleTheme, isThemeDark]
  );

  return (
    <>
      <PreferencesContext.Provider value={preferences}>
        <PaperProvider theme={theme}>
          <NavigationContainer theme={theme}>
            <HomeStackRoutes.Navigator>
              <HomeStackRoutes.Group screenOptions={{ headerShown: false }}>
                <HomeStackRoutes.Screen name="SideBar" component={SideBar} />
              </HomeStackRoutes.Group>
              <HomeStackRoutes.Screen
                name="Event"
                component={Event}
                options={() => ({
                  headerStyle: {
                    backgroundColor: theme.colors.surface1,
                  },
                  headerTintColor: theme.colors.onSurface,
                  headerTitleAlign: "center",
                })}
              />
              <HomeStackRoutes.Screen
                name="Restaurant"
                component={Restaurant}
                options={() => ({
                  title: "Carteirinha",
                  // headerStyle: {
                  //   backgroundColor: "#e8243c",
                  // },
                  // headerTintColor: "#fff",
                  headerTitleAlign: "center",
                })}
              />
              <HomeStackRoutes.Screen
                name="Subject"
                component={Subject}
                options={() => ({
                  // headerStyle: {
                  //   backgroundColor: "#e8243c",
                  // },
                  // headerTintColor: "#fff",
                  headerTitleAlign: "center",
                })}
              />
            </HomeStackRoutes.Navigator>
          </NavigationContainer>
        </PaperProvider>
      </PreferencesContext.Provider>
      <Toast bottomOffset={20} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
