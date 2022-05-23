import { events } from '../../placeholder-data/data';
import { ActionsTypes } from '../constants/actionsTypes';
import { floorDate, offsetDate } from '../../helpers/helper';

const offset = 180;


const initalSetup = () => {

    let datei = offsetDate(new Date(), -offset)
    const datef = offsetDate(new Date(), offset)
    let items = {}
    while (datei.getTime() <= datef.getTime()) {
        const date = floorDate(datei)
        items[date] = []
        datei = offsetDate(datei, 1)
    }
    return items
}

const initialState = {
    items: initalSetup(),
    marked: {},
    cid: 0,
    nextId: 42,
    load: false
}






const compare = (e, f) => {
    const a = new Date(e.detail.datetime_init)
    const b = new Date(f.detail.datetime_init)
    const av = 60 * a.getHours() + a.getMinutes()
    const bv = 60 * b.getHours() + b.getMinutes()
    return av - bv
}

const copyTimeToDate = (date, time) => {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate(), time.getHours(), time.getMinutes(), time.getSeconds())
}

const copyTimeStrToDate = (date, str) => {
    const time = new Date(str)
    return new Date(date.getFullYear(), date.getMonth(), date.getDate(), time.getHours(), time.getMinutes(), time.getSeconds())
}

export const calendarReducer = (state = initialState, action) => {

    const repeatPayload = (event, myItems, myCid, mykeys) => {
        let items = { ...myItems }
        let cid = myCid;
        let keys = { ...mykeys }


        let datei = offsetDate(new Date(), -offset)
        const datef = offsetDate(new Date(), offset)
        let toDay = event.detail.day - datei.getDay()
        if (toDay < 0) {
            toDay += 7
        }
        datei = offsetDate(datei, toDay)

        while (datei.getTime() <= datef.getTime()) {
            const date = floorDate(datei)
            const nevent = {
                ...event, detail: {
                    ...event.detail,
                    datetime_init: copyTimeStrToDate(datei, event.detail.datetime_init).toISOString(),
                    datetime_end: copyTimeStrToDate(datei, event.detail.datetime_end).toISOString(),
                }
            }
            if (items[date] == null) {
                items[date] = [nevent]
            } else {
                items[date].push({ ...nevent, cid: cid })
                cid++
            }
            keys[date] = true
            datei = offsetDate(datei, 7)
        }

        return {
            items: items,
            cid: myCid,
            keys: keys
        }
    }

    const insertPayload = (st) => {
        let items = { ...st.items }
        let cid = st.cid;
        let marked = { ...st.marked };
        let keysMap = {}

        if (action.payload.is_submited == true) {
            return {
                items: items,
                cid: cid,
                marked: marked
            }
        }

        for (let j = 0; j < action.payload.details.length; j++) {
            const obj = {
                ...action.payload,
                detail: action.payload.details[j],
                id: action.payload.id || st.nextId
            }
            const aux = new Date(obj.detail.datetime_init)
            const date = floorDate(aux)
            if (action.payload.weekly) {
                const aux4 = repeatPayload(obj, items, cid, keysMap)
                items = { ...aux4.items }
                cid = aux4.cid
                keysMap = { ...aux4.keys }

            } else {
                if (items[date] == null) {
                    items[date] = [obj]
                } else {
                    items[date].push({ ...obj, cid: cid })
                    cid++
                }
                keysMap[date] = true
                marked[date] = { marked: true }
            }
        }

        const keys = Object.keys(keysMap)
        for (let i = 0; i < keys.length; i++) {
            items[keys[i]].sort(compare)
        }

        let datei = offsetDate(new Date(), -offset)
        const datef = offsetDate(new Date(), offset)

        while (datei.getTime() <= datef.getTime()) {
            const date = floorDate(datei)
            if (items[date] == null) {
                items[date] = []
            }

            datei = offsetDate(datei, 1)
        }

        return {
            items: items,
            cid: cid,
            marked: marked
        }
    }

    const removePayload = (st, redefine = true) => {
        let event = action.payload
        let newItems = { ...st.items }

        // buscar os dados antigos de event
        let iterador = offsetDate(new Date(), -offset)
        let aux = {}
        let d;
        const datef = offsetDate(new Date(), offset)

        // Percorre TUDO até achar o antigo evento,
        // Se for semanal, vai ser rápido (menos de 7 iterações),
        // Mas se for evento unico...
        // no pior caso, vai percorrer todos os 2*offset+1 dias

        while (iterador <= datef) {
            d = floorDate(iterador)
            aux[d] = (newItems[d] || []).filter((e) => e.id == event.id).map(event => event.subject === action.payload.id ? { ...event, subject: null } : event)
            if (aux[d].length > 0) {
                event = aux[d][0]
                break
            }
            iterador = offsetDate(iterador, 1)
        }



        let newMarked = { ...st.marked }

        // marca para não visitar o mesmo dia da semana
        let weekVisit = [0, 0, 0, 0, 0, 0, 0]
        // Percorre os detalhes caso o evento seja unico/ não semanal
        if (!event.weekly) {
            for (let i = 0; i < event.details.length; i++) {
                d = floorDate(new Date(event.details[i].datetime_init))
                // Filtra os itens
                newItems[d] = newItems[d].filter((e) => e.id != event.id)
                // ele verifica se a data continuará marcada

                if (newItems[d].filter((e) => !e.weekly).length == 0) {
                    newMarked[d] = { marked: false }
                }

            }
        } else {
            for (let i = 0; i < event.details.length; i++) {
                if (!weekVisit[event.details[i].day]) {
                    let datei = offsetDate(new Date(), -offset)
                    let toDay = event.details[i].day - datei.getDay()
                    if (toDay < 0) {
                        toDay += 7
                    }
                    datei = offsetDate(datei, toDay)

                    while (datei.getTime() <= datef.getTime()) {
                        const d = floorDate(datei)
                        // Filtra os itens
                        newItems[d] = newItems[d].filter((e) => e.id != event.id).map(event => event.subject === action.payload.id ? { ...event, subject: null } : event)
                        datei = offsetDate(datei, 7)
                    }
                    weekVisit[event.details[i].day] = 1
                }
            }
        }
        return {
            ...st,
            items: newItems,
            marked: newMarked
        }
    }

    const setup = (st) => {

        let marked = {}
        let items = {}
        let cid = 0
        let events = action.payload.events
        const nextId = action.payload.nextId

        for (let i = 0; i < events.length; i++) {
            if (events[i].is_submited != true)
                for (let j = 0; j < events[i].details.length; j++) {
                    const obj = {
                        ...events[i],
                        detail: events[i].details[j]
                    }
                    const aux = new Date(obj.detail.datetime_init)
                    const date = floorDate(aux)
                    if (events[i].weekly) {
                        const aux4 = repeatPayload(obj, items, cid, {})
                        items = { ...aux4.items }
                        cid = aux4.cid
                    } else {
                        if (items[date] == null) {
                            items[date] = [obj]
                        } else {
                            items[date].push({ ...obj, cid: cid })
                            cid++
                        }
                        marked[date] = { marked: true }
                    }
                }
        }
        const keys = Object.keys(items)
        for (let i = 0; i < keys.length; i++) {
            items[keys[i]].sort(compare)
        }

        let datei = offsetDate(new Date(), -offset)
        const datef = offsetDate(new Date(), offset)

        while (datei.getTime() <= datef.getTime()) {
            const date = floorDate(datei)
            // if (items[date] == null) {
            //     items[date] = []
            // }

            datei = offsetDate(datei, 1)
        }
        return {
            ...st,
            items: items,
            marked: marked,
            nextId: nextId,
            cid: cid,
            load: true
        }

    }


    let aux;
    switch (action.type) {
        case ActionsTypes.ADD_EVENT:
            aux = { ...state, ...insertPayload(state), nextId: state.nextId + 1 }
            return aux
        case ActionsTypes.REMOVE_EVENT:
            aux = { ...removePayload(state) }
            return aux

        case ActionsTypes.UPDATE_EVENT:
            aux = removePayload(state, false)
            return { ...state, ...insertPayload(aux) }


        case ActionsTypes.LOAD_EVENTS:
            if (state.load)
                return state
            aux = setup(state)
            return aux



        default:
            return state;
    }
};
