import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as Notifications from "expo-notifications";
import React, { useEffect, useRef } from "react";
import { AppRegistry, Platform, StyleSheet, UIManager } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import Toast from "react-native-toast-message";
import { Provider as ReduxProvider, useDispatch, useSelector, } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import Details from "./screens/Details";

import Subject from "./components/NewSubject";

import { loadEvents } from "./redux/actions/eventActions";
import { persistor, store } from "./redux/store";
import Restaurant from "./screens/Restaurant";
import { PreferencesContext } from "./theme/PreferencesContext";

import { CombinedDarkTheme, CombinedDefaultTheme } from "./theme/Themes";
import BottomNavBar from "./navigation/BottomNavBar"

import Config from "./screens/dashboardScreens/Config";
import AboutUs from "./screens/dashboardScreens/AboutUs";
import Contact from "./screens/dashboardScreens/Contact";
import SubjectScreen from "./screens/dashboardScreens/Materias";
import EventScreen from "./screens/dashboardScreens/Eventos";
import NotasScreen from "./screens/dashboardScreens/Notas";
import FreqScreen from "./screens/dashboardScreens/Frequencia";
import SigaScreen from "./screens/dashboardScreens/Siga";
import EditScreen from "./screens/EditScreen";


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
AppRegistry.registerComponent("X", () => App);
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
  const eventsSt = useSelector((state) => state.events);
  const dispatch = useDispatch();
  dispatch(loadEvents(eventsSt));

  const [isThemeDark, setIsThemeDark] = React.useState(false);

  let theme = isThemeDark ? CombinedDarkTheme : CombinedDefaultTheme;

  const toggleTheme = React.useCallback(() => {
    return setIsThemeDark(!isThemeDark);
  }, [isThemeDark]);

  const preferences = React.useMemo(() => {
    return {
      toggleTheme,
      isThemeDark,
    };
  }, [toggleTheme, isThemeDark]);

  return (
    <>
      <PreferencesContext.Provider value={preferences}>
        <PaperProvider theme={theme}>
          <NavigationContainer theme={theme}>
            <HomeStackRoutes.Navigator screenOptions={() => ({
              headerStyle: {
                backgroundColor: theme.colors.surface1,
              },
              headerTintColor: theme.colors.onSurface,
            })}>
              <HomeStackRoutes.Group screenOptions={{ headerShown: false }}>
                <HomeStackRoutes.Screen name="BottomNav" component={BottomNavBar} />
              </HomeStackRoutes.Group>
              <HomeStackRoutes.Screen
                name="Event"
                component={Details}
                options={() => ({
                  headerTitleAlign: "center",
                })}
              />
              <HomeStackRoutes.Screen
                name="EditScreen"
                component={EditScreen}
                options={() => ({
                  headerTitleAlign: "center",
                })}
              />
              <HomeStackRoutes.Screen
                name="Restaurant"
                component={Restaurant}
                options={() => ({
                  title: "Carteirinha",
                  headerTitleAlign: "center",
                })}
              />
              <HomeStackRoutes.Screen
                name="Subject"
                component={Subject}
                options={() => ({
                  title: "Média",
                  headerTitleAlign: "center",
                })}
              />
              <HomeStackRoutes.Screen
                name="Configurações"
                component={Config} />
              <HomeStackRoutes.Screen
                name="AboutUs"
                component={AboutUs} />
              <HomeStackRoutes.Screen
                name="Contato"
                component={Contact} />
              <HomeStackRoutes.Screen
                name="Eventos"
                component={EventScreen}
                options={() => ({
                  title: "Eventos",
                })}
              />
              <HomeStackRoutes.Screen
                name="Materias"
                component={SubjectScreen}
                options={() => ({
                  title: "Matérias",
                })}
              />
              <HomeStackRoutes.Screen
                name="Notas"
                component={NotasScreen}
                options={() => ({
                  title: "Notas",
                })}
              />
              <HomeStackRoutes.Screen
                name="Frequencia"
                component={FreqScreen}
                options={() => ({
                  title: "Frequência",
                })}
              />
              <HomeStackRoutes.Screen
                name="Siga"
                component={SigaScreen}
                options={() => ({
                  title: "Siga",
                })}
              />
            </HomeStackRoutes.Navigator>
          </NavigationContainer>
        </PaperProvider>
      </PreferencesContext.Provider>
      <Toast bottomOffset={20} text1NumberOfLines={2} />
    </>
  );
}

const styles = StyleSheet.create({
});
