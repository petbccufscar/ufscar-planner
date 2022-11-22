import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { Calendar } from "../../screens/Calendar";
import { useTheme } from "react-native-paper";

const calendarStack = createNativeStackNavigator();

export default function CalendarNavigator() {
  const colors = useTheme().colors;

  return (
    <calendarStack.Navigator screenOptions={{
      presentation: "containedTransparentModal", animation: "fade"
    }}>
      <calendarStack.Screen name="Calendar" options={() => ({
        title: "UFSCar Planner",

        headerStyle: {
          backgroundColor: colors.headerInactive,
        },
        headerTitleStyle: {

        },
        headerShadowVisible: false,
        headerTintColor: colors.onHeaderInactive,
        headerTitleAlign: "center",
      })}>
        {() => <Calendar />}
      </calendarStack.Screen>

    </calendarStack.Navigator>
  );
}