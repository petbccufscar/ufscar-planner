import { ActionType } from "../constants/actionType";
import { Semester } from "../types/semester";

export type UpdateSemesterAction = {
  type: ActionType.UPDATE_SEMESTER,
  payload: Semester,
}

/**
 * Ação para atribuir campos no estado do semestre.
 * @param semester - Um objeto de semestre para substituir no estado
 * persistente.
 * @returns A ação para despachar.
 */
export const updateSemester = (semester: Semester): UpdateSemesterAction => {
  return {
    type: ActionType.UPDATE_SEMESTER,
    payload: semester,
  };
};
