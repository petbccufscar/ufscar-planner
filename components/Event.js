import React, { useEffect, useState } from "react";
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Alert,
  StyleSheet,
  LayoutAnimation,
  TextInput,
  CheckBox
} from "react-native";
import { useSelector, useDispatch } from 'react-redux';
import { updateEvent } from '../redux/actions/eventActions'
import Dialog from "react-native-dialog";
import { ColorPicker, fromHsv } from 'react-native-color-picker'
import { Button, IconButton } from "react-native-paper";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


import ScrollPicker from 'react-native-picker-scrollview';

export default function Event({ route, navigation }) {
  const originalTask = route.params.task;
  let task = { ...originalTask }
  task = useSelector(state => state.events).events.find(e => e.id == task.id)

  //boleano
  const [isSubject, setIsSubject] = useState(task.is_subject);
  const [weekly, setWeekly] = useState(task.weekly);

  //todo
  const [subject, setSubject] = useState(task.subject);
  const [color, setColor] = useState(task.color);


  // tela separada
  const [grade, setGrade] = useState(task.grade);
  const [frequency, setFrequency] = useState(task.frequency);
  const [mean, setMean] = useState(task.mean);

  const [name, setName] = useState(task.name);
  const [editMode, setEditMode] = useState(false);
  const [details, setDetails] = useState(task.details);
  const [notifications, setNotifications] = useState(task.notification);
  const [description, setDescription] = useState(task.description);

  //dialog
  const [openDescriptionDialog, setOpenDescriptionDialog] = useState(false);
  const [openNameDialog, setOpenNameDialog] = useState(false);
  const [openSubjectDialog, setOpenSubjectDialog] = useState(false);
  const [openColorDialog, setOpenColorDialog] = useState(false);
  const [openNotificationDialog, setOpenNotificationDialog] = useState(false);



  const dispatch = useDispatch();

  const week = [
    "Domingo",
    "Segunda",
    "Terça",
    "Quarta",
    "Quinta",
    "Sexta",
    "Sábado",
  ];

  const sendData = () => {
    task = {
      ...task,
      // TODO implementar edição desses atributos
      "name": name,
      "is_subject": isSubject,
      "subject": subject,
      "color": color,
      "grade": grade,
      "details": details,
      "notification": notifications,
      "description": description,
      "mean": mean,
      "frequence": frequency
    }

    dispatch(updateEvent(task));
  }



  useEffect(() => {
    navigation.setOptions({
      headerTitle: name,
      headerTintColor: BWFont(color),
      headerStyle: { backgroundColor: color },
      headerRight: () => (
        <IconButton
          icon={editMode ? "check" : "pencil"}
          size={24}
          color={BWFont(color)}
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
            if (editMode) {
              sendData()
            }
            setEditMode(!editMode);
          }}
        />
      ),
    });
  }, [route.params, editMode, details, frequency, mean, notifications, description, name, color, grade, isSubject, subject]);

  function getTime(totalMinutes) {
    const days = parseInt(totalMinutes / 60 / 24);
    const hours = parseInt((totalMinutes / 60) % 24);
    const minutes = parseInt(totalMinutes % 60);

    const daysLabel =
      days > 0
        ? days + " dia" + (days > 1 ? "s" : "") + (hours || minutes ? ", " : "")
        : "";
    const hoursLabel =
      hours > 0
        ? hours + " hora" + (hours > 1 ? "s" : "") + (minutes ? " e " : "")
        : "";
    const minutesLabel =
      minutes > 0 ? minutes + " minuto" + (minutes > 1 ? "s" : "") : "";

    return `${daysLabel}${hoursLabel}${minutesLabel} antes`;
  }

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
      ":" +
      ("0" + dateFormat.getMinutes()).slice(-2)
    );
  }


  function SimpleDialog(props) {
    const fun = props.fun
    const old = props.old || ""
    const setOpen = props.setOpen
    const open = props.open
    const [texto, setTexto] = useState(old)
    let novo = ""

    return (
      <Dialog.Container visible={open}>
        <Dialog.Title>Alterar</Dialog.Title>
        <Dialog.Description>
        </Dialog.Description>
        <Dialog.Input value={texto} onChangeText={setTexto}>

        </Dialog.Input>
        <Dialog.Button label="Cancel" onPress={() => setOpen(false)} />
        <Dialog.Button label="Ok" onPress={() => {
          fun(texto)
          setOpen(false)
        }} />
      </Dialog.Container>)
  }


  function ColorDialog() {
    let aux = color
    return (
      <Dialog.Container visible={openColorDialog}>
        <Dialog.Title>Alterar</Dialog.Title>
        <Dialog.Description>
        </Dialog.Description>
        <ColorPicker

          onColorChange={color => aux = color}
          defaultColor={aux}
          style={{ width: 300, height: 300 }}
        />
        <Dialog.Button label="Cancel" onPress={() => setOpenColorDialog(false)} />
        <Dialog.Button label="Ok" onPress={() => {
          setColor(fromHsv(aux))
          setOpenColorDialog(false)
        }} />
      </Dialog.Container>)
  }

  function NotificationDialog() {
    const [value, onChange] = useState('10:00');
    return (
      <Dialog.Container visible={openNotificationDialog}>
        <Dialog.Title>Alterar</Dialog.Title>
        <Dialog.Description>
        </Dialog.Description>
        <Roleta />
        <Dialog.Button label="Cancel" onPress={() => setOpenNotificationDialog(false)} />
        <Dialog.Button label="Ok" onPress={() => {
          setOpenNotificationDialog(false)
        }} />
      </Dialog.Container>)
  }

  const range = (n) => [...Array(n + 1).keys()]

  function Roleta(props) {
    const list = range( props.n || 60)
    const size = props.size || 60
    let p
    return (<View style={{ height: size, width: size }}>
      <ScrollPicker
        ref={(sp) => { p = sp }}
        dataSource={list}
        selectedIndex={0}
        onValueChange={(data, selectedIndex) => {
        }}
        wrapperHeight={size}
        wrapperBackground={'#FFFFFF'}
        itemHeight={size}
        highlightColor={'#d8d8d8'}
        highlightBorderWidth={2}
        activeItemColor={'#222121'}
        itemColor={'#B4B4B4'}
      />
    </View>)

  }


  return (
    <ScrollView style={styles.container}>

      <View style={styles.sectionContainer}>
        <View style={styles.sectionIcon}>
          <IconButton icon="tag" color="#007cc1" size={30} />
        </View>
        <View style={styles.description}>
          <Text>Nome: {name}</Text>
        </View>
        {editMode && (
          <IconButton
            style={styles.xButton}
            icon="pencil"
            color="black"
            onPress={() => { if (editMode) setOpenNameDialog(true) }}
            size={18}
          />
        )}
      </View>
      <View style={styles.sectionContainer}>
        <View style={styles.sectionIcon}>
          <IconButton icon="notebook" color="#007cc1" size={30} />
        </View>

        <View style={styles.description}>
          <Text>É matéria </Text>
        </View>
        <CheckBox
          value={isSubject}
          onValueChange={setIsSubject}
          disabled={!editMode}
        />

      </View>
      <View style={styles.sectionContainer}>
        <View style={styles.sectionIcon}>
          <IconButton icon="calendar-refresh" color="#007cc1" size={30} />
        </View>

        <View style={styles.description}>
          <Text>É semanal </Text>
        </View>
        <CheckBox
          value={weekly}
          onValueChange={setWeekly}
          disabled={!editMode}
        />

      </View>
      {!isSubject && (<View style={styles.sectionContainer}>
        <View style={styles.sectionIcon}>
          <IconButton icon="book" color="#007cc1" size={30} />
        </View>

        <View style={styles.description}>
          <Text>Matéria: {subject}</Text>
        </View>
        {editMode && (
          <IconButton
            style={styles.xButton}
            icon="pencil"
            color="black"
            onPress={() => { if (editMode) setOpenSubjectDialog(true) }}
            size={18}
          />
        )}
      </View>)
      }
      <View style={styles.sectionContainer}>
        <View style={styles.sectionIcon}>
          <IconButton icon="square" color={color} size={30} />
        </View>
        <View style={styles.description}>
          <Text>Cor: {color}</Text>
        </View>
        {editMode && (
          <IconButton
            style={styles.xButton}
            icon="pencil"
            color="black"
            onPress={() => { if (editMode) setOpenColorDialog(true) }}
            size={18}
          />
        )}
      </View>
      <View style={styles.sectionContainer}>
        <View style={styles.sectionIcon}>
          <IconButton icon="calendar" color="#007cc1" size={30} />
        </View>
        <View style={styles.details}>
          <Text>Horários: </Text>
          {details.sort(sortDetails).map((detail, index) => (
            <View key={index} style={styles.detail}>
              <View>
                <Text>{`${week[detail.day]}, ${detail.local}`}</Text>
                <Text>{`${formatHour(detail.datetime_init)} - ${formatHour(
                  detail.datetime_end
                )}`}</Text>
              </View>
              {editMode && (
                <IconButton
                  style={styles.xButton}
                  icon="close"
                  color="black"
                  onPress={() => {

                    let newDetails = details.filter((d) => d != detail)
                    setDetails([...newDetails])

                  }}
                  size={18}
                />
              )}
            </View>
          ))}
          {editMode && (
            <View style={styles.action}>
              <Button
                onPress={() => { setOpenNotificationDialog(true) }}
                labelStyle={styles.actionButtonLabel}
                style={styles.actionButton}
              >
                Adicionar horário
              </Button>
            </View>
          )}
        </View>
      </View>
      <NotificationDialog />
      {isSubject && (
        <View style={styles.sectionContainer}>
          <View style={styles.sectionIcon}>
            <IconButton icon="book-open" color="#007cc1" size={30} />
          </View>
          <View style={styles.meanAndFrequency}>
            <Text>Média = {mean}</Text>
            <Text>Frequência = {frequency}</Text>
          </View>
        </View>)}

      <View style={styles.sectionContainer}>
        <View style={styles.sectionIcon}>
          <IconButton icon="bell-ring" color="#007cc1" size={30} />
        </View>
        <View style={styles.reminder}>
          <Text>Notificações: </Text>
          {notifications.map((notification, index) => (
            <View key={index} style={styles.notification}>
              <Text>{getTime(notification)}</Text>
              {editMode && (
                <IconButton
                  style={styles.xButton}
                  icon="close"
                  color="black"
                  onPress={() => {
                    let newNotifications = notifications.filter((e) => e != notification)
                    setNotifications([...newNotifications])
                  }}
                  size={18}
                />
              )}
            </View>
          ))}
          {editMode && (
            <View style={styles.action}>
              <Button
                onPress={() => { se }}
                labelStyle={styles.actionButtonLabel}
                style={styles.actionButton}
              >
                Adicionar lembrete
              </Button>
            </View>
          )}
        </View>
      </View>
      <SimpleDialog fun={setName} old={name} open={openNameDialog} setOpen={setOpenNameDialog} />
      <SimpleDialog fun={setDescription} old={description} open={openDescriptionDialog} setOpen={setOpenDescriptionDialog} />
      <SimpleDialog fun={setSubject} old={subject} open={openSubjectDialog} setOpen={setOpenSubjectDialog} />
      <ColorDialog />
      <View style={styles.sectionContainer}>
        <View style={styles.sectionIcon}>
          <IconButton icon="comment-text" color="#007cc1" size={30} />
        </View>
        <View style={styles.description}>
          <Text>Descrição: {description}</Text>
        </View>
        {editMode && (
          <IconButton
            style={styles.xButton}
            icon="pencil"
            color="black"
            onPress={() => { if (editMode) setOpenDescriptionDialog(true) }}
            size={18}
          />
        )}
      </View>
      {editMode && (
        <View style={styles.action}>
          <Button
            onPress={() => {


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


function BWFont(backgroundColor) {
  let r = 0,
    g = 0,
    b = 0;

  // Converte cor em hex para decimal
  if (backgroundColor.length == 4) {
    r = parseInt(
      "0x" + backgroundColor.substring(1, 2) + backgroundColor.substring(1, 2)
    );
    g = parseInt(
      "0x" + backgroundColor.substring(2, 3) + backgroundColor.substring(2, 3)
    );
    b = parseInt(
      "0x" + backgroundColor.substring(3, 4) + backgroundColor.substring(3, 4)
    );
  }
  if (backgroundColor.length == 7) {
    r = parseInt("0x" + backgroundColor.substring(1, 3));
    g = parseInt("0x" + backgroundColor.substring(3, 5));
    b = parseInt("0x" + backgroundColor.substring(5, 7));
  }

  if (r * 0.299 + g * 0.587 + b * 0.114 > 186) return "#000000";
  else return "#ffffff";
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  sectionContainer: {
    flexDirection: "row",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },

  sectionIcon: {
    marginTop: -10,
  },

  details: {
    flex: 1,
  },

  xButton: {
    marginLeft: "auto",
  },

  detail: {
    marginBottom: 20,
    flexDirection: "row",
  },

  reminder: {
    flex: 1,
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

  actionButton: {
    backgroundColor: "#e8243c",
    borderRadius: 10,
    width: 200,
  },

  deleteButton: {
    margin: 20,
    width: "50%",
    alignSelf: "center",
  },

  actionButtonLabel: {
    color: "white",
  },
});
