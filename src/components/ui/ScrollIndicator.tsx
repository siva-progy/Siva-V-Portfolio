"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { EASE_PREMIUM } from "@/animations/variants";
import { cn } from "@/lib/utils";

/**
 * Hero scroll cue: a slim capsule with a dot that glides down and fades,
 * inviting the first scroll. Calm, looping, and non-distracting. Under
 * reduced-motion it renders as a static, still capsule.
 */
export function ScrollIndicator({ className }: { className?: string }) {
  const reduced = useReducedMotion();

  return (
    <div
      className={cn("flex flex-col items-center gap-3", className)}
      aria-hidden="true"
    >
      <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-subtle">
        Scroll
      </span>
      <span className="flex h-9 w-5 justify-center rounded-full border border-border pt-1.5">
        <motion.span
          className="h-1.5 w-1.5 rounded-full bg-accent"
          animate={reduced ? {} : { y: [0, 10, 0], opacity: [1, 0.3, 1] }}
          transition={
            reduced
              ? undefined
              : { duration: 1.8, ease: EASE_PREMIUM, repeat: Infinity }
          }
        />
      </span>
    </div>
  );
}
