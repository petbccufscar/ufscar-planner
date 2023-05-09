import { User } from "../redux/types/user";

const URL = "https://sistemas.ufscar.br/sagui-api/integracoes/pwacesso/consultar-saldo";

type SaldoResponse = {
  saldo: number,
  servidorOnline: boolean,
};

export enum BalanceErr {
  DISABLED = "DISABLED",
  AUTH_FAILED = "AUTH_FAILED",
  UNKNOWN = "UNKNOWN",
}

/**
 * Verifica se a sincronização foi habilitada.
 * @param user - O usuário para autenticar a API.
 * @returns `true` sse a sincronização foi habilitada.
 */
export function isBalanceSyncEnabled(user: User): boolean {
  return user.balanceSyncToken !== undefined;
}

/**
 * Tenta obter o saldo pela API.
 * @param user - O usuário para autenticar a API.
 * @returns O saldo, ou uma string de erro em caso de erro.
 */
export async function tryGetBalance(user: User): Promise<number | BalanceErr> {
  if (!isBalanceSyncEnabled(user)) { return BalanceErr.DISABLED; }
  const headers = { Authorization: "Basic " + user.balanceSyncToken };
  const response = await fetch(URL, { headers });
  if (response.status == 200) {
    try {
      const saldo = await response.json() as SaldoResponse;
      if (saldo.servidorOnline && typeof saldo.saldo === "number") {
        return saldo.saldo;
      } else {
        return BalanceErr.UNKNOWN;
      }
    } catch (_) {
      return BalanceErr.UNKNOWN;
    }
  } else if (response.status == 401 || response.status == 403) {
    return BalanceErr.AUTH_FAILED;
  } else {
    return BalanceErr.UNKNOWN;
  }
}
