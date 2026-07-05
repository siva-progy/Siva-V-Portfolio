"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { GraduationCap, Compass, Activity } from "lucide-react";
import { Section } from "@/components/layout/Section";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";
import { Stagger, StaggerItem } from "@/components/ui/Stagger";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import {
  aboutStory,
  currentStatus,
  careerGoal,
  coreStrengths,
  educationSnapshot,
} from "@/data/about";

/**
 * About — answers "who is this person?" and opens "why interview them?".
 *
 * Layout (Apple product-page feel): a two-column split on desktop —
 * the professional story on the left, a compact status/goal panel on the
 * right — followed by a Core Strengths grid and an Education snapshot.
 *
 * Motion: staggered reveals via Phase 4 primitives, plus a subtle
 * scroll-linked drift between the two columns for gentle depth. All
 * gated by prefers-reduced-motion.
 */
export function About() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  // Columns drift a few px in opposite directions — barely perceptible depth.
  const storyY = useTransform(scrollYProgress, [0, 1], [24, -24]);
  const panelY = useTransform(scrollYProgress, [0, 1], [-16, 16]);

  return (
    <Section
      id="about"
      index="01"
      eyebrow="About"
      title="About Me."
      lead="Passionate about transforming data into meaningful insights through analytics, visualization, and automation."
      width="content"
    >
      <div ref={ref} className="flex flex-col gap-[clamp(3rem,6vh,5rem)]">
        {/* Story + status/goal panel */}
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
          {/* Professional story */}
          <motion.div style={reduced ? undefined : { y: storyY }}>
            <Reveal className="flex flex-col gap-6">
              {aboutStory.map((para, i) => (
                <p
                  key={i}
                  className="max-w-[52ch] text-body-lg leading-relaxed text-muted"
                >
                  {para}
                </p>
              ))}
            </Reveal>
          </motion.div>

          {/* Status + goal panel */}
          <motion.div style={reduced ? undefined : { y: panelY }}>
            <Reveal delay={0.1}>
              <Card variant="raised" className="flex flex-col gap-8 p-7">
                <InfoRow
                  icon={<Activity size={18} aria-hidden="true" />}
                  label={currentStatus.label}
                  value={currentStatus.value}
                />
                <div className="h-px w-full bg-border" aria-hidden="true" />
                <InfoRow
                  icon={<Compass size={18} aria-hidden="true" />}
                  label={careerGoal.label}
                  value={careerGoal.value}
                />
              </Card>
            </Reveal>
          </motion.div>
        </div>

        {/* Core strengths */}
        <div>
          <h3 className="mb-6 font-mono text-caption uppercase tracking-[0.14em] text-subtle">
            Technical Expertise
          </h3>
          <Stagger className="grid gap-4 sm:grid-cols-2">
            {coreStrengths.map((s) => (
              <StaggerItem key={s.title}>
                <Card
                  interactive
                  className="h-full p-6"
                  aria-label={s.title}
                >
                  <p className="text-h3 font-semibold text-text">{s.title}</p>
                  <p className="mt-2 text-body leading-relaxed text-muted">
                    {s.detail}
                  </p>
                </Card>
              </StaggerItem>
            ))}
          </Stagger>
        </div>

        {/* Education snapshot */}
        <Reveal>
          <Card className="flex flex-col gap-4 p-7 sm:flex-row sm:items-center sm:gap-6">
            <span
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent-muted text-accent"
              aria-hidden="true"
            >
              <GraduationCap size={22} />
            </span>
            <div className="flex flex-col gap-1">
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <p className="text-h3 font-semibold text-text">
                  {educationSnapshot.degree}
                </p>
                <span className="font-mono text-caption text-subtle">
                  {educationSnapshot.period}
                </span>
              </div>
              <p className="text-body text-muted">
                {educationSnapshot.institution}
                {educationSnapshot.location
                  ? ` · ${educationSnapshot.location}`
                  : ""}
              </p>
              {educationSnapshot.detail && (
                <p className="mt-1 text-caption text-subtle">
                  {educationSnapshot.detail}
                </p>
              )}
            </div>
          </Card>
        </Reveal>
      </div>
    </Section>
  );
}

/** Small labelled row inside the status/goal panel. */
function InfoRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2 text-accent">
        {icon}
        <span className="font-mono text-caption uppercase tracking-[0.12em]">
          {label}
        </span>
      </div>
      <p className="text-body leading-relaxed text-text">{value}</p>
    </div>
  );
}
