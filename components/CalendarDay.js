import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React, {useState} from 'react';
import { Text, TouchableOpacity, View, FlatList, Alert } from "react-native";
import { IconButton } from 'react-native-paper';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { bgColor, Card, cardLineWidth, cinza, compareEvents, WeekDay } from "./CalendarHelper";
import {Calendar, CalendarList, Agenda, ExpandableCalendar, AgendaList} from 'react-native-calendars';
import { useSelector, useDispatch } from 'react-redux';
import {Task as CalendarTask} from './CalendarTask'
import {LocaleConfig} from 'react-native-calendars';

LocaleConfig.locales['pt'] = {
  monthNames: ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outobro','Novembro','Dezembro'],
  monthNamesShort: ['Jan.','Fev.','Mar','Abril','Mai','Jun','Jul','Agos','Set','Out','Nov','Dez.'],
  dayNames: ['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado'],
  dayNamesShort: ["Dom","Seg","Ter","Qua","Qui","Sex","Sáb"],
  today: 'Hoje'
};
LocaleConfig.defaultLocale = 'pt';
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
    let routes = ["Dom","Seg","Ter","Qua","Qui","Sex","Sáb"]
    return (
        <View style={{ backgroundColor: "#000", width: wp("100%"), height: hp("50%") }}>
                <EventsScreen/>
        </View>
    );
}


const offsetDate = (date, days) => {
    return new Date(date.getTime() + days * 24 * 60 * 60 * 1000);
}

const floorDate = (data) => {
    return (data.getFullYear() + "-" + ((data.getMonth() + 1).toString().padStart(2, '0')) + "-" + (data.getDate().toString().padStart(2, '0') )) ;
}

const compare = (e, f) => {
    return Date.parse(e.detail.datetime_init) - Date.parse(f.detail.datetime_init)
}


const EventsScreen = () => {


    const offset = 40;
    const events = useSelector(state => state.events.events);
    let items = {}
    let marked = {}
    const [stMarked, setStMarked] = useState({});
    const [stItems, setStItems] = useState({});
    const [loading, setLoading] = useState(true);

    const repeat = (event) => {
        let datei = offsetDate(new Date(), -offset)
        const datef = offsetDate(new Date(), offset)
        let toDay = new Date(event.detail.datetime_init).getDay() - event.detail.day
        if (toDay < 0){
            toDay += 7
        }
        datei = offsetDate(datei, toDay)

        while (datei.getTime() <= datef.getTime()){
            const date = floorDate(datei)
            if( items[date] == null){
                items[date] = [event]
            } else { 
                items[date].push(event)
            }
            datei = offsetDate(datei, 7)
        }

    }
    const setup = async () => {
        for (let i = 0; i < events.length; i++){
            for (let j = 0; j < events[i].details.length; j++){
                const obj = {
                    ...events[i],
                    detail: events[i].details[j]
                }
                const aux = new Date(obj.detail.datetime_init)
                const date = floorDate(aux)
                if (events[i].weekly){
                    repeat(obj)
                }else{
                    if( items[date] == null){
                        items[date] = [obj]
                    } else { 
                        items[date].push(obj)
                    }
                    marked[date] = {marked:true}
                }
            }
        }
        const keys = Object.keys(items)
        for (let i = 0; i < keys.length; i++){
            items[keys[i]].sort(compare)
        }

        let datei = offsetDate(new Date(), -offset)
        const datef = offsetDate(new Date(), offset)

        while (datei.getTime() <= datef.getTime()){
            const date = floorDate(datei)
            if( items[date] == null){
                items[date] = []
            } 
               
            datei = offsetDate(datei, 1)
        }


        setStMarked(marked)
        setStItems(items)
    }
    if (loading){
        setLoading(false)
        setup();
    }

    const renderItem = item => (
        <CalendarTask task={item}></CalendarTask>
    );
  
    const renderEmptyDate = () => {
      return (
        <View style={{backgroundColor: 'transparent', width:100, height:100}}>
        </View>
      );
    };

    const rowHasChanged = (r1, r2) => r1.name !== r2.name;
    return (
        <Agenda
          items={stItems}
          selected={new Date()}
          renderItem={renderItem}
          renderEmptyDate={renderEmptyDate}
          rowHasChanged={rowHasChanged}
          markedDates={stMarked}
        />
    );
  };

function CardsTimeline(props) {

    const last = props.tasks.length - 1
    const first = props.tasks.length > 0 ? props.tasks[0]["details"][0]["datetime_init"] : null;

    return (
        <FlatList
            style={{ marginTop: 10 }}
            ListHeaderComponent={<HorarioLivre final={first} />}
            data={props.tasks}
            renderItem={(item) => { 
                return(
                <View>
                    <Card task={item.item}/>
                    <HorarioLivre initial={item.item["details"][0]["datetime_end"]} final={item.index < last ? props.tasks[item.index + 1]["details"][0]["datetime_init"] : null} />
                </View>);}}
            keyExtractor={(item, index) => index.toString()}
        />)
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

