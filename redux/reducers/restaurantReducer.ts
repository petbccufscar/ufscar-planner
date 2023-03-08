import { Action, ActionType } from "../constants/actionType";
import { RestaurantState } from "../types/restaurant";

const initialState: RestaurantState = {
  updatedAt: "",
  weekMenu: {},
};

export const restaurantReducer = (state = initialState, action: Action) => {
  switch (action.type) {
  case ActionType.UPDATE_CARDAPIO:
    return {
      ...state,
      updatedAt: action.payload.updatedAt,
      weekMenu: action.payload.weekMenu,
    };
  default:
    return state;
  }
};
