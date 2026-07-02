"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { AnimatePresence, motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";
import { transitionStandard } from "@/animations/variants";

/**
 * Dark/light toggle. Guards against hydration mismatch by rendering a
 * neutral placeholder until mounted (next-themes best practice). The icon
 * cross-fades with a small rotate — a purposeful micro-interaction.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  const isDark = resolvedTheme === "dark";

  const buttonClasses = cn(
    "inline-flex h-11 w-11 items-center justify-center rounded-full",
    "border border-border bg-surface text-muted",
    "transition-colors duration-150 hover:text-text hover:bg-surface-2",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
    className,
  );

  // Pre-hydration placeholder keeps layout stable and avoids theme flash.
  if (!mounted) {
    return (
      <button
        className={buttonClasses}
        aria-label="Toggle theme"
        disabled
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={buttonClasses}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={isDark ? "moon" : "sun"}
          initial={{ opacity: 0, rotate: -30, scale: 0.8 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 30, scale: 0.8 }}
          transition={transitionStandard}
          className="flex"
        >
          {isDark ? <Moon size={18} /> : <Sun size={18} />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
