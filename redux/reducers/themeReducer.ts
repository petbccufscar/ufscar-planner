import { Action, ActionType } from "../constants/actionType";
import { ThemeState } from "../types/theme";

const initialState: ThemeState = {
  themeIdx: 0,
  isDark: false,
};

export const themeReducer = (
  state = initialState,
  action: Action,
): ThemeState => {
  switch (action.type) {
  case ActionType.SET_THEME:
    return {
      ...state,
      themeIdx: action.index,
    };
  case ActionType.TOGGLE_THEME:
    return {
      ...state,
      isDark: !state.isDark,
    };
  default:
    return state;
  }
};
