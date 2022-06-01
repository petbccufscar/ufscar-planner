import React, { useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { useTheme } from "react-native-paper";
import { MaterialIcons } from '@expo/vector-icons';
import { TouchableOpacity } from "react-native-gesture-handler";
import { Feather } from '@expo/vector-icons';

const Menu = (props) => {
  const [shouldShow, setShouldShow] = useState(props.shouldShow);
  const theme = useTheme();


  const styles = StyleSheet.create({
    item: {
      backgroundColor: theme.colors.surface,
      borderRadius: 12,
      marginTop: 20,
      marginHorizontal: 20,
      borderColor: theme.colors.outline,
      borderWidth: 1,
    },
    itemLeft: {
      alignItems: "flex-start",
      flexWrap: "wrap",
    },
    title: {
      alignItems: "flex-start",
      color: theme.colors.onSurface,
      flexDirection: "row",
      fontSize: 22,
      padding: 10,
    },
    subtitle: {
      alignItems: "flex-start",
      color: theme.colors.onSurface,
      flexDirection: "row",
      fontSize: 14,
      fontWeight: 'bold',
      paddingHorizontal: 10,
      paddingTop: 10
    },

    itemMenuSubject: {
      /* TODO fontFamily: '', */
      alignItems: "flex-start",
      color: theme.colors.onSurface,
      flexDirection: "row",
      fontSize: 14,
      paddingHorizontal: 10
    },
    itemMenuSubjectPrice: {
      /* TODO fontFamily: '', */
      alignItems: "flex-start",
      color: theme.colors.onSurfaceVariant,
      flexDirection: "row",
      fontSize: 14,
      padding: 10
    },
    details: {
      alignContent: "center",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "row",
      paddingHorizontal: 10,
      marginBottom: 10,
      width: '100%',
    },
    ghostBox: {
      flex: 1
    }, 
    fixBox: {
      height: 1,
      width: 1,
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      width: '100%',
      borderBottomWidth: 1,
      borderColor: theme.colors.outline,
    },

    verText: {
      textAlign: 'center',
      color: theme.colors.primary,
    },
    hour: {
      flexDirection: "row",
    },
    money: {
      padding: 10,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",

    }
  });

  return (
    <View style={styles.item}>
      <View style={styles.itemLeft}>
        <View style={styles.header}>
          <Text style={styles.title}>{props.mealTime}</Text>
          <View style={styles.hour}>
            <Feather name="clock" size={18} color={theme.colors.primary} />
            {props.day != "6" ? (
              props.mealTime == "Almoço" ? (
                <Text style={styles.itemMenuSubject}>
                  {props.lunchStartTime} - {props.lunchEndTime}
                </Text>
              ) : (
                <Text style={styles.itemMenuSubject}>
                  {props.dinnerStartTime} - {props.dinnerEndTime}
                </Text>
              )
            ) : (
              <Text style={styles.itemMenuSubject}>
                {props.saturdayLunchStartTime} - {props.saturdayLunchEndTime}
              </Text>
            )}
          </View>
        </View>

        <View>
          <Text style={styles.subtitle}>Prato Principal:</Text>
          <Text style={styles.itemMenuSubject}>{props.mainMeal}</Text>
        </View>
        <View>
          <Text style={styles.subtitle}>Prato Principal - Vegetariano:</Text>
          <Text style={styles.itemMenuSubject}>{props.mainMealVegetarian}</Text>
        </View>
        <View>
          <Text style={styles.subtitle}>Prato Principal - Intolerante/Vegano:</Text>
          <Text style={styles.itemMenuSubject}>{props.mainMealVegan}</Text>
        </View>
        
        {shouldShow ? (
          <>
            <View>
              <Text style={styles.subtitle}>Guarnicão:</Text>
              <Text style={styles.itemMenuSubject}>{props.garrison}</Text>
            </View>
            <View>
              <Text style={styles.subtitle}>Arroz:</Text>
              <Text style={styles.itemMenuSubject}>{props.rice}</Text>
            </View>
            <View>
              <Text style={styles.subtitle}>Feijão:</Text>
              <Text style={styles.itemMenuSubject}>{props.bean}</Text>
            </View>
            <View>
              <Text style={styles.subtitle}>Saladas:</Text>
              <Text style={styles.itemMenuSubject}>{props.salad}</Text>
            </View>
            <View>
              <Text style={styles.subtitle}>Sobremesa:</Text>
              <Text style={styles.itemMenuSubject}>{props.desert}</Text>
            </View>
            <View style={styles.money}>
              <MaterialIcons name="payments" size={20} color={theme.colors.onSurfaceVariant} />
              <Text style={styles.itemMenuSubjectPrice}>{props.studentPrice} (estudante) ou {props.price} (visitante).</Text>
            </View>
            <TouchableOpacity style={styles.details} onPress={() => setShouldShow(!shouldShow)}>
          
              <Text style={styles.verText}>Ver menos</Text>
              <MaterialIcons name="expand-less" size={24} color={theme.colors.primary} />
              
            </TouchableOpacity>
          </>
        ) : null}
        {!shouldShow && <TouchableOpacity style={styles.details} onPress={() => setShouldShow(!shouldShow)}>
          
          <Text style={styles.verText}> Ver mais</Text>
          <MaterialIcons name="expand-more" size={24} color={theme.colors.primary} />
          
        </TouchableOpacity>}
          <View style={styles.fixBox}/>

      </View>
    </View>
  );
};


export default Menu;
