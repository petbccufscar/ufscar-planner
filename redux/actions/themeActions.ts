import { ActionType } from "../constants/actionType";

export type SetThemeAction = {
  type: ActionType.SET_THEME,
  index: number,
};

/**
 * Ação para definir o índice do tema. Não alterna entre o modo claro e o modo
 * escuro.
 * @param index - O índice do tema que substitui no estado o campo
 * {@link ThemeState.themeIdx}.
 * @returns A ação para despachar.
 */
export const setTheme = (index: number): SetThemeAction => {
  return {
    type: ActionType.SET_THEME,
    index: index,
  };
};

export type ToggleThemeAction = {
  type: ActionType.TOGGLE_THEME,
}

/**
 * Ação para alternar o tema entre o modo claro e o modo escuro.
 * @returns A ação para despachar.
 */
export const toggleTheme = (): ToggleThemeAction => {
  return {
    type: ActionType.TOGGLE_THEME,
  };
};
