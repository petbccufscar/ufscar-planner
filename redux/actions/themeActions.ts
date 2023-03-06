import { ActionType } from "../constants/actionType";

export const setTheme = (theme) => {
  return {
    type: ActionType.SET_THEME,
    payload: theme,
  };
};

export const toggleTheme = (theme) => {
  return {
    type: ActionType.TOGGLE_THEME,
    payload: theme,
  };
};
