"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Mail, Download } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Monogram } from "@/components/ui/Monogram";
import { BackToTop } from "@/components/ui/BackToTop";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { Reveal } from "@/components/ui/Reveal";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { profile, socials } from "@/data/profile";
import { navItems } from "@/data/navigation";

/**
 * Footer — the elegant ending. Rendered as a <footer> (not a Section) so it
 * blends into the page: a soft top gradient dissolves the boundary rather
 * than drawing a hard block edge, over a faint glass surface. Includes a
 * mouse glow, subtle parallax on the brand block, and scroll reveals.
 *
 * Data-driven: nav from data/navigation, identity/socials from data/profile.
 */
export function Footer() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const year = new Date().getFullYear();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"],
  });
  const brandY = useTransform(scrollYProgress, [0, 1], [24, 0]);

  return (
    <footer
      ref={ref}
      className="relative overflow-hidden border-t border-border/40"
    >
      {/* Blend gradient — dissolves the top edge into the page above. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-bg to-transparent"
      />
      {/* Faint glass wash over the footer surface. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-surface/30 backdrop-blur-[2px]"
      />

      <Container width="wide" className="relative z-10">
        <div className="grid gap-12 py-[clamp(4rem,8vh,7rem)] lg:grid-cols-[1.4fr_1fr_1fr]">
          {/* Brand + closing statement */}
          <motion.div style={reduced ? undefined : { y: brandY }}>
            <Reveal className="flex flex-col gap-5">
              <div className="flex items-center gap-3">
                <Monogram name={profile.name} />
                <span className="text-h3 font-semibold tracking-tight text-text">
                  {profile.name}
                </span>
              </div>
              <p className="max-w-[36ch] text-body leading-relaxed text-muted">
                {/* Short professional closing statement. */}
                Thanks for scrolling. If the work resonates, I&apos;d love to
                talk about how I can help your team turn data into decisions.
              </p>
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <a
                  href={`mailto:${profile.email}`}
                  className="inline-flex items-center gap-2 text-caption text-muted transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  <Mail size={15} aria-hidden="true" />
                  {profile.email}
                </a>
              </div>
            </Reveal>
          </motion.div>

          {/* Quick navigation */}
          <Reveal delay={0.05}>
            <nav aria-label="Footer">
              <h2 className="mb-4 font-mono text-caption uppercase tracking-[0.14em] text-subtle">
                Navigate
              </h2>
              <ul className="flex flex-col gap-2.5">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className="text-body text-muted transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </Reveal>

          {/* Connect + resume */}
          <Reveal delay={0.1}>
            <div className="flex flex-col gap-5">
              <h2 className="font-mono text-caption uppercase tracking-[0.14em] text-subtle">
                Connect
              </h2>
              <SocialLinks links={socials} />
              <a
                href={profile.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 self-start rounded-md border border-border bg-surface px-5 py-2.5 text-caption font-medium text-text surface-raise transition-colors hover:bg-surface-2"
              >
                <Download size={15} aria-hidden="true" />
                Download résumé
              </a>
            </div>
          </Reveal>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col-reverse items-center gap-6 border-t border-border/40 py-8 sm:flex-row sm:justify-between">
          <div className="flex flex-col items-center gap-1 text-center sm:items-start sm:text-left">
            <p className="text-caption text-subtle">
              © {year} {profile.name}. All rights reserved.
            </p>
            <p className="text-[0.7rem] text-subtle/80">
              Built with Next.js, TypeScript &amp; Tailwind CSS.
            </p>
          </div>
          <BackToTop />
        </div>
      </Container>
    </footer>
  );
}
