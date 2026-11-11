// Configuración global del sitio. Textos PROVISIONALES.

export const SITE = {
  name: "Manta Group",
  shortName: "MG",
  description: "Seis marcas. Una misma visión. Demo del ecosistema digital de Manta Group.",
  concept: "Seis marcas. Una misma visión.",
  /** URL canónica provisional: se define al publicar. */
  url: "https://manta-group.example",
  locale: "es-MX",
  credit: { label: "TRINIUM", tagline: "Tecnología con corazón" },
} as const;

export interface NavItem {
  label: string;
  href: string;
}

export const MAIN_NAV: NavItem[] = [
  { label: "Inicio", href: "/" },
  { label: "Nuestras marcas", href: "/marcas" },
  { label: "Nosotros", href: "/nosotros" },
  { label: "Contacto", href: "/contacto" },
];

export const HEADER_CTA: NavItem = { label: "Explorar marcas", href: "/marcas" };

export const FOOTER_GROUP_LINKS: NavItem[] = [
  { label: "Inicio", href: "/" },
  { label: "Nosotros", href: "/nosotros" },
  { label: "Contacto", href: "/contacto" },
];

/** Acceso discreto al admin: solo desde el footer (PLAN_MG §3.1). */
export const ADMIN_LINK: NavItem = { label: "Vista demo del administrador", href: "/demo/admin" };
