"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { EASE_PREMIUM } from "@/animations/variants";
import { cn } from "@/lib/utils";

/**
 * A hairline divider that draws itself in (scaleX 0 -> 1 from the left) as it
 * enters view, with a soft accent gradient. Purposeful: signals section
 * boundaries without a hard rule. Renders as a static line under
 * reduced-motion.
 */
export function AnimatedDivider({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 1 });
  const reduced = useReducedMotion();

  return (
    <div
      ref={ref}
      className={cn("h-px w-full overflow-hidden", className)}
      aria-hidden="true"
    >
      <motion.div
        className="h-px w-full origin-left bg-gradient-to-r from-transparent via-border to-transparent"
        initial={reduced ? { scaleX: 1 } : { scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.8, ease: EASE_PREMIUM }}
      />
    </div>
  );
}
