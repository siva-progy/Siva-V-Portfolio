"use client";

import { useMemo, useState, useRef } from "react";
import {
  AnimatePresence,
  LayoutGroup,
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import { Search, X } from "lucide-react";
import { Section } from "@/components/layout/Section";
import { CertificateCard } from "./CertificateCard";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";
import { certifications, certCategories } from "@/data/certificates";

const ALL = "All";

/**
 * Certifications — a premium achievement showcase.
 *
 * Category filter chips + a search bar filter a responsive card grid; the
 * grid reflows with smooth layout animations (Framer `LayoutGroup` +
 * `AnimatePresence`). Subtle scroll parallax on the grid. Minimal-luxury
 * aesthetic — one accent color, lots of air. Fully data-driven.
 */
export function Certifications() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [active, setActive] = useState<string>(ALL);
  const [query, setQuery] = useState("");

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const gridY = useTransform(scrollYProgress, [0, 1], [24, -24]);

  const filters = [ALL, ...certCategories];

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return certifications.filter((c) => {
      const matchesCategory = active === ALL || c.category === active;
      const matchesQuery =
        !q ||
        c.title.toLowerCase().includes(q) ||
        c.provider.toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [active, query]);

  return (
    <Section
      id="certifications"
      index="05"
      eyebrow="Certifications"
      title="Verified, not just claimed."
      lead="Credentials I've earned along the way — each links to its verification page."
      width="wide"
    >
      {/* Controls */}
      <div className="mb-10 flex flex-col gap-5">
        {/* Search */}
        <div className="relative max-w-md">
          <Search
            size={16}
            aria-hidden="true"
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-subtle"
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search certifications…"
            aria-label="Search certifications"
            className="h-11 w-full rounded-full border border-border bg-surface pl-11 pr-11 text-body text-text placeholder:text-subtle transition-colors focus-visible:border-accent/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-subtle transition-colors hover:text-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              <X size={16} aria-hidden="true" />
            </button>
          )}
        </div>

        {/* Category filter chips */}
        <LayoutGroup>
          <div
            role="tablist"
            aria-label="Filter certifications by category"
            className="flex flex-wrap gap-2"
          >
            {filters.map((f) => {
              const selected = active === f;
              return (
                <button
                  key={f}
                  role="tab"
                  aria-selected={selected}
                  onClick={() => setActive(f)}
                  className={cn(
                    "relative rounded-full px-4 py-2 text-caption font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
                    selected
                      ? "text-[#04121b]"
                      : "border border-border bg-surface text-muted hover:text-text",
                  )}
                >
                  {selected && (
                    <motion.span
                      layoutId={reduced ? undefined : "cert-filter-pill"}
                      className="absolute inset-0 rounded-full bg-accent"
                      transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10">{f}</span>
                </button>
              );
            })}
          </div>
        </LayoutGroup>
      </div>

      {/* Grid */}
      <div ref={ref}>
        <motion.div style={reduced ? undefined : { y: gridY }}>
          <LayoutGroup>
            <motion.div
              layout={!reduced}
              className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3"
            >
              <AnimatePresence mode="popLayout">
                {filtered.map((cert) => (
                  <CertificateCard key={cert.title} cert={cert} />
                ))}
              </AnimatePresence>
            </motion.div>
          </LayoutGroup>
        </motion.div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <p className="py-12 text-center text-body text-subtle">
            No certifications match your search.
          </p>
        )}
      </div>
    </Section>
  );
}
