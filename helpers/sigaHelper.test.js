import { processSigaSubject } from "./sigaHelper";

const SIGA = {
  atividade: "ALGORITMOS E ESTRUTURAS DE DADOS 3",
  turma: "Z",
  horarios: [
    {
      inicio: "1:00 am",
      fim: "3:00 am",
      sala: "sala 530 at-19",
      dia: "SABADO",
    },
  ],
};

test("mapeia siga -> siga", () => {
  expect(processSigaSubject(SIGA)).toStrictEqual(SIGA);
});

test("horários inválidos mapeiam para 0:00 am", () => {
  expect(processSigaSubject(
    {
      ...SIGA,
      horarios: [
        {
          ...SIGA.horarios[0],
          inicio: "matheus ramos",
        },
      ],
    },
  )).toStrictEqual({
    ...SIGA,
    horarios: [
      {
        ...SIGA.horarios[0],
        inicio: "0:00 am",
        fim: "0:01 am",
      },
    ],
  });

  expect(processSigaSubject(
    {
      ...SIGA,
      horarios: [
        {
          ...SIGA.horarios[0],
          fim: [],
        },
      ],
    },
  )).toStrictEqual({
    ...SIGA,
    horarios: [
      {
        ...SIGA.horarios[0],
        inicio: "0:00 am",
        fim: "0:01 am",
      },
    ],
  });
});

test("atividade incorreta mapeia para nulo", () => {
  expect(processSigaSubject(
    {
      ...SIGA,
      atividade: 3,
    },
  )).toBe(null);
});

test("sala inválida mapeia para string vazia", () => {
  expect(processSigaSubject(
    {
      ...SIGA,
      horarios: [
        {
          ...SIGA.horarios[0],
          sala: 0 / 0,
        },
      ],
    },
  )).toStrictEqual({
    ...SIGA,
    horarios: [
      {
        ...SIGA.horarios[0],
        sala: "",
      },
    ],
  });

  expect(processSigaSubject(
    {
      ...SIGA,
      horarios: [
        {
          inicio: "1:00 am",
          fim: "3:00 am",
          dia: "SABADO",
        },
      ],
    },
  )).toStrictEqual({
    ...SIGA,
    horarios: [
      {
        ...SIGA.horarios[0],
        sala: "",
      },
    ],
  });
});

test("dia inválido mapeia para domingo", () => {
  expect(processSigaSubject(
    {
      ...SIGA,
      horarios: [
        {
          ...SIGA.horarios[0],
          dia: "PRIMEIRA",
        },
      ],
    },
  )).toStrictEqual({
    ...SIGA,
    horarios: [
      {
        ...SIGA.horarios[0],
        dia: "DOMINGO",
      },
    ],
  });

  expect(processSigaSubject(
    {
      ...SIGA,
      horarios: [
        {
          ...SIGA.horarios[0],
          dia: 0,
        },
      ],
    },
  )).toStrictEqual({
    ...SIGA,
    horarios: [
      {
        ...SIGA.horarios[0],
        dia: "DOMINGO",
      },
    ],
  });
});

test("turma inválida mapeia para string vazia", () => {
  expect(processSigaSubject(
    {
      ...SIGA,
      turma: expect,
    },
  )).toStrictEqual({
    ...SIGA,
    turma: "",
  });
});

test("horário inválido mapeia para lista vazia", () => {
  expect(processSigaSubject(
    {
      ...SIGA,
      horarios: new Error(""),
    },
  )).toStrictEqual({
    ...SIGA,
    horarios: [],
  });

  expect(processSigaSubject(
    {
      ...SIGA,
      horarios: undefined,
    },
  )).toStrictEqual({
    ...SIGA,
    horarios: [],
  });
});
