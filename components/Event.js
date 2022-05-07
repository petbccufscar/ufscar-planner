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
import { Ionicons, Entypo, MaterialIcons, MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import { useSelector, useDispatch } from "react-redux";
import {
  updateEvent,
  addEvent,
  removeEvent,
} from "../redux/actions/eventActions";
import Dialog from "react-native-dialog";
  
import { Button, IconButton, useTheme } from "react-native-paper";

import Calendar from "../assets/icons/calendar.svg";
import { BWFont, magic, getTime } from "../helpers/ExpressionHelper";
import { formatDateWithHour } from "../helpers/helper";

import DateTimePickerModal from "react-native-modal-datetime-picker";

import ScrollPicker from "react-native-picker-scrollview";
import { PickerGradSquare, SelGradSquare } from "./Gradient";
export default function Event({ route, navigation }) {
  let task = { ...route.params.task };
  //boleano
  const [isSubject, setIsSubject] = useState(task.is_subject);
  const [weekly, setWeekly] = useState(task.weekly);
  const [isSubmited, setIsSubmited] = useState(task.is_submited);

  //todo
  const [subject, setSubject] = useState(task.subject);
  const [color, setColor] = useState(task.color);
  const [turma, setTurma] = useState(task.turma);
  const [teachers, setTeachers] = useState(task.teachers);



  // tela separada
  const [grade, setGrade] = useState(task.grade);
  const [frequency, setFrequency] = useState(task.frequency || "(aulasDadas - faltas)/aulasDadas");
  const [mean, setMean] = useState(task.mean || "(p1+p2+p3)/3");

  const [name, setName] = useState(task.name);
  const firstTime = task.id == null || task.id == undefined;
  const [editMode, setEditMode] = useState(firstTime);
  const [details, setDetails] = useState(task.details);
  const [notifications, setNotifications] = useState(task.notification);
  const [description, setDescription] = useState(task.description);

  //dialog
  const [openDescriptionDialog, setOpenDescriptionDialog] = useState(false);
  const [openNameDialog, setOpenNameDialog] = useState(false);
  const [openSubjectDialog, setOpenSubjectDialog] = useState(false);
  const [openNotificationDialog, setOpenNotificationDialog] = useState(false);
  const [openHorarioDialog, setOpenHorarioDialog] = useState(false);

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
    };
    if (task.id != undefined && task.id != null) {
      dispatch(updateEvent(task));
    } else {
      dispatch(addEvent(task));
    }
  };

  useEffect(() => {
    navigation.setOptions({
      headerTitle: name,
      // headerTintColor: BWFont(color),
      // headerStyle: { backgroundColor: color },
      headerRight: () => (
        <IconButton
          icon={editMode ? "check" : "pencil"}
          size={24}
          // color={BWFont(color)}
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
        />
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
    const [day, setDay] = useState(0);
    const [endTime, setEndTime] = useState(new Date());
    const [text, setText] = useState("local X");
    const minimum = (date) => {
      const td = new Date();
      return new Date(
        td.getFullYear(),
        td.getMonth(),
        td.getDate(),
        date.getHours(),
        date.getMinutes()
      );
    };

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
    resultMean = " = " + (meanRes.result || 0);
  } catch (e) {}

  try {
    const freqRes = magic(grade.frequency || {}, frequency || "");
    resultFreq = " = " + (freqRes.result || 0);
  } catch (e) {}

  const user = useSelector(state => state.user).user

  function DetailRender(props){
    const index = props.index
    const detail = props.detail
    return (
      <View key={index} style={{marginHorizontal: 20,marginTop: 20, backgroundColor: colors.surface, borderRadius: 10, padding: 10, flexDirection: 'row'}}>
        <View>
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
          
        
        </TouchableOpacity>
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
    },})
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
      <View style={styles.colorContainer}>
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

      </View>
      {details.sort(sortDetails).map((detail, index) => (<DetailRender key={index} index={index} detail={detail}/>))}
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
        fun={setSubject}
        old={subject}
        open={openSubjectDialog}
        setOpen={setOpenSubjectDialog}
      />
      {editMode && (
        <View style={{flexDirection: 'row'}}>
          <View style={{flex:1}}/>
              <TouchableOpacity
                onPress={() => {
                  setOpenHorarioDialog(true);
                }}
                style={{marginTop: 20,flexDirection: 'row', alignItems:'center', justifyContent:'center',backgroundColor: colors.surface, borderRadius: 10, padding: 10, borderWidth: 1, borderColor: colors.outline}}
              >
                <Feather name="plus" size={24} color={colors.primary} style={{paddingRight: 10}}/>
                <Text style={{color: colors.onSurface}}>Adicionar</Text>
                
              </TouchableOpacity>
          <View style={{flex:1}}/>

        </View>
          )}


      {editMode && !firstTime && (
        <View style={styles.action}>
          <Button
            onPress={() => {
              dispatch(removeEvent(task));
              navigation.pop(1);
            }}
            labelStyle={styles.actionButtonLabel}
            style={[styles.actionButton, styles.deleteButton]}
          >
            Deletar Evento
          </Button>
        </View>
      )}
      
    </ScrollView>
  );
}

