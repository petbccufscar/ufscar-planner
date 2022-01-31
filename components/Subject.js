import React, {useState, useEffect} from 'react'
import { View, Text, StyleSheet,
  LayoutAnimation, } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { TextInput, IconButton } from 'react-native-paper'
import Dialog from "react-native-dialog";
import { magic, BWFont } from './ExpressionHelper';

export function Subject({ route, navigation }){

  //Média
  const [meanExpression, setMeanExpression] = useState(route.params.task.mean ||"")
  const [meanDict, setMeanDict] = useState(route.params.task.grade.mean || {})
  const [meanRes, setMeanRes] = useState("")

  //Frequência
  const [freqExpression, setFreqExpression] = useState(route.params.task.frequency || "")
  const [freqDict, setFreqDict] = useState(route.params.task.grade.frequency || {})
  const [freqRes, setFreqRes] = useState("")

  const color = '#f00'

  try {
    const r = magic(freqDict, freqExpression)
    if(r.result){
      setFreqRes(result)
    }
  } 
  catch(e){}

  try {
    const r = magic(meanDict, meanExpression)
    if(r.result){
      setMeanRes(result)
    }
  } 
  catch(e){}

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Média e frequência",
      headerTintColor: BWFont(color),
      headerStyle: { backgroundColor: color },
      headerRight: () => (
        <IconButton
          icon={"check"}
          size={24}
          color={BWFont(color)}
          onPress={() => {
            LayoutAnimation.configureNext({
              duration: 200,
              create: {
                type: LayoutAnimation.Types.easeIn,
                property: LayoutAnimation.Properties.opacity,
              },
              update: {
                type: LayoutAnimation.Types.easeOut,
              },
            });
            //do the magic
            navigation.navigate({
              name: 'Event',
              params: { mean: meanExpression, frequency: freqExpression, grade: {"frequency": freqDict, "mean": meanDict}},
              merge: true,
          });
          }}
        />
      ),
    });
  }, [meanExpression, freqExpression, freqDict, meanDict]);



  return (<ScrollView>
  <MeanLogic name={"Média"} res={[meanRes, setMeanRes]} expression={[meanExpression, setMeanExpression]} dict={[meanDict, setMeanDict]} placeholder={"(p1+p2+p3)/3"}/>
  <MeanLogic name={"Frequência"}  res={[freqRes, setFreqRes]} expression={[freqExpression, setFreqExpression]} dict={[freqDict, setFreqDict]} placeholder={"(aulas-faltas)/aulas"}/>
  </ScrollView>)
}

function MeanLogic (props) {
  
    const [expression, setExpression] = props.expression
    const [res, setRes] = props.res
    const [dict, setDict] = props.dict

    const [old, setOld] = useState("")
    const [key, setKey] = useState(null)

    const [open, setOpen] = useState(false)

    const valid = (text) => {
        try {
            const r = magic(dict, text)
            return true
        } catch(e){
            return false
        }
    }


    function SimpleDialog(props) {
        const old = props.old || ""
        const fun = key? (t) => {
          let aux = {...dict}
          delete aux[key]
          const b = magic(aux, t)
          aux[key] = b.result
          const a = magic(aux, expression)
          setDict(a.dict)
          setRes(a.result)
          }:(t) => {
            setExpression(t)
            const a = magic(dict,t)
            setDict(a.dict)
            setRes(a.result)
            }
      

        const [isValid, setIsValid] = useState(false)
        const setOpen = props.setOpen
        const open = props.open
        const [texto, setTexto] = useState(old)
    
        return (
          <Dialog.Container visible={open}>
            <Dialog.Title>Alterar</Dialog.Title>
            <Dialog.Description>
            </Dialog.Description>
            <Dialog.Input value={texto} onChangeText={(t) => {
                setTexto(t)
                const a = t.length > 0 && valid(t)
                setIsValid(a)
                
                }}>
    
            </Dialog.Input>
            <Dialog.Button label="Cancel" onPress={() => setOpen(false)} />
            {isValid && (<Dialog.Button label="Ok" onPress={() => {
              fun(texto)
              setOpen(false)

            }} />)}
          </Dialog.Container>)
      }
    
  return (
    <View style={{padding:30, paddingBottom:0}}>
        <SimpleDialog open={open} setOpen={setOpen} old={old}/>
        <Text style={styles.sectionTitle}>{props.name+':'}</Text>
      <TouchableOpacity style={styles.area} onPress={() => {
        setKey(null)
        setOld(expression)
        setOpen(true)
        }}>

          
          {expression!=0 && (<Text style={styles.grade}>{expression+" = "+res}</Text>)}
          {expression==0 &&(<Text style={styles.fake}>{props.placeholder}</Text>)}

      </TouchableOpacity>
      { (!!Object.keys(dict).length) &&(<Text style={styles.sectionTitle}>Notas:</Text>)}
      { Object.keys(dict).map((key, idx) => {
        return (
        <TouchableOpacity key={idx} style={styles.area} onPress={() => {
          setKey(key)
          setOld("" + dict[key])
          setOpen(true)
          }}>
          <Text style={styles.grade}>{key + " = " + dict[key]}</Text>
        </TouchableOpacity>)
      })

      }
    </View>
  )
}

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 5,
    paddingBottom: 30,
    color: '#607D8B',
  },
  area: {
    padding: 15,
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: '#FFF'
  },
  grade: {
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
    paddingRight: 5,
  },
  fake:{
    fontSize: 24,
    fontWeight: "bold",
    color: "#E5E5E5",
    paddingRight: 5,
  }
})

