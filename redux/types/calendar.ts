import { Card } from "./task";

/**
 * O estado dos cards do calendário após processamento, para desempenho melhor,
 * como conjecturado. Não persiste.
 */
export type CalendarState = {
  /**
   * Os itens do calendário. A chave é uma string no formato YYYY-MM-DD da data
   * de ocorrência do card.
   */
  items: { [date: string]: Card[] },

  /**
   * O próximo ID de card desocupado.
   */
  cid: number,

  /**
   * O próximo ID livre para inserir um evento. Presente aqui devido a uma
   * limitação do Redux. Seu valor sempre é igual ao campo do store de eventos
   * de mesmo nome.
   */
  nextId: number,

  /**
   * Uma estrutura altamente redundante para marcação de dias no calendário pela
   * presença de um evento não recorrente.
   */
  marked: { [date: string]: { marked: boolean } },

  /**
   * Se o calendário já foi inicializado durante essa execução.
   */
  load: boolean,
}
