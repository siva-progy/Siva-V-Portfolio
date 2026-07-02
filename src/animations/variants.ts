import type { Variants, Transition } from "framer-motion";

/**
 * Central motion vocabulary. All timings/easings come straight from the
 * Phase 2 motion rules: soft expo-out curve, no bounce, no overshoot.
 * Components import these instead of inventing their own values so the
 * whole site shares one feel.
 */

/** The premium easing curve — cubic-bezier(0.22, 1, 0.36, 1). */
export const EASE_PREMIUM: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const DURATION = {
  micro: 0.15,
  standard: 0.3,
  reveal: 0.6,
} as const;

export const transitionReveal: Transition = {
  duration: DURATION.reveal,
  ease: EASE_PREMIUM,
};

export const transitionStandard: Transition = {
  duration: DURATION.standard,
  ease: EASE_PREMIUM,
};

/** Fade + 16px slide-up + slight blur→sharp. The core reveal primitive. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: transitionReveal,
  },
};

/** Plain fade — used as the reduced-motion fallback everywhere. */
export const fadeOnly: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: DURATION.standard } },
};

/** Container that staggers its children's reveal by 60ms. */
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06, delayChildren: 0.05 },
  },
};

/** Subtle scale for cards/press states. */
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.98 },
  visible: { opacity: 1, scale: 1, transition: transitionReveal },
};
