import React, { } from "react";
import {
  Text,
  View,
  StyleSheet,
} from "react-native";
import { useSelector } from "react-redux";
import { useTheme, FAB } from "react-native-paper";
import { Task } from "../../components/EventCards";
import { defaultSubject } from "../../helpers/helper";
import { useNavigation } from "@react-navigation/native";
import ScrollView from "../../components/ScrollView";

export default function SubjectScreen() {
  const events = useSelector((state) => state.events).events;
  const classes = events.filter((e) => e.is_subject);
  const colors = useTheme().colors;
  const navigation = useNavigation();

  const styles = StyleSheet.create({
    fab: {
      position: "absolute",
      shadowOpacity: 10,
      borderRadius: 10,
      backgroundColor: colors.surface3,
      margin: 16,
      right: 0,
      bottom: 0,
    },
    container: {
      flex: 1,
      alignItems: "center",
      backgroundColor: colors.surface1,
      paddingHorizontal: 20,
      paddingBottom: 60,
    },
    scroll: {
      flex: 1,
      backgroundColor: colors.surface1,
    },

  });
  return (
    <View style={styles.scroll}>
      <ScrollView>
        <View style={styles.container}>
          {classes.map((item, idx) => {
            return <Task
              subjectScreen={true}
              acontecendo={false}
              key={idx}
              task={item}
            />;
          })}
          {
            classes.length == 0 &&
            <Text style={{ fontSize: 20, color: colors.onSurface }}>
              Nenhuma aula registrada
            </Text>
          }
        </View>

      </ScrollView>
      <FAB
        style={styles.fab}
        color={colors.primary}
        icon="plus"
        onPress={
          () => navigation.navigate("EditScreen", { task: defaultSubject })
        }
      />
    </View>
  );
}
