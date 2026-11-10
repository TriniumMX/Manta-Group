import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

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
