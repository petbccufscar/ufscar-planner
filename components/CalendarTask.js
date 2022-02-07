import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/core";
import { useSelector, useDispatch } from 'react-redux';

export function Task(props) {
  const mostrarData = props.show || false
  let task = props.task;
  const navigation = useNavigation();

  const edit = () => {
    navigation.navigate("Event", { task: task });
  };
  const text = task.is_subject ? "" : task.subject + ": "
  return (
    <TouchableOpacity style={styles.item} onPress={edit}>
      <View style={{ ...styles.square, backgroundColor: task.color }}>
      </View>
      <View style={styles.itemLeft}>
        <Text style={styles.itemTaskSubject}>{text}{task.name}</Text>
        <Text style={styles.itemDate}>
          {" "}
          {mostrarData ? formatDate(task.detail.datetime_init) : formatHour(task.detail.datetime_init)} até{" "}
          {formatHour(task.detail.datetime_end)} no{" "}
          {task.detail.local}
        </Text>
      </View>
    </TouchableOpacity>
  );

}
const formatDate = dataFormatar => {
  const data = new Date(dataFormatar);
  return ('0' + data.getUTCDate()).slice(-2) + "/" + ('0' + (data.getUTCMonth() + 1)).slice(-2) + "/" + data.getFullYear() + " " + ("0" + data.getHours()).slice(-2) +
    "h" +
    ("0" + data.getMinutes()).slice(-2);
}
function formatHour(date) {
  const dateFormat = new Date(date);
  return (
    ("0" + dateFormat.getHours()).slice(-2) +
    "h" +
    ("0" + dateFormat.getMinutes()).slice(-2)
  );
}
const styles = StyleSheet.create({
  item: {
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  itemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  square: {
    width: 4,
    height: 50,
    backgroundColor: "#55BCF6", // Definir como passar a cor da tarefa
    opacity: 0.4,
    borderRadius: 5,
    marginRight: 15,
  },
  itemTaskSubject: {
    /* TODO fontFamily: '', */
    fontSize: 14,
    color: "#607D8B",
    paddingLeft: 5,
    width: "100%",
  },
  itemDate: {
    /* TODO fontFamily: '', */
    fontSize: 10,
    color: "#90A4AE",
    paddingTop: 5,
  },
});