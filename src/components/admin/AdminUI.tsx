"use client";

import { useId, useState } from "react";
import { Check, Eye, EyeOff, ImageIcon, Pencil } from "lucide-react";
import { getBrandBySlug } from "@/config/brands";
import type { AdminRow } from "@/content/admin/seed";
import { IMAGE_CHOICES } from "@/content/admin/seed";
import { SmartImage } from "@/components/media/SmartImage";
import { Button } from "@/components/ui/Button";
import { Dialog } from "@/components/ui/Dialog";
import { Input, Select, Textarea } from "@/components/ui/Field";
import { cn } from "@/lib/utils";

/* ---------- Piezas pequeñas ---------- */

export function BrandTag({ slug }: { slug: unknown }) {
  const brand = typeof slug === "string" ? getBrandBySlug(slug) : undefined;
  if (!brand) return null;
  return (
    <span
      data-brand={brand.slug}
      className="inline-flex items-center gap-2 text-small font-semibold text-ink"
    >
      <span aria-hidden className="size-2.5 rounded-full bg-accent ring-1 ring-ink/10" />
      {brand.name}
    </span>
  );
}

export function RowBadges({ row }: { row: AdminRow }) {
  return (
    <span className="flex flex-wrap gap-1.5">
      {row.badge === "nuevo" && <Pill tone="accent">Nuevo (demo)</Pill>}
      {row.badge === "editado" && <Pill tone="accent">Editado</Pill>}
      {!row.visible && <Pill>Oculto</Pill>}
    </span>
  );
}

export function Pill({
  tone = "neutral",
  children,
}: {
  tone?: "neutral" | "accent";
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex min-h-7 items-center rounded-full px-3 text-small font-semibold whitespace-nowrap",
        tone === "accent" ? "bg-olive-deep text-cream" : "bg-ink/6 text-ink-soft",
      )}
    >
      {children}
    </span>
  );
}

