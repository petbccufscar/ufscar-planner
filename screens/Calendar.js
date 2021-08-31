import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import Constants from 'expo-constants';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { Appbar } from 'react-native-paper';
import {CalendarComponent} from '../components/CalendarParts'


export default function Calendar() {
  const [mode, setMode] = useState(0);
  return (
    <>
        <Appbar.Header statusBarHeight={Constants.statusBarHeight}>
          <Appbar.Action  icon="menu" onPress={()=>{}} />
          <Appbar.Content title="Calendário" />
          <Appbar.Action  icon="calendar" onPress={()=>{
            setMode((mode+1)%3);
            // console.log(modo);
          }} />
        </Appbar.Header>
    <View style={styles.container}>

      <StatusBar style="light" />
      <CalendarComponent mode={mode}/>
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
