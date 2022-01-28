import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Provider, useDispatch, useSelector } from "react-redux";
import { updateEvent } from '../redux/actions/eventActions'

export default function Config() {

  const events = useSelector(state => state.events).events
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>

      <TouchableOpacity onPress={()=>{
        for(let i = 0; i < events.length; i++){

          if(events[i].notification.length != 0){

            const task = {
              ...events[i],
              "notification": []
            }
            dispatch(updateEvent(task));
          }
        }

      }}>
      <Text>Remover todas as notificações</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
