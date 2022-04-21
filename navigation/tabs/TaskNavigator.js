import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Task from '../../screens/Task';
import { useTheme } from 'react-native-paper';
const taskStack = createNativeStackNavigator();


export default function TaskNavigator() {
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
            <taskStack.Screen name="Task" component={Task} />
        </taskStack.Navigator>
    );
}