import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Appbar } from "react-native-paper";
import Constants from "expo-constants";
import Menu from "../components/HomeMenu";
import { Days, hourHeight, hourWidth } from "../helpers/CalendarHelper";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/core";
import cheerio from "react-native-cheerio";
import { ScrollView } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import { formatDate, formatReal } from "../helpers/helper";

export default function Wallet() {
  const navigation = useNavigation();
  const cash = useSelector((state) => state.user).user.money;
  const timeWidth = wp("100%") - 7.5 * hourWidth;
  const today = new Date();
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
    mainMealVegetarian: "Não Definido.",
    garrison: "Não Definido.",
    rice: "Não Definido.",
    bean: "Não Definido.",
    salad: "Não Definido.",
    desert: "Não Definido.",
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
    garrison: "Não Definido.",
    rice: "Não Definido.",
    bean: "Não Definido.",
    salad: "Não Definido.",
    desert: "Não Definido.",
  });

  useEffect(() => {
    menuScrapping(selectedDay);
  }, [selectedDay]);

  function getMenuItem(menu, itemName) {
    return menu.split(itemName + ": ")[1].split("\n")[0];
  }

  async function menuScrapping(date) {
    const dateString = formatDate(date);
    const searchUrl = `https://www.ufscar.br/restaurantes-universitario/restaurantes-universitario/cardapio`;
    const response = await fetch(searchUrl);

    const htmlString = await response.text();
    const $ = cheerio.load(htmlString);

    const weekMenu = $(".col-lg-7.metade.periodo");
    for (let i = 0; i < weekMenu.length; i++) {
      const menu = weekMenu.eq(i).text();
      if (menu.includes(dateString)) {
        const dayMenu = {
          mainMeal: "Não Definido.",
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
        dayMenu.garrison = getMenuItem(menu, "Guarnição");
        dayMenu.rice = getMenuItem(menu, "Arroz");
        dayMenu.bean = getMenuItem(menu, "Feijão");
        dayMenu.salad = getMenuItem(menu, "Saladas");
        dayMenu.desert = getMenuItem(menu, "Sobremesa");

        if (menu.includes("ALMOÇO")) setLunchMenu({ ...dayMenu });
        else if (menu.includes("JANTAR")) setDinnerMenu({ ...dayMenu });
      }
    }
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.title}>
          <Text style={styles.balanceTitle}>Cardápio</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Restaurant")}>
            <Text style={styles.cash}>{formatReal(cash)}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.semana}>
          <View style={(styles.dias, { width: timeWidth })} />
          <Days
            days={days}
            selectedDay={selectedDay}
            setSelectedDay={setSelectedDay}
          />
        </View>
        <View>
          <Menu
            shouldShow={true}
            mealTime={"Almoço"}
            day={lunchMenu.day}
            lunchStartTime={lunchMenu.lunchStartTime}
            lunchEndTime={lunchMenu.lunchEndTime}
            saturdayLunchStartTime={lunchMenu.saturdayLunchStartTime}
            saturdayLunchEndTime={lunchMenu.saturdayLunchEndTime}
            mainMeal={lunchMenu.mainMeal}
            mainMealVegetarian={lunchMenu.mainMealVegetarian}
            garrison={lunchMenu.garrison}
            rice={lunchMenu.rice}
            bean={lunchMenu.bean}
            salad={lunchMenu.salad}
            desert={lunchMenu.desert}
            price={"RS 5,20"}
          ></Menu>
          {lunchMenu.day != "6" ? (
            <Menu
              shouldShow={true}
              mealTime={"Jantar"}
              dinnerStartTime={dinnerMenu.dinnerStartTime}
              dinnerEndTime={dinnerMenu.dinnerEndTime}
              mainMeal={dinnerMenu.mainMeal}
              mainMealVegetarian={dinnerMenu.mainMealVegetarian}
              garrison={dinnerMenu.garrison}
              rice={dinnerMenu.rice}
              bean={dinnerMenu.bean}
              salad={dinnerMenu.salad}
              desert={dinnerMenu.desert}
              price={"RS 5,20"}
            ></Menu>
          ) : null}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    paddingTop: 15,
    padding: 10,
    width: "100%",
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: "#fff",
    borderBottomColor: "#C4C4C4",
    borderBottomWidth: 0.5,
  },
  balanceTitle: {
    position: "absolute",
    alignSelf: "center",
    fontSize: 32,
    color: "#484848",
    textAlign: "center",
  },
  cash: {
    fontSize: 14,
    alignSelf: "flex-end",
    textAlign: "center",
    borderRadius: 5,
    fontWeight: "bold",
    padding: 8,
    marginRight: 10,
    backgroundColor: "#E8243C",
    color: "#FFFF",
  },
  meals: {
    flex: 1,
    padding: 10,
  },
  semana: {
    height: hourHeight,
    width: wp("100%"),
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#F8F8F8",
    marginBottom: 20,
  },
  dias: {
    width: hourWidth,
    height: hourHeight,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
});
