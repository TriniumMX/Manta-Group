import Link from "next/link";

export default function NotFound() {
  return (
    <main className="p-8">
      <h1 className="text-2xl font-semibold">Página no encontrada</h1>
      <Link href="/" className="underline">
        Ir al inicio
      </Link>
    </main>
  );
}
