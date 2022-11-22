import React, { useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import {
  MaterialIcons,
} from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import {
  Button,
  useTheme,
  Portal,
  Dialog,
} from "react-native-paper";
import {
  defaultSubject,
  parseTime,
  SIGA,
  weekDaysSIGA,
} from "../../helpers/helper";
import { useNavigation } from "@react-navigation/native";
import {
  addEvent,
  removeSIGA,
} from "../../redux/actions/eventActions";
import Toast from "react-native-toast-message";

export const addSigaSubject = (subject, dispatch) => {
  let auxdetails = [];
  for (let i = 0; i < subject.horarios.length; i++) {
    const aux = {
      datetime_init: parseTime(subject.horarios[i].inicio).toString(),
      datetime_end: parseTime(subject.horarios[i].fim).toString(),
      local: subject.horarios[i].sala,
      day: weekDaysSIGA.indexOf(subject.horarios[i].dia),
    };

    auxdetails.push(aux);
  }

  const task = {
    ...defaultSubject,
    siga: true,
    details: [...auxdetails],
    name: subject.atividade,
    color: 6,
    turma: "turma " + subject.turma,
  };

  dispatch(addEvent(task));
};

export default function SigaScreen() {
  const navigation = useNavigation();
  const [messageE, setMessageE] = useState("");
  const [messageS, setMessageS] = useState("");
  const theme = useTheme();
  const colors = theme.colors;
  const [visible, setVisible] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleError = (error) => {
    if (error.status != undefined) {
      if (error.status === 401 || error.status === 403) {
        setMessageE("Usuário ou senha inválidos");
        setMessageS("");
      } else {
        setMessageE("Aconteceu um problema na comunicação com o SIGA");
        setMessageS("");
      }
    }
  };

  async function Login(user, pssw) {
    setMessageS("");
    setMessageE("");
    const Buffer = require("buffer").Buffer;
    let encodedAuth = new Buffer(user + ":" + pssw).toString("base64");
    console.log(encodedAuth);
    try {
      const response = await fetch(
        "https://sistemas.ufscar.br/sagui-api/siga/deferimento",
        {
          headers: {
            Authorization: "Basic " + encodedAuth,
          },
        }
      );
      let data = await response.json();
      if (data.status == undefined) {
        if (data.length == 0) {
          setMessageE(
            "Aparentemente você não possui nenhum deferimento no Periodo letivo atual, por acaso está de férias?"
          );
          setMessageS("");
        } else {
          const subjects = data.data;
          try {
            dispatch(removeSIGA());
            for (let i = 0; i < subjects.length; i++) {
              addSigaSubject(subjects[i], dispatch);
            }
            Toast.show({
              type: "success",
              text1: "Suas matérias foram importadas!",
            });
            navigation.goBack();
          } catch (e) {
            setMessageE("Aconteceu um problema na comunicação com o SIGA");
            setMessageS("");
            console.log(e);
          }
        }
      } else {
        handleError(data);
      }
    } catch (error) {
      handleError(error);
    }
  }

  const styles = StyleSheet.create({
    textInput: {
      flex: 1,
      marginHorizontal: 20,
      marginVertical: 5,
      borderRadius: 12,
      borderBottomWidth: 0,
      padding: 10,
      backgroundColor: colors.surface,
      color: colors.onSurface,
    },
    pssdInput: {
      marginLeft: 20,
      marginVertical: 5,
      borderTopLeftRadius: 12,
      borderBottomLeftRadius: 12,
      borderBottomWidth: 0,
      padding: 10,
      backgroundColor: colors.surface,
      color: colors.onSurface,
      flex: 1,
    },
    pssdBtn: {
      marginRight: 20,
      marginVertical: 5,
      borderTopRightRadius: 12,
      borderBottomRightRadius: 12,
      borderBottomWidth: 0,
      padding: 10,
      backgroundColor: colors.surface,
      color: colors.onSurface,
    },
    pssdRow: {
      flexDirection: "row",
    },
    description: {
      padding: 20,
      textAlign: "justify",
      color: colors.onSurface,
      width: "100%",
    },
    btn: {
      padding: 10,
      paddingHorizontal: 20,
      borderRadius: 20,
      backgroundColor: colors.primary,
      alignItems: "center",
      justifyContent: "center",
      marginTop: 10,
    },
    message: {
      padding: 10,
      color: colors.tertiary,
    },
  });

  const [openSigaDialog, setOpenSigaDialog] = useState(false);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.surface1,
        alignItems: "center",
      }}
    >
      <SIGA size={30} style={{ marginTop: 20 }} />
      <Text style={{ ...styles.description, paddingBottom: 0 }}>
        Sincronize usando as mesmas credenciais que você utiliza ao entrar no
        SIGA.
      </Text>
      <Text style={{ ...styles.description, paddingTop: 0 }}>
        Ao conectar, suas matérias anteriores registradas pelo siga serão
        substituidas pelas atuais
      </Text>
      {messageE.length > 0 && <Text style={styles.message}>{messageE}</Text>}
      {messageS.length > 0 && <Text style={styles.messageS}>{messageS}</Text>}

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 5,
          marginTop: 10,
          marginLeft: 20,
        }}
      >
        <MaterialIcons
          name="account-circle"
          size={24}
          color={colors.onSurfaceVariant}
        />
        <Text
          style={{ color: colors.onSurfaceVariant, marginLeft: 5, flex: 1 }}
        >
          Número UFSCar ou CPF
        </Text>
      </View>
      <View style={styles.pssdRow}>
        <TextInput
          style={styles.textInput}
          value={username}
          onChangeText={setUsername}
          placeholder={"CPF ou RA"}
          placeholderTextColor={colors.outline}
        ></TextInput>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 5,
          marginTop: 10,
          marginLeft: 20,
        }}
      >
        <MaterialIcons name="lock" size={24} color={colors.onSurfaceVariant} />
        <Text
          style={{ color: colors.onSurfaceVariant, marginLeft: 5, flex: 1 }}
        >
          Senha
        </Text>
      </View>
      <View style={styles.pssdRow}>
        <TextInput
          style={styles.pssdInput}
          value={password}
          onChangeText={setPassword}
          placeholder={"Senha do SIGA"}
          placeholderTextColor={colors.outline}
          secureTextEntry={!visible}
        ></TextInput>
        <TouchableOpacity
          style={styles.pssdBtn}
          onPress={() => setVisible(!visible)}
        >
          {!visible && (
            <MaterialIcons
              name="visibility"
              size={24}
              color={colors.onSurface}
            />
          )}
          {visible && (
            <MaterialIcons
              name="visibility-off"
              size={24}
              color={colors.onSurface}
            />
          )}
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => setOpenSigaDialog(true)}
      >
        <Text style={{ color: colors.onPrimary }}>Sincronizar</Text>
      </TouchableOpacity>

      <Portal>
        <Dialog
          style={{ backgroundColor: colors.dialog }}
          visible={openSigaDialog}
          onDismiss={() => setOpenSigaDialog(false)}
        >
          <Dialog.Title style={{ color: colors.onSurfaceVariant }}>
            Tem certeza que quer prosseguir?
          </Dialog.Title>
          <Dialog.Content>
            <Text style={{ color: colors.onSurfaceVariant }}>
              Isso deletará as matérias importadas anteriormente !
            </Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setOpenSigaDialog(false)}>Não</Button>
            <Button
              onPress={() => {
                setOpenSigaDialog(false);
                Login(username, password);
              }}
            >
              Sim
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
}
