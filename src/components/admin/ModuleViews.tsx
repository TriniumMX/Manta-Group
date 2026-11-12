"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowDown, ArrowUp, ExternalLink, ImageIcon, Pencil, Plus } from "lucide-react";
import { BRANDS, brandHref, getBrandBySlug } from "@/config/brands";
import { longDate } from "@/lib/calendar";
import type { AdminRow, MenuRow } from "@/content/admin/seed";
import { SmartImage } from "@/components/media/SmartImage";
import { Button } from "@/components/ui/Button";
import { Select } from "@/components/ui/Field";
import { cn } from "@/lib/utils";
import { GlidePill } from "@/components/motion/GlidePill";
import type { BrandSlug } from "@/types/content";
import { useAdmin, type TableModule } from "./AdminProvider";
import {
  BrandTag,
  DataTable,
  EditDrawer,
  ImagePicker,
  PageTitle,
  Pill,
  RowBadges,
  type Column,
  type FieldDef,
} from "./AdminUI";
import { getModule, type AdminModuleId } from "./config";

const brandName = (slug: unknown) => getBrandBySlug(String(slug))?.name ?? String(slug);

const brandOptions = (slugs?: string[]) =>
  BRANDS.filter((b) => !slugs || slugs.includes(b.slug)).map((b) => ({
    value: b.slug,
    label: b.name,
  }));

interface TableConfig {
  columns: Column[];
  fields: FieldDef[];
  label: (r: AdminRow) => string;
  /** Marcas que aplican al filtro y al alta. */
  brands?: string[];
  canCreate?: boolean;
  canToggle?: boolean;
  hasImage?: boolean;
  blank?: () => AdminRow;
}

const thumb = (r: AdminRow) =>
  typeof r.image === "string" ? (
    <SmartImage
      slot={{ id: r.image, alt: "" }}
      sizes="56px"
      className="size-12 shrink-0 rounded-[0.75rem] bg-sand"
    />
  ) : null;

const nameCell = (r: AdminRow, extra?: React.ReactNode) => (
  <span className="flex items-center gap-3">
    {extra}
    <span className="min-w-0">
      <span className="block font-semibold text-ink">{String(r.name ?? "")}</span>
      <RowBadges row={r} />
    </span>
  </span>
);

const newId = (prefix: string) => `${prefix}-nuevo-${Date.now().toString(36)}`;

