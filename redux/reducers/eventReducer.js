import { events } from '../../placeholder-data/data';
import { ActionsTypes } from '../constants/actionsTypes';
import * as Notifications from "expo-notifications";
import { getTime } from '../../helpers/ExpressionHelper';

const initialState = {
    events: [], // events: events,
    nextId: 42
}


function calculateDate(detail, minutes) {
    const d = new Date(detail.datetime_init)
    d.setDate(d.getDate() + ((7 - d.getDay()) % 7 + detail.day) % 7)
    return new Date(d.getTime() - minutes * 60000)
}



async function loadNotifications(task) {
    for (let i = 0; i < task.details.length; i++) {
        if (task.weekly) {
            for (let j = 0; j < task.notification.length; j++) {
                const timeAux = calculateDate(task.details[i], task.notification[j])


                // console.log(new Date(await Notifications.getNextTriggerDateAsync(t)))

                const t = {
                    weekday: timeAux.getDay() + 1,
                    hour: timeAux.getHours(),
                    minute: timeAux.getMinutes(),
                    repeats: true
                }
                let auxT = getTime(task.notification[j])
                if (auxT.length != 0){
                    auxT = " em " + auxT
                } else {
                    auxT = " agora"
                }
                const id = await Notifications.scheduleNotificationAsync(
                    {
                        identifier: "" + task.id + "_" + i + "_" + j,
                        content: {
                            title: task.name + auxT,
                            body: 'Local: ' + task.details[i].local,
                        },
                        // TODO Fazer outro trigger pra IOS
                        trigger: t,
                    })
            }
        } else {
            for (let j = 0; j < task.notification.length; j++) {
                const timeAux = new Date(new Date(task.details[i].datetime_init).getTime() - task.notification[j] * 60000)
                const id = await Notifications.scheduleNotificationAsync({

                    identifier: "" + task.id + "_" + i + "_" + j,
                    content: {
                        title: task.name + " em " + getTime(task.notification[j]),
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

    async function refazerNotificações(st) {
        await Notifications.cancelAllScheduledNotificationsAsync()
        for (let i = 0; i < st.events.length; i++) {
            await loadNotifications(st.events[i])
        }
        const l = await Notifications.getAllScheduledNotificationsAsync()
    }
    let aux;
    switch (action.type) {
        case ActionsTypes.ADD_EVENT:
            auxid = action.payload.id || state.nextId
            aux = {
                ...state,
                events: [...state.events, { ...action.payload, id: auxid }],
                nextId: state.nextId + 1
            }
            refazerNotificações(aux)
            return aux
        case ActionsTypes.REMOVE_EVENT:
            aux = {
                ...state,
                events: state.events.filter(event => event.id !== action.payload.id).map(event => event.subject === action.payload.id ? { ...event, subject: null } : event)
            }
            refazerNotificações(aux)
            return aux

        case ActionsTypes.REMOVE_SIGA:
            const siga = state.events.filter(event => event.siga == true)
            let events = state.events
            for (let i = 0; i < siga.length; i++) {
                events = events.filter(event => event.id !== siga[i].id).map(event => event.subject === siga[i].id ? { ...event, subject: null } : event)
            }

            aux = {
                ...state,
                events: events
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
