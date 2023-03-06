import { ActionsTypes } from "../constants/actionsTypes";


const initialState = {
  themeIdx: 0,
  isDark: false,
};

export const themeReducer = (state = initialState, action) => {
  switch (action.type) {
  case ActionsTypes.SET_THEME:
    return {
      ...state,
      themeIdx: action.payload,
    };
  case ActionsTypes.TOGGLE_THEME:
    return {
      ...state,
      isDark: !state.isDark,
    };
  default:
    return state;
  }
};
