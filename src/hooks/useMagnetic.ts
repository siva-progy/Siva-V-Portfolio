"use client";

import { useRef } from "react";
import { useMotionValue, useSpring } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * Magnetic pull: an element drifts slightly toward the cursor while hovered,
 * then springs back on leave. Returns a ref, spring-backed x/y motion values,
 * and handlers to spread on the element. Disabled under reduced-motion and
 * on coarse pointers (handlers become no-ops).
 *
 * @param strength Max travel in px (default 12).
 */
export function useMagnetic(strength = 12) {
  const ref = useRef<HTMLElement | null>(null);
  const reduced = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 250, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 250, damping: 18, mass: 0.4 });

  const onMouseMove = (e: React.MouseEvent) => {
    if (reduced || !ref.current) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const rect = ref.current.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    // Clamp to strength.
    x.set(Math.max(-strength, Math.min(strength, relX * 0.4)));
    y.set(Math.max(-strength, Math.min(strength, relY * 0.4)));
  };

  const onMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return { ref, x: sx, y: sy, onMouseMove, onMouseLeave, enabled: !reduced };
}
