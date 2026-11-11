import { ImageIcon } from "lucide-react";
import type { PlaceholderTone } from "@/config/media";
import { cn } from "@/lib/utils";

const tones: Record<PlaceholderTone, string> = {
  sand: "bg-sand [--ph-ring:rgb(30_28_25/0.07)] [--ph-glow:rgb(251_248_242/0.65)]",
  soft: "bg-accent-soft [--ph-ring:rgb(30_28_25/0.06)] [--ph-glow:rgb(251_248_242/0.6)]",
  accent: "bg-accent [--ph-ring:rgb(251_248_242/0.1)] [--ph-glow:rgb(251_248_242/0.18)]",
  ink: "bg-ink [--ph-ring:rgb(232_223_208/0.07)] [--ph-glow:rgb(181_112_62/0.28)]",
};

/** Hash estable del id para variar la composición entre slots. */
function seeded(id: string) {
  let h = 2166136261;
  for (let i = 0; i < id.length; i++) h = Math.imul(h ^ id.charCodeAt(i), 16777619);
  const r = (n: number) => ((h >>> (n * 4)) & 0xff) / 255;
  return { x: 25 + r(0) * 50, y: 25 + r(1) * 45, size: 55 + r(2) * 35 };
}

/**
 * Superficie art-directed para slots sin fotografía: tono cálido, grano sutil,
 * una forma circular (eco de un plato visto desde arriba) y etiqueta discreta.
 */
export function MediaPlaceholder({
  id,
  alt,
  tone = "sand",
  label = "Fotografía · pendiente",
  showLabel = true,
  labelPosition = "top",
  className,
}: {
  id: string;
  alt: string;
  tone?: PlaceholderTone;
  label?: string;
  showLabel?: boolean;
  labelPosition?: "top" | "bottom";
  className?: string;
}) {
  const s = seeded(id);
  return (
    <div
      role={alt ? "img" : undefined}
      aria-label={alt ? `${alt} (imagen pendiente)` : undefined}
      aria-hidden={alt ? undefined : true}
      className={cn("grain absolute inset-0 overflow-hidden", tones[tone], className)}
      style={
        {
          "--ph-x": `${s.x}%`,
          "--ph-y": `${s.y}%`,
          "--ph-size": `${s.size}%`,
        } as React.CSSProperties
      }
    >
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at var(--ph-x) var(--ph-y), var(--ph-glow) 0, transparent 55%)",
        }}
      />
      <div
        aria-hidden
        className="absolute aspect-square -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          left: "var(--ph-x)",
          top: "var(--ph-y)",
          width: "var(--ph-size)",
          boxShadow:
            "inset 0 0 0 1px var(--ph-ring), 0 0 0 28px transparent, 0 0 0 29px var(--ph-ring)",
        }}
      />
      {showLabel && (
        <span
          aria-hidden
          className={cn(
            "absolute left-3 inline-flex items-center gap-1.5 rounded-full bg-cream/85 px-3 py-1.5 text-small text-ink-muted backdrop-blur-sm",
            labelPosition === "top" ? "top-3" : "bottom-3",
          )}
        >
          <ImageIcon className="size-3.5" />
          {label}
        </span>
      )}
    </div>
  );
}
