// Contenido de Nosotros. Fuente: MantaGroup2026.pdf (presentación del Chef César
// Fuentes y del grupo), condensado sin añadir datos.
import type { MediaSlot } from "@/types/content";

export const ABOUT = {
  lead: "En Manta Group buscamos compartir nuestro gusto y pasión por la gastronomía, con diferentes experiencias: chocolate, cursos, eventos, restaurante, productos artesanales y galletas.",
  founder: {
    name: "César Fuentes",
    role: "Fundador",
    quote:
      "Me gusta cocinar para aquellos que disfrutan de la vida y ven en los alimentos no solo una necesidad, sino una experiencia.",
    media: {
      id: "mg.founder",
      alt: "Equipo de servicio de César Fuentes en un evento",
    } satisfies MediaSlot,
    paragraphs: [
      "Originario de San Juan del Río, Querétaro. Licenciado en gastronomía y en mercadotecnia, con una especialidad en tecnología de alimentos y una maestría en dirección de empresas de alimentos y bebidas.",
      "Durante 17 años dirigió empresas de educación gastronómica de relevancia nacional, y se formó en la dirección y operación de cocinas de hotel, banquetes y restaurantes con estrella Michelin en España. También ha conducido segmentos gastronómicos en televisión y radio.",
      "Ha trabajado en el rescate del patrimonio gastronómico de San Luis Potosí y San Juan del Río, y colaboró con Jim Campbell en el recetario Smiling for diabetics (2017).",
    ],
  },
  milestones: [
    { year: "2019", text: "Nace César Fuentes, gastronomía para eventos en Querétaro." },
    { year: "2020", text: "La Trufa comienza a hacer chocolate artesanal." },
    { year: "2024", text: "El Chef Adolfo Gonzaga abre Hoja Santa." },
    { year: "2025", text: "César y Adolfo inician Camelia con productores de la región." },
  ],
};
