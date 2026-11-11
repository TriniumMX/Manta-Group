import { cn } from "@/lib/utils";

type Tone = "neutral" | "accent" | "demo";

const tones: Record<Tone, string> = {
  neutral: "border-ink/15 bg-cream text-ink-soft",
  accent: "border-transparent bg-accent-soft text-accent-text",
  demo: "border-dashed border-stone bg-transparent text-ink-muted",
};

export function Badge({
  tone = "neutral",
  className,
  children,
}: {
  tone?: Tone;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-small font-medium",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

interface ChipProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  selected?: boolean;
}

/** Chip seleccionable para filtros (catálogos, universos). */
export function Chip({ selected = false, className, children, ...props }: ChipProps) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      className={cn(
        "inline-flex min-h-11 shrink-0 items-center rounded-full border px-4 text-small font-semibold transition-colors duration-200",
        selected
          ? "border-accent-text bg-accent-text text-cream"
          : "border-ink/20 bg-cream text-ink-soft hover:border-ink/50 hover:text-ink",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
