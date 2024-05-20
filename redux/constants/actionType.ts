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
  ADD_EVENT = '0',
  REMOVE_EVENT = '1',
  UPDATE_EVENT = '2',
  INCREMENT_NEXT_ID = '3',
  SET_NEXT_ID = '4',
  UPDATE_USER = '5',
  UPDATE_SEMESTER = '6',
  LOAD_EVENTS = '7',
  SET_THEME = '8',
  TOGGLE_THEME = '9',
  REMOVE_SIGA = '10',
  UPDATE_CARDAPIO = '11',
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
