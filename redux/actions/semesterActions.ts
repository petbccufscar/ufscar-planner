import { ActionType } from "../constants/actionType";
import { SemesterState } from "../types/semester";

export type UpdateSemesterAction = {
  type: ActionType.UPDATE_SEMESTER,
  payload: SemesterState["semester"],
}

/**
 * Ação para atribuir campos no estado do semestre.
 * @param semester - Um objeto de semestre para substituir no estado
 * persistente.
 * @returns A ação para despachar.
 */
export const updateSemester = (
  semester: SemesterState["semester"],
): UpdateSemesterAction => {
  return {
    type: ActionType.UPDATE_SEMESTER,
    payload: semester,
  };
};
