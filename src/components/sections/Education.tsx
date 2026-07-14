"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Sparkles, Award, BookOpen, ArrowUpRight } from "lucide-react";
import { Section } from "@/components/layout/Section";
import { Card } from "@/components/ui/Card";
import { Chip } from "@/components/ui/Chip";
import { Reveal } from "@/components/ui/Reveal";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { education } from "@/data/education";
import type { EducationItem, FinalYearProject } from "@/types";

/**
 * Education — a premium editorial timeline (not a resume list).
 *
 * A single vertical rail runs down the left with a node per entry. Each
 * entry is an editorial block: degree + institution headline, meta row,
 * then optional coursework / achievements / certifications. When an entry
 * has a final-year project, it gets a dedicated highlight card. The rail
 * has a subtle scroll parallax; entries reveal on scroll.
 */
export function Education() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  // The rail's accent fill drifts subtly with scroll for a sense of progress.
  const railScale = useTransform(scrollYProgress, [0, 0.85], [0, 1]);

  return (
    <Section
      id="education"
      index="04"
      eyebrow="Education"
      title="built."
      lead="The academic path behind the work — and the project that best shows what I can do."
      width="content"
    >
      <div ref={ref} className="relative">
        {/* Vertical rail */}
        <div
          className="absolute bottom-0 left-[7px] top-2 w-px bg-border md:left-[9px]"
          aria-hidden="true"
        >
          <motion.div
            className="h-full w-full origin-top bg-accent/60"
            style={reduced ? { scaleY: 1 } : { scaleY: railScale }}
          />
        </div>

        <ol className="flex flex-col gap-[clamp(3rem,6vh,5rem)]">
          {education.map((item, i) => (
            <EducationEntry key={`${item.degree}-${i}`} item={item} />
          ))}
        </ol>
      </div>
    </Section>
  );
}

function EducationEntry({ item }: { item: EducationItem }) {
  return (
    <li className="relative pl-8 md:pl-12">
      {/* Node dot */}
      <span
        className="absolute left-0 top-1.5 flex h-4 w-4 items-center justify-center"
        aria-hidden="true"
      >
        <span className="h-4 w-4 rounded-full border-2 border-accent bg-bg" />
        <span className="absolute h-1.5 w-1.5 rounded-full bg-accent" />
      </span>

      <Reveal>
        {/* Headline */}
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <h3 className="text-h3 font-semibold text-text">{item.degree}</h3>
          <span className="font-mono text-caption text-subtle">
            {item.period}
          </span>
        </div>
        <p className="mt-1.5 text-body text-muted">
          {item.institution}
          {item.college ? ` · ${item.college}` : ""}
          {item.location ? ` · ${item.location}` : ""}
        </p>
        {item.score && (
          <p className="mt-1 font-mono text-caption text-accent">
            {item.score}
          </p>
        )}
      </Reveal>

      {/* Coursework */}
      {item.coursework && item.coursework.length > 0 && (
        <Reveal delay={0.05}>
          <div className="mt-5">
            <h4 className="mb-3 flex items-center gap-2 font-mono text-caption uppercase tracking-[0.12em] text-subtle">
              <BookOpen size={14} aria-hidden="true" />
              Relevant coursework
            </h4>
            <ul className="flex flex-wrap gap-2">
              {item.coursework.map((c) => (
                <li key={c}>
                  <Chip>{c}</Chip>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      )}

      {/* Achievements + certifications during study */}
      {((item.achievements && item.achievements.length > 0) ||
        (item.certificationsDuringStudy &&
          item.certificationsDuringStudy.length > 0)) && (
        <Reveal delay={0.05}>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            {item.achievements && item.achievements.length > 0 && (
              <div>
                <h4 className="mb-3 flex items-center gap-2 font-mono text-caption uppercase tracking-[0.12em] text-subtle">
                  <Award size={14} aria-hidden="true" />
                  Achievements
                </h4>
                <ul className="flex flex-col gap-2">
                  {item.achievements.map((a, idx) => (
                    <li
                      key={idx}
                      className="flex gap-2 text-body leading-relaxed text-muted"
                    >
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                      {a}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {item.certificationsDuringStudy &&
              item.certificationsDuringStudy.length > 0 && (
                <div>
                  <h4 className="mb-3 font-mono text-caption uppercase tracking-[0.12em] text-subtle">
                    Certifications earned
                  </h4>
                  <ul className="flex flex-wrap gap-2">
                    {item.certificationsDuringStudy.map((c) => (
                      <li key={c}>
                        <Chip>{c}</Chip>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
          </div>
        </Reveal>
      )}

      {/* Final-year project highlight */}
      {item.finalYearProject && (
        <Reveal delay={0.1}>
          <FinalYearHighlight project={item.finalYearProject} />
        </Reveal>
      )}
    </li>
  );
}

/** The showcase card for the final-year project — the strongest signal. */
function FinalYearHighlight({ project }: { project: FinalYearProject }) {
  return (
    <Card
      variant="raised"
      className="mt-8 overflow-hidden border border-accent/30 p-7"
    >
      {/* Accent header line */}
      <div className="flex items-center gap-2 text-accent">
        <Sparkles size={16} aria-hidden="true" />
        <span className="font-mono text-caption uppercase tracking-[0.14em]">
          Final-year project
        </span>
      </div>

      <h4 className="mt-4 text-h3 font-semibold text-text">{project.title}</h4>
      <p className="mt-3 max-w-[54ch] text-body leading-relaxed text-muted">
        {project.summary}
      </p>

      {project.outcome && (
        <p className="mt-4 text-caption font-medium text-accent">
          {project.outcome}
        </p>
      )}

      {project.stack && project.stack.length > 0 && (
        <ul className="mt-5 flex flex-wrap gap-2">
          {project.stack.map((t) => (
            <li key={t}>
              <Chip accent>{t}</Chip>
            </li>
          ))}
        </ul>
      )}

      {project.link && (
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-1.5 text-caption font-medium text-accent transition-colors hover:text-accent-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          View the project
          <ArrowUpRight size={15} aria-hidden="true" />
        </a>
      )}
    </Card>
  );
}
