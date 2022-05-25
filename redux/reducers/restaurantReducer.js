import { ActionsTypes } from '../constants/actionsTypes';


const initialState = {
    updatedAt: "2022-05-28T03:02:00",
    lunch :{
        lunchStartTime: "17:15h",
        lunchEndTime: "19:00h",
        mainMeal: "Não Definido.",
        mainMealVegetarian: "Não Definido.",
        mainMealVegan: "Não Definido.",
        garrison: "Não Definido.",
        rice: "Não Definido.",
        bean: "Não Definido.",
        salad: "Não Definido.",
        desert: "Não Definido.",
        priceDefault: "R$ ???",
        priceVisit: "R$ ???"
    },
    dinner: {
        dinnerStartTime: "17:15h",
        dinnerEndTime: "19:00h",
        mainMeal: "Não Definido.",
        mainMealVegetarian: "Não Definido.",
        mainMealVegan: "Não Definido.",
        garrison: "Não Definido.",
        rice: "Não Definido.",
        bean: "Não Definido.",
        salad: "Não Definido.",
        desert: "Não Definido.",
        priceDefault: "R$ ???",
        priceVisit: "R$ ???"
    }
};

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionsTypes.UPDATE_CARDAPIO:
            return {
                ...state,
                ...action.payload
            };
        default:
            return state;
    }
}