/* eslint-disable react/prop-types */

import React from "react";
import { Text } from "react-native";

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
  return ("0" + data.getUTCDate()).slice(-2) + "/" + ("0" + (data.getUTCMonth() + 1)).slice(-2) + "/" + data.getFullYear() + " " + ("0" + data.getHours()).slice(-2) +
    "h" +
    ("0" + data.getMinutes()).slice(-2);
};

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
  "siga": false,
  "weekly": false,
  "is_subject": false,
  "is_submited": false,
  "when_submit": null,
  "details": [],
  "name": "",
  "subject": null,
  "notification": [],
  "description": "",
  "color": "#f00",

  // não utilizaveis
  "mean": "(p1+p2+p3)/3",
  "frequency": "(aulasDadas - faltas)/aulasDadas",
  "grade": {},
  "turma": null,
  "teachers": [],
};

export const defaultSubject = {
  "weekly": true,
  "siga": false,
  "is_subject": true,
  "is_submited": false,
  "when_submit": null,
  "details": [],
  "name": "",
  "subject": null,
  "notification": [],
  "description": "",
  "color": "#f00",
  "mean": "(p1+p2+p3)/3",
  "frequency": "(aulasDadas - faltas)/aulasDadas",
  "grade": {
    "frequency": {
      "aulasDadas": 1,
      "faltas": 0
    },
    "mean": {
      "p1": 0,
      "p2": 0,
      "p3": 0,
    }
  },
  "turma": "",
  "teachers": [],
};

export const floorDate = (data) => {
  return (data.getFullYear() + "-" + ((data.getMonth() + 1).toString().padStart(2, "0")) + "-" + (data.getDate().toString().padStart(2, "0")));
};


export const offsetDate = (date, days) => {
  return new Date(date.getTime() + days * 24 * 60 * 60 * 1000);
};


export const weekDaysNames = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
export const weekDaysFullNames = ["Domingo", "Segunda-Feira", "Terça-Feira", "Quarta-Feira", "Quinta-Feira", "Sexta-Feira", "Sábado"];
export const weekDaysSIGA = ["DOMINGO", "SEGUNDA", "TERCA", "QUARTA", "QUINTA", "SEXTA", "SABADO"];

export const monthNames = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro"
];

export const minimum = (date) => {
  const td = new Date();
  return new Date(
    td.getFullYear(),
    td.getMonth(),
    td.getDate(),
    date.getHours(),
    date.getMinutes()
  );
};

export const monthNamesShort = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];

export function parseTime(t) {
  var d = new Date();
  var time = t.match(/(\d+)(?::(\d\d))?\s*(p?)/);
  d.setHours(parseInt(time[1]) + (time[3] ? 12 : 0));
  d.setMinutes(parseInt(time[2]) || 0);
  return d;
}

export function SIGA(props) {
  const size = props.size || 20;
  return (<Text style={{ color: "#F89837", fontWeight: "bold", fontSize: size, ...(props.style || {}) }}>SIGA</Text>);
}