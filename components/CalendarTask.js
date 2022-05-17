import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Linking, Alert, Image} from "react-native";
import { useNavigation } from "@react-navigation/core";
import { useSelector, useDispatch } from 'react-redux';
import { formatHour, formatDateWithHour, weekDaysNames } from '../helpers/helper';
import { useTheme, Checkbox } from "react-native-paper";
import { Entypo, MaterialIcons, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
import { Gradient } from "./Gradient";
import { randomInt } from "mathjs";
import { updateEvent } from "../redux/actions/eventActions";
const mapsSrc = require('../assets/icons/maps.png')

export function Task(props) {
  const mostrarData = props.show || false
  let task = props.task;
  const navigation = useNavigation();
  const user = useSelector(state => state.user).user
  const subjectScreen = props.subjectScreen || false
  // TODO verificar se está acontecendo agora
  const acontecendoAgora = props.acontecendo || false;

  const edit = () => {
    navigation.navigate("Event", { task: task });
  };

  const theme = useTheme();
  const colors = theme.colors;

  const styles = StyleSheet.create({
    itemLeft: {
      flexDirection: "row",
      backgroundColor: theme.colors.surface,
      borderRadius: 10,
      overflow: 'hidden',
      alignItems: "flex-start",
      marginVertical: 10
      // width: '100%',
    },
    square: {
      // height: "100%",
      // flex: 1,
      width: 10,
      height: '100%',
      // backgroundColor: "#55BCF6", // Definir como passar a cor da tarefa
      //marginRight: 10,
    },
    itemTaskSubject: {
      fontSize: 22,
      color: theme.colors.onSurfaceVariant,
    },
    itemDate: {
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
      flex:1,
      flexShrink: 1
      // backgroundColor: ,
    },
    iconView: {
      width: 30,
      alignItems:'center'

    },
    acontecendoAgoraMapsIcon:{
      width: 24,
      height: 24,
    },
    acontecendoAgoraRow:{
      flexDirection: "row",
      justifyContent: "flex-start",  
      alignItems: "center",
    },
    localContainer:{
      borderWidth: 1,
      borderColor: theme.colors.outline,
      borderRadius: 8,
      backgroundColor: theme.colors.surface,
      flexDirection: 'row',
      padding: 5,
      paddingRight: 10,
      marginTop:5
    },
    linhaAcontecendoTitulo:{
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      paddingHorizontal:5,
    },
    AcontecendoView:{
      alignItems:'flex-end',
      right:0,
      position:'absolute',
    },
    AcontecendoIcon:{
      justifyContent:'center',
      alignItems:'center',
      backgroundColor: colors.primary,
      width:30, 
      height:30, 
      borderRadius: 8, 
    }
  });

  return (
        <TouchableOpacity style={{...styles.itemLeft}} onPress={edit}>
          <Gradient style={{ ...styles.square }} color={task.color}/>

          <View style={styles.atumalaca}>            
            <View style={styles.linhaAcontecendoTitulo}>
            <Text style={styles.itemTaskSubject}>{task.name}</Text>

            <View style={styles.AcontecendoView}>
            {acontecendoAgora &&(<View style={styles.AcontecendoIcon}>
              <MaterialIcons name="hourglass-bottom" size={20} color={colors.onPrimary} />
            </View>)}
            </View>
            </View>
            {!subjectScreen && (<>
            <View style={styles.superItem}>
              <View style={styles.iconView}>
              <MaterialCommunityIcons name="clock" size={24} color={theme.colors.onSurfaceVariant} />
              </View>
              <Text style={styles.itemDate}>
                {""}
                {mostrarData ? formatDateWithHour(task.detail.datetime_init) : formatHour(task.detail.datetime_init)} -{" "}
                {formatHour(task.detail.datetime_end)}
              </Text>
            </View>
            </>)}
            {task.is_subject && task.teachers.length > 0 && (
            <View style={{flexDirection: 'row', alignItems:'center'}}>
              <FontAwesome name="user" size={24} style={{margin:5 }} color={theme.colors.onSurfaceVariant} />
              <Text style={{color:theme.colors.onSurfaceVariant}}>{task.teachers[0]}{task.teachers.length > 1? " +":""}</Text>
            </View>
            )}
            {!subjectScreen && (<>
            {task.description.length > 0 &&(
            <View style={styles.superItem}>
            <View style={styles.iconView}>
            <Entypo name="text" size={24} color={theme.colors.onSurfaceVariant} />
              
            </View>
              <Text style={styles.itemDate}>{`${task.description}`}
            </Text>
            </View>)}
            {task.detail.local.length > 0 && (<View style={styles.acontecendoAgoraRow}>
            <TouchableOpacity style={styles.localContainer}
              onPress={async () => {
                let place = user.campus + ", UFSCAR, " + task.detail.local;

                const url =
                  "https://www.google.com/maps/search/?api=1&query=" +
                  encodeURI(place);

                const supported = await Linking.canOpenURL(url);

                if (supported) {
                  await Linking.openURL(url);
                } else {
                  Alert.alert(`Don't know how to open this URL: ${url}`);
                }
              }}
            
            >
              <Image style={styles.acontecendoAgoraMapsIcon} source={mapsSrc}/>
              <Text style={{color: theme.colors.onSurfaceVariant}}>
              {task.detail.local}
              </Text>
            </TouchableOpacity>
            <View style={styles.emptyflex}/>
            </View>)}
            </>)}
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
  const user = useSelector(state => state.user).user
  

  const theme = useTheme();

  const styles = StyleSheet.create({
    itemLeft: {
      flexDirection: "row",
      backgroundColor: theme.colors.surface,
      borderRadius: 10,
      overflow: 'hidden',
      alignItems: "flex-start",
      margin: 10,

    },
    square: {
      width: 10,
      height: '100%',
    },
    itemTaskSubject: {
      fontSize: 22,
      color: theme.colors.onSurfaceVariant,
      paddingLeft: 5,
      width: "100%",
    },
    itemDate: {
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
    },
    iconView: {
      width: 30,
      alignItems:'center'

    },
    acontecendoAgoraMapsIcon:{
      width: 24,
      height: 24,
    },
    acontecendoAgoraRow:{
      flexDirection: "row",
      justifyContent: "flex-start",  
      alignItems: "center",
    },
    localContainer:{
      borderWidth: 1,
      borderColor: theme.colors.outline,
      borderRadius: 8,
      backgroundColor: theme.colors.surface,
      flexDirection: 'row',
      marginTop:5,
      padding: 5,
      paddingRight: 10,
    },

  });

  return (
        <TouchableOpacity style={{...styles.itemLeft}} onPress={edit}>
          <Gradient style={{ ...styles.square }} color={task.color}/>
          <View style={styles.atumalaca}>
            <Text style={styles.itemTaskSubject}>{task.name}</Text>
            <View style={styles.superItem}>
              <View style={styles.iconView}>
              <MaterialCommunityIcons name="clock" size={24} color={theme.colors.onSurfaceVariant} />
              </View>
              <Text style={styles.itemDate}>
                {""}
                {mostrarData ? formatDateWithHour(task.detail.datetime_init) : formatHour(task.detail.datetime_init)} -{" "}
                {formatHour(task.detail.datetime_end)}
                
              </Text>
            </View>
            {task.detail.local.length > 0 && (<View style={styles.acontecendoAgoraRow}>
            <TouchableOpacity style={styles.localContainer}
              onPress={async () => {
              let place = user.campus + ", UFSCAR, " + task.detail.local;
    
              const url =
                "https://www.google.com/maps/search/?api=1&query=" +
                encodeURI(place);
    
              const supported = await Linking.canOpenURL(url);
    
              if (supported) {
                await Linking.openURL(url);
              } else {
                Alert.alert(`Don't know how to open this URL: ${url}`);
              }
            }}
            
            >
              <Image style={styles.acontecendoAgoraMapsIcon} source={mapsSrc}/>
              <Text style={{color: theme.colors.onSurface}}>
              {task.detail.local}
              </Text>
            </TouchableOpacity>
            <View style={styles.emptyflex}/>
            </View>)}
          </View>
          
    </TouchableOpacity>
  );

}

export function EventRender(props) {
  const mostrarData = props.show || false
  let task = props.task;
  const navigation = useNavigation();
  const edit = () => {
    navigation.navigate("Event", { task: task });
  };
  const hasCheck = task.when_submit!=null
  const dispatch = useDispatch();


  const theme = useTheme();

  const styles = StyleSheet.create({
    itemLeft: {
      flexDirection: "row",
      backgroundColor: theme.colors.surface,
      borderRadius: 10,
      overflow: 'hidden',
      alignItems: "flex-start",
      margin: 10,
      width: '100%'
    },
    square: {
      width: 10,
      height: '100%',
    },
    itemTaskSubject: {
      fontSize: 22,
      color: theme.colors.onSurfaceVariant,
    },
    itemDate: {
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
      paddingLeft: hasCheck? 5: 10,
      flexShrink: 1
    },
    iconView: {
      width: 30,
      alignItems:'center',
      paddingLeft: hasCheck? 5: 0,
    },
    linhaTitulo: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      paddingLeft: hasCheck? 0: 5,
      width: "100%",
    }, 
    check:{
      margin:0,
      padding:0,
      marginRight: 5,

    }

  });
  return (
        <TouchableOpacity style={{...styles.itemLeft}} onPress={edit}>
          <Gradient style={{ ...styles.square }} color={task.color}/>
          <View style={styles.atumalaca}>
            <View style={styles.linhaTitulo}>
            {hasCheck && <Checkbox
                style={styles.check}
                status={task.is_submited ? 'checked' : 'unchecked'}
                onPress={() => {
                  dispatch(updateEvent({...task, is_submited: !task.is_submited}));
                }}
              />}
              <Text style={styles.itemTaskSubject}>{task.name}</Text>

            </View>

            {task.details.map((detail, index) => <View key={index} style={styles.superItem}>
              <View style={styles.iconView}>
              <MaterialCommunityIcons name="clock" size={24} color={theme.colors.onSurfaceVariant} />
              </View>
              <Text style={styles.itemDate}>
                {""}
                {mostrarData ? formatDateWithHour(detail.datetime_init) : weekDaysNames[detail.day] + formatHour(detail.datetime_init)} -{" "}
                {formatHour(detail.datetime_end)}
                
              </Text>
            </View>)}

          </View>
          
    </TouchableOpacity>
  );

}
