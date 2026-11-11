import { notFound } from "next/navigation";
import { ADMIN_MODULES, getModule } from "@/components/admin/config";
import { ModuleView } from "@/components/admin/ModuleViews";

export function generateStaticParams() {
  return ADMIN_MODULES.map((m) => ({ module: m.id }));
}

export default async function AdminModulePage({ params }: { params: Promise<{ module: string }> }) {
  const { module } = await params;
  const meta = getModule(module);
  if (!meta) notFound();
  return <ModuleView module={meta.id} />;
}
