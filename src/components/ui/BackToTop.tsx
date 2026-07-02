"use client";

import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

/**
 * Back-to-top control. Scrolls smoothly to the top (respecting reduced
 * motion by jumping instantly). Rendered inline in the footer as a labelled
 * pill — not a floating FAB — to keep the ending calm and intentional.
 */
export function BackToTop({ className }: { className?: string }) {
  const reduced = useReducedMotion();

  const toTop = () =>
    window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });

  return (
    <motion.button
      type="button"
      onClick={toTop}
      whileHover={reduced ? undefined : { y: -3 }}
      whileTap={{ scale: 0.97 }}
      className={cn(
        "group inline-flex items-center gap-2 rounded-full border border-border bg-surface px-5 py-2.5 text-caption font-medium text-muted transition-colors hover:text-accent hover:bg-surface-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
        className,
      )}
      aria-label="Back to top"
    >
      <ArrowUp
        size={15}
        aria-hidden="true"
        className="transition-transform group-hover:-translate-y-0.5"
      />
      Back to top
    </motion.button>
  );
}
