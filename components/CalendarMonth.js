import React, { useState } from 'react';
import { View } from "react-native";
import { Card, compareEvents, DayComponent, dayComponentHeight, getDateStr, dayComponentWidth,getEvents, Days, sameDay } from "./CalendarHelper";


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
    let listActived = getEvents(filtered);
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

