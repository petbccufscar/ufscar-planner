import { StatusBar } from 'expo-status-bar';
import { row } from 'mathjs';
import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { Provider, useDispatch, useSelector } from "react-redux";
import { BWFont, magic, getTime } from '../helpers/ExpressionHelper';
import { useNavigation } from "@react-navigation/core";
import { FAB } from 'react-native-paper';
import { defaultTask } from '../helpers/helper';

export default function Task() {

  let events = useSelector(state => state.events).events
  const navigation = useNavigation()
  events = events.filter(e => e.is_subject)
  return (<>
    <ScrollView style={styles.container}>
      <Text style={styles.sectionTitle}>Médias e frequências!</Text>
      {events.sort((a, b) => b.id - a.id).map((e, i) => (<MediaCard key={i} task={e} />))}

      <StatusBar style="auto" />
    </ScrollView>
    <FAB
    style={styles.fab}
    icon="plus"
    onPress={() => navigation.navigate("Event", { task: defaultTask })}
  />
  </>
  );
}

function freqColor(f) {
  // if(f > 0 && f <= 1) f *= 100
  if (f > 75)
    return '#00C853'
  if (f < 75)
    return '#E8243C'
  return '#FB8C00'
}

function mediaColor(m) {
  // if(m > 10) m /= 10
  if (m >= 6)
    return '#00C853'
  if (m < 5)
    return '#E8243C'
  return '#FB8C00'
}

function MediaCard(props) {
  const task = props.task
  const nome = task.name
  const codigo = task.description
  let media = 0
  let freq = 0
  const mediaform = task.mean
  const freqform = task.frequency

  const navigation = useNavigation();
  const edit = () => {
    navigation.navigate("Event", { task: task });
  };
  try {
    const meanRes = magic(task.grade.mean || {}, mediaform || "")
    media = (meanRes.result || 0)
  } catch (e) { }

  try {
    const freqRes = magic(task.grade.frequency || {}, freqform || "")
    freq = (freqRes.result || 0)
  } catch (e) { }
  if (freq > 0 && freq <= 1) freq *= 100
  // if(media > 10) media /= 10

  const [det, setDet] = useState(false)

  return (<View style={styles.mediaCard}>
    <TouchableOpacity onPress={edit} style={styles.box}>
      <View style={{ ...styles.row, width: '40%' }}>
        <View style={{ ...styles.square, backgroundColor: task.color }} />
        <View style={{ justifyContent: 'center' }}>
          <Text style={styles.subtitle}>{nome}</Text>
          <Text style={styles.normalText}>{codigo}</Text>
        </View>
      </View>
      <View style={{ width: '60%' }}>
        <View style={{ ...styles.row, justifyContent: 'space-around' }}>
          <View style={{ width: '40%' }}>
            <Text style={styles.subsubtitle}>Média</Text>
            <Text style={{ ...styles.grade, backgroundColor: mediaColor(media) }}>{media.toFixed(2)}</Text>
          </View>
          <View style={{ justifyContent: 'center', width: '40%' }}>
            <Text style={styles.subsubtitle}>Frequência</Text>
            <Text style={{ ...styles.grade, backgroundColor: freqColor(freq) }}>{freq.toFixed(0) + '%'}</Text>
          </View>
        </View>
        {!det && (<View style={{ flex: 1, justifyContent: 'flex-end' }}>
          <TouchableOpacity onPress={() => setDet(true)}>
            <Text style={styles.details}>Mais detalhes</Text>
          </TouchableOpacity>
        </View>)}
      </View>
    </TouchableOpacity>
    {det && (<>

      <Text style={{ ...styles.subsubtitle, textAlign: 'left', padding: 10 }}>
        {"Média = " + mediaform + "\nFreqûencia = " + freqform}
      </Text>
      <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
        <View style={{ width: '40%' }}>
          {Object.keys(task.grade.mean || []).map((e, i) =>
          (<View style={{ flexDirection: 'row', justifyContent: 'space-around' }} key={i}>
            <Text style={{ ...styles.subsubtitle, textAlign: 'center', textAlignVertical: 'center' }}>
              {e}
            </Text>
            <Text style={{ ...styles.grade, width: '40%', backgroundColor: mediaColor(task.grade.mean[e]) }}>
              {task.grade.mean[e]}
            </Text>
          </View>))}
        </View>
        <View style={{ width: '40%' }}>
          {Object.keys(task.grade.frequency || []).map((e, i) =>
          (<View style={{ flexDirection: 'row', justifyContent: 'space-around' }} key={i}>
            <Text style={{ ...styles.subsubtitle, textAlign: 'center', textAlignVertical: 'center' }}>
              {e}
            </Text>
            <Text style={{ ...styles.grade, width: '40%', backgroundColor: freqColor(task.grade.frequency[e]) }}>
              {task.grade.frequency[e]}
            </Text>
          </View>))}
        </View>
      </View>

      <View>
        <TouchableOpacity onPress={() => setDet(false)}>
          <Text style={styles.details}>Menos detalhes</Text>
        </TouchableOpacity>
      </View></>)}
  </View>)
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E5E5E5',
    padding: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 10,
    paddingBottom: 30,
    color: '#607D8B',
  },
  mediaCard: {
    padding: 15,
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: '#FFF'
  },
  box: {
    flexDirection: 'row',
    flexGrow: 1,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#607D8B",
    paddingRight: 5,
  }, subsubtitle: {
    fontSize: 12,
    fontWeight: "bold",
    textAlign: 'center',
    color: "#90A4AE",
    paddingRight: 5,
  },
  row: {
    flexDirection: 'row'
  },
  col: {
    flexDirection: 'column'
  },
  square: {
    width: 4,
    height: '100%',
    backgroundColor: "#55BCF6", // Definir como passar a cor da tarefa
    opacity: 0.4,
    borderRadius: 5,
    marginRight: 15,
  },
  details: {
    textAlign: "right",
    color: "lightblue",
    fontWeight: "bold",
    padding: 10,
    paddingBottom: 3
  },
  grade: {
    width: '100%',
    padding: 5,
    borderRadius: 5,
    color: 'white',
    textAlign: 'center',
    marginTop: 5
  },
  normalText: {
    fontSize: 10,
    color: '#90A4AE',
    marginTop: 5
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },

});
