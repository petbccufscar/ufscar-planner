import { ActionType } from "../constants/actionType";

export const updateUser = (user) => {
  return {
    type: ActionType.UPDATE_USER,
    payload: user,
  };
};
