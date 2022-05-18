import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Linking, Alert, Image} from "react-native";
import { useNavigation } from "@react-navigation/core";
import { useSelector, useDispatch } from 'react-redux';
import { formatHour, formatDateWithHour, weekDaysNames, weekDaysFullNames } from '../helpers/helper';
import { useTheme, Checkbox, Paragraph, Dialog, Portal, Button } from "react-native-paper";
import { Entypo, MaterialIcons, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
import { Gradient } from "./Gradient";
import { updateEvent } from "../redux/actions/eventActions";
import { magic } from "../helpers/ExpressionHelper";
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
  let task = props.task;
  const mostrarData = task.weekly
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
                {mostrarData ? formatDateWithHour(detail.datetime_init) : weekDaysFullNames[detail.day] +", " + formatHour(detail.datetime_init)} -{" "}
                {formatHour(detail.datetime_end)}
                
              </Text>
            </View>)}

          </View>
          
    </TouchableOpacity>
  );

}


export function NotaRender(props) {
  let task = props.task;
  const navigation = useNavigation();

  const theme = useTheme();
  const edit = () => {
    navigation.navigate("Event", { task: task });
  };
  const colors = theme.colors
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
    atumalaca: {
      padding: 10,
      paddingLeft: 10,
      flexShrink: 1,
      flex: 1,
      
    },
    titulo:{
      color: colors.primary,
      fontSize: 22,
    },
    header: {
      flexDirection: 'row',
      borderBottomColor: colors.outline,
      borderBottomWidth: 1,
    },
    campo: {
      paddingRight: 5,
      flexDirection: 'row',
      marginRight: 10,
      alignItems: 'center',
      paddingVertical: 10
    },
    campotxt: {
      fontSize: 16,
      color: colors.onSurfaceVariant,
      maxWidth: '90%',
      overflow: 'scroll'
    },
    campoicon: {
      marginRight: 5
    }, 
    nota: {
      flexDirection: 'row',
      paddingVertical: 5,
      alignItems: 'center'
    },
    notas: {
      paddingVertical: 5,
    },
    notaleft:{
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    notaright:{

    },
    notatxt: {
      fontSize: 19,
      color: colors.onSurface,
    },
    notavalue: {
      fontSize: 19,
      color: colors.onSurfaceVariant,
      padding: 5,
      backgroundColor: colors.surfaceVariant,
      borderRadius: 10

    },
    editarbtn: {
      padding: 10,
      paddingHorizontal: 15,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: colors.outline,
    },
    editartxt: {
      color: colors.primary,
      fontSize: 16,
    },
    editarrow:{
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1,
      margin: 10
    }

  });
  const dict = task?.grades?.mean || {}

  let resultMean = "";

  try {
    const meanRes = magic(dict || {}, task.mean || "");
    resultMean = "" + (meanRes.result || 0);
  } catch (e) {
  }

  const [visible, setVisible] = React.useState(false);
  
  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);
  return (
        <TouchableOpacity style={{...styles.itemLeft}} onPress={edit}>
          <Gradient style={{ ...styles.square }} color={task.color}/>
          <View style={styles.atumalaca}>
          <Text style={styles.titulo}>{task.name}</Text>
          <View style={styles.header}>
          { task.teachers.length > 0 &&
          <View style={styles.campo}> 
          <MaterialIcons style={styles.campoicon} name="person" size={24} color={colors.onSurfaceVariant} />
          <Text style={styles.campotxt}>{task.teachers[0]} {task.teachers.length>1? '+': ''}</Text>
          </View>}

          <View style={styles.campo}> 
          <MaterialIcons style={styles.campoicon} name="stars" size={24} color={colors.onSurfaceVariant} />
          <Text style={styles.campotxt}>{resultMean}</Text>
          </View>
          </View>
          <View style={styles.notas}>
          { Object.keys(dict).map((item, index)=>
          <View style={styles.nota} key={index}>
          <View style={styles.notaleft}> 
          <MaterialIcons style={styles.campoicon} name="event" size={24} color={colors.onSurface} />
          <Text style={styles.notatxt}>{item}</Text>
          </View>
          <View style={styles.notaright}>
            <Text style={styles.notavalue}>{dict[item]}</Text>
          </View> 

          </View>)}

          </View>
          <View style={styles.editarrow}>
          <TouchableOpacity style={styles.editarbtn} onPress={showDialog}>
            <Text style={styles.editartxt}>
              Editar Notas
            </Text>
          </TouchableOpacity>
          </View>
          <Portal>
          <Dialog visible={visible} onDismiss={hideDialog}>
            <Dialog.Title>Editar</Dialog.Title>
            <Dialog.Content>
              <Paragraph>Editando nota</Paragraph>
            </Dialog.Content>
            <Dialog.Actions>
              <TouchableOpacity onPress={hideDialog} style={{padding: 10}}>
                <Text>
                Done
                </Text>
              </TouchableOpacity>
            </Dialog.Actions>
          </Dialog>
          </Portal>
          </View>
          
    </TouchableOpacity>
  );
}



