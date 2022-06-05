import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../../screens/Home';
import { useTheme } from 'react-native-paper';

const homeStack = createNativeStackNavigator();

export default function HomeNavigator() {
    const colors = useTheme().colors;

    return (
        <homeStack.Navigator screenOptions={{
            title: 'UFSCar Planner',
            headerStyle: {
                backgroundColor: colors.headerInactive,
            },
            headerTitleStyle:{
                
            },
            headerShadowVisible: false,
            headerTintColor: colors.onHeaderInactive,
            headerTitleAlign: 'center',
        }}>
            <homeStack.Screen name="Home" component={Home} />
        </homeStack.Navigator>
    );
}