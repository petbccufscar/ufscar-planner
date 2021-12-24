import { events } from '../../placeholder-data/data';
import { ActionsTypes } from '../constants/actionsTypes';
import * as Notifications from "expo-notifications";

const initialState = {
    events: events,
    nextId: 42
}


function calculateDate(detail, minutes){
    const d = new Date(detail.datetime_init)
    d.setDate(d.getDate() + ((7 - d.getDay()) % 7 + detail.day) % 7)
    return new Date(d.getTime() - minutes*60000)
}

async function loadNotifications(task) {
    for (let i = 0; i < task.details.length; i++) {
        if (task.weekly) {
            for (let j = 0; j < task.notification.length; j++) {
                const timeAux = calculateDate(task.details[i], task.notification[j])
                const id = await Notifications.scheduleNotificationAsync(
                    {
                        content: {
                            title: task.name + " em " + task.notification[j] + " minutos",
                            body: 'Em breve',
                        },
                        trigger: {
                            weekday: timeAux.getDay() + 1,
                            hour: timeAux.getHours(),
                            minute: timeAux.getMinutes(),
                            repeats: true,
                        },
                    })
            }
        } else {
            for (let j = 0; j < task.notification.length; j++) {
                const timeAux = new Date(new Date(task.details[i].datetime_init).getTime() - task.notification[j] * 60000)
                const id = await Notifications.scheduleNotificationAsync({
                    content: {
                        title: task.name + " em " + task.notification[j] + " minutos",
                        body: 'Em breve',
                    },
                    trigger: timeAux,
                }
                )

            }
        }
    }
}


export const eventReducer = (state = initialState, action) => {

    async function refazerNotificações(st){
        await Notifications.cancelAllScheduledNotificationsAsync()
        for (let i = 0; i < st.events.length; i++ ){
            await loadNotifications(st.events[i])
        }
        const l = await Notifications.getAllScheduledNotificationsAsync()
    }
    let aux;
    switch (action.type) {
        case ActionsTypes.ADD_EVENT:
            aux = {
                ...state,
                events: [...state.events, { ...action.payload, id: state.nextId }],
                nextId: state.nextId + 1
            }
            refazerNotificações(aux)
            return aux
        case ActionsTypes.REMOVE_EVENT:
            aux = {
                ...state,
                events: state.events.filter(event => event.id !== action.payload.id)
            }
            refazerNotificações(aux)
            return aux
        case ActionsTypes.UPDATE_EVENT:
            aux = {
                ...state,
                events: state.events.map(event => event.id === action.payload.id ? action.payload : event)
            }
            refazerNotificações(aux)
            return aux

        case ActionsTypes.INCREMENT_NEXT_ID:
            return {
                ...state,
                nextId: state.nextId + 1
            }
        case ActionsTypes.SET_NEXT_ID:
            return {
                ...state,
                nextId: action.payload
            }
        default:
            return state;
    }
};
