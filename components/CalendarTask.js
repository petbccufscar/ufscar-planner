import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/core";
import { useSelector, useDispatch } from 'react-redux';
import { formatHour, formatDateWithHour } from '../helpers/helper';
import { useTheme } from "react-native-paper";

export function Task(props) {
  const mostrarData = props.show || false
  let task = props.task;
  const navigation = useNavigation();

  const edit = () => {
    navigation.navigate("Event", { task: task });
  };
  const text = task.is_subject ? "" : task.subject + ": "

  const theme = useTheme();

  const styles = StyleSheet.create({
    item: {
      //padding: 15,
      flexDirection: "row",
      alignItems: "center",
      marginHorizontal: 20,
    },
    itemLeft: {
      flexDirection: "row",
      alignItems: "center",
      flexWrap: "wrap",
    },
    square: {
      width: 20,
      height: 20,
      // backgroundColor: "#55BCF6", // Definir como passar a cor da tarefa
      opacity: 0.4,
      borderRadius: 5,
      //marginRight: 10,
    },
    itemTaskSubject: {
      /* TODO fontFamily: '', */
      fontSize: 22,
      color: theme.colors.onSurfaceVariant,
      paddingLeft: 5,
      width: "100%",
    },
    itemDate: {
      /* TODO fontFamily: '', */
      fontSize: 14,
      color: theme.colors.onSurfaceVariant,
      paddingTop: 5,
    },
  });

  return (
    <TouchableOpacity style={{...styles.item,...props.style}} onPress={edit}>
      <View style={styles.itemLeft}>
        <View>
          <View style={{ ...styles.square, backgroundColor: task.color }}></View>
          <Text style={styles.itemTaskSubject}>{text}{task.name}</Text>
        </View>
        
        <Text style={styles.itemDate}>
          {" "}
          {mostrarData ? formatDateWithHour(task.detail.datetime_init) : formatHour(task.detail.datetime_init)} até{" "}
          {formatHour(task.detail.datetime_end)} no{" "}
          {task.detail.local}
        </Text>
      </View>
    </TouchableOpacity>
  );

}
