import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as Notifications from "expo-notifications";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useRef } from "react";
import { AppRegistry, Platform, UIManager, View } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import Toast from "react-native-toast-message";
import {
  Provider as ReduxProvider,
  useDispatch,
  useSelector,
} from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import Subject from "./components/NewSubject";
import BottomNavBar from "./navigation/BottomNavBar";
import { loadEvents } from "./redux/actions/eventActions";
import { persistor, store } from "./redux/store";
import AboutUs from "./screens/dashboardScreens/AboutUs";
import Config from "./screens/dashboardScreens/Config";
import Contact from "./screens/dashboardScreens/Contact";
import EventScreen from "./screens/dashboardScreens/Eventos";
import FreqScreen from "./screens/dashboardScreens/Frequencia";
import SubjectScreen from "./screens/dashboardScreens/Materias";
import NotasScreen from "./screens/dashboardScreens/Notas";
import SigaScreen from "./screens/dashboardScreens/Siga";
import UpdateSaldoScreen from "./screens/dashboardScreens/UpdateSaldoScreen";
import Details from "./screens/Details";
import EditScreen from "./screens/EditScreen";
import RestaurantNotice from "./screens/RestaurantNotice";
import Welcome from "./screens/Welcome";
import { CombinedDarkThemes, CombinedDefaultThemes } from "./theme/Themes";
import {
  useFonts,
  RobotoCondensed_300Light,
  RobotoCondensed_300Light_Italic,
  RobotoCondensed_400Regular,
  RobotoCondensed_400Regular_Italic,
  RobotoCondensed_700Bold,
  RobotoCondensed_700Bold_Italic,
} from "@expo-google-fonts/roboto-condensed";
import Links from "./screens/dashboardScreens/Links";

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const HomeStackRoutes = createStackNavigator();

Notifications.setNotificationHandler({
  handleNotification: async() => ({
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
        notificationListener.current,
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
  const user = useSelector((state) => state.user).user;
  const themeConfig = useSelector((state) => state.theme);

  let theme = themeConfig.isDark ?
    CombinedDarkThemes[themeConfig.themeIdx] :
    CombinedDefaultThemes[themeConfig.themeIdx];
  let [fontsLoaded] = useFonts({
    RobotoCondensed_300Light,
    RobotoCondensed_300Light_Italic,
    RobotoCondensed_400Regular,
    RobotoCondensed_400Regular_Italic,
    RobotoCondensed_700Bold,
    RobotoCondensed_700Bold_Italic,
  });
  if (!fontsLoaded) {
    return <View style={{ flex: 1, backgroundColor: "#E8243C" }} />;
  }
  return (
    <>
      <StatusBar style={themeConfig.isDark ? "light" : "dark"} />
      <PaperProvider theme={theme}>
        <NavigationContainer theme={theme}>
          <HomeStackRoutes.Navigator
            initialRouteName={user.welcome ? "Welcome" : "BottomNav"}
            screenOptions={() => ({
              headerStyle: {
                backgroundColor: theme.colors.headerInactive,
              },
              headerTintColor: theme.colors.onHeaderInactive,
            })}
          >
            <HomeStackRoutes.Screen
              name="Welcome"
              component={Welcome}
              options={() => ({
                headerTitleAlign: "center",
                headerShown: false,
              })}
            />
            <HomeStackRoutes.Group screenOptions={{ headerShown: false }}>
              <HomeStackRoutes.Screen
                name="BottomNav"
                component={BottomNavBar}
              />
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
              name="RestaurantNotice"
              component={RestaurantNotice}
              options={({ route }) => ({
                title: route.params.title,
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
              options={() => ({
                title: "Sobre nós",
              })}
              component={AboutUs} />
            <HomeStackRoutes.Screen
              name="Links"
              options={() => ({
                title: "Links Úteis",
              })}
              component={Links} />
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
            <HomeStackRoutes.Screen
              name="UpdateSaldo"
              component={UpdateSaldoScreen}
              options={() => ({
                title: "Atualização da Carteirinha",
              })}
            />
          </HomeStackRoutes.Navigator>
        </NavigationContainer>
      </PaperProvider>
      <Toast bottomOffset={20} text1NumberOfLines={2} />
    </>
  );
}
