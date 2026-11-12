"use client";

import { createContext, useContext, useMemo, useState, useSyncExternalStore } from "react";
import { ArrowLeft, Clock, GraduationCap, User, X } from "lucide-react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { generateCourses, longDate, parseIsoDate, todayInMexico } from "@/lib/calendar";
import { SmartImage } from "@/components/media/SmartImage";
import { MorphingModal } from "@/components/vendor/beui/morphing-modal";
import { WhatsAppButton } from "@/components/whatsapp/WhatsAppButton";
import type { Course } from "@/types/content";

type ModalState =
  | { view: "course"; course: Course; from?: { iso: string; list: Course[] } }
  | { view: "day"; iso: string; list: Course[] }
  | null;

interface CoursesValue {
  /** null hasta montar en el cliente (el servidor pinta esqueletos). */
  today: string | null;
  courses: Course[];
  /** Cursos con fecha ≥ hoy, ordenados. */
  upcoming: Course[];
  openCourse: (course: Course) => void;
  /** Lista de cursos de un día (desde ahí se abre la ficha en el mismo panel). */
  openDay: (iso: string, list: Course[]) => void;
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
 * La ficha y la lista del día viven en un solo panel que se transforma
 * (MorphingModal de beUI): centrado en escritorio, desde abajo en móvil.
 */
export function CoursesProvider({ children }: { children: React.ReactNode }) {
  const today = useSyncExternalStore(noop, readToday, () => null);
  const [modal, setModal] = useState<ModalState>(null);
  const wide = useMediaQuery("(min-width: 768px)", true);

  const value = useMemo<CoursesValue>(() => {
    const courses = today ? generateCourses(today) : [];
    const upcoming = today ? courses.filter((c) => c.date >= today) : [];
    return {
      today,
      courses,
      upcoming,
      openCourse: (course) => setModal({ view: "course", course }),
      openDay: (iso, list) => setModal({ view: "day", iso, list }),
    };
  }, [today]);

  const close = () => setModal(null);
  const viewId = modal
    ? modal.view === "course"
      ? `curso-${modal.course.id}`
      : `dia-${modal.iso}`
    : null;

  return (
    <CoursesContext.Provider value={value}>
      {children}
      <MorphingModal
        viewId={viewId}
        onClose={close}
        placement={wide ? "center" : "bottom"}
        className="max-w-xl"
        labels={{ close: "Cerrar" }}
      >
        <div data-brand="black-pimienta">
          {modal?.view === "course" && (
            <CourseView
              course={modal.course}
              onClose={close}
              onBack={
                modal.from
                  ? () => setModal({ view: "day", iso: modal.from!.iso, list: modal.from!.list })
                  : undefined
              }
            />
          )}
          {modal?.view === "day" && (
            <DayView
              iso={modal.iso}
              list={modal.list}
              onClose={close}
              onPick={(course) =>
                setModal({ view: "course", course, from: { iso: modal.iso, list: modal.list } })
              }
            />
          )}
        </div>
      </MorphingModal>
    </CoursesContext.Provider>
  );
}

const levelLabel: Record<NonNullable<Course["level"]>, string> = {
  inicial: "Nivel inicial",
  intermedio: "Nivel intermedio",
  avanzado: "Nivel avanzado",
};

const roundBtn =
  "inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-ivory text-ink ring-1 ring-ink/10 transition-colors hover:bg-sand";

function ViewHeader({
  title,
  onClose,
  onBack,
}: {
  title: string;
  onClose: () => void;
  onBack?: () => void;
}) {
  return (
    <div className="flex items-start justify-between gap-3">
      <div className="flex items-start gap-3">
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            aria-label="Volver a los cursos del día"
            className={roundBtn}
          >
            <ArrowLeft aria-hidden className="size-4.5" />
          </button>
        )}
        <h2 className="pt-1 font-serif text-[1.75rem] leading-[1.1] font-light tracking-[-0.02em] [font-variation-settings:'SOFT'_100] first-letter:uppercase">
          {title}
        </h2>
      </div>
      <button type="button" onClick={onClose} aria-label="Cerrar" className={roundBtn}>
        <X aria-hidden className="size-4.5" />
      </button>
    </div>
  );
}

/** Ficha del curso con llamado a WhatsApp (mensaje con el nombre del curso). */
function CourseView({
  course,
  onClose,
  onBack,
}: {
  course: Course;
  onClose: () => void;
  onBack?: () => void;
}) {
  return (
    <div>
      <ViewHeader title={course.name} onClose={onClose} onBack={onBack} />
      <SmartImage
        slot={course.media}
        sizes="(min-width: 768px) 560px, 100vw"
        className="mt-5 aspect-[16/9] rounded-[1.25rem] bg-sand"
      />
      <div className="mt-5 flex flex-wrap gap-2">
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
      <p className="mt-5 font-serif text-[1.5rem] leading-tight font-light first-letter:uppercase">
        {longDate(course.date)}
      </p>
      <dl className="mt-4 grid grid-cols-3 gap-2">
        {[
          { icon: Clock, label: "Horario", value: `${course.startTime} a ${course.endTime} h` },
          { icon: GraduationCap, label: "Duración", value: course.durationLabel },
          { icon: User, label: "Instructor", value: course.instructor ?? "Por confirmar" },
        ].map(({ icon: Icon, label, value }) => (
          <div key={label} className="rounded-[1rem] bg-ivory p-3 ring-1 ring-ink/8">
            <dt className="flex items-center gap-1.5 text-small text-ink-muted">
              <Icon aria-hidden className="size-4" />
              {label}
            </dt>
            <dd className="mt-1 text-small font-semibold text-ink">{value}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-5 text-body text-ink-soft">{course.description}</p>
      <WhatsAppButton
        brand="black-pimienta"
        intent="course"
        item={course.name}
        size="lg"
        className="mt-6 w-full"
      >
        Solicitar información
      </WhatsAppButton>
    </div>
  );
}

/** Varios cursos en un día: elegir uno transforma el panel en su ficha. */
function DayView({
  iso,
  list,
  onClose,
  onPick,
}: {
  iso: string;
  list: Course[];
  onClose: () => void;
  onPick: (course: Course) => void;
}) {
  return (
    <div>
      <ViewHeader title={longDate(iso)} onClose={onClose} />
      <p className="mt-2 text-small text-ink-muted">{list.length} cursos este día</p>
      <ul className="mt-5 space-y-2">
        {list.map((c) => (
          <li key={c.id}>
            <button
              type="button"
              onClick={() => onPick(c)}
              className="group flex w-full items-center gap-4 rounded-[1.25rem] bg-ivory p-3 text-left ring-1 ring-ink/8 transition-colors hover:ring-accent-text"
            >
              <SmartImage
                slot={{ ...c.media, alt: "" }}
                sizes="64px"
                className="size-16 shrink-0 rounded-[0.875rem] bg-sand"
              />
              <span className="min-w-0 flex-1">
                <span className="block font-semibold text-ink">{c.name}</span>
                <span className="text-small text-ink-muted">
                  {c.startTime} a {c.endTime} h · {c.durationLabel}
                </span>
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
