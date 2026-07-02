"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download } from "lucide-react";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { EASE_PREMIUM } from "@/animations/variants";
import { profile, socials } from "@/data/profile";
import type { NavItem } from "@/types";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  items: NavItem[];
  active: string;
}

/**
 * Full-screen mobile menu. Opens with a blurred backdrop and staggered link
 * reveals; locks body scroll while open; traps initial focus on the close
 * button and restores it on close; closes on Escape. Large touch targets.
 * Reduced-motion collapses animations to simple fades.
 */
export function MobileMenu({ open, onClose, items, active }: MobileMenuProps) {
  const reduced = useReducedMotion();
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastFocused = useRef<HTMLElement | null>(null);

  // Body scroll lock + focus management + Escape to close.
  useEffect(() => {
    if (!open) return;
    lastFocused.current = document.activeElement as HTMLElement;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKey);
      lastFocused.current?.focus?.();
    };
  }, [open, onClose]);

  const listVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
  };
  const itemVariants = reduced
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 18 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: EASE_PREMIUM },
        },
      };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="fixed inset-0 z-50 flex flex-col lg:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduced ? 0.15 : 0.3, ease: EASE_PREMIUM }}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-bg/80 backdrop-blur-xl" />

          {/* Content */}
          <div className="relative flex h-full flex-col px-[clamp(1.25rem,5vw,4rem)] pb-10 pt-6">
            <div className="flex items-center justify-between">
              <ThemeToggle />
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                aria-label="Close menu"
                className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-border bg-surface text-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                <X size={22} aria-hidden="true" />
              </button>
            </div>

            {/* Links */}
            <motion.nav
              aria-label="Mobile"
              className="flex flex-1 flex-col justify-center"
              variants={listVariants}
              initial="hidden"
              animate="visible"
            >
              <ul className="flex flex-col gap-2">
                {items.map((item, i) => {
                  const isActive = active === item.href.replace("#", "");
                  return (
                    <motion.li key={item.href} variants={itemVariants}>
                      <a
                        href={item.href}
                        onClick={onClose}
                        aria-current={isActive ? "true" : undefined}
                        className="flex items-baseline gap-4 py-3 text-[2rem] font-semibold tracking-tight transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                        style={{
                          color: isActive
                            ? "var(--color-accent)"
                            : "var(--color-text)",
                        }}
                      >
                        <span className="font-mono text-caption text-subtle">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        {item.label}
                      </a>
                    </motion.li>
                  );
                })}
              </ul>
            </motion.nav>

            {/* Footer actions */}
            <motion.div
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-col gap-6"
            >
              <a
                href={profile.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-accent px-6 font-semibold text-[#04121b] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                <Download size={18} aria-hidden="true" />
                Download résumé
              </a>
              <SocialLinks links={socials} />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
