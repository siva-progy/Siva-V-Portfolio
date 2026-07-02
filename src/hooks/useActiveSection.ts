"use client";

import { useEffect, useState } from "react";

/**
 * Tracks which section is currently in view for active-nav highlighting.
 * Uses a single IntersectionObserver over the given section ids and picks
 * the entry with the largest visible ratio near the top of the viewport.
 * No scroll listeners, so it stays cheap and 60fps-friendly.
 *
 * @param ids Section ids without the leading '#', in document order.
 */
export function useActiveSection(ids: string[]): string {
  const [active, setActive] = useState<string>(ids[0] ?? "");

  useEffect(() => {
    if (ids.length === 0) return;

    const visible = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          visible.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0);
        }
        // Choose the most-visible section; ties resolve to document order.
        let best = "";
        let bestRatio = 0;
        for (const id of ids) {
          const ratio = visible.get(id) ?? 0;
          if (ratio > bestRatio) {
            bestRatio = ratio;
            best = id;
          }
        }
        if (best) setActive(best);
      },
      {
        // Bias detection toward the upper-middle of the viewport.
        rootMargin: "-45% 0px -45% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    );

    const els = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    els.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [ids]);

  return active;
}
