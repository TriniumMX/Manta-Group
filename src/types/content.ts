export type BrandSlug =
  "cesar-fuentes" | "la-trufa" | "hoja-santa" | "black-pimienta" | "camelia" | "agatha";

export type ExperienceCategory = "experiencias" | "restaurantes" | "artesanal" | "formacion";

export interface MediaSlot {
  id: string;
  alt: string;
  aspect?: "16/9" | "4/5" | "1/1" | "3/2" | "21/9";
}

export interface Category {
  id: string;
  brand: BrandSlug;
  name: string;
  description?: string;
  order: number;
}

export interface Product {
  id: string;
  brand: BrandSlug;
  categoryId: string;
  name: string;
  description: string;
  notes?: string[];
  media: MediaSlot;
  featured?: boolean;
  price?: null;
  isDemo: true;
}

export interface MenuItem {
  id: string;
  name: string;
  description?: string;
  tags?: ("vegetariano" | "vegano" | "sin gluten")[];
  price?: null;
}
export interface MenuSection {
  id: string;
  name: string;
  items: MenuItem[];
}
export interface Menu {
  id: string;
  brand: BrandSlug;
  name: string;
  description?: string;
  sections: MenuSection[];
}

export interface Course {
  id: string;
  brand: "black-pimienta";
  name: string;
  description: string;
  media: MediaSlot;
  date: string;
  startTime: string;
  endTime: string;
  durationLabel: string;
  instructor?: string;
  level?: "inicial" | "intermedio" | "avanzado";
  /** Tema del curso (PDF: cocina internacional, repostería, pan…). */
  topic?: string;
  featured?: boolean;
  isDemo: true;
}

export interface Service {
  id: string;
  brand: BrandSlug;
  name: string;
  description: string;
  icon: string;
  media?: MediaSlot;
  featured?: boolean;
}

export interface GalleryItem {
  id: string;
  brand: BrandSlug;
  media: MediaSlot;
  caption?: string;
  span?: "wide" | "tall" | "square";
}

export interface ContactInfo {
  brand: BrandSlug | "mg";
  whatsapp: string | null;
  email?: string | null;
  address?: string | null;
  hours?: string | null;
  social?: Partial<Record<"instagram" | "facebook" | "tiktok", string | null>>;
}

export type BrandModule = "services" | "gallery" | "catalog" | "menus" | "courses";

export interface BrandTheme {
  accent: string;
  accentText: string;
  surface?: string;
  tint?: string;
}

export interface Brand {
  slug: BrandSlug;
  name: string;
  eyebrow?: string;
  category: string;
  tagline: string;
  description: string;
  experienceCategories: ExperienceCategory[];
  theme: BrandTheme;
  heroSlot: MediaSlot;
  cardSlot: MediaSlot;
  ctaLabel: string;
  modules: BrandModule[];
  logo?: { src: string; alt: string };
  isDemo: true;
}
