import { ActionType } from "../constants/actionType";

const initialState = {
  themeIdx: 0,
  isDark: false,
};

export const themeReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_THEME:
      return {
        ...state,
        themeIdx: action.payload,
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
