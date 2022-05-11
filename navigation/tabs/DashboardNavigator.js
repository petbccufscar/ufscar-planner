import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Dashboard from '../../screens/Dashboard';
import { useTheme } from 'react-native-paper';
import {MaterialIcons} from "@expo/vector-icons";
import Config from "../../screens/Config";
import AboutUs from "../../screens/AboutUs";
import Contact from "../../screens/Contact";
const taskStack = createNativeStackNavigator();


export default function DashboardNavigator() {
    const colors = useTheme().colors;

    return (
        <taskStack.Navigator screenOptions={{
            title: 'UFSCar Planner',
            headerStyle: {
                backgroundColor: colors.surface1,
            },
            headerShadowVisible: false,
            headerTintColor: colors.onSurface,
            headerTitleAlign: 'center',
        }}>
            <taskStack.Screen name="Task" component={Dashboard} />

            <taskStack.Screen
                name="Configurações"
                component={Config} />
            <taskStack.Screen
                name="Sobre Nós"
                component={AboutUs} />
            <taskStack.Screen
                name="Contact"
                component={Contact} />
        </taskStack.Navigator>
    );
}