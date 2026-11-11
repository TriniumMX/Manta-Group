"use client";

import { createContext, useContext, useMemo, useState, useSyncExternalStore } from "react";
import { Clock, GraduationCap, User } from "lucide-react";
import { generateCourses, longDate, parseIsoDate, todayInMexico } from "@/lib/calendar";
import { SmartImage } from "@/components/media/SmartImage";
import { Dialog } from "@/components/ui/Dialog";
import { WhatsAppButton } from "@/components/whatsapp/WhatsAppButton";
import type { Course } from "@/types/content";

interface CoursesValue {
  /** null hasta montar en el cliente (el servidor pinta esqueletos). */
  today: string | null;
  courses: Course[];
  /** Cursos con fecha ≥ hoy, ordenados. */
  upcoming: Course[];
  openCourse: (course: Course) => void;
}

const CoursesContext = createContext<CoursesValue | null>(null);

export function useCourses() {
  const ctx = useContext(CoursesContext);
  if (!ctx) throw new Error("useCourses debe usarse dentro de <CoursesProvider>");
  return ctx;
}

const noop = () => () => {};

/** Lee "hoy": `?hoy=yyyy-mm-dd` (herramienta de prueba) o la fecha en CDMX. */
function readToday() {
  const param = new URLSearchParams(window.location.search).get("hoy");
  return parseIsoDate(param) ?? todayInMexico();
}

/**
 * Origen único de los cursos para destacados, calendario y próximos. "Hoy" se
 * calcula después de montar, así los datos nunca quedan congelados en el build.
 */
export function CoursesProvider({ children }: { children: React.ReactNode }) {
  const today = useSyncExternalStore(noop, readToday, () => null);
  const [selected, setSelected] = useState<Course | null>(null);

  const value = useMemo<CoursesValue>(() => {
    const courses = today ? generateCourses(today) : [];
    const upcoming = today ? courses.filter((c) => c.date >= today) : [];
    return { today, courses, upcoming, openCourse: setSelected };
  }, [today]);

  return (
    <CoursesContext.Provider value={value}>
      {children}
      <CourseDialog course={selected} onClose={() => setSelected(null)} />
    </CoursesContext.Provider>
  );
}

const levelLabel: Record<NonNullable<Course["level"]>, string> = {
  inicial: "Nivel inicial",
  intermedio: "Nivel intermedio",
  avanzado: "Nivel avanzado",
};

/** Ficha del curso con llamado a WhatsApp (mensaje con el nombre del curso). */
function CourseDialog({ course, onClose }: { course: Course | null; onClose: () => void }) {
  return (
    <Dialog
      open={course !== null}
      onClose={onClose}
      title={course?.name ?? "Curso"}
      size="full-mobile"
      footer={
        course && (
          <WhatsAppButton
            brand="black-pimienta"
            intent="course"
            item={course.name}
            size="lg"
            className="w-full sm:w-auto"
          >
            Solicitar información
          </WhatsAppButton>
        )
      }
    >
      {course && (
        <div data-brand="black-pimienta">
          <SmartImage
            slot={course.media}
            sizes="(min-width: 768px) 720px, 100vw"
            className="aspect-[16/9] rounded-[1.25rem] bg-sand"
          />
          <div className="mt-6 flex flex-wrap gap-2">
            {course.topic && (
              <span className="inline-flex min-h-9 items-center rounded-full bg-accent-soft px-4 text-small font-semibold text-accent-text">
                {course.topic}
              </span>
            )}
            {course.level && (
              <span className="inline-flex min-h-9 items-center rounded-full bg-ivory px-4 text-small font-semibold text-ink-soft ring-1 ring-ink/10">
                {levelLabel[course.level]}
              </span>
            )}
            <span className="inline-flex min-h-9 items-center rounded-full bg-ivory px-4 text-small font-semibold text-ink-soft ring-1 ring-ink/10">
              Fecha y curso de ejemplo
            </span>
          </div>
          <p className="mt-6 font-serif text-[1.75rem] leading-tight font-light first-letter:uppercase">
            {longDate(course.date)}
          </p>
          <dl className="mt-5 grid gap-4 sm:grid-cols-3">
            {[
              { icon: Clock, label: "Horario", value: `${course.startTime} a ${course.endTime} h` },
              { icon: GraduationCap, label: "Duración", value: course.durationLabel },
              { icon: User, label: "Instructor", value: course.instructor ?? "Por confirmar" },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="rounded-[1rem] bg-ivory p-4 ring-1 ring-ink/8">
                <dt className="flex items-center gap-2 text-small text-ink-muted">
                  <Icon aria-hidden className="size-4" />
                  {label}
                </dt>
                <dd className="mt-1 font-semibold text-ink">{value}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-6 text-body text-ink-soft">{course.description}</p>
        </div>
      )}
    </Dialog>
  );
}
