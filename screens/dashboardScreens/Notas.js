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
import { NotaRender } from "../../components/CalendarTask"; 
import { defaultSubject } from "../../helpers/helper";
import { useNavigation } from "@react-navigation/native";
import ScrollView from "../../components/ScrollView";

export default function NotasScreen(props) {
    const events = useSelector((state) => state.events).events;
    const classes = events.filter((e) => e.is_subject);
    const colors = useTheme().colors;
    const navigation = useNavigation()

    const styles = StyleSheet.create({
        container:{ 
            flex: 1, 
            alignItems: 'center',
            backgroundColor:  colors.surface1, 
            paddingHorizontal:20,
            paddingBottom: 60
        },
        scroll:{ 
            flex: 1, 
            backgroundColor: 'red', 
        },

    })
    return (
    <View style={styles.scroll}>  
    <ScrollView>
        <View style={styles.container}>
        {classes.map((item, idx) => {
            return <NotaRender subjectScreen={true} acontecendo={false} key={idx} task={item} />;
        })}
        {classes.length == 0 && <Text style={{ fontSize: 20, color: colors.onSurface }}>Nenhuma aula registrada</Text>}
        </View>
        
    </ScrollView>
    </View>
    )

}