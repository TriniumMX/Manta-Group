import { notFound } from "next/navigation";

const MODULES = ["marcas", "productos", "menus", "servicios", "cursos", "galerias", "contacto"];

export function generateStaticParams() {
  return MODULES.map((module) => ({ module }));
}

export default async function AdminModulePage({ params }: { params: Promise<{ module: string }> }) {
  const { module } = await params;
  if (!MODULES.includes(module)) notFound();
  return (
    <section className="p-8">
      <h1 className="text-2xl font-semibold capitalize">{module}</h1>
    </section>
  );
}
