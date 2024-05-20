import {
  Entypo,
  Feather,
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  Linking,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { ScrollView as DefaultScrollView } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {
  IconButton,
  Menu,
  useTheme,
  Portal,
  Button,
  Dialog,
} from "react-native-paper";
// TODO ARRUMAR O SCROLLPICKER
// import ScrollPicker from "react-native-picker-scrollview";
import Toast from "react-native-toast-message";
import { useDispatch, useSelector } from "react-redux";
import { getTime } from "../helpers/ExpressionHelper";
import { formatDate, formatDateWithHour, minimum } from "../helpers/helper";
import { addEvent, updateEvent } from "../redux/actions/eventActions";
import { PickerGradSquare, SelGradSquare } from "../components/Gradient";
import ScrollView from "../components/ScrollView";

export default function EditScreen({ route, navigation }) {
  let task = { ...route.params.task };
  //boleano
  const [isSubject] = useState(task.is_subject || false);
  const [weekly, setWeekly] = useState(task.weekly || false);
  const [isSubmited, setIsSubmited] = useState(task.is_submited || false);
  
  //todo
  const [subject, setSubject] = useState(task.subject || null);
  const [color, setColor] = useState(task.color || 0);
  const [turma, setTurma] = useState(task.turma || "");
  const [teachers, setTeachers] = useState(task.teachers || []);
  const [whenSubmit, setWhenSubmit] = useState(task.when_submit || null);

  // tela separada
  const [grade] = useState(task.grade || {});
  const [frequency] = useState(
    task.frequency || "(aulasDadas - faltas)/aulasDadas",
  );
  const [mean] = useState(task.mean || "(p1+p2+p3)/3");

  const [name, setName] = useState(task.name || "");
  const [details, setDetails] = useState(task.details);
  const [notifications, setNotifications] = useState(task.notification);
  const [description, setDescription] = useState(task.description);

  //dialog
  const [openTeacherDialog, setOpenTeacherDialog] = useState(false);
  const [openNotificationDialog, setOpenNotificationDialog] = useState(false);
  const [openHorarioDialog, setOpenHorarioDialog] = useState(false);
  const [openWhenDialog, setOpenWhenDialog] = useState(false);

  const [sendingData, setSendingData] = useState(false);
  const [detail, setDetail] = useState({
    horarioDate: new Date(),
    horarioDay: [new Date().getDay()],
    horarioEndTime: new Date(),
    horarioLocal: "",
    id: 0,
  });

  useEffect(() => {
    if (sendingData) {
      sendData();
      navigation.pop();
    }
  }, [sendingData]);

  const colors = useTheme().colors;

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
      teachers: teachers,
      turma: turma,
      is_submited: isSubmited,
      when_submit: whenSubmit,
    };
    if (name.length > 0) {
      if (task.id != undefined && task.id != null) {
        dispatch(updateEvent(task));
      } else {
        dispatch(addEvent(task));
      }
    }
  };
  useEffect(() => {
    navigation.setOptions({
      headerTintColor: colors.onHeaderInactive,
      headerTitle: isSubject ? "Editar Matéria" : "Editar Evento",

      headerRight: () =>
        <TouchableOpacity
          style={{
            backgroundColor: colors.primaryContainer,
            padding: 10,
            borderRadius: 30,
            justifyContent: "center",
            alignItems: "center",
            marginRight: 10,
          }}
          onPress={() => {
            if (details.length == 0 && !isSubject) {
              Toast.show({
                type: "error",
                text1: "Você deve colocar ao menos um horário",
              });
            } else {
              if (name.length == 0 && !isSubject) {
                Toast.show({
                  type: "error",
                  text1: "Você deve colocar um nome no evento",
                });
              } else if (isSubject && (name.length == 0 || turma.length == 0)) {
                Toast.show({
                  type: "error",
                  text2: "Você deve colocar um nome e uma turma",
                });
              } else {
                setSendingData(true);
              }
            }
          }}
        >
          <Text style={{ color: colors.onPrimaryContainer }}>Salvar</Text>
        </TouchableOpacity>
      ,
    });
  }, [
    route.params,
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
    whenSubmit,
  ]);

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

  function TeacherDialog(props) {
    const fun = props.fun;
    const old = props.old || "";
    const setOpen = props.setOpen;
    const open = props.open;
    const [texto, setTexto] = useState(old);

    return (
      <Portal>
        <Dialog
          style={styles.dialog}
          visible={open}
          onDismis={() => setOpen(false)}
        >
          <Dialog.Title style={{ color: colors.onSurfaceVariant }}>
            Alterar
          </Dialog.Title>
          <Dialog.Content>
            <TextInput style={styles.input} onChangeText={setTexto}></TextInput>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setOpen(false)}>Cancelar</Button>
            <Button
              onPress={() => {
                if (texto.length > 0) {
                  fun(texto);
                  setOpen(false);
                }
              }}
            >
              Ok
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    );
  }

  function NotificationDialog() {
    const [n, setN] = useState(1);
    const [mult, setMult] = useState(1);
    const multList = [1, 60, 60 * 24];
    return (
      <Portal>
        <Dialog
          visible={openNotificationDialog}
          style={styles.dialog}
          onDismiss={() => setOpenNotificationDialog(false)}
        >
          <Dialog.Title style={{ color: colors.onSurfaceVariant }}>
            Quando Notificar?
          </Dialog.Title>
          <Dialog.Content>
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              <Roleta n={90} fun={setN} />
              <Roleta
                list={["minutos antes", "horas antes", "dias antes"]}
                width={100}
                fun={setMult}
              />
            </View>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setOpenNotificationDialog(false)}>
              Cancelar
            </Button>
            <Button
              onPress={() => {
                setNotifications([...notifications, n * multList[mult]]);
                setOpenNotificationDialog(false);
              }}
            >
              Ok
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    );
  }

  function HorarioDialog(props) {
    const week = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
    const [showPicker, setShowPicker] = useState(false);
    const [showEndPicker, setShowEndPicker] = useState(false);

    const horarioDate = detail.horarioDate;
    const horarioDay = detail.horarioDay;
    const horarioEndTime = detail.horarioEndTime;
    const horarioLocal = detail.horarioLocal;
    const id = detail.id;

    const setHorarioDate = (e) => setDetail({ ...detail, horarioDate: e });
    const setHorarioDay = (e) => setDetail({ ...detail, horarioDay: e });
    const setHorarioEndTime = (e) =>
      setDetail({ ...detail, horarioEndTime: e });
    const setHorarioLocal = (e) => setDetail({ ...detail, horarioLocal: e });

    let local = horarioLocal;

    const handleTouchDay = (aux) => {
      if (horarioDay.includes(aux)) {
        if (horarioDay.length > 1) {
          setHorarioDay(horarioDay.filter((d) => d !== aux));
        }
      } else {
        setHorarioDay([...horarioDay, aux]);
      }
    };

    function Bolinha(props) {
      const cor = horarioDay.includes(props.index) ?
        colors.primary :
        colors.secondaryContainer;
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
          onPress={() => handleTouchDay(props.index)}
        >
          <Text
            style={{
              color: horarioDay.includes(props.index) ?
                colors.onPrimary :
                colors.onSurface,
            }}
          >
            {props.text}
          </Text>
        </TouchableOpacity>
      );
    }

    const isEditing = openHorarioDialog == 2;
    const headerTitle = isSubject ?
      "Quando e onde será a aula?" :
      "Quando e onde será o evento?";
    return (
      <Portal>
        <Dialog
          style={styles.dialog}
          onDismiss={() => setOpenHorarioDialog(false)}
          visible={openHorarioDialog}
          contentStyle={{ backgroundColor: colors.surface }}
        >
          <Dialog.Title style={{ color: colors.onSurfaceVariant }}>
            {headerTitle}
          </Dialog.Title>
          <Dialog.Content>
            {props.weekly &&
              <>
                <DefaultScrollView
                  contentContainerStyle={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  horizontal={true}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      height: 30,
                      margin: 5,
                      marginBottom: 20,
                    }}
                  >
                    {week.map((item, idx) => {
                      return <Bolinha index={idx} text={item} key={idx} />;
                    })}
                  </View>
                </DefaultScrollView>
                <TouchableOpacity
                  style={{ ...styles.dateAndDatepicker, margin: 10 }}
                  onPress={() => setShowPicker(true)}
                >
                  <MaterialCommunityIcons
                    name="calendar-edit"
                    style={styles.calendar}
                    size={24}
                    color={colors.onPrimary}
                  />
                  <Text style={styles.data}>
                    Horario inicial: {formatHour(horarioDate)}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ ...styles.dateAndDatepicker, margin: 10 }}
                  onPress={() => setShowEndPicker(true)}
                >
                  <MaterialCommunityIcons
                    name="calendar-edit"
                    style={styles.calendar}
                    size={24}
                    color={colors.onPrimary}
                  />

                  <Text style={styles.data}>
                    Hora final:{" " + formatHour(horarioEndTime)}
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
                    if (minimum(date) > horarioEndTime.getTime()) {
                      setDetail({
                        ...detail,
                        horarioDate: date,
                        horarioEndTime: date,
                      });
                    } else {
                      setHorarioDate(date);
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
                    setHorarioEndTime(
                      ndate.getTime() < minimum(horarioDate) ?
                        minimum(horarioDate)                        :
                        ndate,
                    );
                  }}
                  cancelTextIOS={"Cancelar"}
                  confirmTextIOS={"Confirmar"}
                  headerTextIOS={"Escolha uma hora"}
                />
              </>
            }
            {!props.weekly &&
              <>
                <TouchableOpacity
                  style={{ ...styles.dateAndDatepicker, margin: 10 }}
                  onPress={() => setShowPicker(true)}
                >
                  <MaterialCommunityIcons
                    name="calendar-edit"
                    style={styles.calendar}
                    size={24}
                    color={colors.onPrimary}
                  />
                  <Text style={styles.data}>
                    Inicio: {formatDateWithHour(horarioDate)}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ ...styles.dateAndDatepicker, margin: 10 }}
                  onPress={() => setShowEndPicker(true)}
                >
                  <MaterialCommunityIcons
                    name="calendar-edit"
                    style={styles.calendar}
                    size={24}
                    color={colors.onPrimary}
                  />
                  <Text style={styles.data}>
                    Hora final:{" " + formatHour(horarioEndTime)}
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
                    if (minimum(date) > horarioEndTime.getTime()) {
                      setDetail({
                        ...detail,
                        horarioEndTime: date,
                        horarioDate: date,
                      });
                    } else {
                      setHorarioDate(date);
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
                    setHorarioEndTime(
                      ndate.getTime() < minimum(horarioDate) ?
                        minimum(horarioDate) :
                        ndate,
                    );
                  }}
                  cancelTextIOS={"Cancelar"}
                  confirmTextIOS={"Confirmar"}
                  headerTextIOS={"Escolha uma hora"}
                />
              </>
            }
            <Text style={{ color: colors.onSurface, marginLeft: 10 }}>
              Local
            </Text>
            <TextInput
              style={styles.input}
              defaultValue={horarioLocal}
              onChangeText={(e) => {
                local = e;
              }}
              onEndEditing={(e) => setHorarioLocal(e.nativeEvent.text)}
              accessibilityHint={"local"}
            ></TextInput>
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              color={colors.primary}
              onPress={() => {
                setOpenHorarioDialog(false);
              }}
            >
              Cancelar
            </Button>
            {!isEditing &&
              <Button
                color={colors.primary}
                onPress={() => {
                  if (weekly) {
                    let aux = [];
                    for (let i = 0; i < horarioDay.length; i++) {
                      let detail = {
                        day: horarioDay[i],
                        datetime_init: horarioDate.toUTCString(),
                        datetime_end: horarioEndTime.toUTCString(),
                        local: local,
                      };
                      aux.push(detail);
                    }
                    setDetails([...details, ...aux]);
                  } else {
                    let detail = {
                      day: new Date(horarioDate).getDay(),
                      datetime_init: horarioDate.toUTCString(),
                      datetime_end: horarioEndTime.toUTCString(),
                      local: local,
                    };
                    setDetails([...details, detail]);
                  }
                  setOpenHorarioDialog(false);
                }}
              >
                OK
              </Button>
            }
            {isEditing &&
              <Button
                color={colors.primary}
                onPress={() => {
                  if (weekly) {
                    let aux = details.filter((d, idx) => idx != id);
                    for (let i = 0; i < horarioDay.length; i++) {
                      let detail = {
                        day: horarioDay[i],
                        datetime_init: horarioDate.toUTCString(),
                        datetime_end: horarioEndTime.toUTCString(),
                        local: local,
                      };
                      aux.push(detail);
                    }
                    setDetails([...aux]);
                  } else {
                    let aux = details.filter((d, idx) => idx != id);
                    let detail = {
                      day: new Date(horarioDate).getDay(),
                      datetime_init: horarioDate.toUTCString(),
                      datetime_end: horarioEndTime.toUTCString(),
                      local: local,
                    };
                    setDetails([...aux, detail]);
                  }
                  setOpenHorarioDialog(false);
                }}
              >
                Editar
              </Button>
            }
          </Dialog.Actions>
        </Dialog>
      </Portal>
    );
  }

  const range = (n) => [...Array(n + 1).keys()];

  function Roleta(props) {
    const list = props.list || range(props.n || 60);
    const width = props.width || props.size || 60;
    const height = props.height || props.size || 60;
    const fun = props.fun || (() => null);
    return (
      <View style={{ height: height * 3, width: width }}>
        {/* <ScrollPicker
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
        /> */}
      </View>
    );
  }

  const user = useSelector((state) => state.user).user;

  function DetailRender(props) {
    const index = props.index;
    const detail = props.detail;
    return (
      <TouchableOpacity
        key={index}
        style={{
          marginHorizontal: 20,
          marginBottom: 15,
          backgroundColor: colors.surface,
          borderRadius: 10,
          paddingHorizontal: 10,
          padding: 5,
          flexDirection: "row",
        }}
        onPress={() => {
          setDetail({
            horarioDate: new Date(detail.datetime_init),
            horarioDay: [detail.day],
            horarioEndTime: new Date(detail.datetime_end),
            horarioLocal: detail.local,
            id: index,
          });
          setOpenHorarioDialog(2);
        }}
      >
        <View style={{ justifyContent: "center" }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            <Feather
              name="repeat"
              size={18}
              color={colors.onSurface}
              style={{ paddingRight: 8 }}
            />
            <Text style={{ color: colors.onSurface }}>
              {(weekly ? week[detail.day] : formatDate(detail.datetime_init)) +
                " "}{" "}
              {`${formatHour(detail.datetime_init)} - ${formatHour(
                detail.datetime_end,
              )}`}
            </Text>
          </View>
          {detail.local.length > 0 &&
            <TouchableOpacity
              onPress={async() => {
                let place = user.campus + ", UFSCAR, " + detail.local;

                const url =
                  "https://www.google.com/maps/search/?api=1&query=" +
                  encodeURI(place);

                try {
                  await Linking.openURL(url);
                } catch (e) {
                  console.log(e);
                }
              }}
              style={{
                flexDirection: "row",
                alignSelf: "flex-start",
                alignItems: "center",
                justifyContent: "flex-start",
                paddingTop: 5,
              }}
            >
              <MaterialIcons
                name="location-pin"
                size={20}
                color={colors.primary}
                style={{ paddingRight: 8 }}
              />
              <Text style={{ color: colors.primary }}>{`${detail.local}`}</Text>
            </TouchableOpacity>
          }
        </View>
        <View
          style={{ alignItems: "flex-end", justifyContent: "center", flex: 1 }}
        >
          <IconButton
            icon="minus-circle-outline"
            color={colors.onSurface}
            onPress={() => {
              let newDetails = details.filter((d) => d != detail);
              setDetails([...newDetails]);
            }}
            size={18}
          />
        </View>
      </TouchableOpacity>
    );
  }

  function BotaoAdicionarQueAbreUmDialogo(props) {
    const setState = props.setState;
    return (
      <View style={{ flexDirection: "row" }}>
        <View style={{ flex: 1 }} />
        <TouchableOpacity
          onPress={() => {
            setState(true);
          }}
          style={{
            marginTop: 0,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: colors.surface,
            borderRadius: 10,
            padding: 10,
            borderWidth: 1,
            borderColor: colors.outline,
          }}
        >
          <Feather
            name="plus"
            size={24}
            color={colors.primary}
            style={{ paddingRight: 10 }}
          />
          <Text style={{ color: colors.onSurface }}>Adicionar</Text>
        </TouchableOpacity>
        <View style={{ flex: 1 }} />
      </View>
    );
  }

  function notificationText(notification) {
    if (notification != 0) return getTime(notification) + " antes";
    return "Assim que começar";
  }

  function NotificationRender(props) {
    const index = props.index;
    const notification = props.notification;
    return (
      <View
        key={index}
        style={{
          marginHorizontal: 20,
          marginBottom: 15,
          backgroundColor: colors.surface,
          borderRadius: 10,
          padding: 10,
          paddingVertical: 5,
          flexDirection: "row",
        }}
      >
        <View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              flex: 1,
            }}
          >
            <Feather
              name="repeat"
              size={18}
              color={colors.onSurface}
              style={{ paddingRight: 8 }}
            />
            <Text style={{ color: colors.onSurface }}>{`${notificationText(
              notification,
            )}`}</Text>
          </View>
        </View>
        <View
          style={{ alignItems: "flex-end", justifyContent: "center", flex: 1 }}
        >
          <IconButton
            icon="minus-circle-outline"
            color={colors.onSurface}
            onPress={() => {
              let newNotifications = notifications.filter(
                (e) => e != notification,
              );
              setNotifications([...newNotifications]);
            }}
            size={18}
          />
        </View>
      </View>
    );
  }

  function TeacherRender(props) {
    const index = props.index;
    const teacher = props.teacher;

    return (
      <View
        key={index}
        style={{
          marginHorizontal: 20,
          marginBottom: 20,
          backgroundColor: colors.surface,
          borderRadius: 10,
          padding: 10,
          paddingVertical: 5,
          flexDirection: "row",
        }}
      >
        <View
          style={{
            justifyContent: "center",
            flex: 1,
          }}
        >
          <TextInput
            defaultValue={teacher}
            onEndEditing={(e) => {
              if (e.nativeEvent.text != "") {
                let newTeachers = [...teachers];
                newTeachers[index] = e.nativeEvent.text;
                setTeachers([...newTeachers]);
              } else {
                let newTeachers = teachers.filter((v, idx) => idx != index);
                setTeachers([...newTeachers]);
              }
            }}
            style={{ color: colors.onSurface, flex: 1 }}
          />
        </View>
        <View style={{ alignItems: "flex-end", justifyContent: "center" }}>
          <IconButton
            icon="minus-circle-outline"
            color={colors.onSurface}
            onPress={() => {
              let newTeachers = teachers.filter((d) => d != teacher);
              setTeachers([...newTeachers]);
            }}
            size={18}
          />
        </View>
      </View>
    );
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
    dialog: {
      backgroundColor: colors.dialog,
    },
    input: {
      height: 40,
      borderRadius: 5,
      marginBottom: 8,
      paddingLeft: 10,
      backgroundColor: colors.surface,
      color: colors.onSurface,
    },
    colorContainer: {
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "center",
      marginHorizontal: 18,
      marginTop: 5,
    },
    sectionIcon: {
      margin: 10,
    },
    title: {
      fontSize: 20,
      color: colors.onSurface,
    },

    data: {
      textAlignVertical: "center",
      color: colors.onPrimary,
    },

    description: {
      flex: 1,
      flexDirection: "row",
    },
    textInput: {
      marginHorizontal: 20,
      marginVertical: 5,
      borderRadius: 12,
      borderBottomWidth: 0,
      padding: 10,
      backgroundColor: colors.surface,
      color: colors.onSurface,
    },

    dateAndDatepicker: {
      flexDirection: "row",
      textAlignVertical: "center",
      backgroundColor: colors.primary,
      padding: 8,
      borderRadius: 10,
    },

    rbutton: {
      padding: 10,
      borderWidth: 1,
      borderRadius: 10,
      marginLeft: 10,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.surface,
      borderColor: colors.outline,
    },
    rbuttonAct: {
      marginLeft: 10,
      padding: 10,
      borderWidth: 1,
      backgroundColor: colors.secondaryContainer,
      borderColor: colors.secondaryContainer,
      borderRadius: 10,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    },
    calendar: {
      marginRight: 10,
    },
    choice: {
      marginBottom: 10,
    },
  });
  const [showMenu, setShowMenu] = useState(false);
  const openMenu = () => setShowMenu(true);
  const closeMenu = () => setShowMenu(false);

  const events = useSelector((state) => state.events).events;

  const materias = events.filter((event) => event.is_subject === true);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.trueContainer}>
        {(whenSubmit != null || isSubject) &&
          <>
            <View style={styles.colorContainer}>
              <TouchableOpacity
                style={!isSubmited ? styles.rbutton : styles.rbuttonAct}
                onPress={() => setIsSubmited(!isSubmited)}
              >
                {isSubmited &&
                  <Feather
                    name="check"
                    size={16}
                    color={
                      !weekly ? colors.onSecondaryContainer : colors.onSurface
                    }
                  />
                }
                <Text
                  style={{
                    color:
                      isSubmited != null ?
                        colors.onSurface :
                        colors.onSecondaryContainer,
                  }}
                >
                  {
                    `${isSubmited != false ?
                      "Concluído" :
                      "Marcar como Concluído"}`
                  }
                </Text>
              </TouchableOpacity>
            </View>
          </>
        }
        {
          <>
            <View style={styles.colorContainer}>
              <View style={styles.sectionIcon}>
                <Ionicons
                  name="color-palette"
                  size={24}
                  color={colors.onSurface}
                />
              </View>
              <View style={styles.description}>
                <Text style={styles.title}>Cor</Text>
              </View>
            </View>
            <View
              style={{
                ...styles.colorContainer,
                justifyContent: "space-between",
              }}
            >
              <SelGradSquare color={0} state={color} setState={setColor} />
              <SelGradSquare color={1} state={color} setState={setColor} />
              <SelGradSquare color={2} state={color} setState={setColor} />
              <SelGradSquare color={3} state={color} setState={setColor} />
              <SelGradSquare color={4} state={color} setState={setColor} />
              <SelGradSquare color={5} state={color} setState={setColor} />
              <SelGradSquare color={6} state={color} setState={setColor} />
              <SelGradSquare color={7} state={color} setState={setColor} />
            </View>
            <View
              style={{
                ...styles.colorContainer,
                justifyContent: "space-between",
              }}
            >
              <SelGradSquare color={8} state={color} setState={setColor} />
              <SelGradSquare color={9} state={color} setState={setColor} />
              <SelGradSquare color={10} state={color} setState={setColor} />
              <SelGradSquare color={11} state={color} setState={setColor} />
              <SelGradSquare color={12} state={color} setState={setColor} />
              <SelGradSquare color={13} state={color} setState={setColor} />
              <SelGradSquare color={14} state={color} setState={setColor} />
              <PickerGradSquare
                color={isNaN(color) ? color : "#f0f"}
                state={color}
                setState={setColor}
              />
            </View>
          </>
        }

        <View style={styles.choice}>
          <View style={styles.colorContainer}>
            <View style={styles.sectionIcon}>
              <MaterialIcons name="title" size={24} color={colors.onSurface} />
            </View>
            <View style={styles.description}>
              <Text style={styles.title}>Título</Text>
            </View>
          </View>
          <TextInput
            value={name}
            multiline={false}
            style={styles.textInput}
            inputContainerStyle={styles.textInput}
            placeholder="Novo Evento..."
            placeholderTextColor={colors.outline}
            underlineColor="transparent"
            underlineColorAndroid={"transparent"}
            onChangeText={(text) => setName(text)}
          />

          {isSubject &&
            <>
              <View style={styles.colorContainer}>
                <View style={styles.sectionIcon}>
                  <Ionicons name="school" size={24} color={colors.onSurface} />
                </View>
                <View style={styles.description}>
                  <Text style={styles.title}>Turma</Text>
                </View>
              </View>
              <TextInput
                value={turma}
                multiline={false}
                style={styles.textInput}
                inputContainerStyle={styles.textInput}
                placeholder="Turma A"
                placeholderTextColor={colors.outline}
                underlineColor="transparent"
                underlineColorAndroid={"transparent"}
                onChangeText={(text) => setTurma(text)}
              />
            </>
          }
        </View>

        <View style={styles.choice}>
          <View style={styles.colorContainer}>
            <View style={styles.sectionIcon}>
              <Entypo name="text" size={24} color={colors.onSurface} />
            </View>
            <View style={styles.description}>
              <Text style={styles.title}>Descrição</Text>
            </View>
          </View>
          <TextInput
            value={description}
            multiline={true}
            style={styles.textInput}
            inputContainerStyle={styles.textInput}
            placeholder="Detalhes do Evento..."
            placeholderTextColor={colors.outline}
            underlineColor="transparent"
            underlineColorAndroid={"transparent"}
            onChangeText={(text) => setDescription(text)}
          />
        </View>

        {isSubject &&
          <View style={styles.choice}>
            <View style={styles.colorContainer}>
              <View style={styles.sectionIcon}>
                <FontAwesome name="user" size={24} color={colors.onSurface} />
              </View>
              <View style={styles.description}>
                <Text style={styles.title}>Professores</Text>
              </View>
            </View>
          </View>
        }

        {isSubject &&
          teachers.map((teacher, index) =>
            <TeacherRender key={index} index={index} teacher={teacher} />)}
        {isSubject &&
          <BotaoAdicionarQueAbreUmDialogo setState={setOpenTeacherDialog} />
        }

        {!isSubject &&
          <>
            <View style={styles.choice}>
              <View style={styles.colorContainer}>
                <View style={styles.sectionIcon}>
                  <MaterialCommunityIcons
                    name="history"
                    size={24}
                    color={colors.onSurface}
                  />
                </View>
                <View style={styles.description}>
                  <Text style={styles.title}>Recorrência</Text>
                </View>
              </View>
              <View style={styles.colorContainer}>
                <TouchableOpacity
                  style={weekly ? styles.rbutton : styles.rbuttonAct}
                  onPress={() => setWeekly(false)}
                >
                  {!weekly &&
                    <Feather
                      name="check"
                      size={16}
                      color={
                        !weekly ? colors.onSecondaryContainer : colors.onSurface
                      }
                    />
                  }
                  <Text
                    style={{
                      color: !weekly ?
                        colors.onSecondaryContainer :
                        colors.onSurface,
                    }}
                  >
                    Evento único
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={!weekly ? styles.rbutton : styles.rbuttonAct}
                  onPress={() => setWeekly(true)}
                >
                  {weekly &&
                    <Feather
                      name="check"
                      size={16}
                      color={
                        weekly ? colors.onSecondaryContainer : colors.onSurface
                      }
                    />
                  }
                  <Text
                    style={{
                      color: weekly ?
                        colors.onSecondaryContainer :
                        colors.onSurface,
                    }}
                  >
                    Evento recorrente
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </>
        }

        <View style={styles.choice}>
          <View style={styles.colorContainer}>
            <View style={styles.sectionIcon}>
              <MaterialCommunityIcons
                name="clock"
                size={24}
                color={colors.onSurface}
              />
            </View>
            <View style={styles.description}>
              <Text style={styles.title}>Horários</Text>
            </View>
          </View>

          <View style={{ height: 10 }}></View>

          {details.sort(sortDetails).map((detail, index) =>
            <DetailRender key={index} index={index} detail={detail} />)}

          <BotaoAdicionarQueAbreUmDialogo
            setState={(e) => {
              setDetail({
                horarioDate: new Date(),
                horarioDay: [new Date().getDay()],
                horarioEndTime: new Date(),
                horarioLocal: "",
                id: 0,
              });
              setOpenHorarioDialog(e);
            }}
          />
        </View>

        {!isSubject &&
          <>
            <View style={styles.choice}>
              <View style={styles.colorContainer}>
                <View style={styles.sectionIcon}>
                  <MaterialCommunityIcons
                    name="book"
                    size={24}
                    color={colors.onSurface}
                  />
                </View>
                <View style={styles.description}>
                  <Text style={styles.title}>Pertence a uma matéria?</Text>
                </View>
              </View>
              <Menu
                visible={showMenu}
                onDismiss={closeMenu}
                style={{ width: "100%" }}
                anchor={
                  <TouchableOpacity onPress={openMenu}>
                    <Text style={styles.textInput}>
                      {materias.filter((event) => event.id == subject)[0]
                        ?.name || "Nenhuma matéria"}
                    </Text>
                  </TouchableOpacity>
                }
              >
                <Menu.Item
                  onPress={() => {
                    setSubject(null);
                    setShowMenu(false);
                  }}
                  title="Nenhuma matéria"
                />
                {materias.map((materia, index) =>
                  <Menu.Item
                    key={index}
                    onPress={() => {
                      setSubject(materia.id);
                      setShowMenu(false);
                    }}
                    title={materia.name}
                  />)}
              </Menu>
            </View>
          </>
        }

        {!isSubject &&
          <>
            <View style={styles.choice}>
              <View style={styles.colorContainer}>
                <View style={styles.sectionIcon}>
                  <MaterialCommunityIcons
                    name="message-question-outline"
                    size={24}
                    color={colors.onSurface}
                  />
                </View>
                <View style={styles.description}>
                  <Text style={styles.title}>Tem data de entrega?</Text>
                </View>
              </View>
              <View style={styles.colorContainer}>
                <TouchableOpacity
                  style={
                    whenSubmit == null ? styles.rbutton : styles.rbuttonAct
                  }
                  onPress={() => setOpenWhenDialog(true)}
                >
                  {whenSubmit != null &&
                    <Feather
                      name="check"
                      size={16}
                      color={
                        !weekly ? colors.onSecondaryContainer : colors.onSurface
                      }
                    />
                  }
                  {whenSubmit == null &&
                    <Text style={{ color: colors.onSurface }}>Sim</Text>
                  }
                  {whenSubmit != null &&
                    <Text style={{ color: colors.onSecondaryContainer }}>
                      {formatDateWithHour(new Date(whenSubmit))}
                    </Text>
                  }
                </TouchableOpacity>
                <TouchableOpacity
                  style={
                    whenSubmit != null ? styles.rbutton : styles.rbuttonAct
                  }
                  onPress={() => setWhenSubmit(null)}
                >
                  {whenSubmit == null &&
                    <Feather
                      name="check"
                      size={16}
                      color={
                        !weekly ? colors.onSecondaryContainer : colors.onSurface
                      }
                    />
                  }
                  <Text
                    style={{
                      color:
                        whenSubmit != null ?
                          colors.onSurface :
                          colors.onSecondaryContainer,
                    }}
                  >
                    Não
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </>
        }

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

        <View style={styles.choice}>
          <View style={styles.colorContainer}>
            <View style={styles.sectionIcon}>
              <MaterialCommunityIcons
                name="bell"
                size={24}
                color={colors.onSurface}
              />
            </View>
            <View style={styles.description}>
              <Text style={styles.title}>Notificações</Text>
            </View>
          </View>

          <View style={{ height: 10 }}></View>

          {notifications.map((notification, index) =>
            <NotificationRender
              key={index}
              index={index}
              notification={notification}
            />)}
          <BotaoAdicionarQueAbreUmDialogo
            setState={setOpenNotificationDialog}
          />
        </View>

        <HorarioDialog weekly={weekly} />
        <NotificationDialog />

        <TeacherDialog
          fun={(novoProf) => setTeachers([...teachers, novoProf])}
          open={openTeacherDialog}
          setOpen={setOpenTeacherDialog}
        />
      </View>
    </ScrollView>
  );
}
