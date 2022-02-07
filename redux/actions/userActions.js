import { ActionsTypes } from "../constants/actionsTypes";

export const updateUser = (user) => {
  return {
    type: ActionsTypes.UPDATE_USER,
    payload: user,
  };
};
