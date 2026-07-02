import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Show a small pulsing status dot (e.g. "available"). */
  dot?: boolean;
}

/**
 * Small status badge — used for availability ("Open to roles"), "Featured",
 * etc. The optional dot uses a soft ping to draw a calm amount of attention.
 */
export function Badge({ dot = false, className, children, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-border",
        "bg-surface px-3 py-1 text-caption text-muted",
        className,
      )}
      {...props}
    >
      {dot && (
        <span className="relative flex h-2 w-2" aria-hidden="true">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60 motion-reduce:hidden" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
        </span>
      )}
      {children}
    </span>
  );
}
