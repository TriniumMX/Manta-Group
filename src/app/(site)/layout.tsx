import { PublicShell } from "@/components/layout/PublicShell";

// Shell público. El admin vive en el grupo (admin) y no hereda este layout.
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return <PublicShell>{children}</PublicShell>;
}
