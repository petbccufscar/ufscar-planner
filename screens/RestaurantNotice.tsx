import React, { StyleSheet, View, Text } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import ScrollView from "../components/ScrollView";
import { useTheme } from "react-native-paper";

type RootStackParamList = {
  RestaurantNotice: { content: string },
};

type Props = NativeStackScreenProps<RootStackParamList, "RestaurantNotice">;

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
