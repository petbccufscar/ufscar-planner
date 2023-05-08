import { User } from "../redux/types/user";

const URL = "https://sistemas.ufscar.br/sagui-api/integracoes/pwacesso/consultar-saldo";

type SaldoResponse = {
  saldo: number,
  servidorOnline: boolean,
};

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
 * @returns O saldo, ou nulo se a autorização foi desabilitada ou ocorreu algum
 * problema.
 */
export async function tryGetBalance(user: User): Promise<number | null> {
  if (!isBalanceSyncEnabled(user)) { return null; }
  const headers = { Authorization: "Basic " + user.balanceSyncToken };
  const response = await fetch(URL, { headers });
  if (response.status == 200) {
    try {
      const saldo = await response.json() as SaldoResponse;
      if (saldo.servidorOnline && typeof saldo.saldo === "number") {
        return saldo.saldo;
      } else {
        return null;
      }
    } catch (_) {
      return null;
    }
  } else {
    return null;
  }
}
