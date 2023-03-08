export enum Campus {
  ARARAS = "Araras",
  LAGOA_DO_SINO = "Lagoa do Sino",
  SÃO_CARLOS = "São Carlos",
  SOROCABA = "Sorocaba",
}

/**
 * O estado do usuário armazenado persistentemente.
 */
export type UserState = {
  /**
   * O usuário.
   */
  user: {
    /**
     * O nome do infeliz.
     */
    name: string,

    /**
     * O email do aluno, como definido por ele mesmo.
     */
    email: string,

    /**
     * O campus escolhido.
     */
    campus: Campus,

    /**
     * Se `true`, apresentar a tela de boas vindas, senão, ir direto à tela
     * principal.
     */
    welcome: boolean,

    /**
     * O saldo da carteirinha do restaurante armazenado localmente.
     */
    money: number,

    /**
     * O preço configurado de uma refeição no restaurante.
     */
    meal: number,
  },
};
