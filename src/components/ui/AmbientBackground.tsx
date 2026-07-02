"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * Site-wide ambient background: a fixed gradient-mesh wash plus two very
 * slow, softly-drifting light reflections. Sits behind all content (z-0,
 * fixed) so every section shares one coherent lighting environment instead
 * of each having its own blobs.
 *
 * Performance: only `transform`/`opacity` animate (GPU-composited); the
 * mesh itself is a static radial-gradient paint. Motion is long-duration
 * and low-frequency (no per-frame JS). Fully static under reduced-motion.
 * Decorative + aria-hidden.
 *
 * Note: section-local BackgroundLayers (Hero) still provides mouse-parallax
 * depth up close; this is the ambient layer beneath everything.
 */
export function AmbientBackground() {
  const reduced = useReducedMotion();

  const drift = reduced
    ? {}
    : {
        animate: {
          x: [0, 40, -20, 0],
          y: [0, -30, 20, 0],
        },
        transition: {
          duration: 34,
          ease: "easeInOut" as const,
          repeat: Infinity,
        },
      };

  const drift2 = reduced
    ? {}
    : {
        animate: {
          x: [0, -30, 25, 0],
          y: [0, 25, -15, 0],
        },
        transition: {
          duration: 42,
          ease: "easeInOut" as const,
          repeat: Infinity,
        },
      };

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {/* Static gradient-mesh wash — theme-aware via accent token. */}
      <div
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "radial-gradient(60% 50% at 20% 15%, color-mix(in oklab, var(--color-accent) 10%, transparent) 0%, transparent 60%), radial-gradient(55% 45% at 85% 30%, color-mix(in oklab, var(--color-accent) 7%, transparent) 0%, transparent 55%), radial-gradient(50% 50% at 60% 95%, color-mix(in oklab, var(--color-text) 4%, transparent) 0%, transparent 60%)",
        }}
      />

      {/* Slow light reflections (GPU transforms only). */}
      <motion.div
        {...drift}
        className="absolute -left-[10%] top-[5%] h-[45vmax] w-[45vmax] rounded-full bg-accent/10 blur-[100px] will-change-transform"
      />
      <motion.div
        {...drift2}
        className="absolute -right-[8%] top-[40%] h-[38vmax] w-[38vmax] rounded-full bg-accent/[0.07] blur-[110px] will-change-transform"
      />
    </div>
  );
}
