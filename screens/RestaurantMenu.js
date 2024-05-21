import React, { useEffect, useState } from "react";
import {
  RefreshControl,
  StyleSheet,
  Text,
  View,
  Linking,
  TouchableOpacity
} from "react-native";
import Menu from "../components/HomeMenu";
import { Days } from "../helpers/CalendarHelper";
import { useNavigation } from "@react-navigation/core";
import ScrollView from "./../components/ScrollView";
import { useDispatch, useSelector } from "react-redux";
import {
  offsetDate,
  formatDateWithHour,
  floorDate,
} from "../helpers/helper";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "react-native-paper";
import { Foundation } from "@expo/vector-icons";
import RestaurantTicket from "../components/RestaurantTicket";
import { updateCardapio } from "../redux/actions/restaurantActions";
import { useNetInfo } from "@react-native-community/netinfo";
import { isBalanceSyncEnabled, tryGetBalance } from "../helpers/balance";
import { updateUser } from "../redux/actions/userActions";


export default function Wallet() {
  const navigation = useNavigation();
  const netInfo = useNetInfo();
  const today = new Date();
  const first = offsetDate(today, -today.getDay());
  const last = offsetDate(today, 7 - today.getDay());
  const days = { begin: first, end: last, today: today };
  const [selectedDay, setSelectedDay] = useState(today);
  const [refreshing, setRefreshing] = useState(true);
  const [balanceOk, setBalanceOk] = useState(true);
  const restaurant = useSelector((state) => state.restaurant);
  const weekMenu = restaurant.weekMenu;
  const user = useSelector((state) => state.user).user;

  const dispatch = useDispatch();

  function setWeekMenu(data) {
    dispatch(
      updateCardapio({ updatedAt: new Date().toISOString(), weekMenu: data }),
    );
  }

  async function getWeekMenu() {
    if (!netInfo.isConnected) {
      return false;
    }

    let auxWeekMenu = {};
    for (let i = 0; i < 7; i++) {
      const newDate = offsetDate(days.begin, i);
      const dayMenu = await menuScrapping(newDate);
      auxWeekMenu[floorDate(newDate)] = dayMenu;
    }

    try { auxWeekMenu.notice = await noticeDoRU(); } catch (_) { /* empty */ }

    setWeekMenu(auxWeekMenu);
    return true;
  }

  async function getBalance() {
    const balance = await tryGetBalance(user);
    if (typeof balance === "number") {
      dispatch(updateUser({ ...user, money: balance }));
      setBalanceOk(true);
    } else {
      setBalanceOk(false);
    }
  }

  useEffect(() => {
    if (refreshing && netInfo.isConnected && isBalanceSyncEnabled(user)) {
      getBalance();
    }
  }, [refreshing, netInfo.isConnected, user.balanceSyncToken]);

  useEffect(() => {
    if (refreshing) {
      getWeekMenu().then((result) => {
        if (refreshing && result) {
          setRefreshing(false);
        }
      });
    }
  }, [user, netInfo.isConnected, refreshing]);

  const campus = {
    sorocaba: {
      urlCard: "https://www.sorocaba.ufscar.br/restaurante-universitario/cardapio",
      lunchStart: "11h00",
      lunchEnd: "13h30",
      dinnerStart: "17h00",
      dinnerEnd: "19h00",
      satLunchStart: "11h00",
      satLunchEnd: "13h00",
    },
    araras: {
      urlCard: "https://www.araras.ufscar.br/restaurante-universitario/cardapio",
      lunchStart: "11h00",
      lunchEnd: "13h30",
      dinnerStart: "18h00",
      dinnerEnd: "19h30",
      satLunchStart: "11h00",
      satLunchEnd: "12h30",
    },
    "são carlos": {
      urlCard: "https://www.ufscar.br/restaurantes-universitario/restaurantes-universitario/cardapio",
      lunchStart: "10h30",
      lunchEnd: "14h00",
      dinnerStart: "16h45",
      dinnerEnd: "19h00",
      satLunchStart: "11h30",
      satLunchEnd: "13h00",
      satDinnerStart: "17h30",
      satDinnerEnd: "18h30",
    },
    "lagoa do sino": {
      urlCard: "https://www.ufscar.br/restaurantes-universitario/restaurantes-universitario/cardapio",
      lunchStart: "10h30",
      lunchEnd: "13h30",
    },
  };

  const local = user.campus.toLocaleLowerCase();

  let respostaAPI = [];

  async function noticeDoRU() {
    const response = await fetch("https://petbcc.ufscar.br/ru_api/notice");
    if (!response.ok) { return null; }
    const data = await response.json();
    return data;
  }

  async function apiDoRU(date, isLunch) {
    const response = await fetch("https://petbcc.ufscar.br/ru_api/");
    respostaAPI = await response.json();
    var tzoffset = new Date().getTimezoneOffset() * 60000;
    const searchDate = new Date(date - tzoffset).toISOString()
      .split("T")[0];
    const mealType = isLunch ? "Almoço" : "Jantar";
    for (let i = 0; i < respostaAPI.length; i++) {
      const r = respostaAPI[i];
      if (
        respostaAPI[i].meal_type == mealType &&
        respostaAPI[i].date == searchDate &&
        r.campus.toLocaleLowerCase() == user.campus.toLocaleLowerCase()
      ) {
        return {
          mainMeal: r.main_dish_unrestricted,
          mainMealExtra: r.main_dish_extra,
          mainMealVegetarian: r.main_dish_vegetarian,
          garrison: r.garnish,
          rice: r.accompaniment,
          bean: "Não Definido",
          salad: r.salads,
          desert: r.dessert,
          juice: r.juice,
        };
      }
    }
  }

  async function priceScrapping(date) {
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
      priceDefault: "R$ 4,20",
      priceVisit: "R$ 13,50",
    };

    try {
      let timeStart = campus[local]["lunchStart"];
      let timeEnd = campus[local]["lunchEnd"];
      if (date.getDay() == 6) {
        try {
          timeStart = campus[local]["satLunchStart"];
          timeEnd = campus[local]["satLunchEnd"];
        } catch (e) {
          timeStart = "Não Definido";
          timeEnd = "Não Definido";
        }
      }
      dayMenu.lunchStartTime = timeStart;
      dayMenu.lunchEndTime = timeEnd;

      timeStart = campus[local]["dinnerStart"];
      timeEnd = campus[local]["dinnerEnd"];
      if (date.getDay() == 6) {
        try {
          timeStart = campus[local]["satDinnerStart"];
          timeEnd = campus[local]["satDinnerEnd"];
        } catch (e) {
          timeStart = "Não Definido";
          timeEnd = "Não Definido";
        }
      }
      dayMenu.dinnerStartTime = timeStart, dayMenu.dinnerEndTime = timeEnd;
    } catch (e) {
      console.log(e);
    }
    return dayMenu;
  }

  async function menuScrapping(date) {
    let dayMenu = await priceScrapping(date);
    let auxDayMenu = {};

    try {
      const r = await apiDoRU(date, true);
      auxDayMenu.lunch = { ...dayMenu, ...r };
    } catch (e) {
      auxDayMenu.lunch = dayMenu;
    }

    try {
      const r = await apiDoRU(date, false);
      auxDayMenu.dinner = { ...dayMenu, ...r };
    } catch (e) {
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
    alertView: {
      borderBottomWidth: 1,
      borderColor: theme.colors.outline,
      marginHorizontal: 20,
      padding: 10,
    },
    alertCard: {
      flexDirection: "row",
      backgroundColor: theme.colors.surface,
      borderRadius: 12,
      marginTop: 20,
      padding: 10,
      alignItems: "center",
      marginHorizontal: 20,
      borderColor: theme.colors.outline,
      borderWidth: 1,
    },
    alertIcon: {
      marginRight: 10,
    },
    alertTitle: {
      color: theme.colors.onSurface,
      fontSize: 20,
    },
    alertSubtitle: {
      color: theme.colors.onSurfaceVariant,
      fontSize: 14,
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
        {
          weekMenu.notice &&
          <TouchableOpacity
            onPress={
              () => navigation.navigate("RestaurantNotice", weekMenu.notice)
            }
          >
            <View style={styles.alertCard}>
              <MaterialIcons
                name="info"
                size={24}
                color={theme.colors.onSurfaceVariant}
                style={styles.alertIcon}
              />
              <View style={{ flex: 1 }}>
                <Text style={styles.alertTitle}>
                  {weekMenu.notice.title}
                </Text>
                <Text style={styles.alertSubtitle}>
                  {weekMenu.notice.description}
                </Text>
              </View>
              <MaterialIcons
                name="chevron-right"
                size={24}
                color={theme.colors.onSurfaceVariant}
              />
            </View>
          </TouchableOpacity>
        }
        <RestaurantTicket
          showControls={!isBalanceSyncEnabled(user)}
          hasError={!balanceOk}
        />
        <View style={styles.infoView}>
          <Foundation name="info" size={24} color={theme.colors.outline} />
          <Text style={styles.infoText}>
            Edite o valor de cada refeição nas configurações.
          </Text>
        </View>
        {(
          <>
            <TouchableOpacity onPress={() => Linking.openURL("https://www.proad.ufscar.br/pt-br/servicos/restaurante-universitario")} style={styles.cardapioView}>
              <Text style={styles.cardapioText}>Cardápio</Text>
              <Text style={styles.cardapioSubText}>
                {restaurant.updatedAt ?
                  `Informações obtidas pela última em ${formatDateWithHour(
                    new Date(restaurant.updatedAt),
                  )}.
fontes: 
  https://www.proad.ufscar.br/pt-br/servicos/restaurante-universitario
                    ` :
                  "Não foi possível obter as informações. Dispositivo offline."}
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
            {
              weekMenu[floorDate(selectedDay)]?.lunch.day != "6" &&
              local != "lagoa do sino" ?
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
                ></Menu> :
                null}
          </>
        )}
        <View style={{ height: 30 }}></View>
      </ScrollView>
    </View>
  );
}
