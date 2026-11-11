import type { Metadata } from "next";
import { AdminShell } from "@/components/admin/AdminShell";

export const metadata: Metadata = {
  title: { default: "Administrador (demo)", template: "%s · Admin demo · Manta Group" },
  robots: { index: false, follow: false },
};

// Layout propio del admin (sin header/footer públicos). El estado del admin vive
// en AdminShell: se conserva entre módulos y se pierde al recargar.
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AdminShell>{children}</AdminShell>;
}
