import { ActionType } from "../constants/actionType";

const initialState = {
  user: {
    name: "estudante",
    email: "estudante@estudante",
    campus: "São Carlos",
    welcome: true,
    config: {
      theme: "black",
      font_size: 14,
    },
    money: 0,
    meal: 4.20,
  },
};

export const userReducer = (state = initialState, action) => {
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
