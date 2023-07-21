import { Dispatch } from "redux";
import { UpdateUserAction, updateUser } from "../redux/actions/userActions";
import { User } from "../redux/types/user";
import * as SecureStore from "expo-secure-store";

/**
 * Define o token no SecureStore.
 * @param token - O token para definir.
 * @returns `true` sse a operação foi um sucesso.
 */
async function setRuAuthToken(token: string): Promise<boolean> {
  if (!await SecureStore.isAvailableAsync()) { return false; }
  try {
    await SecureStore.setItemAsync("ufscarplanner.user.ruauth", token);
    return true;
  } catch (_) {
    return false;
  }
}

/**
 * Apaga o token no SecureStore.
 */
async function deleteRuAuthToken(): Promise<void> {
  try {
    if (await SecureStore.isAvailableAsync()) {
      SecureStore.deleteItemAsync("ufscarplanner.user.ruauth");
    }
  } catch (_) { /* 👺 */ }
}

/**
 * Extrai o token do SecureStore.
 * @returns O token extraído, ou nulo se não existir.
 */
async function getRuAuthToken(): Promise<string | null> {
  try {
    if (!await SecureStore.isAvailableAsync()) { return null; }
    return await SecureStore.getItemAsync("ufscarplanner.user.ruauth");
  } catch (_) {
    return null;
  }
}

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
 * Altera o estado da sincronização.
 * @param user - O objeto de usuário para submeter ao estado.
 * @param token - O token de autorização da API.
 * @param dispatch - A função de dispatch do estado.
 */
export async function enableBalanceSync(
  user: User,
  token: string,
  dispatch: Dispatch<UpdateUserAction>,
) {
  if (await setRuAuthToken(token)) {
    dispatch(updateUser({ ...user, balanceSyncToken: "" }));
  } else {
    dispatch(updateUser({ ...user, balanceSyncToken: token }));
  }
}

/**
 * Desabilita a sincronização.
 * @param user - O objeto de usuário para submeter ao estado.
 * @param dispatch - A função de dispatch do estado.
 */
export async function disableBalanceSync(
  user: User,
  dispatch: Dispatch<UpdateUserAction>,
) {
  await deleteRuAuthToken();
  const newUser = { ...user };
  delete newUser.balanceSyncToken;
  dispatch(updateUser(newUser));
}

/**
 * Tenta obter o saldo pela API usando o token diretamente.
 * @param token - O token para autenticar.
 * @returns O saldo, ou uma string de erro em caso de erro.
 */
export async function tryGetBalanceWithToken(
  token: string,
): Promise<number | BalanceErr> {
  const headers = { Authorization: "Basic " + token };
  try {
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
  } catch (_) {
    return BalanceErr.UNKNOWN;
  }
}

/**
 * Tenta obter o saldo pela API, usando o SecureStore caso necessário.
 * @param user - O usuário para autenticar a API.
 * @returns O saldo, ou uma string de erro em caso de erro.
 */
export async function tryGetBalance(user: User): Promise<number | BalanceErr> {
  if (!isBalanceSyncEnabled(user)) { return BalanceErr.DISABLED; }
  if (user.balanceSyncToken == "") {
    const token = await getRuAuthToken();
    if (token === null) {
      // O token sumiu do SecureStore!
      return BalanceErr.UNKNOWN;
    } else {
      return await tryGetBalanceWithToken(token);
    }
  } else {
    return tryGetBalanceWithToken(user.balanceSyncToken as string);
  }
}
