"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { fadeUp, fadeOnly } from "@/animations/variants";

interface RevealProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Delay before this element reveals (seconds). */
  delay?: number;
  /** Render as a different element (e.g. "li", "span"). */
  as?: keyof typeof motion;
  /** Only animate once (default true). */
  once?: boolean;
}

/**
 * Wrap any block to give it the standard scroll-in reveal: fade + slide-up
 * + blur→sharp. Automatically collapses to a plain fade under
 * prefers-reduced-motion. Triggers when ~20% is in view.
 */
export function Reveal({
  children,
  delay = 0,
  once = true,
  className,
  ...props
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, amount: 0.2 });
  const reduced = useReducedMotion();

  const variants = reduced ? fadeOnly : fadeUp;

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={variants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      transition={{ delay }}
      {...(props as object)}
    >
      {children}
    </motion.div>
  );
}
