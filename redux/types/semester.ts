export type SemesterState = {
  semester: {
    /**
     * Uma string no formato ISO-8601 contendo a data e hora do início do
     * semestre.
     */
    init: string,

    /**
     * Uma string no formato ISO-8601 contendo a data e hora do fim do semestre.
     */
    end: string,
  }
}
