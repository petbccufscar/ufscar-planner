import {events} from '../../placeholder-data/data';
import { ActionsTypes } from '../constants/actionsTypes';

const initialState = {
    events: events,
    nextId: 42
}

export const eventReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionsTypes.ADD_EVENT:
            return {
                ...state,
                events: [...state.events, {... action.payload, id: state.nextId}],
                nextId: state.nextId + 1
            }
        case ActionsTypes.REMOVE_EVENT:
            return {
                ...state,
                events: state.events.filter(event => event.id !== action.payload.id)
            }
        case ActionsTypes.UPDATE_EVENT:
            const aux = {
                ...state,
                events: state.events.map(event => event.id === action.payload.id ? action.payload : event)
            }
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
