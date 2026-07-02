import { iconMap } from "@/lib/icons";
import { cn } from "@/lib/utils";
import type { SocialLink } from "@/types";

interface SocialLinksProps {
  links: SocialLink[];
  className?: string;
  /** Icon button size in px. */
  size?: number;
}

/**
 * Reusable row of social icon links. Data-driven (icons resolved by key),
 * so it's shared by Hero, Contact, and Footer. Each link is a proper
 * labelled anchor for screen readers.
 */
export function SocialLinks({ links, className, size = 18 }: SocialLinksProps) {
  return (
    <ul className={cn("flex items-center gap-2", className)}>
      {links.map((link) => {
        const Icon = iconMap[link.icon];
        const isMail = link.href.startsWith("mailto:");
        return (
          <li key={link.label}>
            <a
              href={link.href}
              aria-label={link.label}
              target={isMail ? undefined : "_blank"}
              rel={isMail ? undefined : "noopener noreferrer"}
              className={cn(
                "inline-flex h-11 w-11 items-center justify-center rounded-full",
                "border border-border bg-surface text-muted",
                "transition-colors duration-150 hover:text-accent hover:bg-surface-2",
                "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
              )}
            >
              <Icon size={size} aria-hidden="true" />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
