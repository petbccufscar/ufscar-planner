import { events } from '../../placeholder-data/data';
import { ActionsTypes } from '../constants/actionsTypes';
import * as Notifications from "expo-notifications";

const initialState = {
    events: events,
    nextId: 42
}


async function loadNotifications(task) {
    for (let i = 0; i < task.details.length; i++) {
        if (task.weekly) {
            for (let j = 0; j < task.notification.length; j++) {
                const timeAux = new Date(new Date(task.details[i].datetime_init).getTime() - task.notification[j] * 60000)
                const id = await Notifications.scheduleNotificationAsync(
                    {
                        content: {
                            title: task.name + " em " + task.notification[j] + " minutos",
                            body: 'Em breve',
                        },
                        trigger: {
                            weekday: task.details[i].day + 1,
                            hour: timeAux.getHours(),
                            minute: timeAux.getMinutes(),
                            repeats: true,
                        },
                    })
                console.log("nova notificação : "+ task.name+ " "  + id)
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
                console.log("nova notificação unica : "+ task.name+" " + id)

            }
        }
    }
}


export const eventReducer = (state = initialState, action) => {

    async function refazerNotificações(st){
        console.log("vou apagar tudo")
        await Notifications.cancelAllScheduledNotificationsAsync()
        console.log("apaguei tudo")
        console.log(st.events.length)
        for (let i = 0; i < st.events.length; i++ ){
            await loadNotifications(st.events[i])
        }
        console.log("terminei de refazer")
        const l = await Notifications.getAllScheduledNotificationsAsync()
        console.log(l)
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
