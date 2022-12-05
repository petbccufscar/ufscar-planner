import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Linking,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/core";
import { useSelector, useDispatch } from "react-redux";
import {
  formatHour,
  formatDateWithHour,
  weekDaysFullNames,
  SIGA,
  mapIconURI,
} from "../helpers/helper";
import {
  useTheme,
  Checkbox,
  Dialog,
  Portal,
  Button,
  TextInput,
} from "react-native-paper";
import {
  Entypo,
  MaterialIcons,
  MaterialCommunityIcons,
  FontAwesome,
} from "@expo/vector-icons";
import { Gradient } from "./Gradient";
import { updateEvent } from "../redux/actions/eventActions";
import { magic } from "../helpers/ExpressionHelper";
import DropDown from "react-native-paper-dropdown";
import { PropTypes } from "prop-types";
const mapsSrc = { uri: mapIconURI };

export function Task(props) {
  const mostrarData = props.show || false;
  let task = props.task;
  const navigation = useNavigation();
  const user = useSelector((state) => state.user).user;
  const subjectScreen = props.subjectScreen || false;
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
      overflow: "hidden",
      alignItems: "flex-start",
      marginVertical: 10,
      // width: '100%',
    },
    square: {
      // height: "100%",
      // flex: 1,
      width: 10,
      height: "100%",
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
      flexWrap: "wrap",
    },
    superItem: {
      paddingTop: 5,
      flexDirection: "row",
      alignItems: "center",
    },
    atumalaca: {
      padding: 10,
      flex: 1,
      flexShrink: 1,
      // backgroundColor: ,
    },
    iconView: {
      width: 30,
      alignItems: "center",

    },
    acontecendoAgoraMapsIcon: {
      width: 24,
      height: 24,
    },
    acontecendoAgoraRow: {
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "center",
    },
    localContainer: {
      borderWidth: 1,
      borderColor: theme.colors.outline,
      borderRadius: 8,
      backgroundColor: theme.colors.surface,
      flexDirection: "row",
      padding: 5,
      paddingRight: 10,
      marginTop: 5,
    },
    linhaAcontecendoTitulo: {
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "flex-start",
      paddingHorizontal: 5,
    },
    AcontecendoView: {
      alignItems: "flex-end",
      right: 0,
    },
    AcontecendoIcon: {
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: colors.primary,
      width: 30,
      height: 30,
      borderRadius: 8,
      marginLeft: 5,
    },
  });

  return (
    <TouchableOpacity style={{ ...styles.itemLeft }} onPress={edit}>
      <Gradient style={{ ...styles.square }} color={task.color} />

      <View style={styles.atumalaca}>
        <View style={styles.linhaAcontecendoTitulo}>
          <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
            <Text
              style={{
                ...styles.itemTaskSubject,
                alignSelf: "flex-start",
                flex: 1,
              }}
            >
              {task.name}
            </Text>
            {subjectScreen && task.siga && <SIGA />}
          </View>
          <View style={styles.AcontecendoView}>
            {acontecendoAgora && <View style={styles.AcontecendoIcon}>
              <MaterialIcons
                name="hourglass-bottom"
                size={20}
                color={colors.onPrimary}
              />
            </View>}
          </View>
        </View>
        {!subjectScreen && <>
          <View style={styles.superItem}>
            <View style={styles.iconView}>
              <MaterialCommunityIcons
                name="clock"
                size={24}
                color={theme.colors.onSurfaceVariant}
              />
            </View>
            <Text style={styles.itemDate}>
              {""}
              {
                mostrarData ?
                  formatDateWithHour(task.detail.datetime_init) :
                  formatHour(task.detail.datetime_init)
              } -{" "}
              {formatHour(task.detail.datetime_end)}
            </Text>
          </View>
        </>}
        {task.is_subject && task.teachers && task.teachers.length > 0 &&
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <FontAwesome
              name="user"
              size={24}
              style={{ margin: 5 }}
              color={theme.colors.onSurfaceVariant}
            />
            <Text
              style={{ color: theme.colors.onSurfaceVariant }}
            >
              {task.teachers[0]}{task.teachers.length > 1 ? " +" : ""}
            </Text>
          </View>
        }
        {!subjectScreen && <>
          {task.description.length > 0 &&
            <View style={styles.superItem}>
              <View style={styles.iconView}>
                <Entypo
                  name="text"
                  size={24}
                  color={theme.colors.onSurfaceVariant}
                />
              </View>
              <Text style={styles.itemDate}>{`${task.description}`}
              </Text>
            </View>}
          {
            task.detail.local.length > 0 &&
            <View style={styles.acontecendoAgoraRow}>
              <TouchableOpacity style={styles.localContainer}
                onPress={async() => {
                  let place = user.campus + ", UFSCAR, " + task.detail.local;

                  const url =
                  "https://www.google.com/maps/search/?api=1&query=" +
                  encodeURI(place);


                  try {
                    await Linking.openURL(url);
                  } catch (e) {
                    console.log(e);
                  }
                }}

              >
                <Image
                  style={styles.acontecendoAgoraMapsIcon}
                  source={mapsSrc}
                />
                <Text style={{ color: theme.colors.onSurfaceVariant }}>
                  {task.detail.local}
                </Text>
              </TouchableOpacity>
              <View style={styles.emptyflex} />
            </View>}
        </>}
      </View>
    </TouchableOpacity>
  );
}

