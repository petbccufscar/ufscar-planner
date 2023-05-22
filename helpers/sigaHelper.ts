enum WeekdaySiga {
  DOMINGO = "DOMINGO",
  SEGUNDA = "SEGUNDA",
  TERCA = "TERCA",
  QUARTA = "QUARTA",
  QUINTA = "QUINTA",
  SEXTA = "SEXTA",
  SABADO = "SABADO",
}

type SigaHorario = {
  inicio: string,
  fim: string,
  sala: string,
  dia: WeekdaySiga,
};

export type SigaSubject = {
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

export function processSigaSubject(s: SigaSubject): SigaSubject | null {
  if (typeof s.atividade !== "string") {
    return null;
  }

  if (typeof s.turma !== "string") {
    s.turma = "";
  }

  if (!Array.isArray(s.horarios)) {
    s.horarios = [];
  }

  for (const horario of s.horarios) {
    if (typeof horario.inicio !== "string" || typeof horario.fim !== "string") {
      horario.inicio = "0:00 am";
      horario.fim = "0:01 am";
    }

    if (parseTime(horario.inicio) === null || parseTime(horario.fim) === null) {
      horario.inicio = "0:00 am";
      horario.fim = "0:01 am";
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
  }

  return s;
}
