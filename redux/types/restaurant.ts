/**
 * Um prato, como descrito no cardápio.
 */
export type Meal = {
  /** Uma string legível contendo o prato principal sem restrição. */
  mainMeal: string,

  /** Uma string legível contendo o prato principal extra com ovo. */
  mainMealExtra: string,

  /** Uma string legível contendo o prato principal vegetariano. */
  mainMealVegetarian: string,

  /** Uma string legível contendo a guarnição. */
  garrison: string,

  /** Uma string legível descrevendo as opções de arroz disponíveis. */
  rice: string,

  /**
   * Uma string legível descrevendo as opções de feijão disponíveis.
   * @deprecated O cardápio parou de oferecer esse valor.
   */
  bean: string,

  /** Uma string legível descrevendo as opções de salada disponíveis. */
  salad: string,

  /** Uma string legível contendo a sobremesa. */
  desert: string,

  /** Uma string legível descrevendo as opções de suco disponíveis. */
  juice: string,
}

/**
 * O conteúdo do cardápio de um dia.
 */
export type RestaurantDayMenu = {
  /**
   * O prato do almoço.
   */
  lunch: Meal,

  /**
   * O prato do jantar.
   */
  dinner: Meal,
}

/**
 * Um aviso sobre o restaurante universitário.
 */
export type RestaurantNotice = {
  /**
   * O título do aviso.
   */
  title: string,

  /**
   * Uma descrição curta sobre o conteúdo do aviso.
   */
  description: string,

  /**
   * Uma string contendo um ou mais parágrafos com o conteúdo do aviso.
   */
  content: string,
};

/**
 * Um objeto contendo o cardápio da semana mais recente, junto com um aviso. O
 * campo `notice` possui o aviso. Outros campos são strings de data no formato
 * `YYYY-MM-DD` e possuem dados do cardápio.
 *
 * #### Por que a intersecção?
 * Eu fui preguiçoso na hora de inserir um objeto de aviso, e joguei ele dentro
 * do cardápio, sem perceber que os outros campos eram de chave dinâmica. Como
 * o estado é persistente, estamos presos a essa decisão, já que mudar isso pode
 * quebrar estados atualmente armazenados em dispositivos.
 *
 * #### Por que `RestaurantNotice | false`?
 * Quanto a API de aviso foi levantada, a intenção era retornar um objeto quando
 * havia um aviso, ou `null` caso contrário. Devido a uma limitação do Django
 * REST, ela não conseguia retornar `null`, e retornava uma resposta vazia no
 * lugar. Como o código de aviso já estava rodando, resolvemos que retornar
 * `false` teria o resultado esperado sem quebrar compatibilidade. Como
 * resultado, `false` é o valor que esconde o aviso. A propriedade é opcional
 * pois seu valor pode não existir e não ser falso, como é o caso no início do
 * programa.
 */
export type RestaurantWeekMenu = {
  notice?: RestaurantNotice | false,
} & {
  [date: string]: RestaurantDayMenu,
}

/**
 * O estado do restaurante armazenado persistentemente.
 */
export type RestaurantState = {
  /**
   * Uma string no formato ISO-8601 contendo a data e hora da última
   * atualização do estado, ou a string vazia.
   */
  updatedAt: string,

  /**
   * O cardápio da semana, junto com o aviso.
   */
  weekMenu: RestaurantWeekMenu,
};
