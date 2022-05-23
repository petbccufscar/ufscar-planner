import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useEffect, useState } from "react";
import {
  StyleSheet, Text, TouchableOpacity, View
} from "react-native";
import { FAB, useTheme, Checkbox } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { getTime, magic } from "../helpers/ExpressionHelper";
import { formatDateWithHour } from "../helpers/helper";
import {
  removeEvent, updateEvent
} from "../redux/actions/eventActions";
import { Gradient } from "../components/Gradient";
import ScrollView from "../components/ScrollView";
import { withPreventDoubleClick } from '../helpers/withPreventDoubleClick';





export default function Details({ route, navigation }) {
  let task = { ...route.params.task };

  const items = useSelector((state) => state.events).events;

  task = items.find((e) => e.id == task.id) || {};

  const [isSubmited, setIsSubmited] = useState(task.is_submited || false);
  const isSubject = task.is_subject || false;
  const weekly = task.weekly;
  const color = task.color || 0;
  const turma = task.turma || "";
  const teachers = task.teachers || [];


  // tela separada
  const grade = task.grade || {};
  const frequency = (task.frequency || "(aulasDadas - faltas)/aulasDadas");
  const mean = task.mean || "(p1+p2+p3)/3";
  const whenSubmit = task.when_submit || null;

  const name = task.name || "";
  const details = task.details || [];
  const notifications = task.notification || [];
  const description = task.description || "";

  const colors = useTheme().colors;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateEvent({...task, is_submited: isSubmited}));
  },[isSubmited])

  const week = [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado",
  ];

  useEffect(() => {
    navigation.setOptions({
      headerTintColor: colors.onSurface,
      headerTitle: isSubject ? "Detalhes da Matéria" : "Detalhes do Evento",
    });
  }, []);


  function formatHour(date) {
    const dateFormat = new Date(date);
    return (
      ("0" + dateFormat.getHours()).slice(-2) +
      "h" +
      ("0" + dateFormat.getMinutes()).slice(-2)
    );
  }

  let resultMean = "";
  let resultFreq = "";

  const TouchableOpacityD = withPreventDoubleClick(TouchableOpacity);

  try {
    const meanRes = magic(grade.mean || {}, mean || "");
    resultMean = "" + (meanRes.result || 0);
  } catch (e) { }

  try {
    const freqRes = magic(grade.frequency || {}, frequency || "");
    resultFreq = "" + (freqRes.result || 0);
  } catch (e) { }

  function notificationText(notification) {
    if (notification != 0)
      return getTime(notification) + " antes"
    return "Assim que começar"
  }


  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.surface1,
    },
    trueContainer: {
      flex: 1,
      paddingBottom: 20,
    },
    tituloDetail: {
      color: colors.onSurface,
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 5
    },
    medfreqcontainer: {
      paddingRight: 30
    },
    corpoDetail: {
      color: colors.onSurfaceVariant,
      fontSize: 14,
    },
    turmaDetail: {
      color: colors.primary
    },
    corDetail: {
      height: 20,
      marginRight: 5,
      borderRadius: 5,
      aspectRatio: 1,
    },
    deleteButton: {
      marginTop: 30,
      backgroundColor: colors.surface,
      padding: 10,
      borderRadius: 100,
      borderColor: colors.outline,
      borderWidth: 1
    },
    iconDetail: {
      marginRight: 2,
      height: 24,
      width: 24,

    },
    deleteFont: {
      color: colors.error
    },
    linecenter: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center'
    },
    cortainer: {
      margin: 10,
      marginLeft: 20,

    },
    linhaEsquerdaDetail: {
      flexDirection: 'row',
      alignItems: 'center'
    },
    containerSectionDetail: {
      borderBottomWidth: 1,
      borderBottomColor: colors.outline,
      padding: 20,
      paddingLeft: 0,
      marginLeft: 20
    },
    botaoDetail: {
      backgroundColor: colors.surface,
      padding: 5,
      marginRight: 5,
      marginTop: 20,
      marginLeft: 0,
      borderColor: colors.outline,
      borderRadius: 8,
      borderWidth: 1,
    },
    nomeEventoDetail: {
      color: colors.onSurface,
      fontSize: 22,

    },
    fab: {
      position: 'absolute',
      shadowOpacity: 10,
      borderRadius: 10,
      backgroundColor: colors.surface3,
      margin: 16,
      right: 0,
      bottom: 0,
    },
    containername: {
      paddingLeft: 20,

    },


  })

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.trueContainer}>
          <View style={styles.cortainer}>
            <View style={styles.linhaEsquerdaDetail}>
              <Gradient style={styles.corDetail} color={color} />

              {turma.length > 0 && (<Text style={styles.turmaDetail}>{`${turma}`}</Text>)}
              {turma.length === 0 && (<Text style={styles.nomeEventoDetail}>{`${name}`}</Text>)}
            </View>
          </View>
          {
            turma.length > 0 && (<Text style={{ ...styles.nomeEventoDetail, ...styles.containername }}>{`${name}`}</Text>)}
          {description.length > 0 && (
            <View style={styles.containerSectionDetail}>
              <Text style={styles.tituloDetail}>Descrição</Text>
              <Text style={styles.corpoDetail}>{description}</Text>
            </View>
          )}
          {whenSubmit != null && (
            <View style={styles.containerSectionDetail}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={{...styles.tituloDetail, marginBottom:0, flex:1}}>Concluído</Text>
              <Checkbox
                status={isSubmited ? 'checked' : 'unchecked'}
                onPress={() => {
                  setIsSubmited(!isSubmited);
                }}
              />
              </View>
            </View>
          )}

          <View style={styles.containerSectionDetail}>
            <View style={styles.linhaEsquerdaDetail}>
              <View style={styles.medfreqcontainer}>
                <Text style={styles.tituloDetail}>Média</Text>
                <Text style={styles.corpoDetail}>{resultMean}</Text>
              </View><View style={styles.medfreqcontainer}>
                <Text style={styles.tituloDetail}>Frequência</Text>
                <Text style={styles.corpoDetail}>{resultFreq}</Text>
              </View>
            </View>
            <ScrollView horizontal={true}>
              <View style={styles.linhaEsquerdaDetail}>
                <TouchableOpacity style={styles.botaoDetail} onPress={() =>
                  navigation.navigate("Subject", {
                    type: 'editMean',
                    task: {
                      ...task,
                      grade: grade,
                      frequency: frequency,
                      mean: mean,
                    },
                  })}>
                  <Text style={{ color: colors.onSurface }}>Editar média</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.botaoDetail} onPress={() =>
                  navigation.navigate("Subject", {
                    type: 'editFrequency',
                    task: {
                      ...task,
                      grade: grade,
                      frequency: frequency,
                      mean: mean,
                    },
                  })}>
                  <Text style={{ color: colors.onSurface }}>Editar frequência</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
          {isSubject && teachers.length > 0 && (<View style={styles.containerSectionDetail}>
            <View style={styles.linhaEsquerdaDetail}>
              <View style={styles.iconDetail}>
                <MaterialCommunityIcons name="account" size={24} color={colors.onSurfaceVariant} />
              </View>
              <Text style={styles.tituloDetail}>Professores</Text>
            </View>
            {teachers.map((teacher, index) => (
              <Text style={styles.corpoDetail} key={index}>{teacher}</Text>))
            }
          </View>)}
          <View style={styles.containerSectionDetail}>
            <View style={styles.linhaEsquerdaDetail}>
              <View style={styles.iconDetail}>
                <MaterialCommunityIcons name="clock" style={styles.iconDetail} size={24} color={colors.onSurfaceVariant} />
              </View>
              <Text style={styles.tituloDetail}>Horários</Text>

            </View>
            {details.map((detail, index) =>
            (<Text style={styles.corpoDetail} key={index}>{`${weekly
              ? week[detail.day] + " " + `${formatHour(detail.datetime_init)}`
              : formatDateWithHour(detail.datetime_init)
              }`} {` - ${formatHour(
                detail.datetime_end
              )}`}</Text>))
            }
          </View>
          {
            notifications.length > 0 && (
              <View style={styles.containerSectionDetail}>
                <View style={styles.linhaEsquerdaDetail}>
                  <View style={styles.iconDetail}>
                    <MaterialCommunityIcons name="bell" style={styles.iconDetail} size={24} color={colors.onSurfaceVariant} />
                  </View>
                  <Text style={styles.tituloDetail}>Notificações</Text>
                </View>
                {notifications.map((notification, index) => (
                  <Text style={styles.corpoDetail} key={index}>{notificationText(notification)}</Text>))
                }
              </View>)
          }
          <View style={styles.linecenter}>
            <TouchableOpacityD style={styles.deleteButton} onPress={() => {
              navigation.pop();
              dispatch(removeEvent(task));
            }}>
              <View style={styles.linhaEsquerdaDetail}>
                <MaterialCommunityIcons name="trash-can" style={styles.iconDetail} size={24} color={colors.error} />
                <Text style={styles.deleteFont}>Excluir</Text>
              </View>
            </TouchableOpacityD>
          </View>
        </View>
      </ScrollView>
      <FAB
        style={styles.fab}
        color={colors.primary}
        icon="pencil"
        onPress={() => navigation.navigate("EditScreen", { task: task })}
      />
    </View>);



}
