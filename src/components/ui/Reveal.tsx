"use client";

import { useReveal } from "@/hooks/useReveal";

/** Envoltorio que aplica el revelado al entrar en viewport. */
export function Reveal({
  delay = 0,
  className,
  children,
}: {
  delay?: number;
  className?: string;
  children: React.ReactNode;
}) {
  const ref = useReveal<HTMLDivElement>(delay);
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
