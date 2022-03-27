import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { Provider, useDispatch, useSelector } from "react-redux";
import { updateEvent } from '../redux/actions/eventActions'
import * as Notifications from "expo-notifications";
import Dialog from "react-native-dialog";
import { useTheme, Appbar, TouchableRipple, Switch } from 'react-native-paper';
import { updateUser } from '../redux/actions/userActions';
import { PreferencesContext } from '../theme/PreferencesContext';

export default function Config() {

  const events = useSelector(state => state.events).events
  const user = useSelector(state => state.user).user
  const dispatch = useDispatch();
  const [notifications, setNotifications] = useState([])
  const [load, setLoad] = useState(false)
  const [name, setName] = useState(user.name)
  const [nameDialog, setNameDialog] = useState(false)
  const theme = useTheme();
  const { toggleTheme, isThemeDark } = React.useContext(PreferencesContext);

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
      }}>
        <Text style={{
          fontSize: 24,
          fontWeight: 'bold',
          padding: 10,
          paddingBottom: 30,
          color: 'black'
        }}>Resetar dados do app</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => {
      }}>
        <Text style={{
          fontSize: 24,
          fontWeight: 'bold',
          padding: 10,
          paddingBottom: 30,
          color: 'black'
        }}>Carregar dados do SIGA</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => {
      }}>
        <Text style={{
          fontSize: 24,
          fontWeight: 'bold',
          padding: 10,
          paddingBottom: 30,
          color: 'black'
        }}>Trocar campus</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => {
        setNameDialog(true)

      }}>
        <Text style={{
          fontSize: 24,
          fontWeight: 'bold',
          padding: 10,
          paddingBottom: 30,
          color: 'black'
        }}>Trocar nome</Text>
      </TouchableOpacity>
      <Dialog.Container visible={nameDialog}>
        <Dialog.Title>Escolha um novo nome</Dialog.Title>
        <Dialog.Input defaultValue={user.name} onChangeText={setName}>
        </Dialog.Input>
        <Dialog.Button label="Cancelar" onPress={
          () => setNameDialog(false)
        } />
        <Dialog.Button label="Ok" onPress={
          () => {
            dispatch(updateUser({ ...user, name: name }))
            setNameDialog(false)
          }
        } />
      </Dialog.Container>
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
      <TouchableOpacity onPress={() => {
        toggleTheme()
      }}>
        <Text style={{
          fontSize: 24,
          fontWeight: 'bold',
          padding: 10,
          paddingBottom: 30,
          color: '#607D8B',
        }}>Trocar tema</Text>
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
