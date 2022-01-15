import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Pre,
  Pressable,
  TextInput,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Appbar } from "react-native-paper";
import Constants from "expo-constants";
import RestaurantMenu from "../screens/RestaurantMenu";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/core";

const incrementValue = (value, setValue, mealValue) => {
  parseFloat(value) + parseFloat(mealValue) <= 9999.99
    ? setValue(value + mealValue)
    : setValue(9999.99);
};

const decrementValue = (value, setValue, mealValue) => {
  if (parseFloat(value) - parseFloat(mealValue) >= 0) {
    setValue(value - mealValue);
  }
};

const editValue = (setValue, newValue) => {
  // Valores entre 0 e 9999.99
  newValue = newValue.replace(",", ".");
  if (parseFloat(newValue) >= 0 && parseFloat(newValue) <= 9999.99) {
    setValue(parseFloat(newValue));
  }
  // Valores acima de 9999.99 seta pra 9999.99
  else if (parseFloat(newValue) >= 9999.99) {
    setValue(9999.99);
  }
  // caso o input esteja vazio pra não ficar o ultimo valor digitado seta pra 0
  else {
    setValue(0);
  }
};

const formatReal = (num) => {
  num = parseFloat(num);
  return (
    "R$ " +
    num
      .toFixed(2)
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1;")
      .replace(".", ",")
      .replace(";", ".")
  );
};

export default function Wallet() {
  const [value, setValue] = React.useState(0);
  const mealValue = 4.2;
  const [shouldShow, setShouldShow] = React.useState(false);
  const navigation = useNavigation();

  return (
    <>
      <View style={styles.container}>
        <Appbar.Header statusBarHeight={Constants.statusBarHeight}>
          <Appbar.Action
            icon="menu"
            onPress={() => {
              navigation.openDrawer();
            }}
          />
          <Appbar.Content title={"Restaurante Universitário"} />
          <Appbar.Action
            icon="food"
            onPress={() => navigation.navigate("RestaurantMenu")}
          />
        </Appbar.Header>
        <View style={styles.title}>
          <Pressable onPress={() => setShouldShow(!shouldShow)}>
            <Text style={styles.balanceTitle}>Saldo Carteirinha</Text>
            <MaterialIcons
              name="edit"
              color="black"
              size={24}
              style={styles.edit}
            />
          </Pressable>
          {shouldShow ? (
            <React.Fragment>
              <TextInput
                style={styles.input}
                onChangeText={(newValue) => editValue(setValue, newValue)}
                keyboardType="numeric"
                placeholder="Editar o saldo da Carteirinha"
                onEndEditing={() => setShouldShow(!shouldShow)}
              />
            </React.Fragment>
          ) : null}
        </View>
        <View style={styles.line} />
        <Text style={styles.balance}>{formatReal(value)}</Text>
        <StatusBar style="auto" />
        <View style={styles.changeValue}>
          <View style={styles.line} />
          <Pressable
            onPress={() => incrementValue(value, setValue, mealValue)}
            title="+ ADICIONAR CRÉDITO"
            style={styles.pressable}
          >
            <Text style={styles.textPessable}>+ CREDITAR REFEIÇÃO</Text>
          </Pressable>
          <View style={styles.line} />
          <Pressable
            onPress={() => decrementValue(value, setValue, mealValue)}
            title="- DEBITAR REFEIÇAÕ"
            style={styles.pressable}
          >
            <Text style={styles.textPessable}>- DEBITAR REFEIÇÃO</Text>
          </Pressable>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  title: {
    marginTop: "10%",
    width: "100%",
    flexDirection: "column",
    justifyContent: "center",
  },
  balanceTitle: {
    position: "absolute",
    alignSelf: "center",
    fontSize: 24,
    color: "#484848",
    textAlign: "center",
  },
  balance: {
    flexDirection: "row",
    justifyContent: "center",
    textAlign: "center",
    fontSize: 60,
    paddingTop: hp("13%"),
    fontWeight: "bold",
    color: "#373737",
    width: wp("95%"),
    height: hp("30%"),
  },
  changeValue: {
    flex: 2,
    flexDirection: "column",
    width: "100%",
    textAlign: "center",
  },
  pressable: {
    paddingTop: 20,
  },
  pressableEdit: {
    color: "grey",
    padding: 10,
    marginRight: 0,
  },
  textPessable: {
    fontSize: 35,
    color: "#E8243C",
    textAlign: "left",
    marginLeft: "5%",
    width: wp("100%"),
    height: hp("10%"),
  },
  line: {
    borderBottomColor: "#C4C4C4",
    borderBottomWidth: 0.5,
    paddingTop: 10,
  },
  edit: {
    paddingRight: 15,
    alignSelf: "flex-end",
  },
  input: {
    width: wp("70%"),
    height: hp("8%"),
    borderWidth: 1,
    marginTop: 20,
    alignItems: "center",
    alignSelf: "center",
    fontSize: 18,
    textAlign: "center",
    padding: 10,
  },
});
