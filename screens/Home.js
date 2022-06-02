import React, { useState, useEffect } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Keyboard,
  Image,
  Linking

} from 'react-native'
import ScrollView from '../components/ScrollView'
import { MaterialIcons } from '@expo/vector-icons';
import Constants from 'expo-constants'
import { Task } from '../components/EventCards'
import Menu from '../components/HomeMenu'
import { useNavigation } from '@react-navigation/core'
import { Provider, useDispatch, useSelector } from "react-redux";
import { ThemeProvider } from "react-native-paper";
import { useTheme, FAB } from "react-native-paper";
import { defaultSubject, defaultTask } from "../helpers/helper";

const floorDate = (data) => {
  return (
    data.getFullYear() +
    "-" +
    (data.getMonth() + 1).toString().padStart(2, "0") +
    "-" +
    data.getDate().toString().padStart(2, "0")
  );
};

export default function App() {
  const today = floorDate(new Date());
  const items = useSelector((state) => state.cards).items;
  const classes = (items[today] || []).filter((e) => e.is_subject);
  const [acontecendoAgora, setAcontecendoAgora] = useState([]);
  const navigation = useNavigation();
  let tasks = [];
  const keys = Object.keys(items).sort();
  const initial = keys.findIndex((e) => e == today);
  for (let j = initial; j < keys.length && j >= 0; j++) {
    tasks = [...tasks, ...items[keys[j]].filter((e) => !e.is_subject && floorDate(new Date(e.detail.datetime_init)) == today)];
  }
  const nome = useSelector((state) => state.user).user.name;
  const theme = useTheme();

  function calculateAcontecendoAgora() {
    const aux1 = classes.filter((e) => {
      return new Date(e.detail.datetime_init) <= new Date() && new Date(e.detail.datetime_end) >= new Date()
    })
    const aux2 = tasks.filter((e) => {

      return new Date(e.detail.datetime_init) <= new Date() && new Date(e.detail.datetime_end) >= new Date()

    })
    const aux3 = [...aux1, ...aux2]
    if (JSON.stringify(acontecendoAgora) != JSON.stringify(aux3)) {
      setAcontecendoAgora(aux3)
    }
  }
  setInterval(calculateAcontecendoAgora, 60 * 1000);
  useEffect(() => {
    calculateAcontecendoAgora()
  }, [items])

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.surface1,
    },
    tasksWrapper: {
      padding: 20,
    },
    sectionTitle: {
      fontSize: 30,
      color: theme.colors.onSurface,
    },
    items: {
      marginTop: 10,
    },
    infoRow: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 10,
    },
    infoText: {
      color: theme.colors.primary,
      marginLeft: 10,
    },
    fab: {
      borderRadius: 10,
      backgroundColor: theme.colors.surface3,
    },
    activedFAB: {
      borderRadius: 10,
      backgroundColor: theme.colors.primary,
    },

  });

  const [state, setState] = React.useState({ open: false });
  const onStateChange = ({ open }) => setState({ open });
  const { open } = state;


  return (
    <>
      <View style={styles.container}>
        {/* Added this scroll view to enable scrolling when list gets longer than the page */}
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
          }}
          keyboardShouldPersistTaps="handled"
        >
          {/* Today's Tasks */}
          <View style={styles.tasksWrapper}>
            <Text style={styles.sectionTitle}>Olá, {nome}</Text>
            <AcontecendoAgora list={acontecendoAgora} />
            {classes.length + tasks.length == 0 && (
                <View style={{...styles.infoRow, paddingVertical:30, paddingHorizontal:30,borderRadius:10, backgroundColor: theme.colors.surface, justifyContent:'center', marginVertical:20}}>
                <MaterialIcons name="info" size={24} color={theme.colors.primary} />
                <Text style={{...styles.infoText}}>Não há nenhuma atividade agendada para hoje.</Text>
              </View>

            )}
            {classes.length + tasks.length > 0 && (<><View style={styles.infoRow}>
              <MaterialIcons name="info" size={24} color={theme.colors.primary} />
              <Text style={styles.infoText}>Estas são as suas atividades para hoje.</Text>
            </View>
            <Text style={styles.sectionTitle}>Aulas de hoje</Text>
            {classes.length == 0 && (<View style={styles.infoRow}>
              <MaterialIcons name="info" size={24} color={theme.colors.primary} />
              <Text style={styles.infoText}>Não há aulas para hoje.</Text>
            </View>)
            }
            {classes.map((item, idx) => {
              return <Task acontecendo={acontecendoAgora.includes(item)} key={idx} task={item} />;
            })}

            <Text style={styles.sectionTitle}>Eventos de hoje</Text>
            {tasks.length == 0 && (<View style={styles.infoRow}>
              <MaterialIcons name="info" size={24} color={theme.colors.primary} />
              <Text style={styles.infoText}>Não há eventos para hoje.</Text>
            </View>)
            }
            <View style={styles.items}>
              {tasks.map((item, idx) => {
                return <Task acontecendo={acontecendoAgora.includes(item)} key={idx} task={item} show={false} />;
              })}
            </View></>)}
          </View>
        </ScrollView>
      </View>
      <FAB.Group
        open={open}
        icon={"plus"}
        fabStyle={open ? { width: 0, height: 0 } : styles.fab}
        visible={!open}
        color={theme.colors.primary}
        actions={[
          {
            icon: "book",
            label: "Matéria",
            style: styles.fab,
            color: theme.colors.primary,
            onPress: () =>
              navigation.navigate("EditScreen", { task: defaultSubject }),
          },
          {
            icon: "calendar",
            label: "Evento",
            style: styles.activedFAB,
            color: theme.colors.onPrimary,
            onPress: () =>
              navigation.navigate("EditScreen", { task: defaultTask }),
            small: false,
          },
        ]}
        onStateChange={onStateChange}
      />
    </>
  );
}


