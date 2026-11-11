import type { Metadata } from "next";
import Link from "next/link";
import { BrandMark } from "@/components/brand/BrandMark";

export const metadata: Metadata = {
  title: { default: "Administrador (demo)", template: "%s · Admin demo · Manta Group" },
  robots: { index: false, follow: false },
};

// Layout propio del admin (sin header/footer ni skip link públicos).
// El AdminShell completo (sidebar, AdminProvider, reset) llega en el bloque 8.
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh bg-cream">
      <div className="tone-ink flex flex-wrap items-center justify-between gap-3 bg-ink px-4 py-3 text-cream md:px-10">
        <Link href="/demo/admin" className="inline-flex min-h-11 items-center gap-3">
          <BrandMark variant="header" />
          <span className="text-eyebrow text-stone">Admin</span>
        </Link>
        <p role="status" className="text-small text-sand">
          Modo demostración · sin guardado real
        </p>
      </div>
      <main id="admin-contenido">{children}</main>
    </div>
  );
}
