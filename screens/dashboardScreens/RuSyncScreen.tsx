import React from "react";
import { Text, StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import GenericLogin from "../../components/GenericLogin";
import Toast from "react-native-toast-message";
import { Buffer } from "buffer";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/reducers";
import { UserState } from "../../redux/types/user";
import { updateUser } from "../../redux/actions/userActions";

const URL = "https://sistemas.ufscar.br/sagui-api/integracoes/pwacesso/consultar-saldo";

export default function RUSyncScreen() {
  const navigation = useNavigation();
  const theme = useTheme();
  const user = useSelector<RootState, UserState>((state) => state.user).user;
  const dispatch = useDispatch();

  async function login(
    uname: string,
    password: string,
    _errorHandler: (error: Response) => void, // TODO refatorar isso fora.
    setErrorMessage: (msg: string) => void,
    // setMessageS: (msg: string) => void, // TODO refatorar isso fora.
  ) {
    const encodedAuth = Buffer.from(uname + ":" + password).toString("base64");
    const headers = { Authorization: "Basic " + encodedAuth };
    const response = await fetch(URL, { headers });

    // Só queremos saber se o usuário e a senha são válidos.
    if (response.status == 200) {
      dispatch(updateUser({ ...user, balanceSyncToken: encodedAuth }));
      Toast.show({ text1: "A sincronização de saldo foi ativada." });
      navigation.goBack();
    } else if (response.status == 401 || response.status == 403) {
      setErrorMessage("Usuário ou senha inválidos");
    } else {
      setErrorMessage("Aconteceu um problema na comunicação com o Sagui");
    }
  }

  const styles = StyleSheet.create({
    title: {
      color: theme.colors.onSurfaceVariant,
      fontWeight: "bold",
      fontSize: 30,
      marginTop: 20,
    },
    description: {
      padding: 20,
      textAlign: "justify",
      color: theme.colors.onSurface,
      width: "100%",
    },
  });

  return (
    <GenericLogin
      Authenticate={login}
      SubmitText="Ativar Sincronização"
      WarningText=
        "Suas credenciais serão armazenadas e seu saldo será alterado!"
    >
      <Text style={styles.title}>
        Carteirinha do RU
      </Text>
      <Text style={{ ...styles.description, paddingBottom: 0 }}>
        Sincronize usando as mesmas credenciais que você utiliza ao entrar no
        SIGA.
      </Text>
      <Text style={{ ...styles.description, paddingTop: 0 }}>
        Suas credenciais serão armazenadas e o seu saldo será consultado
        periodicamente usando os servidores do Sagui.
      </Text>
    </GenericLogin>
  );
}
