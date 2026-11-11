"use client";

import { ArrowUpRight } from "lucide-react";
import { longDate, shortWeekday } from "@/lib/calendar";
import { RevealTitle } from "@/components/experience/RevealTitle";
import { Container } from "@/components/layout/Container";
import { SmartImage } from "@/components/media/SmartImage";
import { cn } from "@/lib/utils";
import { CourseCalendar } from "./CourseCalendar";
import { CoursesProvider, useCourses } from "./CoursesProvider";

const display = "font-serif font-light tracking-[-0.035em] [font-variation-settings:'SOFT'_100]";
const h2 = cn(display, "max-w-[18ch] text-[clamp(2.25rem,1.4rem+3.4vw,4.5rem)] leading-[1]");

/** Tres cursos destacados (fecha ≥ hoy). */
function FeaturedCourses() {
  const { today, upcoming, openCourse } = useCourses();
  // Tres destacados, prefiriendo fotos distintas entre sí.
  const pool = upcoming.filter((c) => c.featured);
  const featured = [
    ...pool.filter((c, i) => pool.findIndex((o) => o.media.id === c.media.id) === i),
    ...pool,
  ]
    .filter((c, i, arr) => arr.indexOf(c) === i)
    .slice(0, 3)
    .sort((x, y) => x.date.localeCompare(y.date));

  return (
    <ul className="mt-12 grid gap-4 md:mt-16 md:grid-cols-3">
      {(today ? featured : [0, 1, 2]).map((c) =>
        typeof c === "number" ? (
          <li key={c} className="aspect-[4/5] animate-pulse rounded-[1.75rem] bg-sand" />
        ) : (
          <li key={c.id}>
            <button
              type="button"
              onClick={() => openCourse(c)}
              className="group tone-ink relative isolate flex aspect-[4/5] w-full flex-col justify-end overflow-hidden rounded-[1.75rem] bg-ink p-6 text-left text-cream md:p-7"
            >
              <SmartImage
                slot={{ ...c.media, alt: "" }}
                sizes="(min-width: 768px) 30vw, 100vw"
                className="absolute inset-0 -z-20"
                imageClassName="transition-transform duration-[1.2s] ease-(--ease-editorial) group-hover:scale-[1.05]"
              />
              <span
                aria-hidden
                className="absolute inset-0 -z-10 bg-linear-to-t from-ink/90 via-ink/40 to-ink/5"
              />
              <span className="absolute top-5 left-5 inline-flex min-h-9 items-center rounded-full bg-ink/45 px-4 text-small font-semibold text-cream ring-1 ring-cream/20 backdrop-blur-md">
                Destacado
              </span>
              <span className="text-small font-semibold text-sand first-letter:uppercase">
                {longDate(c.date)}
              </span>
              <span
                className={cn(
                  display,
                  "mt-2 text-[clamp(1.75rem,1.4rem+1.4vw,2.5rem)] leading-[1.02]",
                )}
              >
                {c.name}
              </span>
              <span className="mt-3 flex items-center justify-between text-small text-sand">
                {c.startTime} a {c.endTime} h · {c.durationLabel}
                <span className="inline-flex size-10 items-center justify-center rounded-full bg-cream text-ink transition-transform duration-300 group-hover:-translate-y-0.5">
                  <ArrowUpRight aria-hidden className="size-4" />
                </span>
              </span>
            </button>
          </li>
        ),
      )}
    </ul>
  );
}

/** Los cinco cursos más próximos. */
function UpcomingCourses() {
  const { today, upcoming, openCourse } = useCourses();
  const next = upcoming.slice(0, 5);
  return (
    <ul className="border-t border-ink/15">
      {(today ? next : [0, 1, 2, 3, 4]).map((c) =>
        typeof c === "number" ? (
          <li key={c} className="h-20 animate-pulse border-b border-ink/15 bg-ivory" />
        ) : (
          <li key={c.id} className="border-b border-ink/15">
            <button
              type="button"
              onClick={() => openCourse(c)}
              className="group flex w-full items-center gap-5 py-5 text-left"
            >
              <span className="w-14 shrink-0 text-center">
                <span className="block text-small font-semibold text-ink-muted capitalize">
                  {shortWeekday(c.date)}
                </span>
                <span className={cn(display, "block text-[2.25rem] leading-none")}>
                  {Number(c.date.slice(8))}
                </span>
              </span>
              <span className="min-w-0 flex-1">
                <span
                  className={cn(
                    display,
                    "block text-[clamp(1.5rem,1.2rem+1.2vw,2.25rem)] leading-[1.05] transition-transform duration-500 group-hover:translate-x-2",
                  )}
                >
                  {c.name}
                </span>
                <span className="mt-1 block text-small text-ink-muted">
                  {c.startTime} a {c.endTime} h · {c.durationLabel}
                </span>
              </span>
              <ArrowUpRight aria-hidden className="size-5 shrink-0 text-accent-text" />
            </button>
          </li>
        ),
      )}
    </ul>
  );
}

/** Cursos de Black Pimienta: destacados, calendario mensual y próximos. */
export function CoursesSection() {
  return (
    <CoursesProvider>
      <section id="cursos" aria-labelledby="destacados-title" className="bg-ivory py-20 md:py-32">
        <Container>
          <RevealTitle id="destacados-title" className={h2}>
            Cursos destacados
          </RevealTitle>
          <p className="mt-5 max-w-[52ch] text-body text-ink-soft">
            Calendario de ejemplo con los temas de Black Pimienta. Las fechas reales se publicarán
            cuando el Gastro Lab comparta su programación.
          </p>
          <FeaturedCourses />
        </Container>
      </section>

      <section aria-labelledby="calendario-title" className="bg-surface-tint py-20 md:py-32">
        <Container>
          <RevealTitle id="calendario-title" className={h2}>
            Calendario
          </RevealTitle>
          <div className="mt-10 md:mt-14">
            <CourseCalendar />
          </div>
        </Container>
      </section>

      <section aria-labelledby="proximos-title" className="bg-ivory py-20 md:py-32">
        <Container className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-4">
            <RevealTitle id="proximos-title" className={cn(h2, "lg:sticky lg:top-28")}>
              Próximos cursos
            </RevealTitle>
          </div>
          <div className="lg:col-span-8">
            <UpcomingCourses />
          </div>
        </Container>
      </section>
    </CoursesProvider>
  );
}
