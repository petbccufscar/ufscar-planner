import React, { useState } from 'react'
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Keyboard,
  ScrollView,
} from 'react-native'
import { Appbar } from 'react-native-paper'
import Constants from 'expo-constants'
import Task from '../components/HomeTask'
import Class from '../components/HomeClass'
import Menu from '../components/HomeMenu'

export default function App() {
  const [task, setTask] = useState()
  const [subject, setSubject] = useState()
  const [date, setDate] = useState()
  const [taskItems, setTaskItems] = useState([])
  const [subjectItems, setSubjectItems] = useState([])
  const [dateItems, setDateItems] = useState([])
  let items = [[]]

  const handleAddTask = () => {
    Keyboard.dismiss()
    setTaskItems([...taskItems, task])
    setTask(null)
    setSubjectItems([...subjectItems, subject])
    setSubject(null)
    setDateItems([...dateItems, date])
    setDate(null)
  }

  const completeTask = (index) => {
    // Apaga as task
    let itemsTaskCopy = [...taskItems]
    itemsTaskCopy.splice(index, 1)
    setTaskItems(itemsTaskCopy)

    // Apaga os subject
    let itemsSubjectCopy = [...taskItems]
    itemsSubjectCopy.splice(index, 1)
    setSubjectItems(itemsSubjectCopy)

    // Apaga as dates
    let itemsDateCopy = [...dateItems]
    itemsDateCopy.splice(index, 1)
    setDateItems(itemsDateCopy)
  }

  return (
    <>
      <Appbar.Header statusBarHeight={Constants.statusBarHeight}>
        <Appbar.Action icon='menu' onPress={() => {}} />
        <Appbar.Content title='Home' />
        <Appbar.Action icon='home' onPress={() => {}} />
      </Appbar.Header>
      <View style={styles.container}>
        {/* Added this scroll view to enable scrolling when list gets longer than the page */}
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
          }}
          keyboardShouldPersistTaps='handled'
        >
          {/* Today's Tasks */}
          <View style={styles.tasksWrapper}>
            <Text style={styles.sectionTitle}>Olá, {'fulan@'}!</Text>
            <Text style={styles.sectionTitle}>Proxima Tarefa</Text>
            <View style={styles.items}>
              <Task
                subject={'Construção de Algoritmos e Programação'}
                task={'Prova 1'}
                date={'25/09'}
              />
              <Task
                subject={'Construção de Algoritmos e Programação'}
                task={'Trabalho de implementação 1'}
                date={'25/10'}
              />
              <Task
                subject={'Cálculo 1'}
                task={'Questionário 1'}
                date={'25/11'}
              />
              {/* This is where the tasks will go! */}
              {taskItems.map((task, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => completeTask(index)}
                  >
                    <Task
                      task={task}
                      subject={subjectItems[index]}
                      date={dateItems[index]}
                    />
                  </TouchableOpacity>
                )
              })}
            </View>
            <Text style={styles.sectionTitle}>Aulas do dia</Text>
            <Class
              subject={'Construção de Algoritmos e Programação'}
              local={'AT-7'}
              time={'14:00'}
            />
            <Class subject={'Cálculo 1'} local={'AT-5'} time={'16:00'} />
            <Text style={styles.sectionTitle}>Cardápio</Text>
            <Menu
              mealTime={'Almoço'}
              mainMeal={'Frango Xadrez'}
              garrison={'Batatas Cozidas'}
              rice={'Arroz branco e integral'}
              bean={'Feijão Preto'}
              salad={'Alface e tomate'}
              desert={'Paçoquinha'}
              drinks={'Nenhuma'}
              price={'RS 5,20'}
            ></Menu>
          </View>
        </ScrollView>

        {/* Write a task */}
        {/* Uses a keyboard avoiding view which ensures the keyboard does not cover the items on screen */}
        {/* <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.writeTaskWrapper}
        >
          <TextInput
            style={styles.input}
            placeholder={'Tarefa'}
            value={task}
            onChangeText={(textTask) => setTask(textTask)}
          />
          <TextInput
            style={styles.input}
            placeholder={'Materia'}
            value={subject}
            onChangeText={(textSubject) => setSubject(textSubject)}
          />
          <TextInput
            style={styles.input}
            placeholder={'Data'}
            value={date}
            onChangeText={(textDate) => setDate(textDate)}
          />
          <TouchableOpacity onPress={() => handleAddTask()}>
            <View style={styles.addWrapper}>
              <Text style={styles.addText}>+</Text>
            </View>
          </TouchableOpacity>
        </KeyboardAvoidingView> */}
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E5E5E5',
  },
  tasksWrapper: {
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 15,
    color: '#607D8B',
  },
  items: {
    marginTop: 30,
  },
  writeTaskWrapper: {
    position: 'absolute',
    bottom: 30,
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    width: 250,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,
  },
  addText: {},
})
