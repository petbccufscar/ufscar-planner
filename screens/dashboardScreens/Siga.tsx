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
  parseTime,
  SIGA,
  weekDaysSIGA,
} from "../../helpers/helper";
import { useNavigation } from "@react-navigation/native";
import {
  AddEventAction,
  addEvent,
  removeSIGA,
} from "../../redux/actions/eventActions";
import Toast from "react-native-toast-message";
import { Buffer } from "buffer";
import { updateSemester } from "../../redux/actions/semesterActions";
import { latestDefaultSemester } from "../../helpers/defaultSemester";
import { SigaSubject, processSigaSubject } from "../../helpers/sigaHelper";
import { Dispatch } from "redux";
import { Detail, SubjectDescription } from "../../redux/types/task";

const SIGA_URL = "https://sistemas.ufscar.br/sagui-api/siga/deferimento";

/** Resposta OK da API de deferimento do Sagui */
type SigaOk = {
  data: SigaSubject[],
}

/** Resposta de Erro da API de deferimento do Sagui */
type SigaError = {
  timestamp: number,
  status: number,
  error: string,
  message: string,
  path: string,
}

/** Resposta que o siga pode retornar pela API */
type SigaResponse = SigaOk | SigaError;

export function addSigaSubject(
  subject: SigaSubject,
  dispatch: Dispatch<AddEventAction>,
) {
  const optSubject = processSigaSubject(subject);
  if (optSubject === null) { return; }
  subject = optSubject;

  const auxdetails: Detail[] = [];
  for (let i = 0; i < subject.horarios.length; i++) {
    auxdetails.push({
      datetime_init: parseTime(subject.horarios[i].inicio).toString(),
      datetime_end: parseTime(subject.horarios[i].fim).toString(),
      local: subject.horarios[i].sala || "",
      day: weekDaysSIGA.indexOf(subject.horarios[i].dia),
    });
  }

  const task: SubjectDescription = {
    siga: true,
    details: [...auxdetails],
    name: subject.atividade,
    color: 6,
    turma: "turma " + subject.turma,
    weekly: true,
    is_subject: true,
    is_submited: false,
    subject: null,
    notification: [],
    description: "",
    mean: "(p1+p2+p3)/3",
    frequency: "(aulasDadas - faltas)/aulasDadas",
    grade: {
      frequency: { aulasDadas: 1, faltas: 0 },
      mean: { p1: 0, p2: 0, p3: 0 },
    },
    teachers: [],
  };

  dispatch(addEvent(task));
}

export default function SigaScreen() {
  const navigation = useNavigation();
  const theme = useTheme();
  const colors = theme.colors;
  const dispatch = useDispatch();

  async function Login(
    user: string,
    pssw: string,
    setErrorMessage: (msg: string) => void,
  ) {
    setErrorMessage("");
    const encodedAuth = Buffer.from(user + ":" + pssw).toString("base64");
    const headers = {
      Authorization: "Basic " + encodedAuth,
      Accept: "application/json",
    };
    const response = await fetch(SIGA_URL, { headers });
    if (response.status == 200) {
      try {
        const sigaResponse = await response.json() as SigaResponse;
        if ("error" in sigaResponse) {
          if (sigaResponse.status == 401 || sigaResponse.status == 403) {
            setErrorMessage("Usuário ou senha inválidos");
          } else {
            setErrorMessage("Aconteceu um problema na comunicação com o SIGA");
          }
        } else {
          const subjects = sigaResponse.data;
          dispatch(updateSemester(latestDefaultSemester()));
          if (subjects.length == 0) {
            setErrorMessage(
              "Aparentemente você não possui nenhum deferimento no Periodo " +
              "letivo atual, por acaso está de férias?",
            );
          } else {
            dispatch(removeSIGA());
            for (let i = 0; i < subjects.length; i++) {
              addSigaSubject(subjects[i], dispatch);
            }
            Toast.show({ text1: "Suas matérias foram importadas!" });
            navigation.goBack();
          }
        }
      } catch (_jsonError) {
        setErrorMessage("Aconteceu um problema na comunicação com o SIGA");
      }
    } else if (response.status == 401 || response.status == 403) {
      setErrorMessage("Usuário ou senha inválidos");
    } else {
      setErrorMessage("Aconteceu um problema na comunicação com o SIGA");
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
    <GenericLogin
      Authenticate={Login}
      SubmitText="Sincronizar"
      WarningText="Isso deletará as matérias importadas anteriormente!"
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
    </GenericLogin>
  );
}
