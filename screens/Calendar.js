import { useNavigation } from "@react-navigation/core";
import React from 'react';
import { StyleSheet, View } from "react-native";
import { LocaleConfig } from 'react-native-calendars';
import { FAB, useTheme } from 'react-native-paper';
import { useSelector } from 'react-redux';
import Agenda from '../components/Agenda';
import { defaultSubject, defaultTask } from '../helpers/helper';

export function Calendar() {

  LocaleConfig.locales['br'] = {
    monthNames: [
      'Janeiro',
      'Fevereiro',
      'Março',
      'Abril',
      'Maio',
      'Junho',
      'Julho',
      'Agosto',
      'Setembro',
      'Outubro',
      'Novembro',
      'Dezembro'
    ],
    monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
    dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
    today: "Hoje"
  };
  LocaleConfig.defaultLocale = 'br';
  return (
    <View style={{ backgroundColor: "#000", flex: 1 }}>
      <EventsScreen />
    </View>
  );

}

function EventsScreen() {

  let stMarked = useSelector(state => state.cards).marked;
  let stItems = useSelector(state => state.cards).items;


  const renderEmptyDate = () => {
    return (
      <View style={{ backgroundColor: 'transparent', width: 100, height: 0 }}>
      </View>
    );
  };
  const navigation = useNavigation()
  const rowHasChanged = (r1, r2) => r1 !== r2;
  const th = useTheme()
  const colors = th.colors;
  const [state, setState] = React.useState({ open: false });

  const onStateChange = ({ open }) => setState({ open });

  const { open } = state;
  const styles = StyleSheet.create({
    fab: {
      borderRadius: 10,
      backgroundColor: colors.surface3
    },
    activedFAB: {
      borderRadius: 10,
      backgroundColor: colors.primary
    }
  })
  return (
    <>
      <Agenda items={stItems} marked={stMarked} />


      <FAB.Group
        open={open}
        icon={'plus'}
        fabStyle={open ? { width: 0, height: 0 } : styles.fab}
        visible={!open}
        color={colors.primary}

        actions={[
          {
            icon: 'book',
            label: 'Matéria',
            style: styles.fab,
            color: colors.primary,
            onPress: () => navigation.navigate("EditScreen", { task: defaultSubject }),
          },
          {
            icon: 'calendar',
            label: 'Evento',
            style: styles.activedFAB,
            color: colors.onPrimary,
            onPress: () => navigation.navigate("EditScreen", { task: defaultTask }),
            small: false,
          },
        ]}
        onStateChange={onStateChange}
        onPress={() => {
          if (open) {
            // do something if the speed dial is open
          }
        }}
      />

    </>
  );
};

