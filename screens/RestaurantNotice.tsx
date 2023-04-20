import React, { StyleSheet, View, Text } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import ScrollView from "../components/ScrollView";
import { useTheme } from "react-native-paper";

/**
 * Um aviso sobre o restaurante universitário.
 */
type Notice = {
  /**
   * O título do aviso.
   */
  title: string,

  /**
   * Uma descrição curta sobre o conteúdo do aviso.
   */
  description: string,

  /**
   * Uma string contendo um ou mais parágrafos com o conteúdo do aviso.
   */
  content: string,
};

type RootStackParamList = {
  RestaurantNotice: Notice,
};

type Props = NativeStackScreenProps<RootStackParamList, "RestaurantNotice">;

/**
 * Tela que apresenta o conteúdo de um aviso sobre o restaurante universitário.
 */
export default function RestaurantNotice({ route }: Props) {
  const theme = useTheme();
  const { content } = route.params;

  const styles = StyleSheet.create({
    background: {
      flex: 1,
      backgroundColor: theme.colors.surface1,
      padding: 20,
    },
    content: {
      padding: 5,
      fontSize: 16,
      color: theme.colors.onSurfaceVariant,
    },
  });

  return (
    <>
      <ScrollView style= {{ backgroundColor: theme.colors.surface1 }}>
        <View style={ styles.background }>
          { content && <Text style={ styles.content }> { content } </Text>}
        </View>
      </ScrollView>
    </>
  );
}
