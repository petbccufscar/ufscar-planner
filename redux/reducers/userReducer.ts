import { Action, ActionType } from "../constants/actionType";
import { UserState, Campus } from "../types/user";

const initialState: UserState = {
  user: {
    name: "estudante",
    email: "estudante@estudante",
    campus: Campus.SÃO_CARLOS,
    welcome: true,
    money: 0,
    meal: 4.20,
  },
};

export const userReducer = (
  state = initialState,
  action: Action,
): UserState => {
  switch (action.type) {
  case ActionType.UPDATE_USER:
    return {
      ...state,
      user: action.payload,
    };
  default:
    return state;
  }
};
