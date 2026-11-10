import Link from "next/link";

export default function AdminNotFound() {
  return (
    <section className="p-8">
      <h1 className="text-2xl font-semibold">Módulo no encontrado</h1>
      <Link href="/demo/admin" className="underline">
        Volver al dashboard
      </Link>
    </section>
  );
}
