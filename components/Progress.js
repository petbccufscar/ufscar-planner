import { MaterialIcons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useSelector } from 'react-redux';
import { ConfigSemester } from '../screens/dashboardScreens/Config';
import { Portal, Dialog, Button, TextInput} from 'react-native-paper';

function Bar(props) {
  const text = props.text || "";
  const progress = props.progress || 0;
  const colors = useTheme().colors
  const colorOutside = props.colorOutside || colors.surface5;
  const colorInside = props.colorInside || "#73FCB2";
  const style = props.style || {};
  return (
    <View style={{ flexDirection: 'row', borderRadius: 30, overflow: 'hidden', ...style }}>
      <View style={{ width: `${progress}%`, backgroundColor: colorInside }}></View>
      <View style={{ width: `${100 - progress}%`, backgroundColor: colorOutside }}></View>
      <View style={{ left: 10, position: 'absolute', top: 0, bottom: 0, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: colors.onSurface }}>{text}</Text>
      </View>
      <View style={{ right: 10, position: 'absolute', top: 0, bottom: 0, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: colors.onSurface }}>{`${progress.toFixed(2)}%`}</Text>
      </View>
    </View>)

}


export default function Progress() {
  const semester = useSelector((state) => state.semester).semester;
  const currentDate = new Date();
  let message = '';
  let progress = 0;
  calculateProgress();
  const colors = useTheme().colors 
  const [showDialog, setShowDialog] = useState(false);


  useEffect(() => {
    calculateProgress();
  }, [semester]);

  function calculateProgress() {
    if (new Date(semester.init) < new Date(semester.end)) {
      let auxProgress = (currentDate - new Date(semester.init)) / (new Date(semester.end) - new Date(semester.init));
      auxProgress = auxProgress > 1 ? 1 : auxProgress < 0 ? 0 : auxProgress;

      let auxDaysLeft = Math.round((new Date(semester.end) - currentDate) / (24 * 60 * 60 * 1000));
      auxDaysLeft = auxDaysLeft < 0 ? 0 : auxDaysLeft;

      if (currentDate < new Date(semester.init)) {
        let auxVacationDays = Math.round(Math.abs((new Date(semester.init) - currentDate) / (24 * 60 * 60 * 1000)));
        auxVacationDays = auxVacationDays < 0 ? 0 : auxVacationDays;

        message = `Você ainda tem ${auxVacationDays} dia${auxVacationDays != 0 ? "s" : ""} de férias!`;
      }
      else {
        if (auxDaysLeft <= 0) {
          message = `As férias chegaram!`;
        }
        else {
          message = `Férias em ${auxDaysLeft} dia${auxDaysLeft != 1 ? "s" : ""}!`;
        }
      }
      progress = auxProgress;
    } else {
      message = "Selecione datas válidas de início e término do seu semestre!";
      progress = 0;
    }
  }

  return (<>
    <View style={styles.content}>
      <View style={styles.container}>
        <Bar style={styles.progress} progress={progress * 100} text={'Progresso do Semestre'} >
        </Bar>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ alignItems: 'flex-start',flex:1,}}>
            <Text style={{color:colors.onSurfaceVariant, ...styles.message}}>{message}</Text>
          </View>
          <View style={{ alignItems: 'flex-end',flex:1, }}>
            <TouchableOpacity onPress={() => setShowDialog(true)} style={{borderWidth:1, borderColor: colors.outline ,borderRadius: 8, backgroundColor: colors.surface, alignItems:'center', justifyContent:'center' ,flexDirection:'row', paddingHorizontal: 10, paddingVertical:5}}>
              <MaterialIcons name="settings" size={18} color={colors.primary} style={{paddingRight:5}} />
              <Text style={{color: colors.onSurface}}>Ajustar</Text>

            </TouchableOpacity>
          </View>
        </View>
        <StatusBar style="auto" />
      </View>
      <Portal>
          <Dialog style={{backgroundColor:colors.surface}} visible={showDialog} onDismiss={() => setShowDialog(false)}>
        <Dialog.Title style={{color: colors.onSurfaceVariant}}>Escolha as datas do semestre</Dialog.Title>
          <View style={{marginHorizontal:20}}>
        <ConfigSemester></ConfigSemester>
        </View>
        <Dialog.Actions>
        <Button
          color={colors.primary}
          onPress={() => {
            setShowDialog(false);
          }}
        >Ok</Button>
        </Dialog.Actions>
      </Dialog>
      </Portal>
    </View>
  </>);
}

const styles = StyleSheet.create({
  content: {
    width: wp('85%'),
    alignSelf: "center",
    paddingTop: hp("5%"),
  },

  container: {
    alignItems: "center",
    textAlign: "center"
  },


  progress: {
    flex: 1,
    height: 33,
    borderRadius: 8,
    marginBottom: 10,
  },

  message: {
    textAlign: "center",
    fontStyle: "italic",
    fontSize: 15
  },







});