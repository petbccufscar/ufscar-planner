import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { IconButton } from 'react-native-paper';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Entypo, Feather } from '@expo/vector-icons'
import { EditEvent } from './EditEvent';
//Para importar tudo desse arquivo:
//import {hourHeight, weekHeight, weekBall, weekDayBall, weekBallColor, WeekDay, hourWidth, dividerHeight, dividerColor, cardLineWidth, timeWidth, bgColor, cinza, subjectWidth, dayComponentMargin, dayComponentWidth, dayComponentHeight, Days, Card, DayComponent, sameDay, compareEvents, Random, styles, BWFont} from "./CalendarHelper" ;



export const hourHeight = hp('8%');
export const weekHeight = hp('9%');
export const weekBall = hp('3%');
export const weekDayBall = 40;
export const weekBallColor = "#f00";
export const hourWidth = wp('12.5%');
export const dividerHeight = 1;
export const dividerColor = 'rgba(1, 1, 1, 0.4)';
export const cardLineWidth = 2;
export const timeWidth = wp("100%") - 7 * hourWidth;
export let bgColor = "#F8F8F8";
export let cinza = '#ddd';
export const subjectWidth = hourWidth * 0.9

export const dayComponentMargin = 20;
export const dayComponentWidth = (wp('100%') - 2 * dayComponentMargin) / 7;
export const dayComponentHeight = wp('100%') / 7;


// É a barra da semana
export function Days(props) {
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
                            <View style={{ alignItems: "center", justifyContent:"center",alignContent:"center", width: width, height: height, borderRadius: 100, backgroundColor: day.today ? weekBallColor : "tansparent" }}>
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

export function AddButton(props){
    return (<TouchableOpacity style={{
        borderRadius: 60,
        backgroundColor: "red",
        width: wp('18%'),
        height: wp('18%'),
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        bottom: 10,
        right: 10
    }}
    onPress={() => props.navigation.navigate('EditEvent')}
    >
        <Entypo name='plus' size={60} color={'#fff'} />
    </TouchableOpacity>);
}

export function WeekDay(props) {

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


export function Card(props) {
    const endTime = new Date(props.task["details"][0]["datetime_end"]);
    const initTime = new Date(props.task["details"][0]["datetime_init"]);
    const finalStr = endTime.getHours().toString().padStart(2, '0') + "h" + endTime.getMinutes().toString().padStart(2, '0');
    const inicioStr = initTime.getHours().toString().padStart(2, '0') + "h" + initTime.getMinutes().toString().padStart(2, '0');
    const cor = props.task["color"] == null ? cinza : props.task["color"];
    const endTextColor = inicioStr == finalStr? "transparent" : "#000";
    return (
        <>
            <View style={{ flexDirection: 'row', height: wp('17%'), borderBottomWidth: 1, borderBottomColor: cinza, backgroundColor: bgColor }}>
                <View style={{ width: wp('17%'), justifyContent: 'center', alignItems: 'center', borderRightWidth: cardLineWidth, borderRightColor: cor }}>
                    <Text style={{ fontSize: 17, padding: 5 }}>{inicioStr}</Text>
                    <Text style={{ fontSize: 13, color:endTextColor}}>{finalStr}</Text>
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



export function DayComponent(props) {
    let current = props.day;
    const dayCircleSize = 2 * dayComponentWidth / 3
    const notificationCircleSize = dayComponentWidth / 8
    const borderWidth = props.today == true ? 1 : 0;
    const isActive = sameDay(current, props.active) == true;
    const bgColor = isActive ? "#f00" : "transparent";
    const textColor = isActive ? "#fff" : props.thisMonth == true ? "#FB8C00" : "#000";
    const hasEvent = props.event;

    return (<View style={{
        width: dayComponentWidth, height: dayComponentHeight, alignItems: "center"
    }}>
        <TouchableOpacity style={{
            borderRadius: 100, backgroundColor: bgColor, borderColor: "#f00", borderWidth: borderWidth, justifyContent: "center",
            width: dayCircleSize, height: dayCircleSize
        }} onPress={props.set}>
            <Text style={{
                textAlign: "center",
                color: textColor
            }}>

                {current.getDate()}
            </Text>
            <View style={{
                borderRadius: 100, backgroundColor: hasEvent ? "#0f0" : "transparent", alignSelf: "flex-end", position: "absolute",
                width: notificationCircleSize, height: notificationCircleSize, right: dayCircleSize / 2, bottom: dayCircleSize / 20
            }} />
        </TouchableOpacity>

    </View>)
}


export function getEvents(filtered){
    let listActived = {}
    for (const i in filtered) {
        const task = filtered[i];
        for (const j in task['details']) {
            //todo ver melhor essa parte, se eventos terão inicio e fim, ou só uma hora
            const detail = task['details'][j]
            if (detail['datetime_end'] != null) {
                const key = getDateStr(new Date(detail['datetime_end']));
                if (listActived[key] == null) listActived[key] = [];
                listActived[key].push({
                    ...task,
                    "name": "fim de " + task['name'],
                    "details": [{
                        ...detail,
                        "datetime_init": detail['datetime_end'],
                        "datetime_end": detail['datetime_end']
                    }]
                })
            }
            if (detail['datetime_init'] != null) {
                const key = getDateStr(new Date(detail['datetime_init']));
                if (listActived[key] == null) listActived[key] = [];
                listActived[key].push({
                    ...task,
                    "name": "inicio de " + task['name'],
                    "details": [{ ...detail, "datetime_end": detail['datetime_init'] }]
                })
            }
        }
    }
    return listActived;
}

export function getDateStr(date) {
    return date.getDate().toString() + "-" + date.getMonth().toString() + "-" + date.getYear().toString()
}

export function sameDay(a, b) {
    return a.getMonth() == b.getMonth() && a.getDate() == b.getDate() && a.getYear() == b.getYear();
}

export function compareEvents(a, b) { return new Date(a["details"][0]["datetime_init"]) - new Date(b["details"][0]["datetime_init"]) };

export function Random() {
    const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
    return (<View style={{ backgroundColor: randomColor, flex: 1, width: wp("100%") }} />);
}


// Estilo
export const styles = StyleSheet.create({
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
        height: hourHeight,
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
export function BWFont(backgroundColor) {
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