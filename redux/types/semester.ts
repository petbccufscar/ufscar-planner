export type Semester = {
  /**
   * Uma string no formato RFC 1123 contendo a data e hora do início do
   * semestre.
   */
  init: string,

  /**
   * Uma string no formato RFC 1123 contendo a data e hora do fim do semestre.
   */
  end: string,
};

export type SemesterState = {
  semester: Semester,
}
