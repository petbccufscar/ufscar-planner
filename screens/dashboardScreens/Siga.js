import React from "react";
import {
  Text,
  StyleSheet,
} from "react-native";
import { useDispatch } from "react-redux";
import {
  useTheme,
} from "react-native-paper";
import GenericLogin from "../../components/GenericLogin";
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
import { Buffer } from "buffer";
import { updateSemester } from "../../redux/actions/semesterActions";
import { latestDefaultSemester } from "../../helpers/defaultSemester";

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
  const theme = useTheme();
  const colors = theme.colors;
  const dispatch = useDispatch();

  async function Login(user, pssw, handleError, setMessageE, setMessageS) {
    setMessageS("");
    setMessageE("");
    let encodedAuth = new Buffer(user + ":" + pssw).toString("base64");
    try {
      const response = await fetch(
        "https://sistemas.ufscar.br/sagui-api/siga/deferimento",
        {
          headers: {
            Authorization: "Basic " + encodedAuth,
          },
        },
      );
      let data = await response.json();
      if (data.status == undefined) {
        if (data.length == 0) {
          setMessageE(
            "Aparentemente você não possui nenhum deferimento no Periodo " +
            "letivo atual, por acaso está de férias?",
          );
          setMessageS("");
        } else {
          const subjects = data.data;
          try {
            dispatch(removeSIGA());
            dispatch(updateSemester(latestDefaultSemester()));
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
    description: {
      padding: 20,
      textAlign: "justify",
      color: colors.onSurface,
      width: "100%",
    },
  });

  return (
    <GenericLogin Authenticate={Login}
      WarningText="Isso deletará as matérias importadas anteriormente!">
      <SIGA size={30} style={{ marginTop: 20 }} />
      <Text style={{ ...styles.description, paddingBottom: 0 }}>
        Sincronize usando as mesmas credenciais que você utiliza ao entrar no
        SIGA.
      </Text>
      <Text style={{ ...styles.description, paddingTop: 0 }}>
        Ao conectar, suas matérias anteriores registradas pelo siga serão
        substituidas pelas atuais
      </Text>
    </GenericLogin>
  );
}
