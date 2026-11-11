import { Eyebrow, Heading } from "@/components/ui/Typography";
import { cn } from "@/lib/utils";
import { Breadcrumb, type Crumb } from "./Breadcrumb";
import { Container } from "./Container";

/** Encabezado tipográfico de página interna (sin imagen). */
export function PageHeader({
  eyebrow,
  title,
  lead,
  breadcrumb,
  className,
  children,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  breadcrumb?: Crumb[];
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <Container className={cn("pt-6 pb-16 md:pt-10 md:pb-24", className)}>
      {breadcrumb && <Breadcrumb items={breadcrumb} />}
      <div className="mt-10 max-w-4xl md:mt-16">
        {eyebrow && <Eyebrow tone="accent">{eyebrow}</Eyebrow>}
        <Heading level="h1" className="mt-4">
          {title}
        </Heading>
        {lead && <p className="mt-6 max-w-[60ch] text-body text-ink-soft">{lead}</p>}
        {children && <div className="mt-8 flex flex-wrap gap-3">{children}</div>}
      </div>
    </Container>
  );
}
