import { mapSigaSubject } from "./sigaHelper";

jest.useFakeTimers();
jest.setSystemTime(new Date("2023-05-22 15:43:19 GMT-0300"));

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

const MAPPED = {
  weekly: true,
  siga: true,
  is_subject: true,
  is_submited: false,
  details: [
    {
      day: 6,
      datetime_init: "Mon May 22 2023 01:00:19 GMT-0300 (Horário Padrão de Brasília)",
      datetime_end: "Mon May 22 2023 03:00:19 GMT-0300 (Horário Padrão de Brasília)",
      local: "sala 530 at-19",
    },
  ],
  name: "ALGORITMOS E ESTRUTURAS DE DADOS 3",
  subject: null,
  notification: [],
  description: "",
  color: 6,
  mean: "(p1+p2+p3)/3",
  frequency: "(aulasDadas - faltas)/aulasDadas",
  grade: {
    frequency: {
      aulasDadas: 1,
      faltas: 0,
    },
    mean: {
      p1: 0,
      p2: 0,
      p3: 0,
    },
  },
  turma: "turma Z",
  teachers: [],
};

test("mapeia siga -> siga", () => {
  expect(mapSigaSubject(SIGA)).toStrictEqual(MAPPED);
});

test("horários inválidos mapeiam para 0:00 am", () => {
  expect(mapSigaSubject(
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
    ...MAPPED,
    details: [
      {
        ...MAPPED.details[0],
        datetime_init: "Mon May 22 2023 00:00:19 GMT-0300 (Horário Padrão de Brasília)",
        datetime_end: "Mon May 22 2023 00:01:19 GMT-0300 (Horário Padrão de Brasília)",
      },
    ],
  });

  expect(mapSigaSubject(
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
    ...MAPPED,
    details: [
      {
        ...MAPPED.details[0],
        datetime_init: "Mon May 22 2023 00:00:19 GMT-0300 (Horário Padrão de Brasília)",
        datetime_end: "Mon May 22 2023 00:01:19 GMT-0300 (Horário Padrão de Brasília)",
      },
    ],
  });
});

test("atividade incorreta mapeia para nulo", () => {
  expect(mapSigaSubject(
    {
      ...SIGA,
      atividade: 3,
    },
  )).toBe(null);
});

test("sala inválida mapeia para string vazia", () => {
  expect(mapSigaSubject(
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
    ...MAPPED,
    details: [
      {
        ...MAPPED.details[0],
        local: "",
      },
    ],
  });

  expect(mapSigaSubject(
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
    ...MAPPED,
    details: [
      {
        ...MAPPED.details[0],
        local: "",
      },
    ],
  });
});

test("dia inválido mapeia para domingo", () => {
  expect(mapSigaSubject(
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
    ...MAPPED,
    details: [
      {
        ...MAPPED.details[0],
        day: 0,
      },
    ],
  });

  expect(mapSigaSubject(
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
    ...MAPPED,
    details: [
      {
        ...MAPPED.details[0],
        day: 0,
      },
    ],
  });
});

test("turma inválida mapeia para string vazia", () => {
  expect(mapSigaSubject(
    {
      ...SIGA,
      turma: expect,
    },
  )).toStrictEqual({
    ...MAPPED,
    turma: "turma ",
  });
});

test("horário inválido mapeia para lista vazia", () => {
  expect(mapSigaSubject(
    {
      ...SIGA,
      horarios: new Error(""),
    },
  )).toStrictEqual({
    ...MAPPED,
    details: [],
  });

  expect(mapSigaSubject(
    {
      ...SIGA,
      horarios: undefined,
    },
  )).toStrictEqual({
    ...MAPPED,
    details: [],
  });
});
