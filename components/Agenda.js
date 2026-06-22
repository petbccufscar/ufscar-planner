import React, { useEffect, useState, useRef } from "react";
import {
  Text,
  View,
  Pressable,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useTheme, ActivityIndicator } from "react-native-paper";
import {
  floorDate,
  monthNames,
  offsetDate,
  weekDaysNames,
} from "../helpers/helper";
import { EventCards } from "./EventCards";
import { FlatList } from "react-native-bidirectional-infinite-scroll";
import { MaterialIcons } from "@expo/vector-icons";

function floorDate2Date(date) {
  const data = new Date(date);
  return new Date(data.getTime() + new Date().getTimezoneOffset() * 60000);
}

function RenderCalendarRow(props) {
  const colors = props.colors;
  const date = props.date;
  const open = props.open;
  const marked = props.marked;
  const month = props.month;
  const setOpen = props.setOpen;
  const selectedDate = props.selectedDate;
  const setSelectedDate = props.setSelectedDate;
  const weekDays = [];
  const domingo = offsetDate(date, -date.getDay());
  let aux = domingo;
  for (let i = 0; i < 7; i++) {
    weekDays.push(aux);
    aux = offsetDate(aux, 1);
  }

  return <View style={{ flexDirection: "row" }}>
    {
      weekDays.map((day, index) => <RenderCalendarCell
        marked={marked}
        open={open}
        setOpen={setOpen}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        colors={colors}
        key={index}
        day={day}
        month={month}
      />)
    }
  </View>;
}

function RenderCalendarCell(props) {
  const date = props.day;
  const colors = props.colors;
  const month = props.month;
  const open = props.open;
  const setOpen = props.setOpen;
  const isToday = floorDate(date) == floorDate(new Date());
  const selected = floorDate(date) == floorDate(props.selectedDate);
  const setSelectedDate = props.setSelectedDate;
  const hasEvent = Object.keys(props.marked).includes(floorDate(date));

  if (open && date.getMonth() != month) {
    return <View style={{ flex: 1 }}></View>;
  }

  return <Pressable
    style={({ pressed }) => [
      calendarCellStyles.touchable,
      pressed && calendarCellStyles.pressed,
    ]}
    onPress={() => { setSelectedDate(date); setOpen(false); }}
  >
    <View style={calendarCellStyles.circle}>
      {selected &&
        <View
          pointerEvents="none"
          style={[
            calendarCellStyles.selectedBackground,
            { backgroundColor: colors.primary },
          ]}
        />
      }
      <Text
        style={{
          textAlign: "center",
          color: selected ?
            colors.onPrimary :
            isToday ?
              colors.primary :
              date.getMonth() == month ?
                colors.onSurface :
                colors.outline,
        }}>{date.getDate()}</Text>
      <View
        style={{
          borderRadius: 30,
          aspectRatio: 1,
          backgroundColor: hasEvent ?
            selected ?
              colors.onPrimary :
              colors.primary :
            "transparent",
          width: 10,
          position: "absolute",
          bottom: 0,
          alignSelf: "center",
        }} />
    </View>
  </Pressable>;
}

