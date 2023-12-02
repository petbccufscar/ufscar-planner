## UFSCar Planner

Olá pessoa que gostaria de contribuir/manter o app.

Nesse Readme darei uma visão geral do projeto. Boa sorte.

### Instalação de Dependências

1. Instale as dependências globais com o seu gerenciador de pacotes:

```bash
sudo apt update
sudo apt install ca-certificates git curl gnupg
```

2. Instale o NodeJS LTS e o Yarn:

```bash
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | sudo gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg
curl -sL https://dl.yarnpkg.com/debian/pubkey.gpg | gpg --dearmor | sudo tee /usr/share/keyrings/yarnkey.gpg >/dev/null
echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_20.x nodistro main" | sudo tee /etc/apt/sources.list.d/nodesource.list
echo "deb [signed-by=/usr/share/keyrings/yarnkey.gpg] https://dl.yarnpkg.com/debian stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
sudo apt update
sudo apt install nodejs yarn
```

3. Instale as dependências globais pelo Yarn:

```bash
yarn global add eas-cli @expo/ngrok@^4.1.0
```

4. Clone o repositório:

```bash
git clone https://github.com/petbccufscar/ufscar-planner.git
cd ufscar-planner
```

5. Instale as dependências locais de projeto:

```bash
yarn install
```

### Desenvolvimento pelo Expo Go ou Build de Desenvolvimento Pronta

1. Apague o ID de projeto do EAS no `app.config.js` (ele não gosta quando você tem ele lá sem uma
   conta com acesso ao projeto):

```diff
     description: "",
     extra: {
       eas: {
-        projectId: "5ff4fcf5-520f-4ac6-bc18-dd5d292dca98",
       },
     },
     hooks: {
```

2. Inicie o servidor de desenvolvimento:

```bash
yarn run expo start --tunnel --go
```

3. Conecte com o servidor usando o aplicativo _Expo Go_ para Android, ou usando
   uma build de desenvolvimento.

### Criando Suas Próprias Builds

Se você não quer ou não consegue usar alguma build pronta de desenvolvimento ou
de testes, você pode criar outro projeto do Expo e ser você mesmo sua própria
build.

