// Calendario demo de Black Pimienta (PLAN_MG §7.6).
//
// - "Hoy" se calcula en America/Mexico_City, nunca con la zona del navegador.
// - Cada mes se genera con una semilla "yyyy-mm": el mismo mes muestra siempre
//   los mismos cursos, sin importar el día en que se consulte.
// - Se generan cinco meses (referencia −2 … +2); son los únicos navegables.
// - Temas tomados de MantaGroup2026.pdf. Nombres, horarios y fechas son DEMO.
import type { Course, MediaSlot } from "@/types/content";

export const TIME_ZONE = "America/Mexico_City";
export const MONTHS_BEFORE = 2;
export const MONTHS_AFTER = 2;

/** Fecha ISO yyyy-mm-dd de "hoy" en Ciudad de México. */
export function todayInMexico(now = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);
}

/** Valida un parámetro `?hoy=yyyy-mm-dd`; devuelve null si no es una fecha real. */
export function parseIsoDate(value: string | null | undefined): string | null {
  if (!value || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
  const [y, m, d] = value.split("-").map(Number);
  const date = new Date(Date.UTC(y, m - 1, d));
  return date.getUTCFullYear() === y && date.getUTCMonth() === m - 1 && date.getUTCDate() === d
    ? value
    : null;
}

export interface YearMonth {
  year: number;
  /** 0–11 */
  month: number;
}

export const ymKey = ({ year, month }: YearMonth) =>
  `${year}-${String(month + 1).padStart(2, "0")}`;

export function addMonths({ year, month }: YearMonth, delta: number): YearMonth {
  const total = year * 12 + month + delta;
  return { year: Math.floor(total / 12), month: ((total % 12) + 12) % 12 };
}

export function ymFromIso(iso: string): YearMonth {
  const [y, m] = iso.split("-").map(Number);
  return { year: y, month: m - 1 };
}

export const daysInMonth = ({ year, month }: YearMonth) =>
  new Date(Date.UTC(year, month + 1, 0)).getUTCDate();

/** Día de la semana con lunes = 0. */
export function weekdayMondayFirst(year: number, month: number, day: number) {
  return (new Date(Date.UTC(year, month, day)).getUTCDay() + 6) % 7;
}

export const isoOf = (year: number, month: number, day: number) =>
  `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

/* ---------- Generador determinista ---------- */

function hash(text: string) {
  let h = 2166136261;
  for (let i = 0; i < text.length; i++) {
    h ^= text.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/** PRNG mulberry32. */
function rng(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const MEDIA: MediaSlot[] = [
  { id: "black-pimienta.g1", alt: "Pastel con glaseado espejo y frutos rojos" },
  { id: "black-pimienta.g2", alt: "Galletas decoradas con mermelada" },
  { id: "black-pimienta.g3", alt: "Alumna extendiendo masa con rodillo" },
];

interface Template {
  topic: string;
  name: string;
  description: string;
  hours: number;
  media: number;
  level: NonNullable<Course["level"]>;
}

/** Plantillas por tema (temas del PDF; nombres de ejemplo). */
const TEMPLATES: Template[] = [
  {
    topic: "Cocina internacional",
    name: "Cocina internacional",
    description: "Platillos de distintas cocinas del mundo, paso a paso y con técnicas eficientes.",
    hours: 3,
    media: 2,
    level: "inicial",
  },
  {
    topic: "Repostería",
    name: "Repostería",
    description: "Masas, cremas y montajes para postres que se ven tan bien como saben.",
    hours: 3,
    media: 0,
    level: "inicial",
  },
  {
    topic: "Pastelería",
    name: "Pasteles",
    description: "Bizcochos, rellenos y acabados para preparar un pastel completo.",
    hours: 4,
    media: 0,
    level: "intermedio",
  },
  {
    topic: "Panadería",
    name: "Pan artesanal",
    description: "Amasado, fermentación y horneado de pan hecho en casa.",
    hours: 4,
    media: 2,
    level: "inicial",
  },
  {
    topic: "Bebidas",
    name: "Barismo",
    description: "Métodos de extracción y bebidas a base de café.",
    hours: 2,
    media: 2,
    level: "inicial",
  },
  {
    topic: "Bebidas",
    name: "Coctelería",
    description: "Técnicas básicas de coctelería y combinaciones clásicas.",
    hours: 2,
    media: 2,
    level: "inicial",
  },
  {
    topic: "Para niños",
    name: "Cocina para niños",
    description: "Recetas sencillas para que los pequeños cocinen con la guía de un chef.",
    hours: 2,
    media: 1,
    level: "inicial",
  },
  {
    topic: "Decoración",
    name: "Decoración de galletas",
    description: "Glaseado, color y detalles para galletas de temporada.",
    hours: 2,
    media: 1,
    level: "inicial",
  },
  {
    topic: "Otros temas",
    name: "Cocina vegana",
    description: "Recetas sin ingredientes de origen animal, llenas de sabor.",
    hours: 3,
    media: 2,
    level: "intermedio",
  },
  {
    topic: "Otros temas",
    name: "Cocina sin gluten",
    description: "Alternativas y técnicas para cocinar sin gluten.",
    hours: 3,
    media: 2,
    level: "intermedio",
  },
  {
    topic: "Otros temas",
    name: "Tés y tisanas",
    description: "Infusiones, mezclas y maridajes para disfrutar en casa.",
    hours: 2,
    media: 1,
    level: "inicial",
  },
  {
    topic: "Repostería",
    name: "Repostería avanzada",
    description: "Técnicas finas de montaje y glaseados de espejo.",
    hours: 4,
    media: 0,
    level: "avanzado",
  },
];

const START_TIMES = ["10:00", "11:00", "16:00", "17:00", "18:00"];

function addHours(start: string, hours: number) {
  const [h, m] = start.split(":").map(Number);
  return `${String(h + hours).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

/** Cursos de un mes (13–16), siempre con alguno en los primeros y últimos días. */
export function generateMonth(ym: YearMonth): Course[] {
  const key = ymKey(ym);
  const random = rng(hash(key));
  const total = daysInMonth(ym);
  const count = 13 + Math.floor(random() * 4);

  // Días candidatos: de martes a sábado (lunes = 0 … domingo = 6).
  const candidates = Array.from({ length: total }, (_, i) => i + 1).filter((d) => {
    const w = weekdayMondayFirst(ym.year, ym.month, d);
    return w >= 1 && w <= 5;
  });
  const days = new Set<number>([candidates[0], candidates[candidates.length - 1]]);
  while (days.size < Math.min(count, candidates.length)) {
    days.add(candidates[Math.floor(random() * candidates.length)]);
  }

  const courses: Course[] = [];
  [...days]
    .sort((a, b) => a - b)
    .forEach((day, i) => {
      // Algunos días tienen dos cursos (mañana y tarde).
      const sessions = random() < 0.22 ? 2 : 1;
      for (let s = 0; s < sessions; s++) {
        const t = TEMPLATES[Math.floor(random() * TEMPLATES.length)];
        const start =
          s === 0
            ? START_TIMES[Math.floor(random() * 2)]
            : START_TIMES[2 + Math.floor(random() * 3)];
        courses.push({
          id: `${key}-${day}-${s}`,
          brand: "black-pimienta",
          name: t.name,
          topic: t.topic,
          description: t.description,
          media: MEDIA[t.media],
          date: isoOf(ym.year, ym.month, day),
          startTime: start,
          endTime: addHours(start, t.hours),
          durationLabel: `${t.hours} horas`,
          level: t.level,
          featured: i % 4 === 1 && s === 0,
          isDemo: true,
        });
      }
    });
  return courses;
}

/** Todos los cursos del rango navegable, ordenados por fecha y hora. */
export function generateCourses(referenceIso: string): Course[] {
  const ref = ymFromIso(referenceIso);
  const all: Course[] = [];
  for (let d = -MONTHS_BEFORE; d <= MONTHS_AFTER; d++)
    all.push(...generateMonth(addMonths(ref, d)));
  return all.sort((a, b) =>
    a.date === b.date ? a.startTime.localeCompare(b.startTime) : a.date.localeCompare(b.date),
  );
}

/* ---------- Formato en español ---------- */

const fmt = (opts: Intl.DateTimeFormatOptions) =>
  new Intl.DateTimeFormat("es-MX", { timeZone: "UTC", ...opts });

const dateOf = (iso: string) => {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d));
};

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

/** "martes 12 de noviembre de 2026" */
export const longDate = (iso: string) =>
  fmt({ weekday: "long", day: "numeric", month: "long", year: "numeric" }).format(dateOf(iso));

/** "mar 12" */
export const shortWeekday = (iso: string) =>
  fmt({ weekday: "short" }).format(dateOf(iso)).replace(".", "");

/** "Noviembre 2026" */
export const monthTitle = ({ year, month }: YearMonth) =>
  cap(fmt({ month: "long", year: "numeric" }).format(new Date(Date.UTC(year, month, 1))));

export const WEEKDAYS = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];
