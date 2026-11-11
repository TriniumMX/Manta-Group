// Datos semilla del administrador demo. Se construyen con el contenido real del
// sitio (MantaGroup2026.pdf) para que el panel refleje lo que se ve en público.
// Los cambios del admin NO afectan al sitio público (PLAN_MG §7.7).
import { BRANDS } from "@/config/brands";
import { BRAND_CONTACT, ADDRESS } from "@/config/contact";
import { BRAND_PAGES } from "@/content/brand-pages";
import { generateCourses } from "@/lib/calendar";
import type { BrandSlug } from "@/types/content";

export type RowBadge = "nuevo" | "editado" | null;

export interface AdminRow {
  id: string;
  visible: boolean;
  badge: RowBadge;
  [field: string]: string | boolean | number | null | undefined;
}

export interface MenuItemRow {
  id: string;
  name: string;
  description: string;
}
export interface MenuSectionRow {
  id: string;
  name: string;
  items: MenuItemRow[];
}
export interface MenuRow {
  id: string;
  name: string;
  sections: MenuSectionRow[];
}

export interface AdminData {
  marcas: AdminRow[];
  productos: AdminRow[];
  menus: MenuRow[];
  servicios: AdminRow[];
  cursos: AdminRow[];
  galerias: AdminRow[];
  contacto: AdminRow[];
}

const row = (id: string, fields: Record<string, string | boolean | number | null>): AdminRow => ({
  id,
  visible: true,
  badge: null,
  ...fields,
});

const slug = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-");

/** Imagen representativa por marca para productos. */
const productImage: Record<BrandSlug, string> = {
  "cesar-fuentes": "cesar-fuentes.g2",
  "la-trufa": "la-trufa.g1",
  "hoja-santa": "hoja-santa.g1",
  "black-pimienta": "black-pimienta.g1",
  camelia: "camelia.g2",
  agatha: "agatha.g2",
};

function seedProducts(): AdminRow[] {
  const rows: AdminRow[] = [];
  // La Trufa: piezas del PDF.
  for (const [i, name] of BRAND_PAGES["la-trufa"].offers.entries()) {
    rows.push(
      row(`p-la-trufa-${slug(name)}`, {
        brand: "la-trufa",
        name,
        category: name === "Catas" ? "Experiencias" : "Chocolates",
        image: productImage["la-trufa"],
        featured: i < 2,
      }),
    );
  }
  // Camelia: productos con municipio de origen.
  const origins = BRAND_PAGES.camelia.modules.find((m) => m.kind === "origins");
  if (origins?.kind === "origins") {
    for (const o of origins.items) {
      rows.push(
        row(`p-camelia-${slug(o.product)}`, {
          brand: "camelia",
          name: o.product,
          category: o.place,
          image: productImage.camelia,
          featured: false,
        }),
      );
    }
  }
  // Agatha: galletas por colección.
  const cookies = BRAND_PAGES.agatha.modules.find((m) => m.kind === "collections");
  if (cookies?.kind === "collections") {
    for (const col of cookies.items.slice(0, 2)) {
      for (const [i, name] of col.entries.entries()) {
        rows.push(
          row(`p-agatha-${slug(name)}`, {
            brand: "agatha",
            name,
            category: col.name,
            image: productImage.agatha,
            featured: i === 0,
          }),
        );
      }
    }
  }
  return rows;
}

function seedServices(): AdminRow[] {
  const cf = (BRAND_PAGES["cesar-fuentes"].services ?? []).map((s) =>
    row(`s-cf-${slug(s.title)}`, {
      brand: "cesar-fuentes",
      name: s.title,
      description: s.text,
    }),
  );
  const hs = BRAND_PAGES["hoja-santa"].offers.map((name) =>
    row(`s-hs-${slug(name)}`, { brand: "hoja-santa", name, description: "" }),
  );
  return [...cf, ...hs];
}

function seedMenus(): MenuRow[] {
  const dishes = BRAND_PAGES["hoja-santa"].modules.find((m) => m.kind === "dishes");
  const items = dishes?.kind === "dishes" ? dishes.items : [];
  const pick = (re: RegExp) =>
    items.filter((d) => re.test(d)).map((name) => ({ id: slug(name), name, description: "" }));
  return [
    {
      id: "carta",
      name: "Carta de la casa",
      sections: [
        { id: "moles", name: "Moles", items: pick(/^Mole/) },
        { id: "entradas", name: "Entradas", items: pick(/^(Crema|Ceviche)/) },
        { id: "aguas", name: "Aguas frescas", items: pick(/^Agua/) },
      ],
    },
    {
      id: "tematico",
      name: "Menú temático del mes",
      sections: [{ id: "por-definir", name: "Por definir", items: [] }],
    },
  ];
}

function seedCourses(today: string): AdminRow[] {
  return generateCourses(today)
    .filter((c) => c.date.slice(0, 7) === today.slice(0, 7))
    .map((c) =>
      row(`c-${c.id}`, {
        name: c.name,
        topic: c.topic ?? "",
        date: c.date,
        startTime: c.startTime,
        endTime: c.endTime,
        instructor: c.instructor ?? "Por confirmar",
      }),
    );
}

function seedGalleries(): AdminRow[] {
  return BRANDS.flatMap((b) =>
    BRAND_PAGES[b.slug].gallery.map((g, i) =>
      row(`g-${g.id}`, { brand: b.slug, slot: `Foto ${i + 1}`, image: g.id, alt: g.alt }),
    ),
  );
}

function seedContact(): AdminRow[] {
  const whatsapp: Record<BrandSlug, string> = {
    "cesar-fuentes": "427 227 6879",
    "la-trufa": "427 227 6879",
    "hoja-santa": "427 202 6431",
    "black-pimienta": "427 227 6879",
    camelia: "442 225 5599",
    agatha: "427 227 6879",
  };
  return BRANDS.map((b) => {
    const c = BRAND_CONTACT[b.slug];
    return row(`ct-${b.slug}`, {
      brand: b.slug,
      whatsapp: whatsapp[b.slug],
      whatsappStatus: "Pendiente de activar",
      email: "",
      hours: "",
      address: c.address
        ? `${ADDRESS.street}, ${ADDRESS.area}, ${ADDRESS.city}`
        : (c.locations ?? []).join(", "),
      social: c.social.map((s) => `${s.network}/${s.handle}`).join(" · "),
    });
  });
}

/** Estado inicial completo. `today` (yyyy-mm-dd, CDMX) define los cursos del mes. */
export function createSeed(today: string): AdminData {
  return {
    marcas: BRANDS.map((b) =>
      row(`b-${b.slug}`, {
        brand: b.slug,
        name: b.name,
        category: b.category,
        tagline: b.tagline,
        accent: b.theme.accent,
      }),
    ),
    productos: seedProducts(),
    menus: seedMenus(),
    servicios: seedServices(),
    cursos: seedCourses(today),
    galerias: seedGalleries(),
    contacto: seedContact(),
  };
}

/** Imágenes disponibles para "Reemplazar imagen" (simulado). */
export const IMAGE_CHOICES = [
  "cesar-fuentes.g1",
  "cesar-fuentes.g2",
  "cesar-fuentes.g3",
  "la-trufa.g1",
  "la-trufa.g2",
  "la-trufa.g3",
  "hoja-santa.g1",
  "hoja-santa.g3",
  "black-pimienta.g1",
  "black-pimienta.g2",
  "camelia.g1",
  "camelia.g2",
  "camelia.g3",
  "agatha.g1",
  "agatha.g2",
];
