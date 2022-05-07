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
    TextInput
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { useTheme } from "react-native-paper";
import { floorDate, offsetDate } from "../helpers/helper";
import { CalendarTask } from './CalendarTask';



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


function RenderMonthCalendar(props){
    
}



function RenderDay(props) {
    const day = props.day || new Date();
    const items = props.items[formatDate(day)] || [];
    const semana = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']
    const diaSemana = semana[day.getUTCDay()]
    const colors = useTheme().colors;
    const isToday = formatDate(day) == formatDate(new Date())
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



export default function AgendaList(props) {
    const items = props.items;
    // const selectedDate = props.selectedDate;
    // const setSelectedDate = props.setSelectedDate;
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [lastDate, setLastDate] = useState(new Date());
    const offset = 30;
    const colors = useTheme().colors
    let [daysToRender, setDaysToRender] = useState({});


    useEffect(() => {
        const keys = Object.keys(daysToRender).sort();
        const lastKey = keys[keys.length - 1];
        let rerender = false;
        const firstKey = keys[0]
        let daysAux = { ...daysToRender };
        if (keys.length == 0 || floorDate(lastDate) == lastKey) {
            for (let i = 0; i < offset; i++) {
                const aux = offsetDate(selectedDate, i);
                daysAux[floorDate(aux)] = items[floorDate(aux)] || [];
            }
            setDaysToRender(daysAux);
        }


    }, [selectedDate])

    const _onViewableItemsChanged = React.useCallback(({ viewableItems, changed }) => {
        if (viewableItems.length > 0) {
            const fdate = viewableItems[0].item
            const ldate = viewableItems[viewableItems.length - 1].item
            setSelectedDate(floorDate2Date(fdate));
            setLastDate(floorDate2Date(ldate));
        }
    }, []);
    const viewabilityConfig={waitForInteraction: true, viewAreaCoveragePercentThreshold: 95}
    const _viewabilityConfig = {
        itemVisiblePercentThreshold: 60
    }
    const viewabilityConfigCallbackPairs = useRef([{  _viewabilityConfig, _onViewableItemsChanged }])
    return (
        <FlatList style={{ backgroundColor: colors.surface1 }} onViewableItemsChanged={_onViewableItemsChanged}
            viewabilityConfig={_viewabilityConfig} data={Object.keys(daysToRender).sort()} renderItem={({ item, index }) => (<RenderDay key={index} day={new Date(item)} index={index} items={daysToRender} />)}>
        </FlatList>
    )
}