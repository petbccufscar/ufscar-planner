import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import React from "react";
import { StyleSheet, View } from "react-native";
import { IconButton, useTheme } from "react-native-paper";
import CalendarNavigator from "./tabs/CalendarNavigator";
import DashboardNavigator from "./tabs/DashboardNavigator";
import HomeNavigator from "./tabs/HomeNavigator";
import RestaurantNavigator from "./tabs/RestaurantNavigator";
import {
  createMaterialTopTabNavigator,
} from "@react-navigation/material-top-tabs";

const Tab = createMaterialTopTabNavigator();

export default function MyTabs() {
  const navigation = useNavigation();
  const theme = useTheme();

  return (
    <Tab.Navigator
      tabBarPosition='bottom'
      screenOptions={{
        keyboardHidesTabBar: true,
        headerLeft: () =>
          <IconButton
            icon={"menu"}
            size={24}
            onPress={() => {
              navigation.openDrawer();
            }}
          />
        ,

        tabBarActiveTintColor: theme.colors.onSecondaryContainer,
        tabBarInactiveTintColor: theme.colors.onSurface,
        tabBarAndroidRipple: {
          color: theme.colors.surfaceVariant,
          borderless: true,
        },

        tabBarStyle: {
          backgroundColor: theme.colors.surface2,
          paddingBottom: 8,
          shadowColor: "transparent",
          shadowOpacity: 0.2,
          borderTopColor: "transparent",
        },


        tabBarLabelStyle: {
          fontSize: 10,
          textTransform: "none",
        },

        tabBarItemStyle: {
        },
        tabBarIconStyle: {
          width: "100%",
        },
        tabBarContentContainerStyle: {
          width: "100%",
        },


      }}>
      <Tab.Screen
        name="HomeTab"
        component={HomeNavigator}
        options={({ navigation }) => ({
          title: "UFSCar Planner",
          tabBarLabel: "Home",
          headerShown: false,
          tabBarIcon: ({ color }) =>
            <TabBarIcon
              name="home"
              color={color}
              active={navigation.getState().index == 0}
            />,
        })}
      />
      <Tab.Screen
        name="CalendarTab"
        component={CalendarNavigator}
        options={({ navigation }) => ({
          tabBarLabel: "Planner",
          headerShown: false,
          tabBarIcon: ({ color }) =>
            <TabBarIcon
              name="menu-book"
              color={color}
              active={navigation.getState().index == 1}
            />,
        })}
      />
      <Tab.Screen
        name="Dashboard"
        component={DashboardNavigator}
        options={({ navigation }) => ({
          title: "UFSCar Planner",
          headerShown: false,
          tabBarLabel: "Dashboard",
          tabBarIcon: ({ color }) =>
            <TabBarIcon
              name="menu"
              color={color}
              active={navigation.getState().index == 2}
            />,
        })}
      />
      <Tab.Screen
        name="RestaurantTab"
        component={RestaurantNavigator}
        options={({ navigation }) => ({
          title: "UFSCar Planner",
          headerTitleStyle: {},
          headerShown: false,
          tabBarLabel: "Restaurante",
          tabBarIcon: ({ color }) =>
            <TabBarIcon
              name="restaurant"
              color={color}
              active={navigation.getState().index == 3}
            />
          ,
        })}
      />
    </Tab.Navigator>
  );
}

function TabBarIcon(props) {
  const colors = useTheme().colors;

  const selectedStyle = props.active ?
    { ...styles.active, ...{ backgroundColor: colors.secondaryContainer } } :
    styles.inactive;

  return (
    <View style={styles.iconContainer}>
      <View style={selectedStyle}>
        <MaterialIcons
          name={props.name}
          size={24}
          color={props.active ? colors.onSecondaryContainer : colors.onSurface}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  absoluteContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    backgroundColor: "transparent",
  },

  inactive: {
    backgroundColor: "transparent",
  },

  active: {
    width: "100%",
    height: "100%",
    borderRadius: 15,
    paddingHorizontal: 10,
  },

  iconContainer: {
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
});
