import { ActionsTypes } from "../constants/actionsTypes";

export const setTheme = (theme) => {
  return {
    type: ActionsTypes.SET_THEME,
    payload: theme,
  };
};

export const toggleTheme = (theme) => {
  return {
    type: ActionsTypes.TOGGLE_THEME,
    payload: theme,
  };
};