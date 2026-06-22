import {
  AddEventAction,
  LoadEventsAction,
  RemoveEventAction,
  RemoveSigaAction,
  UpdateEventAction,
} from "../actions/eventActions";
import { UpdateCardapioAction } from "../actions/restaurantActions";
import { UpdateSemesterAction } from "../actions/semesterActions";
import { SetThemeAction, ToggleThemeAction } from "../actions/themeActions";
import { UpdateUserAction } from "../actions/userActions";

export enum ActionType {
  ADD_EVENT = "ADD_EVENT",
  REMOVE_EVENT = "REMOVE_EVENT",
  UPDATE_EVENT = "UPDATE_EVENT",
  INCREMENT_NEXT_ID = "INCREMENT_NEXT_ID",
  SET_NEXT_ID = "SET_NEXT_ID",
  UPDATE_USER = "UPDATE_USER",
  UPDATE_SEMESTER = "UPDATE_SEMESTER",
  LOAD_EVENTS = "LOAD_EVENTS",
  SET_THEME = "SET_THEME",
  TOGGLE_THEME = "TOGGLE_THEME",
  REMOVE_SIGA = "REMOVE_SIGA",
  UPDATE_CARDAPIO = "UPDATE_CARDAPIO",
}

export type Action =
  | UpdateUserAction
  | SetThemeAction
  | ToggleThemeAction
  | UpdateSemesterAction
  | UpdateCardapioAction
  | AddEventAction
  | RemoveEventAction
  | RemoveSigaAction
  | UpdateEventAction
  | LoadEventsAction
