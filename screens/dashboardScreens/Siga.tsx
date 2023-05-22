import React from "react";
import { Text, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import { useTheme } from "react-native-paper";
import GenericLogin from "../../components/GenericLogin";
import { SIGA } from "../../helpers/helper";
import { useNavigation } from "@react-navigation/native";
import { addEvent, removeSIGA } from "../../redux/actions/eventActions";
import Toast from "react-native-toast-message";
import { updateSemester } from "../../redux/actions/semesterActions";
import { latestDefaultSemester } from "../../helpers/defaultSemester";
import { SigaErrorReason, fetchSigaSubjects } from "../../helpers/sigaHelper";

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
    const sigaResult = await fetchSigaSubjects(user, pssw);
    if (sigaResult.ok) {
      dispatch(updateSemester(latestDefaultSemester()));
      if (sigaResult.subjects.length == 0) {
        setErrorMessage(
          "Aparentemente você não possui nenhum deferimento no Periodo " +
            "letivo atual, por acaso está de férias?",
        );
      } else {
        dispatch(removeSIGA());
        for (const subject of sigaResult.subjects) {
          dispatch(addEvent(subject));
        }
        Toast.show({ text1: "Suas matérias foram importadas!" });
        navigation.goBack();
      }
    } else {
      if (sigaResult.error == SigaErrorReason.UNAUTHORIZED) {
        setErrorMessage("Usuário ou senha inválidos");
      } else {
        setErrorMessage("Aconteceu um problema na comunicação com o SIGA");
      }
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
