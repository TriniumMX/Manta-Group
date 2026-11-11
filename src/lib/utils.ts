import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

// Las utilidades tipográficas propias (globals.css) son tamaños de fuente, no
// colores: sin esto, tailwind-merge descarta `text-small` al combinarlo con `text-cream`.
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [{ text: ["display", "h1", "h2", "h3", "eyebrow", "body", "small"] }],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function slugify(text: string) {
  return text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export const formatDate = (iso: string, opts?: Intl.DateTimeFormatOptions) =>
  new Intl.DateTimeFormat("es-MX", opts ?? { dateStyle: "long", timeZone: "UTC" }).format(
    new Date(iso),
  );
