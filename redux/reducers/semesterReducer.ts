import { Action, ActionType } from "../constants/actionType";
import { SemesterState } from "../types/semester";

const initialState: SemesterState = {
  semester: {
    init: "2022-11-07T03:02:00",
    end: "2023-04-08T03:04:00",
  },
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
