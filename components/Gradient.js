import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Entypo, Feather } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { FontAwesome } from '@expo/vector-icons';
import { ColorPicker, fromHsv } from "react-native-color-picker";
import { BWFont } from "../helpers/ExpressionHelper";
import { Dialog, Button, Portal } from 'react-native-paper'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export function Gradient(props) {
    let color = []
    const gradients = [['#42EBB9'], ['#42EBE1'], ['#4272EB'], ["#AB42EB"],
    ["#EB42A8"], ["#EB4257"], ["#EBA842"], ["#DBDBDB"], ["#7277F1", "#42EBAF"],
    ["#EB429E", "#EB9E42"], ["#46EB42", "#42B9EB"], ["#B4B2B5", "#1F1F1F"], ["#EBDB42", "#1AEB55"],
    ["#C574F7", "#ED3F88"], ["#e40303", "#FF8C00", "#FFED00", "#008026", "#004DFF", "#750787"]]
    const start = { x: 0, y: 0 }
    const end = props.color == 14 ? { x: 0, y: 1 } : { x: 1, y: 1 }
    if (isNaN(props.color) || props.color < 0 || props.color > 15)
        color = [props.color]
    else {
        color = gradients[props.color]
    }
    if (color.length == 1 || props.theme != undefined) {
        return (
            <View
                colors={color}
                style={props.theme != undefined ?{ backgroundColor:  props.theme, ...(props.style || {})} : {backgroundColor: color[0], ...(props.style || {}) }}
            >
                {props.children}
            </View>
        )
    }
    return (
        <LinearGradient
            colors={color}
            style={props.style || {}}
            start={start}
            end={end}
        >
            {props.children}
        </LinearGradient>
    );
}

export function SelGradSquare(props) {
    const [state, setState] = [props.state, props.setState]
    const styles = StyleSheet.create({
        square: {
            alignItems: 'center',
            justifyContent: 'center',
            width: wp("8.5%"), height: wp("8.5%"),
            borderRadius: 8,
            ...(props.style || {})

        }
    })
    return (
        <TouchableOpacity onPress={() => setState(props.color)} style={{
            borderRadius: 9,
            borderWidth: state == props.color ? 1 : 0,
        }}>
            <Gradient color={props.color} theme={props.theme} style={styles.square}>
                {state == props.color && (<Feather name="check" size={24} color="white" />)}
            </Gradient>
        </TouchableOpacity>
    )
}

export function PickerGradSquare(props) {
    const [state, setState] = [props.state, props.setState]
    const [openColorDialog, setOpenColorDialog] = useState(false);
    let aux = state;
    const styles = StyleSheet.create({
        square: {
            alignItems: 'center',
            justifyContent: 'center',
            width: wp("8.5%"), height: wp("8.5%"),
            borderRadius: 8,
            borderWidth: isNaN(state) ? 1 : 0,
            ...(props.style || {})
        }
    })
    return (
        <>
            <TouchableOpacity onPress={() => setOpenColorDialog(true)}>
                <Gradient color={props.color} style={styles.square}>
                    <FontAwesome name="eyedropper" size={18} color={BWFont(props.color)} />
                </Gradient>
            </TouchableOpacity>



            <Portal>
                <Dialog visible={openColorDialog} onDismiss={() => setOpenColorDialog(false)}>
                    <Dialog.Title>Alterar</Dialog.Title>
                    <ColorPicker
                        onColorChange={(color) => (aux = color)}
                        defaultColor={props.color}
                        style={{ width: 300, height: 300 }}
                    />
                    <Dialog.Actions>
                        <Button
                            onPress={() => setOpenColorDialog(false)}
                        >Cancelar</Button>
                        <Button
                            onPress={() => {
                                setState(fromHsv(aux));
                                setOpenColorDialog(false);
                            }}
                        >Ok</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </>
    )
}

