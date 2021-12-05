import {events} from '../../placeholder-data/data';
import { ActionsTypes } from '../constants/actionsTypes';

const offset = 90;

const offsetDate = (date, days) => {
    return new Date(date.getTime() + days * 24 * 60 * 60 * 1000);
}

const floorDate = (data) => {
    return (data.getFullYear() + "-" + ((data.getMonth() + 1).toString().padStart(2, '0')) + "-" + (data.getDate().toString().padStart(2, '0') )) ;
}

const initalSetup = () => {
    
    let datei = offsetDate(new Date(), -offset)
    const datef = offsetDate(new Date(), offset)
    let items = {}
    while (datei.getTime() <= datef.getTime()){
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
    nextId: 42
}






const compare = (e, f) => {
    const a = new Date(e.detail.datetime_init)
    const b = new Date(f.detail.datetime_init)
    const av = 60*a.getHours() + a.getMinutes()
    const bv = 60*b.getHours() + b.getMinutes()
    return av - bv
}

export const calendarReducer = (state = initialState, action) => {

    const repeatPayload = (event, myItems, myCid, mykeys) => {
        let items = {...myItems}
        let cid = myCid;
        let keys = {...mykeys}
    
    
        let datei = offsetDate(new Date(), -offset)
        const datef = offsetDate(new Date(), offset)
        let toDay = event.detail.day - datei.getDay()
        if (toDay < 0){
            toDay += 7
        }
        datei = offsetDate(datei, toDay)
    
        while (datei.getTime() <= datef.getTime()){
            const date = floorDate(datei)
            if( items[date] == null){
                items[date] = [event]
            } else { 
                items[date].push({...event, cid: cid})
                cid ++
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
        let items = {...st.items}
        let cid = st.cid;
        let marked = {...st.marked};
        let keysMap = {}

        for (let j = 0; j < action.payload.details.length; j++){
            const obj = {
                ...action.payload,
                detail: action.payload.details[j],
                id: action.payload.id || st.nextId
            }
            const aux = new Date(obj.detail.datetime_init)
            const date = floorDate(aux)
            if (action.payload.weekly){
                const aux4 = repeatPayload(obj, items, cid, keysMap)
                items = {...aux4.items}
                cid = aux4.cid
                keysMap = {...aux4.keys}

            }else{
                if( items[date] == null){
                    items[date] = [obj]
                } else { 
                    items[date].push({...obj, cid:cid})
                    cid ++
                }
                keysMap[date] = true
                marked[date] = {marked:true}
            }
        }
        
        const keys = Object.keys(keysMap)
        for (let i = 0; i < keys.length; i++){
            items[keys[i]].sort(compare)
        }
    
        let datei = offsetDate(new Date(), -offset)
        const datef = offsetDate(new Date(), offset)
    
        while (datei.getTime() <= datef.getTime()){
            const date = floorDate(datei)
            if( items[date] == null){
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
    
    const removePayload = (st) => {
        const event = action.payload 
        let newItems = {...st.items}
        let newMarked = {...st.marked}
        let d;


        for (let i = 0; i < event.details.length; i++){
            d = floorDate(new Date(event.details[i].datetime_init))
            newItems[d] = newItems[d].filter((e) => e.id != event.id)
            if (!event.weekly){
                if(newItems[d].filter((e) => !e.weekly).length == 0){
                    newMarked[d] = {marked: false}
                }
            }
        }
        return {
            ...st,
            items: newItems,
            marked: newMarked
        }
    }

    let aux;
    switch (action.type) {
        case ActionsTypes.ADD_EVENT:
            aux = {...state, ...insertPayload(state), nextId: state.nextId + 1}
            return aux
        case ActionsTypes.REMOVE_EVENT:
            aux = {...state, ...removePayload(state)}
            return aux
            
        case ActionsTypes.UPDATE_EVENT:
            return {...state, ...insertPayload(removePayload(state))}
        default:
            return state;
    }
};
