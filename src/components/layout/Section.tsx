import { cn } from "@/lib/utils";
import { Container } from "./Container";

interface SectionProps {
  /** Anchor id used by nav links, e.g. "projects" */
  id: string;
  /** Mono label / section number, e.g. "01" */
  index?: string;
  /** Section eyebrow label, e.g. "ABOUT" */
  eyebrow?: string;
  /** Section heading */
  title?: string;
  /** Optional lead paragraph under the title */
  lead?: string;
  /** Container width for the section content */
  width?: "prose" | "content" | "wide" | "full";
  /** Extra classes on the <section> element */
  className?: string;
  /** Center the header block */
  centered?: boolean;
  children: React.ReactNode;
}

/**
 * The section shell used by every content section. Enforces consistent
 * vertical rhythm (clamp(6rem,12vh,10rem)) and a uniform header treatment
 * — this is what makes each section read like a premium product page.
 *
 * Header animation wiring is added in Phase 6; markup is animation-ready
 * (semantic, single header block) here in Phase 3.
 */
export function Section({
  id,
  index,
  eyebrow,
  title,
  lead,
  width = "wide",
  className,
  centered = false,
  children,
}: SectionProps) {
  const hasHeader = index || eyebrow || title || lead;

  return (
    <section
      id={id}
      className={cn(
      "scroll-mt-24 py-[clamp(6rem,12vh,10rem)]",
      className,
    )}
      aria-labelledby={title ? `${id}-heading` : undefined}
    >
      <Container width={width}>
        {hasHeader && (
          <header
            className={cn(
              "mb-[clamp(2rem,4vh,3rem)] flex flex-col gap-2",
              centered && "items-center text-center",
            )}
          >
            {(index || eyebrow) && (
              <div className="flex items-center gap-3 font-mono text-sm font-semibold uppercase tracking-[0.18em] text-accent">
                {index && <span className="text-accent">{index}</span>}
                {eyebrow && <span>{eyebrow}</span>}
              </div>
            )}
            {title && (
              <h2
                id={`${id}-heading`}
                className="max-w-[18ch] text-[clamp(2.8rem,5vw,4.8rem)] font-semibold leading-[1.05] tracking-tight text-text">
                {title}
              </h2>
            )}
            {lead && (
              <p className="max-w-[62ch] text-lg leading-8 text-muted">
                {lead}
              </p>
            )}
          </header>
        )}
        {children}
      </Container>
    </section>
  );
}
