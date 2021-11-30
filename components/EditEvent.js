import React, { useState } from 'react';
import { ScrollView, Text, View, TouchableOpacity, Alert } from "react-native";
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';


export default function EditEvent({ route, navigation }) {
    const [horarios, setHorarios] = useState([]);
    const [medias, setMedias] = useState([]);
    const [notificacao, setNotificacao] = useState([]);
    const [descricao, setDescricao] = useState([]);

    const { task } = route.params;
    console.log(task)
    return (
    <View>
    <TouchableOpacity style={{backgroundColor:"#f00", height:20, width:20}} />   
    <TouchableOpacity style={{backgroundColor:"#0f0", height:20, width:20}} />   
    <TouchableOpacity style={{backgroundColor:"#00f", height:20, width:20}} />   
    <TouchableOpacity style={{backgroundColor:"#f0f", height:20, width:20}} />   
    </View>);
}

function NewHorario(props) { return ( Alert.alert(
    "Alert Title",
    "My Alert Msg",
    [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel"
      },
      { text: "OK", onPress: () => console.log("OK Pressed") }
    ]
  ))}
function NewMedia(props) {}
function NewNotificacao(props) {}
function NewDescricao(props) {}