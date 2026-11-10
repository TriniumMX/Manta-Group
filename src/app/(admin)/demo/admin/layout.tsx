// AdminShell propio (sin header/footer públicos). Se completa en el bloque 8.
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <div role="status" className="bg-black px-4 py-2 text-sm text-white">
        Modo demostración · sin guardado real
      </div>
      {children}
    </div>
  );
}