function AcontecendoAgora(props) {

  const colors = useTheme().colors;
  const mapsSrc = require('../assets/icons/maps.png')
  const list = props.list
  const user = useSelector((state) => state.user).user

  const styles = StyleSheet.create({
    hourglassContainer: {
      borderRadius: 12,
      backgroundColor: colors.primary,
      alignItems: "center",
      justifyContent: "center",
      width: 36,
      height: 36,
    },
    acontecendoAgoraRow: {
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "center",
    },
    localContainer: {
      borderWidth: 1,
      borderColor: colors.outline,
      borderRadius: 8,
      backgroundColor: colors.surface,
      flexDirection: 'row',
      padding: 5,
      paddingRight: 10,
    },
    emptyflex: {
    },
    localView: {
      flexDirection: 'row'
    },
    acontecendoAgoraContainer: {
      borderRadius: 12,
      backgroundColor: colors.primaryContainer,
      padding: 10,
      marginVertical: 10
    },
    acontecendoAgoraText: {
      color: colors.onPrimaryContainer,
      marginVertical: 10,
      fontSize: 20,

    },
    acontecendoAgoraMapsIcon: {
      width: 24,
      height: 24,
    },
    acontecendoAgoraTitle: {
      fontSize: 24,
      paddingLeft: 10,
      color: colors.primary,
    }
  })
  if (list.length == 0)
    return null
  return (<View style={styles.acontecendoAgoraContainer}>
    <View style={styles.acontecendoAgoraRow}>
      <View style={styles.hourglassContainer}>
        <MaterialIcons name="hourglass-bottom" size={24} color={colors.onPrimary} />
      </View>
      <Text style={styles.acontecendoAgoraTitle}>Acontecendo agora</Text>
    </View>
    {list.map((item, idx) => {
      return (<View key={idx}><Text style={styles.acontecendoAgoraText}>{item.name}</Text>
        <View style={styles.localView}>

          {item.detail.local.length > 0 && (<><TouchableOpacity style={styles.localContainer}
            onPress={async () => {
            let place = user.campus + ", UFSCAR, " + item.detail.local;

            const url =
              "https://www.google.com/maps/search/?api=1&query=" +
              encodeURI(place);


            try {
              await Linking.openURL(url);
            } catch (e){
              console.log(e)
            }

            }}>
            <Image style={styles.acontecendoAgoraMapsIcon} source={mapsSrc} />
            <Text style={{ color: colors.onSurface }}>
              {item.detail.local}
            </Text>
          </TouchableOpacity>
            <View style={styles.emptyflex} /></>)}

        </View></View>)
    })}
  </View>)
}
