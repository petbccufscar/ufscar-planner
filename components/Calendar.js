import React, { useEffect, useState } from 'react';
import { InteractionManager, View } from "react-native";
import { Agenda } from 'react-native-calendars';
import { useSelector } from 'react-redux';
import { Task as CalendarTask } from './CalendarTask';



export function Calendar() {
    return (
        <View style={{ backgroundColor: "#000", flex: 1}}>
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
    const a = new Date(e.detail.datetime_init)
    const b = new Date(f.detail.datetime_init)
    const av = 60*a.getHours() + a.getMinutes()
    const bv = 60*b.getHours() + b.getMinutes()
    return av - bv
}


function EventsScreen(){


    const offset = 80;
    const events = useSelector(state => state.events).events;
    let items = {}
    let marked = {}
    let stMarked ={};
    let stItems = {};
    let loading = true;
    let cid = 0;

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
                items[date].push({...event, cid: cid})
                cid ++
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
                        items[date].push({...obj, cid:cid})
                        cid ++
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


        stMarked = marked
        stItems = items
    }

    if (loading){
        loading = false
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
