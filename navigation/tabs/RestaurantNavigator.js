import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RestaurantMenu from "../../screens/RestaurantMenu";
const restaurantsStack = createNativeStackNavigator();

export default function RestaurantsNavigator() {
  return (
    <restaurantsStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <restaurantsStack.Screen
        name="RestaurantMenu"
        component={RestaurantMenu}
      />
    </restaurantsStack.Navigator>
  );
}
