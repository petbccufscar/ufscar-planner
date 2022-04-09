import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Pressable,
} from "react-native";
import { useTheme } from "react-native-paper";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { BWFont } from './ExpressionHelper';

export const hourHeight = hp("8%");
export const weekHeight = hp("9%");
export const weekBall = hp("3%");
export const weekDayBall = 40;
export const weekBallColor = "#f00";
export const hourWidth = wp("12.5%");
export const dividerHeight = 1;
export const dividerColor = "rgba(1, 1, 1, 0.4)";
export const cardLineWidth = 2;
export const timeWidth = wp("100%") - 7 * hourWidth;
export let bgColor = "#F8F8F8";
export let cinza = "#ddd";
export const subjectWidth = hourWidth * 0.9;

export const dayComponentMargin = 20;
export const dayComponentWidth = (wp("100%") - 2 * dayComponentMargin) / 7;
export const dayComponentHeight = wp("100%") / 7;

// É a barra da semana
export function Days(props) {
  const theme = useTheme();


  const width = props.width ?? weekBall;
  const height = props.height ?? weekBall;
  let days = [];
  const week = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

    let i = props.days["begin"];
    // Percorrendo os dias da semana
    do {
      days.push({
        date: i,
        title: week[i.getDay()],
        day: i.getDate(),
        today: props.selectedDay.getDay() == i.getDay(),
      });
      i = new Date(i.getTime() + 24 * 60 * 60 * 1000);
    } while (i.getDay() != props.days["end"].getDay());


    // Estilo
    const styles = StyleSheet.create({
      weekDays: {
        flexDirection: "row",
        justifyContent: "space-around",
        backgroundColor: theme.colors.primaryContainer,
      },
      semana: {
        height: hourHeight,
        width: wp("100%"),
        backgroundColor: bgColor,
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
      },
      planilha: {
        backgroundColor: bgColor,
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
      },
      scroll: {
        width: wp("100%"),
        backgroundColor: bgColor,
        flex: 1,
        flexGrow: 1,
      },
      column: {
        flexDirection: "column",
      },
      dias: {
        width: hourWidth,
        height: hourHeight,
        backgroundColor: 'transparent',
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "center",
      },
      circulo: {
        height: 24 * (hourHeight + dividerHeight),
        width: hourWidth,
        backgroundColor: bgColor,
      },
      horario: {
        height: 24 * (hourHeight + dividerHeight),
        width: hourWidth,
        backgroundColor: "#F4F",
      },
    });






    return (
      <View style={styles.weekDays}>
        {days.map((day, i) => {
          return (
            <Pressable
              onPress={() => props.setSelectedDay(day.date)}
              style={styles.dias}
              key={day.day}
            >
              <Text style={{color: theme.colors.onPrimaryContainer, fontWeight: 'bold', fontSize: 14, paddingBottom: 5}}>{day.title}</Text>
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  alignContent: "center",
                  width: width,
                  height: height,
                  borderRadius: 100,
                  backgroundColor: day.today ? theme.colors.primary : "transparent",
                }}
              >
                <Text
                  style={{ color: day.today ? theme.colors.onPrimary : theme.colors.onPrimaryContainer }}
                >
                  {day.day}
                </Text>
              </View>
            </Pressable>
          );
        })}
      </View>
    );
  
}
