import { cn } from "@/lib/utils";

/** Eyebrow: 13 px, mayúsculas, única excepción al mínimo de 14 px (§6.4). */
export function Eyebrow({
  tone = "muted",
  as: Tag = "p",
  className,
  children,
}: {
  /** muted/accent para fondos claros; onInk para secciones oscuras. */
  tone?: "muted" | "accent" | "onInk";
  as?: "p" | "span" | "div";
  className?: string;
  children: React.ReactNode;
}) {
  const color = { muted: "text-ink-muted", accent: "text-accent-text", onInk: "text-stone" }[tone];
  return <Tag className={cn("text-eyebrow", color, className)}>{children}</Tag>;
}

type Level = "display" | "h1" | "h2" | "h3";

const levelClass: Record<Level, string> = {
  display: "text-display",
  h1: "text-h1",
  h2: "text-h2",
  h3: "text-h3",
};

/** Encabezado con escala fija. `level` define el tamaño; `as` la semántica. */
export function Heading({
  level = "h2",
  as,
  className,
  children,
  id,
}: {
  level?: Level;
  as?: "h1" | "h2" | "h3" | "h4" | "p";
  className?: string;
  children: React.ReactNode;
  id?: string;
}) {
  const Tag = as ?? (level === "display" ? "h1" : level);
  return (
    <Tag id={id} className={cn(levelClass[level], className)}>
      {children}
    </Tag>
  );
}

/** Texto corrido limitado a ~65 caracteres por línea. */
export function Prose({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={cn("max-w-[65ch] space-y-4 text-body text-ink-soft", className)}>
      {children}
    </div>
  );
}

export function Divider({ className }: { className?: string }) {
  return <hr className={cn("border-0 border-t border-ink/12", className)} />;
}

export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn("animate-pulse rounded-[4px] bg-sand motion-reduce:animate-none", className)}
    />
  );
}
