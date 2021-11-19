import {ActionsTypes} from '../constants/actionsTypes';

export const updateUser = (user) => {
    return {
        action: ActionsTypes.UPDATE_USER,
        payload: user
    };
}