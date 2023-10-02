import { Semester } from "../redux/types/semester";

const LAST_SEMESTER: Semester = {
  init: "2023-05-08T03:02:00",
  end: "2023-09-09T03:04:00",
};

const LATEST_SEMESTER: Semester = {
  init: "2023-10-02T03:02:00",
  end: "2024-02-17T03:04:00",
};

/**
 * Verifica se um estado de semestre é o semestre padrão anterior.
 * @param semester - O semestre para verificar.
 * @returns Se o valor é o semestre anterior ou não.
 */
export function isOldDefaultSemester(semester: Semester): boolean {
  return (
    semester.init == LAST_SEMESTER.init &&
    semester.end == LAST_SEMESTER.end
  );
}

/**
 * Retorna o semestre padrão mais recente.
 * @returns O semestre padrão mais recente.
 */
export function latestDefaultSemester(): Semester {
  return LATEST_SEMESTER;
}
