import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Alert,
  StyleSheet,
  LayoutAnimation,
  Linking,
  TextInput
} from "react-native";
import ScrollView from "./ScrollView";
import Toast from "react-native-toast-message";
import { Ionicons, Entypo, MaterialIcons, MaterialCommunityIcons, Feather, FontAwesome } from '@expo/vector-icons';
import { useSelector, useDispatch } from "react-redux";
import {
  updateEvent,
  addEvent,
  removeEvent,
} from "../redux/actions/eventActions";
import Dialog from "react-native-dialog";
  
import { Button, IconButton, useTheme, FAB, Menu, Divider } from "react-native-paper";

import Calendar from "../assets/icons/calendar.svg";
import { BWFont, magic, getTime } from "../helpers/ExpressionHelper";
import { formatDate, formatDateWithHour, minimum } from "../helpers/helper";

import DateTimePickerModal from "react-native-modal-datetime-picker";

import ScrollPicker from "react-native-picker-scrollview";
import { Gradient, PickerGradSquare, SelGradSquare } from "./Gradient";
import { isString } from "mathjs";
export default function Event({ route, navigation }) {
  let task = { ...route.params.task };
  //boleano
  const [isSubject, setIsSubject] = useState(task.is_subject||false);
  const [weekly, setWeekly] = useState(task.weekly||false);
  const [isSubmited, setIsSubmited] = useState(task.is_submited||false);
  
  //todo
  const [subject, setSubject] = useState(task.subject||null);
  const [color, setColor] = useState(task.color||0);
  const [turma, setTurma] = useState(task.turma||"");
  const [teachers, setTeachers] = useState(task.teachers||[]);
  const [whenSubmit, setWhenSubmit] = useState(task.when_submit||null);



  // tela separada
  const [grade, setGrade] = useState(task.grade||{});
  const [frequency, setFrequency] = useState(task.frequency || "(aulasDadas - faltas)/aulasDadas");
  const [mean, setMean] = useState(task.mean || "(p1+p2+p3)/3");

  const [name, setName] = useState(task.name||"Novo Evento");
  const firstTime = task.id == null || task.id == undefined;
  const [editMode, setEditMode] = useState(firstTime);
  const [details, setDetails] = useState(task.details);
  const [notifications, setNotifications] = useState(task.notification);
  const [description, setDescription] = useState(task.description);

  //dialog
  const [openDescriptionDialog, setOpenDescriptionDialog] = useState(false);
  const [openTeacherDialog, setOpenTeacherDialog] = useState(false);
  const [openNameDialog, setOpenNameDialog] = useState(false);
  const [openSubjectDialog, setOpenSubjectDialog] = useState(false);
  const [openNotificationDialog, setOpenNotificationDialog] = useState(false);
  const [openHorarioDialog, setOpenHorarioDialog] = useState(false);
  const [openWhenDialog, setOpenWhenDialog] = useState(false);

  const colors = useTheme().colors;


  const changeWeekly = (e) => {
    if (!e) {
      setWeekly(false);
      setIsSubject(false);
    } else {
      setWeekly(true);
    }
  };

  const dispatch = useDispatch();

  const week = [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado",
  ];

  const sendData = () => {
    task = {
      ...task,
      name: name,
      is_subject: isSubject,
      subject: subject,
      color: color,
      grade: grade,
      details: details,
      notification: notifications,
      description: description,
      weekly: weekly,
      mean: mean,
      frequency: frequency,
      teachers:teachers,
      turma:turma,
      is_submited:isSubmited,
      when_submit:whenSubmit
    };
    if (task.id != undefined && task.id != null) {
      dispatch(updateEvent(task));
    } else {
      dispatch(addEvent(task));
    }
  };

  useEffect(() => {
    navigation.setOptions({
      headerTintColor: colors.onSurface,
      headerTitle: editMode? 
      isSubject? "Editar Matéria": "Editar Evento":
      isSubject? "Detalhes da Matéria": "Detalhes do Evento",
      headerRight: () => (
        editMode && (
        <TouchableOpacity
          style={{backgroundColor: colors.primary, padding: 10, 
            borderRadius: 30, justifyContent: 'center', alignItems:'center',
            marginRight: 10}}
          onPress={() => {
            LayoutAnimation.configureNext({
              duration: 200,
              create: {
                type: LayoutAnimation.Types.easeIn,
                property: LayoutAnimation.Properties.opacity,
              },
              update: {
                type: LayoutAnimation.Types.easeOut,
              },
            });
            if (editMode && details.length == 0 && !isSubject) {
              Toast.show({
                type: "error",
                text1: "Você deve colocar ao menos um horário",
              });
            } else {
              if (editMode) {
                sendData();
                navigation.pop(1);
              }
              setEditMode(!editMode);
            }
          }}
        >
          <Text style={{color: colors.onPrimary}}>Salvar</Text>
        </TouchableOpacity>)
      ),
    });
  }, [
    route.params,
    editMode,
    details,
    weekly,
    frequency,
    mean,
    notifications,
    description,
    name,
    color,
    grade,
    isSubject,
    subject,
    isSubmited,
    turma,
    teachers,
    whenSubmit

  ]);

  useEffect(() => {
    if (route?.params?.grade) setGrade(route.params.grade);
    if (route?.params?.frequency) setFrequency(route.params.frequency);
    if (route?.params?.mean) setMean(route.params.mean);
  }, [route?.params?.grade, route?.params?.frequency, route?.params?.mean]);

  function sortDetails(a, b) {
    if (a.day < b.day) return -1;
    if (a.day > b.day) return 1;
    if (a.day == b.day) {
      if (a.startTime < b.startTime) return -1;
      if (a.startTime > b.startTime) return 1;
    }
    return 0;
  }

  function formatHour(date) {
    const dateFormat = new Date(date);
    return (
      ("0" + dateFormat.getHours()).slice(-2) +
      "h" +
      ("0" + dateFormat.getMinutes()).slice(-2)
    );
  }

  function SimpleDialog(props) {
    const fun = props.fun;
    const old = props.old || "";
    const setOpen = props.setOpen;
    const open = props.open;
    const [texto, setTexto] = useState(old);
    let novo = "";

    return (
      <Dialog.Container visible={open}>
        <Dialog.Title>Alterar</Dialog.Title>
        <Dialog.Description></Dialog.Description>
        <Dialog.Input value={texto} onChangeText={setTexto}></Dialog.Input>
        <Dialog.Button label="Cancel" onPress={() => setOpen(false)} />
        <Dialog.Button
          label="Ok"
          onPress={() => {
            fun(texto);
            setOpen(false);
          }}
        />
      </Dialog.Container>
    );
  }

 

  function NotificationDialog() {
    const [n, setN] = useState(1);
    const [mult, setMult] = useState(1);
    const multList = [1, 60, 60 * 24];
    return (
      <Dialog.Container visible={openNotificationDialog}>
        <Dialog.Title>Quando Notificar?</Dialog.Title>
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <Roleta n={90} fun={setN} />
          <Roleta
            list={["minutos antes", "horas antes", "dias antes"]}
            width={100}
            fun={setMult}
          />
        </View>
        <Dialog.Button
          label="Cancel"
          onPress={() => setOpenNotificationDialog(false)}
        />
        <Dialog.Button
          label="Ok"
          onPress={() => {
            setNotifications([...notifications, n * multList[mult]]);
            setOpenNotificationDialog(false);
          }}
        />
      </Dialog.Container>
    );
  }

  function HorarioDialog(props) {
    const week = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
    const [showPicker, setShowPicker] = useState(false);
    const [showEndPicker, setShowEndPicker] = useState(false);

    const [date, setDate] = useState(new Date());
    const [day, setDay] = useState((new Date()).getDay());
    const [endTime, setEndTime] = useState(new Date());
    const [text, setText] = useState("");
    

    function Bolinha(props) {
      const cor = props.index == day ? "red" : "gray";
      return (
        <TouchableOpacity
          style={{
            width: 30,
            height: 30,
            margin: 3,
            backgroundColor: cor,
            borderRadius: 100,
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => setDay(props.index)}
        >
          <Text style={{ color: BWFont(cor) }}>{props.text}</Text>
        </TouchableOpacity>
      );
    }
    return (
      <Dialog.Container visible={openHorarioDialog}>
        <Dialog.Title>Quando e onde será o evento?</Dialog.Title>

        {props.weekly && (
          <>
            <View
              style={{
                flexDirection: "row",
                height: 30,
                margin: 5,
                marginBottom: 20,
              }}
            >
              {week.map((item, idx) => {
                return <Bolinha index={idx} text={item} key={idx} />;
              })}
            </View>
            <TouchableOpacity
              style={{ ...styles.dateAndDatepicker, margin: 10 }}
              onPress={() => setShowPicker(true)}
            >
              <Calendar style={styles.calendar} />
              <Text style={styles.data}>
                Horario inicial: {formatHour(date)}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ ...styles.dateAndDatepicker, margin: 10 }}
              onPress={() => setShowEndPicker(true)}
            >
              <Calendar style={styles.calendar} />
              <Text style={styles.data}>
                Hora final:{" " + formatHour(endTime)}
              </Text>
            </TouchableOpacity>
            <DateTimePickerModal
              style={{ width: "100%" }}
              textColor={"#000"}
              isVisible={showPicker}
              mode={"time"}
              value={new Date()}
              date={new Date()}
              onCancel={() => {
                setShowPicker(false);
              }}
              onHide={() => {
                setShowPicker(false);
              }}
              onConfirm={(date) => {
                setShowPicker(false);
                setDate(date);
                if (minimum(date) > endTime.getTime()) {
                  setEndTime(date);
                }
              }}
              cancelTextIOS={"Cancelar"}
              confirmTextIOS={"Confirmar"}
              headerTextIOS={"Escolha uma data"}
            />
            <DateTimePickerModal
              style={{ width: "100%" }}
              textColor={"#000"}
              isVisible={showEndPicker}
              mode={"time"}
              onCancel={() => {
                setShowEndPicker(false);
              }}
              onHide={() => {
                setShowEndPicker(false);
              }}
              onConfirm={(ndate) => {
                setShowEndPicker(false);
                setEndTime(
                  ndate.getTime() < minimum(date) ? minimum(date) : ndate
                );
              }}
              cancelTextIOS={"Cancelar"}
              confirmTextIOS={"Confirmar"}
              headerTextIOS={"Escolha uma hora"}
            />
          </>
        )}
        {!props.weekly && (
          <>
            <TouchableOpacity
              style={{ ...styles.dateAndDatepicker, margin: 10 }}
              onPress={() => setShowPicker(true)}
            >
              <Calendar style={styles.calendar} />
              <Text style={styles.data}>
                Inicio: {formatDateWithHour(date)}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ ...styles.dateAndDatepicker, margin: 10 }}
              onPress={() => setShowEndPicker(true)}
            >
              <Calendar style={styles.calendar} />
              <Text style={styles.data}>
                Hora final:{" " + formatHour(endTime)}
              </Text>
            </TouchableOpacity>
            <DateTimePickerModal
              style={{ width: "100%" }}
              textColor={"#000"}
              isVisible={showPicker}
              mode={"datetime"}
              value={new Date()}
              date={new Date()}
              onCancel={() => {
                setShowPicker(false);
              }}
              onHide={() => {
                setShowPicker(false);
              }}
              onConfirm={(date) => {
                setShowPicker(false);
                setDate(date);
                if (minimum(date) > endTime.getTime()) {
                  setEndTime(date);
                }
              }}
              cancelTextIOS={"Cancelar"}
              confirmTextIOS={"Confirmar"}
              headerTextIOS={"Escolha uma data"}
            />
            <DateTimePickerModal
              style={{ width: "100%" }}
              textColor={"#000"}
              isVisible={showEndPicker}
              mode={"time"}
              onCancel={() => {
                setShowEndPicker(false);
              }}
              onHide={() => {
                setShowEndPicker(false);
              }}
              onConfirm={(ndate) => {
                setShowEndPicker(false);
                setEndTime(
                  ndate.getTime() < minimum(date) ? minimum(date) : ndate
                );
              }}
              cancelTextIOS={"Cancelar"}
              confirmTextIOS={"Confirmar"}
              headerTextIOS={"Escolha uma hora"}
            />
          </>
        )}

        <Dialog.Button
          label="Cancel"
          onPress={() => {
            setOpenHorarioDialog(false);
          }}
        />
        <Dialog.Button
          label="Ok"
          onPress={() => {
            let detail = {
              day: weekly ? day : new Date(date).getDay(),
              datetime_init: date.toUTCString(),
              datetime_end: endTime.toUTCString(),
              local: text,
            };
            setDetails([...details, detail]);
            setOpenHorarioDialog(false);
          }}
        />
        <Dialog.Input
          label={"Local"}
          onChangeText={setText}
          accessibilityHint={"local"}
        ></Dialog.Input>
      </Dialog.Container>
    );
  }

  const range = (n) => [...Array(n + 1).keys()];

  function Roleta(props) {
    const list = props.list || range(props.n || 60);
    const width = props.width || props.size || 60;
    const height = props.height || props.size || 60;
    const defun = () => {};
    const fun = props.fun || defun;
    let p;
    return (
      <View style={{ height: height * 3, width: width }}>
        <ScrollPicker
          ref={(sp) => {
            p = sp;
          }}
          dataSource={list}
          selectedIndex={1}
          onValueChange={(data, selectedIndex) => {
            fun(selectedIndex);
          }}
          wrapperHeight={height * 3}
          wrapperBackground={"#FFFFFF"}
          itemHeight={height}
          highlightColor={"#d8d8d8"}
          highlightBorderWidth={2}
          activeItemColor={"#222121"}
          itemColor={"#B4B4B4"}
        />
      </View>
    );
  }

  let resultMean = "";
  let resultFreq = "";

  try {
    const meanRes = magic(grade.mean || {}, mean || "");
    resultMean = "" + (meanRes.result || 0);
  } catch (e) {}

  try {
    const freqRes = magic(grade.frequency || {}, frequency || "");
    resultFreq = "" + (freqRes.result || 0);
  } catch (e) {}

  const user = useSelector(state => state.user).user

  function DetailRender(props){
    const index = props.index
    const detail = props.detail
    return (
      <View key={index} style={{marginHorizontal: 20,marginTop: 20, backgroundColor: colors.surface, borderRadius: 10, padding: 10, flexDirection: 'row'}}>
        <View style={{justifyContent:'center'}}>
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start'}}>
        <Feather name="repeat" size={18} color={colors.onSurface} style={{paddingRight: 8}}/>
          <Text style={{color:colors.onSurface}}>{`${
            weekly
              ? week[detail.day]
              : formatDateWithHour(detail.datetime_init)
          }, `} {`${formatHour(detail.datetime_init)} - ${formatHour(
            detail.datetime_end
          )}`}</Text>
        </View>
        {detail.local.length > 0 &&(
        <TouchableOpacity 
        onPress={async () => {
          let place = user.campus + ", UFSCAR, " + detail.local;

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
        
        style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', paddingTop: 5}}>
        <MaterialIcons name="location-pin" size={20} color={colors.primary} style={{paddingRight: 8}}/>
          <Text style={{color:colors.primary}}>{ `${detail.local}`}</Text>
          
        
        </TouchableOpacity>)}
      </View>
      <View style={{alignItems: 'flex-end', justifyContent:'center', flex:1}}>
      
        {editMode && (
          <IconButton
            icon="minus-circle-outline"
            color={colors.onSurface}
            onPress={() => {
              let newDetails = details.filter((d) => d != detail);
              setDetails([...newDetails]);
            }}
            size={18}
          />
        )}
      </View>
      </View>
    )
  }

  
  function BotaoAdicionarQueAbreUmDialogo(props){
    const setState = props.setState
    return(
      <View style={{flexDirection: 'row'}}>
        <View style={{flex:1}}/>
            <TouchableOpacity
              onPress={() => {
                setState(true);
              }}
              style={{marginTop: 20,flexDirection: 'row', alignItems:'center', justifyContent:'center',backgroundColor: colors.surface, borderRadius: 10, padding: 10, borderWidth: 1, borderColor: colors.outline}}
            >
              <Feather name="plus" size={24} color={colors.primary} style={{paddingRight: 10}}/>
              <Text style={{color: colors.onSurface}}>Adicionar</Text>
              
            </TouchableOpacity>
        <View style={{flex:1}}/>

      </View>)
  }

  function notificationText(notification){
    if (notification != 0)
      return getTime(notification) + " antes"
    return "Assim que começar"
  }

  function NotificationRender(props){
    const index = props.index
    const notification = props.notification
    return (
      <View key={index} style={{marginHorizontal: 20,marginTop: 20, backgroundColor: colors.surface, borderRadius: 10, padding: 10,paddingVertical:5, flexDirection: 'row'}}>
        <View>
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', flex: 1}}>
        <Feather name="repeat" size={18} color={colors.onSurface} style={{paddingRight: 8}}/>
          <Text style={{color:colors.onSurface}}>{`${notificationText(notification)}`}</Text>
        </View>
    
      </View>
      <View style={{alignItems: 'flex-end', justifyContent:'center', flex:1}}>
      
        {editMode && (
          <IconButton
            icon="minus-circle-outline"
            color={colors.onSurface}
            onPress={() => {
              let newNotifications = notifications.filter(
                (e) => e != notification
              );
              setNotifications([...newNotifications]);
            }}
            size={18}
          />
        )}
      </View>
      </View>
    )
  }

  function TeacherRender(props){
    const index = props.index
    const teacher = props.teacher
    return (
      <View key={index} style={{marginHorizontal: 20,marginTop: 20, backgroundColor: colors.surface, borderRadius: 10, padding: 10, paddingVertical:5, flexDirection: 'row'}}>
        <View style ={{alignItems: 'center', justifyContent:'center'}}>
        
          <Text style={{color:colors.onSurface}}>{`${teacher}`}</Text>
      </View>
      <View style={{alignItems: 'flex-end', justifyContent:'center', flex:1}}>
      
        {editMode && (
          <IconButton
            icon="minus-circle-outline"
            color={colors.onSurface}
            onPress={() => {
              let newTeachers = teachers.filter((d) => d != teacher);
              setTeachers([...newTeachers]);
            }}
            size={18}
          />
        )}
      </View>
      </View>
    )
  }


  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.surface1,
    },
  
    sectionContainer: {
      flexDirection: "row",
      padding: 15,
      borderBottomWidth: 1,
      borderBottomColor: "#ddd",
      alignItems: 'center',
      justifyContent: 'center',
    },
    colorContainer: {
      flexDirection: "row",
      justifyContent: 'flex-start',
      alignItems: 'center',
      marginLeft: 18
    },
    sectionIcon: {
      margin: 10,
    },
    title:{
      fontSize: 20,
      color: colors.onSurface
    },
  
    details: {
      flex: 1,
    },
  
    xButton: {
      marginLeft: "auto",
    },
  
    detail: {
      marginBottom: 20,
    },
  
    reminder: {
      flex: 1,
    },
  
    data: {
      textAlignVertical: "center",
      color: "white",
    },
    notification: {
      marginBottom: 20,
      flexDirection: "row",
      height: 40,
      alignContent: "center",
      alignItems: "center",
    },
  
    description: {
      flex: 1,
      flexDirection: "row",
    },
    textInput: {
      marginHorizontal: 20,
      marginVertical: 5,
      borderRadius: 12,
      borderBottomWidth:0,
      padding: 10,
      backgroundColor: colors.surface,
      color: colors.onSurface,
    },
    actionButton: {
      backgroundColor: "#e8243c",
      borderRadius: 10,
      width: 200,
    },
    spacingDate: {
      marginTop: 10,
      marginBottom: 10,
    },
  
    dateAndDatepicker: {
      flexDirection: "row",
      textAlignVertical: "center",
      backgroundColor: "#e8243c",
      padding: 8,
      borderRadius: 10,
    },
  
    rbutton:{
      padding: 10,
      borderWidth: 1,
      borderRadius: 10,
      marginLeft: 10,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.surface,
      borderColor: colors.outline
  
    },
    rbuttonAct:{
      marginLeft: 10,
      padding: 10,
      backgroundColor: colors.secondaryContainer,
      borderRadius: 10,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
  
    },
  
    deleteButton: {
      margin: 20,
      width: "50%",
      alignSelf: "center",
    },
    calendar: {
      color: "black",
      flex: 1,
      marginRight: 10,
    },
    actionButtonLabel: {
      color: "white",
    },
    tituloDetail:{
      color: colors.onSurface,
      fontSize:16,
      fontWeight: 'bold',
      marginBottom: 5
    },
    medfreqcontainer:{
      paddingRight: 30
    },
    corpoDetail:{
      color: colors.onSurfaceVariant,
      fontSize: 14,
    },
    turmaDetail:{
      color: colors.primary
    },
    corDetail: {
      height: 20,
      marginRight:5,
      borderRadius: 5,
      aspectRatio: 1,
    },
    deleteButton:{
      marginTop: 30,
      backgroundColor: colors.surface,
      padding:10,
      borderRadius: 100,
      borderColor: colors.outline,
      borderWidth: 1
    },
    iconDetail:{
      marginRight: 2,
      height: 24,
      width:24,
      
    },
    deleteFont:{
      color: colors.error
    },
    linecenter:{
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center'
    },
    cortainer:{
      margin:10,
      marginLeft: 20,
      
    },
    linhaEsquerdaDetail:{
      flexDirection:'row',
      alignItems: 'center'
    },
    containerSectionDetail:{
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
    nomeEventoDetail:{
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
    containername:{
      paddingLeft: 20,

    },
    textoBotaoDetail:{

    }
  
  
  })
  const [showMenu, setShowMenu] = useState(false);
  const openMenu = () => setShowMenu(true);

  const closeMenu = () => setShowMenu(false);
  
  const events = useSelector((state) => state.events).events;

  const materias = events.filter(event => event.is_subject === true);
    if(!editMode){
            return (<ScrollView style={styles.container}  
              contentContainerStyle={styles.container}          
              >
              <View style={styles.cortainer}>
              <View style={styles.linhaEsquerdaDetail}>
              <Gradient style={styles.corDetail} color={color}/>

              {turma.length > 0 &&(<Text style={styles.turmaDetail}>{`${turma}`}</Text>)}
              {turma.length === 0 &&(<Text style={styles.nomeEventoDetail}>{`${name}`}</Text>)}
              </View>
              </View>
              {
              turma.length > 0 && (<Text style={{...styles.nomeEventoDetail, ...styles.containername}}>{`${name}`}</Text>)}
              {description.length > 0 &&(
              <View style={styles.containerSectionDetail}>
              <Text style={styles.tituloDetail}>Descrição</Text>
              <Text style={styles.corpoDetail}>{description}</Text>
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
              <View style={styles.linhaEsquerdaDetail}>
              <TouchableOpacity style={styles.botaoDetail}  onPress={() =>
                navigation.navigate("Subject", {
                  task: {
                    ...task,
                    grade: grade,
                    frequency: frequency,
                    mean: mean,
                  },
                })}>
              <Text>Editar cálculo de média</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.botaoDetail}  onPress={() =>
                navigation.navigate("Subject", {
                  task: {
                    ...task,
                    grade: grade,
                    frequency: frequency,
                    mean: mean,
                  },
                })}>
              <Text>Editar cálculo de frequência</Text>
              </TouchableOpacity>
              </View>
              </View>
              {isSubject && teachers.length > 0 &&(<View style={styles.containerSectionDetail}>
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
              (<Text style={styles.corpoDetail} key={index}>{`${
                  weekly
                    ? week[detail.day] + " " + `${formatHour(detail.datetime_init)}`
                    : formatDateWithHour(detail.datetime_init)
                }`} {` - ${formatHour(
                  detail.datetime_end
                )}`}</Text>))
              }
              </View>
              {
              notifications.length > 0 &&(<View style={styles.containerSectionDetail}>
              <View style={styles.linhaEsquerdaDetail}>
              <View style={styles.iconDetail}> 

              <MaterialCommunityIcons name="bell" style={styles.iconDetail} size={24} color={colors.onSurfaceVariant} />
              </View>
              <Text style={styles.tituloDetail}>Notificações</Text>
              </View>
              { notifications.map((notification, index) => (
              <Text style={styles.corpoDetail} key={index}>{notificationText(notification)}</Text>))
              }
              </View>)
              }
              <View style={styles.linecenter}>
                <TouchableOpacity style={styles.deleteButton} onPress={() => {
              dispatch(removeEvent(task));
              navigation.pop();
            }}>
                  <View style={styles.linhaEsquerdaDetail}>
                    <MaterialCommunityIcons name="trash-can" style={styles.iconDetail} size={24} color={colors.error} />
                    <Text style={styles.deleteFont}>Excluir</Text>
                  </View>  
                </TouchableOpacity>
              </View>

              <FAB
                style={styles.fab}
                color={colors.primary}
                icon="pencil"
                onPress={() =>setEditMode(true)}
              />
      </ScrollView>)
    }

  
  return (
    <ScrollView style={styles.container}>
      
      {editMode && (<><View style={styles.colorContainer}>
        <View style={styles.sectionIcon}>
        <Ionicons name="color-palette" size={24} color={colors.onSurface} />
        </View>
        <View style={styles.description}>
          <Text style={styles.title}>Cor</Text>
        </View>
      </View>
      <View style={styles.colorContainer}>
      
      <SelGradSquare color={0} state={color} setState={setColor}/>
        <SelGradSquare color={1} state={color} setState={setColor}/>
        <SelGradSquare color={2} state={color} setState={setColor}/>
        <SelGradSquare color={3} state={color} setState={setColor}/>
        <SelGradSquare color={4} state={color} setState={setColor}/>
        <SelGradSquare color={5} state={color} setState={setColor}/>
        <SelGradSquare color={6} state={color} setState={setColor}/>
        <SelGradSquare color={7} state={color} setState={setColor}/>

      </View>
      <View style={styles.colorContainer}>
        <SelGradSquare color={8} state={color} setState={setColor}/>
        <SelGradSquare color={9} state={color} setState={setColor}/>
        <SelGradSquare color={10} state={color} setState={setColor}/>
        <SelGradSquare color={11} state={color} setState={setColor}/>
        <SelGradSquare color={12} state={color} setState={setColor}/>
        <SelGradSquare color={13} state={color} setState={setColor}/>
        <SelGradSquare color={14} state={color} setState={setColor}/>
        <PickerGradSquare color={isNaN(color)?color:"#f0f"} state={color} setState={setColor}/>
        
      </View>
      </>)
      }


      <View style={styles.colorContainer}>
          <View style={styles.sectionIcon}>
          <MaterialIcons name="title" size={24} color={colors.onSurface} />

          </View>
          <View style={styles.description}>
            <Text style={styles.title}>Titulo</Text>
          </View>
      </View>
      <TextInput value={name} multiline={false} style={styles.textInput} inputContainerStyle={styles.textInput} editable={editMode}
      placeholder="Novo Evento ..." underlineColor="transparent" underlineColorAndroid={"transparent"}
      onChangeText={text => setName(text)}
/>


  {isSubject && (<><View style={styles.colorContainer}>
            <View style={styles.sectionIcon}>
            <Ionicons name="school" size={24} color={colors.onSurface} />

            </View>
            <View style={styles.description}>
              <Text style={styles.title}>Turma</Text>
            </View>
        </View>
        <TextInput value={turma} multiline={false} style={styles.textInput} inputContainerStyle={styles.textInput} editable={editMode}
        placeholder="Turma A" underlineColor="transparent" underlineColorAndroid={"transparent"}
        onChangeText={text => setTurma(text)}
  /></>)}



      <View style={styles.colorContainer}>
          <View style={styles.sectionIcon}>
          <Entypo name="text" size={24} color={colors.onSurface} />

          </View>
          <View style={styles.description}>
            <Text style={styles.title}>Descrição</Text>
          </View>
      </View>
      <TextInput value={description} multiline={true} style={styles.textInput} inputContainerStyle={styles.textInput} editable={editMode}
      placeholder="Detalhes do Evento ..." underlineColor="transparent" underlineColorAndroid={"transparent"}
      onChangeText={text => setDescription(text)}
/>
      {isSubject &&
      (<View style={styles.colorContainer}>
          <View style={styles.sectionIcon}>
          <FontAwesome name="user" size={24} color={colors.onSurface} />

          </View>
          <View style={styles.description}>
            <Text style={styles.title}>Professores</Text>
          </View>
      </View>)
      }

      {isSubject && teachers.map((teacher, index) => (<TeacherRender key={index} index={index} teacher={teacher}/>))
      }
      {editMode && isSubject &&(
          <BotaoAdicionarQueAbreUmDialogo setState={setOpenTeacherDialog}/>)}


      
      {!isSubject && (<><View style={styles.colorContainer}>
          <View style={styles.sectionIcon}>
          <MaterialCommunityIcons name="history" size={24} color={colors.onSurface} />

          </View>
          <View style={styles.description}>
            <Text style={styles.title}>Recorrência</Text>
          </View>
      </View>
      <View style={styles.colorContainer}>
        <TouchableOpacity style={weekly?styles.rbutton:styles.rbuttonAct} onPress={()=>setWeekly(false)}>
          {!weekly && (<Feather name="check" size={16} color={ !weekly? colors.onSecondaryContainer: colors.onSurface} />)}
          <Text style={{color: !weekly? colors.onSecondaryContainer: colors.onSurface}}>Evento único</Text></TouchableOpacity>
        <TouchableOpacity style={!weekly?styles.rbutton:styles.rbuttonAct} onPress={()=>setWeekly(true)}>
          {weekly && (<Feather name="check" size={16} color={ weekly? colors.onSecondaryContainer: colors.onSurface} />)}  
          <Text style={{color: weekly? colors.onSecondaryContainer: colors.onSurface}}>Evento recorrente</Text></TouchableOpacity>

      </View></>)}
      <View style={styles.colorContainer}>
          <View style={styles.sectionIcon}>
          <MaterialCommunityIcons name="clock" size={24} color={colors.onSurface} />

          </View>
          <View style={styles.description}>
            <Text style={styles.title}>Horários</Text>
          </View>
      </View>

      {details.sort(sortDetails).map((detail, index) => (<DetailRender key={index} index={index} detail={detail}/>))}
      {editMode && (
          <BotaoAdicionarQueAbreUmDialogo setState={setOpenHorarioDialog}/>)}


      
      {!isSubject && (<>
        <View style={styles.colorContainer}>
          <View style={styles.sectionIcon}>
          <MaterialCommunityIcons name="book" size={24} color={colors.onSurface} />

          </View>
          <View style={styles.description}>
            <Text style={styles.title}>Pertence a uma matéria?</Text>
          </View>
      </View>
      <Menu
          visible={showMenu}
          onDismiss={closeMenu}
          style={{width:'100%'} }
          anchor={<TouchableOpacity onPress={openMenu}><Text style={styles.textInput} >{materias.filter(event=> event.id == subject)[0]?.name||"Nenhuma matéria"}</Text></TouchableOpacity>}>
          <Menu.Item onPress={() => {setSubject(null); setShowMenu(false)}} title="Nenhuma matéria" />
          {materias.map((materia, index) => (<Menu.Item key={index} onPress={() => {setSubject(materia.id);setShowMenu(false)}} title={materia.name} />
            ))}
        </Menu>
        
        </>)}
      {!isSubject && (<><View style={styles.colorContainer}>
          <View style={styles.sectionIcon}>
          <MaterialCommunityIcons name="message-question-outline" size={24} color={colors.onSurface} />

          </View>
          <View style={styles.description}>
            <Text style={styles.title}>Tem data de entrega?</Text>
          </View>
      </View>
      <View style={styles.colorContainer}>
        <TouchableOpacity style={whenSubmit==null?styles.rbutton:styles.rbuttonAct} onPress={()=>setOpenWhenDialog(true)}>
          {whenSubmit!=null && (<Feather name="check" size={16} color={ !weekly? colors.onSecondaryContainer: colors.onSurface} />)}
          {whenSubmit==null && (<Text style={{color: colors.onSurface}}>Sim</Text>)}
          {whenSubmit!=null && (<Text style={{color: colors.onSecondaryContainer}}>{formatDateWithHour(new Date(whenSubmit))}</Text>)}
          
          </TouchableOpacity>
          <TouchableOpacity style={whenSubmit!=null?styles.rbutton:styles.rbuttonAct} onPress={()=>setWhenSubmit(null)}>
          {whenSubmit==null && (<Feather name="check" size={16} color={ !weekly? colors.onSecondaryContainer: colors.onSurface} />)}
          <Text style={{color:whenSubmit!=null? colors.onSurface : colors.onSecondaryContainer}}>Não</Text>
          
          </TouchableOpacity>
      </View></>)}
      <DateTimePickerModal
              style={{ width: "100%" }}
              textColor={"#000"}
              isVisible={openWhenDialog}
              mode={"datetime"}
              onCancel={() => {
                setOpenWhenDialog(false);
              }}
              onHide={() => {
                setOpenWhenDialog(false);
              }}
              onConfirm={(ndate) => {
                setOpenWhenDialog(false);
                setWhenSubmit(ndate.toString());
              }}
              cancelTextIOS={"Cancelar"}
              confirmTextIOS={"Confirmar"}
              headerTextIOS={"Escolha uma data/hora"}
            />
        {(whenSubmit != null || isSubject) && (<>
        <View style={styles.colorContainer}>
          <View style={styles.sectionIcon}>
          <MaterialCommunityIcons name="file-check" size={24} color={colors.onSurface} />

          </View>
          <View style={styles.description}>
            {!isSubject && (<Text style={styles.title}>já foi entregue?</Text>)}
            {isSubject && (<Text style={styles.title}>já foi finalizada?</Text>)}
          </View>
        </View>
        
        <View style={styles.colorContainer}>
        <TouchableOpacity style={!isSubmited?styles.rbutton:styles.rbuttonAct} onPress={()=>setIsSubmited(true)}>
          {isSubmited && (<Feather name="check" size={16} color={ !weekly? colors.onSecondaryContainer: colors.onSurface} />)}
          <Text style={{color: whenSubmit!=null? colors.onSurface : colors.onSecondaryContainer}}>Sim</Text>
          
          </TouchableOpacity>
          <TouchableOpacity style={isSubmited?styles.rbutton:styles.rbuttonAct} onPress={()=>setIsSubmited(false)}>
          {!isSubmited && (<Feather name="check" size={16} color={ !weekly? colors.onSecondaryContainer: colors.onSurface} />)}
          <Text style={{color:whenSubmit!=null? colors.onSurface : colors.onSecondaryContainer}}>Não</Text>
          
          </TouchableOpacity>
      </View></>)}
        <View style={styles.colorContainer}>
          <View style={styles.sectionIcon}>
          <MaterialCommunityIcons name="bell" size={24} color={colors.onSurface} />

          </View>
          <View style={styles.description}>
            <Text style={styles.title}>Notificações</Text>
          </View>
      </View>
      { notifications.map((notification, index) => (<NotificationRender key={index} index={index} notification={notification}/>))}
      {editMode && (<BotaoAdicionarQueAbreUmDialogo setState={setOpenNotificationDialog}/>)}



      <HorarioDialog weekly={weekly} />
      <NotificationDialog />
      <SimpleDialog
        fun={setName}
        old={name}
        open={openNameDialog}
        setOpen={setOpenNameDialog}
        />
      <SimpleDialog
        fun={setDescription}
        old={description}
        open={openDescriptionDialog}
        setOpen={setOpenDescriptionDialog}
      />

      <SimpleDialog
        fun={(novoProf) => setTeachers([...teachers,novoProf])}
        open={openTeacherDialog}
        setOpen={setOpenTeacherDialog}
      />
      
      <SimpleDialog
        fun={setSubject}
        old={subject}
        open={openSubjectDialog}
        setOpen={setOpenSubjectDialog}
      />

      
    </ScrollView>
  );
}

