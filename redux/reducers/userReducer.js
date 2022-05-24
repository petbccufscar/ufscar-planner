import { ActionsTypes } from '../constants/actionsTypes';


const initialState = {
    user: {
        name: "estudante",
        email: "estudante@estudante",
        campus: "São Carlos",
        welcome: true,
        config: {
            theme: "black",
            font_size: 14,
        },
        money: 0,
        meal: 5.20
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