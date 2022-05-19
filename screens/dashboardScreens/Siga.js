import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Alert,
  StyleSheet,
  LayoutAnimation,
  Linking,
  TextInput,
} from "react-native";
import { Ionicons, Entypo, MaterialIcons, MaterialCommunityIcons, Feather, FontAwesome } from '@expo/vector-icons';
import { useSelector, useDispatch } from "react-redux";
import { Button, IconButton, useTheme, FAB, Menu, Divider, Surface } from "react-native-paper";
import { FreqRender } from "../../components/CalendarTask"; 
import { defaultSubject, parseTime, weekDaysFullNames } from "../../helpers/helper";
import { useNavigation } from "@react-navigation/native";
import ScrollView from "../../components/ScrollView";
import { addEvent } from "../../redux/actions/eventActions";

export default function SigaScreen(){
    const navigation = useNavigation();
    const [messageE, setMessageE] = useState("");
    const [messageS, setMessageS] = useState("");
    const colors = useTheme().colors;
    const [visible, setVisible] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();

    const handleError = (error) => {
      if (error.status != undefined){
        if (error.status === 401 || error.status === 403) {
          setMessageE("Usuário ou senha inválidos");
          setMessageS("");
        } else {
          setMessageE("Aconteceu um problema na comunicação com o SIGA");
          setMessageS("");
        }
    }
    }

    const addSigaSubject = (subject) => {
        const placeholder = {
          "id" : 2324234,
          "atividade" : "NOME DA MATERIA",
          "turma" : "NOME DA TURMA",
          "periodo":2,
          "ano": 2022,
          "horarios": [{
            "dia": "Segunda-Feira",
            "inicio": "10:00",
            "fim": "12:00",
            "sala": "SALA",
          },
          {
            "dia": "Terça-Feira",
            "inicio": "10:00",
            "fim": "12:00",
            "sala": "SALA2",
          }
          ]
        }
        let auxdetails = []
        for (let i = 0; i < subject.horarios.length; i++){
          const aux = {
            datetime_init: parseTime(subject.horarios[i].inicio).toString(),
            datetime_end:parseTime(subject.horarios[i].fim).toString(),
            local: subject.horarios[i].sala,
            day: weekDaysFullNames.indexOf(subject.horarios[i].dia)
          }
          auxdetails.push(aux)
        }
        const task = {
          ...defaultSubject,
          "siga": true,
          "details": [...auxdetails],
          "name": subject.atividade,
          "color": 4,
          "turma": "turma " + subject.turma,
        }

        dispatch(addEvent(task))
    }

    async function Login(user, pssw) {
      setMessageS("");
      setMessageE("");
      const Buffer = require("buffer").Buffer;
      let encodedAuth = new Buffer(user + ":" + pssw).toString("base64");
      console.log(encodedAuth)
      try {
        const response = await fetch(
          "https://sistemas.ufscar.br/sagui-api/siga/deferimento",
          {
            headers: {
              Authorization: "Basic " + encodedAuth,
            },
          }
        );
        let data = await response.json();
        if (data.status == undefined){
          if (data.length == 0){
            setMessageE("Aparentemente você não possui nenhum deferimento no Periodo letivo atual, por acaso está de férias?");
            setMessageS("");
          } else {
            for(let i = 0; i < data.length; i++){
              addSigaSubject(data[i])
            }
          }
        } else {
          handleError(data);
        }
      } catch (error) {
        handleError(error)
      }
    }

    const styles = StyleSheet.create({
      textInput: {
        flex:1,
        marginHorizontal: 20,
        marginVertical: 5,
        borderRadius: 12,
        borderBottomWidth:0,
        padding: 10,
        backgroundColor: colors.surface,
        color: colors.onSurface,
      },
      pssdInput: {
        marginLeft: 20,
        marginVertical: 5,
        borderTopLeftRadius: 12,
        borderBottomLeftRadius: 12,
        borderBottomWidth:0,
        padding: 10,
        backgroundColor: colors.surface,
        color: colors.onSurface,
        flex:1 
      },
      pssdBtn: {
        marginRight: 20,
        marginVertical: 5,
        borderTopRightRadius: 12,
        borderBottomRightRadius: 12,
        borderBottomWidth:0,
        padding: 10,
        backgroundColor: colors.surface,
        color: colors.onSurface
      },
      pssdRow: {
        flexDirection: "row",
      },
      description: {
        padding: 20, 
        textAlign: 'justify',

      },
      btn: {
        padding:10,
        paddingHorizontal:20,
        borderRadius:20,
        backgroundColor: colors.primary,
        alignItems:'center',
        justifyContent:'center',
        marginTop: 10
      },
      message: {
        padding: 10,
        color: colors.error
      },
      message: {
        padding: 10,
        color: colors.tertiary
      }
    })
    return (<View style={{flex:1, backgroundColor: colors.surface3, alignItems:'center'}}>
      <Text style={styles.description}>Ao conectar no siga, suas matérias anteriores registradas pelo siga serão substituidas pelas atuais</Text>
      {messageE.length > 0 && (<Text style={styles.message}>{messageE}</Text>)}
      {messageS.length > 0 && (<Text style={styles.messageS}>{messageS}</Text>)}
      <View style={styles.pssdRow}>
      <TextInput style={styles.textInput} value={username} onChangeText={setUsername} placeholder={"CPF ou RA"}></TextInput>
      </View>
      <View style={styles.pssdRow}>
      <TextInput style={styles.pssdInput} value={password} onChangeText={setPassword} placeholder={"Senha do SIGA"} secureTextEntry={!visible}>
      </TextInput>
      <TouchableOpacity style={styles.pssdBtn} onPress={() => setVisible(!visible)}>
      {!visible && <MaterialIcons name="visibility" size={24} color={colors.onSurface} />}
      {visible && <MaterialIcons name="visibility-off" size={24} color={colors.onSurface} />}

      </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.btn} onPress={() => Login(username, password)}>
        <Text style={{color:colors.onPrimary}}>Logar</Text>
      </TouchableOpacity>

    </View>)
}