import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { Appbar } from 'react-native-paper'
import Constants from 'expo-constants'
import { useNavigation } from '@react-navigation/core'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen'
import { ScrollView } from 'react-native-gesture-handler'
import { FontAwesome } from '@expo/vector-icons'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Ionicons } from '@expo/vector-icons'

export default function AboutUs() {
  const navigation = useNavigation()

  return (
    <>
      <Appbar.Header statusBarHeight={Constants.statusBarHeight}>
        <Appbar.Action
          icon='menu'
          onPress={() => {
            navigation.openDrawer()
          }}
        />
        <Appbar.Content title='Sobre Nós' />
      </Appbar.Header>
      <ScrollView>
        <View style={styles.backPlain}>
          <View style={styles.container}>
            <Image
              style={styles.image}
              source={require('../assets/imgs/petbcc_menu_principal.png')}
              resizeMode='contain'
            ></Image>
            <Text style={styles.textTitle}>O QUE É O PET?</Text>
            <Text style={styles.text}>
              O{' '}
              <Text style={{ fontWeight: 'bold' }}>
                Programa de Educação Tutorial (PET)
              </Text>{' '}
              é um programa do Governo Federal Brasileiro que possui o objetivo
              principal de elevar a qualidade dos cursos de graduação do país,
              como consta na Portaria 976/2010. A ideia é que cursos de
              graduação possuam um grupo PET de até 18 alunos (denominados de
              petianos), sendo 12 alunos bolsistas e 6 não-bolsistas sob a
              supervisão de um professor tutor. O grupo PET deve desenvolver
              atividades de ensino, pesquisa e extensão, promovendo a
              indissociabilidade entre esses três pilares.
            </Text>
            <Text style={styles.textTitle}>O PET-BCC</Text>
            <Text style={styles.text}>
              O grupo PET do curso de Bacharelado em Ciência da Computação
              <Text style={{ fontWeight: 'bold' }}>(PET-BCC)</Text> da
              Universidade Federal de São Carlos{' '}
              <Text style={{ fontWeight: 'bold' }}>(UFSCar)</Text>, campus São
              Carlos, iniciou suas atividades em outubro de 2009 ao ser
              contemplado no lote 2 do edital nº 05. Uma particularidade desse
              edital é que a chamada foi para grupos temáticos, isto é, além de
              estarem vinculados a um curso de graduação, também deveriam ter um
              tema para nortear suas atividades e projetos. O tema do PET-BCC é
              desenvolvimento de software.
            </Text>
            <Text style={styles.textTitle}>PILARES DO PET-BCC</Text>
            <View style={styles.icons}>
              <View style={styles.icon}>
                <FontAwesome name='graduation-cap' size={24} color='black' />
                <Text style={styles.subtitle}>Ensino</Text>
              </View>
              <View style={styles.icon}>
                <MaterialCommunityIcons
                  name='book-search'
                  size={24}
                  color='black'
                />
                <Text style={styles.subtitle}>Pesquisa</Text>
              </View>
              <View style={styles.icon}>
                <FontAwesome name='globe' size={24} color='black' />
                <Text style={styles.subtitle}>Extensão</Text>
              </View>
              <View style={styles.icon}>
                <Ionicons name='git-branch' size={24} color='black' />
                <Text style={styles.subtitle}>Desenvolvimento</Text>
                <Text style={styles.subtitle}>de Software</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  backPlain: {
    backgroundColor: '#E8243C',
    width: wp('100%'),
  },
  container: {
    backgroundColor: '#FFFFFF',
    marginTop: hp('5%'),
    marginBottom: hp('5%'),

    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    width: wp('90%'),
    borderRadius: 10,
  },
  image: {
    width: wp('80%'),
    height: hp('20%'),
  },
  logo: {
    width: wp('80%'),
    height: hp('8%'),
  },
  text: {
    padding: 5,
    width: wp('80%'),
    textAlign: 'justify',
    color: '#616161',
    fontSize: 18,
  },
  textTitle: {
    padding: 5,
    width: wp('80%'),
    fontWeight: 'bold',
    fontSize: 20,
  },
  icons: {
    flexDirection: 'row',
    width: wp('80%'),
    justifyContent: 'center',
  },
  icon: {
    flexDirection: 'column',
    margin: 10,
    marginLeft: 20,
    alignItems: 'center',
  },
  subtitle: {
    fontWeight: 'bold',
    fontSize: 14,
  },
})
