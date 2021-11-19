import {ActionsTypes} from '../constants/actionsTypes';


const initialState = {
    user: {
        name: "fulano",
        email: "fulano@f.lano",
        campus: "São Carlos",
        config: {
        theme: "black",
        font_size: 14,
        },
        money: 0,
    },
};

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionsTypes.UPDATE_USER:
            return {
                ...state,
                user: action.payload
            };
        default:
            return state;
    }
}