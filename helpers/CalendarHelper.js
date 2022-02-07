import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Pressable,
} from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import {BWFont} from './ExpressionHelper';

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
  const width = props.width ?? weekBall;
  const height = props.height ?? weekBall;
  let days = [];
  const week = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
  if (props.days != null) {
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

    return (
      <>
        {days.map((day, i) => {
          return (
            <Pressable
              onPress={() => props.setSelectedDay(day.date)}
              style={styles.dias}
              key={day.day}
            >
              <Text>{day.title}</Text>
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  alignContent: "center",
                  width: width,
                  height: height,
                  borderRadius: 100,
                  backgroundColor: day.today ? weekBallColor : "transparent",
                }}
              >
                <Text
                  style={{ color: day.today ? BWFont(weekBallColor) : "#000" }}
                >
                  {day.day}
                </Text>
              </View>
            </Pressable>
          );
        })}
      </>
    );
  } else {
    return (
      //todo arrumar isso para deixar igual a outra barra
      <View
        style={{ ...styles.semana, justifyContent: "center", height: height }}
      >
        {week.map((weekDay, i) => {
          return (
            <WeekDay
              label={weekDay}
              height={height}
              width={width}
              key={i}
              active={false}
              today={false}
            />
          );
        })}
      </View>
    );
  }
}

export function WeekDay(props) {
  const width = props.width ?? weekDayBall;
  const height = props.height ?? weekDayBall;
  if (props.active)
    return (
      <View
        style={{
          backgroundColor: weekBallColor,
          width: width,
          height: height,
          borderRadius: 100,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ color: "#fff" }}>{props.label}</Text>
      </View>
    );
  else
    return (
      <View
        style={
          props.today == true
            ? {
              borderRadius: 100,
              borderWidth: 1,
              borderColor: weekBallColor,
              width: width,
              height: weekDayBall,
              alignItems: "center",
              justifyContent: "center",
            }
            : {
              width: width,
              height: weekDayBall,
              alignItems: "center",
              justifyContent: "center",
            }
        }
      >
        <Text style={{ color: "#000" }}>{props.label}</Text>
      </View>
    );
}


// Estilo
export const styles = StyleSheet.create({
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
    backgroundColor: bgColor,
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
