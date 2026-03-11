import React, { useRef, useCallback } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";

const ITEM_HEIGHT = 40;
const VISIBLE_ITEMS = 3;

export default function ScrollPicker({
    dataSource = [],
    selectedIndex = 0,
    onValueChange,
    wrapperHeight,
    wrapperBackground = "#FFFFFF",
    itemHeight = ITEM_HEIGHT,
    highlightColor = "#d8d8d8",
    highlightBorderWidth = 2,
    activeItemColor = "#222121",
    itemColor = "#B4B4B4",
}) {
    const flatListRef = useRef(null);
    const height = wrapperHeight || itemHeight * VISIBLE_ITEMS;

    const renderItem = useCallback(
        ({ item, index }) => {
            return (
                <View style={[styles.item, { height: itemHeight }]}>
                    <Text
                        style={[
                            styles.itemText,
                            { color: itemColor },
                        ]}
                    >
                        {typeof item === "object" ? item.label || String(item) : String(item)}
                    </Text>
                </View>
            );
        },
        [itemHeight, itemColor],
    );

    const onMomentumScrollEnd = useCallback(
        (event) => {
            const offsetY = event.nativeEvent.contentOffset.y;
            const index = Math.round(offsetY / itemHeight);
            const clampedIndex = Math.max(0, Math.min(index, dataSource.length - 1));
            if (onValueChange) {
                onValueChange(dataSource[clampedIndex], clampedIndex);
            }
        },
        [dataSource, itemHeight, onValueChange],
    );

    const getItemLayout = useCallback(
        (_, index) => ({
            length: itemHeight,
            offset: itemHeight * index,
            index,
        }),
        [itemHeight],
    );

    return (
        <View style={[styles.container, { height, backgroundColor: wrapperBackground }]}>
            <View
                style={[
                    styles.highlight,
                    {
                        top: itemHeight,
                        height: itemHeight,
                        borderTopColor: highlightColor,
                        borderBottomColor: highlightColor,
                        borderTopWidth: highlightBorderWidth,
                        borderBottomWidth: highlightBorderWidth,
                    },
                ]}
                pointerEvents="none"
            />
            <FlatList
                ref={flatListRef}
                data={dataSource}
                renderItem={renderItem}
                keyExtractor={(_, index) => index.toString()}
                showsVerticalScrollIndicator={false}
                snapToInterval={itemHeight}
                decelerationRate="fast"
                onMomentumScrollEnd={onMomentumScrollEnd}
                getItemLayout={getItemLayout}
                initialScrollIndex={selectedIndex}
                contentContainerStyle={{
                    paddingTop: itemHeight,
                    paddingBottom: itemHeight,
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        overflow: "hidden",
    },
    item: {
        justifyContent: "center",
        alignItems: "center",
    },
    itemText: {
        fontSize: 16,
    },
    highlight: {
        position: "absolute",
        left: 0,
        right: 0,
        zIndex: 1,
    },
});
