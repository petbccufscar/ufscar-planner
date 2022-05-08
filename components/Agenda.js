import { floor } from "mathjs";
import React, { useEffect, useState, useRef } from "react";
import {
    Text,
    View,
    TouchableOpacity,
    Alert,
    StyleSheet,
    LayoutAnimation,
    Linking,
    TextInput,
    ActivityIndicator
} from "react-native";
import { useTheme } from "react-native-paper";
import { floorDate, offsetDate, weekDaysNames } from "../helpers/helper";
import { CalendarTask } from './CalendarTask';
import { FlatList } from "react-native-bidirectional-infinite-scroll";


const formatDate = (dataFormatar) => {
    const data = new Date(dataFormatar);
    return (
        data.getFullYear() + "-" +
        ("0" + (data.getUTCMonth() + 1)).slice(-2) +
        "-" +
        ("0" + data.getUTCDate()).slice(-2)
    );
}

function floorDate2Date(date) {
    const data = new Date(date);
    return (new Date(data.getTime() + new Date().getTimezoneOffset() * 60000))
}



function RenderCalendarRow(props){
    const date = props.date;	
    const month = props.month;
    const weekDays = []
    const domingo = offsetDate(date, -date.getDay())
    let aux = domingo
    for(let i = 0; i < 7; i++){
        weekDays.push(aux)
        aux = offsetDate(aux, 1)
    }

    return (<View style={{ flexDirection: "row", flex: 1 }}>
        {weekDays.map((day, index) => (<RenderCalendarCell key={index} day={day} month={month}/>))}</View>
        )
        
}

function RenderCalendarCell(props){
    const date = props.day;
    const month = props.month;    
    return(<TouchableOpacity style={{flex:1, alignItems: 'center',justifyContent:'center'}}>
        <View style={{ borderRadius:30,
    aspectRatio: 1, backgroundColor: 'transparent', flex:1, alignContent:'center', justifyContent:'center'}}>
        
        <Text style={{textAlign:'center'}}>{date.getDate()}</Text>
        <View style={{borderRadius:30, aspectRatio:1, backgroundColor:'transparent', width:10, position: 'absolute', bottom:0, alignSelf:'center'}}/>
        </View>
    </TouchableOpacity>)
}



const sleep = ms => new Promise(r => setTimeout(r, ms));

function RenderDay(props) {
    const day = props.day || new Date();
    const items = props.items[floorDate(day)] || [];
    const semana = weekDaysNames
    const diaSemana = semana[day.getUTCDay()]
    const colors = useTheme().colors;
    const isToday = floorDate(day) == floorDate(new Date())
    const styles = StyleSheet.create({
        linha: {
            flexDirection: "row",
            flex: 1,
            margin: 10
        },
        diaNum: {
            fontSize: 30,
            color: isToday? colors.primary : colors.onSurface
        },
        dia: {
            alignItems: 'center',
            width: 40,
            paddingTop: 2
        },
        diaText: {
            color: isToday? colors.primary : colors.onSurface
        },
        taskContainer: {
            flex: 1
        }

    })
    return (<View style={styles.linha}>
        <View style={styles.dia}>
            <Text style={styles.diaNum}>{`${day.getUTCDate()}`}</Text>
            <Text style={styles.diaText}>{`${diaSemana}`}</Text>
        </View>
        <View style={styles.taskContainer}>
            {
                items.map((item, index) => (<CalendarTask style={{ marginTop: 0 }} key={index} task={item}></CalendarTask>))
            }
        </View>

    </View>

    )
}


export default function Agenda(props){
    const items = props.items;
    return (<View style={{flex:1}}>
    
    <RenderMonthCalendar year={2022} month={5}/>
    <View style={{flex:1}}>

        {/* <AgendaList items={items}></AgendaList> */}
    </View>
    </View>)
}

function RenderMonthCalendar(props){
    let aux = new Date(props.year, props.month, 1)
    let weeksRep = []
    for (let i = 0; i < 6; i++) {
        weeksRep.push(aux)
        aux = offsetDate(aux, 7)
    }

    return (<View style={{flex:1, backgroundColor:'red', padding: 20, maargin: 20}}>
        <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center', padding: 10}}>
            <Text style={{fontSize:20}}>Mes tal do ano tal</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
            {weekDaysNames.map((day, index) => (<Text style={{flex:1, textAlign:'center', fontWeight:'bold'}} key={index}>{day}</Text>))}
        </View>
        {
            weeksRep.map((week, index) => (<RenderCalendarRow key={index} date={week} month={props.month}/>))
        }
    </View>)
}

export function AgendaList(props) {
    const items = props.items;
    // const selectedDate = props.selectedDate;
    // const setSelectedDate = props.setSelectedDate;
    const [firtsDate, setFirstDate] = useState(new Date());
    const [lastDate, setLastDate] = useState(new Date());
    const offsetUp = 3;
    const offsetDown = 30;

    const colors = useTheme().colors
    let [daysToRender, setDaysToRender] = useState({});


    const loadAtEnd = async (w = true) => {
        let daysAux = { ...daysToRender };
        for (let i = 0; i <= offsetDown; i++) {
            const aux = offsetDate(lastDate, i);
            daysAux[floorDate(aux)] = items[floorDate(aux)] || [];
        }
        setLastDate(offsetDate(lastDate, offsetDown));
        if (w) {
        await sleep(20)
        }
        setDaysToRender(daysAux);
    }
    const loadAtStart = async ()  => {
        const start = offsetDate(firtsDate, -offsetUp);
        let daysAux = {};
        for (let i = 0; i <= offsetUp; i++) {
            const aux = offsetDate(start, i);
            daysAux[floorDate(aux)] = items[floorDate(aux)] || [];
        }
        setFirstDate(start);
        await sleep(20)
        setDaysToRender({...daysAux, ...daysToRender });
    }
    const [selectedDate, setSelectedDate] = useState(new Date());

    const _onViewableItemsChanged = React.useRef(({ viewableItems, changed }) => {
    if (viewableItems.length > 0) {
        const fdate = viewableItems[0].item
        setSelectedDate(floorDate2Date(fdate));
    }
    }, []);



    if (Object.keys(daysToRender).length === 0) {
        const init = loadAtEnd(false)
    }


    const _viewabilityConfig = {
        itemVisiblePercentThreshold: 0
    }
    return (
        <FlatList 
        onEndReached={loadAtEnd}
        onStartReached={loadAtStart}
        onStartReachedThreshold={100}
        onViewableItemsChanged={_onViewableItemsChanged.current}
        keyExtractor={(_, index) => index.toString()}   
        showDefaultLoadingIndicators={true}
        contentContainerStyle={{ flexGrow: 1 }}
        style={{ backgroundColor: colors.surface1 }} 
            viewabilityConfig={_viewabilityConfig} data={Object.keys(daysToRender).sort()} renderItem={({ item, index }) => (<RenderDay key={index} day={floorDate2Date(item)} index={index} items={daysToRender} />)}>
        </FlatList>
    )
}