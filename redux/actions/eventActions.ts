import { ActionType } from "../constants/actionType";
import { EventState } from "../types/event";
import { Task, TaskDescription } from "../types/task";

export type AddEventAction = {
  type: ActionType.ADD_EVENT,
  payload: TaskDescription,
};

/**
 * Ação para criar um novo evento a partir de uma descrição.
 * @param event - Uma descrição do evento a ser criado.
 * @returns A ação para despachar.
 */
export const addEvent = (event: TaskDescription): AddEventAction => {
  return {
    type: ActionType.ADD_EVENT,
    payload: event,
  };
};

export type RemoveEventAction = {
  type: ActionType.REMOVE_EVENT,
  payload: Task,
}

/**
 * Ação para remover um evento.
 * @param event - O evento a ser removido.
 * @returns A ação para despachar.
 */
export const removeEvent = (event: Task): RemoveEventAction => {
  return {
    type: ActionType.REMOVE_EVENT,
    payload: event,
  };
};

export type RemoveSigaAction = {
  type: ActionType.REMOVE_SIGA,
};

/**
 * Ação para remover todos os eventos criados pelo siga.
 * @returns A ação para despachar.
 */
export const removeSIGA = (): RemoveSigaAction => {
  return {
    type: ActionType.REMOVE_SIGA,
  };
};

export type UpdateEventAction = {
  type: ActionType.UPDATE_EVENT,
  payload: Task,
};

/**
 * Ação para atualizar um evento.
 * @param event - O evento a ser atualizado.
 * @returns A ação para despachar.
 */
export const updateEvent = (event: Task): UpdateEventAction => {
  return {
    type: ActionType.UPDATE_EVENT,
    payload: event,
  };
};

export type LoadEventsAction = {
  type: ActionType.LOAD_EVENTS,
  payload: EventState,
}

/**
 * Ação para carregar os eventos que acabaram de ser retornados.
 * @param events - O eventos para carregar.
 * @returns A ação para despachar.
 */
export const loadEvents = (events: EventState): LoadEventsAction => {
  return {
    type: ActionType.LOAD_EVENTS,
    payload: events,
  };
};