Task.propTypes = PropTypes.any;

export function EventCards(props) {
  const mostrarData = props.show || false;
  let task = props.task;
  const navigation = useNavigation();

  const edit = () => {
    navigation.navigate("Event", { task: task });
  };
  const user = useSelector((state) => state.user).user;


  const theme = useTheme();

  const styles = StyleSheet.create({
    itemLeft: {
      flexDirection: "row",
      backgroundColor: theme.colors.surface,
      borderRadius: 10,
      overflow: "hidden",
      alignItems: "flex-start",
      margin: 10,

    },
    square: {
      width: 10,
      height: "100%",
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
      flexWrap: "wrap",
    },
    superItem: {
      paddingTop: 5,
      flexDirection: "row",
      alignItems: "center",
    },
    atumalaca: {
      padding: 10,

      flexShrink: 1,
    },
    iconView: {
      width: 30,
      alignItems: "center",

    },
    acontecendoAgoraMapsIcon: {
      width: 24,
      height: 24,
    },
    acontecendoAgoraRow: {
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "center",
    },
    localContainer: {
      borderWidth: 1,
      borderColor: theme.colors.outline,
      borderRadius: 8,
      backgroundColor: theme.colors.surface,
      flexDirection: "row",
      marginTop: 5,
      padding: 5,
      paddingRight: 10,
    },

  });

  return (
    <TouchableOpacity style={{ ...styles.itemLeft }} onPress={edit}>
      <Gradient style={{ ...styles.square }} color={task.color} />
      <View style={styles.atumalaca}>
        <Text style={styles.itemTaskSubject}>{task.name}</Text>
        <View style={styles.superItem}>
          <View style={styles.iconView}>
            <MaterialCommunityIcons
              name="clock"
              size={24}
              color={theme.colors.onSurfaceVariant}
            />
          </View>
          <Text style={styles.itemDate}>
            {""}
            {
              mostrarData ?
                formatDateWithHour(task.detail.datetime_init) :
                formatHour(task.detail.datetime_init)
            } -{" "}
            {formatHour(task.detail.datetime_end)}

          </Text>
        </View>
        {
          task.detail.local.length > 0 &&
           <View style={styles.acontecendoAgoraRow}>
             <TouchableOpacity style={styles.localContainer}
               onPress={async() => {
                 let place = user.campus + ", UFSCAR, " + task.detail.local;

                 const url =
                "https://www.google.com/maps/search/?api=1&query=" +
                encodeURI(place);

                 try {
                   await Linking.openURL(url);
                 } catch (e) {
                   console.log(e);
                 }
               }}

             >
               <Image
                 style={styles.acontecendoAgoraMapsIcon}
                 source={mapsSrc}
               />
               <Text style={{ color: theme.colors.onSurface }}>
                 {task.detail.local}
               </Text>
             </TouchableOpacity>
             <View style={styles.emptyflex} />
           </View>}
      </View>

    </TouchableOpacity>
  );
}

