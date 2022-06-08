## UFSCar Planner

Olá pessoa que gostaria de contribuir/manter o app.

Nesse Readme darei uma visão geral do projeto.

### Ferramentas
<details>
<summary>Sobre as ferramentas...</summary>

Nesse projeto estamos usando react native + [expo](https://expo.dev), portanto, você deve instalar o expo-cli para poder fazer funcionar.

Primeiro, você deve ter o [Node.js](https://nodejs.org/en/download/) instalado, após isso, execute o seguinte comando 
```
npm i -g expo-cli
```
Como estamos utilizando o yarn para poder gerenciar os pacotes, você também deve instalá-lo:
```
npm i -g yarn
```
Finalmente, podemos instalar as dependências...
</details>

### Dependências
<details>
<summary>Sobre as dependências...</summary>

Como se trata de um projeto expo, as dependências ficam armazenadas no arquivo [package.json](package.json).
O yarn utiliza o [yarn.lock](yarn.lock) para poder controlar o que foi baixado na pasta node_modules.

Para instalar as dependências basta fazer:
```
yarn install
```
### Run
Para testar o app, deve-se instalar o [aplicativo expo](https://play.google.com/store/apps/details?id=host.exp.exponent&hl=en&gl=US) no seu smartphone (Android ou IOS), após isso, na pasta raiz deste projeto, deve-se digitar:
```
expo start
```
Isso abrirá uma aba no seu navegador, não se assuste.
Após isso, terá três tipos de opção:
 - Local
 - Lan
 - Tunnel

Normalmente utilizamos tunnel, para as outras pessoas do projeto poderem acessar.
Dito isso, basta apenas escanear o qr code com o aplicativo expo em seu celular, e assim, começar a testar o app.
</details>

### Noções básicas de react-native (versão simplificada)
<details>
<summary>Para quem está caindo de paraquedas...</summary>

Estarei considerando que você saiba mais ou menos como funciona páginas estáticas em html.

Assim como html, react native também utiliza tags para poder construir o design a partir de uma hierarquia.

Em react native, chamamos de **componentes**, essas frações de design composta por tags. Cada componente pode ser composto de outros componentes e assim por diante.

Nesse aplicativo, estamos usando o que são chamados de **componentes funcionais**, são funcões que retornam um componente jsx (estilo tag).

*Esse tipo de componente aceita os chamados [hooks](https://reactjs.org/docs/hooks-intro.html)*.



Exemplo: 
````js
function Comp1(props){

    /* Antes do return pode ser feito quase qualquer tipo de computação
    Tem basicamente esses dois tipos de variável
        let = pode mudar seu valor
        const = não pode mudar seu valor
        var = esquece, não usa isso */
    const a = props.value || 9;
    let b = 3;
    b += a;
    // Aqui está sendo retornado um texto com o que tem em b.
    return (<Text>{b}</Text>)
}

function Comp2(){
    // Aqui podemos usar o componente criado acima para criar outro
    return (
        <View>
            <Comp1 value={3}/>
        </View>)
    
    // Utilizando props, é possível pegar valores passados ao chamar o componente, 
    // exemplo: esse value={3} que pode ser acessado no Comp1 via props.value
}
````

Bom, você deve se lembrar que existia o CSS né? Infelizmente, você não será capaz de fugir dele.
Aqui temos o StyleSheet (basicamente a mesma coisa do css só que em camelCase).

Exemplo:
````js
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fdfdfd"
  },
  text: {
    color: "red",
    textAlign: "center",
  }
});
````

Podemos utilizar esse estilo do seguinte modo:

```js
function Comp3(){
    return (<View style={styles.container}>
        {/* também podemos sobrescrevê-lo  VV*/}
        <Text style={{...styles.text, color:'green'}}> 
        teste
        </Text>
        <Comp2/>
    </View>)
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
- 
</details>


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
