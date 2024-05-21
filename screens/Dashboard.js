import { Feather, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useTheme } from "react-native-paper";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { useDispatch, useSelector } from "react-redux";
import ScrollView from "./../components/ScrollView";
import Progress from "../components/Progress";
import TextTicker from "react-native-text-ticker";
import { SIGA } from "../helpers/helper";
import { disableBalanceSync, isBalanceSyncEnabled } from "../helpers/balance";
import { Button, Portal, Dialog } from "react-native-paper";
import Toast from "react-native-toast-message";

export default function Dashboard() {
  const navigation = useNavigation();
  const user = useSelector((state) => state.user).user;
  const [openSyncDialog, setOpenSyncDialog] = useState(false);
  const theme = useTheme();
  const dispatch = useDispatch();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.surface1,
      padding: 20,
      paddingTop: 0,
    },
    sectionTitle: {
      fontSize: 30,
      padding: 10,
      color: theme.colors.onSurface,
      paddingBottom: 10,
      marginBottom: 10,
      borderBottomWidth: 1,
      borderColor: theme.colors.onSurfaceVariant,
    },
    button: {
      flexDirection: "row",
      borderRadius: 10,
      backgroundColor: theme.colors.surface,
      padding: 5,
      paddingHorizontal: 15,
      marginBottom: 10,
      alignItems: "center",
    },
    buttonText: {
      alignItems: "flex-start",
      flexWrap: "wrap",
      fontSize: 20,
      marginLeft: 10,
      padding: 5,
      color: theme.colors.onSurfaceVariant,
    },
    buttonCont: {
      marginVertical: 20,
    },
    miscCont: {
      flex: 1,
      paddingTop: 0,
      borderBottomWidth: 1,
      borderColor: theme.colors.onSurfaceVariant,
      alignItems: "center",
    },
    squareBtn: {
      flexDirection: "column",
      borderRadius: 10,
      backgroundColor: theme.colors.surface,
      padding: 5,
      width: wp("35%"),
      height: wp("26%"),
      alignItems: "center",
      justifyContent: "center",
    },
    line: {
      width: "100%",
      flexDirection: "row",
      justifyContent: "space-evenly",
      paddingTop: 10,
    },
    smallBtnText: {
      fontSize: 16,
      color: theme.colors.onSurfaceVariant,
      paddingVertical: 5,
      alignItems: "center",
    },
  });

  function onSyncButtonPress() {
    if (isBalanceSyncEnabled(user)) {
      setOpenSyncDialog(true);
    } else {
      navigation.navigate("RuSync");
    }
  }

  return (
    <>
      <ScrollView style={styles.container}>
        <Text style={styles.sectionTitle}>Olá, {user.name}</Text>

        <View style={styles.miscCont}>
          <View style={styles.line}>
            <TouchableOpacity
              style={styles.squareBtn}
              onPress={() => navigation.navigate("Materias")}
            >
              <MaterialIcons
                name="class"
                size={50}
                color={theme.colors.onSurfaceVariant}
              />
              <TextTicker
                style={styles.smallBtnText}
                marqueeDelay={0}
                animationType={"scroll"}
              >
                Matérias
              </TextTicker>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.squareBtn}
              onPress={() => navigation.navigate("Eventos")}
            >
              <MaterialIcons
                name="event"
                size={50}
                color={theme.colors.onSurfaceVariant}
              />
              <TextTicker
                style={styles.smallBtnText}
                marqueeDelay={0}
                animationType={"scroll"}
              >
                Eventos
              </TextTicker>
            </TouchableOpacity>
          </View>
          <View style={styles.line}>
            <TouchableOpacity
              style={styles.squareBtn}
              onPress={() => navigation.navigate("Notas")}
            >
              <MaterialIcons
                name="star"
                size={50}
                color={theme.colors.onSurfaceVariant}
              />
              <TextTicker
                style={styles.smallBtnText}
                marqueeDelay={0}
                animationType={"scroll"}
              >
                Notas
              </TextTicker>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.squareBtn}
              onPress={() => navigation.navigate("Frequencia")}
            >
              <MaterialIcons
                name="date-range"
                size={50}
                color={theme.colors.onSurfaceVariant}
              />
              <TextTicker
                style={styles.smallBtnText}
                marqueeDelay={0}
                animationType={"scroll"}
              >
                Frequência
              </TextTicker>
            </TouchableOpacity>
          </View>

          <Progress />
          <Text
            style={{ color: theme.colors.onSurface, fontSize: 20, margin: 10 }}
          >
            Sincronizar com sua conta do SIGA
          </Text>
          <Text style={{ color: theme.colors.onSurfaceVariant }}>
            Sincronizar com o SIGA para importar as matérias que você está
            cursando atualmente.
          </Text>
          <TouchableOpacity
            style={{ ...styles.button, width: "100%", marginTop: 10 }}
            onPress={() => navigation.navigate("Siga")}
          >
            <SIGA />
            <Text style={{ ...styles.buttonText, flex: 1 }}>
              Sincronizar com o SIGA
            </Text>
            <MaterialIcons
              name="chevron-right"
              size={24}
              color={theme.colors.onSurfaceVariant}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.buttonCont}>
          <TouchableOpacity
            style={styles.button}
            onPress={onSyncButtonPress}
          >
            <MaterialIcons
              name="account-balance-wallet"
              size={24}
              color={theme.colors.onSurfaceVariant}
            />
            <Text style={styles.buttonText}>Sincronizar saldo do RU</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Configurações")}
          >
            <Feather
              name="settings"
              size={24}
              color={theme.colors.onSurfaceVariant}
            />
            <Text style={styles.buttonText}>Configurações</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Links")}
          >
            <Feather
              name="link"
              size={24}
              color={theme.colors.onSurfaceVariant}
            />
            <Text style={styles.buttonText}>Links Úteis</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("AboutUs")}
          >
            <Feather
              name="info"
              size={24}
              color={theme.colors.onSurfaceVariant}
            />
            <Text style={styles.buttonText}>Sobre nós</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Contato")}
          >
            <Feather
              name="mail"
              size={24}
              color={theme.colors.onSurfaceVariant}
            />
            <Text style={styles.buttonText}>Fale conosco</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Portal>
        <Dialog
          style={{ backgroundColor: theme.colors.dialog }}
          visible={openSyncDialog}
          onDismiss={() => setOpenSyncDialog(false)}
        >
          <Dialog.Title style={{ color: theme.colors.onSurfaceVariant }}>
            Desativar sincronização?
          </Dialog.Title>
          <Dialog.Content>
            <Text style={{ color: theme.colors.onSurfaceVariant }}>
              A sincronização automática será desativada.
            </Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setOpenSyncDialog(false)}>
              Cancelar
            </Button>
            <Button
              onPress={async() => {
                setOpenSyncDialog(false);
                await disableBalanceSync(user, dispatch);
                Toast.show({
                  text1: "A sincronização de saldo foi desativada.",
                });
              }}
            >
              Desativar
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </>
  );
}
