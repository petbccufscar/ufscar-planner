import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { TouchableRipple, useTheme } from "react-native-paper";

export default function KeyboardButton({
  style,
  children,
  textStyle,
  onPress,
}) {
  const { colors } = useTheme();
  return (
    <TouchableRipple
      onPress={onPress}
      borderless={true}
      style={[
        styles.container,
        { backgroundColor: colors.primaryContainer },
        { ...style },
      ]}
    >
      <View style={{ backgroundColor: colors.primaryContainer }}>
        <Text
          style={[styles.text, { color: colors.primary }, { ...textStyle }]}
        >
          {children}
        </Text>
      </View>
    </TouchableRipple>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingVertical: 5,
    borderRadius: 5,
  },

  text: {
    fontSize: 20,
    lineHeight: 24,
  },
});
