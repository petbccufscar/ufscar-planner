import React, { useEffect, useState } from 'react';
import { InteractionManager, View, StyleSheet } from "react-native";
import { Agenda } from 'react-native-calendars';
import { useSelector } from 'react-redux';
import { Task as CalendarTask } from './CalendarTask';
import { FAB } from 'react-native-paper';
import { useNavigation } from "@react-navigation/core";

export function Calendar() {
    return (
        <View style={{ backgroundColor: "#000", flex: 1}}>
                <EventsScreen/>
        </View>
    );

}

function EventsScreen(){

    
    // const offset = 80;
    // const events = useSelector(state => state.events).events;
    // let items = {}
    // let marked = {}
    // let stMarked ={};
    // let stItems = {};
    // let loading = true;
    // let cid = 0;

    // const repeat = (event) => {
    //     let datei = offsetDate(new Date(), -offset)
    //     const datef = offsetDate(new Date(), offset)
    //     let toDay = event.detail.day - datei.getDay()
    //     if (toDay < 0){
    //         toDay += 7
    //     }
    //     datei = offsetDate(datei, toDay)

    //     while (datei.getTime() <= datef.getTime()){
    //         const date = floorDate(datei)
    //         if( items[date] == null){
    //             items[date] = [event]
    //         } else { 
    //             items[date].push({...event, cid: cid})
    //             cid ++
    //         }
    //         datei = offsetDate(datei, 7)
    //     }

    // }
    
    // const setup = async () => {
    //     for (let i = 0; i < events.length; i++){
    //         for (let j = 0; j < events[i].details.length; j++){
    //             const obj = {
    //                 ...events[i],
    //                 detail: events[i].details[j]
    //             }
    //             const aux = new Date(obj.detail.datetime_init)
    //             const date = floorDate(aux)
    //             if (events[i].weekly){
    //                 repeat(obj)
    //             }else{
    //                 if( items[date] == null){
    //                     items[date] = [obj]
    //                 } else { 
    //                     items[date].push({...obj, cid:cid})
    //                     cid ++
    //                 }
    //                 marked[date] = {marked:true}
    //             }
    //         }
    //     }
    //     const keys = Object.keys(items)
    //     for (let i = 0; i < keys.length; i++){
    //         items[keys[i]].sort(compare)
    //     }

    //     let datei = offsetDate(new Date(), -offset)
    //     const datef = offsetDate(new Date(), offset)

    //     while (datei.getTime() <= datef.getTime()){
    //         const date = floorDate(datei)
    //         if( items[date] == null){
    //             items[date] = []
    //         } 
               
    //         datei = offsetDate(datei, 1)
    //     }


    //     stMarked = marked
    //     stItems = items
    // }

    // if (loading){
    //     loading = false
    //     setup();
    // }


    let stMarked = useSelector(state => state.cards).marked;
    let stItems =  useSelector(state => state.cards).items;
    
    const renderItem = item => (
        <CalendarTask task={item}></CalendarTask>
    );
  
    const renderEmptyDate = () => {
      return (
        <View style={{backgroundColor: 'transparent', width:100, height:100}}>
        </View>
      );
    };
    const navigation = useNavigation()
    const rowHasChanged = (r1, r2) => r1 !== r2 ;
    const defaultTask = {
        "weekly": true,
        "details": [],
        "name": "Novo Evento",
        "subject": "",
        "notification": [],
        "description": "descrição",
        "color": "#f00",
        "is_subject": true,
        "mean": "",
        "grade": {},
        "frequence": {}
      }

    return (
        <>
        <Agenda
          items={stItems}
          selected={new Date()}
          renderItem={renderItem}
          renderEmptyDate={renderEmptyDate}
          rowHasChanged={rowHasChanged}
          markedDates={stMarked}

        />
          <FAB
                style={styles.fab}
                icon="plus"
                onPress={() => navigation.navigate("Event", {task: defaultTask})}
            />
        </>
    );
  };

  const styles = StyleSheet.create({
    fab: {
      position: 'absolute',
      margin: 16,
      right: 0,
      bottom: 0,
    },
  })