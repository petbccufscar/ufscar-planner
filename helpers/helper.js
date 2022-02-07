import React from "react";

export function Random() {
    const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
    return (
        <View
            style={{ backgroundColor: randomColor, flex: 1, width: wp("100%") }}
        />
    );
}


export const formatDate = (dataFormatar) => {
    const data = new Date(dataFormatar);
    return (
        ("0" + data.getUTCDate()).slice(-2) +
        "/" +
        ("0" + (data.getUTCMonth() + 1)).slice(-2) +
        "/" +
        data.getFullYear()
    );
};

export const formatDateWithHour = dataFormatar => {
    const data = new Date(dataFormatar);
    return ('0' + data.getUTCDate()).slice(-2) + "/" + ('0' + (data.getUTCMonth() + 1)).slice(-2) + "/" + data.getFullYear() + " " + ("0" + data.getHours()).slice(-2) +
        "h" +
        ("0" + data.getMinutes()).slice(-2);
}

export function formatHour(date) {
    const dateFormat = new Date(date);
    return (
        ("0" + dateFormat.getHours()).slice(-2) +
        "h" +
        ("0" + dateFormat.getMinutes()).slice(-2)
    );
}

export const formatReal = (num) => {
    num = parseFloat(num);
    return (
      "R$ " +
      num
        .toFixed(2)
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1;")
        .replace(".", ",")
        .replace(";", ".")
    );
  };