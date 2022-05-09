import { floor, random } from "mathjs";
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
import { floorDate, monthNames, offsetDate, weekDaysNames } from "../helpers/helper";
import { CalendarTask } from './CalendarTask';
import { FlatList } from "react-native-bidirectional-infinite-scroll";
import { MaterialIcons } from '@expo/vector-icons';

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
    const colors = props.colors
    const date = props.date;	
    const open= props.open;
    const marked = props.marked;
    const month = props.month;
    const setOpen = props.setOpen
    const selectedDate = props.selectedDate;
    const setSelectedDate = props.setSelectedDate
    const weekDays = []
    const domingo = offsetDate(date, -date.getDay())
    let aux = domingo
    for(let i = 0; i < 7; i++){
        weekDays.push(aux)
        aux = offsetDate(aux, 1)
    }

    return (<View style={{ flexDirection: "row"}}>
        {weekDays.map((day, index) => (<RenderCalendarCell marked={marked} open={open} setOpen={setOpen} selectedDate={selectedDate} setSelectedDate={setSelectedDate} colors={colors} key={index} day={day} month={month}/>))}</View>
        )
        
}

function RenderCalendarCell(props){
    const date = props.day;
    const colors = props.colors;
    const month = props.month;   
    const open = props.open;
    const setOpen = props.setOpen
    const isToday = floorDate(date) == floorDate(new Date())
    const selected = floorDate(date) == floorDate(props.selectedDate);
    const setSelectedDate = props.setSelectedDate
    const hasEvent = Object.keys(props.marked).includes(floorDate(date));
    if(isToday){
        console.log(props.marked)
    }
    if(open && date.getMonth() != month){
        return (<View style={{flex:1}}></View>)
    }

    return(<TouchableOpacity style={{width:"14.28%",aspectRatio:1, alignItems: 'center',justifyContent:'center'}} onPress={()=>{setSelectedDate(date); setOpen(false)}}>
        <View style={{ borderRadius:30,
    aspectRatio: 1, backgroundColor: selected?colors.primary:'transparent', width:'80%', alignContent:'center', justifyContent:'center'}}>
        
        <Text style={{textAlign:'center', color: selected? colors.onPrimary: isToday? colors.primary: date.getMonth() == month ? colors.onSurface: colors.outline}}>{date.getDate()}</Text>
        <View style={{borderRadius:30, aspectRatio:1, backgroundColor:hasEvent?selected?colors.onPrimary:colors.primary:'transparent', width:10, position: 'absolute', bottom:0, alignSelf:'center'}}/>
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

    const Divisor = () =>
    {   const yesterday = offsetDate(day, -1)
        return (<View style={{alignItems:'center', justifyContent:'center'}}>
            <Text style={{fontSize:20, color: colors.onPrimaryContainer}}>{`Fim de ${monthNames[yesterday.getMonth()]} ${yesterday.getFullYear()}`}</Text>
            <Text style={{fontSize:20, color: colors.onPrimaryContainer}}>{`Inicio de ${monthNames[day.getMonth()]} ${day.getFullYear()}`}</Text>
        </View>)
    } 

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
    return (<>
    {1 == day.getDate() && (
        <Divisor/>
    )}
    <View style={styles.linha}>
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
    </>
    )
}

function nextMonth(month){
    obj = {}
    if(month.month == 11){
        obj['month'] = 0
        obj['year'] = month.year + 1
    } else {
        obj['month'] = month.month + 1
        obj['year'] = month.year 
    }
    return obj
}

function prevMonth(month){
    obj = {}
    if(month.month == 0){
        obj['month'] = 11
        obj['year'] = month.year - 1
    } else {
        obj['month'] = month.month - 1
        obj['year'] = month.year
    }
    return obj
}

export default function Agenda(props){
    const colors = useTheme().colors;
    const items = props.items;
    const marked = props.marked;
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [open, setOpen] = useState(false);

    const [changedByController, setChangedByController] = useState(false);
    const [loadedMonth, setLoadedMonth] = useState([{month: selectedDate.getMonth(), year: selectedDate.getFullYear()}]);
    const [lastMonth, setLastMonth] = useState({month: selectedDate.getMonth(), year: selectedDate.getFullYear()});
    const [firstMonth, setFirstMonth] = useState({month: selectedDate.getMonth(), year: selectedDate.getFullYear()});

    const msetOpen = (value) => {
        setOpen(value);
        setChangedByController(true)
    }


    const loadAtEnd = async () => {
        let aux = []
        let auxMonth = lastMonth
        for (let i = 0; i < 3; i++) {
            auxMonth = nextMonth(auxMonth)
            aux.push(auxMonth)
        }
        setLastMonth(auxMonth)
        // await sleep(20)
        setLoadedMonth([...loadedMonth,...aux])
        return []
    }

    const loadAtStart = async () => {
        let aux = []
        let auxMonth = firstMonth
        for (let i = 0; i < 3; i++) {
            auxMonth = prevMonth(auxMonth)
            aux = [auxMonth, ...aux]
        }
        setFirstMonth(auxMonth)
        await sleep(20)
        setLoadedMonth([...aux,...loadedMonth])
        return []
    }
    if (loadedMonth.length < 3)
        loadAtEnd()

    if (open){
        return (<View style={{flex:1}}>
            <FlatList
            onStartReached={loadAtStart}
            data={loadedMonth}
            marked={marked}
            onEndReached={loadAtEnd}
            renderItem={({ item }) => <RenderMonthCalendar open={open} setOpen={msetOpen} colors={colors} selectedDate={selectedDate} setSelectedDate={setSelectedDate} year={item.year} month={item.month}/>}
            showDefaultLoadingIndicators={true}
            />
            </View>)
    }
    return (<View style={{flex:1}}>
    
    <RenderMonthCalendar marked={marked} colors={colors} open={open} setOpen={msetOpen} selectedDate={selectedDate} setSelectedDate={setSelectedDate} year={selectedDate.getFullYear()} month={selectedDate.getMonth()}/>
    <View style={{flex:1}}>
        
        <AgendaList setSelectedDate={setSelectedDate} changedByController={changedByController} setChangedByController={setChangedByController} selectedDate={selectedDate} items={items}></AgendaList>
        </View>
    </View>)
}

function RenderMonthCalendar(props){
    const colors = props.colors;
    const open = props.open
    const marked = props.marked
    const setOpen = props.setOpen
    const selectedDate = props.selectedDate;
    const setSelectedDate = props.setSelectedDate
    let aux = new Date(props.year, props.month, 1)
    let weeksRep = []
    for (let i = 0; i < 6; i++) {
        weeksRep.push(aux)
        aux = offsetDate(aux, 7)
        if (offsetDate(aux, -aux.getDay()).getMonth() != props.month) {
            break
        }
    }
    if (!open){
        return(<View style={{backgroundColor:colors.primaryContainer, padding: 20, maargin: 20}}>
            {/* <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center', padding: 10}}>
                <Text style={{fontSize:20, color: colors.onPrimaryContainer}}>{`${monthNames[props.month]} ${props.year}`}</Text>
            </View> */}
            <View style={{flexDirection: 'row'}}>
                {weekDaysNames.map((day, index) => (<Text style={{flex:1,color: colors.onPrimaryContainer, textAlign:'center', fontWeight:'bold'}} key={index}>{day}</Text>))}
            </View>
            <RenderCalendarRow marked={marked} open={open} setOpen={setOpen} selectedDate={selectedDate} setSelectedDate={setSelectedDate} colors={colors} date={selectedDate} month={props.month}/>
            
            <TouchableOpacity onPress={()=> setOpen(true)} style={{alignItems:'center', justifyContent:'center'}}>
            <MaterialIcons name="expand-more" size={24} color={colors.primary} />
            </TouchableOpacity>
        </View>)
    }
    return (<View style={{backgroundColor:colors.primaryContainer, padding: 20, maargin: 20}}>
        <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center', padding: 10}}>
            <Text style={{fontSize:20, color: colors.onPrimaryContainer}}>{`${monthNames[props.month]} ${props.year}`}</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
            {weekDaysNames.map((day, index) => (<Text style={{flex:1,color: colors.onPrimaryContainer, textAlign:'center', fontWeight:'bold'}} key={index}>{day}</Text>))}
        </View>
        {
            weeksRep.map((week, index) => (<RenderCalendarRow marked={marked}  open={open} setOpen={setOpen} selectedDate={selectedDate} setSelectedDate={setSelectedDate} colors={colors} key={index} date={week} month={props.month}/>))
        }
    </View>)
}

export function AgendaList(props) {
    const items = props.items;
    const selectedDate = props.selectedDate;
    const changedByController = props.changedByController;
    const setChangedByController = props.setChangedByController;
    const setSelectedDate = props.setSelectedDate
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

        setDaysToRender(daysAux);
        return {}
    }
    const loadAtStart = async ()  => {
        const start = offsetDate(firtsDate, -offsetUp);
        let daysAux = {};
        for (let i = 0; i <= offsetUp; i++) {
            const aux = offsetDate(start, i);
            daysAux[floorDate(aux)] = items[floorDate(aux)] || [];
        }
        setFirstDate(start);
        setDaysToRender({...daysAux, ...daysToRender });
        return {}
    }

    const _onViewableItemsChanged = React.useRef(({ viewableItems, changed }) => {
    if (viewableItems.length > 0) {
        const fdate = viewableItems[0].item
        setSelectedDate(floorDate2Date(fdate));
    }
    }, []);
    const flatlistRef = useRef();
    useEffect (()=>{
        if (changedByController){
            setChangedByController(false)
            setLastDate(selectedDate)
            setFirstDate(selectedDate)
            setDaysToRender({})
            flatlistRef.current.scrollToIndex({index: 0});
        }
    }, [changedByController])
    useEffect (()=>{
        setLastDate(selectedDate)
        setFirstDate(selectedDate)
        setDaysToRender({})
        flatlistRef.current.scrollToIndex({index: 0});
    }, [items])


    if (Object.keys(daysToRender).length === 0) {
        loadAtEnd(false)
    }


    const _viewabilityConfig = {
        itemVisiblePercentThreshold: 0
    }
    return (
        <FlatList 
        onEndReached={loadAtEnd}
        ref={flatlistRef}
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