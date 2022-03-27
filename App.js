import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState, useRef } from "react";
import {
  StyleSheet,
  Platform,
  UIManager,
  View,
  Button,
  Text,
} from "react-native";
import SideBar from "./navigation/SideBar";
import { createStackNavigator } from "@react-navigation/stack";
import Event from "./components/Event";
import {
  Provider as ReduxProvider,
  useDispatch,
  useSelector,
} from "react-redux";
import { store } from "./redux/store";
import { persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { loadEvents } from "./redux/actions/eventActions";
import { Subject } from "./components/Subject";
import Restaurant from "./screens/Restaurant";
import * as Notifications from "expo-notifications";
import Toast from "react-native-toast-message";
import { PreferencesContext } from "./theme/PreferencesContext";

import {
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from "@react-navigation/native";
import {
  DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperDefaultTheme,
  Provider as PaperProvider,
} from "react-native-paper";

const CombinedDefaultTheme = {
  ...PaperDefaultTheme,
  ...NavigationDefaultTheme,
  colors: {
    ...PaperDefaultTheme.colors,
    ...NavigationDefaultTheme.colors,
    primary: "#BB1822",
    onPrimary: "#FFFFFF",
    primaryContainer: "#FFDAD5",
    onPrimaryContainer: "#410003",
    secondary: "#C00103",
    onSecondary: '#FFFFFF',
    secondaryContainer: '#FFDAD3',
    onSecondaryContainer: '#410000',
    tertiary: '#725B2E',
    onTertiary: '#FFFFFF',
    tertiaryContainer: '#FFDEA6',
    onTertiaryContainer: '#271900',
    error: '#BA1B1B',
    onError: '#FFFFFF',
    errorContainer: '#FFDAD4',
    onErrorContainer: '#410001',
    background: '#FBFDFD',
    onBackground: '#191C1D',
    surface: '#FBFDFD',
    onSurface: '#191C1D',
    surfaceVariant: '#F4DDDB',
    onSurfaceVariant: '#524342',
    outline: '#857371',
    surface1: '#F8F2F2',
    surface2: '#F6EBEB',
    surface3: '#F4E4E5',
    surface4: '#F3E2E3',
    surface5: '#F2DDDE'
  },
};
const CombinedDarkTheme = {
  ...PaperDarkTheme,
  ...NavigationDarkTheme,
  colors: {
    ...PaperDarkTheme.colors,
    ...NavigationDarkTheme.colors,
    primary: '#FFB3AB',
    onPrimary: '#680008',
    primaryContainer: '#930010',
    onPrimaryContainer: '#FFDAD5',
    secondary: '#FFB4A7',
    onSecondary: '#680000',
    secondaryContainer: '#930000',
    onSecondaryContainer: '#FFDAD3',
    tertiary: '#E1C28C',
    onTertiary: '#402D05',
    tertiaryContainer: '#584319',
    onTertiaryContainer: '#FFDEA6',
    error: '#FFB4A9',
    onError: '#680003',
    errorContainer: '#930006',
    onErrorContainer: '#FFDAD4', 
    background: '#191C1D',
    onBackground: '#E0E3E3',
    surface: '#191C1D',
    onSurface: '#E0E3E3',
    surfaceVariant:  '#524342',
    onSurfaceVariant: '#D7C1BF',
    outline: '#A08C8A',
    surface1: '#242424',
    surface2: '#2B2828',
    surface3: '#322D2D',
    surface4: '#352E2E',
    surface5: '#393131'
  },
};

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
