"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Menu, Download } from "lucide-react";
import { Monogram } from "@/components/ui/Monogram";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { useScrollState } from "@/hooks/useScrollState";
import { useActiveSection } from "@/hooks/useActiveSection";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";
import { profile } from "@/data/profile";
import { navItems } from "@/data/navigation";

const SECTION_IDS = navItems.map((n) => n.href.replace("#", ""));

/**
 * Premium SaaS-style navigation.
 *
 * - Floating, sticky, transparent at the top; gains a glass blur + border +
 *   subtle raise once scrolled (no layout shift — height is constant).
 * - Active-section indicator slides between links via shared layoutId.
 * - Hover underline on links; magnetic résumé CTA; theme toggle.
 * - Thin scroll-progress bar pinned to the very top.
 * - Full-screen mobile menu below lg.
 */
export function Navbar() {
  const { scrolled, progress } = useScrollState();
  const active = useActiveSection(SECTION_IDS);
  const reduced = useReducedMotion();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* Scroll progress bar */}
      <motion.div
        aria-hidden="true"
        className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-accent"
        style={{ scaleX: progress }}
      />

      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        )}
      >
        <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-8 xl:px-12">
          <div
            className={cn(
              "absolute inset-0 -z-10 transition-all duration-300",
              scrolled
                ? "glass border-b border-border/60 shadow-[var(--shadow-sm)]"
                : "bg-transparent",
            )}
          />

          {/* Logo */}
          <a
            href="#hero"
            aria-label={`${profile.name} — home`}
            className="group flex items-center gap-2.5 rounded-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            <motion.span
              whileHover={reduced ? undefined : { rotate: -6, scale: 1.04 }}
              transition={{ type: "spring", stiffness: 320, damping: 18 }}
            >
            
            </motion.span>
          </a>

          {/* Desktop nav */}
          <nav
            aria-label="Primary"
            className="hidden items-center gap-3 xl:gap-5 lg:flex"
          >
            {navItems.map((item) => {
              const id = item.href.replace("#", "");
              const isActive = active === id;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                   "relative rounded-md px-2.5 xl:px-3 py-2 text-caption font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
                      isActive
                        ? "text-text"
                        : "text-muted hover:text-text",
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId={reduced ? undefined : "nav-active"}
                      className="absolute inset-0 -z-10 rounded-md bg-surface-2"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* Right cluster */}
          <div className="flex items-center gap-2">
            <div className="hidden sm:block">
              <ThemeToggle />
            </div>
            
            {/* Mobile trigger */}
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={menuOpen}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-surface text-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent lg:hidden"
            >
              <Menu size={20} aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        items={navItems}
        active={active}
      />
    </>
  );
}
