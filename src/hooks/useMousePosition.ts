"use client";

import { useEffect, useRef, useState } from "react";

interface MousePosition {
  /** Raw viewport coordinates (px). */
  x: number;
  y: number;
  /** Normalized -1..1 from viewport center — for dampened parallax. */
  nx: number;
  ny: number;
}

/**
 * Pointer position, throttled to one update per animation frame (keeps
 * parallax/glow at 60fps). Disabled automatically when the device has no
 * fine pointer (touch) so mobile pays no cost.
 */
export function useMousePosition(): MousePosition {
  const [pos, setPos] = useState<MousePosition>({ x: 0, y: 0, nx: 0, ny: 0 });
  const frame = useRef<number | null>(null);

  useEffect(() => {
    const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!hasFinePointer) return;

    const onMove = (e: MouseEvent) => {
      if (frame.current !== null) return;
      frame.current = requestAnimationFrame(() => {
        const { innerWidth: w, innerHeight: h } = window;
        setPos({
          x: e.clientX,
          y: e.clientY,
          nx: (e.clientX / w) * 2 - 1,
          ny: (e.clientY / h) * 2 - 1,
        });
        frame.current = null;
      });
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (frame.current !== null) cancelAnimationFrame(frame.current);
    };
  }, []);

  return pos;
}
