"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Download } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { ScrollIndicator } from "@/components/ui/ScrollIndicator";
import { BackgroundLayers } from "@/components/ui/BackgroundLayers";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { EASE_PREMIUM } from "@/animations/variants";
import { profile, socials } from "@/data/profile";

/**
 * Hero — the 5-second impression.
 *
 * Depth model (subtle, 60fps):
 *  - BackgroundLayers: blurred blobs, mouse-parallax (Phase 4).
 *  - Foreground content: scroll-linked drift up + fade as you leave the hero
 *    (parallax "slower background" illusion), via useScroll/useTransform.
 *  - Entrance: single staggered timeline over the eyebrow → headline →
 *    subhead → CTAs → socials, using the shared premium easing.
 *
 * All motion is gated by prefers-reduced-motion.
 */
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  // Scroll progress across the hero (start when top hits top, end when
  // bottom hits top). Drives the exit parallax.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  // Staggered entrance timeline.
  const container = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.09, delayChildren: 0.1 },
    },
  };
  const item = reduced
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.3 } },
      }
    : {
        hidden: { opacity: 0, y: 20, filter: "blur(6px)" },
        visible: {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          transition: { duration: 0.7, ease: EASE_PREMIUM },
        },
      };

  return (
    <section
      ref={ref}
      id="hero"
      aria-label="Introduction"
      className="relative flex min-h-svh items-center overflow-hidden pt-24"
    >
      {/* Ambient depth layers (decorative, mouse-parallax, aria-hidden) */}
      <BackgroundLayers />

      {/* Foreground with scroll-linked exit parallax */}
      <motion.div
        style={reduced ? undefined : { y: contentY, opacity: contentOpacity }}
        className="relative z-30 w-full"
      >
        <Container width="content">
          <motion.div
            variants={container}
            initial="hidden"
            animate="visible"
            className="flex max-w-[52rem] flex-col items-start"
          >
            {/* Availability badge */}
            {profile.availability && (
              <motion.div variants={item}>
                <Badge dot>{profile.availability}</Badge>
              </motion.div>
            )}

            {/* Role eyebrow */}
            <motion.p
              variants={item}
              className="mt-8 text-base md:text-lg font-semibold uppercase tracking-[0.15em] text-accent"
            >
              {profile.role}
            </motion.p>

            {/* Name — editorial display type */}
            <motion.h1
              variants={item}
              className="mt-5 max-w-[13ch] text-5xl md:text-6xl lg:text-7xl font-semibold leading-[1.05] tracking-[-0.02em] text-text"
            >
              {profile.name}
            </motion.h1>

            {/* Tagline / recruiter hook */}
            <motion.p
              variants={item}
              className="mt-6 max-w-[38ch] text-body-lg leading-relaxed text-muted"
            >
              {profile.tagline}
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={item}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <Button href="#projects" size="lg">
                View my work
                <ArrowUpRight size={18} aria-hidden="true" />
              </Button>
              <Button
                href="#contact"
                variant="secondary"
                size="lg"
              >
                Let's Connect
              </Button>
            </motion.div>

            {/* Social row */}
            
          <motion.div
            variants={item}
            className="relative z-50 mt-12"
          >
            <SocialLinks links={socials} />
          </motion.div>
          </motion.div>
        </Container>
      </motion.div>

      {/* Scroll cue, pinned to bottom-center */}
      <div className="absolute inset-x-0 bottom-8 z-10 flex justify-center pointer-events-none">
        <ScrollIndicator />
      </div>
    </section>
  );
}
