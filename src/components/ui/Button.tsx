"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { transitionStandard } from "@/animations/variants";

type ButtonVariant = "primary" | "secondary" | "ghost" | "icon";
type ButtonSize = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 font-medium rounded-md " +
  "select-none transition-colors duration-150 disabled:pointer-events-none " +
  "disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 " +
  "focus-visible:outline-accent";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-accent text-[#04121b] surface-raise hover:bg-accent-hover " +
    "font-semibold",
  secondary:
    "bg-surface text-text border border-border surface-raise " +
    "hover:bg-surface-2",
  ghost: "bg-transparent text-muted hover:text-accent",
  icon:
    "bg-surface text-muted border border-border hover:text-text " +
    "hover:bg-surface-2 rounded-full",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-caption",
  md: "h-11 px-6 text-body",
  lg: "h-13 px-8 text-body-lg",
};

const iconSizes: Record<ButtonSize, string> = {
  sm: "h-9 w-9",
  md: "h-11 w-11",
  lg: "h-12 w-12",
};

interface ButtonProps
  extends Omit<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    "onAnimationStart" | "onDragStart" | "onDragEnd" | "onDrag"
  > {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Render as an <a> when href is provided. */
  href?: string;
  external?: boolean;
}

/**
 * Premium button. Subtle press feedback (scale 0.98) via Framer Motion,
 * soft-skeuomorphic raise on filled variants. Renders as <a> if `href`
 * is set — keeps CTAs semantic and keyboard-accessible.
 */
export function Button({
  variant = "primary",
  size = "md",
  href,
  external,
  className,
  children,
  ...props
}: ButtonProps) {
  const classes = cn(
    base,
    variants[variant],
    variant === "icon" ? iconSizes[size] : sizes[size],
    className,
  );

  const motionProps = {
    whileTap: { scale: 0.98 },
    transition: transitionStandard,
  };

  if (href) {
    const rel = external ? "noopener noreferrer" : undefined;
    const target = external ? "_blank" : undefined;
    return (
      <motion.a
        href={href}
        rel={rel}
        target={target}
        className={classes}
        {...motionProps}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button className={classes} {...motionProps} {...props}>
      {children}
    </motion.button>
  );
}
