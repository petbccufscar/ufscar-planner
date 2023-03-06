import { ActionType } from "../constants/actionType";

const initialState = {
  semester: {
    init: "2022-11-07T03:02:00",
    end: "2023-04-08T03:04:00",
  },
};

export const semesterReducer = (state = initialState, action) => {
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
