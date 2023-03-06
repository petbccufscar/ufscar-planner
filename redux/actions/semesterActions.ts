import { ActionType } from "../constants/actionType";

export const updateSemester = (semester) => {
  return {
    type: ActionType.UPDATE_SEMESTER,
    payload: semester,
  };
};
