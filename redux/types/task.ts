import { Gradient } from "../../components/Gradient";

/**
 * Descrição sobre um horário e localização de um evento.
 */
export type Detail = {
  /**
   * Dia da semana, 0 é domingo.
   */
  day: number,

  /**
   * Uma string no formato ISO-8601 da data e hora de início do evento.
   */
  datetime_init: string,

  /**
   * Uma string no formato ISO-8601 da data e hora de do fim do evento.
   */
  datetime_end: string,

  /**
   * Uma string descrevendo o local do evento. É referente a um local dentro
   * do campus no caso de uma matéria.
   */
  local: string,
};

/**
 * Um subconjunto comum de descrições de todos os eventos que vão ser criados.
 */
export type BaseEventDescription = {
  /**
   * O nome da tarefa.
   */
  name: string,

  /**
   * A cor na tela do evento.
   * - Uma string, tipo "#008026", caso seja uma cor sólida.
   * - Um número, indexando um "gradiente", caso seja um "gradiente", ou uma cor
   *   sólida definida no {@link Gradient}.
   */
  color: number | string,

  /**
   * Os horários e localizações do evento.
   */
  details: Detail[],

  /**
   * Uma lista de quantos minutos antes emitir uma notificação sobre o evento.
   * Dois elementos emitem duas notificações.
   */
  notification: number[],

  /**
   * Descrição do evento.
   */
  description: string,

  /**
   * Se o evento se repete toda semana.
   */
  weekly: boolean,
};

/**
 * Uma descrição de uma matéria que vai ser criada.
 */
export type SubjectDescription = BaseEventDescription & {
  /**
   * É uma matéria.
   */
  is_subject: true,

  /**
   * Se a matéria foi carregada a partir do SIGA.
   */
  siga: boolean,

  /**
   * Uma string contendo uma expressão que descreve o cálculo de uma média.
   * Por exemplo, "(P1 + P2 + P3) / 3". Tanto o formato quanto o parsing é feito
   * feito por um módulo específico.
   */
  mean: string,

  /**
   * Uma string contendo uma experssão que descreve o cálculo de uma frequência.
   * Por exemplo, "(aulasDadas - faltas) / aulasDadas". Tanto o formato quanto o
   * parsing é feito por um módulo específico
   */
  frequency: string,

  /**
   * As atribuições numéricas feitas às variáveis descritas nas fórmulas de
   * cálculo de média e frequência.
   */
  grade: {
    /** As atribuições feitas às variáveis na fórmula de média */
    mean: { [variable: string]: number },

    /** As atribuições feitas às variáveis na fórmula de frequência */
    frequency: { [variable: string]: number },
  },

  /**
   * Uma lista de professores dessa matéria.
   */
  teachers: string[],

  /**
   * A turma da matéria.
   */
  turma: string,

  /**
   * Se a matéria foi concluída.
   */
  is_submited: boolean,

  subject: null,
};

/**
 * Uma descrição de um evento que vai ser criado.
 */
export type EventDescription = BaseEventDescription & {
  /**
   * Não é uma matéria.
   */
  is_subject: false,

  /**
   * Por vacuidade, não é uma matéria carregada a partir do SIGA.
   */
  siga: false,

  /**
   * String no formato ISO-8601 com a data e hora de entrega do evento, se
   * existir.
   */
  when_submit?: string,

  /**
   * Se o evento foi concluído.
   */
  is_submited: boolean,

  /**
   * ID da matéria referenciada por esse evento.
   */
  subject: number | null,
}

export type TaskDescription = SubjectDescription | EventDescription;

/**
 * Um evento que agora existe, construído a partir de uma descrição.
 */
export type Task = TaskDescription & {
  /**
   * O ID único desse evento.
   */
  id: number,
}

/**
 * Um card.
 */
export type Card = Task & {
  /**
   * Id único para esse card.
   */
  cid: number,

  /**
   * O detail do evento que esse card "escolheu" para renderizar.
   */
  detail: Detail,
};
