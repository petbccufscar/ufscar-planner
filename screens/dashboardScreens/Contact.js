import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Linking,
  TouchableOpacity
} from "react-native";
import { useTheme } from "react-native-paper";

export default function Contato() {
  const colors = useTheme().colors;
  const [text, setText] = useState("");
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({
      headerTintColor: colors.onHeaderInactive,
      headerStyle: {
        backgroundColor: colors.headerInactive,
      },
      headerRight: () =>
        <TouchableOpacity
          style={{
            backgroundColor: colors.primaryContainer,
            padding: 10,
            borderRadius: 30,
            justifyContent: "center",
            alignItems: "center",
            marginRight: 10,
          }}
          onPress={() => Linking.openURL(
            "mailto:petbcc@ufscar.br?" +
            "subject=Fale conosco: Ufscar Planner&body=" +
            text,
          )}
        >

          <Text style={{ color: colors.onPrimaryContainer }}>Enviar</Text>
        </TouchableOpacity>,
    });
  }, [
    text,
  ]);
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.surface1,
      alignItems: "center",
      justifyContent: "flex-start",
      padding: 20,
    },
    text: {
      color: colors.onSurfaceVariant,
      paddingBottom: 20,
    },
    input: {
      backgroundColor: colors.surface5,
      color: colors.onSurface,
      width: "100%",
      minHeight: "25%",
      borderRadius: 9,
      padding: 5,
      textAlignVertical: "top",
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Escreva aqui sua sugestão, dúvida ou problema:
      </Text>
      <TextInput
        style={styles.input}
        selectionColor={colors.primary}
        multiline={true}
        numberOfLines={4}
        onChangeText={(text) => setText(text)}
        value={text}
      />
    </View>
  );
}

