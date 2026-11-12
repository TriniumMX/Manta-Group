"use client";

import { useState } from "react";
import { ArrowDown, ArrowUp, CalendarDays, Pencil, Plus, Trash2 } from "lucide-react";
import type { AdminRow, MenuItemRow, MenuRow, MenuSectionRow } from "@/content/admin/seed";
import { Button } from "@/components/ui/Button";
import { Dialog } from "@/components/ui/Dialog";
import { cn } from "@/lib/utils";
import { GlidePill } from "@/components/motion/GlidePill";
import { useAdmin } from "./AdminProvider";
import { EditDrawer, PageTitle, Pill, type FieldDef } from "./AdminUI";
import { getModule } from "./config";

const id = (p: string) =>
  `${p}-${Date.now().toString(36)}${Math.random().toString(36).slice(2, 5)}`;

function move<T>(list: T[], i: number, dir: -1 | 1) {
  const j = i + dir;
  if (j < 0 || j >= list.length) return list;
  const next = [...list];
  [next[i], next[j]] = [next[j], next[i]];
  return next;
}

const iconBtn =
  "inline-flex size-9 items-center justify-center rounded-full text-ink-soft transition-colors hover:bg-ink/6 hover:text-ink disabled:opacity-30 disabled:hover:bg-transparent";

const DISH_FIELDS: FieldDef[] = [
  { name: "name", label: "Nombre del platillo" },
  { name: "description", label: "Descripción", type: "textarea", hint: "Opcional." },
];
const SECTION_FIELDS: FieldDef[] = [{ name: "name", label: "Nombre de la sección" }];
const THEME_FIELDS: FieldDef[] = [
  { name: "title", label: "Tema", hint: "Personaje histórico, artista o festividad." },
  { name: "month", label: "Mes" },
  { name: "blurb", label: "Descripción", type: "textarea" },
];

type Editing =
  | { kind: "dish"; sectionId: string; row: AdminRow; isNew: boolean }
  | { kind: "section"; row: AdminRow; isNew: boolean }
  | { kind: "theme"; row: AdminRow };

type Deleting =
  | { kind: "dish"; sectionId: string; item: MenuItemRow }
  | { kind: "section"; section: MenuSectionRow };

const asRow = (fields: Record<string, string | boolean | null>, rowId: string): AdminRow => ({
  id: rowId,
  visible: true,
  badge: null,
  ...fields,
});

/**
 * Editor de menús de Hoja Santa: carta de la casa y menú temático del mes.
 * Agregar, editar, eliminar y reordenar platillos y secciones. Todo es simulado
 * y se pierde al recargar (no afecta al sitio público).
 */
