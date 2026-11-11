import { useId } from "react";
import { cn } from "@/lib/utils";

const control =
  "block w-full min-h-12 rounded-[4px] border border-ink/20 bg-cream px-4 py-3 text-base text-ink placeholder:text-ink-muted transition-colors focus-visible:border-accent-text disabled:cursor-not-allowed disabled:bg-sand/50 disabled:text-ink-muted";

export function Input({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn(control, className)} {...props} />;
}

export function Textarea({
  className,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className={cn(control, "min-h-32", className)} {...props} />;
}

export function Select({
  className,
  options,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement> & {
  options: { value: string; label: string }[];
}) {
  return (
    <select className={cn(control, className)} {...props}>
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
}

interface ControlProps {
  id: string;
  "aria-describedby"?: string;
}

/**
 * Campo con etiqueta y ayuda. El control recibe `id` y `aria-describedby`:
 *   <Field label="Nombre">{(p) => <Input {...p} />}</Field>
 * En el demo se usa en modo lectura o simulado.
 */
export function Field({
  label,
  hint,
  className,
  children,
}: {
  label: string;
  hint?: string;
  className?: string;
  children: (props: ControlProps) => React.ReactNode;
}) {
  const id = useId();
  const hintId = hint ? `${id}-hint` : undefined;
  return (
    <div className={cn("space-y-2", className)}>
      <label htmlFor={id} className="block text-small font-semibold text-ink">
        {label}
      </label>
      {children({ id, "aria-describedby": hintId })}
      {hint && (
        <p id={hintId} className="text-small text-ink-muted">
          {hint}
        </p>
      )}
    </div>
  );
}
