import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import {
  useTheme,
  FAB,
  Searchbar,
  Portal,
  Dialog,
  Button,
  Checkbox,
} from "react-native-paper";
import { EventRender } from "../../components/EventCards";
import { defaultTask } from "../../helpers/helper";
import { useNavigation } from "@react-navigation/native";
import ScrollView from "../../components/ScrollView";
import DropDown from "react-native-paper-dropdown";

export default function SubjectScreen() {
  const items = useSelector((state) => state.events).events;
  let events = items.filter((e) => !e.is_subject);
  const subjects = items.filter((e) => e.is_subject);
  const theme = useTheme();
  const colors = theme.colors;
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
  const [searchQuery, setSearchQuery] = React.useState("");

  if (searchQuery.length != 0) {
    events = events.filter((e) => {
      return e.name.toLowerCase().includes(searchQuery.toLowerCase());
    });
  }

  const [crescent, setCrescent] = useState(false);
  const crescentList = [
    { value: false, label: "Mais recente primeiro" },
    { value: true, label: "Mais antigo primeiro" },
  ];
  if (crescent) {
    events = events.sort((a, b) => {
      return a.id - b.id;
    });
  } else {
    events = events.sort((a, b) => {
      return b.id - a.id;
    });
  }

  const [subject, setSubject] = useState(null);
  let subjectList = [
    { value: null, label: "Mostrar tudo" },
  ];
  for (let i = 0; i < subjects.length; i++) {
    subjectList.push({ value: subjects[i].id, label: subjects[i].name });
  }

  if (subject != null) {
    events = events.filter((e) => {
      return e.subject == subject;
    });
  }

  const [showFisinshed, setShowFisinshed] = useState(true);

  if (!showFisinshed) {
    events = events.filter((e) => {
      return e.when_submit == null || e.is_submited != true;
    });
  }

  const [showFilter, setShowFilter] = useState(false);
  const onChangeSearch = (query) => setSearchQuery(query);


  const [dropOrd, setDropOrd] = useState(false);
  const [dropSub, setDropSub] = useState(false);

  return <View style={styles.scroll}>
    <View
      style={{
        margin: 10,
        marginHorizontal: 20,
        alignItems: "center",
        flexDirection: "row",
      }}
    >
      <View style={{ flexDirection: "row" }}>
        <Searchbar
          placeholder="Buscar"
          onChangeText={onChangeSearch}
          value={searchQuery}
          style={{
            elevation: 0,
            borderRadius: 10,
            backgroundColor: colors.surface,
          }}
          inputStyle={{ color: colors.onSurface }}
        /></View>
      <TouchableOpacity onPress={() => setShowFilter(true)} style={{
        backgroundColor: colors.surface,
        alignItems: "center",
        width: 30,
        top: 0,
        bottom: 0,
        right: 10,
        position: "absolute",
        justifyContent: "center",
      }}>
        <MaterialIcons name="filter-alt" size={24} color={colors.outline} />
      </TouchableOpacity>
    </View>
    <Portal>
      <Dialog
        style={{ backgroundColor: colors.dialog }}
        visible={showFilter}
        onDismiss={() => setShowFilter(false)}
      >
        <Dialog.Title>Aplique os filtros abaixo</Dialog.Title>
        <Dialog.Content>
          <DropDown
            label={"Ordenar por"}
            mode={"outlined"}
            visible={dropOrd}
            showDropDown={() => setDropOrd(true)}
            onDismiss={() => setDropOrd(false)}
            value={crescent}
            list={crescentList}
            setValue={setCrescent}
            theme={theme}

          />
          <DropDown
            label={"Filtrar por matéria"}
            mode={"outlined"}
            style={{ marginTop: 10 }}
            visible={dropSub}
            showDropDown={() => setDropSub(true)}
            onDismiss={() => setDropSub(false)}
            value={subject}
            list={subjectList}
            setValue={setSubject}
            theme={theme}

          />
          <View style={{ alignItems: "center", flexDirection: "row" }}>
            <Checkbox
              status={showFisinshed ? "checked" : "unchecked"}
              onPress={() => {
                setShowFisinshed(!showFisinshed);
              }}
            />
            <Text style={{ color: colors.onSurface }}>
              Mostrar eventos concluídos
            </Text>
          </View>


        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={() => setShowFilter(false)} style={{ padding: 10 }}>
            Ok
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>

    <ScrollView>
      <View style={styles.container}>
        {events.map((item, idx) => {
          return <EventRender acontecendo={false} key={idx} task={item} />;
        })}
        {
          events.length == 0 &&
          <Text style={{ fontSize: 20, color: colors.onSurface }}>
            Nenhum evento registrado
          </Text>
        }
      </View>

    </ScrollView>
    <FAB
      style={styles.fab}
      color={colors.primary}
      icon="plus"
      onPress={() => navigation.navigate("EditScreen", { task: defaultTask })}
    />
  </View>;
}
