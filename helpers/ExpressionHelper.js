import { evaluate, parse } from "mathjs";

export function graphSearch(node) {
  let result = {};

  if (node.name && !node.args) {
    result[node.name] = 0;
  } else if (node.args) {
    const keys = Object.keys(node.args);
    for (let i = 0; i < keys.length; i++)
      result = { ...result, ...graphSearch(node.args[keys[i]]) };
  } else if (node.content) {
    result = { ...result, ...graphSearch(node.content) };
  }
  return result;

}

export function getTime(totalMinutes) {
  const days = parseInt(totalMinutes / 60 / 24);
  const hours = parseInt((totalMinutes / 60) % 24);
  const minutes = parseInt(totalMinutes % 60);

  const daysLabel =
    days > 0
      ? days + " dia" + (days > 1 ? "s" : "") + (hours || minutes ? ", " : "")
      : "";
  const hoursLabel =
    hours > 0
      ? hours + " hora" + (hours > 1 ? "s" : "") + (minutes ? " e " : "")
      : "";
  const minutesLabel =
    minutes > 0 ? minutes + " minuto" + (minutes > 1 ? "s" : "") : "";

  return `${daysLabel}${hoursLabel}${minutesLabel}`;
}


export function magic(dict, s) {
  let result;

  result = parse(s);
  const rdict = graphSearch(result);
  const l = Object.keys(rdict);
  let ndict = {};
  for (let i = 0; i < l.length; i++) {
    ndict[l[i]] = dict[l[i]] || 0;
  }

  return { result: evaluate(s, ndict), dict: ndict };
}

export function getMean(task) {
  const mean = task.mean;

  if (mean.length == 0) {
    return "-";
  }
  return ("" + magic(task.grades.mean, task.mean).result);
}

export function getFrequency(task) {
  const frequency = task.frequency;

  if (frequency.length == 0) {
    return "-";
  }
  return ("" + magic(task.grades.frequency, task.frequency).result);
}



// try {
//     console.log(magic({c: 1, b: 2, j:1000 },"A + c + b + D*i"))
// } catch(e){
//     console.log("deu erro", e)
// }


export function BWFont(backgroundColor) {
  let r = 0,
    g = 0,
    b = 0;

  // Converte cor em hex para decimal
  if (backgroundColor.length == 4) {
    r = parseInt(
      "0x" + backgroundColor.substring(1, 2) + backgroundColor.substring(1, 2)
    );
    g = parseInt(
      "0x" + backgroundColor.substring(2, 3) + backgroundColor.substring(2, 3)
    );
    b = parseInt(
      "0x" + backgroundColor.substring(3, 4) + backgroundColor.substring(3, 4)
    );
  }
  if (backgroundColor.length == 7) {
    r = parseInt("0x" + backgroundColor.substring(1, 3));
    g = parseInt("0x" + backgroundColor.substring(3, 5));
    b = parseInt("0x" + backgroundColor.substring(5, 7));
  }

  if (r * 0.299 + g * 0.587 + b * 0.114 > 186) return "#000000";
  else return "#ffffff";
}

