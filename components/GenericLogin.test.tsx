import React from "react";
import GenericLogin from "./GenericLogin";
import {
  act,
  fireEvent,
  render,
  waitFor,
} from "@testing-library/react-native";
import { Provider } from "react-native-paper";
import { CombinedDefaultThemes } from "../theme/Themes";

/** Verifica que submeter no componente chama a função de autenticação. */
async function checkSubmitAuthenticate(username: string, password: string) {
  const authenticate = jest.fn();
  const genericLogin = render(
    <Provider theme={CombinedDefaultThemes[0]}>
      <GenericLogin
        Authenticate={authenticate}
        WarningText=""
        SubmitText=""
      >{null}</GenericLogin>
    </Provider>,
  );

  const loginField = genericLogin.getByPlaceholderText("CPF ou RA");
  const pwField = genericLogin.getByPlaceholderText("Senha do SIGA");
  fireEvent.changeText(loginField, username);
  fireEvent.changeText(pwField, password);
  fireEvent.press(genericLogin.getByTestId("loginSubmit"));
  fireEvent.press(await genericLogin.findByTestId("loginDialogConfirm"));

  await waitFor(() => expect(authenticate).toHaveBeenCalledTimes(1));
  expect(authenticate).toHaveBeenCalledWith(
    username,
    password,
    expect.anything(),
  );
}

test("o componente lê as credenciais corretamente", async() => {
  await checkSubmitAuthenticate("matheus", "ramos");
  await checkSubmitAuthenticate("matheus", "🥺");
  await checkSubmitAuthenticate("matheus", "애플리케이션 최종사용자");
  await checkSubmitAuthenticate("matheus", "𐒲");
  await checkSubmitAuthenticate("RAMOS", "♨鳗梥낳⣻ꇉ鹌냬〴ഹ憕๒ණ⬌ꇳ閭");
  await checkSubmitAuthenticate("matheus", "ra:mos");
  await checkSubmitAuthenticate("matheus ", "ramos");
  await checkSubmitAuthenticate(" m a t h e u s  ", " r a m o s ");
}, 30000);

test("a função de mensagem de erro define uma mensagem de erro", async() => {
  const authenticate = jest.fn();
  const genericLogin = render(
    <Provider theme={CombinedDefaultThemes[0]}>
      <GenericLogin
        Authenticate={authenticate}
        WarningText=""
        SubmitText=""
      >{null}</GenericLogin>
    </Provider>,
  );

  fireEvent.press(genericLogin.getByTestId("loginSubmit"));
  fireEvent.press(await genericLogin.findByTestId("loginDialogConfirm"));

  await act(async() => {
    authenticate.mock.lastCall[2]("Mensagem de erro de exemplo.");
  });

  expect(await genericLogin.findByText("Mensagem de erro de exemplo."))
    .toBeTruthy();
});