const CONFIGS: Record<Exclude<TableModule, "galerias" | "contacto">, TableConfig> = {
  marcas: {
    label: (r) => String(r.name),
    canToggle: true,
    columns: [
      {
        key: "name",
        label: "Marca",
        render: (r) =>
          nameCell(
            r,
            <span
              data-brand={String(r.brand)}
              aria-hidden
              className="size-9 shrink-0 rounded-full bg-accent ring-4 ring-accent-soft"
            />,
          ),
      },
      { key: "category", label: "Giro" },
      {
        key: "accent",
        label: "Acento",
        render: (r) => <code className="text-small text-ink-muted">{String(r.accent)}</code>,
      },
      {
        key: "visible",
        label: "Estado",
        render: (r) => (r.visible ? <Pill tone="accent">Publicada</Pill> : <Pill>Oculta</Pill>),
      },
      {
        key: "link",
        label: "Página",
        render: (r) => (
          <Link
            href={brandHref(r.brand as BrandSlug)}
            target="_blank"
            className="inline-flex min-h-10 items-center gap-1.5 font-semibold text-ink underline-offset-4 hover:underline"
          >
            Ver <ExternalLink aria-hidden className="size-3.5" />
            <span className="sr-only"> (pestaña nueva)</span>
          </Link>
        ),
      },
    ],
    fields: [
      { name: "name", label: "Nombre" },
      { name: "category", label: "Giro" },
      { name: "tagline", label: "Frase", type: "textarea" },
    ],
  },
  productos: {
    label: (r) => String(r.name),
    brands: ["la-trufa", "camelia", "agatha"],
    canCreate: true,
    canToggle: true,
    hasImage: true,
    blank: () => ({
      id: newId("p"),
      visible: true,
      badge: null,
      brand: "la-trufa",
      name: "",
      category: "",
      image: "la-trufa.g1",
      featured: false,
    }),
    columns: [
      { key: "name", label: "Producto", render: (r) => nameCell(r, thumb(r)) },
      { key: "brand", label: "Marca", render: (r) => <BrandTag slug={r.brand} /> },
      { key: "category", label: "Categoría" },
      {
        key: "featured",
        label: "Destacado",
        render: (r) =>
          r.featured ? <Pill tone="accent">Sí</Pill> : <span className="text-ink-muted">No</span>,
      },
    ],
    fields: [
      { name: "name", label: "Nombre" },
      {
        name: "brand",
        label: "Marca",
        type: "select",
        options: brandOptions(["la-trufa", "camelia", "agatha"]),
      },
      { name: "category", label: "Categoría", hint: "En Camelia, el municipio de origen." },
      { name: "featured", label: "Destacado", type: "checkbox" },
      { name: "visible", label: "Visible en el sitio", type: "checkbox" },
    ],
  },
  servicios: {
    label: (r) => String(r.name),
    brands: ["cesar-fuentes", "hoja-santa"],
    canCreate: true,
    canToggle: true,
    blank: () => ({
      id: newId("s"),
      visible: true,
      badge: null,
      brand: "cesar-fuentes",
      name: "",
      description: "",
    }),
    columns: [
      { key: "name", label: "Servicio", render: (r) => nameCell(r) },
      { key: "brand", label: "Marca", render: (r) => <BrandTag slug={r.brand} /> },
      {
        key: "description",
        label: "Descripción",
        className: "max-w-[28rem] text-ink-soft",
        render: (r) => String(r.description || "Sin descripción"),
      },
    ],
    fields: [
      { name: "name", label: "Nombre" },
      {
        name: "brand",
        label: "Marca",
        type: "select",
        options: brandOptions(["cesar-fuentes", "hoja-santa"]),
      },
      { name: "description", label: "Descripción", type: "textarea" },
      { name: "visible", label: "Visible en el sitio", type: "checkbox" },
    ],
  },
  cursos: {
    label: (r) => `${r.name} (${r.date})`,
    canCreate: true,
    canToggle: true,
    blank: () => ({
      id: newId("c"),
      visible: true,
      badge: null,
      name: "",
      topic: "",
      date: "",
      startTime: "10:00",
      endTime: "13:00",
      instructor: "Por confirmar",
    }),
    columns: [
      {
        key: "date",
        label: "Fecha",
        render: (r) => (
          <span className="font-semibold first-letter:uppercase">
            {r.date ? longDate(String(r.date)) : "Sin fecha"}
          </span>
        ),
      },
      { key: "time", label: "Horario", render: (r) => `${r.startTime} a ${r.endTime} h` },
      { key: "name", label: "Curso", render: (r) => nameCell(r) },
      { key: "topic", label: "Tema", className: "text-ink-soft" },
      { key: "instructor", label: "Instructor", className: "text-ink-soft" },
    ],
    fields: [
      { name: "name", label: "Nombre del curso" },
      { name: "topic", label: "Tema" },
      { name: "date", label: "Fecha", type: "date" },
      { name: "startTime", label: "Inicio", type: "time" },
      { name: "endTime", label: "Fin", type: "time" },
      { name: "instructor", label: "Instructor" },
      { name: "visible", label: "Visible en el calendario", type: "checkbox" },
    ],
  },
};

/* ---------- Vista de tabla genérica ---------- */

function TableView({ module }: { module: Exclude<TableModule, "galerias" | "contacto"> }) {
  const meta = getModule(module)!;
  const cfg = CONFIGS[module];
  const { state, create, update, toggle } = useAdmin();
  const rows = state.data[module];
  const [brand, setBrand] = useState("all");
  const [query, setQuery] = useState("");
  const [editing, setEditing] = useState<{ row: AdminRow; isNew: boolean } | null>(null);
  const [imageFor, setImageFor] = useState<AdminRow | null>(null);

  const filtered = useMemo(
    () =>
      rows.filter(
        (r) =>
          (brand === "all" || r.brand === brand) &&
          (!query ||
            String(r.name ?? "")
              .toLowerCase()
              .includes(query.toLowerCase())),
      ),
    [rows, brand, query],
  );
  const visible = rows.filter((r) => r.visible).length;

  return (
    <>
      <PageTitle
        title={meta.label}
        description={meta.description}
        actions={
          cfg.canCreate && (
            <Button iconLeft={Plus} onClick={() => setEditing({ row: cfg.blank!(), isNew: true })}>
              Nuevo
            </Button>
          )
        }
      />
      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-3 sm:flex-row">
          <label className="sr-only" htmlFor={`buscar-${module}`}>
            Buscar
          </label>
          <input
            id={`buscar-${module}`}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar por nombre"
            className="min-h-11 rounded-full border border-ink/15 bg-cream px-5 text-small text-ink placeholder:text-ink-muted sm:w-64"
          />
          {cfg.brands && (
            <>
              <label className="sr-only" htmlFor={`marca-${module}`}>
                Filtrar por marca
              </label>
              <Select
                id={`marca-${module}`}
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                options={[{ value: "all", label: "Todas las marcas" }, ...brandOptions(cfg.brands)]}
                className="min-h-11 rounded-full py-2 text-small sm:w-56"
              />
            </>
          )}
        </div>
        <p className="text-small text-ink-muted">
          {filtered.length} de {rows.length} · {visible} visibles
        </p>
      </div>
      <div className="mt-5">
        <DataTable
          rows={filtered}
          columns={cfg.columns}
          caption={meta.label}
          rowLabel={cfg.label}
          onEdit={(row) => setEditing({ row, isNew: false })}
          onToggle={cfg.canToggle ? (row) => toggle(module, row.id, cfg.label(row)) : undefined}
          onImage={cfg.hasImage ? (row) => setImageFor(row) : undefined}
        />
      </div>

      <EditDrawer
        open={editing !== null}
        title={
          editing?.isNew
            ? `Nuevo en ${meta.label.toLowerCase()}`
            : `Editar ${editing ? cfg.label(editing.row) : ""}`
        }
        fields={cfg.fields}
        initial={editing?.row ?? null}
        onClose={() => setEditing(null)}
        onSave={(row) => {
          const label = cfg.label(row) || "registro sin nombre";
          if (editing?.isNew) create(module, row, label);
          else update(module, row, label);
          setEditing(null);
        }}
      />
      <ImagePicker
        open={imageFor !== null}
        current={typeof imageFor?.image === "string" ? imageFor.image : null}
        onClose={() => setImageFor(null)}
        onPick={(id) => {
          if (imageFor)
            update(module, { ...imageFor, image: id }, `imagen de ${cfg.label(imageFor)}`);
          setImageFor(null);
        }}
      />
    </>
  );
}

