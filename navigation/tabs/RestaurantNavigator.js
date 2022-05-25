import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RestaurantMenu from "../../screens/RestaurantMenu";
import { useTheme } from 'react-native-paper';

const restaurantsStack = createNativeStackNavigator();

export default function RestaurantsNavigator() {
  const colors = useTheme().colors;
  return (
    <restaurantsStack.Navigator
      screenOptions={{
        title: 'UFSCar Planner',
        headerStyle: {
          backgroundColor: colors.headerInactive,
        },
        headerShadowVisible: false,
        headerTintColor: colors.onHeader,
        headerTitleAlign: 'center'
      }}
    >
      <restaurantsStack.Screen
        name="RestaurantMenu"
        component={RestaurantMenu}
      />
    </restaurantsStack.Navigator>
  );
}
