import React, { useEffect, useState } from 'react';
import { InteractionManager, View, StyleSheet } from "react-native";
import { Agenda, LocaleConfig } from 'react-native-calendars';
import { useSelector } from 'react-redux';
import { Task as CalendarTask } from './CalendarTask';
import { FAB } from 'react-native-paper';
import { useNavigation } from "@react-navigation/core";
import Toast from 'react-native-toast-message';

export function Calendar() {
  
    LocaleConfig.locales['br'] = {
      monthNames: [
        'Janeiro',
        'Fevereiro',
        'Março',
        'Abril',
        'Maio',
        'Junho',
        'Julho',
        'Agosto',
        'Setembro',
        'Outubro',
        'Novembro',
        'Dezembro'
      ],
      monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
      dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
      dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
      today: "Hoje"
    };
    LocaleConfig.defaultLocale = 'br';
    return (
        <View style={{ backgroundColor: "#000", flex: 1}}>
                <EventsScreen/>
        </View>
    );

}

function EventsScreen(){

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
        "subject": "Matéria X",
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