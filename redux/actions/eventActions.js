import { ActionsTypes } from '../constants/actionsTypes';

export const addEvent = (event) => {
    return {
        type: ActionsTypes.ADD_EVENT,
        payload: event
    };
};

export const removeEvent = (event) => {
    return {
        type: ActionsTypes.REMOVE_EVENT,
        payload: event
    };
};

export const updateEvent = (event) => {
    return {
        type: ActionsTypes.UPDATE_EVENT,
        payload: event
    };
};

export const incrementNextId = () => {
    return {
        type: ActionsTypes.INCREMENT_NEXT_ID
    };
}

export const setNextId = (nextId) => {
    return {
        type: ActionsTypes.SET_NEXT_ID,
        payload: nextId,
    };
}


export const loadEvents = (events) => {
    return {
        type: ActionsTypes.LOAD_EVENTS,
        payload: events,
    };
}