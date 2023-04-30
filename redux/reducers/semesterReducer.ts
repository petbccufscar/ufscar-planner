import { latestDefaultSemester } from "../../helpers/defaultSemester";
import { Action, ActionType } from "../constants/actionType";
import { SemesterState } from "../types/semester";

const initialState: SemesterState = {
  semester: latestDefaultSemester(),
};

export const semesterReducer = (
  state = initialState,
  action: Action,
): SemesterState => {
  switch (action.type) {
  case ActionType.UPDATE_SEMESTER:
    return {
      ...state,
      semester: action.payload,
    };
  default:
    return state;
  }
};