const calendarCellStyles = StyleSheet.create({
  touchable: {
    width: "14.28%",
    aspectRatio: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  pressed: {
    opacity: 0.7,
  },
  circle: {
    width: "80%",
    aspectRatio: 1,
    borderRadius: 999,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
  selectedBackground: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 999,
  },
});

const DISABLED_LOAD_THRESHOLD = -Number.MAX_SAFE_INTEGER;
const INITIAL_MONTH_RANGE = 3;

function RenderDay(props) {
  const day = props.day || new Date();
  const items = props.items[floorDate(day)] || [];
  const semana = weekDaysNames;
  const diaSemana = semana[day.getUTCDay()];
  const colors = useTheme().colors;
  const isToday = floorDate(day) == floorDate(new Date());

  const Divisor = () => {
    const yesterday = offsetDate(day, -1);
    return <View style={{ alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontSize: 20, color: colors.onSurface }}>
        {
          `Fim de ${monthNames[yesterday.getMonth()]} ` +
            `${yesterday.getFullYear()}`
        }
      </Text>
      <Text style={{ fontSize: 20, color: colors.onSurface }}>
        {`Inicio de ${monthNames[day.getMonth()]} ${day.getFullYear()}`}
      </Text>
    </View>;
  };

  const styles = StyleSheet.create({
    linha: {
      flexDirection: "row",
      flex: 1,
      margin: 10,
    },
    diaNum: {
      fontSize: 30,
      color: isToday ? colors.primary : colors.onSurface,
    },
    dia: {
      alignItems: "center",
      width: 40,
      paddingTop: 2,
    },
    diaText: {
      color: isToday ? colors.primary : colors.onSurface,
    },
    taskContainer: {
      flex: 1,
    },

  });
  return <>
    {1 == day.getDate() &&
      <Divisor />
    }
    <View style={styles.linha}>
      <View style={styles.dia}>
        <Text style={styles.diaNum}>{`${day.getUTCDate()}`}</Text>
        <Text style={styles.diaText}>{`${diaSemana}`}</Text>
      </View>
      <View style={styles.taskContainer}>
        {
          items.map(
            (item, index) => <EventCards
              style={{ marginTop: 0 }}
              key={index}
              task={item}
            ></EventCards>,
          )
        }
      </View>

    </View>
  </>;
}

function nextMonth(month) {
  const obj = {};
  if (month.month == 11) {
    obj["month"] = 0;
    obj["year"] = month.year + 1;
  } else {
    obj["month"] = month.month + 1;
    obj["year"] = month.year;
  }
  return obj;
}

function prevMonth(month) {
  const obj = {};
  if (month.month == 0) {
    obj["month"] = 11;
    obj["year"] = month.year - 1;
  } else {
    obj["month"] = month.month - 1;
    obj["year"] = month.year;
  }
  return obj;
}

function initialMonths(date) {
  const selectedMonth = {
    month: date.getMonth(),
    year: date.getFullYear(),
  };
  const months = [selectedMonth];
  let month = selectedMonth;

  for (let i = 0; i < INITIAL_MONTH_RANGE; i++) {
    month = prevMonth(month);
    months.unshift(month);
  }

  month = selectedMonth;
  for (let i = 0; i < INITIAL_MONTH_RANGE; i++) {
    month = nextMonth(month);
    months.push(month);
  }

  return months;
}

export default function Agenda(props) {
  const colors = useTheme().colors;
  const items = props.items;
  const marked = props.marked;
  const [selectedDate, setSelectedDate] = useState(() => new Date());
  const [open, setOpen] = useState(false);

  const [changedByController, setChangedByController] = useState(false);
  const [loadedMonth, setLoadedMonth] = useState(
    () => initialMonths(selectedDate),
  );
  const [canLoadMonths, setCanLoadMonths] = useState(false);
  const monthListRef = useRef();
  const shouldCenterSelectedMonth = useRef(false);

  const msetOpen = (value) => {
    if (value) {
      setLoadedMonth(initialMonths(selectedDate));
      shouldCenterSelectedMonth.current = true;
    }
    setCanLoadMonths(false);
    setOpen(value);
    setChangedByController(true);
  };


  const loadAtEnd = async() => {
    if (!canLoadMonths) {
      return;
    }

    setCanLoadMonths(false);
    setLoadedMonth((months) => {
      const nextMonths = [];
      let month = months[months.length - 1];

      for (let i = 0; i < 3; i++) {
        month = nextMonth(month);
        nextMonths.push(month);
      }

      return [...months, ...nextMonths];
    });
  };

  const loadAtStart = async() => {
    if (!canLoadMonths) {
      return;
    }

    setCanLoadMonths(false);
    setLoadedMonth((months) => [prevMonth(months[0]), ...months]);
  };

  if (open) {
    return <View style={{ flex: 1, backgroundColor: colors.primaryContainer }}>
      <FlatList
        ref={monthListRef}
        onStartReached={loadAtStart}
        onStartReachedThreshold={
          canLoadMonths ? 10 : DISABLED_LOAD_THRESHOLD
        }
        data={loadedMonth}
        initialNumToRender={INITIAL_MONTH_RANGE * 2 + 1}
        keyExtractor={(item) => `${item.year}-${item.month}`}
        marked={marked}
        HeaderLoadingIndicator={
          () => <ActivityIndicator
            style={{ padding: 10 }}
            animating={true}
            color={colors.primary}
          />
        }
        onEndReached={loadAtEnd}
        onEndReachedThreshold={
          canLoadMonths ? 10 : DISABLED_LOAD_THRESHOLD
        }
        onContentSizeChange={() => {
          if (!shouldCenterSelectedMonth.current) {
            return;
          }

          const selectedMonthIndex = loadedMonth.findIndex(
            (item) =>
              item.month === selectedDate.getMonth() &&
              item.year === selectedDate.getFullYear(),
          );

          if (selectedMonthIndex >= 0) {
            monthListRef.current?.scrollToIndex({
              index: selectedMonthIndex,
              animated: false,
            });
            shouldCenterSelectedMonth.current = false;
          }
        }}
        onScrollToIndexFailed={({ index, averageItemLength }) => {
          monthListRef.current?.scrollToOffset({
            offset: averageItemLength * index,
            animated: false,
          });
          setTimeout(() => {
            monthListRef.current?.scrollToIndex({
              index,
              animated: false,
            });
          }, 0);
        }}
        onScrollBeginDrag={() => setCanLoadMonths(true)}
        renderItem={
          ({ item }) => <RenderMonthCalendar
            marked={marked}
            open={open}
            setOpen={msetOpen}
            colors={colors}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            year={item.year} month={item.month}
          />
        }
        showDefaultLoadingIndicators={true}
      />
      <TouchableOpacity
        onPress={() => setOpen(false)}
        style={{ alignItems: "center", justifyContent: "center", padding: 20 }}
      >
        <MaterialIcons name="expand-less" size={24} color={colors.primary} />
      </TouchableOpacity>
    </View>;
  }
  return <View style={{ flex: 1 }}>

    <RenderMonthCalendar
      marked={marked}
      colors={colors}
      open={open}
      setOpen={msetOpen}
      selectedDate={selectedDate}
      setSelectedDate={setSelectedDate}
      year={selectedDate.getFullYear()}
      month={selectedDate.getMonth()}
    />
    <View style={{ flex: 1 }}>
      <AgendaList
        setSelectedDate={setSelectedDate}
        changedByController={changedByController}
        setChangedByController={setChangedByController}
        selectedDate={selectedDate}
        items={items}
      ></AgendaList>
    </View>
  </View>;
}

function RenderMonthCalendar(props) {
  const colors = props.colors;
  const open = props.open;
  const marked = props.marked;
  const setOpen = props.setOpen;
  const selectedDate = props.selectedDate;
  const setSelectedDate = props.setSelectedDate;
  let aux = new Date(props.year, props.month, 1);
  let weeksRep = [];
  for (let i = 0; i < 6; i++) {
    weeksRep.push(aux);
    aux = offsetDate(aux, 7);
    if (offsetDate(aux, -aux.getDay()).getMonth() != props.month) {
      break;
    }
  }
  if (!open) {
    return <View
      style={{
        backgroundColor: colors.primaryContainer,
        padding: 20,
        maargin: 20,
      }}
    >
      <View style={{ flexDirection: "row" }}>
        {weekDaysNames.map(
          (day, index) => <Text
            style={{
              flex: 1,
              color: colors.onSurface,
              textAlign: "center",
              fontWeight: "bold",
            }}
            key={index}
          >
            {day}
          </Text>,
        )}
      </View>
      <RenderCalendarRow
        marked={marked}
        open={open}
        setOpen={setOpen}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        colors={colors} date={selectedDate}
        month={props.month}
      />

      <TouchableOpacity
        onPress={() => setOpen(true)}
        style={{ alignItems: "center", justifyContent: "center" }}
      >
        <MaterialIcons name="expand-more" size={24} color={colors.primary} />
      </TouchableOpacity>
    </View>;
  }
  return <View
    style={{
      backgroundColor: colors.primaryContainer,
      padding: 20,
      maargin: 20,
    }}
  >
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
      }}
    >
      <Text
        style={{
          fontSize: 20,
          color: colors.onPrimaryContainer,
        }}
      >
        {`${monthNames[props.month]} ${props.year}`}
      </Text>
    </View>
    <View style={{ flexDirection: "row" }}>
      {
        weekDaysNames.map(
          (day, index) => <Text
            style={{
              flex: 1,
              color: colors.onPrimaryContainer,
              textAlign: "center",
              fontWeight: "bold",
            }}
            key={index}
          >
            {day}
          </Text>,
        )
      }
    </View>
    {
      weeksRep.map(
        (week, index) => <RenderCalendarRow
          marked={marked}
          open={open}
          setOpen={setOpen}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          colors={colors}
          key={index}
          date={week}
          month={props.month}
        />,
      )
    }
  </View>;
}

