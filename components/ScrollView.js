/* eslint-disable react/prop-types */

import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import { useState, useEffect } from "react";
import {
  ScrollView as DefaultScrollView
} from "react-native";
import { useTheme } from "react-native-paper";


export default function ScrollView(props) {
  const { onScroll, ...otherProps } = props;
  const colors = useTheme().colors;
  const [onTop, setOnTop] = useState(true);
  const navigation = useNavigation();

  function changeHeaderColor(position) {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: position == 0 ? colors.headerInactive : colors.headerActive,
      },
      headerShadowVisible: false,
      headerTintColor: position == 0 ? colors.onHeaderInactive : colors.onHeader,
    });
    if (position > 0 && onTop) {
      setOnTop(false);
    } else if (position == 0 && !onTop) {
      setOnTop(true);
    }
  }

  useEffect(() => {
    changeHeaderColor(onTop ? 0 : 10);
  }, [colors]);

  return (
    <DefaultScrollView
      overScrollMode="never"
      onScroll={(e) => {
        changeHeaderColor(e.nativeEvent.contentOffset.y);
        onScroll?.(e);
      }}
      scrollEventThrottle={16}
      {...otherProps}
    />
  );
}
