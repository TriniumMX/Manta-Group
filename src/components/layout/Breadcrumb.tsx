import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Crumb {
  label: string;
  href?: string;
}

/** Ruta de navegación. El último elemento es la página actual. */
export function Breadcrumb({ items, className }: { items: Crumb[]; className?: string }) {
  return (
    <nav aria-label="Ruta de navegación" className={cn("text-small", className)}>
      <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-ink-muted">
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <li key={`${item.label}-${i}`} className="flex items-center gap-1.5">
              {item.href && !last ? (
                <Link href={item.href} className="link-underline py-2 hover:text-ink">
                  {item.label}
                </Link>
              ) : (
                <span aria-current={last ? "page" : undefined} className="font-semibold text-ink">
                  {item.label}
                </span>
              )}
              {!last && <ChevronRight aria-hidden className="size-3.5 text-stone" />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
