import {
  BookOpen,
  CalendarDays,
  Images,
  LayoutDashboard,
  Package,
  Phone,
  Sparkles,
  Store,
  type LucideIcon,
} from "lucide-react";
import type { AdminData } from "@/content/admin/seed";

export type AdminModuleId = keyof AdminData;

export interface AdminModuleMeta {
  id: AdminModuleId;
  label: string;
  description: string;
  icon: LucideIcon;
}

export const ADMIN_MODULES: AdminModuleMeta[] = [
  {
    id: "marcas",
    label: "Marcas",
    description: "Nombre, giro, acento y estado de cada marca.",
    icon: Store,
  },
  {
    id: "productos",
    label: "Productos",
    description: "Catálogos de La Trufa, Camelia y Agatha. Las fotos son de referencia.",
    icon: Package,
  },
  {
    id: "menus",
    label: "Menús",
    description: "Secciones y platillos de Hoja Santa.",
    icon: BookOpen,
  },
  {
    id: "servicios",
    label: "Servicios",
    description: "Servicios de César Fuentes y Hoja Santa.",
    icon: Sparkles,
  },
  {
    id: "cursos",
    label: "Cursos",
    description: "Calendario del mes de Black Pimienta.",
    icon: CalendarDays,
  },
  {
    id: "galerias",
    label: "Galerías",
    description: "Fotografías de cada página de marca.",
    icon: Images,
  },
  {
    id: "contacto",
    label: "Contacto",
    description: "WhatsApp, dirección, horarios y redes.",
    icon: Phone,
  },
];

export const DASHBOARD = { label: "Dashboard", icon: LayoutDashboard, href: "/demo/admin" };

export const moduleHref = (id: AdminModuleId) => `/demo/admin/${id}`;
export const getModule = (id: string) => ADMIN_MODULES.find((m) => m.id === id);
