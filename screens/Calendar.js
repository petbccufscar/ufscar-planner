import { StatusBar } from 'expo-status-bar';
import React from 'react';
import Constants from 'expo-constants';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { Appbar } from 'react-native-paper';
import {CalendarComponent} from '../components/CalendarParts'


export default function Calendar() {
  return (
    <>
        <Appbar.Header statusBarHeight={Constants.statusBarHeight}>
          <Appbar.Action  icon="menu" onPress={()=>{}} />
          <Appbar.Content title="Calendário" />
          <Appbar.Action  icon="calendar" onPress={()=>{}} />
        </Appbar.Header>
    <View style={styles.container}>

      <StatusBar style="light" />
      <CalendarComponent/>
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
