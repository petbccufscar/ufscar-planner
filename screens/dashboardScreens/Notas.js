import React, { } from "react";
import {
  Text,
  View,
  StyleSheet,
} from "react-native";
import { useSelector } from "react-redux";
import { useTheme } from "react-native-paper";
import { NotaRender } from "../../components/EventCards";
import ScrollView from "../../components/ScrollView";

export default function NotasScreen() {
  const events = useSelector((state) => state.events).events;
  const classes = events.filter((e) => e.is_subject);
  const colors = useTheme().colors;

  const styles = StyleSheet.create({
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
            return <NotaRender
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
    </View>
  );
}
