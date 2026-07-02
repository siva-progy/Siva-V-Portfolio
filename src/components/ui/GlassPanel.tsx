import { cn } from "@/lib/utils";

/**
 * Frosted-glass surface. Used sparingly (navbar, overlays) per the design
 * system — glass is an accent, not a default. Combines the .glass utility
 * (backdrop blur + translucent bg) with a hairline border.
 */
export function GlassPanel({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "glass rounded-lg border border-border/60 shadow-[var(--shadow-md)]",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
