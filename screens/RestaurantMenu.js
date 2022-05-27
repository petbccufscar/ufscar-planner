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
  // const today = new Date(2020, 2,18);
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
  const user = useSelector((state) => state.user).user;

  useEffect(() => {
    menuScrapping(selectedDay);
    console.log("carregando!!")

  }, [selectedDay, user]);


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

  function getPrice(prices, typeName){
    try{
      return prices[prices.indexOf(typeName) + 1].trim();
    }
    catch (e){
      return "Não Definido";
    }
  }

  async function menuScrapping(date) {
    const dateString = formatDate(date);
    const campus = {
      "sorocaba" : {
        'urlCard':`https://www.sorocaba.ufscar.br/restaurante-universitario/cardapio`,
        'urlPrice':`https://www.sorocaba.ufscar.br/restaurante-universitario/preco-das-refeicoes`,
        'lunchStart':"11h00",
        'lunchEnd':"13h30",
        'dinnerStart':"17h30",
        'dinnerEnd':"19h00",
        'satStart':"11h00",
        'satEnd':"13h00"
      },
      "araras" : {
        'urlCard':`https://www.araras.ufscar.br/restaurante-universitario/cardapio`,
        'urlPrice':`https://www.araras.ufscar.br/restaurante-universitario/preco-das-refeicoes`,
        'lunchStart':"11h00",
        'lunchEnd':"13h30",
        'dinnerStart':"18h00",
        'dinnerEnd':"19h30",
      },
      "são carlos" : {
        'urlCard':`https://www.ufscar.br/restaurantes-universitario/restaurantes-universitario/cardapio`,
        'urlPrice':`https://www.ufscar.br/restaurantes-universitario/restaurantes-universitario/restaurantes-universitario/restaurantes-universitario-precos`,
        'lunchStart':"11h15",
        'lunchEnd':"13h30",
        'dinnerStart':"17h15",
        'dinnerEnd':"19h30",
        'satStart':"11h30",
        'satEnd':"13h00"
      }
    };
    const local = user.campus.toLocaleLowerCase();
    console.log('location: ',local)
    const searchUrl = campus[local]['urlCard'];
    const priceUrl = campus[local]['urlPrice'];
    const response = await fetch(searchUrl);
    const priceResponse = await fetch(priceUrl);

    const htmlString = await response.text();
    const priceHtmlString = await priceResponse.text();
    
    let $ = cheerio.load(htmlString);
    const weekMenu = $(".col-lg-7.metade.periodo");
    
    $ = cheerio.load(priceHtmlString);
    const priceMenu = $(".col-sm-12");
    console.log(priceMenu.length, weekMenu.length);
    
    let prices = priceMenu.eq(0).text();

    prices = prices.split("\n").filter(x => x !== "");

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
    if(prices.indexOf("Estudante (UFSCar)") != -1)
      dayMenu.priceDefault = getPrice(prices, "Estudante (UFSCar)");
    else
      dayMenu.priceDefault =  prices[prices.findIndex( x => 0 < (x.match(/Aluno/g) || []).length) + 1];
    dayMenu.priceVisit = getPrice(prices, "Visitante");

    let timeStart;
    let timeEnd;

    if(lunchMenu.day == 6){
      try{
        timeStart = campus[local]['satStart'];
        timeEnd = campus[local]['satEnd'];
      }
      catch(e){
        timeStart = "Não Definido";
        timeEnd = "Não Definido";
      }
    }
    else {
      timeStart = campus[local]['lunchStart'];
      timeEnd = campus[local]['lunchEnd'];
    }
    dayMenu.lunchStartTime = timeStart
    dayMenu.lunchEndTime = timeEnd

    if(dinnerMenu.day == 6){
      try{
        timeStart = campus[local]['satStart'];
        timeEnd = campus[local]['satEnd'];
      }
      catch(e){
        timeStart = "Não Definido";
        timeEnd = "Não Definido";
      }
    }
    else {
      timeStart = campus[local]['dinnerStart'];
      timeEnd = campus[local]['dinnerEnd'];
    }
    dayMenu.dinnerStartTime = timeStart,
    dayMenu.dinnerEndTime = timeEnd


    let foundLunch = false
    let foundDinner = false

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
        dayMenu.rice = getMenuItem(menu, "Arroz");
        dayMenu.bean = getMenuItem(menu, "Feijão");
        dayMenu.salad = getMenuItem(menu, "Saladas");
        dayMenu.desert = getMenuItem(menu, "Sobremesa");

        if (menu.includes("ALMOÇO")){
          setLunchMenu({ ...dayMenu });
          foundLunch = true;
        } 
        else if (menu.includes("JANTAR")){
          setDinnerMenu({ ...dayMenu });
          foundDinner = true;
        } 
      }
    }
    if(!foundLunch)
      setLunchMenu({ ...dayMenu });
    if(!foundDinner)
      setDinnerMenu({ ...dayMenu });


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
    <View style={{...styles.backgroundColor, flex:1 }}>
      <ScrollView>
        <RestaurantTickets />
        <View style={styles.infoView}>
          <Foundation name="info" size={24} color={theme.colors.outline} />
          <Text style={styles.infoText}>
            Edite o valor de cada refeição nas configurações.
          </Text>
        </View>
        {user.campus.toLocaleLowerCase() != "lagoa do sino" && <>
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
        </>}
        <View style={{ height: 30 }}></View>

      </ScrollView>
    </View>
  );
}