import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Linking,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import ScrollView from "./../../components/ScrollView";
import { SIGA } from "../../helpers/helper";

export default function Links() {
  const theme = useTheme();

  const styles = StyleSheet.create({
    background: {
      flex: 1,
      backgroundColor: theme.colors.surface1,
      padding: 20,
    },
    title: {
      fontSize: 16,
      color: theme.colors.onSurface,
    },
    text: {
      padding: 5,
      fontSize: 14,
      color: theme.colors.onSurfaceVariant,
      flexDirection: "row",
      alignItems: "center",
    },
    contentText: {
      padding: 10,
      fontSize: 14,
      color: theme.colors.onSurfaceVariant,
      flexDirection: "row",
      alignItems: "center",
    },
    link: {
      color: theme.colors.tertiary,
    },
    textWall: {
      marginVertical: 5,
    },
    button: {
      flexDirection: "row",
      borderRadius: 10,
      backgroundColor: theme.colors.surface,
      padding: 5,
      paddingHorizontal: 20,
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
    descText: {
      alignItems: "flex-start",
      flexWrap: "wrap",
      marginLeft: 10,
      padding: 5,
      color: theme.colors.onSurfaceVariant,
    },
  });

  return (
    <>
      <ScrollView style={{ backgroundColor: theme.colors.surface1 }}>
        <View style={styles.background}>
          <View style={{ alignItems: "center", marginBottom: 20 }}>
            <MaterialIcons name="link" size={54} color={theme.colors.primary} />
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => Linking.openURL("https://www.pergamum.ufscar.br/biblioteca_s/php/login_usu.php?flag=index.php")}
          >
            <Feather
              name="book"
              size={24}
              color={theme.colors.onSurfaceVariant}
            />
            <View>
              <Text style={styles.buttonText}>Meu Pergamum</Text>
            </View>

          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => Linking.openURL("https://sistemas.ufscar.br/siga/")}
          >
            <SIGA />
            <Text style={styles.buttonText}>SIGA</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => Linking.openURL("https://sistemas.ufscar.br/sagui/")}
          >
            <Feather
              name="user"
              size={24}
              color={theme.colors.onSurfaceVariant}
            />
            <Text style={styles.buttonText}>SAGUI</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => Linking.openURL("https://ava2.ead.ufscar.br")}
          >
            <Feather
              name="monitor"
              size={24}
              color={theme.colors.onSurfaceVariant}
            />
            <Text style={styles.buttonText}>AVA2</Text>
          </TouchableOpacity>

        </View>
      </ScrollView>
    </>
  );
}
