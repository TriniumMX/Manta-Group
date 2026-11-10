import type { Metadata } from "next";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: { default: "Manta Group", template: "%s · Manta Group" },
  description: "Demo web corporativo multimarca de Manta Group.",
};

// Layout raíz mínimo: sin header ni footer (viven en (site)/layout.tsx).
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-MX">
      <body>{children}</body>
    </html>
  );
}