export function FreqRender(props) {
  const colors = useTheme().colors

  let resultFreq = "";
  let task = props.task;


  try {
    const freqRes = magic(task?.grade?.frequency || {}, task.frequency || "");
    resultFreq = "" + (freqRes.result || 0);
  } catch (e) {}

  resultFreq += "%";

  styles = StyleSheet.create({
    headerline: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingBottom: 10,
    },
    name: {
      flex:1,
      color: colors.onSurfaceVariant,
      fontSize: 20
    },
    editar: {
      color: colors.primary
    },
    editarbtn: {

    },
    texto: {
      color: colors.onSurfaceVariant,
    },
    textocontainer:{
      flex:1,
    },
    body:{
      flexDirection: 'row',
    },
    percentcontainer:{
      alignItems: 'flex-end',
      justifyContent: 'flex-end'
    },
    percentText: {
      color: colors.onSurface,
      marginRight:10,

    },
    bar: {
      height: 25,
      width: '100%',
      backgroundColor: '#c4c4c4',
      borderRadius: 20,
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      marginTop: 10,
      overflow: 'hidden'
    },
    barprogress: {
      height: 25,
      backgroundColor: 'red',
      borderRadius: 20,
      width: resultFreq
    },
    card: {
      flex:1,
      backgroundColor: colors.surface,
      margin: 20,
      padding: 20,
      borderRadius: 10,
      width: '100%'
    },
    table: {
      flex:1,
      marginBottom: 5,
    }, 
    tableline:{
      flexDirection: 'row',
      padding: 5,
      borderRadius: 5

    },
    tablelineA:{
      flexDirection: 'row',
      padding: 5,
      backgroundColor: colors.surfaceVariant,
      borderRadius: 5

    },
    tablel:{
      flex:1,
      color: colors.onSurfaceVariant
    },
    tabler:{
      marginRight:5,
      color: colors.onSurfaceVariant
    }
  })
  const removeSpaces = (str) => str.replace(/\s/g, '');
  const isDefault = removeSpaces(task.frequency || "") == "(aulasDadas - faltas)/aulasDadas";

  return (<TouchableOpacity style={styles.card}>
    <View style={styles.headerline}>
      <Text style={styles.name}>{task.name}</Text>
      <TouchableOpacity style={styles.editarbtn}>
        <Text style={styles.editar}>Editar</Text>
      </TouchableOpacity>
    </View>
    {!isDefault && <View style={styles.table}>
      {Object.keys(task?.grade?.frequency||{}).map((item, index) =>
        (<View style={index%2==0?styles.tablelineA:styles.tableline} key={index}>
          <Text style={styles.tablel}>{item}</Text>
          <Text style={styles.tabler}>{task.grade.frequency[item]}</Text>
        </View>))}
      </View>}
    <View style={styles.body}>
      <View style={styles.textocontainer}>
        {isDefault && <>
        <Text style={styles.texto}>quantidade de presenças: 5</Text>
        <Text style={styles.texto}>quantidade de faltas:5</Text>
        <Text style={styles.texto}>faltas disponiveis:5</Text>
        </>}
      </View>
      <View style={styles.percentcontainer}>
        <Text style={styles.percentText}>{resultFreq}</Text>
      </View>
      
    </View>
    <View style={styles.bar}>
        <View style={styles.barprogress}></View>
    </View>



  </TouchableOpacity>)
}