export function PageTitle({
  title,
  description,
  actions,
}: {
  title: string;
  description?: string;
  actions?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
      <div>
        <h1 className="font-serif text-[clamp(2.25rem,1.6rem+2.4vw,3.5rem)] leading-[1] font-light tracking-[-0.03em] [font-variation-settings:'SOFT'_100]">
          {title}
        </h1>
        {description && <p className="mt-3 max-w-[60ch] text-body text-ink-soft">{description}</p>}
      </div>
      {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
    </div>
  );
}

/* ---------- Tabla ---------- */

export interface Column {
  key: string;
  label: string;
  render?: (row: AdminRow) => React.ReactNode;
  className?: string;
}

const iconBtn =
  "inline-flex size-10 items-center justify-center rounded-full text-ink-soft transition-colors hover:bg-ink/6 hover:text-ink";

export function DataTable({
  rows,
  columns,
  caption,
  onEdit,
  onToggle,
  onImage,
  rowLabel,
}: {
  rows: AdminRow[];
  columns: Column[];
  caption: string;
  onEdit?: (row: AdminRow) => void;
  onToggle?: (row: AdminRow) => void;
  onImage?: (row: AdminRow) => void;
  rowLabel: (row: AdminRow) => string;
}) {
  return (
    <div className="overflow-hidden rounded-[1.5rem] bg-cream ring-1 ring-ink/8">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[44rem] text-left">
          <caption className="sr-only">{caption}</caption>
          <thead>
            <tr className="border-b border-ink/8">
              {columns.map((c) => (
                <th
                  key={c.key}
                  scope="col"
                  className="px-5 py-4 text-small font-semibold text-ink-muted"
                >
                  {c.label}
                </th>
              ))}
              <th
                scope="col"
                className="px-5 py-4 text-right text-small font-semibold text-ink-muted"
              >
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 && (
              <tr>
                <td
                  colSpan={columns.length + 1}
                  className="px-5 py-12 text-center text-body text-ink-soft"
                >
                  Sin registros con este filtro.
                </td>
              </tr>
            )}
            {rows.map((row) => (
              <tr
                key={row.id}
                className={cn(
                  "border-b border-ink/6 transition-[background-color,opacity] last:border-0 hover:bg-ivory/70",
                  !row.visible && "opacity-55",
                  row.badge === "nuevo" && "animate-toast-in",
                )}
              >
                {columns.map((c) => (
                  <td
                    key={c.key}
                    className={cn("px-5 py-3.5 align-middle text-small text-ink", c.className)}
                  >
                    {c.render ? c.render(row) : String(row[c.key] ?? "")}
                  </td>
                ))}
                <td className="px-3 py-2 text-right whitespace-nowrap">
                  {onImage && (
                    <button
                      type="button"
                      onClick={() => onImage(row)}
                      className={iconBtn}
                      aria-label={`Reemplazar imagen de ${rowLabel(row)}`}
                    >
                      <ImageIcon aria-hidden className="size-4.5" />
                    </button>
                  )}
                  {onToggle && (
                    <button
                      type="button"
                      onClick={() => onToggle(row)}
                      className={iconBtn}
                      aria-label={`${row.visible ? "Ocultar" : "Mostrar"} ${rowLabel(row)}`}
                    >
                      {row.visible ? (
                        <Eye aria-hidden className="size-4.5" />
                      ) : (
                        <EyeOff aria-hidden className="size-4.5" />
                      )}
                    </button>
                  )}
                  {onEdit && (
                    <button
                      type="button"
                      onClick={() => onEdit(row)}
                      className={iconBtn}
                      aria-label={`Editar ${rowLabel(row)}`}
                    >
                      <Pencil aria-hidden className="size-4.5" />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ---------- Panel de edición ---------- */

export interface FieldDef {
  name: string;
  label: string;
  type?: "text" | "textarea" | "select" | "checkbox" | "date" | "time";
  options?: { value: string; label: string }[];
  hint?: string;
}

function FormField({
  def,
  value,
  onChange,
}: {
  def: FieldDef;
  value: AdminRow[string];
  onChange: (v: string | boolean) => void;
}) {
  const id = useId();
  if (def.type === "checkbox") {
    return (
      <label
        htmlFor={id}
        className="flex min-h-12 cursor-pointer items-center justify-between gap-4 rounded-[1rem] bg-ivory px-4 ring-1 ring-ink/8"
      >
        <span className="text-small font-semibold text-ink">{def.label}</span>
        <input
          id={id}
          type="checkbox"
          checked={Boolean(value)}
          onChange={(e) => onChange(e.target.checked)}
          className="size-5 accent-[var(--color-olive-deep)]"
        />
      </label>
    );
  }
  const str = value == null ? "" : String(value);
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-small font-semibold text-ink">
        {def.label}
      </label>
      {def.type === "textarea" ? (
        <Textarea
          id={id}
          value={str}
          onChange={(e) => onChange(e.target.value)}
          className="rounded-[0.875rem]"
        />
      ) : def.type === "select" ? (
        <Select
          id={id}
          value={str}
          onChange={(e) => onChange(e.target.value)}
          options={def.options ?? []}
          className="rounded-[0.875rem]"
        />
      ) : (
        <Input
          id={id}
          type={def.type ?? "text"}
          value={str}
          onChange={(e) => onChange(e.target.value)}
          className="rounded-[0.875rem]"
        />
      )}
      {def.hint && <p className="text-small text-ink-muted">{def.hint}</p>}
    </div>
  );
}

/**
 * Panel lateral de edición (pantalla completa en móvil). "Guardar" aplica el
 * cambio simulado; "Cancelar", Esc o el fondo cierran sin cambios y el foco
 * vuelve al botón que lo abrió.
 */
export function EditDrawer({
  open,
  title,
  fields,
  initial,
  onClose,
  onSave,
}: {
  open: boolean;
  title: string;
  fields: FieldDef[];
  initial: AdminRow | null;
  onClose: () => void;
  onSave: (row: AdminRow) => void;
}) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      title={title}
      description="Cambio simulado: no se guarda en ningún servidor."
      size="full-mobile"
      className="md:my-0 md:mr-0 md:ml-auto md:h-dvh md:max-h-dvh md:w-full md:max-w-lg md:rounded-none md:rounded-l-[1.75rem]"
    >
      {initial && (
        <DrawerForm
          key={initial.id}
          fields={fields}
          initial={initial}
          onClose={onClose}
          onSave={onSave}
        />
      )}
    </Dialog>
  );
}

function DrawerForm({
  fields,
  initial,
  onClose,
  onSave,
}: {
  fields: FieldDef[];
  initial: AdminRow;
  onClose: () => void;
  onSave: (row: AdminRow) => void;
}) {
  const [draft, setDraft] = useState<AdminRow>(initial);
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSave(draft);
      }}
      className="flex min-h-full flex-col"
    >
      <div className="space-y-5">
        {fields.map((f) => (
          <FormField
            key={f.name}
            def={f}
            value={draft[f.name]}
            onChange={(v) => setDraft((d) => ({ ...d, [f.name]: v }))}
          />
        ))}
      </div>
      <div className="sticky bottom-0 mt-8 flex justify-end gap-2 bg-cream pt-4">
        <Button type="button" variant="secondary" onClick={onClose}>
          Cancelar
        </Button>
        <Button type="submit" iconLeft={Check}>
          Guardar
        </Button>
      </div>
    </form>
  );
}

/* ---------- Reemplazar imagen ---------- */

export function ImagePicker({
  open,
  current,
  onClose,
  onPick,
}: {
  open: boolean;
  current: string | null;
  onClose: () => void;
  onPick: (id: string) => void;
}) {
  const options = IMAGE_CHOICES.filter((id) => id !== current).slice(0, 6);
  return (
    <Dialog
      open={open}
      onClose={onClose}
      title="Reemplazar imagen"
      description="Elige una foto de la biblioteca (simulado)."
      size="md"
    >
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {options.map((id) => (
          <li key={id}>
            <button
              type="button"
              onClick={() => onPick(id)}
              className="group block w-full overflow-hidden rounded-[1rem] ring-1 ring-ink/10 transition-shadow hover:ring-2 hover:ring-olive-deep"
              aria-label={`Usar imagen ${id}`}
            >
              <SmartImage
                slot={{ id, alt: "" }}
                sizes="200px"
                className="aspect-square"
                imageClassName="transition-transform duration-500 group-hover:scale-105"
              />
            </button>
          </li>
        ))}
      </ul>
    </Dialog>
  );
}
