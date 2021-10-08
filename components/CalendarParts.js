import { View, StyleSheet, ScrollView, Text, TouchableOpacity } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import React, { Fragment,useState } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { IconButton, Colors } from 'react-native-paper';
import { ceil } from "react-native-reanimated";


// Esse será o componente principal, que vai gerenciar qual modo de calendário
export function CalendarComponent(props) {
    const tasks = [

        [{ color: "#400", initTime: { hour: 3, minute: 0 }, endTime: { hour: 4, minute: 0 }, name: "Organização e Recuperação da Informação e muito mais informação", local: 'AT5 - xx' },
        { color: "#ef1", initTime: { hour: 21, minute: 0 }, endTime: { hour: 23, minute: 1 }, name: "Matéria X", local: 'AT5 - xx' }],
        [{ color: "#444", initTime: { hour: 1, minute: 0 }, endTime: { hour: 4, minute: 0 }, name: "Matéria X", local: 'AT5 - xx' },
        { color: "#ef1", initTime: { hour: 20, minute: 0 }, endTime: { hour: 21, minute: 0 }, name: "Matéria X", local: 'AT5 - xx' }],
        [{ color: "#444", initTime: { hour: 1, minute: 0 }, endTime: { hour: 4, minute: 0 }, name: "Matéria X", local: 'AT5 - xx' },
        { color: "#ef1", initTime: { hour: 20, minute: 0 }, endTime: { hour: 23, minute: 0 }, name: "Matéria X", local: 'AT5 - xx' }],
        [{ color: "#400", initTime: { hour: 2, minute: 0 }, endTime: { hour: 3, minute: 0 }, name: "Matéria ", local: 'AT5 - xx' },
        { color: "#ef1", initTime: { hour: 22, minute: 0 }, endTime: { hour: 22, minute: 50 }, name: "Matéria H", local: 'AT5 - xx' }],
        [],
        // [{ color: "#f00", initTime: { hour: 0, minute: 0 }, endTime: { hour: 23, minute: 59 }, name: "Matéria X", local: 'AT5 - xx' },],
        [{ color: "#f00", initTime: { hour: 0, minute: 0 }, endTime: { hour: 23, minute: 59 }, name: "Matéria X", local: 'AT5 - xx' },],
        [{ color: "#f00", initTime: { hour: 0, minute: 0 }, endTime: { hour: 23, minute: 59 }, name: "Matéria X", local: 'AT5 - xx' },]];

    const events = [
        {
            "id": 0,
            "weekly": false,
            "details": [
                {
                    "datetime_init": "1995-12-17T03:24:00-03:00",
                    "datetime_end": "1995-12-17T04:02:00-03:00",
                    "local": "ava2",
                    "day": 0
                },
                {
                    "datetime_init": "1995-12-17T03:24:00-03:00",
                    "datetime_end": "1995-12-17T04:02:00-03:00",
                    "local": "ava2.3",
                    "day": 6
                },
                {
                    "datetime_init": "1995-12-17T03:24:00-03:00",
                    "datetime_end": "1995-12-17T04:02:00-03:00",
                    "local": "ava5",
                    "day": 1
                }
            ],
            "name": "Questionário AED3",
            "subject": "AED3",
            "notification": [
                120,
                60,
                5
            ],
            "description": "10 exercicios no runcodes",
            "color": "#0f0",
            "is_subject": false,
            "mean": null,
            "grade": null,
            "frequence": null
        },
        {
            "id": 1,
            "weekly": true,
            "details": [
                {
                    "datetime_init": "1995-12-17T02:24:00-03:00",
                    "datetime_end": "1995-12-17T04:02:00-03:00",
                    "local": "ava2",
                    "day": 0
                },
                {
                    "datetime_init": "1995-12-17T03:24:00-03:00",
                    "datetime_end": "1995-12-17T06:02:00-03:00",
                    "local": "at-19",
                    "day": 6
                },
                {
                    "datetime_init": "1995-12-17T08:24:00-03:00",
                    "datetime_end": "1995-12-17T09:02:00-03:00",
                    "local": "at-05",
                    "day": 1
                }
            ],
            "name": "AED3",
            "subject": "AED3",
            "notification": [
                120,
                60,
                5
            ],
            "description": "aula do fulano",
            "color": "#f00",
            "is_subject": true,
            "mean": "(P0 + P1 + P2)/3",
            "grade": {
                "P0": 0,
                "P1": 5,
                "P2": null
            },
            "frequence": {}
        },
        {
            "id": 2,
            "weekly": true,
            "details": [
                {
                    "datetime_init": "1995-12-17T02:24:00-03:00",
                    "datetime_end": "1995-12-17T04:02:00-03:00",
                    "local": "ava2",
                    "day": 4
                },
                {
                    "datetime_init": "1995-12-17T03:24:00-03:00",
                    "datetime_end": "1995-12-17T08:02:00-03:00",
                    "local": "at-19",
                    "day": 5
                },
                {
                    "datetime_init": "1995-12-17T09:24:00-03:00",
                    "datetime_end": "1995-12-17T10:02:00-03:00",
                    "local": "at-05",
                    "day": 1
                },
                {
                    "datetime_init": "1995-12-17T00:24:00-03:00",
                    "datetime_end": "1995-12-17T09:30:00-03:00",
                    "local": "at-05",
                    "day": 2
                }
            ],
            "name": "AED4",
            "subject": "AED4",
            "notification": [
                120,
                60,
                5
            ],
            "description": "aula do fulano",
            "color": "#00f",
            "is_subject": true,
            "mean": "(P0 + P1 + P2)/3",
            "grade": {
                "P0": 0,
                "P1": 5,
                "P2": null
            },
            "frequence": {}
        }
    ];




    switch (props.mode) {
        case 0:
            return (<CalendarWeek tasks={events} />);
        case 1:
            return (<CalendarDay tasks={events} />);
        default:
            return (<CalendarMonth tasks={events} />);
    }
}

