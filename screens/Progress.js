import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, Touchable, View, TouchableOpacity } from 'react-native';
import { ProgressBar, Colors } from 'react-native-paper';
import Constants from 'expo-constants';
import { Appbar } from 'react-native-paper';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Calendar from '../assets/icons/calendar.svg';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function Progress() {
  const currentDate = new Date();
  const [begginingSemester, setBegginingSemester] = useState(currentDate);
  const [endingSemester, setEndingSemester] = useState(currentDate);
  const [progress, setProgress] = useState(0);
  const [daysLeft, setDaysLeft] = useState(0);
  const [vacationDays, setVacationDays] = useState(0);
  const [showBegginingDatePicker, setShowBegginingDatePicker] = useState(false);
  const [showEndingDatePicker, setShowEndingDatePicker] = useState(false);
  const [message, setMessage] = useState();

  function calculateProgress() {
    if (begginingSemester < endingSemester) {
      let auxProgress = (currentDate - begginingSemester) / (endingSemester - begginingSemester);
      auxProgress = auxProgress > 1 ? 1 : auxProgress < 0 ? 0 : auxProgress;

      let auxDaysLeft = Math.round((endingSemester - currentDate) / (24 * 60 * 60 * 1000));
      auxDaysLeft = auxDaysLeft < 0 ? 0 : auxDaysLeft;

      if (currentDate < begginingSemester) {
        let auxVacationDays = Math.round(Math.abs((begginingSemester - currentDate) / (24 * 60 * 60 * 1000)));
        auxVacationDays = auxVacationDays < 0 ? 0 : auxVacationDays;

        setVacationDays(auxVacationDays);
        setMessage(`Você ainda tem ${auxVacationDays} dia${auxVacationDays != 0 ? "s" : ""} de férias!`)
      }
      else {
        if (auxDaysLeft <= 0) {
          setMessage(`As férias chegaram!`);
        }
        else {
          setMessage(`Férias em ${auxDaysLeft} dia${auxDaysLeft != 1 ? "s" : ""}!`);
        }
      }
      setProgress(auxProgress);
      setDaysLeft(auxDaysLeft);

    } else {
      setMessage("Selecione datas válidas de início e término do seu semestre!");
      setProgress(0);
      setDaysLeft(0);
      setVacationDays(0);
    }
  }

  useEffect(() => {
    calculateProgress();
  }, [begginingSemester, endingSemester])

  const formatDate = dataFormatar => {
    const data = new Date(dataFormatar);
    return ('0' + data.getUTCDate()).slice(-2) + "/" + ('0' + (data.getUTCMonth() + 1)).slice(-2) + "/" + data.getFullYear();
  }

  return (<>
    <Appbar.Header statusBarHeight={Constants.statusBarHeight}>
      <Appbar.Action icon="menu" onPress={() => { }} />
      <Appbar.Content title="Progresso" />
    </Appbar.Header>
    <View style={styles.content}>
      <View style={styles.container}>
        <Text style={styles.progressTitle}>Progresso do Semestre</Text>
        <ProgressBar style={styles.progress} progress={progress} color={Colors.green600} />
        <Text style={styles.message}>{message}</Text>
        <StatusBar style="auto" />
      </View>
      <View style={styles.line}>
        <View style={styles.semestre}>
          <Text style={styles.spacing}>Início do Semestre: </Text>
          <Text style={styles.spacing}>Fim do Semestre: </Text>
        </View>
        <View style={styles.datas}>
          <View style={styles.spacingDate}>
            <TouchableOpacity style={styles.dateAndDatepicker} onPress={() => setShowBegginingDatePicker(true)}>
              <Calendar style={styles.calendar} />
              <Text style={styles.data}>{formatDate(begginingSemester)}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.spacingDate}>
            <TouchableOpacity style={styles.dateAndDatepicker} onPress={() => setShowEndingDatePicker(true)}>
              <Calendar style={styles.calendar} />
              <Text style={styles.data}>{formatDate(endingSemester)}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <DateTimePickerModal
        isVisible={showBegginingDatePicker}
        mode={"date"}
        value={begginingSemester}
        date={begginingSemester}
        onCancel={() => setShowBegginingDatePicker(false)}
        onHide={() => setShowBegginingDatePicker(false)}
        onConfirm={(date) => {
          setBegginingSemester(date);
          setShowBegginingDatePicker(false);
        }}

        cancelTextIOS={'Cancelar'}
        confirmTextIOS={'Confirmar'}
        headerTextIOS={'Escolha uma data'}
      />
      <DateTimePickerModal
        isVisible={showEndingDatePicker}
        mode={"date"}
        value={endingSemester}
        date={endingSemester}
        onCancel={() => setShowEndingDatePicker(false)}
        onHide={() => setShowEndingDatePicker(false)}
        onConfirm={(date) => {
          setEndingSemester(date);
          setShowEndingDatePicker(false);
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
    height: 20,
    width: wp('85%'),
    marginTop: hp("5%"),
    marginBottom: hp("5%"),
    borderRadius: 5
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
    backgroundColor: "#EBEBEB",
    marginTop: hp("5%"),
    padding: hp("2%"),
    borderRadius: 15
  },

  semestre: {
    marginRight: 40,
  },

  spacing: {
    marginTop: 18,
    marginBottom: 18,
  },

  spacingDate: {
    marginTop: 10,
    marginBottom: 10,
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