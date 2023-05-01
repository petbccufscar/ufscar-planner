import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Image,
  LayoutAnimation,
  StyleSheet,
  Text,
  View,
  Linking } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { TextInput, useTheme } from "react-native-paper";
import DropDown from "react-native-paper-dropdown";
import { updateUser } from "../redux/actions/userActions";
import { SIGA } from "../helpers/helper";
import { useDispatch, useSelector } from "react-redux";
import Toast from "react-native-toast-message";
import {
  removeSIGA,
} from "../redux/actions/eventActions";
import { addSigaSubject } from "./dashboardScreens/Siga";
import {
  MaterialIcons,
} from "@expo/vector-icons";
import { useEffect } from "react";
import { Buffer } from "buffer";
import { ActivityIndicator } from "react-native-paper";

export default function Welcome() {
  const colors = useTheme().colors;
  const [page, setPage] = useState(0);

  const styles = StyleSheet.create({
    image: {
      width: "100%",
    },
    imageContainer: {
      flex: 1,
      justifyContent: "center",
      zIndex: -1,
    },
    container: {
      flex: 1,
      backgroundColor: "#E8243C",
    },
    card: {
      position: "absolute",
      backgroundColor: colors.surface,
      bottom: 0,
      left: 0,
      zIndex: 2,
      width: "100%",
      borderTopLeftRadius: 40,
      borderTopRightRadius: 40,
    },
  });

  function handlePageChange(pageAux) {
    LayoutAnimation.configureNext({
      duration: 300,
      create: {
        type: LayoutAnimation.Types.easeInEaseOut,
        property: LayoutAnimation.Properties.opacity,
      },
      update: {
        type: LayoutAnimation.Types.easeInEaseOut,
        property: LayoutAnimation.Properties.opacity,
      },
    });
    setPage(pageAux);
  }

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          resizeMode="contain"
          source={require("../assets/splash.png")}
        />
      </View>
      <View style={styles.card}>
        {page == 0 && <ScreenZero setPage={handlePageChange} />}
        {page == 1 && <ScreenOne setPage={handlePageChange} />}
        {page == 2 && <ScreenTwo setPage={handlePageChange} />}
        {page == 3 && <ScreenThree setPage={handlePageChange} />}
      </View>
    </View>
  );
}

