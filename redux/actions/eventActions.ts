import { ActionType } from "../constants/actionType";

export const addEvent = (event) => {
  return {
    type: ActionType.ADD_EVENT,
    payload: event,
  };
};

export const removeEvent = (event) => {
  return {
    type: ActionType.REMOVE_EVENT,
    payload: event,
  };
};

export const removeSIGA = (event) => {
  return {
    type: ActionType.REMOVE_SIGA,
    payload: event,
  };
};

export const updateEvent = (event) => {
  return {
    type: ActionType.UPDATE_EVENT,
    payload: event,
  };
};

export const incrementNextId = () => {
  return {
    type: ActionType.INCREMENT_NEXT_ID,
  };
};

export const setNextId = (nextId) => {
  return {
    type: ActionType.SET_NEXT_ID,
    payload: nextId,
  };
};

export const loadEvents = (events) => {
  return {
    type: ActionType.LOAD_EVENTS,
    payload: events,
  };
};
