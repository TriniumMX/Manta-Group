"use client";

import Link from "next/link";
import { ArrowUpRight, History } from "lucide-react";
import { longDate, todayInMexico } from "@/lib/calendar";
import { cn } from "@/lib/utils";
import { useAdmin } from "./AdminProvider";
import { ADMIN_MODULES, moduleHref } from "./config";
import { PageTitle, Pill } from "./AdminUI";
import { AnimatedFigure } from "@/components/motion/AnimatedFigure";

/** Dashboard: contadores, accesos, próximos cursos y últimos cambios simulados. */
export function Dashboard() {
  const { state } = useAdmin();
  const d = state.data;
  const today = todayInMexico();

  const counts: Record<string, { total: number; visible?: number }> = {
    marcas: { total: d.marcas.length, visible: d.marcas.filter((r) => r.visible).length },
    productos: { total: d.productos.length, visible: d.productos.filter((r) => r.visible).length },
    menus: { total: d.menus.length },
    servicios: { total: d.servicios.length, visible: d.servicios.filter((r) => r.visible).length },
    cursos: { total: d.cursos.length, visible: d.cursos.filter((r) => r.visible).length },
    galerias: { total: d.galerias.length },
    contacto: { total: d.contacto.length },
  };

  const upcoming = d.cursos
    .filter((c) => c.visible && String(c.date) >= today)
    .sort((a, b) => String(a.date).localeCompare(String(b.date)))
    .slice(0, 5);

  return (
    <>
      <PageTitle
        title="Resumen"
        description={`Resumen del contenido del sitio · ${longDate(today)}`}
      />

      <ul className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4 xl:grid-cols-7">
        {ADMIN_MODULES.map(({ id, label, icon: Icon }, i) => (
          <li key={id}>
            <Link
              href={moduleHref(id)}
              className={cn(
                "group flex h-full flex-col justify-between gap-6 rounded-[1.5rem] p-5 ring-1 transition-transform duration-300 hover:-translate-y-0.5",
                i === 0 ? "tone-ink bg-ink text-cream ring-ink" : "bg-cream text-ink ring-ink/8",
              )}
            >
              <span className="flex items-center justify-between">
                <Icon
                  aria-hidden
                  className={cn("size-5", i === 0 ? "text-sand" : "text-ink-muted")}
                  strokeWidth={1.75}
                />
                <ArrowUpRight
                  aria-hidden
                  className="size-4 opacity-0 transition-opacity group-hover:opacity-100"
                />
              </span>
              <span>
                <span className="block font-serif text-[2.75rem] leading-none font-light tabular-nums">
                  <AnimatedFigure text={String(counts[id].total)} />
                </span>
                <span
                  className={cn(
                    "mt-2 block text-small font-semibold",
                    i === 0 ? "text-sand" : "text-ink-soft",
                  )}
                >
                  {label}
                </span>
                {counts[id].visible !== undefined && (
                  <span
                    className={cn("block text-small", i === 0 ? "text-stone" : "text-ink-muted")}
                  >
                    {counts[id].visible} visibles
                  </span>
                )}
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <section
          aria-labelledby="dash-cursos"
          className="rounded-[1.5rem] bg-cream p-6 ring-1 ring-ink/8 md:p-8"
        >
          <div className="flex items-center justify-between">
            <h2 id="dash-cursos" className="font-serif text-[1.75rem] leading-none font-light">
              Próximos cursos
            </h2>
            <Link
              href={moduleHref("cursos")}
              className="text-small font-semibold text-ink-soft underline-offset-4 hover:text-ink hover:underline"
            >
              Ver todos
            </Link>
          </div>
          <ul className="mt-6 divide-y divide-ink/8">
            {upcoming.length === 0 && (
              <li className="py-3 text-small text-ink-muted">No hay cursos próximos este mes.</li>
            )}
            {upcoming.map((c) => (
              <li key={c.id} className="flex items-center justify-between gap-4 py-3">
                <span>
                  <span className="block font-semibold">{String(c.name)}</span>
                  <span className="text-small text-ink-muted first-letter:uppercase">
                    {longDate(String(c.date))} · {String(c.startTime)} h
                  </span>
                </span>
                {c.badge && <Pill tone="accent">{c.badge === "nuevo" ? "Nuevo" : "Editado"}</Pill>}
              </li>
            ))}
          </ul>
        </section>

        <section
          aria-labelledby="dash-log"
          className="rounded-[1.5rem] bg-cream p-6 ring-1 ring-ink/8 md:p-8"
        >
          <h2 id="dash-log" className="font-serif text-[1.75rem] leading-none font-light">
            Últimos cambios simulados
          </h2>
          {state.log.length === 0 ? (
            <div className="mt-6 flex flex-col items-start gap-3 rounded-[1rem] bg-ivory p-5">
              <History aria-hidden className="size-5 text-ink-muted" />
              <p className="text-small text-ink-soft">
                Aún no hay cambios. Edita un producto, oculta un curso o reemplaza una imagen: aquí
                verás el registro.
              </p>
            </div>
          ) : (
            <ol className="mt-6 space-y-2">
              {state.log.map((e) => (
                <li
                  key={e.id}
                  className="flex animate-toast-in items-center justify-between gap-4 rounded-[1rem] bg-ivory px-4 py-3"
                >
                  <span className="text-small text-ink">{e.text}</span>
                  <span className="shrink-0 text-small text-ink-muted tabular-nums">{e.at}</span>
                </li>
              ))}
            </ol>
          )}
        </section>
      </div>
    </>
  );
}
