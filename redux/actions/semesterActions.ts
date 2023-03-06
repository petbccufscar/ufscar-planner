import { ActionsTypes } from "../constants/actionsTypes";

export const updateSemester = (semester) => {
  return {
    type: ActionsTypes.UPDATE_SEMESTER,
    payload: semester,
  };
};