EventCards.propTypes = PropTypes.any;

export function EventRender(props) {
  let task = props.task;
  const mostrarData = task.weekly;
  const navigation = useNavigation();
  const edit = () => {
    navigation.navigate("Event", { task: task });
  };
  const hasCheck = task.when_submit != null;
  const dispatch = useDispatch();


  const theme = useTheme();

  const styles = StyleSheet.create({
    itemLeft: {
      flexDirection: "row",
      backgroundColor: theme.colors.surface,
      borderRadius: 10,
      overflow: "hidden",
      alignItems: "flex-start",
      margin: 10,
      width: "100%",
    },
    square: {
      width: 10,
      height: "100%",
    },
    itemTaskSubject: {
      fontSize: 22,
      color: theme.colors.onSurfaceVariant,
    },
    itemDate: {
      fontSize: 14,
      color: theme.colors.onSurfaceVariant,
      flexShrink: 1,
      flexWrap: "wrap",
    },
    superItem: {
      paddingTop: 5,
      flexDirection: "row",

    },
    atumalaca: {
      padding: 10,
      paddingLeft: hasCheck ? 5 : 10,
      flexShrink: 1,
    },
    iconView: {
      width: 30,
      alignItems: "center",
      paddingLeft: hasCheck ? 5 : 0,
    },
    linhaTitulo: {
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "flex-start",
      paddingLeft: hasCheck ? 0 : 5,
      width: "100%",
    },
    check: {
      margin: 0,
      padding: 0,
      marginRight: 5,

    },

  });
  return (
    <TouchableOpacity style={{ ...styles.itemLeft }} onPress={edit}>
      <Gradient style={{ ...styles.square }} color={task.color} />
      <View style={styles.atumalaca}>
        <View style={styles.linhaTitulo}>
          {hasCheck && <Checkbox
            style={styles.check}
            status={task.is_submited ? "checked" : "unchecked"}
            onPress={() => {
              dispatch(updateEvent({
                ...task,
                is_submited: !task.is_submited,
              }));
            }}
          />}
          <Text style={styles.itemTaskSubject}>{task.name}</Text>

        </View>

        {
          task.details.map(
            (detail, index) => <View key={index} style={styles.superItem}>
              <View style={styles.iconView}>
                <MaterialCommunityIcons
                  name="clock"
                  size={24}
                  color={theme.colors.onSurfaceVariant}
                />
              </View>
              <Text style={styles.itemDate}>
                {""}
                {
                  mostrarData ?
                    formatDateWithHour(detail.datetime_init) :
                    weekDaysFullNames[detail.day] +
                 ", " +
                 formatHour(detail.datetime_init)
                } -{" "}
                {formatHour(detail.datetime_end)}

              </Text>
            </View>,
          )}

      </View>

    </TouchableOpacity>
  );
}

EventRender.propTypes = PropTypes.any;

