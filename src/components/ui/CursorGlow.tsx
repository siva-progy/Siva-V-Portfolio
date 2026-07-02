"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * App-wide cursor glow (desktop only). A soft accent radial that trails the
 * pointer with spring damping, fixed above the ambient background but below
 * content. Distinct from section-local MouseGlow (used for emphasis in
 * specific sections) — this is the global ambient cursor light.
 *
 * Lazy: does nothing until the first pointer move on a fine-pointer device,
 * and renders nothing under reduced-motion or on touch. Only transform
 * animates (GPU).
 */
export function CursorGlow({ size = 360 }: { size?: number }) {
  const reduced = useReducedMotion();
  const [active, setActive] = useState(false);
  const x = useMotionValue(-9999);
  const y = useMotionValue(-9999);
  const sx = useSpring(x, { stiffness: 150, damping: 30, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 150, damping: 30, mass: 0.5 });

  useEffect(() => {
    if (reduced) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const onMove = (e: MouseEvent) => {
      if (!active) setActive(true);
      x.set(e.clientX - size / 2);
      y.set(e.clientY - size / 2);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [reduced, active, size, x, y]);

  if (reduced || !active) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed z-[2] rounded-full will-change-transform"
      style={{
        x: sx,
        y: sy,
        width: size,
        height: size,
        background:
          "radial-gradient(circle, color-mix(in oklab, var(--color-accent) 8%, transparent) 0%, transparent 70%)",
      }}
    />
  );
}
