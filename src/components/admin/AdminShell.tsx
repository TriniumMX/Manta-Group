"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeft, ArrowRight, Info, RotateCcw } from "lucide-react";
import { BRANDS } from "@/config/brands";
import { SITE } from "@/config/site";
import { Button } from "@/components/ui/Button";
import { Dialog } from "@/components/ui/Dialog";
import { cn } from "@/lib/utils";
import { AdminProvider, useAdmin } from "./AdminProvider";
import { ADMIN_MODULES, DASHBOARD, moduleHref } from "./config";

function Nav({ className, onNavigate }: { className?: string; onNavigate?: () => void }) {
  const pathname = usePathname();
  const items = [
    { href: DASHBOARD.href, label: DASHBOARD.label, icon: DASHBOARD.icon },
    ...ADMIN_MODULES.map((m) => ({ href: moduleHref(m.id), label: m.label, icon: m.icon })),
  ];
  return (
    <nav aria-label="Módulos del administrador" className={className}>
      <ul className="flex gap-1 lg:flex-col">
        {items.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <li key={href} className="shrink-0">
              <Link
                href={href}
                onClick={onNavigate}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex min-h-11 items-center gap-3 rounded-full px-4 text-small font-semibold transition-colors lg:rounded-[0.875rem]",
                  active ? "bg-ink text-cream" : "text-ink-soft hover:bg-ink/5 hover:text-ink",
                )}
              >
                <Icon aria-hidden className="size-4.5 shrink-0" strokeWidth={1.75} />
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

/** Pantalla de entrada decorativa: deja claro que no hay autenticación. */
function EntryScreen() {
  const { enter } = useAdmin();
  return (
    <div className="tone-ink relative flex min-h-dvh items-center justify-center overflow-hidden bg-ink px-4 py-16 text-cream">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:linear-gradient(var(--color-cream)_1px,transparent_1px),linear-gradient(90deg,var(--color-cream)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]"
      />
      <div className="relative w-full max-w-md animate-dialog-in rounded-[2rem] bg-cream/[0.06] p-8 text-center ring-1 ring-cream/15 backdrop-blur-xl md:p-10">
        <ul aria-hidden className="flex justify-center gap-2">
          {BRANDS.map((b) => (
            <li
              key={b.slug}
              data-brand={b.slug}
              className="size-2.5 rounded-full bg-accent ring-1 ring-cream/30"
            />
          ))}
        </ul>
        <h1 className="mt-6 font-serif text-[2.5rem] leading-none font-light tracking-[-0.03em] [font-variation-settings:'SOFT'_100]">
          {SITE.name}
        </h1>
        <p className="mt-2 text-small font-semibold text-sand">Panel de administración</p>
        <p className="mt-6 text-body text-sand">
          Vista demostrativa: no hay inicio de sesión y nada se guarda. Los cambios se pierden al
          recargar y no afectan al sitio público.
        </p>
        <Button
          onClick={enter}
          variant="inverse"
          size="lg"
          icon={ArrowRight}
          className="mt-8 w-full"
        >
          Entrar al demo
        </Button>
        <Link
          href="/"
          className="mt-4 inline-flex min-h-11 items-center gap-2 text-small text-sand hover:text-cream"
        >
          <ArrowLeft aria-hidden className="size-4" />
          Volver al sitio
        </Link>
      </div>
    </div>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  const { state, reset } = useAdmin();
  const [confirm, setConfirm] = useState(false);

  if (!state.entered) return <EntryScreen />;

  return (
    <div className="min-h-dvh bg-ivory lg:grid lg:grid-cols-[17rem_1fr]">
      {/* Barra lateral (escritorio) */}
      <aside className="hidden border-r border-ink/8 bg-cream lg:sticky lg:top-0 lg:flex lg:h-dvh lg:flex-col lg:p-5">
        <Link href="/demo/admin" className="flex items-center gap-3 px-2 py-2">
          <span className="inline-flex size-10 items-center justify-center rounded-[0.75rem] bg-ink font-serif text-[1.125rem] text-cream">
            MG
          </span>
          <span>
            <span className="block font-serif text-[1.25rem] leading-none">{SITE.name}</span>
            <span className="text-small text-ink-muted">Admin demo</span>
          </span>
        </Link>
        <Nav className="mt-8" />
        <div className="mt-auto space-y-2">
          <button
            type="button"
            onClick={() => setConfirm(true)}
            className="flex min-h-11 w-full items-center gap-3 rounded-[0.875rem] px-4 text-small font-semibold text-ink-soft transition-colors hover:bg-ink/5 hover:text-ink"
          >
            <RotateCcw aria-hidden className="size-4.5" />
            Restablecer demo
          </button>
          <Link
            href="/"
            className="flex min-h-11 items-center gap-3 rounded-[0.875rem] px-4 text-small font-semibold text-ink-soft transition-colors hover:bg-ink/5 hover:text-ink"
          >
            <ArrowLeft aria-hidden className="size-4.5" />
            Ver sitio público
          </Link>
        </div>
      </aside>

      <div className="min-w-0">
        {/* Aviso permanente + acciones (siempre visibles) */}
        <div className="sticky top-0 z-30 border-b border-ink/8 bg-ivory/85 backdrop-blur-xl">
          <div className="flex items-center justify-between gap-3 px-4 py-3 md:px-8">
            <p role="status" className="flex items-center gap-2 text-small text-ink-soft">
              <Info aria-hidden className="size-4 shrink-0 text-accent-text" />
              <span>
                <strong className="font-semibold text-ink">Vista demostrativa.</strong>{" "}
                <span className="hidden sm:inline">
                  Los cambios se pierden al recargar y no afectan al sitio público.
                </span>
              </span>
            </p>
            <button
              type="button"
              onClick={() => setConfirm(true)}
              className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full border border-ink/15 bg-cream px-4 text-small font-semibold transition-colors hover:border-ink lg:hidden"
            >
              <RotateCcw aria-hidden className="size-4" />
              Restablecer
            </button>
          </div>
          <Nav className="scrollbar-none overflow-x-auto px-4 pb-3 md:px-8 lg:hidden" />
        </div>

        <main id="admin-contenido" className="px-4 py-8 md:px-8 md:py-10 lg:px-12">
          {children}
        </main>
      </div>

      <Dialog
        open={confirm}
        onClose={() => setConfirm(false)}
        title="¿Restablecer la demo?"
        size="sm"
        footer={
          <div className="flex flex-wrap justify-end gap-2">
            <Button variant="secondary" onClick={() => setConfirm(false)}>
              Cancelar
            </Button>
            <Button
              onClick={() => {
                reset();
                setConfirm(false);
              }}
              iconLeft={RotateCcw}
            >
              Restablecer
            </Button>
          </div>
        }
      >
        <p className="text-body text-ink-soft">
          Todos los módulos vuelven a sus datos iniciales, los contadores se reinician y el registro
          de cambios se vacía.
        </p>
      </Dialog>
    </div>
  );
}

/** Contenedor del admin: estado único + barra lateral, aviso y restablecer. */
export function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <AdminProvider>
      <Shell>{children}</Shell>
    </AdminProvider>
  );
}
