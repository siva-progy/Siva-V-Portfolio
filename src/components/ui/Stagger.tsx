"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { staggerContainer, fadeUp, fadeOnly } from "@/animations/variants";

interface StaggerProps extends React.HTMLAttributes<HTMLDivElement> {
  once?: boolean;
}

/**
 * Parent that reveals its <StaggerItem> children in sequence (60ms apart).
 * Use for grids and lists — skill chips, project cards, timeline items.
 */
export function Stagger({
  children,
  once = true,
  className,
  ...props
}: StaggerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, amount: 0.15 });

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={staggerContainer}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      {...(props as object)}
    >
      {children}
    </motion.div>
  );
}

/** Child of <Stagger>. Inherits the parent's staggered timing. */
export function StaggerItem({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      variants={reduced ? fadeOnly : fadeUp}
      {...(props as object)}
    >
      {children}
    </motion.div>
  );
}
