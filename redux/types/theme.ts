/**
 * O estado do tema armazenado persistentemente.
 */
export type ThemeState = {
  /**
   * O índice do tema que está sendo usado. Pode indexar um tema escuro ou um
   * tema claro.
   * @see {@link CombinedDefaultThemes} e {@link CombinedDarkThemes} para os
   * temas que esse valor pode indexar.
   */
  themeIdx: number,

  /**
   * `true` se o valor do {@link ThemeState.themeIdx} esteja indexando um tema
   * escuro, ou `false` caso esteja indexando um tema claro.
   */
  isDark: boolean,
};
