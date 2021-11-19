import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Task from '../../screens/Task';
const taskStack = createNativeStackNavigator();

export default function TaskNavigator() {
    return (
        <taskStack.Navigator screenOptions={{
            headerShown: false,
        }}>
            <taskStack.Screen name="Task" component={Task} />
        </taskStack.Navigator>
    );
}