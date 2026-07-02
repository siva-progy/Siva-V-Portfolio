import { cn } from "@/lib/utils";

/**
 * Personal monogram derived from a name (initials). Used as a lightweight
 * logo mark in the footer and navbar. Soft skeuomorphic tile with the
 * accent as a subtle highlight. Purely presentational.
 */
export function Monogram({
  name,
  className,
  size = 44,
}: {
  name: string;
  className?: string;
  size?: number;
}) {
  const initials = name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("");

  return (
    <span
      aria-hidden="true"
      style={{ width: size, height: size }}
      className={cn(
        "inline-flex items-center justify-center rounded-lg border border-border bg-surface-2 font-semibold tracking-tight text-text surface-raise",
        className,
      )}
    >
      {initials}
    </span>
  );
}
