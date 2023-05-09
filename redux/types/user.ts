export enum Campus {
  ARARAS = "Araras",
  LAGOA_DO_SINO = "Lagoa do Sino",
  SÃO_CARLOS = "São Carlos",
  SOROCABA = "Sorocaba",
}

export type User = {
  /**
   * O nome do aluno.
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

  /**
   * O token de autorização Basic do usuário para sincronização do RU. Não é
   * definido se a sincronização estiver desativada.
   */
  balanceSyncToken?: string,
}

/**
 * O estado do usuário armazenado persistentemente.
 */
export type UserState = {
  /**
   * O usuário.
   */
  user: User,
};
