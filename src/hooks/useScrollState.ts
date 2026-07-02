"use client";

import { useEffect, useState } from "react";
import { useScroll, useMotionValueEvent, useSpring } from "framer-motion";
import type { MotionValue } from "framer-motion";

/**
 * Page scroll state for the navbar:
 *  - `scrolled`: true once the user has scrolled past a small threshold
 *    (drives the navbar's transparent → blurred transition).
 *  - `progress`: a spring-smoothed 0..1 MotionValue of total page scroll
 *    (drives the top progress bar). Uses Framer's scroll (rAF-backed), no
 *    manual scroll listeners.
 */
export function useScrollState(threshold = 24): {
  scrolled: boolean;
  progress: MotionValue<number>;
} {
  const { scrollY, scrollYProgress } = useScroll();
  const [scrolled, setScrolled] = useState(false);

  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.2,
  });

  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > threshold);
  });

  // Set initial state (e.g. on reload mid-page).
  useEffect(() => {
    setScrolled(window.scrollY > threshold);
  }, [threshold]);

  return { scrolled, progress };
}
