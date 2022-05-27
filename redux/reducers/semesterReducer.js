import { ActionsTypes } from "../constants/actionsTypes";

const initialState = {
    semester: {
        init: "2022-05-30T03:02:00",
        end: "2022-10-01T03:04:00"
    }
}

export const semesterReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionsTypes.UPDATE_SEMESTER:
            return {
                ...state,
                semester: action.payload
            }
        default:
            return state;
    }
}