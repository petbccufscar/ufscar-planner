import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { StyleSheet, Text, View, Pre, Pressable, TextInput } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'

export default class App extends React.Component {
  state = {
    value: 0,
    mealValue: 4.2,
    shouldShow: false,
    setShouldShow: false,
  }

  incrementValue = () => {
    this.setState({
      value: parseFloat(this.state.value) + parseFloat(this.state.mealValue),
    })
  }

  decrementValue = () => {
    if (parseFloat(this.state.value) - parseFloat(this.state.mealValue) >= 0) {
      this.setState({
        value: parseFloat(this.state.value) - parseFloat(this.state.mealValue),
      })
    }
  }

  editValue = (newValue) => {
    if (parseFloat(newValue) >= 0) {
      this.setState({
        value: parseFloat(newValue),
      })
    }
  }

  formatReal = (num) => {
    num = parseFloat(num)
    return (
      'R$' +
      num
        .toFixed(2)
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1;')
        .replace('.', ',')
        .replace(';', '.')
    )
  }

  setShouldShow = () => {
    this.setState({
      shouldShow: !this.state.shouldShow,
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.title}>
          <Pressable onPress={() => this.setShouldShow(!this.state.shouldShow)}>
            <Text style={styles.balanceTitle}>Saldo Carteirinha</Text>
            <MaterialIcons
              name='edit'
              color='black'
              size={24}
              style={styles.edit}
            />
          </Pressable>
          {this.state.shouldShow ? (
            <React.Fragment>
              <TextInput
                style={styles.input}
                onChangeText={this.editValue}
                keyboardType='numeric'
                placeholder='Editar o saldo da Carteirinha'
                onEndEditing={() => this.setShouldShow(!this.state.shouldShow)}
              />
            </React.Fragment>
          ) : null}
        </View>
        <View style={styles.line} />
        <Text style={styles.balance}>{this.formatReal(this.state.value)}</Text>
        <StatusBar style='auto' />
        <View style={styles.changeValue}>
          <View style={styles.line} />
          <Pressable
            onPress={this.incrementValue}
            title='+ ADICIONAR CRÉDITO'
            style={styles.pressable}
          >
            <Text style={styles.textPessable}>+ CREDITAR REFEIÇÃO</Text>
          </Pressable>
          <View style={styles.line} />
          <Pressable
            onPress={this.decrementValue}
            title='- DEBITAR REFEIÇAÕ'
            style={styles.pressable}
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
  },
  title: {
    marginTop: '10%',
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  balanceTitle: {
    position: 'absolute',
    alignSelf: 'center',
    fontSize: 24,
    color: '#484848',
    textAlign: 'center',
  },
  balance: {
    flex: 4,
    fontSize: 75,
    paddingTop: 60,
    fontWeight: 'bold',
    color: '#373737',
    width: '100%',
    textAlign: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  changeValue: {
    flex: 2,
    flexDirection: 'column',
    width: '100%',
    textAlign: 'center',
  },
  pressable: {
    paddingTop: 20,
  },
  pressableEdit: {
    color: 'grey',
    padding: 10,
    marginRight: 0,
  },
  textPessable: {
    fontSize: 40,
    color: '#E8243C',
    textAlign: 'left',
    marginLeft: '5%',
  },
  line: {
    borderBottomColor: '#C4C4C4',
    borderBottomWidth: 0.5,
    paddingTop: 10,
  },
  edit: {
    paddingRight: 15,
    alignSelf: 'flex-end',
  },
  input: {
    height: 75,
    width: '75%',
    borderWidth: 1,
    marginTop: 20,
    alignItems: 'center',
    alignSelf: 'center',
    fontSize: 24,
    padding: 10,
  },
})
