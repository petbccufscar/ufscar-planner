import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { Colors, IconButton } from 'react-native-paper';
// import { events } from '../../placeholder-data/data';
import { useSelector } from 'react-redux';
import { Calendar } from '../../screens/Calendar'
import { addEvent } from '../../redux/actions/eventActions'
import { useTheme } from 'react-native-paper';

import { useDispatch } from 'react-redux';

const calendarStack = createNativeStackNavigator();

const meses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
const hoje = new Date();
let mode = 0;


export default function CalendarNavigator({ navigation }) {
    const events = useSelector(state => state.events.events);
    const colors = useTheme().colors;

    const dispatch = useDispatch();

    useEffect(() => {
        navigation.setOptions({
            title: `${meses[hoje.getMonth()]} de ${hoje.getFullYear()}`,
        })
    }, [])

    return (
        <calendarStack.Navigator screenOptions={{
            presentation: 'containedTransparentModal', animation: "fade"
        }}>
            <calendarStack.Screen name="Calendar" options={({ navigation }) => ({
                title: 'UFSCar Planner',
                headerStyle: {
                    backgroundColor: colors.headerInactive,
                },
                headerShadowVisible: false,
                headerTintColor: colors.onHeader,
                headerTitleAlign: 'center',
            })}>
                {props => <Calendar />}
            </calendarStack.Screen>

        </calendarStack.Navigator>
    );
}