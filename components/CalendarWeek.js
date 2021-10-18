import React from 'react';
import { ScrollView, Text, View,TouchableOpacity } from "react-native";
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { bgColor, BWFont, Days, dividerColor, getDateStr, AddButton, getEvents , hourHeight, hourWidth, styles, subjectWidth, timeWidth } from "./CalendarHelper";
import { MaterialIcons } from '@expo/vector-icons'; 

// Calendário modo semana
export function CalendarWeek(props) {

    let tasks = props.tasks

    const today = new Date()
    const first = new Date(today.getTime() - (today.getDay() * 24 * 60 * 60 * 1000));
    const last = new Date(today.getTime() + ((7 - today.getDay()) * 24 * 60 * 60 * 1000));

    const days = { begin: first.getDate(), end: last.getDate(), today: today.getDate() };
    let listActived = getEvents(props.tasks)
    let current = first;
    let hasEvent = false;
    let weekList = [];
    do {
        let list = listActived[getDateStr(current)]??[];
        weekList.push(list);
        if (!hasEvent) hasEvent = (list.length > 0);
        current = new Date(current.getTime() + (24 * 60 * 60 * 1000));
    } while(current == first || current.getDay() > 0); 

    return (
        <>
            <View style={styles.semana}>
                <View style={styles.dias, { width: timeWidth }} />
                <Days days={days} />
            </View>
            <ScrollView style={styles.scroll} scrollEnabled={true} >
                {hasEvent?(<View style={{
                backgroundColor: bgColor,
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection:'row',
                alignSelf: "center"}}>
                <View style={styles.dias, { width: timeWidth }} />
                {
                    weekList.map((listEvents, index) => {
                        if (listEvents.length == 0){
                            return (<View style={{ alignItems: "center", width: hourWidth}} key={index}/>)
                        } else {
                            //todo exibir modal
                            return (<TouchableOpacity style={{ alignItems: "center", width: hourWidth}} key={index}>
                                <MaterialIcons name="assignment-late" size={24} color="black" />
                            </TouchableOpacity>);
                        }
                    })
                }
            </View>):(<></>)
            }
                <View style={styles.planilha}>

                    <ColunaHora />
                    <Grid />
                    <Coluna tasks={tasks} />
                </View>
            </ScrollView>
            <AddButton navigation={props.navigation}/>
        </>
    );
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