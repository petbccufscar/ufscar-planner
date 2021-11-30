import React, { useEffect, useState } from "react";
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Alert,
  StyleSheet,
  LayoutAnimation,
} from "react-native";
import { Button, IconButton } from "react-native-paper";

export default function Event({ route, navigation }) {
  const { task } = route.params;
  const [editMode, setEditMode] = useState(false);
  const [details, setDetails] = useState(task.details);
  const [frequency, setFrequency] = useState(task.frequency);
  const [mean, setMean] = useState(task.mean);
  const [notifications, setNotifications] = useState(task.notification);
  const [description, setDescription] = useState(task.description);
  const week = [
    "Domingo",
    "Segunda",
    "Terça",
    "Quarta",
    "Quinta",
    "Sexta",
    "Sábado",
  ];

  console.log(route.params);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: task.name,
      headerRight: () => (
        <IconButton
          icon={editMode ? "check" : "pencil"}
          color="white"
          size={24}
          onPress={() => {
            LayoutAnimation.configureNext({
              duration: 200,
              create: {
                type: LayoutAnimation.Types.easeIn,
                property: LayoutAnimation.Properties.opacity,
              },
              update: {
                type: LayoutAnimation.Types.easeOut,
              },
            });
            setEditMode(!editMode);
          }}
        />
      ),
    });
  }, [route.params, editMode]);

  function getTime(totalMinutes) {
    const days = parseInt(totalMinutes / 60 / 24);
    const hours = parseInt((totalMinutes / 60) % 24);
    const minutes = parseInt(totalMinutes % 60);

    const daysLabel =
      days > 0
        ? days + " dia" + (days > 1 ? "s" : "") + (hours || minutes ? ", " : "")
        : "";
    const hoursLabel =
      hours > 0
        ? hours + " hora" + (hours > 1 ? "s" : "") + (minutes ? " e " : "")
        : "";
    const minutesLabel =
      minutes > 0 ? minutes + " minuto" + (minutes > 1 ? "s" : "") : "";

    return `${daysLabel}${hoursLabel}${minutesLabel} antes`;
  }

  function sortDetails(a, b) {
    if (a.day < b.day) return -1;
    if (a.day > b.day) return 1;
    if (a.day == b.day) {
      if (a.startTime < b.startTime) return -1;
      if (a.startTime > b.startTime) return 1;
    }
    return 0;
  }

  function formatHour(date) {
    const dateFormat = new Date(date);
    return (
      ("0" + dateFormat.getHours()).slice(-2) +
      ":" +
      ("0" + dateFormat.getMinutes()).slice(-2)
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.sectionContainer}>
        <View style={styles.sectionIcon}>
          <IconButton icon="calendar" color="#007cc1" size={30} />
        </View>
        <View style={styles.details}>
          {details.sort(sortDetails).map((detail, index) => (
            <View key={index} style={styles.detail}>
              <View>
                <Text>{`${week[detail.day]}, ${detail.local}`}</Text>
                <Text>{`${formatHour(detail.datetime_init)} - ${formatHour(
                  detail.datetime_end
                )}`}</Text>
              </View>
              {editMode && (
                <IconButton
                  style={styles.xButton}
                  icon="close"
                  color="black"
                  onPress={() => {}}
                  size={18}
                />
              )}
            </View>
          ))}
          {editMode && (
            <View style={styles.action}>
              <Button
                onPress={() => {}}
                labelStyle={styles.actionButtonLabel}
                style={styles.actionButton}
              >
                Adicionar horário
              </Button>
            </View>
          )}
        </View>
      </View>

      <View style={styles.sectionContainer}>
        <View style={styles.sectionIcon}>
          <IconButton icon="book-open" color="#007cc1" size={30} />
        </View>
        <View style={styles.meanAndFrequency}>
          <Text>Média = {mean}</Text>
          <Text>Frequência = {frequency}</Text>
        </View>
      </View>

      <View style={styles.sectionContainer}>
        <View style={styles.sectionIcon}>
          <IconButton icon="bell-ring" color="#007cc1" size={30} />
        </View>
        <View style={styles.reminder}>
          {notifications.map((notification, index) => (
            <View key={index} style={styles.notification}>
              <Text>{getTime(notification)}</Text>
              {editMode && (
                <IconButton
                  style={styles.xButton}
                  icon="close"
                  color="black"
                  onPress={() => {}}
                  size={18}
                />
              )}
            </View>
          ))}
          {editMode && (
            <View style={styles.action}>
              <Button
                onPress={() => {}}
                labelStyle={styles.actionButtonLabel}
                style={styles.actionButton}
              >
                Adicionar lembrete
              </Button>
            </View>
          )}
        </View>
      </View>

      <View style={styles.sectionContainer}>
        <View style={styles.sectionIcon}>
          <IconButton icon="comment-text" color="#007cc1" size={30} />
        </View>
        <View style={styles.description}>
          <Text>{description}</Text>
          {editMode && (
            <IconButton
              style={styles.xButton}
              icon="close"
              color="black"
              onPress={() => {}}
              size={18}
            />
          )}
        </View>
      </View>
      {editMode && (
        <View style={styles.action}>
          <Button
            onPress={() => {}}
            labelStyle={styles.actionButtonLabel}
            style={[styles.actionButton, styles.deleteButton]}
          >
            Deletar Matéria
          </Button>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  sectionContainer: {
    flexDirection: "row",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },

  sectionIcon: {
    marginTop: -10,
  },

  details: {
    flex: 1,
  },

  xButton: {
    marginLeft: "auto",
  },

  detail: {
    marginBottom: 20,
    flexDirection: "row",
  },

  reminder: {
    flex: 1,
  },

  notification: {
    marginBottom: 20,
    flexDirection: "row",
    height: 40,
    alignContent: "center",
    alignItems: "center",
  },

  description: {
    flex: 1,
    flexDirection: "row",
  },

  actionButton: {
    backgroundColor: "#e8243c",
    borderRadius: 10,
    width: 200,
  },

  deleteButton: {
    margin: 20,
    width: "50%",
    alignSelf: "center",
  },

  actionButtonLabel: {
    color: "white",
  },
});
