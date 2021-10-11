import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { StyleSheet, Text, View, Pre, Pressable } from 'react-native'
export default class App extends React.Component {
  state = {
    value: 0,
    mealValue: 420,
  }

  incrementValue = () => {
    this.setState({
      value: this.state.value + this.state.mealValue,
    })
  }

  decrementValue = () => {
    this.setState({
      value: this.state.value - this.state.mealValue,
    })
  }

  formatReal(int) {
    var tmp = int + ''
    tmp = tmp.replace(/([0-9]{2})$/g, ',$1')
    if (tmp.length > 6) tmp = tmp.replace(/([0-9]{3}),([0-9]{2}$)/g, '.$1,$2')

    return tmp
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.balanceTitle}>
          R$ {this.formatReal(this.state.value)}
        </Text>
        <StatusBar style='auto' />
        <View style={styles.changeValue}>
          <View style={styles.line} />
          <Pressable
            onPress={this.decrementValue}
            title='+ ADICIONAR CRÉDITO'
            style={styles.Pressable}
          >
            <Text style={styles.textPessable}>+ CREDITAR REFEIÇÃO</Text>
          </Pressable>
          <View style={styles.line} />
          <Pressable
            onPress={this.incrementValue}
            title='- DEBITAR REFEIÇAÕ'
            style={styles.Pressable}
          >
            <Text style={styles.textPessable}>- DEBITAR REFEIÇÃO</Text>
          </Pressable>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  balanceTitle: {
    fontSize: 75,
    padding: 80,
    fontWeight: 'bold',
    color: '#373737',
  },
  changeValue: {
    flexDirection: 'column',
    marginBottom: '-50%',
  },
  Pressable: {
    paddingTop: 20,
  },
  textPessable: {
    fontSize: 40,
    color: '#E8243C',
    textAlign: 'justify',
  },
  line: {
    borderBottomColor: '#C4C4C4',
    borderBottomWidth: 1,
    paddingTop: 10,
  },
})
