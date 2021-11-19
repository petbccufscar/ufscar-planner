import React, { useEffect } from 'react';
import { Button } from 'react-native-paper';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CalendarDay } from "../../components/CalendarDay";
import { CalendarMonth } from '../../components/CalendarMonth';
import { CalendarWeek } from "../../components/CalendarWeek";
import { IconButton, Colors } from 'react-native-paper';
// import { events } from '../../placeholder-data/data';
import { useSelector, useDispatch } from 'react-redux';
import { addEvent } from '../../redux/actions/eventActions';

const calendarStack = createNativeStackNavigator();

const meses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
const hoje = new Date();
let mode = 0;
//let titulo = mode == 2 ? `${meses[hoje.getMonth()]} de ${hoje.getFullYear()}` : "Calendário"


export default function CalendarNavigator() {
    const events = useSelector(state => state.events.events);
    // const dispatch = useDispatch();
    
    // useEffect(() => {
    //     const newEvent = {
    //         "id": 5,
    //         "weekly": true,
    //         "details": [
    //             {
    //                 "datetime_init": "1995-12-17T12:24:00-03:00",
    //                 "datetime_end": "1995-12-17T15:02:00-03:00",
    //                 "local": "ava2",
    //                 "day": 5
    //             }
    //         ],
    //         "name": "AED10",
    //         "subject": "AED10",
    //         "notification": [
    //             120,
    //             60,
    //             5
    //         ],
    //         "description": "aula do fulano",
    //         "color": "#00f",
    //         "is_subject": true,
    //         "mean": "(P0 + P1 + P2)/3",
    //         "grade": {
    //             "P0": 0,
    //             "P1": 5,
    //             "P2": null
    //         },
    //         "frequence": {}
    //     }

    //     dispatch(addEvent(newEvent));
    // }, [])
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