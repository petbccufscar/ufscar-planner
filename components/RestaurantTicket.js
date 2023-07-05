import { MaterialIcons, MaterialCommunityIcons  } from "@expo/vector-icons";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "react-native-paper";
import { useSelector, useDispatch } from "react-redux";
import { formatReal } from "../helpers/helper";
import { updateUser } from "../redux/actions/userActions";
import ScrollView from "./ScrollView";
import { useNavigation } from "@react-navigation/core";
import { Portal, Button, Dialog, TextInput } from "react-native-paper";

export default function RestaurantTicket(props) {
  const user = useSelector((state) => state.user).user;
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(user.money.toString());
  const mealValue = user.meal;

  const showControls = props.showControls;
  const hasError = props.hasError;
  const dispatcher = useDispatch();

  const decrementValue = () => {
    if (parseFloat(user.money) - parseFloat(mealValue) >= 0) {
      user.money = user.money - mealValue;
    }
    dispatcher(updateUser(user));
  };

  function handleCashChange() {
    if (value.length > 0) {
      user.money = parseFloat(value.replace(",", "."));
      dispatcher(updateUser(user));
    }
  }

  const styles = StyleSheet.create({
    card: {
      backgroundColor: theme.colors.surface,
      borderRadius: 12,
      marginTop: 20,
      marginHorizontal: 20,
      borderColor: theme.colors.outline,
      borderWidth: 1,
    },
    saldoTitleCard: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      padding: 10,
    },
    saldoBodyCard: {
      justifyContent: "space-between",
      alignItems: "flex-end",
      borderTopWidth: 1,
      borderColor: theme.colors.outline,
      padding: 10,
    },
    saldo: {
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 10,
      width: "100%",
    },
    buttonRow: {
      flexDirection: "row",
      justifyContent: "flex-end",
      alignItems: "center",
    },
    alterarSaldoButton: {
      backgroundColor: theme.colors.surface,
      borderRadius: 100,
      marginRight: 10,
      marginVertical: 10,
      padding: 10,
      borderWidth: 1,
      borderColor: theme.colors.outline,
    },
    debitarRefeicaoButton: {
      backgroundColor: theme.colors.primary,
      borderRadius: 100,
      padding: 10,
      marginVertical: 10,
    },
    titleCentered: {
      color: theme.colors.onSurface,
      textAlign: "center",
      fontSize: 20,
    },
    iconPlaceholder: {
      width: 24,
      height: 24,
    },
    saldoValue: {
      color: theme.colors.primary,
      fontSize: 30,
      textAlign: "center",
    },
    saldoQtd: {
      color: theme.colors.primary,
      fontSize: 20,
      textAlign: "center",
    },
    debitarBtnText: {
      color: theme.colors.onPrimary,
      fontSize: 13,
      textAlign: "center",
      paddingLeft: 10,
      paddingRight: 10,
      flex: 1,
    },
    alterarBtnText: {
      color: theme.colors.primary,
      fontSize: 13,
      textAlign: "center",
      paddingLeft: 10,
      paddingRight: 10,
      flex: 1,
    },
    input: {
      height: 40,
      borderRadius: 5,
      marginBottom: 8,
      backgroundColor: theme.colors.surface,
    },
    errorLine: {
      flexDirection: "row",
      justifyContent: "center",
      paddingBottom: 14,
    },
    errorMessage: {
      textAlign: "left",
      color: theme.colors.error,
    },
  });

  const qtdRefeicoes = Math.floor( ( user.money * 10 * 10 ) / ( user.meal * 10 * 10) );
  const refeicao = qtdRefeicoes == 1 ? "refeição" : "refeições";
  const navigation = useNavigation();
  return (
    <View style={styles.card}>
      <TouchableOpacity
        onPress={() => navigation.navigate("RuSync")}
        disabled={!showControls}
        style={styles.saldoTitleCard}
      >
        <MaterialIcons
          style={styles.leftIconButton}
          name="account-balance-wallet"
          size={24}
          color={theme.colors.onSurfaceVariant}
        />
        <Text style={styles.titleCentered}>Saldo da Carteirinha</Text>
        <View>
          {
            showControls && <MaterialCommunityIcons
              name="web-sync"
              size={24}
              color={theme.colors.primary}
            />
          }
        </View>
      </TouchableOpacity>
      <View style={styles.saldoBodyCard}>
        <View style={styles.saldo}>
          <Text style={styles.saldoValue}>{formatReal(user.money)}</Text>
          <Text style={styles.saldoQtd}>
            {
              qtdRefeicoes != (qtdRefeicoes | 0) ?
                "∞" :
                qtdRefeicoes | 0
            } {refeicao}
          </Text>
        </View>
        {
          showControls && <ScrollView horizontal={true}>
            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={styles.alterarSaldoButton}
                onPress={() => setOpen(true)}
              >
                <Text style={styles.alterarBtnText}>Alterar saldo</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => decrementValue()}
                style={styles.debitarRefeicaoButton}
              >
                <Text style={styles.debitarBtnText}>Debitar refeição</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        }
      </View>
      {
        !showControls && hasError && <>
          <View style={styles.errorLine}>
            <MaterialIcons
              style={styles.errorMessage}
              name="warning"
              size={19}
            />
            <Text> </Text>
            <Text style={styles.errorMessage}>
              Ocorreu um erro ao atualizar o saldo.
            </Text>
          </View>
        </>
      }
      <Portal>
        <Dialog
          style={{ backgroundColor: theme.colors.dialog }}
          visible={open}
          nDismiss={() => setOpen(false)}
        >
          <Dialog.Title>Alterar</Dialog.Title>
          <Dialog.Content>
            <TextInput
              style={styles.input}
              keyboardType="decimal-pad"
              value={value.toString()}
              onChangeText={setValue}
            ></TextInput>
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              onPress={() => {
                setOpen(false);
                setValue(user.money.toString());
              }}
            >Cancelar</Button>
            <Button
              disabled={
                value.search(/^\$?\d+(((.\d{3})*(,\d*))|((,\d{3})*(\.\d*)))?$/) < 0
              }
              onPress={() => {
                handleCashChange();
                setOpen(false);
              }}
            >Ok</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
}
