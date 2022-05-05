import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Keyboard,
  ScrollView,
  Image,

} from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';
import Constants from 'expo-constants'
import { Task } from '../components/CalendarTask'
import Menu from '../components/HomeMenu'
import { useNavigation } from '@react-navigation/core'
import { Provider, useDispatch, useSelector } from "react-redux";
import { ThemeProvider } from "react-native-paper";
import { useTheme } from "react-native-paper";

const floorDate = (data) => {
  return (
    data.getFullYear() +
    "-" +
    (data.getMonth() + 1).toString().padStart(2, "0") +
    "-" +
    data.getDate().toString().padStart(2, "0")
  );
};

export default function App() {
  const items = useSelector((state) => state.cards).items;
  const today = floorDate(new Date());
  const classes = items[today].filter((e) => e.is_subject);
  let tasks = [];
  const keys = Object.keys(items).sort();
  const initial = keys.findIndex((e) => e == today);
  for (let j = initial; j < keys.length && j >= 0; j++) {
    tasks = [...tasks, ...items[keys[j]].filter((e) => !e.is_subject)];
  }
  const nome = useSelector((state) => state.user).user.name;
  const navigation = useNavigation();
  const theme = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.surface1,
    },
    tasksWrapper: {
      padding: 20,
    },
    sectionTitle: {
      fontSize: 30,
      color: theme.colors.onSurface,
    },
    items: {
      marginTop: 10,
    },
    writeTaskWrapper: {
      position: "absolute",
      bottom: 30,
      width: "100%",
      flexDirection: "column",
      justifyContent: "space-around",
      alignItems: "center",
    },
    input: {
      paddingVertical: 15,
      paddingHorizontal: 15,
      backgroundColor: "#FFF",
      borderRadius: 60,
      borderColor: "#C0C0C0",
      borderWidth: 1,
      width: 250,
    },
    addWrapper: {
      width: 60,
      height: 60,
      backgroundColor: "#FFF",
      borderRadius: 60,
      justifyContent: "center",
      alignItems: "center",
      borderColor: "#C0C0C0",
      borderWidth: 1,
    },
    addText: {},
  });

  return (
    <>
      <View style={styles.container}>
        {/* Added this scroll view to enable scrolling when list gets longer than the page */}
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
          }}
          keyboardShouldPersistTaps="handled"
        >
          {/* Today's Tasks */}
          <View style={styles.tasksWrapper}>
            <Text style={styles.sectionTitle}>Olá, {nome}</Text>
            <AcontecendoAgora/>

            <Text style={styles.sectionTitle}>Aulas de hoje</Text>

            {classes.map((item, idx) => {
              return <Task key={idx} task={item} />;
            })}

            <Text style={styles.sectionTitle}>Entregas de hoje</Text>

            <View style={styles.items}>
              {tasks.map((item, idx) => {
                return <Task key={idx} task={item} show={true} />;
              })}
            </View>
          </View>
        </ScrollView>
      </View>
    </>
  );
}


function AcontecendoAgora(){

  const colors = useTheme().colors;
  const mapsSrc = require('../assets/icons/maps.png')


  const styles = StyleSheet.create({
  hourglassContainer: {
    borderRadius: 12,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    width: 36,
    height: 36,
  },
  acontecendoAgoraRow:{
    flexDirection: "row",
    justifyContent: "flex-start",  
    alignItems: "center",
  },
  localContainer:{
    borderWidth: 1,
    borderColor: colors.outline,
    borderRadius: 8,
    backgroundColor: colors.surface,
    flexDirection: 'row',
    padding: 5,
    paddingRight: 10,
  },
  emptyflex:{
  },
  localView:{
    flexDirection: 'row'
  },
  acontecendoAgoraContainer:{
    borderRadius: 12,
    backgroundColor: colors.primaryContainer,
    padding: 10,
    marginVertical: 10
  },
  acontecendoAgoraText:{
    color: colors.onPrimaryContainer,
    marginVertical: 10,
    fontSize: 20,

  },
  acontecendoAgoraMapsIcon:{
    width: 24,
    height: 24,
  },
  acontecendoAgoraTitle:{
    fontSize: 24,
    paddingLeft: 10,
    color: colors.primary,
  }
})

  return (<View style={styles.acontecendoAgoraContainer}>
    <View style={styles.acontecendoAgoraRow}>
      <View style={styles.hourglassContainer}>
        <MaterialIcons name="hourglass-bottom" size={24} color={colors.onPrimary} />
      </View>
      <Text style={styles.acontecendoAgoraTitle}>Acontecendo agora</Text>
    </View>
      <Text style={styles.acontecendoAgoraText}>Churrascão</Text>
      <View style={styles.localView}>
    <TouchableOpacity style={styles.localContainer}>
      <Image style={styles.acontecendoAgoraMapsIcon} source={mapsSrc}/>
      <Text style={{color: colors.onSurface}}>
      At72, Sala 707
      </Text>
    </TouchableOpacity>
    <View style={styles.emptyflex}/>
      </View>
  </View>)
}