const hourHeight = hp('8%');
const weekHeight = hp('9%');
const weekBall = hp('3%');
const weekDayBall = 40;
const weekBallColor = "#f00";
const hourWidth = wp('12.5%');
const dividerHeight = 1;
const dividerColor = 'rgba(1, 1, 1, 0.4)';
const cardLineWidth = 2;
const timeWidth = wp("100%") - 7 * hourWidth;
let bgColor = "#F8F8F8";
let cinza = '#ddd';
const subjectWidth = hourWidth * 0.9

const dayComponentMargin = 20;
const dayComponentWidth = (wp('100%') - 2 * dayComponentMargin) / 7;
const dayComponentHeight = wp('100%') / 7;



const WeekTab = createMaterialTopTabNavigator();
function CalendarDay(props) {
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
        tasksList[l].sort((a, b) => { return new Date(a["details"][0]["datetime_init"]) - new Date(b["details"][0]["datetime_init"]) })
    }
    return (
        <View style={{ backgroundColor: "#000", width: wp("100%"), flexGrow: 1 }}>
            <WeekTab.Navigator initialRouteName="Dom" tabBar={props => <MyTabBar {...props} />}>
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


function CalendarMonth(props) {
    const pivot = props.pivot ?? new Date();


    const [activedDate, setActive] = useState(new Date());
    const today = new Date()
    const firstDayOfMonth = new Date(today.getTime() - ((today.getDate() - 1) * 24 * 60 * 60 * 1000));
    let current = new Date(firstDayOfMonth.getTime() - (firstDayOfMonth.getDay() * 24 * 60 * 60 * 1000));
    let month = []
    let i = 0;
    do {
        if (i == 0) month.push([]);
        month[month.length - 1].push({ date: current, thisMonth: (current.getMonth() == today.getMonth()), active: sameDay(current, activedDate), today: sameDay(current, today)})
        current = new Date(current.getTime() + (24 * 60 * 60 * 1000))
        i = (i + 1) % 7
    } while (current.getMonth() == today.getMonth() || current.getDay() != 0);

    return (<>
        <Days height={dayComponentHeight} width={dayComponentWidth} />
        <View style={{
            alignItems: "center",
            justifyContent: "center",
            alignSelf: "center"
        }}>
            {
                month.map((week, i) => {
                    return (<View key={i} style={{
                        height: dayComponentHeight,
                        alignItems: "center",
                        justifyContent: "center",
                        alignSelf: "center",
                        flexDirection: "row"
                    }}>
                        {week.map((day, j) => {
                            return (<DayComponent set={()=>setActive(day.date)} day={day.date} today={day.today} active={activedDate} key={j} thisMonth={day.thisMonth}/>);
                        })}
                    </View>);

                })
            }</View>
    </>);
}

function DayComponent(props) {
    let current = props.day;
    const dayCircleSize = 2*dayComponentWidth/3
    const notificationCircleSize = dayComponentWidth/8
    const borderWidth = props.today == true? 1: 0;
    const isActive = sameDay(current, props.active) == true;
    const bgColor = isActive ? "#f00": "transparent";
    const textColor = isActive? "#fff": props.thisMonth == true ? "#FB8C00" : "#000";
    const hasEvent = current.getDate() % 6 == 0;

    return (<View style={{width: dayComponentWidth, height: dayComponentHeight, alignItems:"center"
    }}>
        <TouchableOpacity style={{borderRadius:100,backgroundColor: bgColor,borderColor:"#f00",borderWidth:borderWidth,justifyContent:"center",
            width: dayCircleSize, height: dayCircleSize}} onPress={props.set}>
        <Text style={{
            textAlign: "center",
            color:textColor
        }}>
            
            {current.getDate()}
        </Text>   
        <View style={{borderRadius:100, backgroundColor:hasEvent?"#0f0":"transparent",alignSelf:"flex-end",position:"absolute",
            width: notificationCircleSize, height: notificationCircleSize, right:dayCircleSize/2, bottom:dayCircleSize/20}}/>     
        </TouchableOpacity>
        
        </View>)
}

function sameDay(a, b) {
    return a.getMonth() == b.getMonth() && a.getDate() == b.getDate() && a.getYear() == b.getYear();
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

function Random() {
    const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
    return (<View style={{ backgroundColor: randomColor, flex: 1, width: wp("100%") }} />);
}

function WeekDay(props) {

    const width = props.width ?? weekDayBall;
    const height = props.height ?? weekDayBall;
    if (props.active)
        return (<View style={{ backgroundColor: weekBallColor, width: width, height: height, borderRadius: 100, alignItems: "center", justifyContent: "center" }}>
            <Text style={{ color: '#fff' }}>
                {props.label}
            </Text>
        </View>);
    else
        return (<View style={props.today == true ? { borderRadius: 100, borderWidth: 1, borderColor: weekBallColor, width: width, height: weekDayBall, alignItems: "center", justifyContent: "center" } : { width: width, height: weekDayBall, alignItems: "center", justifyContent: "center" }}>
            <Text style={{ color: '#000' }}>
                {props.label}
            </Text>
        </View>);
}

// Calendário modo semana
function CalendarWeek(props) {

    let tasks = props.tasks

    const today = new Date()
    const first = new Date(today.getTime() - (today.getDay() * 24 * 60 * 60 * 1000));
    const last = new Date(today.getTime() + ((7 - today.getDay()) * 24 * 60 * 60 * 1000));

    const days = { begin: first.getDate(), end: last.getDate(), today: today.getDate() };


    return (
        <>
            <View style={styles.semana}>
                <View style={styles.dias, { width: timeWidth }} />
                <Days days={days} />

            </View>
            <ScrollView style={styles.scroll} scrollEnabled={true} >
                <View style={styles.planilha}>

                    <ColunaHora />
                    <Grid />
                    <Coluna tasks={tasks} />
                </View>
            </ScrollView>
        </>
    );
}

// É a barra da semana
function Days(props) {
    const width = props.width ?? weekBall;
    const height = props.height ?? weekBall;
    let days = [];
    const week = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    if (props.days != null) {

        for (let i = props.days['begin']; i <= props.days['end']; i++) {
            days.push({
                title: week[i - props.days['begin']],
                day: i,
                today: props.days['today'] == i,
            })
        }
        return (
            <>{
                days.map((day, i) => {
                    return (
                        <View style={styles.dias} key={i}>
                            <Text>
                                {day.title}
                            </Text>
                            <View style={{ alignItems: "center", width: width, height: height, borderRadius: 100, backgroundColor: day.today ? weekBallColor : "tansparent" }}>
                                <Text style={{ color: day.today ? BWFont(weekBallColor) : '#000' }}>
                                    {day.day}
                                </Text>
                            </View>
                        </View>)
                })
            }</>);
    } else {
        return (
            //todo arrumar isso para deixar igual a outra barra
            <View style={{ ...styles.semana, justifyContent: "center", height: height }}>{
                week.map((weekDay, i) => {
                    return (
                        <WeekDay label={weekDay} height={height} width={width} key={i} active={false} today={false} />
                    )
                })
            }</View>);
    }
}

// Instancia e posiciona as Tarefas
function Coluna(props) {
    const tasks = props.tasks;
    if (tasks.length != 0) {
        return (
            <View style={styles.column, { position: "absolute", top: 13 }}>
                {
                    tasks.map((task, i) => {


                        return (<Task task={task} key={i} />)


                    })}
            </View>
        );
    } else {
        return (<></>);
    }
}

// É a coluna da hora
function ColunaHora(props) {

    let initialTime = { hour: 0, minute: 0 };
    let finalTime = { hour: 23, minute: 59 };

    let fillers = thinkFiller0(initialTime, finalTime, false);
    return (
        <View style={styles.column, { paddingTop: 13 }}>
            {fillers.map((space, i) => { return (<Space space={space} width={timeWidth} text={space.hour + "h00"} key={i} hasDivider={false} transparent={true} />) })}
        </View>
    )


}

// Constrói o campo de linhas que fica no fundo
function Grid(props) {
    let initialTime = { hour: 0, minute: 0 };
    let finalTime = { hour: 23, minute: 59 };

    let fillers = thinkFiller0(initialTime, finalTime, true);
    return (
        <View style={styles.column, { zIndex: 1, backgroundColor: bgColor, top: 0, paddingTop: 13, }}>
            {fillers.map((space, i) => { return (<Space space={space} width={wp("100%")} key={i} hasDivider={true} />) })}
        </View>
    )
}

// Função que decide o tamanho de cada space e o que tem nele
function thinkFiller0(divider) {
    let result = [];
    for (let i = 0; i < 24; i++) {
        result.push({
            size: hourHeight,
            divider: divider,
            hour: i
        })
    }
    return result;
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

function Card(props) {
    const endTime = new Date(props.task["details"][0]["datetime_end"]);
    const initTime = new Date(props.task["details"][0]["datetime_init"]);
    const finalStr = endTime.getHours().toString().padStart(2, '0') + "h" + endTime.getMinutes().toString().padStart(2, '0');
    const inicioStr = initTime.getHours().toString().padStart(2, '0') + "h" + initTime.getMinutes().toString().padStart(2, '0');
    const cor = props.task["color"] == null ? cinza : props.task["color"];
    return (
        <>
            <View style={{ flexDirection: 'row', height: wp('17%'), borderBottomWidth: 1, borderBottomColor: cinza, backgroundColor: bgColor }}>
                <View style={{ width: wp('17%'), justifyContent: 'center', alignItems: 'center', borderRightWidth: cardLineWidth, borderRightColor: cor }}>
                    <Text style={{ fontSize: 17, padding: 5 }}>{inicioStr}</Text>
                    <Text style={{ fontSize: 13 }}>{finalStr}</Text>
                </View>
                <View style={{ justifyContent: 'center', height: wp('17%'), flex: 1, padding: 10 }}>
                    <Text style={{ height: wp('17%') - 30, overflow: "hidden", flexWrap: 'wrap', textAlignVertical: 'center' }} >{props.task["name"]}</Text>
                    <Text style={{ height: 30 }}>{props.task["details"][0]["local"]}</Text>
                </View>
                <View style={{ alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                    <IconButton
                        icon="chevron-right"
                        color={'#616161'}
                        size={20}
                        onPress={() => console.log('Editar evento')}
                    />
                </View>
            </View>

        </>);
}

// É basicamente uma linha em branco, com ou sem hora, com ou sem divisor
function Space(props) {

    const size = props.space['size'];
    const divider = props.space['divider'];
    const width = props.width == null ? hourWidth : props.width;

    if (divider) {
        return (
            <View style={styles.column, { borderTopWidth: props.hasDivider == null ? 0 : 1, borderColor: dividerColor, }}>
                <View style={
                    {
                        backgroundColor: props.transparent ? 'transparent' : bgColor,
                        height: size - 1,
                        width: width,
                        alignItems: "flex-start",
                        justifyContent: "flex-start",
                        padding: 0,
                    }
                }>

                    <Text style={{ justifyContent: 'center', position: "absolute", top: -13 }}>
                        {props.text}
                    </Text>
                </View>
            </View>
        )
    }
    else {
        return (<View style={
            {

                backgroundColor: props.transparent ? 'transparent' : bgColor,
                height: size,
                width: width,
                backgroundColor: bgColor,
                alignItems: "center",
                justifyContent: "center",
                padding: 0,


            }
        }><Text style={{ justifyContent: 'center', position: "absolute", top: -13 }}>{props.text}</Text></View>)
    }
}

// Card das Tarefas
function Task(props) {

    const task = props.task;

    if (!task["weekly"]) return (<></>);

    const details = task["details"];

    return (

        <>
            {
                details.map((detail, i) => {

                    const initTime = new Date(detail["datetime_init"]);
                    const endTime = new Date(detail["datetime_end"]);
                    const posmin = initTime.getHours() * 60 + initTime.getMinutes();
                    const minutes = ((endTime - initTime) / 1000) / 60;
                    const size = (minutes / 60) * hourHeight;
                    const index = detail['day']
                    return (<View key={i}
                        style={{
                            height: size,
                            width: subjectWidth,
                            backgroundColor: task["color"],
                            borderRadius: 5,
                            padding: 0,
                            justifyContent: "center",
                            alignItems: "center",
                            alignContent: "center",
                            alignSelf: "center",
                            position: "absolute",
                            zIndex: 2,
                            left: timeWidth + hourWidth * (index),
                            top: (posmin / 60) * hourHeight
                        }}
                    >
                        <Text style={{ color: BWFont(task.color), margin: 2, fontSize: 14, textAlign: "justify", padding: 0 }}>
                            {task["name"]}
                        </Text>
                    </View>)
                })}
        </>);
}

// Estilo
const styles = StyleSheet.create({
    semana: {
        height: hourHeight,
        width: wp('100%'),
        backgroundColor: bgColor,
        justifyContent: 'space-between',
        alignItems: "center",
        flexDirection: "row",

    },
    planilha: {
        backgroundColor: bgColor,
        justifyContent: 'space-between',
        alignItems: "center",
        flexDirection: "row",


    },
    scroll: {
        width: wp('100%'),
        backgroundColor: bgColor,
        flex: 1,
        flexGrow: 1,

    },
    column: {
        flexDirection: "column",
    },
    dias: {
        width: hourWidth,
        height: weekHeight,
        backgroundColor: bgColor,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: "center",

    },
    circulo: {
        height: 24 * (hourHeight + dividerHeight),
        width: hourWidth,
        backgroundColor: bgColor,
    },
    horario: {
        height: 24 * (hourHeight + dividerHeight),
        width: hourWidth,
        backgroundColor: '#F4F',
    }
});

// Função que decide a cor da fonte com base na cor de fundo
function BWFont(backgroundColor) {
    let r = 0, g = 0, b = 0;

    // Converte cor em hex para decimal
    if (backgroundColor.length == 4) {
        r = parseInt("0x" + backgroundColor.substring(1, 2) + backgroundColor.substring(1, 2));
        g = parseInt("0x" + backgroundColor.substring(2, 3) + backgroundColor.substring(2, 3));
        b = parseInt("0x" + backgroundColor.substring(3, 4) + backgroundColor.substring(3, 4));
    }
    if (backgroundColor.length == 7) {
        r = parseInt("0x" + backgroundColor.substring(1, 3));
        g = parseInt("0x" + backgroundColor.substring(3, 5));
        b = parseInt("0x" + backgroundColor.substring(5, 7));
    }


    if ((r * 0.299 + g * 0.587 + b * 0.114) > 186)
        return "#000000"
    else
        return "#ffffff"
}