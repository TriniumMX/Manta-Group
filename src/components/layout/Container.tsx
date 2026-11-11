import { cn } from "@/lib/utils";

/** Contenedor de 1440 px máx. con gutters 16/24/40. */
export function Container({
  as: Tag = "div",
  className,
  children,
}: {
  as?: "div" | "section" | "header" | "footer" | "nav";
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Tag className={cn("mx-auto w-full max-w-site px-4 md:px-6 lg:px-10", className)}>
      {children}
    </Tag>
  );
}

type Tone = "ivory" | "cream" | "ink" | "tint";

const tones: Record<Tone, string> = {
  ivory: "bg-ivory text-ink",
  cream: "bg-cream text-ink",
  tint: "bg-surface-tint text-ink",
  // Sección oscura: contrapunto editorial (esencia, CTA finales, footer).
  ink: "tone-ink bg-ink text-cream",
};

/** Sección con ritmo vertical 64/96/128 px y tono de superficie. */
export function Section({
  tone = "ivory",
  id,
  className,
  containerClassName,
  labelledBy,
  bleed = false,
  children,
}: {
  tone?: Tone;
  id?: string;
  className?: string;
  containerClassName?: string;
  labelledBy?: string;
  /** Sin contenedor interno (para contenido a sangre). */
  bleed?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn("py-16 md:py-24 lg:py-32", tones[tone], className)}
    >
      {bleed ? children : <Container className={containerClassName}>{children}</Container>}
    </section>
  );
}
