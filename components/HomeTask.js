import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const Task = (props) => {
  return (
    <View style={styles.item}>
      <View style={styles.square}></View>
      <View style={styles.itemLeft}>
        <Text style={styles.itemTaskSubject}>
          {props.name}: {props.subject}
        </Text>
        <Text style={styles.itemDate}>Data: {props.datetime_init}</Text>
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

export default Task
