"use client";

import { motion } from "framer-motion";
import { useMagnetic } from "@/hooks/useMagnetic";
import { cn } from "@/lib/utils";

interface MagneticButtonProps {
  href?: string;
  external?: boolean;
  className?: string;
  children: React.ReactNode;
  strength?: number;
}

/**
 * A button/link with a subtle magnetic pull toward the cursor (spring-backed,
 * reduced-motion + touch safe via useMagnetic). Renders as <a> when href is
 * given. Style is passed via className so it can match any variant.
 */
export function MagneticButton({
  href,
  external,
  className,
  children,
  strength = 12,
}: MagneticButtonProps) {
  const { ref, x, y, onMouseMove, onMouseLeave } = useMagnetic(strength);

  const common = {
    style: { x, y },
    onMouseMove,
    onMouseLeave,
    className: cn(
      "inline-flex items-center justify-center gap-2",
      className,
    ),
  };

  if (href) {
    return (
      <motion.a
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        {...common}
      >
        {children}
      </motion.a>
    );
  }
  return (
    <motion.button ref={ref as React.Ref<HTMLButtonElement>} {...common}>
      {children}
    </motion.button>
  );
}
