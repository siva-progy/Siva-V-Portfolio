"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface MouseGlowProps {
  /** Diameter of the glow in px. */
  size?: number;
  /** Opacity 0..1 of the glow at center. */
  intensity?: number;
}

/**
 * A large, very soft radial glow in the accent color that trails the cursor
 * with spring damping. Adds subtle depth/life to a section without any hard
 * motion. Fully hidden under reduced-motion and on touch (no cursor).
 *
 * Place inside a `position: relative; overflow: hidden` parent.
 */
export function MouseGlow({ size = 480, intensity = 0.1 }: MouseGlowProps) {
  const reduced = useReducedMotion();
  const x = useMotionValue(-9999);
  const y = useMotionValue(-9999);
  const sx = useSpring(x, { stiffness: 120, damping: 25, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 120, damping: 25, mass: 0.4 });

  useEffect(() => {
    if (reduced) return;
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine) return;

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX - size / 2);
      y.set(e.clientY - size / 2);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [reduced, size, x, y]);

  if (reduced) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed z-0 rounded-full motion-reduce:hidden"
      style={{
        x: sx,
        y: sy,
        width: size,
        height: size,
        background: `radial-gradient(circle, color-mix(in oklab, var(--color-accent) ${intensity * 100}%, transparent) 0%, transparent 70%)`,
      }}
    />
  );
}
