import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
} from 'react-native'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen'
import React, { Fragment } from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { IconButton, Colors } from 'react-native-paper'

// Esse será o componente principal, que vai gerenciar qual modo de calendário
export function CalendarComponent(props) {
  const tasks = [
    [
      {
        color: '#400',
        initTime: { hour: 3, minute: 0 },
        endTime: { hour: 4, minute: 0 },
        name: 'Organização e Recuperação da Informação e muito mais informação',
        local: 'AT5 - xx',
      },
      {
        color: '#ef1',
        initTime: { hour: 21, minute: 0 },
        endTime: { hour: 23, minute: 1 },
        name: 'Matéria X',
        local: 'AT5 - xx',
      },
    ],
    [
      {
        color: '#444',
        initTime: { hour: 1, minute: 0 },
        endTime: { hour: 4, minute: 0 },
        name: 'Matéria X',
        local: 'AT5 - xx',
      },
      {
        color: '#ef1',
        initTime: { hour: 20, minute: 0 },
        endTime: { hour: 21, minute: 0 },
        name: 'Matéria X',
        local: 'AT5 - xx',
      },
    ],
    [
      {
        color: '#444',
        initTime: { hour: 1, minute: 0 },
        endTime: { hour: 4, minute: 0 },
        name: 'Matéria X',
        local: 'AT5 - xx',
      },
      {
        color: '#ef1',
        initTime: { hour: 20, minute: 0 },
        endTime: { hour: 23, minute: 0 },
        name: 'Matéria X',
        local: 'AT5 - xx',
      },
    ],
    [
      {
        color: '#400',
        initTime: { hour: 2, minute: 0 },
        endTime: { hour: 3, minute: 0 },
        name: 'Matéria ',
        local: 'AT5 - xx',
      },
      {
        color: '#ef1',
        initTime: { hour: 22, minute: 0 },
        endTime: { hour: 22, minute: 50 },
        name: 'Matéria H',
        local: 'AT5 - xx',
      },
    ],
    [],
    // [{ color: "#f00", initTime: { hour: 0, minute: 0 }, endTime: { hour: 23, minute: 59 }, name: "Matéria X", local: 'AT5 - xx' },],
    [
      {
        color: '#f00',
        initTime: { hour: 0, minute: 0 },
        endTime: { hour: 23, minute: 59 },
        name: 'Matéria X',
        local: 'AT5 - xx',
      },
    ],
    [
      {
        color: '#f00',
        initTime: { hour: 0, minute: 0 },
        endTime: { hour: 23, minute: 59 },
        name: 'Matéria X',
        local: 'AT5 - xx',
      },
    ],
  ]
  switch (props.mode) {
    case 0:
      return <CalendarWeek tasks={tasks} />
    case 1:
      return <CalendarDay tasks={tasks} />
    default:
      return <CalendarWeek tasks={tasks} />
  }
}

const hourHeight = hp('8%')
const weekHeight = hp('9%')
const weekBall = hp('3%')
const weekDayBall = 40
const weekBallColor = '#f00'
const hourWidth = wp('12.5%')
const dividerHeight = 1
const dividerColor = 'rgba(1, 1, 1, 0.4)'
const cardLineWidth = 2
const timeWidth = wp('100%') - 7 * hourWidth
let bgColor = '#F8F8F8'
let cinza = '#ddd'
const subjectWidth = hourWidth * 0.9

const WeekTab = createMaterialTopTabNavigator()
function CalendarDay(props) {
  let tasks = props.tasks
  return (
    <View style={{ backgroundColor: '#000', width: wp('100%'), flexGrow: 1 }}>
      <WeekTab.Navigator
        initialRouteName='Dom'
        tabBar={(props) => <MyTabBar {...props} />}
      >
        <WeekTab.Screen name='Dom'>
          {() => <CardsTimeline tasks={tasks[0]} />}
        </WeekTab.Screen>
        <WeekTab.Screen name='Seg'>
          {() => <CardsTimeline tasks={tasks[1]} />}
        </WeekTab.Screen>
        <WeekTab.Screen name='Ter'>
          {() => <CardsTimeline tasks={tasks[2]} />}
        </WeekTab.Screen>
        <WeekTab.Screen name='Qua'>
          {() => <CardsTimeline tasks={tasks[3]} />}
        </WeekTab.Screen>
        <WeekTab.Screen name='Qui'>
          {() => <CardsTimeline tasks={tasks[4]} />}
        </WeekTab.Screen>
        <WeekTab.Screen name='Sex'>
          {() => <CardsTimeline tasks={tasks[5]} />}
        </WeekTab.Screen>
        <WeekTab.Screen name='Sáb'>
          {() => <CardsTimeline tasks={tasks[6]} />}
        </WeekTab.Screen>
      </WeekTab.Navigator>
    </View>
  )
}
function MyTabBar({ state, descriptors, navigation }) {
  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: bgColor,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key]
        const label = route.name

        const isFocused = state.index === index

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          })

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name)
          }
        }

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          })
        }

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole='button'
            accessibilityStates={isFocused ? ['selected'] : []}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ flex: 1, alignItems: 'center' }}
          >
            <WeekDay label={label} active={isFocused} />
          </TouchableOpacity>
        )
      })}
    </View>
  )
}