export function NotaRender(props) {
  let task = props.task;
  const navigation = useNavigation();

  const theme = useTheme();
  const edit = () => {
    navigation.navigate("Event", { task: task });
  };
  const colors = theme.colors;
  const styles = StyleSheet.create({
    itemLeft: {
      flexDirection: "row",
      backgroundColor: theme.colors.surface,
      borderRadius: 10,
      overflow: "hidden",
      alignItems: "flex-start",
      margin: 10,
      width: "100%",
    },
    square: {
      width: 10,
      height: "100%",
    },
    atumalaca: {
      padding: 10,
      paddingLeft: 10,
      flexShrink: 1,
      flex: 1,

    },
    titulo: {
      color: colors.primary,
      fontSize: 22,
    },
    header: {
      flexDirection: "row",
      borderBottomColor: colors.outline,
      borderBottomWidth: 1,
    },
    campo: {
      paddingRight: 5,
      flexDirection: "row",
      marginRight: 10,
      alignItems: "center",
      paddingVertical: 10,
    },
    campotxt: {
      fontSize: 16,
      color: colors.onSurfaceVariant,
      maxWidth: "90%",
      overflow: "scroll",
    },
    campoicon: {
      marginRight: 5,
    },
    nota: {
      flexDirection: "row",
      paddingVertical: 5,
      alignItems: "center",
    },
    notas: {
      paddingVertical: 5,
    },
    notaleft: {
      flexDirection: "row",
      alignItems: "center",
      flex: 1,
    },
    notaright: {

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
      borderRadius: 10,

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
    editarrow: {
      justifyContent: "center",
      alignItems: "center",
      flex: 1,
      margin: 10,
    },
    inputText: { backgroundColor: colors.surface1, marginVertical: 10 },

  });
  const [dict, setDict] = useState(task?.grade?.mean || {});

  let resultMean = "";

  try {
    const meanRes = magic(dict || {}, task.mean || "");
    resultMean = "" + (meanRes.result || 0);
  } catch (e) { /* empty */ }

  const [visible, setVisible] = React.useState(false);

  const showDialog = () => setVisible(true);
  const [dropOrd, setDropOrd] = useState(false);
  const [selected, setSelected] = useState(null);
  let listItems = [];
  let keys = Object.keys(dict);
  for (let i = 0; i < keys.length; i++) {
    listItems.push({ label: keys[i], value: keys[i] });
  }

  const dispatch = useDispatch();
  const hideDialog = () => setVisible(false);
  const submit = () => {
    let auxdict = {};
    for (let i = 0; i < keys.length; i++) {
      auxdict[keys[i]] = parseFloat(dict[keys[i]]);
    }
    setDict(auxdict);
    dispatch(updateEvent({ ...task, grade: { ...task.grade, mean: auxdict } }));
    hideDialog();
  };
  return (
    <TouchableOpacity style={{ ...styles.itemLeft }} onPress={edit}>
      <Gradient style={{ ...styles.square }} color={task.color} />
      <View style={styles.atumalaca}>
        <Text style={styles.titulo}>{task.name}</Text>
        <View style={styles.header}>
          {task.teachers.length > 0 &&
            <View style={styles.campo}>
              <MaterialIcons
                style={styles.campoicon}
                name="person"
                size={24}
                color={colors.onSurfaceVariant}
              />
              <Text style={styles.campotxt}>
                {task.teachers[0]} {task.teachers.length > 1 ? "+" : ""}
              </Text>
            </View>}

          <View style={styles.campo}>
            <MaterialIcons
              style={styles.campoicon}
              name="stars"
              size={24}
              color={colors.onSurfaceVariant}
            />
            <Text style={styles.campotxt}>{resultMean}</Text>
          </View>
        </View>
        <View style={styles.notas}>
          {Object.keys(dict).map((item, index) =>
            <View style={styles.nota} key={index}>
              <View style={styles.notaleft}>
                <MaterialIcons
                  style={styles.campoicon}
                  name="event"
                  size={24}
                  color={colors.onSurface}
                />
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
          <Dialog
            style={{ backgroundColor: colors.dialog }}
            visible={visible}
            onDismiss={hideDialog}
          >
            <Dialog.Title style={{ color: colors.onSurfaceVariant }}>
              Escolha qual nota você deseja editar, e informe o valor.
            </Dialog.Title>
            <Dialog.Content>
              <DropDown
                mode={"flat"}
                visible={dropOrd}
                showDropDown={() => setDropOrd(true)}
                onDismiss={() => setDropOrd(false)}
                value={selected}
                list={listItems}
                setValue={setSelected}
                label={"Escolha uma nota"}
                inputProps={{ style: styles.inputText }}
                theme={{ colors: { primary: colors.primary } }}
              />
              <TextInput
                label="Valor"
                placeholder="0.0"
                placeholderTextColor={colors.outline}
                style={styles.inputText}
                keyboardType="number-pad"
                value={
                  selected != undefined &&
                  selected != null ?
                    dict[selected].toString() :
                    ""
                }
                onChangeText={(text) => {
                  if (selected != null && selected != undefined) {
                    let auxdict = { ...dict };
                    try {
                      const aux = parseFloat(text);

                      auxdict[selected] = isNaN(aux) ? "0" : text;
                      setDict(auxdict);
                    } catch (e) { /* empty */ }
                  }
                }}
              />
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={hideDialog} style={{ padding: 10 }}>
                Cancelar
              </Button>
              <Button onPress={submit} style={{ padding: 10 }}>
                Ok
              </Button>

            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>

    </TouchableOpacity>
  );
}

NotaRender.propTypes = PropTypes.any;

export function FreqRender(props) {
  const theme = useTheme();
  const colors = theme.colors;

  let resultFreq = "";
  let task = props.task;
  const navigation = useNavigation();
  const edit = () => {
    navigation.navigate("Event", { task: task });
  };
  try {
    const freqRes = magic(task?.grade?.frequency || {}, task.frequency || "");
    resultFreq = "" + (freqRes.result * 100 || 0);
  } catch (e) { /* empty */ }

  resultFreq += "%";

  const styles = StyleSheet.create({
    headerline: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      paddingBottom: 10,
    },
    name: {
      flex: 1,
      color: colors.onSurfaceVariant,
      fontSize: 20,
    },
    editar: {
      color: colors.primary,
    },
    editarbtn: {
      padding: 10,
    },
    texto: {
      color: colors.onSurfaceVariant,
    },
    textocontainer: {
      flex: 1,
    },
    body: {
      flexDirection: "row",
    },
    percentcontainer: {
      alignItems: "flex-end",
      justifyContent: "flex-end",
    },
    percentText: {
      color: colors.onSurface,
      marginRight: 10,

    },
    bar: {
      height: 25,
      width: "100%",
      backgroundColor: "#c4c4c4",
      borderRadius: 20,
      alignItems: "flex-start",
      justifyContent: "flex-start",
      marginTop: 10,
      overflow: "hidden",
    },
    barprogress: {
      height: 25,
      borderRadius: 20,
      width: resultFreq,
    },
    card: {
      flex: 1,
      backgroundColor: colors.surface,
      margin: 20,
      padding: 20,
      borderRadius: 10,
      width: "100%",
    },
    table: {
      flex: 1,
      marginBottom: 5,
    },
    tableline: {
      flexDirection: "row",
      padding: 5,
      borderRadius: 5,

    },
    tablelineA: {
      flexDirection: "row",
      padding: 5,
      backgroundColor: colors.surfaceVariant,
      borderRadius: 5,

    },
    tablel: {
      flex: 1,
      color: colors.onSurfaceVariant,
    },
    tabler: {
      marginRight: 5,
      color: colors.onSurfaceVariant,
    },
    input: {
      minHeight: 40,
      minWidth: "30%",
      borderRadius: 5,
      backgroundColor: colors.surface,
    },
  });
  const removeSpaces = (str) => str.replace(/\s/g, "");
  const isDefault =
    removeSpaces(task.frequency || "") == "(aulasDadas-faltas)/aulasDadas";
  const aulasDadas = task?.grade?.frequency?.aulasDadas || 0;
  const faltas = task?.grade?.frequency?.faltas || 0;
  const [visible, setVisible] = React.useState(false);

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);
  const [open, setOpen] = useState(false);
  const freqkeys = Object.keys(task?.grade?.frequency || {});
  const items = [];
  for (let i = 0; i < freqkeys.length; i++) {
    items.push({ label: freqkeys[i], value: freqkeys[i] });
  }
  const [dropvalue, setDropalue] = useState(freqkeys[0]);
  const [dict, setDict] = useState(task?.grade?.frequency || {});
  const dispatch = useDispatch();

  const submit = () => {
    let auxdict = {};
    for (let i = 0; i < freqkeys.length; i++) {
      auxdict[freqkeys[i]] = parseFloat(dict[freqkeys[i]]);
    }

    dispatch(updateEvent({
      ...task,
      grade: { ...task.grade, frequency: auxdict },
    }));
    hideDialog();
  };

  return <TouchableOpacity style={styles.card} onPress={edit}>
    <View style={styles.headerline}>
      <Text style={styles.name}>{task.name}</Text>
      <TouchableOpacity style={styles.editarbtn} onPress={showDialog}>
        <Text style={styles.editar}>Editar</Text>
      </TouchableOpacity>
    </View>
    {!isDefault && <View style={styles.table}>
      {Object.keys(task?.grade?.frequency || {}).map((item, index) =>
        <View
          style={index % 2 == 0 ? styles.tablelineA : styles.tableline}
          key={index}
        >
          <Text style={styles.tablel}>{item}</Text>
          <Text style={styles.tabler}>{task.grade.frequency[item]}</Text>
        </View>)}
    </View>}
    <View style={styles.body}>
      <View style={styles.textocontainer}>
        {isDefault && <>
          <Text style={styles.texto}>
            Quantidade de presenças: {aulasDadas - faltas}
          </Text>
          <Text style={styles.texto}>Quantidade de faltas: {faltas}</Text>
          <Text style={styles.texto}>
            Faltas disponiveis:
            {Math.max(0, Math.floor(0.25 * aulasDadas - faltas))}
          </Text>
        </>}
      </View>
      <View style={styles.percentcontainer}>
        <Text style={styles.percentText}>{resultFreq}</Text>
      </View>

    </View>
    <View style={styles.bar}>
      <Gradient style={styles.barprogress} color={task.color}></Gradient>
    </View>
    <Portal>
      <Dialog
        style={{ backgroundColor: colors.dialog }}
        visible={visible}
        onDismiss={hideDialog}
      >
        <Dialog.Title style={{ color: colors.onSurfaceVariant }}>
          Escolha os meios de presença dessa matéria:
        </Dialog.Title>
        <Dialog.Content>
          <DropDown
            label={"Variável"}
            mode={"outlined"}
            visible={open}
            showDropDown={() => setOpen(true)}
            onDismiss={() => setOpen(false)}
            value={dropvalue}
            list={items}
            setValue={setDropalue}
            theme={theme}

          />
          <Text style={{ color: colors.onSurface }}>
            {dropvalue != null && dropvalue != undefined ? dropvalue : ""}
          </Text>
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TouchableOpacity
                style={{
                  backgroundColor: colors.primary,
                  minHeight: 30,
                  minWidth: 30,
                  margin: 10,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 10,
                }}
                onPress={() => {
                  if (dropvalue != null && dropvalue != undefined) {
                    let auxdict = { ...dict };
                    try {
                      const aux = parseFloat(dict[dropvalue]);
                      auxdict[dropvalue] = isNaN(aux) ?
                        "0" :
                        (aux - 1).toString();
                      setDict(auxdict);
                    } catch (e) { /* empty */ }
                  }
                }}
              >
                <Text style={{ fontSize: 20, color: colors.onPrimary }}>-</Text>
              </TouchableOpacity>
              <TextInput
                style={{ ...styles.input, textAlign: "center" }}
                placeholderTextColor={colors.outline}
                keyboardType="number-pad"
                placeholder="0.0"
                value={
                  dropvalue != undefined &&
                  dropvalue != null ?
                    dict[dropvalue].toString() :
                    ""
                }
                onChangeText={(text) => {
                  if (dropvalue != null && dropvalue != undefined) {
                    let auxdict = { ...dict };
                    try {
                      const aux = parseFloat(text);
                      auxdict[dropvalue] = isNaN(aux) ? "0" : text;
                      setDict(auxdict);
                    } catch (e) { /* empty */ }
                  }
                }}
              ></TextInput>
              <TouchableOpacity
                style={{
                  backgroundColor: colors.primary,
                  minHeight: 30,
                  minWidth: 30,
                  margin: 10,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 10,
                }}
                onPress={() => {
                  if (dropvalue != null && dropvalue != undefined) {
                    let auxdict = { ...dict };
                    try {
                      const aux = parseFloat(dict[dropvalue]);
                      auxdict[dropvalue] = isNaN(aux) ?
                        "0" :
                        (aux + 1).toString();
                      setDict(auxdict);
                    } catch (e) { /* empty */ }
                  }
                }}
              >
                <Text style={{ fontSize: 20, color: colors.onPrimary }}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={hideDialog} style={{ padding: 10, margin: 5 }}>
            Cancelar
          </Button>
          <Button style={{ padding: 10, margin: 5 }} onPress={submit}>
            Salvar
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>


  </TouchableOpacity>;
}

FreqRender.propTypes = PropTypes.any;