export function AgendaList(props) {
  const items = props.items;
  const selectedDate = props.selectedDate;
  const changedByController = props.changedByController;
  const setChangedByController = props.setChangedByController;
  const setSelectedDate = props.setSelectedDate;
  const [lastDate, setLastDate] = useState(new Date());
  const offsetDown = 30;

  const colors = useTheme().colors;
  let [daysToRender, setDaysToRender] = useState({});


  const loadAtEnd = async() => {
    let daysAux = { ...daysToRender };
    for (let i = 0; i <= offsetDown; i++) {
      const aux = offsetDate(lastDate, i);
      daysAux[floorDate(aux)] = items[floorDate(aux)] || [];
    }
    setLastDate(offsetDate(lastDate, offsetDown));

    setDaysToRender(daysAux);
    return {};
  };

  const _onViewableItemsChanged = React.useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      const fdate = viewableItems[0].item;
      setSelectedDate(floorDate2Date(fdate));
    }
  }, []);
  const flatlistRef = useRef();
  useEffect(() => {
    if (changedByController) {
      setChangedByController(false);
      setLastDate(selectedDate);
      setDaysToRender({});
      flatlistRef.current.scrollToIndex({ index: 0 });
    }
  }, [changedByController]);
  useEffect(() => {
    setLastDate(selectedDate);
    setDaysToRender({});
    flatlistRef.current.scrollToIndex({ index: 0 });
  }, [items]);

  if (Object.keys(daysToRender).length === 0) {
    loadAtEnd(false);
  }

  const _viewabilityConfig = {
    itemVisiblePercentThreshold: 0,
  };
  return (
    <FlatList
      onEndReached={loadAtEnd}
      ref={flatlistRef}
      onViewableItemsChanged={_onViewableItemsChanged.current}
      keyExtractor={(_, index) => index.toString()}
      showDefaultLoadingIndicators={true}
      contentContainerStyle={{ flexGrow: 1 }}
      style={{ backgroundColor: colors.surface1 }}
      viewabilityConfig={_viewabilityConfig}
      data={Object.keys(daysToRender).sort()}
      renderItem={
        ({ item, index }) => <RenderDay
          key={index}
          day={floorDate2Date(item)}
          index={index}
          items={daysToRender}
        />
      }
    ></FlatList>
  );
}
