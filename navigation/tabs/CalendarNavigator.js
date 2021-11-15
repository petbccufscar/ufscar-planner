import React from 'react';
import { Button } from 'react-native-paper';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CalendarDay } from "../../components/CalendarDay";
import { CalendarMonth } from '../../components/CalendarMonth';
import { CalendarWeek } from "../../components/CalendarWeek";
import { IconButton, Colors } from 'react-native-paper';
import { events } from '../../placeholder-data/data';

const calendarStack = createNativeStackNavigator();

const meses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
const hoje = new Date();
let mode = 0;
//let titulo = mode == 2 ? `${meses[hoje.getMonth()]} de ${hoje.getFullYear()}` : "Calendário"


export default function CalendarNavigator() {
    return (
        <calendarStack.Navigator screenOptions={{
            presentation: 'containedTransparentModal', animation: "fade"
        }}>
            <calendarStack.Screen name="CalendarDay" options={({ navigation }) => ({
                title: `${meses[hoje.getMonth()]} de ${hoje.getFullYear()}`,
                headerRight: () => (
                    <IconButton
                        icon="calendar"
                        color={Colors.black}
                        size={20}
                        onPress={() => {
                            navigation.replace("CalendarMonth", { tasks: events })
                        }}
                    />
                ),
            })}>
                {props => <CalendarDay {...props} tasks={events}/>}
            </calendarStack.Screen>

            <calendarStack.Screen name="CalendarMonth" options={({ navigation }) => ({
                title: `${meses[hoje.getMonth()]} de ${hoje.getFullYear()}`,
                headerRight: () => (
                    <IconButton
                        icon="calendar"
                        color={Colors.black}
                        size={20}
                        onPress={() => {
                            navigation.replace("CalendarWeek", { tasks: events })
                        }}
                    />
                ),
            })}>
                {props => <CalendarMonth {...props} tasks={events}/>}
            </calendarStack.Screen>

            <calendarStack.Screen name="CalendarWeek" options={({ navigation }) => ({
                title: `${meses[hoje.getMonth()]} de ${hoje.getFullYear()}`,
                headerRight: () => (
                    <IconButton
                        icon="calendar"
                        color={Colors.black}
                        size={20}
                        onPress={() => {
                            navigation.replace("CalendarDay", { tasks: events })
                        }}
                    />
                ),
            })}>
                    {props => <CalendarWeek {...props} tasks={events}/>}
            </calendarStack.Screen>
        </calendarStack.Navigator>
    );
}