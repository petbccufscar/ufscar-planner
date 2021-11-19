import { ActionsTypes } from "../constants/actionsTypes";

const initialState = {
    semester: {
        init: "2021-07-18T03:02:00",
        end: "2021-12-18T03:04:00"
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