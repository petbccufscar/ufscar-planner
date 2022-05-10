import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, Touchable, View, TouchableOpacity } from 'react-native';
import { ProgressBar, Colors, useTheme } from 'react-native-paper';
import Constants from 'expo-constants';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Calendar from '../assets/icons/calendar.svg';
import { useSelector, useDispatch } from 'react-redux';
import { updateSemester } from '../redux/actions/semesterActions';
import { useNavigation } from '@react-navigation/core'
import { formatDate } from '../helpers/helper';
import { MaterialIcons } from '@expo/vector-icons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Dialog from "react-native-dialog";


function Bar(props) {
  const text = props.text || "";
  const progress = props.progress || 0;
  const colors = useTheme().colors
  const colorOutside = props.colorOutside || colors.surface5;
  const colorInside = props.colorInside || colors.tertiaryContainer;
  const style = props.style || {};
  return (
    <View style={{ flexDirection: 'row', borderRadius: 30, overflow: 'hidden', ...style }}>
      <View style={{ width: `${progress}%`, backgroundColor: colorInside }}></View>
      <View style={{ width: `${100 - progress}%`, backgroundColor: colorOutside }}></View>
      <View style={{ left: 10, position: 'absolute', top: 0, bottom: 0, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: colors.onSurface }}>{text}</Text>
      </View>
      <View style={{ right: 10, position: 'absolute', top: 0, bottom: 0, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: colors.onSurface }}>{`${progress}%`}</Text>
      </View>
    </View>)

}


export default function Progress() {
  const dispatch = useDispatch();
  const semester = useSelector((state) => state.semester).semester;
  const currentDate = new Date();
  const [showInitDatePicker, setShowInitDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  let message = '';
  let progress = 0;
  calculateProgress();
  const colors = useTheme().colors 
  const [showDialog, setShowDialog] = useState(false);

  function handleSemesterInitiChange(date) {
    setShowInitDatePicker(false);
    semester.init = date.toString();
    dispatch(updateSemester(semester));
  }

  function handleSemesterEndChange(date) {
    setShowEndDatePicker(false);
    semester.end = date.toString();
    dispatch(updateSemester(semester));
  }

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

  const navigation = useNavigation()

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
            <TouchableOpacity onPress={() => setShowDialog(true)} style={{borderWidth:1, borderRadius: 8, backgroundColor: colors.surface, alignItems:'center', justifyContent:'center' ,flexDirection:'row', paddingHorizontal: 10, paddingVertical:5}}>
              <MaterialIcons name="settings" size={18} color={colors.primary} style={{paddingRight:5}} />
              <Text style={{color: colors.onSurface}}>Ajustar</Text>

            </TouchableOpacity>
          </View>
        </View>
        <StatusBar style="auto" />
      </View>
      <Dialog.Container visible={showDialog}>
        <Dialog.Title>Escolha as datas do semestre</Dialog.Title>
        <Dialog.Description>
      <View style={styles.line}>
        <View style={styles.semestre}>
          <Text style={styles.spacing}>Início do Semestre: </Text>
          <Text style={styles.spacing}>Fim do Semestre: </Text>
        </View>
        <View style={styles.datas}>
          <View style={styles.spacingDate}>
            <TouchableOpacity style={styles.dateAndDatepicker} onPress={() => setShowInitDatePicker(true)}>
              <Calendar style={styles.calendar} />
              <Text style={styles.data}>{formatDate(new Date(semester.init))}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.spacingDate}>
            <TouchableOpacity style={styles.dateAndDatepicker} onPress={() => setShowEndDatePicker(true)}>
              <Calendar style={styles.calendar} />
              <Text style={styles.data}>{formatDate(new Date(semester.end))}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      </Dialog.Description>
        <Dialog.Button
          label="Ok"
          onPress={() => {
            setShowDialog(false);
          }}
        />
      </Dialog.Container>
      <DateTimePickerModal
        style={{ width: "100%" }}
        textColor={"#000"}
        isVisible={showInitDatePicker}
        mode={"date"}
        value={new Date(semester.init)}
        date={new Date(semester.init)}
        onCancel={() => setShowInitDatePicker(false)}
        onHide={() => setShowInitDatePicker(false)}
        onConfirm={(date) => {
          handleSemesterInitiChange(date);
        }}

        cancelTextIOS={'Cancelar'}
        confirmTextIOS={'Confirmar'}
        headerTextIOS={'Escolha uma data'}
      />
      <DateTimePickerModal
        style={{ width: "100%" }}
        textColor={"#000"}
        isVisible={showEndDatePicker}
        mode={"date"}
        value={new Date(semester.end)}
        date={new Date(semester.end)}
        onCancel={() => setShowEndDatePicker(false)}
        onHide={() => setShowEndDatePicker(false)}
        onConfirm={(date) => {
          handleSemesterEndChange(date);
        }}

        cancelTextIOS={'Cancelar'}
        confirmTextIOS={'Confirmar'}
        headerTextIOS={'Escolha uma data'}
      />
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

  progressTitle: {
    fontWeight: "bold",
    fontSize: 25,
    textAlign: "center",
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

  line: {
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 15
  },

  semestre: {
    marginRight: 40,
  },

  spacing: {
    marginTop: 18,
  },

  spacingDate: {
    marginTop: 10,
  },

  dateAndDatepicker: {
    flexDirection: "row",
    textAlignVertical: 'center',
    backgroundColor: "#e8243c",
    padding: 8,
    borderRadius: 10
  },

  calendar: {
    color: "black",
    flex: 1,
    marginRight: 10,
  },

  data: {
    textAlignVertical: 'center',
    color: "white",
  }
});