export function MenusView() {
  const meta = getModule("menus")!;
  const { state, setMenus } = useAdmin();
  const [active, setActive] = useState(state.data.menus[0]?.id);
  const [editing, setEditing] = useState<Editing | null>(null);
  const [deleting, setDeleting] = useState<Deleting | null>(null);

  const menu = state.data.menus.find((m) => m.id === active) ?? state.data.menus[0];
  if (!menu) return null;

  const apply = (next: MenuRow, label: string) =>
    setMenus(
      state.data.menus.map((m) => (m.id === next.id ? next : m)),
      label,
    );

  const mapSection = (sectionId: string, fn: (s: MenuSectionRow) => MenuSectionRow) =>
    menu.sections.map((s) => (s.id === sectionId ? fn(s) : s));

  const saveEditing = (row: AdminRow) => {
    if (!editing) return;
    const name = String(row.name ?? "").trim();
    if (editing.kind === "theme") {
      apply(
        {
          ...menu,
          theme: {
            title: String(row.title ?? "").trim(),
            month: String(row.month ?? "").trim(),
            blurb: String(row.blurb ?? "").trim(),
          },
        },
        `Tema del menú actualizado${row.title ? `: ${String(row.title).trim()}` : ""}`,
      );
    } else if (editing.kind === "section") {
      if (editing.isNew) {
        apply(
          {
            ...menu,
            sections: [
              ...menu.sections,
              { id: String(row.id), name: name || "Sección nueva", items: [], badge: "nuevo" },
            ],
          },
          `Sección agregada: ${name || "Sección nueva"}`,
        );
      } else {
        apply(
          {
            ...menu,
            sections: menu.sections.map((s) =>
              s.id === row.id
                ? { ...s, name: name || s.name, badge: s.badge === "nuevo" ? "nuevo" : "editado" }
                : s,
            ),
          },
          `Sección renombrada: ${name}`,
        );
      }
    } else {
      const dish: MenuItemRow = {
        id: String(row.id),
        name: name || "Platillo nuevo",
        description: String(row.description ?? "").trim(),
        badge: "nuevo",
      };
      if (editing.isNew) {
        apply(
          {
            ...menu,
            sections: mapSection(editing.sectionId, (s) => ({ ...s, items: [...s.items, dish] })),
          },
          `Platillo agregado: ${dish.name}`,
        );
      } else {
        apply(
          {
            ...menu,
            sections: mapSection(editing.sectionId, (s) => ({
              ...s,
              items: s.items.map((it) =>
                it.id === row.id
                  ? {
                      ...it,
                      name: dish.name,
                      description: dish.description,
                      badge: it.badge === "nuevo" ? "nuevo" : "editado",
                    }
                  : it,
              ),
            })),
          },
          `Platillo editado: ${dish.name}`,
        );
      }
    }
    setEditing(null);
  };

  const confirmDelete = () => {
    if (!deleting) return;
    if (deleting.kind === "dish") {
      apply(
        {
          ...menu,
          sections: mapSection(deleting.sectionId, (s) => ({
            ...s,
            items: s.items.filter((it) => it.id !== deleting.item.id),
          })),
        },
        `Platillo eliminado: ${deleting.item.name}`,
      );
    } else {
      apply(
        { ...menu, sections: menu.sections.filter((s) => s.id !== deleting.section.id) },
        `Sección eliminada: ${deleting.section.name}`,
      );
    }
    setDeleting(null);
  };

  const totalDishes = menu.sections.reduce((n, s) => n + s.items.length, 0);
  const themed = menu.theme !== undefined;
  const theme = menu.theme;
  const themeEmpty = !theme?.title && !theme?.month && !theme?.blurb;

  return (
    <>
      <PageTitle
        title={meta.label}
        description="Carta de la casa y menú temático del mes de Hoja Santa."
        actions={
          <Button
            iconLeft={Plus}
            onClick={() =>
              setEditing({ kind: "section", row: asRow({ name: "" }, id("sec")), isNew: true })
            }
          >
            Nueva sección
          </Button>
        }
      />

      <div
        role="tablist"
        aria-label="Menús"
        className="mt-8 inline-flex rounded-full bg-cream p-1.5 ring-1 ring-ink/8"
      >
        {state.data.menus.map((m) => (
          <button
            key={m.id}
            role="tab"
            type="button"
            aria-selected={m.id === menu.id}
            onClick={() => setActive(m.id)}
            className={cn(
              "relative isolate min-h-10 rounded-full px-5 text-small font-semibold transition-colors",
              m.id === menu.id ? "text-cream" : "text-ink-soft hover:text-ink",
            )}
          >
            {m.id === menu.id && <GlidePill layoutId="admin-menu-tab" className="bg-ink" />}
            {m.name}
          </button>
        ))}
      </div>

      {themed && theme && (
        <section
          aria-labelledby="menu-tema"
          className="mt-6 flex flex-col gap-4 rounded-[1.5rem] bg-cream p-5 ring-1 ring-ink/8 md:flex-row md:items-start md:justify-between md:p-6"
        >
          <div className="min-w-0">
            <p className="flex items-center gap-2 text-small font-semibold text-ink-muted">
              <CalendarDays aria-hidden className="size-4" />
              Tema del mes
            </p>
            <h2
              id="menu-tema"
              className="mt-2 font-serif text-[1.875rem] leading-[1.05] font-light [overflow-wrap:anywhere]"
            >
              {theme.title || "Sin tema todavía"}
              {theme.month && <span className="text-ink-muted"> · {theme.month}</span>}
            </h2>
            <p className="mt-2 max-w-[60ch] text-small text-ink-soft">
              {theme.blurb ||
                (themeEmpty
                  ? "Carga el tema del mes (personaje histórico, artista o festividad) y agrega sus platillos abajo."
                  : "")}
            </p>
          </div>
          <Button
            variant="secondary"
            iconLeft={Pencil}
            onClick={() => setEditing({ kind: "theme", row: asRow({ ...theme }, "tema") })}
            className="shrink-0"
          >
            {themeEmpty ? "Cargar tema" : "Editar tema"}
          </Button>
        </section>
      )}

      <p className="mt-6 text-small text-ink-muted">
        {menu.sections.length} {menu.sections.length === 1 ? "sección" : "secciones"} ·{" "}
        {totalDishes} {totalDishes === 1 ? "platillo" : "platillos"}
      </p>

      <div role="tabpanel" className="mt-3 space-y-4">
        {menu.sections.length === 0 && (
          <div className="rounded-[1.5rem] border border-dashed border-ink/20 bg-cream/60 p-8 text-center">
            <p className="text-body text-ink-soft">
              Este menú no tiene secciones. Crea la primera para empezar a agregar platillos.
            </p>
            <Button
              className="mt-5"
              iconLeft={Plus}
              onClick={() =>
                setEditing({ kind: "section", row: asRow({ name: "" }, id("sec")), isNew: true })
              }
            >
              Nueva sección
            </Button>
          </div>
        )}

        {menu.sections.map((sec, si) => (
          <section
            key={sec.id}
            aria-labelledby={`sec-${sec.id}`}
            className="rounded-[1.5rem] bg-cream p-5 ring-1 ring-ink/8 md:p-6"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex min-w-0 items-center gap-3">
                <h2
                  id={`sec-${sec.id}`}
                  className="font-serif text-[1.625rem] leading-none font-light [overflow-wrap:anywhere]"
                >
                  {sec.name}
                </h2>
                {sec.badge === "nuevo" && <Pill tone="accent">Nueva</Pill>}
                {sec.badge === "editado" && <Pill tone="accent">Editada</Pill>}
              </div>
              <span className="flex">
                <button
                  type="button"
                  className={iconBtn}
                  disabled={si === 0}
                  aria-label={`Subir sección ${sec.name}`}
                  onClick={() =>
                    apply(
                      { ...menu, sections: move(menu.sections, si, -1) },
                      `Sección movida: ${sec.name}`,
                    )
                  }
                >
                  <ArrowUp aria-hidden className="size-4" />
                </button>
                <button
                  type="button"
                  className={iconBtn}
                  disabled={si === menu.sections.length - 1}
                  aria-label={`Bajar sección ${sec.name}`}
                  onClick={() =>
                    apply(
                      { ...menu, sections: move(menu.sections, si, 1) },
                      `Sección movida: ${sec.name}`,
                    )
                  }
                >
                  <ArrowDown aria-hidden className="size-4" />
                </button>
                <button
                  type="button"
                  className={iconBtn}
                  aria-label={`Renombrar sección ${sec.name}`}
                  onClick={() =>
                    setEditing({
                      kind: "section",
                      row: asRow({ name: sec.name }, sec.id),
                      isNew: false,
                    })
                  }
                >
                  <Pencil aria-hidden className="size-4" />
                </button>
                <button
                  type="button"
                  className={cn(iconBtn, "hover:text-terracotta")}
                  aria-label={`Eliminar sección ${sec.name}`}
                  onClick={() => setDeleting({ kind: "section", section: sec })}
                >
                  <Trash2 aria-hidden className="size-4" />
                </button>
              </span>
            </div>

            {sec.items.length === 0 ? (
              <p className="mt-4 text-small text-ink-muted">Sin platillos todavía.</p>
            ) : (
              <ol className="mt-4 divide-y divide-ink/8 border-t border-ink/8">
                {sec.items.map((item, ii) => (
                  <li key={item.id} className="flex items-center justify-between gap-3 py-2.5">
                    <span className="flex min-w-0 items-start gap-3">
                      <span className="mt-1 w-6 shrink-0 text-small text-ink-muted tabular-nums">
                        {ii + 1}
                      </span>
                      <span className="min-w-0">
                        <span className="flex flex-wrap items-center gap-2 text-body [overflow-wrap:anywhere]">
                          {item.name}
                          {item.badge === "nuevo" && <Pill tone="accent">Nuevo (demo)</Pill>}
                          {item.badge === "editado" && <Pill tone="accent">Editado</Pill>}
                        </span>
                        {item.description && (
                          <span className="block text-small text-ink-muted [overflow-wrap:anywhere]">
                            {item.description}
                          </span>
                        )}
                      </span>
                    </span>
                    <span className="flex shrink-0">
                      <button
                        type="button"
                        className={iconBtn}
                        disabled={ii === 0}
                        aria-label={`Subir ${item.name}`}
                        onClick={() =>
                          apply(
                            {
                              ...menu,
                              sections: mapSection(sec.id, (s) => ({
                                ...s,
                                items: move(s.items, ii, -1),
                              })),
                            },
                            `Platillo movido: ${item.name}`,
                          )
                        }
                      >
                        <ArrowUp aria-hidden className="size-4" />
                      </button>
                      <button
                        type="button"
                        className={iconBtn}
                        disabled={ii === sec.items.length - 1}
                        aria-label={`Bajar ${item.name}`}
                        onClick={() =>
                          apply(
                            {
                              ...menu,
                              sections: mapSection(sec.id, (s) => ({
                                ...s,
                                items: move(s.items, ii, 1),
                              })),
                            },
                            `Platillo movido: ${item.name}`,
                          )
                        }
                      >
                        <ArrowDown aria-hidden className="size-4" />
                      </button>
                      <button
                        type="button"
                        className={iconBtn}
                        aria-label={`Editar ${item.name}`}
                        onClick={() =>
                          setEditing({
                            kind: "dish",
                            sectionId: sec.id,
                            row: asRow({ name: item.name, description: item.description }, item.id),
                            isNew: false,
                          })
                        }
                      >
                        <Pencil aria-hidden className="size-4" />
                      </button>
                      <button
                        type="button"
                        className={cn(iconBtn, "hover:text-terracotta")}
                        aria-label={`Eliminar ${item.name}`}
                        onClick={() => setDeleting({ kind: "dish", sectionId: sec.id, item })}
                      >
                        <Trash2 aria-hidden className="size-4" />
                      </button>
                    </span>
                  </li>
                ))}
              </ol>
            )}

            <button
              type="button"
              onClick={() =>
                setEditing({
                  kind: "dish",
                  sectionId: sec.id,
                  row: asRow({ name: "", description: "" }, id("d")),
                  isNew: true,
                })
              }
              className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-full border border-dashed border-ink/25 px-5 text-small font-semibold text-ink-soft transition-colors hover:border-ink hover:text-ink"
            >
              <Plus aria-hidden className="size-4" />
              Agregar platillo a {sec.name}
            </button>
          </section>
        ))}
      </div>

      <EditDrawer
        open={editing !== null}
        title={
          editing?.kind === "theme"
            ? "Tema del mes"
            : editing?.kind === "section"
              ? editing.isNew
                ? "Nueva sección"
                : "Renombrar sección"
              : editing?.isNew
                ? "Agregar platillo"
                : "Editar platillo"
        }
        fields={
          editing?.kind === "theme"
            ? THEME_FIELDS
            : editing?.kind === "section"
              ? SECTION_FIELDS
              : DISH_FIELDS
        }
        initial={editing?.row ?? null}
        onClose={() => setEditing(null)}
        onSave={saveEditing}
      />

      <Dialog
        open={deleting !== null}
        onClose={() => setDeleting(null)}
        title={deleting?.kind === "section" ? "¿Eliminar la sección?" : "¿Eliminar el platillo?"}
        size="sm"
        footer={
          <div className="flex flex-wrap justify-end gap-2">
            <Button variant="secondary" onClick={() => setDeleting(null)}>
              Cancelar
            </Button>
            <Button onClick={confirmDelete} iconLeft={Trash2}>
              Eliminar
            </Button>
          </div>
        }
      >
        <p className="text-body text-ink-soft">
          {deleting?.kind === "section"
            ? `Se eliminará "${deleting.section.name}" con sus ${deleting.section.items.length} platillos.`
            : deleting
              ? `Se eliminará "${deleting.item.name}" de la carta.`
              : ""}{" "}
          Es un cambio simulado: «Restablecer demo» lo deshace.
        </p>
      </Dialog>
    </>
  );
}
