import { Action, ActionType } from "../constants/actionType";
import * as Notifications from "expo-notifications";
import { getTime } from "../../helpers/ExpressionHelper";
import { BaseEventDescription, Detail, Task } from "../types/task";
import { EventState } from "../types/event";
import * as Sentry from "sentry-expo";

const initialState: EventState = {
  events: [],
  nextId: 42,
};

function calculateDate(detail: Detail, minutes: number): Date {
  const d = new Date(detail.datetime_init);
  d.setDate(d.getDate() + ((7 - d.getDay()) % 7 + detail.day) % 7);
  return new Date(d.getTime() - minutes * 60000);
}

async function loadNotifications(task: Task) {
  for (let i = 0; i < task.details.length; i++) {
    if (task.weekly) {
      for (let j = 0; j < task.notification.length; j++) {
        const timeAux = calculateDate(task.details[i], task.notification[j]);

        const t = {
          weekday: timeAux.getDay() + 1,
          hour: timeAux.getHours(),
          minute: timeAux.getMinutes(),
          repeats: true,
        };
        let auxT = getTime(task.notification[j]);
        if (auxT.length != 0) {
          auxT = " em " + auxT;
        } else {
          auxT = " agora";
        }
        await Notifications.scheduleNotificationAsync({
          identifier: "" + task.id + "_" + i + "_" + j,
          content: {
            title: task.name + auxT,
            body: "Local: " + task.details[i].local,
          },
          // TODO Fazer outro trigger pra IOS
          trigger: t,
        });
      }
    } else {
      for (let j = 0; j < task.notification.length; j++) {
        const initTime = new Date(task.details[i].datetime_init).getTime();
        const timeAux = new Date(initTime - task.notification[j] * 60000);
        await Notifications.scheduleNotificationAsync({
          identifier: "" + task.id + "_" + i + "_" + j,
          content: {
            title: task.name + " em " + getTime(task.notification[j]),
            body: "Em breve",
          },
          trigger: timeAux,
        });
      }
    }
  }
}

function cleanLocal(l: string): string {
  if (!l) {
    Sentry.Native.captureException(
      new Error("Tentou inserir nulo no local do evento >:("),
    );
    return "";
  } else {
    return l;
  }
}

function cleanEvent<T extends BaseEventDescription>(e: T): T {
  return {
    ...e,
    details: e.details.map((det) => {
      return {
        ...det,
        local: cleanLocal(det.local),
      };
    }),
  };
}

export const eventReducer = (
  state = initialState,
  action: Action,
): EventState => {
  async function refazerNotificações(st: EventState) {
    await Notifications.cancelAllScheduledNotificationsAsync();
    for (let i = 0; i < st.events.length; i++) {
      await loadNotifications(st.events[i]);
    }
    await Notifications.getAllScheduledNotificationsAsync();
  }

  let aux;
  switch (action.type) {
  case ActionType.ADD_EVENT: {
    aux = {
      ...state,
      events: [
        ...state.events,
        { ...cleanEvent(action.payload), id: state.nextId },
      ],
      nextId: state.nextId + 1,
    };
    refazerNotificações(aux);
    return aux;
  }

  case ActionType.REMOVE_EVENT:
    aux = {
      ...state,
      events: state.events
        .filter((event) => event.id !== action.payload.id)
        .map(
          (event): Task => event.subject === action.payload.id ?
            { ...event, subject: null } :
            event,
        ),
    };
    refazerNotificações(aux);
    return aux;

  case ActionType.REMOVE_SIGA: {
    const siga = state.events.filter((event) => event.siga);
    let events = state.events;
    for (let i = 0; i < siga.length; i++) {
      events = events.filter((event) => event.id !== siga[i].id)
        .map(
          (event) => event.subject === siga[i].id ?
            { ...event, subject: null } :
            event,
        );
    }

    aux = {
      ...state,
      events: events,
    };
    refazerNotificações(aux);
    return aux;
  }

  case ActionType.UPDATE_EVENT:
    aux = {
      ...state,
      events: state.events.map(
        (event) => event.id === action.payload.id ?
          cleanEvent(action.payload) :
          event,
      ),
    };
    refazerNotificações(aux);
    return aux;

  default:
    return state;
  }
};
