import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import Constants from 'expo-constants';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { Appbar } from 'react-native-paper';
import {CalendarComponent} from '../components/CalendarParts'


export default function Calendar(props) {
  const [mode, setMode] = useState(0);
  const meses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
  const hoje = new Date();
  let titulo = mode == 2? `${meses[hoje.getMonth()]} de ${hoje.getFullYear()}` :"Calendário"
  return (
    <>
        <Appbar.Header statusBarHeight={Constants.statusBarHeight}>
          <Appbar.Action  icon="menu" onPress={()=>{}} />
          <Appbar.Content title={titulo} />
          <Appbar.Action  icon="calendar" onPress={()=>{
            setMode((mode+1)%3);
            // console.log(modo);
          }} />
        </Appbar.Header>
    <View style={styles.container}>

      <StatusBar style="light" />
      <CalendarComponent mode={mode} navigation={props.navigation}/>
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
});
