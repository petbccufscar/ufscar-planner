import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import React, { useRef, useEffect, useState } from "react";
import { Animated, StyleSheet, Text, Pressable, View } from "react-native";
import { IconButton, useTheme } from "react-native-paper";
import CalendarNavigator from "./tabs/CalendarNavigator";
import DashboardNavigator from "./tabs/DashboardNavigator";
import HomeNavigator from "./tabs/HomeNavigator";
import RestaurantNavigator from "./tabs/RestaurantNavigator";
import {
  createMaterialTopTabNavigator,
} from "@react-navigation/material-top-tabs";

const Tab = createMaterialTopTabNavigator();

const TAB_CONFIG = [
  { name: "HomeTab", label: "Home", icon: "home" },
  { name: "CalendarTab", label: "Planner", icon: "menu-book" },
  { name: "Dashboard", label: "Dashboard", icon: "menu" },
  { name: "RestaurantTab", label: "Restaurante", icon: "restaurant" },
];

const UNDERLINE_WIDTH = 48;

function CustomTabBar({ state, navigation }) {
  const colors = useTheme().colors;
  const [tabBarWidth, setTabBarWidth] = useState(0);
  const translateX = useRef(new Animated.Value(0)).current;

  const tabCount = state.routes.length;
  const tabWidth = tabBarWidth / tabCount;

  useEffect(() => {
    if (tabBarWidth > 0) {
      const targetX = state.index * tabWidth + (tabWidth - UNDERLINE_WIDTH) / 2;
      Animated.spring(translateX, {
        toValue: targetX,
        useNativeDriver: true,
        tension: 68,
        friction: 12,
      }).start();
    }
  }, [state.index, tabBarWidth]);

  return (
    <View
      style={[styles.tabBar, { backgroundColor: colors.surface2 }]}
      onLayout={(e) => setTabBarWidth(e.nativeEvent.layout.width)}
    >
      {state.routes.map((route, index) => {
        const isActive = state.index === index;
        const config = TAB_CONFIG.find((t) => t.name === route.name) || {};

        return (
          <Pressable
            key={route.key}
            onPress={() => {
              if (!isActive) {
                navigation.navigate(route.name);
              }
            }}
            android_ripple={{
              color: colors.surfaceVariant,
              borderless: true,
            }}
            style={({ pressed }) => [
              styles.tabItem,
              pressed && { opacity: 0.7 },
            ]}
          >
            <View
              style={[
                styles.iconWrapper,
                isActive && {
                  backgroundColor: colors.secondaryContainer,
                },
              ]}
            >
              <MaterialIcons
                name={config.icon}
                size={24}
                color={
                  isActive
                    ? colors.onSecondaryContainer
                    : colors.onSurface
                }
              />
            </View>
            <Text
              style={[
                styles.label,
                {
                  color: isActive
                    ? colors.onSecondaryContainer
                    : colors.onSurface,
                },
              ]}
            >
              {config.label}
            </Text>
          </Pressable>
        );
      })}
      {tabBarWidth > 0 && (
        <Animated.View
          style={[
            styles.underline,
            {
              backgroundColor: colors.primary,
              transform: [{ translateX }],
            },
          ]}
        />
      )}
    </View>
  );
}

export default function MyTabs() {
  const navigation = useNavigation();

  return (
    <Tab.Navigator
      tabBarPosition="bottom"
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
        swipeEnabled: true,
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeNavigator}
        options={{ title: "UFSCar Planner" }}
      />
      <Tab.Screen
        name="CalendarTab"
        component={CalendarNavigator}
      />
      <Tab.Screen
        name="Dashboard"
        component={DashboardNavigator}
        options={{ title: "UFSCar Planner" }}
      />
      <Tab.Screen
        name="RestaurantTab"
        component={RestaurantNavigator}
        options={{ title: "UFSCar Planner" }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: "row",
    paddingBottom: 8,
    paddingTop: 4,
    borderTopWidth: 0,
  },

  tabItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 4,
  },

  iconWrapper: {
    borderRadius: 15,
    paddingHorizontal: 16,
    paddingVertical: 4,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },

  label: {
    fontSize: 10,
    marginTop: 2,
  },

  underline: {
    position: "absolute",
    bottom: 6,
    left: 0,
    height: 2,
    width: UNDERLINE_WIDTH,
    borderRadius: 1,
  },
});
