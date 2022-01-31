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

} from 'react-native'
import Constants from 'expo-constants'
import { Task } from '../components/CalendarTask'
import Menu from '../components/HomeMenu'
import { useNavigation } from '@react-navigation/core'
import { Provider, useDispatch, useSelector } from "react-redux";

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
            <Text style={styles.sectionTitle}>Olá, {nome}!</Text>

            <Text style={styles.sectionTitle}>Aulas do dia</Text>

            {classes.map((item, idx) => {
              return <Task key={idx} task={item}/>;
            })}

            <Text style={styles.sectionTitle}>Cardápio</Text>
            <Menu
              day={2}
              mealTime={"Almoço"}
              lunchStartTime={"11:15h"}
              lunchEndTime={"13:30h"}
              dinnerStartTime={"17:15h"}
              dinnerEndTIme={"19:00h"}
              mainMeal={"Frango Xadrez"}
              garrison={"Batatas Cozidas"}
              rice={"Arroz branco e integral"}
              bean={"Feijão Preto"}
              salad={"Alface e tomate"}
              desert={"Paçoquinha"}
              drinks={"Nenhuma"}
              price={"RS 5,20"}
            ></Menu>
            {/* #TODO Fazer a integração da home com os dados do crawler e a lógica de não mostrar o jantar em sábado */}
            <Menu
              day={2}
              mealTime={"Jantar"}
              lunchStartTime={"11:15h"}
              lunchEndTime={"13:30h"}
              dinnerStartTime={"17:15h"}
              dinnerEndTime={"19:00h"}
              mainMeal={"Frango Xadrez"}
              garrison={"Batatas Cozidas"}
              rice={"Arroz branco e integral"}
              bean={"Feijão Preto"}
              salad={"Alface e tomate"}
              desert={"Paçoquinha"}
              drinks={"Nenhuma"}
              price={"RS 5,20"}
            ></Menu>

            <Text style={styles.sectionTitle}>Próximas Tarefas</Text>
            <View style={styles.items}>
              {tasks.map((item, idx) => {
                return <Task key={idx} task={item} show={true}/>;
              })}
            </View>
          </View>
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E5E5E5",
  },
  tasksWrapper: {
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    padding: 10,
    color: "#607D8B",
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
