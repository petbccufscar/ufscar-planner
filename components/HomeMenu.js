import React, { useState } from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'

const Menu = (props) => {
  const [shouldShow, setShouldShow] = useState(false)
  return (
    <View style={styles.item}>
      <View style={styles.itemLeft}>
        <Text style={styles.title}>{props.mealTime}</Text>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.subtitle}>Prato Principal:</Text>
          <Text style={styles.itemMenuSubject}>{props.mainMeal}</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.subtitle}>Guarnicão:</Text>
          <Text style={styles.itemMenuSubject}>{props.garrison}</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.subtitle}>Arroz:</Text>
          <Text style={styles.itemMenuSubject}>{props.rice}</Text>
        </View>
        {shouldShow ? (
          <React.Fragment>
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.subtitle}>Feijão:</Text>
              <Text style={styles.itemMenuSubject}>{props.bean}</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.subtitle}>Saladas:</Text>
              <Text style={styles.itemMenuSubject}>{props.salad}</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.subtitle}>Sobremesa:</Text>
              <Text style={styles.itemMenuSubject}>{props.desert}</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.subtitle}>Bebidas:</Text>
              <Text style={styles.itemMenuSubject}>{props.drinks}</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.subtitle}>Preço:</Text>
              <Text style={styles.itemMenuSubject}>{props.price}</Text>
            </View>
          </React.Fragment>
        ) : null}
        <Text style={styles.details} onPress={() => setShouldShow(!shouldShow)}>
          Mais detalhes
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
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#607D8B',
    paddingBottom: 10,
    width: '100%',
  },
  subtitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#607D8B',
    paddingRight: 5,
  },

  itemMenuSubject: {
    /* TODO fontFamily: '', */
    fontSize: 14,
    color: '#607D8B',
    paddingLeft: 5,
    width: '100%',
  },
  details: {
    width: '100%',
    textAlign: 'right',
    color: 'lightblue',
    fontWeight: 'bold',
  },
})

export default Menu
