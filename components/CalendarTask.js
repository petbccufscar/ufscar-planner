import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/core";
import { useSelector, useDispatch } from 'react-redux';
import { formatHour, formatDateWithHour } from '../helpers/helper';
import { useTheme } from "react-native-paper";
import { Entypo, MaterialIcons } from '@expo/vector-icons';

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
    itemLeft: {
      flexDirection: "row",
      backgroundColor: theme.colors.surface,
      borderRadius: 10,
      overflow: 'hidden',
      alignItems: "flex-start",
      margin: 10,

      // width: '100%',
    },
    square: {
      // height: "100%",
      // flex: 1,
      width: 10,
      height: '100%',
      // backgroundColor: "#55BCF6", // Definir como passar a cor da tarefa
      opacity: 0.4,
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
      flexShrink: 1,
      flexWrap: 'wrap',
    },
    superItem: {
      paddingTop: 5,
      flexDirection: 'row'

    },
    atumalaca: {
      padding: 10,
      
      flexShrink: 1
      // backgroundColor: ,
    },
    iconView: {
      width: 30,
      alignItems:'center'

    }
  });

  return (
        <TouchableOpacity style={{...styles.itemLeft}} onPress={edit}>
          <View style={{ ...styles.square, backgroundColor: task.color }}>

          </View>
          <View style={styles.atumalaca}>
            <Text style={styles.itemTaskSubject}>{text}{task.name}</Text>
            <View style={styles.superItem}>
              <View style={styles.iconView}>
              <MaterialIcons name="schedule" size={24} color={theme.colors.onSecondaryContainer} />
              </View>
              <Text style={styles.itemDate}>
                {""}
                {mostrarData ? formatDateWithHour(task.detail.datetime_init) : formatHour(task.detail.datetime_init)} até{" "}
                {formatHour(task.detail.datetime_end)} no{" "}
                {task.detail.local}
              </Text>
            </View>
            <View style={styles.superItem}>
            <View style={styles.iconView}>
            <Entypo name="text" size={24} color="black" />
              
            </View>
            <Text style={styles.itemDate}>abasdadasd
              asdasdasdad
              adasdasdasdaxx
              adsasdasdasxa
              asdasdasdadsdadsa
              aaaaaaaaaaaaa
              aaaaaaaaaaaaaaa
              aaaaaaaaaaaaaaaaaaaaaaa
              aaaaaaaaaaaaaaaaa
            </Text>
            </View>
          </View>
    </TouchableOpacity>
  );

}

export function CalendarTask(props) {
  const mostrarData = props.show || false
  let task = props.task;
  const navigation = useNavigation();

  const edit = () => {
    navigation.navigate("Event", { task: task });
  };
  const text = task.is_subject ? "" : task.subject + ": "

  const theme = useTheme();

  const styles = StyleSheet.create({
    itemLeft: {
      flexDirection: "row",
      backgroundColor: theme.colors.surface,
      borderRadius: 10,
      overflow: 'hidden',
      alignItems: "flex-start",
      margin: 10,

      // width: '100%',
    },
    square: {
      // height: "100%",
      // flex: 1,
      width: 10,
      height: '100%',
      // backgroundColor: "#55BCF6", // Definir como passar a cor da tarefa
      opacity: 0.4,
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
      flexShrink: 1,
      flexWrap: 'wrap',
    },
    superItem: {
      paddingTop: 5,
      flexDirection: 'row'

    },
    atumalaca: {
      padding: 10,
      
      flexShrink: 1
      // backgroundColor: ,
    },
    iconView: {
      width: 30,
      alignItems:'center'

    }
  });

  return (
        <TouchableOpacity style={{...styles.itemLeft}} onPress={edit}>
          <View style={{ ...styles.square, backgroundColor: task.color }}>

          </View>
          <View style={styles.atumalaca}>
            <Text style={styles.itemTaskSubject}>{text}{task.name}</Text>
            <View style={styles.superItem}>
              <View style={styles.iconView}>
              <MaterialIcons name="schedule" size={24} color={theme.colors.onSecondaryContainer} />
              </View>
              <Text style={styles.itemDate}>
                {""}
                {mostrarData ? formatDateWithHour(task.detail.datetime_init) : formatHour(task.detail.datetime_init)} até{" "}
                {formatHour(task.detail.datetime_end)} no{" "}
                {task.detail.local}
              </Text>
            </View>
            
          </View>
    </TouchableOpacity>
  );

}