/* ---------- Galerías ---------- */

function GalleriesView() {
  const meta = getModule("galerias")!;
  const { state, update } = useAdmin();
  const [imageFor, setImageFor] = useState<AdminRow | null>(null);

  return (
    <>
      <PageTitle title={meta.label} description={meta.description} />
      <div className="mt-10 space-y-10">
        {BRANDS.map((b) => {
          const slots = state.data.galerias.filter((g) => g.brand === b.slug);
          return (
            <section key={b.slug} aria-labelledby={`gal-${b.slug}`}>
              <h2 id={`gal-${b.slug}`}>
                <BrandTag slug={b.slug} />
              </h2>
              <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                {slots.map((s) => (
                  <li
                    key={s.id}
                    className="group relative overflow-hidden rounded-[1.25rem] bg-cream ring-1 ring-ink/8"
                  >
                    <SmartImage
                      key={String(s.image)}
                      slot={{ id: String(s.image), alt: String(s.alt) }}
                      sizes="(min-width: 1024px) 20vw, 45vw"
                      className="aspect-[4/3] animate-toast-in"
                    />
                    <div className="flex items-center justify-between gap-2 p-3">
                      <span className="min-w-0">
                        <span className="block text-small font-semibold">{String(s.slot)}</span>
                        <RowBadges row={s} />
                      </span>
                      <button
                        type="button"
                        onClick={() => setImageFor(s)}
                        className="inline-flex min-h-10 shrink-0 items-center gap-1.5 rounded-full bg-ivory px-3 text-small font-semibold ring-1 ring-ink/10 transition-colors hover:bg-ink hover:text-cream"
                      >
                        <ImageIcon aria-hidden className="size-4" />
                        Reemplazar
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
      <ImagePicker
        open={imageFor !== null}
        current={typeof imageFor?.image === "string" ? imageFor.image : null}
        onClose={() => setImageFor(null)}
        onPick={(id) => {
          if (imageFor)
            update(
              "galerias",
              { ...imageFor, image: id },
              `${imageFor.slot} de ${brandName(imageFor.brand)}`,
            );
          setImageFor(null);
        }}
      />
    </>
  );
}

/* ---------- Contacto ---------- */

const CONTACT_FIELDS: FieldDef[] = [
  { name: "whatsapp", label: "WhatsApp", hint: "Se activará al salir del modo demo." },
  { name: "email", label: "Correo" },
  { name: "address", label: "Dirección", type: "textarea" },
  { name: "hours", label: "Horarios", type: "textarea" },
  { name: "social", label: "Redes sociales" },
];

function ContactView() {
  const meta = getModule("contacto")!;
  const { state, update } = useAdmin();
  const [editing, setEditing] = useState<AdminRow | null>(null);

  return (
    <>
      <PageTitle title={meta.label} description={meta.description} />
      <ul className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {state.data.contacto.map((c) => (
          <li key={c.id} className="flex flex-col rounded-[1.5rem] bg-cream p-6 ring-1 ring-ink/8">
            <div className="flex items-start justify-between gap-3">
              <span className="space-y-1">
                <BrandTag slug={c.brand} />
                <RowBadges row={c} />
              </span>
              <button
                type="button"
                onClick={() => setEditing(c)}
                aria-label={`Editar contacto`}
                className="inline-flex size-10 items-center justify-center rounded-full text-ink-soft hover:bg-ink/6 hover:text-ink"
              >
                <Pencil aria-hidden className="size-4.5" />
              </button>
            </div>
            <dl className="mt-5 space-y-3 text-small">
              {[
                ["WhatsApp", c.whatsapp ? `${c.whatsapp} · ${c.whatsappStatus}` : ""],
                ["Correo", c.email],
                ["Dirección", c.address],
                ["Horarios", c.hours],
                ["Redes", c.social],
              ].map(([label, value]) => (
                <div key={String(label)} className="grid grid-cols-[6rem_1fr] gap-3">
                  <dt className="text-ink-muted">{label}</dt>
                  <dd className={cn(value ? "text-ink" : "text-ink-muted italic")}>
                    {value ? String(value) : "Pendiente de configuración"}
                  </dd>
                </div>
              ))}
            </dl>
          </li>
        ))}
      </ul>
      <EditDrawer
        open={editing !== null}
        title="Editar contacto"
        fields={CONTACT_FIELDS}
        initial={editing}
        onClose={() => setEditing(null)}
        onSave={(row) => {
          update("contacto", row, `contacto de ${brandName(row.brand)}`);
          setEditing(null);
        }}
      />
    </>
  );
}

/* ---------- Menús (reordenar sin arrastrar) ---------- */

function move<T>(list: T[], i: number, dir: -1 | 1) {
  const j = i + dir;
  if (j < 0 || j >= list.length) return list;
  const next = [...list];
  [next[i], next[j]] = [next[j], next[i]];
  return next;
}

function MenusView() {
  const meta = getModule("menus")!;
  const { state, setMenus } = useAdmin();
  const [active, setActive] = useState(state.data.menus[0]?.id);
  const menu = state.data.menus.find((m) => m.id === active) ?? state.data.menus[0];

  const apply = (next: MenuRow, label: string) =>
    setMenus(
      state.data.menus.map((m) => (m.id === next.id ? next : m)),
      label,
    );

  const reorderBtn =
    "inline-flex size-9 items-center justify-center rounded-full text-ink-soft transition-colors hover:bg-ink/6 hover:text-ink disabled:opacity-30";

  return (
    <>
      <PageTitle title={meta.label} description={meta.description} />
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
      <div role="tabpanel" className="mt-6 space-y-4">
        {menu.sections.map((sec, si) => (
          <section
            key={sec.id}
            aria-labelledby={`sec-${sec.id}`}
            className="rounded-[1.5rem] bg-cream p-5 ring-1 ring-ink/8 md:p-6"
          >
            <div className="flex items-center justify-between gap-3">
              <h2
                id={`sec-${sec.id}`}
                className="font-serif text-[1.625rem] leading-none font-light"
              >
                {sec.name}
              </h2>
              <span className="flex">
                <button
                  type="button"
                  className={reorderBtn}
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
                  className={reorderBtn}
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
              </span>
            </div>
            {sec.items.length === 0 ? (
              <p className="mt-4 text-small text-ink-muted">
                Sin platillos todavía (pendiente de Manta Group).
              </p>
            ) : (
              <ol className="mt-4 divide-y divide-ink/8 border-t border-ink/8">
                {sec.items.map((item, ii) => (
                  <li key={item.id} className="flex items-center justify-between gap-3 py-2.5">
                    <span className="flex items-center gap-3 text-body">
                      <span className="w-6 text-small text-ink-muted tabular-nums">{ii + 1}</span>
                      {item.name}
                    </span>
                    <span className="flex">
                      <button
                        type="button"
                        className={reorderBtn}
                        disabled={ii === 0}
                        aria-label={`Subir ${item.name}`}
                        onClick={() =>
                          apply(
                            {
                              ...menu,
                              sections: menu.sections.map((s, k) =>
                                k === si ? { ...s, items: move(s.items, ii, -1) } : s,
                              ),
                            },
                            `Platillo movido: ${item.name}`,
                          )
                        }
                      >
                        <ArrowUp aria-hidden className="size-4" />
                      </button>
                      <button
                        type="button"
                        className={reorderBtn}
                        disabled={ii === sec.items.length - 1}
                        aria-label={`Bajar ${item.name}`}
                        onClick={() =>
                          apply(
                            {
                              ...menu,
                              sections: menu.sections.map((s, k) =>
                                k === si ? { ...s, items: move(s.items, ii, 1) } : s,
                              ),
                            },
                            `Platillo movido: ${item.name}`,
                          )
                        }
                      >
                        <ArrowDown aria-hidden className="size-4" />
                      </button>
                    </span>
                  </li>
                ))}
              </ol>
            )}
          </section>
        ))}
      </div>
    </>
  );
}

/** Vista de un módulo del administrador. */
export function ModuleView({ module }: { module: AdminModuleId }) {
  if (module === "galerias") return <GalleriesView />;
  if (module === "contacto") return <ContactView />;
  if (module === "menus") return <MenusView />;
  return <TableView module={module} />;
}
