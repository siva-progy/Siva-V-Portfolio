"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { transitionStandard } from "@/animations/variants";

type CardVariant = "default" | "raised" | "outline";

const variants: Record<CardVariant, string> = {
  default: "bg-surface border border-border shadow-[var(--shadow-md)]",
  raised: "bg-surface-2 surface-raise-lg",
  outline: "bg-transparent border border-border",
};

interface CardProps
  extends Omit<
    React.HTMLAttributes<HTMLDivElement>,
    "onAnimationStart" | "onDragStart" | "onDragEnd" | "onDrag"
  > {
  variant?: CardVariant;
  /** Enable the hover lift (translateY -4px + shadow grow). */
  interactive?: boolean;
}

/**
 * Surface primitive with soft-skeuomorphic depth. When `interactive`, it
 * lifts gently on hover — the signature premium micro-interaction. Lift is
 * disabled under prefers-reduced-motion.
 */
export function Card({
  variant = "default",
  interactive = false,
  className,
  children,
  ...props
}: CardProps) {
  const reduced = useReducedMotion();
  const enableLift = interactive && !reduced;

  return (
    <motion.div
      className={cn("rounded-lg", variants[variant], className)}
      whileHover={enableLift ? { y: -4 } : undefined}
      transition={transitionStandard}
      style={
        enableLift
          ? ({ willChange: "transform" } as React.CSSProperties)
          : undefined
      }
      {...(props as object)}
    >
      {children}
    </motion.div>
  );
}
