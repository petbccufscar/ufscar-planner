import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Linking,
} from "react-native";
import { useNavigation } from "@react-navigation/core";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
// import { ScrollView } from 'react-native-gesture-handler'
import { FontAwesome } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import ScrollView from "./../../components/ScrollView";

export default function AboutUs() {
  const navigation = useNavigation();
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

  return (
    <>
      <ScrollView style={{ backgroundColor: theme.colors.surface1 }}>
        <View style={styles.background}>
          <View style={{ alignItems: "center", marginBottom: 5 }}>
            <MaterialIcons name="info" size={54} color={theme.colors.primary} />
          </View>

          <View style={styles.textWall}>
            <Text style={styles.title}>O UFSCar Planner</Text>

            <Text style={styles.text}>
              O aplicativo UFSCar Planner foi desenvolvido pelo grupo PET do
              curso de Ciência da Computação da UFSCar, campus de São Carlos, com o
              objetivo de ajudar os alunos a organizarem seus estudos e 
              integrarem-se às atvididades oferecidas pela universidade.
            </Text>
          </View>

          <View style={styles.textWall}>
            <Text style={styles.title}>Os colaboradores</Text>

            <Text style={styles.text}>
              Esse projeto contou com a colaboração de:
            </Text>

            <Text style={[styles.contentText]}>{`    • Carlos Eduardo Fontaneli
    • Igor Lúcio Manta Guedes
    • Isabela Vieira Magalhães
    • João Victor Bueno de Caldas
    • Lucas Machado Cid
    • Matheus Ramos de Carvalho
    • Miguel Antonio de Oliveira
    • Natália Bachiega Magalhães
    • Renato Bueno (tutor)
    • Vanderlei de Brito Junior
    • Vinicius Quaresma da Luz`}</Text>


            <Text style={[styles.contentText]}>{`Este aplicativo foi baseado no aplicativo UFSCar Planner lançado em 2017, desenvolvido no LINCE - Departamento de Computação - UFSCar, sob supervisão do Prof. Dr. Cesar Augusto Camillo Teixeira, com apoio e participação da empresa TokenLab.

Colaboradores do aplicativo UFSCar Planner 2017:

    • Ana Lucia Cardoso
    • Carlos Augusto Santo Andréa Junior
    • Daniel Willian de Souza Cunha
    • Felipe José Bento
    • Mateus Barros
    • Ruan Willer`}</Text>

          </View>

          <View style={styles.textWall}>
            <Text style={styles.title}>O PET</Text>

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
              >{`      https://petbcc.ufscar.br/`}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </>
  );
}
