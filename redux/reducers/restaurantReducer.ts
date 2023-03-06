import { ActionsTypes } from "../constants/actionsTypes";

const initialState = {
  updatedAt: "",
  weekMenu: {},
};

export const restaurantReducer = (state = initialState, action) => {
  switch (action.type) {
  case ActionsTypes.UPDATE_CARDAPIO:
    return {
      ...state,
      updatedAt: action.payload.updatedAt,
      weekMenu: action.payload.weekMenu,
    };
  default:
    return state;
  }
};
