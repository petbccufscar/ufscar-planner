import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Appbar } from "react-native-paper";
import Constants from "expo-constants";
import Menu from "../components/HomeMenu";
import { Days, hourWidth } from "../helpers/CalendarHelper";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/core";
import cheerio from "react-native-cheerio";
import ScrollView from "./../components/ScrollView";
import { useSelector } from "react-redux";
import { formatDate, formatReal } from "../helpers/helper";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "react-native-paper";
import { Foundation } from "@expo/vector-icons";
import RestaurantTickets from "../components/RestaurantTickt";

export default function Wallet() {
  const navigation = useNavigation();
  const timeWidth = wp("100%") - 7.5 * hourWidth;
  const today = new Date(2020, 2,18);
  const first = new Date(
    today.getTime() - (today.getDay() - 1) * 24 * 60 * 60 * 1000
  );
  const last = new Date(
    today.getTime() + (7 - today.getDay() + 1) * 24 * 60 * 60 * 1000
  );
  const days = { begin: first, end: last, today: today };
  const [lunchMenu, setLunchMenu] = useState({
    /* 
      Fonte dos horários:
      https://www.ufscar.br/restaurantes-universitario/restaurantes-universitario-horario-de-funcionamento
     */
    day: today.getDay(),
    lunchStartTime: "11:15h",
    lunchEndTime: "13:30h",
    saturdayLunchStartTime: "11:30h",
    saturdayLunchEndTime: "13:00h",
    mainMeal: "Não Definido.",
    mainMealVegan: "Não Definido.",
    mainMealVegetarian: "Não Definido.",
    garrison: "Não Definido.",
    rice: "Não Definido.",
    bean: "Não Definido.",
    salad: "Não Definido.",
    desert: "Não Definido.",
    priceDefault: "R$ ???",
    priceVisit: "R$ ???"
  });
  const [selectedDay, setSelectedDay] = useState(today);

  const [dinnerMenu, setDinnerMenu] = useState({
    /* 
      Fonte dos horários:
      https://www.ufscar.br/restaurantes-universitario/restaurantes-universitario-horario-de-funcionamento
     */
    dinnerStartTime: "17:15h",
    dinnerEndTime: "19:00h",
    mainMeal: "Não Definido.",
    mainMealVegetarian: "Não Definido.",
    mainMealVegan: "Não Definido.",
    garrison: "Não Definido.",
    rice: "Não Definido.",
    bean: "Não Definido.",
    salad: "Não Definido.",
    desert: "Não Definido.",
    priceDefault: "R$ ???",
    priceVisit: "R$ ???"
  });

  useEffect(() => {
    menuScrapping(selectedDay);
  }, [selectedDay]);

  function getMenuItem(menu, itemName) {
    try {
      const result = (menu.split(itemName+":")[1].split("\n")[0]).trim()
      if (result.trim().length > 0)
        return result.trim();
      else
        return "Não Definido."
    } catch (e){
      return "Não Definido."
    }
  }

  async function menuScrapping(date) {
    const dateString = formatDate(date);
    const campus = {
      "sorocaba" : {
        'urlCard':`https://www.sorocaba.ufscar.br/restaurante-universitario/cardapio`,
        'urlPrice':'https://www.sorocaba.ufscar.br/restaurante-universitario/preco-das-refeicoes'
      },
      "araras" : {
        'urlCard':`https://www.araras.ufscar.br/restaurante-universitario/cardapio`,
        'urlPrice':'https://www.araras.ufscar.br/restaurante-universitario/preco-das-refeicoes'

      },
      "são carlos" : {
        'urlCard':`https://www.ufscar.br/restaurantes-universitario/restaurantes-universitario/cardapio`,
        'urlPrice':'https://www.ufscar.br/restaurantes-universitario/restaurantes-universitario/restaurantes-universitario/restaurantes-universitario-precos'

      }
    };

    const searchUrl = campus['araras']['urlCard'];
    const response = await fetch(searchUrl);

    const htmlString = await response.text();
    const $ = cheerio.load(htmlString);

    const weekMenu = $(".col-lg-7.metade.periodo");
    for (let i = 0; i < weekMenu.length; i++) {
      const menu = weekMenu.eq(i).text();
      if (menu.includes(dateString)) {
        const dayMenu = {
          mainMeal: "Não Definido.",
          mainMealVegan: "Não Definido.",
          mainMealVegetarian: "Não Definido.",
          garrison: "Não Definido.",
          rice: "Não Definido.",
          bean: "Não Definido.",
          salad: "Não Definido.",
          desert: "Não Definido.",
        };
        dayMenu.mainMeal = getMenuItem(menu, "Prato Principal");
        
        dayMenu.mainMealVegetarian = getMenuItem(
          menu,
          "Prato Principal - Vegetariano"
        );
        dayMenu.mainMealVegan = getMenuItem(
          menu,
          "Prato Principal - Intolerante/Vegano"
        );
        dayMenu.garrison = getMenuItem(menu, "Guarnição");
        dayMenu.rice = getMenuItem(menu, "Arroz");
        dayMenu.bean = getMenuItem(menu, "Feijão");
        dayMenu.salad = getMenuItem(menu, "Saladas");
        dayMenu.desert = getMenuItem(menu, "Sobremesa");
        if (menu.includes("ALMOÇO")){
          setLunchMenu({ ...dayMenu });
        } 
        else if (menu.includes("JANTAR")){
          setDinnerMenu({ ...dayMenu });
        } 
      }
    }

  }

  const theme = useTheme();

  const styles = StyleSheet.create({
    backgroundColor: {
      backgroundColor: theme.colors.surface1,
    },
    infoView: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      borderBottomWidth: 1,
      borderColor: theme.colors.outline,
      marginHorizontal: 20,
      padding: 10,
    },
    infoText: {
      color: theme.colors.outline,
      fontSize: 12,
      textAlign: "center",
      padding: 10,
    },
    cardapioView: {
      padding: 20,
    },
    cardapioText: {
      color: theme.colors.onSurface,
      fontSize: 30,
      flexDirection: "row",
    },
    cardapioSubText: {
      color: theme.colors.outline,
      fontSize: 11,
    },
  });

  return (
    <View style={styles.backgroundColor}>
      <ScrollView>
        <RestaurantTickets />
        <View style={styles.infoView}>
          <Foundation name="info" size={24} color={theme.colors.outline} />
          <Text style={styles.infoText}>
            Edite o valor de cada refeição nas configurações.
          </Text>
        </View>
        <View style={styles.cardapioView}>
          <Text style={styles.cardapioText}>Cardápio</Text>
          <Text style={styles.cardapioSubText}>
            Informações obtidas pela última vez às 11h38.
          </Text>
        </View>

        <Days
          days={days}
          selectedDay={selectedDay}
          setSelectedDay={setSelectedDay}
        />
        <Menu
          shouldShow={false}
          mealTime={"Almoço"}
          day={lunchMenu.day}
          lunchStartTime={lunchMenu.lunchStartTime}
          lunchEndTime={lunchMenu.lunchEndTime}
          saturdayLunchStartTime={lunchMenu.saturdayLunchStartTime}
          saturdayLunchEndTime={lunchMenu.saturdayLunchEndTime}
          mainMeal={lunchMenu.mainMeal}
          mainMealVegetarian={lunchMenu.mainMealVegetarian}
          mainMealVegan={lunchMenu.mainMealVegan}
          garrison={lunchMenu.garrison}
          rice={lunchMenu.rice}
          bean={lunchMenu.bean}
          salad={lunchMenu.salad}
          desert={lunchMenu.desert}
          studentPrice={lunchMenu.priceDefault}
          price={lunchMenu.priceVisit}
        ></Menu>
        {lunchMenu.day != "6" ? (
          <Menu
            shouldShow={false}
            mealTime={"Jantar"}
            dinnerStartTime={dinnerMenu.dinnerStartTime}
            dinnerEndTime={dinnerMenu.dinnerEndTime}
            mainMeal={dinnerMenu.mainMeal}
            mainMealVegan={lunchMenu.mainMealVegan}
            mainMealVegetarian={dinnerMenu.mainMealVegetarian}
            garrison={dinnerMenu.garrison}
            rice={dinnerMenu.rice}
            bean={dinnerMenu.bean}
            salad={dinnerMenu.salad}
            desert={dinnerMenu.desert}
            studentPrice={dinnerMenu.priceDefault}
            price={dinnerMenu.priceVisit}
          ></Menu>
        ) : null}

        <View style={{ height: 10 }}></View>

      </ScrollView>
    </View>
  );
}