function ScreenZero({ setPage }) {
  const colors = useTheme().colors;
  const styles = StyleSheet.create({
    container: {
      paddingHorizontal: 40,
      paddingVertical: 20,
    },
    h1: {
      fontSize: 28,
      color: colors.primary,
    },
    h2: {
      fontSize: 22,
      color: colors.primary,
      marginVertical: 20,
    },

    h3: {
      fontSize: 16,
      lineHeight: 24,
      color: colors.onSurface,
      marginBottom: 15,
    },

    centerText: {
      justifyContent: "center",
      textAlign: "center",
    },

    btn: {
      backgroundColor: colors.secondaryContainer,
      alignItems: "center",
      justifyContent: "center",
      alignSelf: "flex-start",
      borderRadius: 20,
      paddingHorizontal: 20,
      paddingVertical: 10,
    },
    btnText: {
      color: colors.onSecondaryContainer,
    },
    secBtn: {
      padding: 20,
    },
    secBtnText: {
      color: colors.onSurfaceVariant,
    },
    btnPlace: {
      alignSelf: "center",
      alignItems: "center",
      justifyContent: "center",
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.h1}>Olá, estudante</Text>
      <Text style={[styles.h2, styles.centerText]}>Seja bem vindo(a)!</Text>
      <Text style={styles.h3}>
        Ao continuar você estará concordando com nossa Política de Privacidade
        / Termos de uso.
      </Text>
      <TouchableOpacity
        onPress={() => Linking.openURL("https://petbcc.ufscar.br/ufscar_planner/politica/")}
      >
        <Text
          style={{ ...styles.h3, color: colors.primary }}
        >
          Acesse a Política de Privacidade / Termos de uso clicando aqui.
        </Text>
      </TouchableOpacity>
      <View style={styles.btnPlace}>
        <TouchableOpacity style={styles.btn} onPress={() => setPage(1)}>
          <Text style={styles.btnText}>Continuar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function ScreenOne({ setPage }) {
  const colors = useTheme().colors;
  const styles = StyleSheet.create({
    container: {
      paddingHorizontal: 40,
      paddingVertical: 20,
    },
    h1: {
      fontSize: 28,
      color: colors.primary,
    },
    h2: {
      fontSize: 22,
      color: colors.primary,
      marginVertical: 20,
    },

    h3: {
      fontSize: 16,
      lineHeight: 24,
      color: colors.onSurface,
      marginBottom: 15,
    },

    centerText: {
      justifyContent: "center",
      textAlign: "center",
    },

    btn: {
      backgroundColor: colors.secondaryContainer,
      alignItems: "center",
      justifyContent: "center",
      alignSelf: "flex-start",
      borderRadius: 20,
      paddingHorizontal: 20,
      paddingVertical: 10,
    },
    btnText: {
      color: colors.onSecondaryContainer,
    },
    secBtn: {
      padding: 20,
    },
    secBtnText: {
      color: colors.onSurfaceVariant,
    },
    btnPlace: {
      alignSelf: "center",
      alignItems: "center",
      justifyContent: "center",
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.h3}>
        Com o UFSCar Planner você pode acompanhar suas obrigações acadêmicas,
        cardápio do Restaurante Universitário e outras atividades relacionadas à
        UFSCar.
      </Text>
      <Text style={styles.h3}>
        Para ter acesso a mais recursos, faça login no SIGA.
      </Text>
      <View style={styles.btnPlace}>
        <TouchableOpacity style={styles.btn} onPress={() => setPage(2)}>
          <Text style={styles.btnText}>Logar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.secBtn} onPress={() => setPage(3)}>
          <Text style={styles.secBtnText}>Pular essa etapa</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function ScreenTwo({ setPage }) {
  const colors = useTheme().colors;
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleError = (error) => {
    if (error.status != undefined) {
      if (error.status === 401 || error.status === 403) {
        Toast.show({
          type: "error",
          text1: "Usuário ou senha Inválidos",
        });
      } else {
        Toast.show({
          type: "error",
          text1: "Aconteceu um problema na comunicação com o SIGA",
        });
      }
    }
  };

  async function Login(user, pssw) {
    setLoading(true);
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
          Toast.show({
            type: "error",
            text1:
              "Aparentemente você não possui nenhum deferimento no Periodo " +
              "letivo atual, por acaso está de férias?",
          });
          setPage(3);
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
            setPage(3);
          } catch (e) {
            Toast.show({
              type: "error",
              text1: "Aconteceu um problema na comunicação com o SIGA",
            });
            console.log(e);
          }
        }
      } else {
        handleError(data);
      }
    } catch (error) {
      handleError(error);
    }
    setLoading(false);
  }

  const styles = StyleSheet.create({
    container: {
      paddingHorizontal: 40,
      paddingVertical: 20,
    },
    h1: {
      fontSize: 28,
      color: colors.primary,
    },
    h2: {
      fontSize: 22,
      color: colors.primary,
      marginVertical: 20,
    },

    h3: {
      fontSize: 16,
      lineHeight: 24,
      color: colors.onSurface,
      marginBottom: 15,
    },

    centerText: {
      justifyContent: "center",
      textAlign: "center",
    },

    btn: {
      backgroundColor: colors.secondaryContainer,
      alignItems: "center",
      justifyContent: "center",
      alignSelf: "flex-start",
      borderRadius: 20,
      paddingHorizontal: 20,
      paddingVertical: 10,
    },
    btnText: {
      color: colors.onSecondaryContainer,
    },
    secBtn: {
      padding: 20,
    },
    secBtnText: {
      color: colors.onSurfaceVariant,
    },
    btnPlace: {
      alignItems: "center",
      flexDirection: "row",
      justifyContent: "space-between",
      flex: 1,
      marginTop: 15,
    },
    siga: {
      alignSelf: "center",
    },
    textInput: {
      marginVertical: 8,
      borderRadius: 12,
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0,
      borderBottomWidth: 0,
      borderColor: "transparent",
      backgroundColor: colors.surfaceVariant,
      color: colors.onSurface,
      flex: 1,
    },
    pssdBtn: {
      marginVertical: 8,
      borderTopRightRadius: 12,
      borderBottomRightRadius: 12,
      borderBottomWidth: 0,
      padding: 10,
      flex: 1,
      backgroundColor: colors.surfaceVariant,
      color: colors.onSurface,
      alignItems: "center",
      justifyContent: "center",
    },
    pssdRow: {
      flexDirection: "row",
    },
  });
  const [username, setUsername] = useState("");
  const [pssw, setPssw] = useState("");
  const [visible, setVisible] = useState(false);

  return (
    <View style={styles.container}>
      <SIGA size={40} style={styles.siga} />
      <Text style={styles.h3}>
        Faça login usando as mesmas credenciais que você utiliza ao entrar no
        SIGA.
      </Text>

      <TextInput
        onChangeText={setUsername}
        style={styles.textInput}
        placeholder="CPF ou RA"
        placeholderTextColor={colors.outline}
      />
      <View style={styles.pssdRow}>
        <TextInput
          secureTextEntry={!visible}
          onChangeText={setPssw}
          style={styles.textInput}
          placeholder="Senha do SIGA"
          placeholderTextColor={colors.outline}
        />
        <TouchableOpacity
          style={styles.pssdBtn}
          onPress={() => setVisible(!visible)}
        >
          {!visible &&
            <MaterialIcons
              name="visibility"
              size={24}
              color={colors.onSurface}
            />
          }
          {visible &&
            <MaterialIcons
              name="visibility-off"
              size={24}
              color={colors.onSurface}
            />
          }
        </TouchableOpacity>
      </View>

      <View style={styles.btnPlace}>
        <TouchableOpacity onPress={() => setPage(1)}>
          <Text style={styles.secBtnText}>Voltar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btn}
          disabled={loading}
          onPress={() => {
            Login(username, pssw);
          }}
        >
          {
            loading && <ActivityIndicator color={colors.onSecondaryContainer} />
          }
          {
            !loading && <Text style={styles.btnText}>Logar</Text>
          }
        </TouchableOpacity>
      </View>
    </View>
  );
}

