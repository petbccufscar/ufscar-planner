import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Appbar } from 'react-native-paper'
import Constants from 'expo-constants'
import Menu from '../components/HomeMenu'
import { Days, hourHeight, hourWidth } from '../components/CalendarHelper'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'

export default function Wallet(cash) {
  cash = 42
  const timeWidth = wp('100%') - 7.5 * hourWidth
  const today = new Date()
  const first = new Date(today.getTime() - today.getDay() * 24 * 60 * 60 * 1000)
  const last = new Date(
    today.getTime() + (7 - today.getDay()) * 24 * 60 * 60 * 1000
  )
  const days = { begin: first, end: last, today: today }

  return (
    <View style={styles.container}>
      <Appbar.Header statusBarHeight={Constants.statusBarHeight}>
        <Appbar.Action
          icon='menu'
          onPress={() => {
            props.navigation.openDrawer()
          }}
        />
        <Appbar.Content title={'Restaurante Universitário'} />
        <Appbar.Action
          icon='wallet'
          onPress={() => {
            navigation.navigate('Restaurant')
          }}
        />
      </Appbar.Header>
      <View style={styles.title}>
        <Text style={styles.balanceTitle}>Cardápio</Text>
        <Text style={styles.cash}>{formatReal(cash)}</Text>
      </View>
      <View style={styles.semana}>
        <View style={(styles.dias, { width: timeWidth })} />
        <Days days={days} />
      </View>
      <View>
        <Menu
          shouldShow={true}
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
        <Menu
          shouldShow={true}
          mealTime={'Jantar'}
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
    </View>
  )
}

function formatReal(num) {
  num = parseFloat(num)
  return (
    'R$ ' +
    num
      .toFixed(2)
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1;')
      .replace('.', ',')
      .replace(';', '.')
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    paddingTop: 15,
    padding: 10,
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderBottomColor: '#C4C4C4',
    borderBottomWidth: 0.5,
  },
  balanceTitle: {
    position: 'absolute',
    alignSelf: 'center',
    fontSize: 32,
    color: '#484848',
    textAlign: 'center',
  },
  cash: {
    fontSize: 24,
    alignSelf: 'flex-end',
    textAlign: 'center',
    borderRadius: 5,
    fontWeight: 'bold',
    padding: 5,
    marginRight: 10,
    width: 100,
    backgroundColor: '#E8243C',
    color: '#FFFF',
  },
  meals: {
    flex: 1,
    padding: 10,
  },
  semana: {
    height: hourHeight,
    width: wp('100%'),
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#F8F8F8',
    marginBottom: 20,
  },
  dias: {
    width: hourWidth,
    height: hourHeight,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
})
