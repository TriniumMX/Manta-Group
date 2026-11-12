"use client";

import { useMemo, useRef, useState } from "react";
import { CalendarDays, ChevronLeft, ChevronRight, List } from "lucide-react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import {
  addMonths,
  daysInMonth,
  isoOf,
  longDate,
  MONTHS_AFTER,
  MONTHS_BEFORE,
  monthTitle,
  shortWeekday,
  WEEKDAYS,
  weekdayMondayFirst,
  ymFromIso,
  ymKey,
  type YearMonth,
} from "@/lib/calendar";
import { cn } from "@/lib/utils";
import { GlidePill } from "@/components/motion/GlidePill";
import type { Course } from "@/types/content";
import { useCourses } from "./CoursesProvider";

type View = "month" | "agenda";

const navBtn =
  "inline-flex size-12 items-center justify-center rounded-full border border-ink/15 bg-cream text-ink transition-colors hover:border-ink disabled:pointer-events-none disabled:opacity-35";

/**
 * Calendario mensual de cursos. Mes (≥ 768 px) o agenda (móvil por defecto).
 * Navegación limitada a los meses con datos; "Hoy" vuelve al mes de referencia.
 * Teclado en la vista mes: flechas entre días, Inicio/Fin de semana, Enter abre.
 */
export function CourseCalendar() {
  const { today, courses, openCourse, openDay: openDayList } = useCourses();
  const wide = useMediaQuery("(min-width: 768px)", true);
  const [viewChoice, setViewChoice] = useState<View | null>(null);
  const view: View = viewChoice ?? (wide ? "month" : "agenda");
  const [offset, setOffset] = useState(0);
  const [focusDay, setFocusDay] = useState<number | null>(null);
  const cells = useRef<Map<number, HTMLButtonElement>>(new Map());

  const ref = today ? ymFromIso(today) : null;
  const ym: YearMonth | null = ref ? addMonths(ref, offset) : null;

  const byDay = useMemo(() => {
    const map = new Map<string, Course[]>();
    if (!ym) return map;
    const prefix = ymKey(ym);
    for (const c of courses) {
      if (!c.date.startsWith(prefix)) continue;
      map.set(c.date, [...(map.get(c.date) ?? []), c]);
    }
    return map;
  }, [courses, ym]);

  if (!today || !ym) return <CalendarSkeleton />;

  const total = daysInMonth(ym);
  const lead = weekdayMondayFirst(ym.year, ym.month, 1);
  const todayDay = today.startsWith(ymKey(ym)) ? Number(today.slice(8)) : null;
  const activeDay = focusDay && focusDay <= total ? focusDay : (todayDay ?? 1);

  const go = (delta: number) => {
    setOffset((o) => Math.max(-MONTHS_BEFORE, Math.min(MONTHS_AFTER, o + delta)));
    setFocusDay(null);
  };

  const openDay = (iso: string) => {
    const list = byDay.get(iso) ?? [];
    if (list.length === 1) openCourse(list[0]);
    else if (list.length > 1) openDayList(iso, list);
  };

  const moveFocus = (day: number) => {
    const next = Math.max(1, Math.min(total, day));
    setFocusDay(next);
    requestAnimationFrame(() => cells.current.get(next)?.focus());
  };

  const onGridKey = (e: React.KeyboardEvent, day: number) => {
    const w = weekdayMondayFirst(ym.year, ym.month, day);
    const keys: Record<string, number> = {
      ArrowRight: day + 1,
      ArrowLeft: day - 1,
      ArrowDown: day + 7,
      ArrowUp: day - 7,
      Home: day - w,
      End: day + (6 - w),
    };
    if (e.key in keys) {
      e.preventDefault();
      moveFocus(keys[e.key]);
    }
  };

  const weeks = Math.ceil((lead + total) / 7);
  const agendaDays = [...byDay.keys()].sort();

  return (
    <div className="rounded-[1.75rem] bg-cream p-4 ring-1 ring-ink/8 md:rounded-[2.25rem] md:p-8">
      {/* Encabezado */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => go(-1)}
            disabled={offset <= -MONTHS_BEFORE}
            aria-label="Mes anterior"
            className={navBtn}
          >
            <ChevronLeft aria-hidden className="size-5" />
          </button>
          <h3
            aria-live="polite"
            className="min-w-[11ch] text-center font-serif text-[clamp(1.625rem,1.3rem+1.3vw,2.375rem)] leading-none font-light tracking-[-0.02em]"
          >
            {monthTitle(ym)}
          </h3>
          <button
            type="button"
            onClick={() => go(1)}
            disabled={offset >= MONTHS_AFTER}
            aria-label="Mes siguiente"
            className={navBtn}
          >
            <ChevronRight aria-hidden className="size-5" />
          </button>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              setOffset(0);
              setFocusDay(null);
            }}
            disabled={offset === 0}
            className="inline-flex min-h-12 items-center rounded-full border border-ink/15 px-5 text-small font-semibold transition-colors hover:border-ink disabled:opacity-40"
          >
            Hoy
          </button>
          <div
            role="group"
            aria-label="Vista"
            className="inline-flex rounded-full bg-ivory p-1 ring-1 ring-ink/8"
          >
            {(
              [
                ["month", "Mes", CalendarDays],
                ["agenda", "Agenda", List],
              ] as const
            ).map(([v, label, Icon]) => (
              <button
                key={v}
                type="button"
                aria-pressed={view === v}
                onClick={() => setViewChoice(v)}
                className={cn(
                  "relative isolate inline-flex min-h-10 items-center gap-2 rounded-full px-4 text-small font-semibold transition-colors",
                  view === v ? "text-cream" : "text-ink-soft hover:text-ink",
                )}
              >
                {view === v && <GlidePill layoutId="calendar-view" className="bg-accent-text" />}
                <Icon aria-hidden className="size-4" />
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {view === "month" ? (
        <div role="grid" aria-label={`Cursos de ${monthTitle(ym)}`} className="mt-8">
          <div role="row" className="grid grid-cols-7 gap-1 md:gap-2">
            {WEEKDAYS.map((d) => (
              <div
                key={d}
                role="columnheader"
                className="pb-2 text-center text-small font-semibold text-ink-muted"
              >
                {d}
              </div>
            ))}
          </div>
          {Array.from({ length: weeks }, (_, w) => (
            <div key={w} role="row" className="grid grid-cols-7 gap-1 md:gap-2">
              {Array.from({ length: 7 }, (_, d) => {
                const day = w * 7 + d - lead + 1;
                if (day < 1 || day > total) {
                  return (
                    <div key={d} role="gridcell" aria-hidden className="min-h-24 md:min-h-32" />
                  );
                }
                const iso = isoOf(ym.year, ym.month, day);
                const list = byDay.get(iso) ?? [];
                const isToday = day === todayDay;
                const past = iso < today;
                return (
                  <div key={d} role="gridcell" className="min-h-24 md:min-h-32">
                    <button
                      ref={(el) => {
                        if (el) cells.current.set(day, el);
                        else cells.current.delete(day);
                      }}
                      type="button"
                      tabIndex={day === activeDay ? 0 : -1}
                      onFocus={() => setFocusDay(day)}
                      onKeyDown={(e) => onGridKey(e, day)}
                      onClick={() => openDay(iso)}
                      aria-label={`${longDate(iso)}: ${
                        list.length === 0
                          ? "sin cursos programados"
                          : list.length === 1
                            ? `1 curso, ${list[0].name}`
                            : `${list.length} cursos`
                      }${isToday ? " (hoy)" : ""}`}
                      className={cn(
                        "group flex h-full w-full flex-col items-stretch gap-1.5 rounded-[1rem] p-1.5 text-left transition-colors md:p-2",
                        list.length ? "bg-ivory hover:bg-accent-soft" : "cursor-default",
                        past && "opacity-60",
                      )}
                    >
                      <span
                        className={cn(
                          "inline-flex size-8 items-center justify-center self-start rounded-full text-small font-semibold",
                          isToday ? "bg-accent-text text-cream" : "text-ink",
                        )}
                      >
                        {day}
                      </span>
                      {list.slice(0, 2).map((c) => (
                        <span
                          key={c.id}
                          aria-hidden
                          className="hidden truncate rounded-full bg-cream px-2.5 py-1 text-small font-semibold text-ink ring-1 ring-ink/8 lg:block"
                        >
                          <span className="text-accent-text">{c.startTime}</span> {c.name}
                        </span>
                      ))}
                      {list.length > 0 && (
                        <span aria-hidden className="flex gap-1 pl-1 lg:hidden">
                          {list.map((c) => (
                            <span key={c.id} className="size-2 rounded-full bg-accent" />
                          ))}
                        </span>
                      )}
                      {list.length > 2 && (
                        <span
                          aria-hidden
                          className="hidden pl-1 text-small font-semibold text-accent-text lg:block"
                        >
                          +{list.length - 2}
                        </span>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      ) : (
        <ol className="mt-8 space-y-3" aria-label={`Agenda de ${monthTitle(ym)}`}>
          {agendaDays.length === 0 && (
            <li className="text-body text-ink-soft">Sin cursos programados este mes.</li>
          )}
          {agendaDays.map((iso) => {
            const isToday = iso === today;
            return (
              <li
                key={iso}
                className={cn(
                  "flex gap-4 rounded-[1.25rem] p-3 md:gap-6",
                  isToday ? "bg-accent-soft" : "bg-ivory",
                  iso < today && "opacity-60",
                )}
              >
                <div className="w-14 shrink-0 text-center">
                  <p className="text-small font-semibold text-ink-muted capitalize">
                    {shortWeekday(iso)}
                  </p>
                  <p className="font-serif text-[2rem] leading-none font-light">
                    {Number(iso.slice(8))}
                  </p>
                  {isToday && <p className="mt-1 text-small font-semibold text-accent-text">Hoy</p>}
                </div>
                <ul className="flex min-w-0 flex-1 flex-col gap-2">
                  {(byDay.get(iso) ?? []).map((c) => (
                    <li key={c.id}>
                      <button
                        type="button"
                        onClick={() => openCourse(c)}
                        className="flex w-full flex-col items-start rounded-[1rem] bg-cream px-4 py-3 text-left ring-1 ring-ink/8 transition-colors hover:ring-accent-text"
                      >
                        <span className="font-semibold text-ink">{c.name}</span>
                        <span className="text-small text-ink-muted">
                          {c.startTime} a {c.endTime} h · {c.durationLabel}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ol>
      )}
    </div>
  );
}

function CalendarSkeleton() {
  return (
    <div
      aria-busy
      className="rounded-[1.75rem] bg-cream p-4 ring-1 ring-ink/8 md:rounded-[2.25rem] md:p-8"
    >
      <span className="sr-only">Cargando calendario…</span>
      <div className="h-12 w-64 animate-pulse rounded-full bg-sand" />
      <div className="mt-8 grid grid-cols-7 gap-2">
        {Array.from({ length: 35 }, (_, i) => (
          <div key={i} className="h-24 animate-pulse rounded-[1rem] bg-ivory md:h-32" />
        ))}
      </div>
    </div>
  );
}
