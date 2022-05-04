import React, { useEffect, useState } from 'react';
import { InteractionManager, View, StyleSheet } from "react-native";
import { Agenda, LocaleConfig, CalendarProps } from 'react-native-calendars';
import { useSelector } from 'react-redux';
import { CalendarTask } from './CalendarTask';
import { FAB } from 'react-native-paper';
import { useNavigation } from "@react-navigation/core";
import Toast from 'react-native-toast-message';
import { defaultTask, floorDate } from '../helpers/helper';
import { useTheme } from "react-native-paper";

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
    <View style={{ backgroundColor: "#000", flex: 1 }}>
      <EventsScreen />
    </View>
  );

}

function EventsScreen() {

  let stMarked = useSelector(state => state.cards).marked;
  let stItems = useSelector(state => state.cards).items;

  const renderItem = item => {
    
    const mt = 0;//stItems[floorDate(new Date(item.detail.datetime_init))][0] == item ? 35:0; 
    return (<CalendarTask style={{marginTop: mt}} task={item}></CalendarTask>
  )};

  const renderEmptyDate = () => {
    return (
      <View style={{ backgroundColor: 'transparent', width: 100, height: 100 }}>
      </View>
    );
  };
  const navigation = useNavigation()
  const rowHasChanged = (r1, r2) => r1 !== r2;
  const th = useTheme()
  const colors = th.colors;


  return (
    <>
      <Agenda
        key={th.dark}
        items={stItems}
        selected={new Date()}
        renderItem={renderItem}
        renderEmptyDate={renderEmptyDate}
        rowHasChanged={rowHasChanged}
        markedDates={stMarked}

        theme={
          {
            selectedDayBackgroundColor: colors.primary, // primary
            todayTextColor: colors.primary,// primary
            dayTextColor: colors.outline, //outline
            backgroundColor: colors.surface1,//surface1
            monthTextColor: colors.onPrimaryContainer,
            textDisabledColor: colors.outline, // outline
            agendaKnobColor: colors.primary, // primary
            textSectionTitleColor: colors.onPrimaryContainer, //on primary container
            textDayHeaderFontWeight: 'bold',
            selectedDayTextColor: colors.onPrimary, //on primary container
            calendarBackground: colors.background,//background
          
            dayTextColor: colors.outline,//outline
            agendaTodayColor: colors.primary,
            agendaDayTextColor: colors.outline,
            agendaDayNumColor: colors.outline,
          }
        }
        
      

      />
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => navigation.navigate("Event", { task: defaultTask })}
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