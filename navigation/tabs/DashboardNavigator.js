import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Dashboard from "../../screens/Dashboard";
import { useTheme } from "react-native-paper";

const taskStack = createNativeStackNavigator();

export default function DashboardNavigator() {
  const colors = useTheme().colors;

  return (
    <taskStack.Navigator screenOptions={{
      title: "UFSCar Planner",
      headerStyle: {
        backgroundColor: colors.headerInactive,
      },
      headerTitleStyle: {

      },
      headerShadowVisible: false,
      headerTintColor: colors.onHeaderInactive,
      headerTitleAlign: "center",
    }}>
      <taskStack.Screen name="Task" component={Dashboard} />

    </taskStack.Navigator>
  );
}