function ScreenThree({ setPage }) {
  const theme = useTheme();
  const colors = theme.colors;
  const navigation = useNavigation();
  const [dropOrd, setDropOrd] = useState(false);

  const styles = StyleSheet.create({
    container: {
      paddingHorizontal: 40,
      paddingVertical: 20,
    },
    h1: {
      fontSize: 28,
      color: colors.primary,
    },
    h2: {
      fontSize: 22,
      color: colors.primary,
      marginVertical: 20,
    },

    h3: {
      fontSize: 16,
      lineHeight: 24,
      color: colors.onSurface,
      marginBottom: 15,
    },

    centerText: {
      justifyContent: "center",
      textAlign: "center",
    },

    btn: {
      backgroundColor: colors.secondaryContainer,
      alignItems: "center",
      justifyContent: "center",
      alignSelf: "flex-start",
      borderRadius: 20,
      paddingHorizontal: 20,
      paddingVertical: 10,
    },
    btnText: {
      color: colors.onSecondaryContainer,
    },
    secBtn: {
      padding: 20,
    },
    secBtnText: {
      color: colors.onSurfaceVariant,
    },
    btnPlace: {
      alignItems: "center",
      flexDirection: "row",
      justifyContent: "space-between",
      flex: 1,
      marginTop: 15,
    },
    siga: {
      alignSelf: "center",
    },
    textInput: {
      flex: 1,
      marginVertical: 8,
      borderRadius: 6,
      borderBottomWidth: 0,
      borderColor: "transparent",
      backgroundColor: colors.surfaceVariant,
      color: colors.onSurface,
    },
  });
  const user = useSelector((state) => state.user).user;
  const [selected, setSelected] = useState(user.campus);
  const listItems = [
    { label: "Araras", value: "Araras" },
    { label: "Lagoa do Sino", value: "Lagoa do Sino" },
    { label: "São Carlos", value: "São Carlos" },
    { label: "Sorocaba", value: "Sorocaba" },
  ];

  const dispatch = useDispatch();
  const handleNameChange = (value) => {
    dispatch(updateUser({ ...user, name: value }));
  };

  useEffect(() => {
    dispatch(updateUser({ ...user, campus: selected }));
  }, [selected]);

  return (
    <View style={styles.container}>
      <Text style={styles.h3}>
        Digite como você deseja ser chamado(a) e o seu campus UFSCar:
      </Text>
      <Text style={{ color: colors.outline, fontSize: 15 }}>
        Escolha seu apelido
      </Text>
      <TextInput
        style={styles.textInput}
        value={user.name}
        onChangeText={handleNameChange}
        placeholder="Digite seu nome"
        placeholderTextColor={colors.outline}
      />
      <Text style={{ color: colors.outline, fontSize: 15 }}>
        Escolha um campus
      </Text>
      <DropDown
        mode={"flat"}
        visible={dropOrd}
        showDropDown={() => setDropOrd(true)}
        onDismiss={() => setDropOrd(false)}
        value={selected}
        list={listItems}
        setValue={setSelected}
        inputProps={{ style: styles.textInput }}
        theme={{
          colors: {
            primary: colors.primary,
            onSurface: colors.onSurface,
            background: colors.surfaceVariant,
            text: colors.onSurface,
          },
        }}
      />

      <View style={styles.btnPlace}>
        <TouchableOpacity onPress={() => setPage(1)}>
          <Text style={styles.secBtnText}>Voltar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            dispatch(updateUser({ ...user, welcome: false }));
            navigation.navigate("BottomNav");
          }}
        >
          <Text style={styles.btnText}>Pronto</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
