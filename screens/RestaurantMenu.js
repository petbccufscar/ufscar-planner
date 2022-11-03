import React, { useEffect, useState } from "react";
import { RefreshControl, StyleSheet, Text, TouchableOpacity, View, Linking } from "react-native";
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
  formatReal,
  offsetDate,
  formatDateWithHour,
  floorDate,
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
  const [refreshing, setRefreshing] = useState(true);
  const [stPrices, setStPrices] = useState(null);
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
      auxWeekMenu[floorDate(newDate)] = dayMenu;
    }
    setWeekMenu(auxWeekMenu);
  }

  useEffect(() => {
    if(refreshing || tried == null){
      getWeekMenu().then(() => {
        if (refreshing)
          setRefreshing(false)})
    }
  }, [user, netInfo.isConnected, refreshing]);


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
      const url = `https://petbcc.ufscar.br/ru_api/`

    if (tried == null  ||  (new Date()).getTime() - tried.getTime() > 50000  
    && refreshing ||
      ( (new Date()).getTime() - tried.getTime() > 1800000 )
    ){
      const url = `https://petbcc.ufscar.br/ru_api/`
      
      const response = await fetch(url)
      const data = await response.json()
      
      respostaAPI = data
      tried = new Date()
    }
    var tzoffset = (new Date()).getTimezoneOffset() * 60000;
    const searchDate = new Date(date - tzoffset).toISOString().split('T')[0] 
    const mealType = isLunch? "Almoço" : "Jantar"
    for(let i = 0; i < respostaAPI.length; i++){
      const r = respostaAPI[i]
      if (respostaAPI[i].meal_type == mealType && respostaAPI[i].date == searchDate && r.campus.toLocaleLowerCase() == user.campus.toLocaleLowerCase()){
        return {
          mainMeal: r.main_dish_unrestricted,
          mainMealExtra: r.main_dish_extra,
          mainMealVegetarian: r.main_dish_vegetarian,
          garrison: r.garnish,
          rice: r.accompaniment,
          bean: "Não Definido",
          salad: r.salads,
          desert: r.dessert,
          juice: r.juice
        } 
      }
    }

  }

  async function priceScrapping(date){
    const priceUrl = campus[local]["urlPrice"];
    let dayMenu = {
      mainMeal: "Não Definido",
      mainMealVegan: "Não Definido",
      mainMealExtra: "Não Definido",
      mainMealVegetarian: "Não Definido",
      garrison: "Não Definido",
      rice: "Não Definido",
      bean: "Não Definido",
      salad: "Não Definido",
      desert: "Não Definido",
      juice: "Não Definido",
      priceDefault: "R$ ???",
      priceVisit: "R$ ???",
    };

    try {
      let prices = [];
      if (stPrices == null){
        const priceResponse = await fetch(priceUrl);
        const priceHtmlString = await priceResponse.text();

        $ = cheerio.load(priceHtmlString);
        const priceMenu = $(".col-sm-12");

        prices = priceMenu.eq(0).text();

        prices = prices.split("\n").filter((x) => x !== "");
        setStPrices(prices);
      } else {
        prices = stPrices
      }


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
    } catch (e){
      console.log(e)
    }
    return dayMenu;
  }



  async function menuScrapping(date) {

    let dayMenu = await priceScrapping(date);
    let auxDayMenu = {};


      try {

        const r = await apiDoRU(date, true);
        auxDayMenu.lunch = {...dayMenu, ...r};
      }
      catch (e)
      {
        auxDayMenu.lunch = dayMenu;
      }

      try {
        const r = await apiDoRU(date, false)
        auxDayMenu.dinner = {...dayMenu, ...r};
      } 
      catch (e)
      {
        auxDayMenu.dinner = dayMenu;
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
      <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={() => setRefreshing(true)}
        />
      }
      >
        <RestaurantTickets />
        <View style={styles.infoView}>
          <Foundation name="info" size={24} color={theme.colors.outline} />
          <Text style={styles.infoText}>
            Edite o valor de cada refeição nas configurações.
          </Text>
        </View>
        {(
          <>
            <TouchableOpacity onPress={()=>Linking.openURL('https://www.proad.ufscar.br/pt-br/servicos/restaurante-universitario')} style={styles.cardapioView}>
              <Text style={styles.cardapioText}>Cardápio</Text>
              <Text style={styles.cardapioSubText}>
                {restaurant.updatedAt
                  ? `Informações obtidas pela última em ${formatDateWithHour(
                    new Date(restaurant.updatedAt)
                  )}.
fontes: 
  https://www.proad.ufscar.br/pt-br/servicos/restaurante-universitario
                    `
                  : "Não foi possível obter as informações. Dispositivo offline."}
              </Text>
            </TouchableOpacity>

            <Days
              days={days}
              selectedDay={selectedDay}
              setSelectedDay={setSelectedDay}
            />
            <Menu
              shouldShow={false}
              mealTime={"Almoço"}
              day={weekMenu[floorDate(selectedDay)]?.lunch.day}
              lunchStartTime={
                weekMenu[floorDate(selectedDay)]?.lunch.lunchStartTime
              }
              lunchEndTime={
                weekMenu[floorDate(selectedDay)]?.lunch.lunchEndTime
              }
              saturdayLunchStartTime={
                weekMenu[floorDate(selectedDay)]?.lunch.saturdayLunchStartTime
              }
              saturdayLunchEndTime={
                weekMenu[floorDate(selectedDay)]?.lunch.saturdayLunchEndTime
              }
              mainMeal={weekMenu[floorDate(selectedDay)]?.lunch.mainMeal}
              mainMealVegetarian={
                weekMenu[floorDate(selectedDay)]?.lunch.mainMealVegetarian
              }
              mainMealExtra={
                weekMenu[floorDate(selectedDay)]?.lunch.mainMealExtra
              }
              garrison={weekMenu[floorDate(selectedDay)]?.lunch.garrison}
              rice={weekMenu[floorDate(selectedDay)]?.lunch.rice}
              juice={weekMenu[floorDate(selectedDay)]?.lunch.juice}
              salad={weekMenu[floorDate(selectedDay)]?.lunch.salad}
              desert={weekMenu[floorDate(selectedDay)]?.lunch.desert}
              studentPrice={
                weekMenu[floorDate(selectedDay)]?.lunch.priceDefault
              }
              price={weekMenu[floorDate(selectedDay)]?.lunch.priceVisit}
            ></Menu>
            {weekMenu[floorDate(selectedDay)]?.lunch.day != "6" ? (
              <Menu
                shouldShow={false}
                mealTime={"Jantar"}
                dinnerStartTime={
                  weekMenu[floorDate(selectedDay)]?.dinner.dinnerStartTime
                }
                dinnerEndTime={
                  weekMenu[floorDate(selectedDay)]?.dinner.dinnerEndTime
                }
                mainMeal={weekMenu[floorDate(selectedDay)]?.dinner.mainMeal}
                mainMealExtra={
                  weekMenu[floorDate(selectedDay)]?.dinner.mainMealExtra
                }
                mainMealVegetarian={
                  weekMenu[floorDate(selectedDay)]?.dinner.mainMealVegetarian
                }
                garrison={weekMenu[floorDate(selectedDay)]?.dinner.garrison}
                rice={weekMenu[floorDate(selectedDay)]?.dinner.rice}
                juice={weekMenu[floorDate(selectedDay)]?.dinner.juice}
                bean={weekMenu[floorDate(selectedDay)]?.dinner.bean}
                salad={weekMenu[floorDate(selectedDay)]?.dinner.salad}
                desert={weekMenu[floorDate(selectedDay)]?.dinner.desert}
                studentPrice={
                  weekMenu[floorDate(selectedDay)]?.dinner.priceDefault
                }
                price={weekMenu[floorDate(selectedDay)]?.dinner.priceVisit}
              ></Menu>
            ) : null}
          </>
        )}
        <View style={{ height: 30 }}></View>
      </ScrollView>
    </View>
  );
}
