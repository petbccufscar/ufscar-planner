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
import { useDispatch, useSelector } from "react-redux";
import {
  formatDate,
  formatReal,
  offsetDate,
  formatDateWithHour,
} from "../helpers/helper";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "react-native-paper";
import { Foundation } from "@expo/vector-icons";
import RestaurantTickets from "../components/RestaurantTickt";
import { updateCardapio } from "../redux/actions/restaurantActions";
import { useNetInfo } from "@react-native-community/netinfo";

export default function Wallet() {
  const navigation = useNavigation();
  const netInfo = useNetInfo();
  const timeWidth = wp("100%") - 7.5 * hourWidth;
  // const today = new Date(2020, 2, 18);
  const today = new Date();
  const first = offsetDate(today, -today.getDay());
  const last =  offsetDate(today, 7-today.getDay());
  const days = { begin: first, end: last, today: today };
  const [selectedDay, setSelectedDay] = useState(today);

  const restaurant = useSelector((state) => state.restaurant);
  const weekMenu = restaurant.weekMenu;

  const user = useSelector((state) => state.user).user;

  const dispatch = useDispatch();

  function setWeekMenu(data) {
    dispatch(
      updateCardapio({ updatedAt: new Date().toISOString(), weekMenu: data })
    );
  }

  async function getWeekMenu() {
    if (!netInfo.isConnected) {
      return;
    }

    let auxWeekMenu = {};
    for (let i = 0; i < 7; i++) {
      const newDate = offsetDate(days.begin, i);
      const dayMenu = await menuScrapping(newDate);
      auxWeekMenu[formatDate(newDate)] = dayMenu;
    }
    // console.log(auxWeekMenu);
    setWeekMenu(auxWeekMenu);
  }

  useEffect(() => {
    getWeekMenu();
  }, [user, netInfo.isConnected]);

  function getMenuItem(menu, itemName) {
    try {
      const result = menu
        .split(itemName + ":")[1]
        .split("\n")[0]
        .trim();
      if (result.trim().length > 0) return result.trim();
      else return "Não Definido.";
    } catch (e) {
      return "Não Definido.";
    }
  }

  function getPrice(prices, typeName) {
    try {
      return prices[prices.indexOf(typeName) + 1].trim();
    } catch (e) {
      return "Não Definido";
    }
  }

  const campus = {
    sorocaba: {
      urlCard: `https://www.sorocaba.ufscar.br/restaurante-universitario/cardapio`,
      urlPrice: `https://www.sorocaba.ufscar.br/restaurante-universitario/preco-das-refeicoes`,
      lunchStart: "11h00",
      lunchEnd: "13h30",
      dinnerStart: "17h30",
      dinnerEnd: "19h00",
      satStart: "11h00",
      satEnd: "13h00",
    },
    araras: {
      urlCard: `https://www.araras.ufscar.br/restaurante-universitario/cardapio`,
      urlPrice: `https://www.araras.ufscar.br/restaurante-universitario/preco-das-refeicoes`,
      lunchStart: "11h00",
      lunchEnd: "13h30",
      dinnerStart: "18h00",
      dinnerEnd: "19h30",
    },
    "são carlos": {
      urlCard: `https://www.ufscar.br/restaurantes-universitario/restaurantes-universitario/cardapio`,
      urlPrice: `https://www.ufscar.br/restaurantes-universitario/restaurantes-universitario/restaurantes-universitario/restaurantes-universitario-precos`,
      lunchStart: "11h15",
      lunchEnd: "13h30",
      dinnerStart: "17h15",
      dinnerEnd: "19h30",
      satStart: "11h30",
      satEnd: "13h00",
    },
    "lagoa do sino": {
      urlCard: `https://www.ufscar.br/restaurantes-universitario/restaurantes-universitario/cardapio`,
      urlPrice: `https://www.ufscar.br/restaurantes-universitario/restaurantes-universitario/restaurantes-universitario/restaurantes-universitario-precos`,
      lunchStart: "11h15",
      lunchEnd: "13h30",
      dinnerStart: "17h15",
      dinnerEnd: "19h30",
      satStart: "11h30",
      satEnd: "13h00",
    },
  };

  const local = user.campus.toLocaleLowerCase();
  
  let respostaAPI = []
  let tried = null

  async function apiDoRU(date, isLunch){
    if (tried == null  || (new Date()).getTime() - tried.getTime() > 3600000 ){
      tried = new Date()
      const url = `https://ru-api.herokuapp.com/`

      const response = await fetch(url)
      const data = await response.json()

      respostaAPI = data
    }

    const searchDate = date.toISOString().split('T')[0] 
    const mealType = isLunch? "Almoço" : "Jantar"
    for(let i = 0; i < respostaAPI.length; i++){
      const r = respostaAPI[i]
      if (respostaAPI[i].meal_type == mealType && respostaAPI[i].date == searchDate && r.campus.toLocaleLowerCase() == user.campus.toLocaleLowerCase()){
        return {
          mainMeal: r.main_dish_unrestricted,
          mainMealVegan: "Não Definido.",
          mainMealVegetarian: r.main_dish_vegetarian,
          garrison: r.garnish,
          rice: r.accompaniment,
          bean: "Não Definido.",
          salad: r.salads,
          desert: r.dessert,
        } 
      }
    }

  }



  async function menuScrapping(date) {
    const dateString = formatDate(date);

    const searchUrl = campus[local]["urlCard"];
    const priceUrl = campus[local]["urlPrice"];
    let dayMenu = {
      mainMeal: "Não Definido.",
      mainMealVegan: "Não Definido.",
      mainMealVegetarian: "Não Definido.",
      garrison: "Não Definido.",
      rice: "Não Definido.",
      bean: "Não Definido.",
      salad: "Não Definido.",
      desert: "Não Definido.",
      priceDefault: "R$ ???",
      priceVisit: "R$ ???",
    };
    
    const response = await fetch(searchUrl);
    const priceResponse = await fetch(priceUrl);

    const htmlString = await response.text();
    const priceHtmlString = await priceResponse.text();

    let $ = cheerio.load(htmlString);
    const weekMenu = $(".col-lg-7.metade.periodo");

    $ = cheerio.load(priceHtmlString);
    const priceMenu = $(".col-sm-12");

    let prices = priceMenu.eq(0).text();

    prices = prices.split("\n").filter((x) => x !== "");

    if (prices.indexOf("Estudante (UFSCar)") != -1)
      dayMenu.priceDefault = getPrice(prices, "Estudante (UFSCar)");
    else
      dayMenu.priceDefault =
        prices[
        prices.findIndex((x) => 0 < (x.match(/Aluno/g) || []).length) + 1
        ];
    dayMenu.priceVisit = getPrice(prices, "Visitante");

    let timeStart;
    let timeEnd;

    if (date.getDay() == 6) {
      try {
        timeStart = campus[local]["satStart"];
        timeEnd = campus[local]["satEnd"];
      } catch (e) {
        timeStart = "Não Definido";
        timeEnd = "Não Definido";
      }
    } else {
      timeStart = campus[local]["lunchStart"];
      timeEnd = campus[local]["lunchEnd"];
    }
    dayMenu.lunchStartTime = timeStart;
    dayMenu.lunchEndTime = timeEnd;

    if (date.getDay() == 6) {
      try {
        timeStart = campus[local]["satStart"];
        timeEnd = campus[local]["satEnd"];
      } catch (e) {
        timeStart = "Não Definido";
        timeEnd = "Não Definido";
      }
    } else {
      timeStart = campus[local]["dinnerStart"];
      timeEnd = campus[local]["dinnerEnd"];
    }
    (dayMenu.dinnerStartTime = timeStart), (dayMenu.dinnerEndTime = timeEnd);

    let foundLunch = false;
    let foundDinner = false;
    let auxDayMenu = {};
    if (local.toLocaleLowerCase() != 'lagoa do sino'){
      for (let i = 0; i < weekMenu.length; i++) {
        const menu = weekMenu.eq(i).text();

        if (menu.includes(dateString)) {
          // let dayMenu = {...defaultMenu}

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
          dayMenu.rice = getMenuItem(menu, "Arroz") + ' e ' + getMenuItem(menu, "Feijão");
          dayMenu.salad = getMenuItem(menu, "Saladas");
          dayMenu.desert = getMenuItem(menu, "Sobremesa");

          if (menu.includes("ALMOÇO")) {
            auxDayMenu.lunch = dayMenu;
            foundLunch = true;
          } else if (menu.includes("JANTAR")) {
            auxDayMenu.dinner = dayMenu;
            foundDinner = true;
          }
        }
      }
    }
    if (!foundLunch){
      try {
        const r = await apiDoRU(date, true);
        auxDayMenu.lunch = {...dayMenu, ...r};
      }
      catch (e)
      {
        auxDayMenu.lunch = dayMenu;
      }
    }
    if (!foundDinner){
      try {
        const r = await apiDoRU(date, false)
        auxDayMenu.dinner = {...dayMenu, ...r};
      } 
      catch (e)
      {
        auxDayMenu.dinner = dayMenu;
      }
    } 
    return auxDayMenu;
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
    <View style={{ ...styles.backgroundColor, flex: 1 }}>
      <ScrollView>
        <RestaurantTickets />
        <View style={styles.infoView}>
          <Foundation name="info" size={24} color={theme.colors.outline} />
          <Text style={styles.infoText}>
            Edite o valor de cada refeição nas configurações.
          </Text>
        </View>
        {(
          <>
            <View style={styles.cardapioView}>
              <Text style={styles.cardapioText}>Cardápio</Text>
              <Text style={styles.cardapioSubText}>
                {restaurant.updatedAt
                  ? `Informações obtidas pela última em ${formatDateWithHour(
                    new Date(restaurant.updatedAt)
                  )}.
fontes: 
  ${campus[local]["urlCard"]},
  ${campus[local]["urlPrice"]} e 
  https://www.facebook.com/RU.UFSCar/
                    `
                  : "Não foi possível obter as informações. Dispositivo offline."}
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
              day={weekMenu[formatDate(selectedDay)]?.lunch.day}
              lunchStartTime={
                weekMenu[formatDate(selectedDay)]?.lunch.lunchStartTime
              }
              lunchEndTime={
                weekMenu[formatDate(selectedDay)]?.lunch.lunchEndTime
              }
              saturdayLunchStartTime={
                weekMenu[formatDate(selectedDay)]?.lunch.saturdayLunchStartTime
              }
              saturdayLunchEndTime={
                weekMenu[formatDate(selectedDay)]?.lunch.saturdayLunchEndTime
              }
              mainMeal={weekMenu[formatDate(selectedDay)]?.lunch.mainMeal}
              mainMealVegetarian={
                weekMenu[formatDate(selectedDay)]?.lunch.mainMealVegetarian
              }
              mainMealVegan={
                weekMenu[formatDate(selectedDay)]?.lunch.mainMealVegan
              }
              garrison={weekMenu[formatDate(selectedDay)]?.lunch.garrison}
              rice={weekMenu[formatDate(selectedDay)]?.lunch.rice}
              salad={weekMenu[formatDate(selectedDay)]?.lunch.salad}
              desert={weekMenu[formatDate(selectedDay)]?.lunch.desert}
              studentPrice={
                weekMenu[formatDate(selectedDay)]?.lunch.priceDefault
              }
              price={weekMenu[formatDate(selectedDay)]?.lunch.priceVisit}
            ></Menu>
            {weekMenu[formatDate(selectedDay)]?.lunch.day != "6" ? (
              <Menu
                shouldShow={false}
                mealTime={"Jantar"}
                dinnerStartTime={
                  weekMenu[formatDate(selectedDay)]?.dinner.dinnerStartTime
                }
                dinnerEndTime={
                  weekMenu[formatDate(selectedDay)]?.dinner.dinnerEndTime
                }
                mainMeal={weekMenu[formatDate(selectedDay)]?.dinner.mainMeal}
                mainMealVegan={
                  weekMenu[formatDate(selectedDay)]?.lunch.mainMealVegan
                }
                mainMealVegetarian={
                  weekMenu[formatDate(selectedDay)]?.dinner.mainMealVegetarian
                }
                garrison={weekMenu[formatDate(selectedDay)]?.dinner.garrison}
                rice={weekMenu[formatDate(selectedDay)]?.dinner.rice}
                bean={weekMenu[formatDate(selectedDay)]?.dinner.bean}
                salad={weekMenu[formatDate(selectedDay)]?.dinner.salad}
                desert={weekMenu[formatDate(selectedDay)]?.dinner.desert}
                studentPrice={
                  weekMenu[formatDate(selectedDay)]?.dinner.priceDefault
                }
                price={weekMenu[formatDate(selectedDay)]?.dinner.priceVisit}
              ></Menu>
            ) : null}
          </>
        )}
        <View style={{ height: 30 }}></View>
      </ScrollView>
    </View>
  );
}
