"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Github, ArrowUpRight, Clock, User, CircleDot } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";
import { Reveal } from "@/components/ui/Reveal";
import { ProjectImage } from "@/components/ui/ProjectImage";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";
import type { Project } from "@/types";

/**
 * A single premium case study. On desktop the cover column is sticky and the
 * narrative scrolls beside it; layout alternates left/right by index. The
 * cover gets a subtle scroll parallax. Every narrative block is optional and
 * only renders when the project provides it.
 */
export function CaseStudy({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const reversed = index % 2 === 1;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const coverY = useTransform(scrollYProgress, [0, 1], [40, -40]);

const narrative: { label: string; body?: string }[] = [
  { label: "Project Overview", body: project.overview },
  { label: "Business Problem", body: project.problem },
  { label: "Solution Architecture", body: project.solution },
  { label: "Key Features", body: project.challenges },
  { label: "Project Outcome", body: project.learnings },
];

  return (
    <article ref={ref} className="py-[clamp(3rem,7vh,6rem)]">
      <div
        className={cn(
          "grid items-start gap-10 lg:grid-cols-2 lg:gap-16",
          reversed && "lg:[&>*:first-child]:order-2",
        )}
      >
        {/* Cover column — sticky on desktop, parallax */}
        <div className="lg:sticky lg:top-24">
          <motion.div style={reduced ? undefined : { y: coverY }}>
            <Reveal>
              <ProjectImage
                src={project.image}
                alt={project.imageAlt}
                preload={index === 0}
              />
            </Reveal>
          </motion.div>

          {/* Meta chips under the cover */}
          <Reveal delay={0.1}>
            <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-4">
              {project.role && (
                <MetaItem
                  icon={<User size={15} aria-hidden="true" />}
                  label="Role"
                  value={project.role}
                />
              )}
              {project.timeline && (
                <MetaItem
                  icon={<Clock size={15} aria-hidden="true" />}
                  label="Timeline"
                  value={project.timeline}
                />
              )}
              {project.status && (
                <MetaItem
                  icon={<CircleDot size={15} aria-hidden="true" />}
                  label="Status"
                  value={project.status}
                />
              )}
            </dl>
          </Reveal>
        </div>

        {/* Narrative column */}
        <div className="flex flex-col">
          <Reveal>
            <span className="font-mono text-caption uppercase tracking-[0.14em] text-accent">
              {String(index + 1).padStart(2, "0")} — Featured Project
            </span>
            <h3 className="mt-4 text-h2 font-semibold leading-[1.1] tracking-tight text-text">
              {project.title}
            </h3>
            <p className="mt-4 max-w-[46ch] text-body-lg leading-relaxed text-muted">
              {project.summary}
            </p>
          </Reveal>

          {/* Narrative blocks */}
          <div className="mt-10 flex flex-col gap-8">
            {narrative
              .filter((b) => b.body)
              .map((b) => (
                <Reveal key={b.label}>
                  <h4 className="mb-2 font-mono text-caption uppercase tracking-[0.12em] text-subtle">
                    {b.label}
                  </h4>
                  <p className="max-w-[52ch] text-body leading-relaxed text-text/90">
                    {b.body}
                  </p>
                </Reveal>
              ))}

            {/* Architecture diagram (optional) */}
            {project.architectureImage && (
              <Reveal>
                <h4 className="mb-3 font-mono text-caption uppercase tracking-[0.12em] text-subtle">
                  Architecture
                </h4>
                <ProjectImage
                  src={project.architectureImage}
                  alt={project.architectureAlt ?? `${project.title} architecture diagram`}
                  aspect="aspect-[16/9]"
                />
              </Reveal>
            )}

            {/* Results / impact metrics */}
            {project.metrics && project.metrics.length > 0 && (
              <Reveal>
                <h4 className="mb-4 font-mono text-caption uppercase tracking-[0.12em] text-subtle">
                  Project Highlights
                </h4>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                  {project.metrics.map((m) => (
                    <div
                      key={m.label}
                      className="rounded-lg border border-border bg-surface p-4"
                    >
                      <div className="text-h2 font-semibold tracking-tight text-accent">
                        {m.value}
                      </div>
                      <div className="mt-1 text-caption leading-snug text-muted">
                        {m.label}
                      </div>
                    </div>
                  ))}
                </div>
              </Reveal>
            )}

            {/* Technologies Used */}
            <Reveal>
              <h4 className="mb-3 font-mono text-caption uppercase tracking-[0.12em] text-subtle">
                Technologies Used
              </h4>
              <ul className="flex flex-wrap gap-2">
                {project.stack.map((t) => (
                  <li key={t}>
                    <Chip accent>{t}</Chip>
                  </li>
                ))}
              </ul>
            </Reveal>

            {/* Links */}
            {/* Links */}
{(project.links.github || project.links.live || project.links.video) && (
  <Reveal>
    <div className="flex flex-wrap gap-4 pt-2">
      {project.links.live && (
        <Button href={project.links.live} external size="md">
          Live Demo
          <ArrowUpRight size={17} aria-hidden="true" />
        </Button>
      )}

      {project.links.video && (
        <Button
          href={project.links.video}
          external
          variant="secondary"
          size="md"
        >
          ▶ Watch Demo
        </Button>
      )}

      {project.links.github && (
        <Button
          href={project.links.github}
          external
          variant="secondary"
          size="md"
        >
          <Github size={17} aria-hidden="true" />
          GitHub
        </Button>
      )}
    </div>
  </Reveal>
)}
          </div>
        </div>
      </div>
    </article>
  );
}

function MetaItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex flex-col gap-1">
      <dt className="flex items-center gap-1.5 font-mono text-[0.7rem] uppercase tracking-[0.12em] text-subtle">
        {icon}
        {label}
      </dt>
      <dd className="text-caption text-text">{value}</dd>
    </div>
  );
}
