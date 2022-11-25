import React from "react";
import {
  Text,
  StyleSheet,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  useTheme,
} from "react-native-paper";
import GenericLogin from "../../components/GenericLogin";
import { useNavigation } from "@react-navigation/native";
import { updateUser } from "../../redux/actions/userActions";
import Toast from "react-native-toast-message";
import { Buffer } from "buffer";

export default function UpdateSaldoScreen() {
  const navigation = useNavigation();
  const theme = useTheme();
  const colors = theme.colors;
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user).user;
  function updateWallet(money, dispatch) {
    user.money = money;
    dispatch(updateUser(user));
  }

  async function Login(user, pssw, handleError, setMessageE, setMessageS) {
    setMessageS("");
    setMessageE("");
    let encodedAuth = new Buffer(user + ":" + pssw).toString("base64");
    try {
      const response = await fetch(
        "https://sistemas.ufscar.br/sagui-api/integracoes/pwacesso/consultar-saldo",
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
            "Aparentemente ocorreu um erro ao consultar o saldo",
          );
          setMessageS("");
        } else {
          const saldo = data.saldo;
          try {
            updateWallet(saldo, dispatch);
            Toast.show({
              type: "success",
              text1: "Seu saldo foi atualizado!",
            });
            navigation.goBack();
          } catch (e) {
            setMessageE("Aconteceu um erro ao consultar o saldo");
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
      WarningText="Isso alterará seu saldo!">
      <Text
        style={{
          color: colors.onSurfaceVariant,
          fontWeight: "bold",
          fontSize: 30,
          marginTop: 20,
        }}
      >
        Carteirinha do RU
      </Text>
      <Text style={{ ...styles.description, paddingBottom: 0 }}>
        Sincronize usando as mesmas credenciais que você utiliza ao entrar no
        SIGA.
      </Text>
      <Text style={{ ...styles.description, paddingTop: 0 }}>
        Ao conectar, seu saldo será atualizado.
      </Text>
    </GenericLogin>
  );
}
