import { cn } from "@/lib/utils";

interface ChipProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Accent-tinted style for emphasis (skill chips). */
  accent?: boolean;
}

/**
 * Skill / tag chip. No progress bars or percentages (per design spec) —
 * just a clean pill. `accent` gives the electric-blue tinted fill.
 */
export function Chip({ accent = false, className, children, ...props }: ChipProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3.5 py-1.5",
        "text-caption font-medium transition-colors duration-150",
        accent
          ? "bg-accent-muted border-transparent text-accent"
          : "bg-surface border-border text-muted hover:text-text hover:bg-surface-2",
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}