1. Instale o [Android Studio](https://developer.android.com/studio).

2. Crie uma conta no [Expo](https://expo.dev/).

3. Crie um novo projeto no Expo para hospedar a sua versão.

4. Mude a configuração no `app.config.js` para refletir o novo projeto:

```diff
 module.exports = {
   expo: {
     name: "UFSCar Planner",
-    owner: "petbccufscar",
-    slug: "ufscar-planner",
+    owner: "migeyel",
+    slug: "meu-planner-d-less",
     version: "1.5.2",
     orientation: "portrait",
     icon: "./assets/icon.png",
```

```diff
     description: "",
     extra: {
       eas: {
-        projectId: "5ff4fcf5-520f-4ac6-bc18-dd5d292dca98",
+        projectId: "173172ca-47cc-4510-a451-f6c17ffcb641",
       },
     },
     hooks: {
```

5. Defina a variável de ambiente `ANDROID_HOME`:

```bash
export ANDROID_HOME=$HOME/Android/Sdk
```

6. Rode o comando de criação de build:

```bash
# Desenvolvimento
yarn build:dev
# Preview + teste de atualizações
yarn build:preview
# Produção
yarn build:prod
```

### Noções básicas de react-native (versão simplificada)

<details>
<summary>Para quem está caindo de paraquedas...</summary>

Estarei considerando que você saiba mais ou menos como funciona páginas estáticas em html.

Assim como html, react native também utiliza tags para poder construir o design a partir de uma hierarquia.

Em react native, chamamos de **componentes**, essas frações de design composta por tags. Cada componente pode ser composto de outros componentes e assim por diante.

Nesse aplicativo, estamos usando o que são chamados de **componentes funcionais**, são funcões que retornam um componente jsx (estilo tag).

_Esse tipo de componente aceita os chamados [hooks](https://reactjs.org/docs/hooks-intro.html)_.

Exemplo:

```js
function Comp1(props) {
  /* Antes do return pode ser feito quase qualquer tipo de computação
    Tem basicamente esses dois tipos de variável
        let = pode mudar seu valor
        const = não pode mudar seu valor
        var = esquece, não usa isso */
  const a = props.value || 9;
  let b = 3;
  b += a;
  // Aqui está sendo retornado um texto com o que tem em b.
  return <Text>{b}</Text>;
}

function Comp2() {
  // Aqui podemos usar o componente criado acima para criar outro
  return (
    <View>
      <Comp1 value={3} />
    </View>
  );

  // Utilizando props, é possível pegar valores passados ao chamar o componente,
  // exemplo: esse value={3} que pode ser acessado no Comp1 via props.value
}
```

Bom, você deve se lembrar que existia o CSS né? Infelizmente, você não será capaz de fugir dele.
Aqui temos o StyleSheet (basicamente a mesma coisa do css só que em camelCase).

Exemplo:

```js
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fdfdfd",
  },
  text: {
    color: "red",
    textAlign: "center",
  },
});
```

Podemos utilizar esse estilo do seguinte modo:

```js
function Comp3() {
  return (
    <View style={styles.container}>
      {/* também podemos sobrescrevê-lo  VV*/}
      <Text style={{ ...styles.text, color: "green" }}>teste</Text>
      <Comp2 />
    </View>
  );
}
```

O básico é isso, qualquer coisa, utilize um motor de busca para sanar suas dúvidas.

</details>

### Estrutura do código

<details>
<summary>App.js</summary>

Esse [arquivo](App.js) é basicamente a main, nele há o componente no topo da hierarquia.
Algumas coisas são carregadas nele, como o [tema](https://callstack.github.io/react-native-paper/theming.html), o [redux](https://redux.js.org/introduction/getting-started), as [notificações](https://docs.expo.dev/versions/latest/sdk/notifications/) e os [Navigators](https://reactnavigation.org/docs/getting-started).

</details>

<details>
<summary>app.json</summary>

Esse [arquivo](app.json) contém algumas variáveis da release do aplicativo, como localização e cor da splashscreen, número da versão e etc.

</details>

<details>
<summary>navigation</summary>

Esta [pasta](/navigation) contém o registro das rotas de cada fluxo de tela, exceto por aqueles registrados no App.js.

Estamos usando a versão 6.x do [react navigation](https://reactnavigation.org/docs/getting-started)

</details>

<details>
<summary>helpers</summary>

Esta [pasta](/helpers) contém arquivos com funções úteis e prontas para utilizar ao longo do app.

</details>

<details>
<summary>assets</summary>

Esta [pasta](/assets) contém arquivos de imagem e etc.

</details>

<details>
<summary>screens</summary>

Esta [pasta](/screens) contém arquivos que representam as telas mais importantes do app, basicamente a pasta principal do aplicativo.

</details>
<details>
<summary>components</summary>

Esta [pasta](/components) contém arquivos com alguns componentes que utilizamos.

Por exemplo:

- A Agenda é o componente da tela do planner
- Gradient possui uns gradientes para usar
- EventCards contém a maioria dos cards que representam eventos

</details>
<details>
<summary>theme/Themes.js</summary>

Este [arquivo](/theme/Themes.js) contém os temas do aplicativo.

Estamos seguindo o material 3 para isso.

Alguns temas foram construidos utilizando esse [plugin do figma](https://www.figma.com/community/plugin/1034969338659738588/Material-Theme-Builder)

</details>
<details>
<summary>redux</summary>

Esta [pasta](/redux) está relacionada ao banco de dados não relacional utilizado.

O [redux](https://react-redux.js.org) é divido em algumas etapas:

- Temos as [actions](/redux/actions), que são ações que podem ser disparadas usando o dispatch, e carregando informação como payload.
- Temos os [reducers](/redux/reducers/), que são os meios de tratamento para cada action em cada store, cada um possuindo um estado inicial.
- Temos o [index](/redux/reducers/index.js), que organiza os reducers e decide quais serão persistentes.
- Temos a [constants](/redux/constants) que serve para controlar a escrita dos actions, para não ocorrer mistyping.
- Por fim, temos a [store](/redux/store.js) que faz tudo funcionar junto.
- </details>

### Principais Funcionalidades e onde se localizam

- [A Agenda do planner](components/Agenda.js)
- [Os temas](theme/Themes.js)
- [Tela do restaurante](/screens/RestaurantMenu.js)
- [Telas da dashboard](/screens/dashboardScreens)
- [Persistência de dados](/redux)
- [Editor de fórmula](/components/NewSubject.js)
- [ScrollView personalizada](/components/ScrollView.js)
- [Fluxo de boas vindas](/screens/Welcome.js)
- [Sincronizar com o SIGA](/screens/dashboardScreens/Siga.js)

### FAQ

<details>
<summary>Por quê as notificações não aparecem quando o app está fechado?</summary>

Isso deve-se ao sistema do seu dispositivo estar limitando o app por economia de bateria.
Para resolver, basta ir na Informações/Configurações do app e trocar a limitação da economia de bateria.

</details>

<details>
<summary>De onde vêm o cardápio do RU?</summary>

Primeiramente [tentamos pegar os dados do site da ufscar](/screens/RestaurantMenu.js), entretanto, caso o Restaurante Universitário não atualizar, fizemos um meio alternativo, um servidor que pega as informações de outros lugares.

O projeto desse servidor está disponivel [aqui](https://github.com/petbccufscar/ru_api).

Caso as informações estejam erradas, a empresa do Restaurante Universitário mudou o modo de postar o cardápio e será necessário uma nova manutenção, no app ou no servidor.

</details>
