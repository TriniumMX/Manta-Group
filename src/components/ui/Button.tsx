import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "link" | "inverse";
type Size = "sm" | "md" | "lg";

const base =
  "group/button inline-flex items-center justify-center gap-2 font-sans font-semibold whitespace-nowrap transition-colors duration-200 disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  // Texto crema sobre accent-text: ≥ 5.5:1 en todas las marcas.
  primary: "rounded-[4px] bg-accent-text text-cream hover:bg-ink",
  secondary:
    "rounded-[4px] border border-ink/25 bg-transparent text-ink hover:border-ink hover:bg-cream",
  ghost: "rounded-[4px] text-ink hover:bg-ink/5",
  link: "text-accent-text link-underline px-0 min-h-0",
  // Para secciones oscuras (tone="ink").
  inverse: "rounded-[4px] bg-cream text-ink hover:bg-sand",
};

const sizes: Record<Size, string> = {
  sm: "min-h-11 px-4 text-small",
  md: "min-h-12 px-6 text-[0.9375rem]",
  lg: "min-h-14 px-8 text-base",
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  /** Icono Lucide a la derecha (se desplaza 4 px en hover). */
  icon?: LucideIcon;
  /** Icono Lucide a la izquierda. */
  iconLeft?: LucideIcon;
  className?: string;
  children: React.ReactNode;
}

type ButtonAsButton = CommonProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps> & { href?: undefined };
type ButtonAsLink = CommonProps &
  Omit<React.ComponentProps<typeof Link>, keyof CommonProps | "href"> & { href: string };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

export function buttonClasses({
  variant = "primary",
  size = "md",
  className,
}: {
  variant?: Variant;
  size?: Size;
  className?: string;
}) {
  return cn(base, variants[variant], variant !== "link" && sizes[size], className);
}

/** Botón o enlace con el mismo aspecto. Con `href` renderiza `next/link`. */
export function Button(props: ButtonProps) {
  const { variant, size, icon: Icon, iconLeft: IconLeft, className, children, ...rest } = props;
  const classes = buttonClasses({ variant, size, className });
  const content = (
    <>
      {IconLeft && <IconLeft aria-hidden className="size-4 shrink-0" />}
      <span>{children}</span>
      {Icon && (
        <Icon
          aria-hidden
          className="size-4 shrink-0 transition-transform duration-300 group-hover/button:translate-x-1"
        />
      )}
    </>
  );

  if (typeof rest.href === "string") {
    const linkProps = rest as Omit<ButtonAsLink, keyof CommonProps>;
    return (
      <Link className={classes} {...linkProps}>
        {content}
      </Link>
    );
  }

  const buttonProps = rest as Omit<ButtonAsButton, keyof CommonProps>;
  return (
    <button type="button" className={classes} {...buttonProps}>
      {content}
    </button>
  );
}
