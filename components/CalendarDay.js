import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React from 'react';
import { Text, TouchableOpacity, View } from "react-native";
import { IconButton } from 'react-native-paper';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { bgColor, Card, cardLineWidth, cinza, compareEvents, WeekDay } from "./CalendarHelper";


const WeekTab = createMaterialTopTabNavigator();

export function CalendarDay(props) {
    let tasks = props.tasks;
    let tasksList = [[], [], [], [], [], [], []]

    for (const i in tasks) {
        const task = tasks[i]
        if (task["weekly"]) {
            for (const j in task["details"]) {
                const detail = task["details"][j];
                tasksList[detail["day"]].push({
                    ...task,
                    "details": [detail]
                })
            }
        }
    }
    for (let l in tasksList) {
        tasksList[l].sort((a,b) => compareEvents(a,b))
    }
    const today = (new Date()).getDay()
    routes = ["Dom","Seg","Ter","Qua","Qui","Sex","Sáb"]
    return (
        <View style={{ backgroundColor: "#000", width: wp("100%"), flexGrow: 1 }}>
            <WeekTab.Navigator initialRouteName={routes[today]} tabBar={props => <MyTabBar {...props} />}>
                <WeekTab.Screen name="Dom" >
                    {() => <CardsTimeline tasks={tasksList[0]} />}
                </WeekTab.Screen>
                <WeekTab.Screen name="Seg" >
                    {() => <CardsTimeline tasks={tasksList[1]} />}
                </WeekTab.Screen>
                <WeekTab.Screen name="Ter" >
                    {() => <CardsTimeline tasks={tasksList[2]} />}
                </WeekTab.Screen>
                <WeekTab.Screen name="Qua" >
                    {() => <CardsTimeline tasks={tasksList[3]} />}
                </WeekTab.Screen>
                <WeekTab.Screen name="Qui"  >
                    {() => <CardsTimeline tasks={tasksList[4]} />}
                </WeekTab.Screen>
                <WeekTab.Screen name="Sex"  >
                    {() => <CardsTimeline tasks={tasksList[5]} />}
                </WeekTab.Screen>
                <WeekTab.Screen name="Sáb"  >
                    {() => <CardsTimeline tasks={tasksList[6]} />}
                </WeekTab.Screen>
            </WeekTab.Navigator>
        </View>
    );
}



function CardsTimeline(props) {

    const last = props.tasks.length - 1
    const first = props.tasks.length > 0 ? props.tasks[0]["details"][0]["datetime_init"] : null;

    return (
        <View style={{ marginTop: 10 }}>
            <HorarioLivre final={first} />
            {props.tasks.map((task, index) => {
                return (
                    <View key={index}>
                        <Card task={task} key={index} />
                        <HorarioLivre initial={task["details"][0]["datetime_end"]} final={index < last ? props.tasks[index + 1]["details"][0]["datetime_init"] : null} />
                    </View>)
            })}
        </View>)
}



function HorarioLivre(props) {
    let inicio = { hour: 0, minute: 0 }, final = { hour: 23, minute: 59 };
    if (props.initial != null) {
        const initialDate = new Date(props.initial)
        if (initialDate.getMinutes() == 59 && initialDate.getHours() == 23) {
            return (<></>);
        } else if (initialDate.getMinutes() == 59) {
            inicio.minute = 0;
            inicio.hour = initialDate.getHours() + 1;
        } else {
            inicio.minute = initialDate.getMinutes() + 1;
            inicio.hour = initialDate.getHours();
        }
    }
    if (props.final != null) {

        const finalDate = new Date(props.final)
        if (finalDate.getMinutes() == 0 && finalDate.getHours() == 0) {
            return (<></>);
        } else if (finalDate.getMinutes() == 0) {
            final.minute = 59;
            final.hour = finalDate.getHours() - 1;
        } else {
            final.minute = finalDate.getMinutes() - 1;
            final.hour = finalDate.getHours();
        }
    }
    const finalStr = final.hour.toString().padStart(2, '0') + "h" + final.minute.toString().padStart(2, '0');
    const inicioStr = inicio.hour.toString().padStart(2, '0') + "h" + inicio.minute.toString().padStart(2, '0');
    return (
        <View style={{ flexDirection: 'row', height: wp('17%'), borderBottomWidth: 1, borderBottomColor: cinza, backgroundColor: bgColor }}>
            <View style={{ width: wp('17%'), justifyContent: 'center', alignItems: 'center', borderRightWidth: cardLineWidth, borderRightColor: cinza }}>
                <Text style={{ fontSize: 17, padding: 5 }}>{inicioStr}</Text>
                <Text style={{ fontSize: 13 }}>{finalStr}</Text>
            </View>
            <View style={{ justifyContent: 'center', flex: 1, padding: 10 }}>
                <Text >Horário Livre</Text>
            </View>
            <View style={{ alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                <IconButton
                    icon="plus-circle"
                    color={'#616161'}
                    size={20}
                    onPress={() => console.log('Adicionar evento')}
                />
            </View>
        </View>
    )
}


function MyTabBar({ state, descriptors, navigation }) {
    return (
        <View style={{ flexDirection: 'row', backgroundColor: bgColor, height: 50, justifyContent: "center", alignItems: "center" }}>
            {state.routes.map((route, index) => {

                const { options } = descriptors[route.key];
                const label = route.name;

                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name);
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    });
                };

                return (
                    <TouchableOpacity
                        key={index}
                        accessibilityRole="button"
                        accessibilityStates={isFocused ? ['selected'] : []}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarTestID}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        style={{ flex: 1, alignItems: "center" }}
                    >
                        <WeekDay label={label} active={isFocused} today={index == (new Date()).getDay()} />
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}

