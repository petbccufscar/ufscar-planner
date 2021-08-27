import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ProgressBar, Colors } from 'react-native-paper';
import Constants from 'expo-constants';
import { Appbar } from 'react-native-paper';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function Progress() {
  return (<>
     <Appbar.Header statusBarHeight={Constants.statusBarHeight}>
          <Appbar.Action  icon="menu" onPress={()=>{}} />
          <Appbar.Content title="Progresso" />
    </Appbar.Header>
    <View style={styles.content}>
    <View style={styles.container}>
      <Text>Progresso do Semestre</Text>
      <ProgressBar style={styles.progress} progress={0.8} color={Colors.green600} />
      <Text>Férias em 90 dias!</Text>
      <StatusBar style="auto"/>
    </View>
    <View style={styles.line}>
      <View style={styles.semestre}>
        <Text style={StyleSheet.semestrea}>Início do Semestre: </Text>
        <Text style={StyleSheet.semestrea}>Fim do Semestre: </Text>
      </View>
      <View style={styles.datas}>
        <Text style={StyleSheet.datasa}>10/08/2021 </Text>
        <Text style={StyleSheet.datasa}>30/11/2021 </Text>
      </View>
    </View>
  </View>
  </>);
}

const styles = StyleSheet.create({
  container: {
    marginTop: 150,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  content: {
    flex: 1,
    backgroundColor: '#fff',
  },
  progress: {
  height: 20,
  width: 256,
  borderRadius: 15,
  },
  line: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    height: 100,
  },
  semestre: {
    backgroundColor: '#EEEEEE',
    padding: 20,
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
    fontWeight: 'bold',
  },
  datas: {
    backgroundColor: '#EEEEEE',
    padding: 20,
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
    fontWeight: 'bold',
  },
});