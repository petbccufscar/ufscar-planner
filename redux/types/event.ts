import { Task } from "./task";

/**
 * O estado dos eventos armazenado persistentemente.
 */
export type EventState = {
  /**
   * Uma lista de todos os eventos registrados.
   */
  events: Task[],

  /**
   * O próximo ID livre para inserir um evento.
   */
  nextId: number,
};
