import { ActionsTypes } from "../constants/actionsTypes";

export const updateCardapio = (cardapio) => {
  return {
    type: ActionsTypes.UPDATE_CARDAPIO,
    payload: cardapio,
  };
};
