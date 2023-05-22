import { Detail, SubjectDescription } from "../redux/types/task";
import { Buffer } from "buffer";

enum WeekdaySiga {
  DOMINGO = "DOMINGO",
  SEGUNDA = "SEGUNDA",
  TERCA = "TERCA",
  QUARTA = "QUARTA",
  QUINTA = "QUINTA",
  SEXTA = "SEXTA",
  SABADO = "SABADO",
}

const WeekdaySigaMap = [
  WeekdaySiga.DOMINGO,
  WeekdaySiga.SEGUNDA,
  WeekdaySiga.TERCA,
  WeekdaySiga.QUARTA,
  WeekdaySiga.QUINTA,
  WeekdaySiga.SEXTA,
  WeekdaySiga.SABADO,
];

type SigaHorario = {
  inicio: string,
  fim: string,
  sala: string,
  dia: WeekdaySiga,
};

type SigaSubject = {
  atividade: string,
  turma: string,
  horarios: SigaHorario[],
};

function parseTime(t: string): string | null {
  const time = t.match(/(\d+)(?::(\d\d))?\s*(p?)/);
  if (time !== null) {
    const d = new Date();
    d.setHours(parseInt(time[1]) + (time[3] ? 12 : 0));
    d.setMinutes(parseInt(time[2]) || 0);
    return d.toString();
  } else {
    return null;
  }
}

/** Mapeia uma atividade do siga para uma atividade do Planner. */
export function mapSigaSubject(s: SigaSubject): SubjectDescription | null {
  if (typeof s.atividade !== "string") {
    return null;
  }

  if (typeof s.turma !== "string") {
    s.turma = "";
  }

  if (!Array.isArray(s.horarios)) {
    s.horarios = [];
  }

  const mappedDetails: Detail[] = [];
  for (const horario of s.horarios) {
    if (typeof horario.inicio !== "string" || typeof horario.fim !== "string") {
      horario.inicio = "0:00 am";
      horario.fim = "0:01 am";
    }

    let datetime_init = parseTime(horario.inicio);
    let datetime_end = parseTime(horario.fim);
    if (datetime_init === null || datetime_end === null) {
      const di = new Date();
      di.setHours(0);
      di.setMinutes(0);

      const df = new Date();
      df.setHours(0);
      df.setMinutes(1);

      datetime_init = di.toString();
      datetime_end = df.toString();
    }

    if (typeof horario.sala !== "string") {
      horario.sala = "";
    }

    if (typeof horario.dia !== "string") {
      horario.dia = WeekdaySiga.DOMINGO;
    }

    if (!(horario.dia in WeekdaySiga)) {
      horario.dia = WeekdaySiga.DOMINGO;
    }

    mappedDetails.push({
      day: WeekdaySigaMap.indexOf(horario.dia),
      datetime_init,
      datetime_end,
      local: horario.sala,
    });
  }

  return {
    siga: true,
    details: mappedDetails,
    name: s.atividade,
    color: 6,
    turma: "turma " + s.turma,
    weekly: true,
    is_subject: true,
    is_submited: false,
    subject: null,
    notification: [],
    description: "",
    mean: "(p1+p2+p3)/3",
    frequency: "(aulasDadas - faltas)/aulasDadas",
    grade: {
      frequency: { aulasDadas: 1, faltas: 0 },
      mean: { p1: 0, p2: 0, p3: 0 },
    },
    teachers: [],
  };
}

const SIGA_URL = "https://sistemas.ufscar.br/sagui-api/siga/deferimento";

/** Resposta OK da API de deferimento do Sagui */
type SigaApiOk = {
  data: SigaSubject[],
}

/** Resposta de Erro da API de deferimento do Sagui */
type SigaApiError = {
  timestamp: number,
  status: number,
  error: string,
  message: string,
  path: string,
}

/** Resposta que o siga pode retornar pela API */
type SigaResponse = SigaApiOk | SigaApiError;

/** O motivo de erro que o Siga retornou */
export enum SigaErrorReason {
  /** O usuário não está autorizado ou suas credenciais são inválidas. */
  UNAUTHORIZED,

  /** Um erro desconhecido. */
  UNKNOWN,
}

/** Um erro do Siga, mapeado pelo planner */
export type SigaError = {
  ok: false,
  error: SigaErrorReason,
};

/** Um sucesso do Siga, incluindo as matérias do deferimento. */
export type SigaSuccess = {
  ok: true,
  subjects: SubjectDescription[],
}

export type SigaResult = SigaSuccess | SigaError;

/**
 * Obtém as matérias deferidas de um aluno pela API do Sagui.
 * @param user - O número UFSCar do aluno.
 * @param password - A senha do Siga do aluno.
 * @returns Um resultado do Siga contendo as matérias.
 */
export async function fetchSigaSubjects(
  user: string,
  password: string,
): Promise<SigaResult> {
  const encodedAuth = Buffer.from(user + ":" + password).toString("base64");
  const headers = {
    Authorization: "Basic " + encodedAuth,
    Accept: "application/json",
  };
  try {
    const response = await fetch(SIGA_URL, { headers });
    if (response.status == 200) {
      try {
        const sigaResponse = await response.json() as SigaResponse;
        if ("error" in sigaResponse) {
          if (sigaResponse.status == 401 || sigaResponse.status == 403) {
            return { ok: false, error: SigaErrorReason.UNAUTHORIZED };
          } else {
            return { ok: false, error: SigaErrorReason.UNKNOWN };
          }
        } else {
          const subjects: SubjectDescription[] = [];
          for (const subject of sigaResponse.data) {
            const mapped = mapSigaSubject(subject);
            if (mapped !== null) {
              subjects.push(mapped);
            }
          }
          return { ok: true, subjects };
        }
      } catch (_jsonError) {
        return { ok: false, error: SigaErrorReason.UNKNOWN };
      }
    } else if (response.status == 401 || response.status == 403) {
      return { ok: false, error: SigaErrorReason.UNAUTHORIZED };
    } else {
      return { ok: false, error: SigaErrorReason.UNKNOWN };
    }
  } catch (_) {
    return { ok: false, error: SigaErrorReason.UNKNOWN };
  }
}
