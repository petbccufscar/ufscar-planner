import { ActionType } from "../constants/actionType";
import { UserState } from "../types/user";

export type UpdateUserAction = {
  type: ActionType.UPDATE_USER,
  payload: UserState["user"],
};

/**
 * Ação para atribuir campos no estado do usuário.
 * @param user - Um objeto de usuário para substituir no estado persistente.
 * @returns A ação para despachar.
 */
export const updateUser = (user: UserState["user"]): UpdateUserAction => {
  return {
    type: ActionType.UPDATE_USER,
    payload: user,
  };
};
