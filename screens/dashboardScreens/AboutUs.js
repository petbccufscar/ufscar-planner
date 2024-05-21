import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Linking,
  TouchableOpacity
} from "react-native";
import { useTheme } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import ScrollView from "./../../components/ScrollView";
import Constants from "expo-constants";

export default function AboutUs() {
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
  });
  const version = Constants.expoConfig.version;
  const channel = Constants.expoConfig.updates.requestHeaders[
    "ufscar-planner-channel"
  ];

  return (
    <>
      <ScrollView style={{ backgroundColor: theme.colors.surface1 }}>
        <View style={styles.background}>
          <View style={{ alignItems: "center", marginBottom: 5 }}>
            <MaterialIcons name="info" size={54} color={theme.colors.primary} />
            <Text style={{ color: theme.colors.primary, fontSize: 18 }}>
              Versão {version}
            </Text>
            {
              channel !== null && channel !== "production" && <Text
                style={{ color: theme.colors.primary, fontSize: 13 }}
              >
                — {channel} —
              </Text>
            }
          </View>
          <View style={styles.textWall}>
            <Text style={styles.title}>O UFSCar Planner</Text>

            <Text style={styles.text}>
              O aplicativo UFSCar Planner foi desenvolvido pelo grupo PET do
              curso de Ciência da Computação da UFSCar, campus de São Carlos,
              com o objetivo de ajudar os alunos a organizarem seus estudos e
              integrarem-se às atvididades oferecidas pela universidade.
            </Text>
          </View>

          <View style={styles.textWall}>
            <Text style={styles.title}>Os colaboradores</Text>

            <Text style={styles.text}>
              Esse projeto contou com a colaboração de:
            </Text>

            <Text style={[styles.contentText]}>{
              "    • Carlos Eduardo Fontaneli\n" +
              "    • Igor Lúcio Manta Guedes\n" +
              "    • Isabela Vieira Magalhães\n" +
              "    • João Victor Bueno de Caldas\n" +
              "    • Lucas Machado Cid\n" +
              "    • Maria Luiza Edwards de M Cordeiro\n" +
              "    • Matheus Ramos de Carvalho\n" +
              "    • Miguel Antonio de Oliveira\n" +
              "    • Natália Bachiega Magalhães\n" +
              "    • Renato Bueno (tutor)\n" +
              "    • Vanderlei de Brito Junior\n" +
              "    • Vinicius Quaresma da Luz"}
            </Text>

            <Text style={[styles.contentText]}>{
              "Este aplicativo foi baseado no aplicativo UFSCar Planner " +
              "lançado em 2017, desenvolvido no LINCE - Departamento de " +
              "Computação - UFSCar, sob supervisão do Prof. Dr. Cesar " +
              "Augusto Camillo Teixeira, com apoio e participação da empresa " +
              "TokenLab.\n\nColaboradores do aplicativo UFSCar Planner 2017:" +
              "\n\n" +
              "    • Ana Lucia Cardoso\n" +
              "    • Carlos Augusto Santo Andréa Junior\n" +
              "    • Daniel Willian de Souza Cunha\n" +
              "    • Felipe José Bento\n" +
              "    • Mateus Barros\n" +
              "    • Ruan Willer"}
            </Text>

          </View>

          <View style={styles.textWall}>
            <Text style={styles.text}>Conheça mais sobre o PET-BCC:</Text>
            <TouchableOpacity
              onPress={() => {
                const url = "https://petbcc.ufscar.br/";
                Linking.canOpenURL(url).then((supported) => {
                  if (supported) {
                    Linking.openURL(url);
                  } else {
                    console.log("Don't know how to open URI: " + url);
                  }
                });
              }}
            >
              <Text
                style={[styles.text, styles.contentText, styles.link]}
              >{"      https://petbcc.ufscar.br/"}</Text>
            </TouchableOpacity>
            <Text style={styles.text}>Acesse o repositório do aplicativo:</Text>
            <TouchableOpacity
              onPress={() => {
                const url = "https://github.com/petbccufscar/ufscar-planner";
                Linking.canOpenURL(url).then((supported) => {
                  if (supported) {
                    Linking.openURL(url);
                  } else {
                    console.log("Don't know how to open URI: " + url);
                  }
                });
              }}
            >
              <Text
                style={[styles.text, styles.contentText, styles.link]}
              >{"      https://github.com/petbccufscar/ufscar-planner"}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </>
  );
}
