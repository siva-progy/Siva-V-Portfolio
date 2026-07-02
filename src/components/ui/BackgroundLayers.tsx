"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

/**
 * Ambient background: large, heavily-blurred accent/neutral blobs that drift
 * subtly with the mouse to create depth (max ~12px travel, spring-damped).
 * Purely decorative, aria-hidden, disabled under reduced-motion / touch.
 *
 * Sits behind content in a `position: relative` section whose foreground is
 * given a higher z-index. Blob transforms are declared at the top level (not
 * in a loop) to respect the Rules of Hooks.
 */
export function BackgroundLayers({ className }: { className?: string }) {
  const reduced = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 20, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 60, damping: 20, mass: 0.6 });

  // Depth-scaled transforms, declared once (stable hook order).
  const x1 = useTransform(sx, (v) => v * 1);
  const y1 = useTransform(sy, (v) => v * 1);
  const x2 = useTransform(sx, (v) => v * 0.6);
  const y2 = useTransform(sy, (v) => v * 0.6);
  const x3 = useTransform(sx, (v) => v * 0.85);
  const y3 = useTransform(sy, (v) => v * 0.85);

  useEffect(() => {
    if (reduced) return;
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine) return;

    const onMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      mx.set(nx * 12);
      my.set(ny * 12);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [reduced, mx, my]);

  const blobs = [
    {
      x: x1,
      y: y1,
      className: "left-[8%] top-[12%] h-[38vmax] w-[38vmax] bg-accent/15",
    },
    {
      x: x2,
      y: y2,
      className: "right-[6%] top-[30%] h-[30vmax] w-[30vmax] bg-accent/10",
    },
    {
      x: x3,
      y: y3,
      className:
        "left-[30%] bottom-[6%] h-[26vmax] w-[26vmax] bg-white/[0.04]",
    },
  ];

  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className,
      )}
    >
      {blobs.map((b, i) => (
        <motion.div
          key={i}
          className={cn(
            "absolute rounded-full blur-[80px] will-change-transform",
            b.className,
          )}
          style={reduced ? undefined : { x: b.x, y: b.y }}
        />
      ))}
    </div>
  );
}
