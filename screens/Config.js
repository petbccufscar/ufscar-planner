import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { Provider, useDispatch, useSelector } from "react-redux";
import { updateEvent } from '../redux/actions/eventActions'
import * as Notifications from "expo-notifications";
import Dialog from "react-native-dialog";
import { useTheme, Appbar, TouchableRipple, Switch, TextInput } from 'react-native-paper';
import { updateUser } from '../redux/actions/userActions';
import { MaterialIcons } from '@expo/vector-icons';
import { PreferencesContext } from '../theme/PreferencesContext';

export function Config2() {
  const styles = StyleSheet.create({
    container: {
      flex:1, backgroundColor: '#fff'
    },
  });
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

export default function Config() {
  const user = useSelector(state => state.user).user
  const colors = useTheme().colors;
  const { toggleTheme, isThemeDark } = React.useContext(PreferencesContext);
  const dispatch = useDispatch();

  const styles = StyleSheet.create({
    container: {
      flex:1,
      backgroundColor: colors.surface1,
      padding: 20,

    },
    icon: {
      marginRight: 10
    },
    text: {
      color: colors.onSurfaceVariant,

    },
    textInput:{
      width: '100%',
      backgroundColor: colors.surface5,
      height: 40,
    },
    datePickerInput: {
      width: '100%',
      backgroundColor: colors.surface5,
      padding: 10,
      borderRadius: 5,
    },
    linha: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    opcao: {
      marginVertical: 10
    },
    switchContainer:{
      flex:1,
      justifyContent: 'flex-end',
    }

  });
  const handleMoneyChange = (value) => {
    try{
      const valor = parseFloat(value.substring(3))
      console.log(valor)
      if (!isNaN(valor))
        dispatch(updateUser({ ...user, meal: valor }))
      else
        dispatch(updateUser({ ...user, meal: 0 }))
    } catch (e) {
    }
  }

  const handleNameChange = (value) => {
    dispatch(updateUser({ ...user, name: value }))
  }

  return (<View style={styles.container}>
    <View style={styles.opcao}>
      <View style={styles.linha}>
        <View style={styles.linha}>
          <MaterialIcons style={styles.icon} name="nightlight-round" size={24} color={colors.onSurfaceVariant} />
          <Text style={styles.text}>Modo escuro </Text>
        </View>
        <View style={styles.switchContainer}>
          <Switch color={colors.primary} value={isThemeDark} onValueChange={toggleTheme}></Switch>

        </View>
      </View>
    </View>

    <View style={styles.opcao}>
      <View style={styles.linha}>
        <MaterialIcons style={styles.icon} name="monetization-on" size={24} color={colors.onSurfaceVariant} />
        <Text style={styles.text}>Valor padrão da refeição</Text>
      </View>
    </View>
    <TextInput style={styles.textInput} value={"R$ "+user.meal} onChangeText={handleMoneyChange}></TextInput>

    <View style={styles.opcao}>
      <View style={styles.linha}>
        <MaterialIcons style={styles.icon} name="calendar-today" size={24} color={colors.onSurfaceVariant} />
        <Text style={styles.text}>Início do semestre</Text>
      </View>
    </View>
    <TouchableOpacity style={styles.datePickerInput}>
      <Text style={styles.text}>30/02/2023</Text>
    </TouchableOpacity>

    <View style={styles.opcao}>
      <View style={styles.linha}>
        <MaterialIcons style={styles.icon} name="calendar-today" size={24} color={colors.onSurfaceVariant} />
        <Text style={styles.text}>Término do semestre</Text>
      </View>
    </View>
    <TouchableOpacity style={styles.datePickerInput}>
    <Text style={styles.text}>30/02/2023</Text>
    </TouchableOpacity>

    <View style={styles.opcao}>
      <View style={styles.linha}>
        <MaterialIcons style={styles.icon} name="account-circle" size={24} color={colors.onSurfaceVariant} />
        <Text style={styles.text}>Como você gostaria de ser chamado?</Text>
      </View>
    </View>
    <TextInput style={styles.textInput} value={user.name} onChangeText={handleNameChange}></TextInput>


  </View>)
}


