import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { Provider, useDispatch, useSelector } from "react-redux";
import { updateEvent } from '../redux/actions/eventActions'
import * as Notifications from "expo-notifications";

export default function Config() {

  const events = useSelector(state => state.events).events
  const dispatch = useDispatch();
  const [notifications, setNotifications] = useState([])
  const [load, setLoad] = useState(false)
  useEffect(() => {
    Notifications.getAllScheduledNotificationsAsync().then(result => {
      if (!load) {
        setNotifications(result)
        setLoad(true)
      }
    })
  }, [load])
  return (
    <ScrollView style={styles.container}>

      <TouchableOpacity onPress={() => {
        for (let i = 0; i < events.length; i++) {

          if (events[i].notification.length != 0) {

            const task = {
              ...events[i],
              "notification": []
            }
            dispatch(updateEvent(task));
          }
        }

      }}>
        <Text style={{
          fontSize: 24,
          fontWeight: 'bold',
          padding: 10,
          paddingBottom: 30,
          backgroundColor: 'red',
          color: 'white'
        }}>Remover todas as notificações</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => {
        setLoad(false)
      }}>
        <Text style={{
          fontSize: 24,
          fontWeight: 'bold',
          padding: 10,
          paddingBottom: 30,
          color: '#607D8B',
        }}>Notificacoes: </Text>
      </TouchableOpacity>
      {notifications.map((e, i) => (
        <View key={i} style={{ margin: 20, padding: 10, backgroundColor: 'lightblue', borderRadius: 5 }}>
          <Text>{e.content.title}</Text>
          <Text>{e.content.body}</Text>
          <Text>id {e.identifier}</Text>
          <Text>trigger{JSON.stringify(e.trigger)}</Text>
          <Text>{new Date(e.trigger.value).toString()}</Text>
        </View>
      ))}
      <StatusBar style="auto" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