function Random() {
  const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16)
  return (
    <View
      style={{ backgroundColor: randomColor, flex: 1, width: wp('100%') }}
    />
  )
}

function WeekDay(props) {
  if (props.active)
    return (
      <View
        style={{
          backgroundColor: weekBallColor,
          width: weekDayBall,
          height: weekDayBall,
          borderRadius: 100,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text style={{ color: '#fff' }}>{props.label}</Text>
      </View>
    )
  else
    return (
      <View
        style={{
          width: weekDayBall,
          height: weekDayBall,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text style={{ color: '#000' }}>{props.label}</Text>
      </View>
    )
}

// Calendário modo semana
function CalendarWeek(props) {
  let tasks = props.tasks
  const days = { begin: 20, end: 26, today: 23 }

  return (
    <>
      <View style={styles.semana}>
        <View style={(styles.dias, { width: timeWidth })} />
        <Days days={days} />
      </View>
      <ScrollView style={styles.scroll} scrollEnabled={true}>
        <View style={styles.planilha}>
          <ColunaHora />
          <Grid />
          <Coluna tasks={tasks[0]} columnIndex={0} />
          <Coluna tasks={tasks[1]} columnIndex={1} />
          <Coluna tasks={tasks[2]} columnIndex={2} />
          <Coluna tasks={tasks[3]} columnIndex={3} />
          <Coluna tasks={tasks[4]} columnIndex={4} />
          <Coluna tasks={tasks[5]} columnIndex={5} />
          <Coluna tasks={tasks[5]} columnIndex={6} />
        </View>
      </ScrollView>
    </>
  )
}

// É a barra da semana
function Days(props) {
  let days = []
  const week = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']

  for (let i = props.days['begin']; i <= props.days['end']; i++) {
    days.push({
      title: week[i - props.days['begin']],
      day: i,
      today: props.days['today'] == i,
    })
  }
  return (
    <>
      {days.map((day, i) => {
        return (
          <View style={styles.dias} key={i}>
            <Text>{day.title}</Text>
            <View
              style={{
                alignItems: 'center',
                width: weekBall,
                height: weekBall,
                borderRadius: 100,
                backgroundColor: day.today ? weekBallColor : 'tansparent',
              }}
            >
              <Text
                style={{ color: day.today ? BWFont(weekBallColor) : '#000' }}
              >
                {day.day}
              </Text>
            </View>
          </View>
        )
      })}
    </>
  )
}

// Instancia e posiciona as Tarefas
function Coluna(props) {
  const tasks = props.tasks
  if (tasks.length != 0) {
    return (
      <View style={(styles.column, { position: 'absolute', top: 13 })}>
        {tasks.map((task, i) => {
          return <Task task={task} columnIndex={props.columnIndex} key={i} />
        })}
      </View>
    )
  } else {
    return <></>
  }
}

// É a coluna da hora
function ColunaHora(props) {
  let initialTime = { hour: 0, minute: 0 }
  let finalTime = { hour: 23, minute: 59 }

  let fillers = thinkFiller0(initialTime, finalTime, false)
  return (
    <View style={(styles.column, { paddingTop: 13 })}>
      {fillers.map((space, i) => {
        return (
          <Space
            space={space}
            width={timeWidth}
            text={space.hour + 'h00'}
            key={i}
            hasDivider={false}
            transparent={true}
          />
        )
      })}
    </View>
  )
}

// Constrói o campo de linhas que fica no fundo
function Grid(props) {
  let initialTime = { hour: 0, minute: 0 }
  let finalTime = { hour: 23, minute: 59 }

  let fillers = thinkFiller0(initialTime, finalTime, true)
  return (
    <View
      style={
        (styles.column,
        { zIndex: 1, backgroundColor: bgColor, top: 0, paddingTop: 13 })
      }
    >
      {fillers.map((space, i) => {
        return (
          <Space space={space} width={wp('100%')} key={i} hasDivider={true} />
        )
      })}
    </View>
  )
}

// Função que decide o tamanho de cada space e o que tem nele
function thinkFiller0(divider) {
  let result = []
  for (let i = 0; i < 24; i++) {
    result.push({
      size: hourHeight,
      divider: divider,
      hour: i,
    })
  }
  return result
}

function CardsTimeline(props) {
  const last = props.tasks.length - 1
  const first = props.tasks.length > 0 ? props.tasks[0].initTime : null
  return (
    <View style={{ marginTop: 10 }}>
      <HorarioLivre final={first} />
      {props.tasks.map((task, index) => {
        return (
          <View key={index}>
            <Card task={task} key={index} />
            <HorarioLivre
              initial={task.endTime}
              final={index < last ? props.tasks[index + 1].initTime : null}
            />
          </View>
        )
      })}
    </View>
  )
}

function HorarioLivre(props) {
  let inicio = { hour: 0, minute: 0 },
    final = { hour: 23, minute: 59 }
  if (props.initial != null) {
    if (props.initial.minute == 59 && props.initial.hour == 23) {
      return <></>
    } else if (props.initial.minute == 59) {
      inicio.minute = 0
      inicio.hour = props.initial.hour + 1
    } else {
      inicio.minute = props.initial.minute + 1
      inicio.hour = props.initial.hour
    }
  }
  if (props.final != null) {
    if (props.final.minute == 0 && props.final.hour == 0) {
      return <></>
    } else if (props.final.minute == 0) {
      final.minute = 59
      final.hour = props.final.hour - 1
    } else {
      final.minute = props.final.minute - 1
      final.hour = props.final.hour
    }
  }
  const finalStr =
    final.hour.toString().padStart(2, '0') +
    'h' +
    final.minute.toString().padStart(2, '0')
  const inicioStr =
    inicio.hour.toString().padStart(2, '0') +
    'h' +
    inicio.minute.toString().padStart(2, '0')
  return (
    <View
      style={{
        flexDirection: 'row',
        height: wp('17%'),
        borderBottomWidth: 1,
        borderBottomColor: cinza,
        backgroundColor: bgColor,
      }}
    >
      <View
        style={{
          width: wp('17%'),
          justifyContent: 'center',
          alignItems: 'center',
          borderRightWidth: cardLineWidth,
          borderRightColor: cinza,
        }}
      >
        <Text style={{ fontSize: 17, padding: 5 }}>{inicioStr}</Text>
        <Text style={{ fontSize: 13 }}>{finalStr}</Text>
      </View>
      <View style={{ justifyContent: 'center', flex: 1, padding: 10 }}>
        <Text>Horário Livre</Text>
      </View>
      <View style={{ alignItems: 'flex-end', justifyContent: 'flex-end' }}>
        <IconButton
          icon='plus-circle'
          color={'#616161'}
          size={20}
          onPress={() => console.log('Adicionar evento')}
        />
      </View>
    </View>
  )
}

function Card(props) {
  const finalStr =
    props.task.endTime.hour.toString().padStart(2, '0') +
    'h' +
    props.task.endTime.minute.toString().padStart(2, '0')
  const inicioStr =
    props.task.initTime.hour.toString().padStart(2, '0') +
    'h' +
    props.task.initTime.minute.toString().padStart(2, '0')
  const cor = props.task.color == null ? cinza : props.task.color
  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          height: wp('17%'),
          borderBottomWidth: 1,
          borderBottomColor: cinza,
          backgroundColor: bgColor,
        }}
      >
        <View
          style={{
            width: wp('17%'),
            justifyContent: 'center',
            alignItems: 'center',
            borderRightWidth: cardLineWidth,
            borderRightColor: cor,
          }}
        >
          <Text style={{ fontSize: 17, padding: 5 }}>{inicioStr}</Text>
          <Text style={{ fontSize: 13 }}>{finalStr}</Text>
        </View>
        <View
          style={{
            justifyContent: 'center',
            height: wp('17%'),
            flex: 1,
            padding: 10,
          }}
        >
          <Text
            style={{
              height: wp('17%') - 30,
              overflow: 'hidden',
              flexWrap: 'wrap',
              textAlignVertical: 'center',
            }}
          >
            {props.task.name}
          </Text>
          <Text style={{ height: 30 }}>{props.task.local}</Text>
        </View>
        <View style={{ alignItems: 'flex-end', justifyContent: 'flex-end' }}>
          <IconButton
            icon='chevron-right'
            color={'#616161'}
            size={20}
            onPress={() => console.log('Editar evento')}
          />
        </View>
      </View>
    </>
  )
}
// É basicamente uma linha em branco, com ou sem hora, com ou sem divisor
function Space(props) {
  const size = props.space['size']
  const divider = props.space['divider']
  const width = props.width == null ? hourWidth : props.width

  if (divider) {
    return (
      <View
        style={
          (styles.column,
          {
            borderTopWidth: props.hasDivider == null ? 0 : 1,
            borderColor: dividerColor,
          })
        }
      >
        <View
          style={{
            backgroundColor: props.transparent ? 'transparent' : bgColor,
            height: size - 1,
            width: width,
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            padding: 0,
          }}
        >
          <Text
            style={{ justifyContent: 'center', position: 'absolute', top: -13 }}
          >
            {props.text}
          </Text>
        </View>
      </View>
    )
  } else {
    return (
      <View
        style={{
          backgroundColor: props.transparent ? 'transparent' : bgColor,
          height: size,
          width: width,
          backgroundColor: bgColor,
          alignItems: 'center',
          justifyContent: 'center',
          padding: 0,
        }}
      >
        <Text
          style={{ justifyContent: 'center', position: 'absolute', top: -13 }}
        >
          {props.text}
        </Text>
      </View>
    )
  }
}

// Card das Tarefas
function Task(props) {
  const task = props.task

  const posmin = task.initTime.hour * 60 + task.initTime.minute

  const minutes = task.endTime.hour * 60 + task.endTime.minute - posmin
  const size = (minutes / 60) * hourHeight

  const index = props.columnIndex
  return (
    <View
      style={{
        height: size,
        width: subjectWidth,
        backgroundColor: task.color,
        borderRadius: 5,
        padding: 0,
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        alignSelf: 'center',
        position: 'absolute',
        zIndex: 2,
        left: timeWidth + hourWidth * props.columnIndex,
        top: (posmin / 60) * hourHeight,
      }}
    >
      <Text
        style={{
          color: BWFont(task.color),
          margin: 2,
          fontSize: 14,
          textAlign: 'justify',
          padding: 0,
        }}
      >
        {task.name}
      </Text>
    </View>
  )
}

// Estilo
const styles = StyleSheet.create({
  semana: {
    height: hourHeight,
    width: wp('100%'),
    backgroundColor: bgColor,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  planilha: {
    backgroundColor: bgColor,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  scroll: {
    width: wp('100%'),
    backgroundColor: bgColor,
    flex: 1,
    flexGrow: 1,
  },
  column: {
    flexDirection: 'column',
  },
  dias: {
    width: hourWidth,
    height: weekHeight,
    backgroundColor: bgColor,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  circulo: {
    height: 24 * (hourHeight + dividerHeight),
    width: hourWidth,
    backgroundColor: bgColor,
  },
  horario: {
    height: 24 * (hourHeight + dividerHeight),
    width: hourWidth,
    backgroundColor: '#F4F',
  },
})

// Função que decide a cor da fonte com base na cor de fundo
function BWFont(backgroundColor) {
  let r = 0,
    g = 0,
    b = 0

  // Converte cor em hex para decimal
  if (backgroundColor.length == 4) {
    r = parseInt(
      '0x' + backgroundColor.substring(1, 2) + backgroundColor.substring(1, 2)
    )
    g = parseInt(
      '0x' + backgroundColor.substring(2, 3) + backgroundColor.substring(2, 3)
    )
    b = parseInt(
      '0x' + backgroundColor.substring(3, 4) + backgroundColor.substring(3, 4)
    )
  }
  if (backgroundColor.length == 7) {
    r = parseInt('0x' + backgroundColor.substring(1, 3))
    g = parseInt('0x' + backgroundColor.substring(3, 5))
    b = parseInt('0x' + backgroundColor.substring(5, 7))
  }

  if (r * 0.299 + g * 0.587 + b * 0.114 > 186) return '#000000'
  else return '#ffffff'
}
