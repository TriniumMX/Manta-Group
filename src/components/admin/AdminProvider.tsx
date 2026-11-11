"use client";

import { createContext, useCallback, useContext, useMemo, useReducer } from "react";
import { todayInMexico } from "@/lib/calendar";
import { createSeed, type AdminData, type AdminRow, type MenuRow } from "@/content/admin/seed";
import { ToastProvider, useToast } from "@/components/ui/Toast";

export type TableModule = Exclude<keyof AdminData, "menus">;

export interface LogEntry {
  id: number;
  text: string;
  module: string;
  at: string;
}

interface State {
  entered: boolean;
  data: AdminData;
  log: LogEntry[];
  seq: number;
}

type Action =
  | { type: "enter" }
  | { type: "create"; module: TableModule; row: AdminRow; label: string }
  | { type: "update"; module: TableModule; row: AdminRow; label: string }
  | { type: "toggle"; module: TableModule; id: string; label: string }
  | { type: "menus"; menus: MenuRow[]; label: string }
  | { type: "reset" };

const now = () =>
  new Intl.DateTimeFormat("es-MX", {
    timeZone: "America/Mexico_City",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date());

function log(state: State, module: string, text: string): Pick<State, "log" | "seq"> {
  const id = state.seq + 1;
  return { seq: id, log: [{ id, text, module, at: now() }, ...state.log].slice(0, 12) };
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "enter":
      // Los datos se crean al entrar (siempre en el navegador): así "hoy" es la
      // fecha real del visitante y no la del build.
      return { ...state, entered: true, data: createSeed(todayInMexico()) };
    case "create":
      return {
        ...state,
        data: {
          ...state.data,
          [action.module]: [{ ...action.row, badge: "nuevo" }, ...state.data[action.module]],
        },
        ...log(state, action.module, `Nuevo: ${action.label}`),
      };
    case "update":
      return {
        ...state,
        data: {
          ...state.data,
          [action.module]: state.data[action.module].map((r) =>
            r.id === action.row.id
              ? { ...action.row, badge: r.badge === "nuevo" ? "nuevo" : "editado" }
              : r,
          ),
        },
        ...log(state, action.module, `Editado: ${action.label}`),
      };
    case "toggle": {
      const target = state.data[action.module].find((r) => r.id === action.id);
      return {
        ...state,
        data: {
          ...state.data,
          [action.module]: state.data[action.module].map((r) =>
            r.id === action.id ? { ...r, visible: !r.visible } : r,
          ),
        },
        ...log(
          state,
          action.module,
          `${target?.visible ? "Ocultado" : "Visible de nuevo"}: ${action.label}`,
        ),
      };
    }
    case "menus":
      return {
        ...state,
        data: { ...state.data, menus: action.menus },
        ...log(state, "menus", action.label),
      };
    case "reset":
      return { ...init(), entered: true, data: createSeed(todayInMexico()) };
  }
}

const EMPTY: AdminData = {
  marcas: [],
  productos: [],
  menus: [],
  servicios: [],
  cursos: [],
  galerias: [],
  contacto: [],
};

function init(): State {
  return { entered: false, data: EMPTY, log: [], seq: 0 };
}

interface AdminValue {
  state: State;
  enter: () => void;
  create: (module: TableModule, row: AdminRow, label: string) => void;
  update: (module: TableModule, row: AdminRow, label: string) => void;
  toggle: (module: TableModule, id: string, label: string) => void;
  setMenus: (menus: MenuRow[], label: string) => void;
  reset: () => void;
}

const AdminContext = createContext<AdminValue | null>(null);

export function useAdmin() {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error("useAdmin debe usarse dentro de <AdminProvider>");
  return ctx;
}

function AdminStore({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, init);
  const toast = useToast();

  const notify = useCallback(
    (title: string) => toast({ title, description: "Cambio simulado · no persistente" }),
    [toast],
  );

  const value = useMemo<AdminValue>(
    () => ({
      state,
      enter: () => dispatch({ type: "enter" }),
      create: (module, row, label) => {
        dispatch({ type: "create", module, row, label });
        notify(`Agregado: ${label}`);
      },
      update: (module, row, label) => {
        dispatch({ type: "update", module, row, label });
        notify(`Guardado: ${label}`);
      },
      toggle: (module, id, label) => {
        dispatch({ type: "toggle", module, id, label });
        notify(`Visibilidad cambiada: ${label}`);
      },
      setMenus: (menus, label) => {
        dispatch({ type: "menus", menus, label });
        notify(label);
      },
      reset: () => {
        dispatch({ type: "reset" });
        toast({
          title: "Demo restablecida",
          description: "Todos los módulos volvieron a sus datos iniciales.",
        });
      },
    }),
    [state, notify, toast],
  );

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
}

/**
 * Estado único del admin (useReducer). Se conserva al navegar entre módulos y
 * se pierde al recargar o salir al sitio público. No toca el sitio público.
 */
export function AdminProvider({ children }: { children: React.ReactNode }) {
  return (
    <ToastProvider>
      <AdminStore>{children}</AdminStore>
    </ToastProvider>
  );
}
