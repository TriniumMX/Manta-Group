// Contenido de la página de Inicio. TEXTOS PROVISIONALES (propuesta de TRINIUM):
// sin cifras, fechas, premios ni datos no confirmados. Reemplazar con los
// textos oficiales de Manta Group.
import type { ExperienceCategory, MediaSlot } from "@/types/content";

export const HOME_HERO = {
  eyebrow: "Manta Group",
  title: "Experiencias que inspiran.",
  titleAccent: "Marcas que cuentan historias.",
  subtitle:
    "Gastronomía, restaurante, formación y producto artesanal: seis marcas con voz propia bajo una misma visión.",
  primaryCta: { label: "Descubre nuestras marcas", href: "#universo" },
  secondaryCta: { label: "Conoce al grupo", href: "/nosotros" },
  media: { id: "mg.hero", alt: "Mesa servida con luz natural", aspect: "16/9" } satisfies MediaSlot,
};

export const HOME_UNIVERSE = {
  eyebrow: "Universo MG",
  title: "Seis marcas, una misma mesa",
  lead: "Cada marca tiene su propio carácter. Juntas forman un ecosistema que se recorre como una sola experiencia.",
};

export interface ExperienceBlock {
  id: ExperienceCategory;
  title: string;
  description: string;
  media: MediaSlot;
}

export const HOME_EXPERIENCES = {
  eyebrow: "Nuestras experiencias",
  title: "Cuatro formas de vivir la gastronomía",
  items: [
    {
      id: "experiencias",
      title: "Experiencias gastronómicas",
      description:
        "Catering, eventos y experiencias a la medida, pensadas para que cada mesa cuente algo.",
      media: { id: "mg.experiencias", alt: "Mesa preparada para un evento", aspect: "3/2" },
    },
    {
      id: "restaurantes",
      title: "Restaurantes y sabores",
      description: "Una cocina para sentarse sin prisa, con menús que cambian con la temporada.",
      media: { id: "mg.restaurantes", alt: "Platillo servido en restaurante", aspect: "3/2" },
    },
    {
      id: "artesanal",
      title: "Productos artesanales",
      description:
        "Chocolates, galletas y piezas hechas a mano, para regalar o para darse un gusto.",
      media: { id: "mg.artesanal", alt: "Productos artesanales sobre mesa", aspect: "3/2" },
    },
    {
      id: "formacion",
      title: "Formación gastronómica",
      description: "Cursos y talleres para aprender cocina con las manos en la masa.",
      media: { id: "mg.formacion", alt: "Clase de cocina en estación de trabajo", aspect: "3/2" },
    },
  ] satisfies ExperienceBlock[],
};

export const HOME_ESSENCE = {
  eyebrow: "Nuestra esencia",
  title: "Distintas marcas, un mismo ecosistema.",
  // Concepto de grupo, sin valores, historia ni cifras no confirmados (PLAN_MG §7.1).
  paragraphs: [
    "Manta Group reúne seis marcas que comparten terreno: la gastronomía y lo hecho con oficio. Cada una conserva su nombre, su carácter y su manera de atender.",
    "Aquí se presentan juntas para que sea natural pasar de una a otra: de un evento a una mesa de restaurante, de un curso a una caja de chocolates.",
  ],
  link: { label: "Conoce al grupo", href: "/nosotros" },
};

export const HOME_CONTACT = {
  eyebrow: "Contacto",
  title: "¿Por dónde quieres empezar?",
  group: {
    title: "Escribe al grupo",
    description: "Para propuestas, colaboraciones o cualquier consulta general sobre Manta Group.",
    cta: "Escribir por WhatsApp",
  },
  brands: {
    title: "Explora una marca",
    description: "Cada marca tiene su propio canal y su propia forma de atenderte.",
  },
};
