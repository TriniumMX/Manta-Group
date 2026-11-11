import Image from "next/image";
import { getMedia, type PlaceholderTone } from "@/config/media";
import { cn } from "@/lib/utils";
import type { MediaSlot } from "@/types/content";
import { MediaPlaceholder } from "./MediaPlaceholder";

const aspects: Record<NonNullable<MediaSlot["aspect"]>, string> = {
  "16/9": "aspect-[16/9]",
  "4/5": "aspect-[4/5]",
  "1/1": "aspect-square",
  "3/2": "aspect-[3/2]",
  "21/9": "aspect-[21/9]",
};

/**
 * Resuelve un slot del manifiesto (config/media.ts): si tiene archivo usa
 * next/image; si no, un MediaPlaceholder con la misma proporción.
 * Por defecto llena a su contenedor (`fill`); con `useAspect` impone la
 * proporción del slot.
 */
export function SmartImage({
  slot,
  sizes = "100vw",
  preload = false,
  useAspect = false,
  tone,
  showLabel,
  labelPosition,
  className,
  imageClassName,
}: {
  slot: MediaSlot;
  sizes?: string;
  /** Solo en el hero (LCP). */
  preload?: boolean;
  useAspect?: boolean;
  tone?: PlaceholderTone;
  showLabel?: boolean;
  labelPosition?: "top" | "bottom";
  className?: string;
  imageClassName?: string;
}) {
  const media = getMedia(slot.id);
  return (
    <div
      className={cn(
        "relative overflow-hidden",
        useAspect && slot.aspect && aspects[slot.aspect],
        className,
      )}
    >
      {media.src ? (
        <Image
          src={media.src}
          alt={slot.alt}
          fill
          sizes={sizes}
          preload={preload}
          className={cn("object-cover", imageClassName)}
          style={media.position ? { objectPosition: media.position } : undefined}
        />
      ) : (
        <MediaPlaceholder
          id={slot.id}
          alt={slot.alt}
          tone={tone ?? media.tone}
          label={media.label}
          showLabel={showLabel}
          labelPosition={labelPosition}
          className={imageClassName}
        />
      )}
    </div>
  );
}
