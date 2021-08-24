import { View, StyleSheet, ScrollView, Text } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import React, { Fragment } from 'react';

// Esse será o componente principal, que vai gerenciar qual modo de calendário
export function CalendarComponent() {
    return (<CalendarWeek />);
}

const hourHeight = hp('8%');
const weekHeight = hp('9%');
const weekBall =  hp('3%');
const weekBallColor = "#f00";
const hourWidth = wp('12.5%');
const dividerHeight = 1;
const dividerColor = 'rgba(1, 1, 1, 0.4)';
const timeWidth = wp("100%") - 7 * hourWidth;
let bgColor = "#F8F8F8";
const subjectWidth = hourWidth * 0.9

// Calendário modo semana
function CalendarWeek(props) {

    const tasks = [

        [{ color: "#400", initTime: { hour: 3, minute: 0 }, endTime: { hour: 4, minute: 0 }, name: "Matéria X" },
        { color: "#ef1", initTime: { hour: 21, minute: 0 }, endTime: { hour: 23, minute: 1 }, name: "Matéria X" }],
        [{ color: "#444", initTime: { hour: 1, minute: 0 }, endTime: { hour: 4, minute: 0 }, name: "Matéria X" },
        { color: "#ef1", initTime: { hour: 20, minute: 0 }, endTime: { hour: 21, minute: 0 }, name: "Matéria X" }],
        [{ color: "#444", initTime: { hour: 1, minute: 0 }, endTime: { hour: 4, minute: 0 }, name: "Matéria X" },
        { color: "#ef1", initTime: { hour: 20, minute: 0 }, endTime: { hour: 23, minute: 0 }, name: "Matéria X" }],
        [{ color: "#400", initTime: { hour: 2, minute: 0 }, endTime: { hour: 3, minute: 0 }, name: "Matéria " },
        { color: "#ef1", initTime: { hour: 22, minute: 0 }, endTime: { hour: 22, minute: 50 }, name: "Matéria H" }],
        [],
        // [{ color: "#f00", initTime: { hour: 0, minute: 0 }, endTime: { hour: 23, minute: 59 }, name: "Matéria X" },],
        [{ color: "#f00", initTime: { hour: 0, minute: 0 }, endTime: { hour: 23, minute: 59 }, name: "Matéria X" },],
    ];

    const days = { begin: 20, end: 26, today: 23 };


    return (
        <>
            <View style={styles.semana}>
                <View style={styles.dias, { width: timeWidth }} />
                <Days days={days}/>

            </View>
            <ScrollView style={styles.scroll} scrollEnabled={true} >
                <View style={styles.planilha}>

                    <ColunaHora />
                    <Grid />
                    <Coluna tasks={tasks[0]} columnIndex={0} />
                    <Coluna tasks={tasks[1]} columnIndex={1} />
                    <Coluna tasks={tasks[2]} columnIndex={2} />
                    <Coluna tasks={tasks[3]} columnIndex={3} />
                    <Coluna tasks={tasks[4]} columnIndex={4} />
                    <Coluna tasks={tasks[5]} columnIndex={5} />
                </View>
            </ScrollView>
        </>
    );
}

// É a barra da semana
function Days(props) {
    let days = [];
    const week = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    
    for (let i = props.days['begin']; i <= props.days['end']; i++) {
        days.push({
            title: week[i - props.days['begin']],
            day: i,
            today: props.days['today'] == i,
        })
    }
    return (
        <>{
            days.map((day, i) => {return (
                <View style={styles.dias} key={i}>
                    <Text>
                        {day.title}
                    </Text>
                    <View style={{alignItems: "center",width: weekBall, height:weekBall, borderRadius: 100,backgroundColor: day.today?weekBallColor:"tansparent"}}>
                        <Text style={{color: day.today? BWFont(weekBallColor):'#000'}}>
                            {day.day}
                        </Text>
                    </View>
                </View>)
            })
        }</>);
}

// Instancia e posiciona as Tarefas
function Coluna(props) {
    const tasks = props.tasks;
    if (tasks.length != 0) {
        return (
            <View style={styles.column, { position: "absolute", top: 13 }}>
                {
                    tasks.map((task, i) => {
                        return (<Task task={task} columnIndex={props.columnIndex} key={i} />)
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
function thinkFiller0(initial, final, divider) {
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

    const posmin = task.initTime.hour * 60 + task.initTime.minute;

    const minutes = (task.endTime.hour * 60 + task.endTime.minute) - posmin;
    const size = (minutes / 60) * hourHeight;

    const index = props.columnIndex;
    return (<View
        style={{
            height: size,
            width: subjectWidth,
            backgroundColor: task.color,
            borderRadius: 5,
            padding: 0,
            justifyContent: "center",
            alignItems: "center",
            alignContent: "center",
            alignSelf: "center",
            position: "absolute",
            zIndex: 2,
            left: timeWidth + hourWidth * (1 + props.columnIndex),
            top: (posmin / 60) * hourHeight
        }}
    >
        <Text style={{ color: BWFont(task.color), margin: 2, fontSize: 14, textAlign: "justify", padding: 0 }}>
            {task.name}
        </Text>
    </View>);
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