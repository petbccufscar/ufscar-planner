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

export const defaultTask = {
    "weekly": false,
    "is_subject": false,
    "is_submited": false,
    "details": [],
    "name": "Novo Evento",
    "subject": null,
    "notification": [],
    "description": "descrição",
    "color": "#f00",

    // não utilizaveis
    "mean": "(p1+p2+p3)/3",
    "frequency": "(aulasDadas - faltas)/aulasDadas",
    "grade": {},
    "turma": null,
    "teachers": [],
}

export const defaultSubject = {
    "weekly": true,
    "is_subject": true,
    "is_submited": false,
    "details": [],
    "name": "Nova Matéria",
    "subject": null,
    "notification": [],
    "description": "descrição",
    "color": "#f00",
    "mean": "(p1+p2+p3)/3",
    "frequency": "(aulasDadas - faltas)/aulasDadas",
    "grade": {},
    "turma": "Turma A",
    "teachers": [],
}

export const floorDate = (data) => {
    return (data.getFullYear() + "-" + ((data.getMonth() + 1).toString().padStart(2, '0')) + "-" + (data.getDate().toString().padStart(2, '0')));
}


export const offsetDate = (date, days) => {
    return new Date(date.getTime() + days * 24 * 60 * 60 * 1000);
}
