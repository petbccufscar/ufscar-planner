import React, { useState } from 'react';
import { View } from "react-native";
import { Card, compareEvents, DayComponent, dayComponentHeight, dayComponentWidth, Days, sameDay } from "./CalendarHelper";


export function CalendarMonth(props) {
    const pivot = props.pivot ?? new Date();


    const [activedDate, setActive] = useState(new Date());
    const today = new Date()
    const firstDayOfMonth = new Date(today.getTime() - ((today.getDate() - 1) * 24 * 60 * 60 * 1000));
    const firstDay = new Date(firstDayOfMonth.getTime() - (firstDayOfMonth.getDay() * 24 * 60 * 60 * 1000));
    let current = firstDay;
    let month = []
    let i = 0;
    let filtered = props.tasks.filter(task => task.weekly == false);
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

    do {
        if (i == 0) month.push([]);
        month[month.length - 1].push({ date: current, thisMonth: (current.getMonth() == today.getMonth()), active: sameDay(current, activedDate), today: sameDay(current, today) })
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
                            return (<DayComponent set={() => setActive(day.date)} day={day.date} event={listActived[getDateStr(day.date)]} today={day.today} active={activedDate} key={j} thisMonth={day.thisMonth} />);
                        })}
                    </View>);

                })
            }</View>
        {
            (listActived[getDateStr(activedDate)] ?? []).sort((a,b) => compareEvents(a,b)).map((event, index) => (<Card task={event} key={index} />))
        }
    </>);
}

function getDateStr(date) {
    return date.getDate().toString() + "-" + date.getMonth().toString() + "-" + date.getYear().toString()
}
