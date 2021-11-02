import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../../screens/Home';
const homeStack = createNativeStackNavigator();

export default function HomeNavigator() {
    return (
        <homeStack.Navigator screenOptions={{
            headerShown: false,
        }}>
            <homeStack.Screen name="Home" component={Home} />
        </homeStack.Navigator>
    );
}