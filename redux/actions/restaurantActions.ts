import { ActionType } from "../constants/actionType";
import { RestaurantState } from "../types/restaurant";

export type UpdateCardapioAction = {
  type: ActionType.UPDATE_CARDAPIO,
  payload: RestaurantState,
}

/**
 * Ação para atribuir campos no estado do cardápio.
 * @param cardapio - Um objeto de cardápio para substituir no estado
 * persistente.
 * @returns A ação para despachar.
 */
export const updateCardapio = (
  cardapio: RestaurantState,
): UpdateCardapioAction => {
  return {
    type: ActionType.UPDATE_CARDAPIO,
    payload: cardapio,
  };
};
