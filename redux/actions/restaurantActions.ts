import { ActionType } from "../constants/actionType";

export const updateCardapio = (cardapio) => {
  return {
    type: ActionType.UPDATE_CARDAPIO,
    payload: cardapio,
  };
};
