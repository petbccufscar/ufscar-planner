## UFSCar Planner

Olá! Seja bem-vindo ao repositório do UFSCar Planner. Este aplicativo foi desenvolvido para auxiliar na organização e planejamento de atividades e materiais na Universidade Federal de São Carlos (UFSCar). Além disso, oferece a conveniência de acessar o menu do Restaurante Universitário da UFSCar. Algumas funcionalidades adicionais incluem a capacidade de simular médias e frequências.

### Instalação de Dependências

Para começar, siga os passos abaixo para instalar as dependências necessárias:

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

5. Instale as dependências locais do projeto:

   ```bash
   yarn install
   ```

### Desenvolvimento com Expo Go ou Build de Desenvolvimento Pronta

1. Apague o ID de projeto do EAS no `app.config.js` (ele não gosta quando você tem ele lá sem uma conta com acesso ao projeto):

   ```diff
   description: "",
   extra: {
     eas: {
   -   projectId: "5ff4fcf5-520f-4ac6-bc18-dd5d292dca98",
     },
   },
   hooks: {
   ```

2. Inicie o servidor de desenvolvimento:

   ```bash
   yarn run expo start --tunnel --go
   ```

3. Conecte-se ao servidor usando o aplicativo _Expo Go_ para Android, ou utilizando uma build de desenvolvimento.

### Criando Suas Próprias Builds

Se preferir criar suas próprias builds, siga os passos abaixo:

1. Instale o [Android Studio](https://developer.android.com/studio).

2. Crie uma conta no [Expo](https://expo.dev/).

3. Crie um novo projeto no Expo para hospedar a sua versão.

4. Modifique a configuração no `app.config.js` para refletir o novo projeto:

   ```diff
   module.exports = {
     expo: {
       name: "UFSCar Planner",
   -   owner: "petbccufscar",
   -   slug: "ufscar-planner",
   +   owner: "seu-usuario",
   +   slug: "seu-planner",
       version: "1.5.2",
       orientation: "portrait",
       icon: "./assets/icon.png",
   ```

   ```diff
   description: "",
   extra: {
     eas: {
   -   projectId: "5ff4fcf5-520f-4ac6-bc18-dd5d292dca98",
   +   projectId: "seu-id-do-projeto",
     },
   },
   hooks: {
   ```

5. Defina a variável de ambiente `ANDROID_HOME`:

   ```bash
   export ANDROID_HOME=$HOME/Android/Sdk
   ```

6. Execute o comando para criar a build:

   ```bash
   # Desenvolvimento
   yarn build:dev
   # Preview + teste de atualizações
   yarn build:preview
   # Produção
   yarn build:prod
   ```

### Noções Básicas de React Native (Versão Simplificada)

Se você está começando agora com React Native, aqui estão algumas noções básicas:

- **Componentes Funcionais**: Em React Native, utilizamos componentes funcionais que retornam um componente JSX.

  ```jsx
  function MeuComponente(props) {
    return <Text>{props.texto}</Text>;
  }
  ```

- **Estilização com StyleSheet**: Assim como no CSS, utilizamos StyleSheet para estilizar componentes.

  ```jsx
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

- **React Navigation**: Utilizamos a versão 6.x do React Navigation para gerenciar as rotas do aplicativo.

- **Redux**: O Redux é utilizado para o gerenciamento do estado da aplicação. A estrutura inclui actions, reducers e a store.

Para mais detalhes, consulte o arquivo [App.js](App.js) e os diretórios [navigation](/navigation) e [redux](/redux) no código-fonte.

### Estrutura do Código

- **App.js**: Arquivo principal, onde ocorre a inicialização do aplicativo e configurações principais.
  
- **app.json**: Configurações relacionadas à release do aplicativo, como localização e cor da splashscreen, número da versão, etc.

- **navigation**: Registro das rotas de cada fluxo de tela, utilizando o React Navigation 6.x.

- **helpers**: Funções úteis e prontas para uso ao longo do aplicativo.

- **assets**: Arquivos de imagem e recursos diversos.

- **screens**: Telas principais do aplicativo, incluindo a Agenda do planner, Tela do restaurante, Telas da dashboard, etc.

- **components**: Componentes reutilizáveis utilizados no aplicativo, como a Agenda, Gradient, EventCards, entre outros.

- **theme/Themes.js**: Definição dos temas do aplicativo, seguindo o Material 3.

- **redux**: Estrutura do Redux, incluindo actions, reducers e a store.

### Principais Funcionalidades e Onde Se Localizam

- [Agenda do Planner](components/Agenda.js)


- [Temas](theme/Themes.js)
- [Tela do Restaurante](/screens/RestaurantMenu.js)
- [Telas da Dashboard](/screens/dashboardScreens)
- [Persistência de Dados](/redux)
- [Editor de Fórmula](/components/NewSubject.js)
- [ScrollView Personalizada](/components/ScrollView.js)
- [Fluxo de Boas-vindas](/screens/Welcome.js)
- [Sincronização com o SIGA](/screens/dashboardScreens/Siga.js)

### FAQ

- **Por que as notificações não aparecem quando o app está fechado?**
  Isso pode ser devido a configurações de economia de bateria no dispositivo. Verifique as configurações do aplicativo e ajuste as permissões.

- **De onde vêm o cardápio do RU?**
  Inicialmente, tentamos obter os dados do site da UFSCar. Caso o Restaurante Universitário não atualize, utilizamos um servidor que coleta informações de outras fontes. O projeto desse servidor está disponível [aqui](https://github.com/petbccufscar/ru_api). Se as informações estiverem incorretas, pode ser necessário uma atualização no app ou no servidor.

### Contato

Se você tiver alguma dúvida, sugestão ou precisar de suporte, por favor, sinta-se à vontade para entrar em contato conosco:

- **E-mail:** petbcc.ufscar@gmail.com

Você também pode criar uma **Issue** no [GitHub](https://github.com/petbccufscar/ufscar-planner/issues) para relatar problemas, sugerir melhorias ou contribuir para o desenvolvimento do UFSCar Planner. Estamos sempre abertos para receber feedback e colaboração. Obrigado!

