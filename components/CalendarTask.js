import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export function Task (props) {
  const task = props.task
  return (
    <View style={styles.item}>
      <View style={{...styles.square, backgroundColor: task.color}}></View>
      <View style={styles.itemLeft}>
        <Text style={styles.itemTaskSubject}>
          {task.name}
        </Text>
        <Text style={styles.itemDate}> {new Date (task.detail.datetime_init).getHours()}h até  {new Date (task.detail.datetime_end).getHours()}h
        no {task.detail.local}
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  square: {
    width: 4,
    height: 50,
    backgroundColor: '#55BCF6', // Definir como passar a cor da tarefa
    opacity: 0.4,
    borderRadius: 5,
    marginRight: 15,
  },
  itemTaskSubject: {
    /* TODO fontFamily: '', */
    fontSize: 14,
    color: '#607D8B',
    paddingLeft: 5,
    width: '100%',
  },
  itemDate: {
    /* TODO fontFamily: '', */
    fontSize: 10,
    color: '#90A4AE',
    paddingTop: 5,
  },
})
