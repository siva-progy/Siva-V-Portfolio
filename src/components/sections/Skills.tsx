"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Section } from "@/components/layout/Section";
import { Card } from "@/components/ui/Card";
import { Chip } from "@/components/ui/Chip";
import { Stagger, StaggerItem } from "@/components/ui/Stagger";
import { skillIconMap } from "@/lib/icons";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { skillCategories } from "@/data/skills";
import type { SkillCategory } from "@/types";

/**
 * Skills — a premium capability showcase (not a ratings list).
 *
 * Eight category cards, each with an icon, a professional-use description
 * ("how I use these"), and a set of skill chips. No progress bars or
 * percentages, per spec. Cards reveal in a stagger; the whole grid gets a
 * subtle scroll parallax lift. All motion is reduced-motion gated.
 */
export function Skills() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const gridY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <Section
      id="skills"
      index="03"
      eyebrow="Capabilities"
      title="What I bring to the table."
      lead="The toolkit behind the work — grouped by how I actually use it, not by a rating out of ten."
      width="wide"
    >
      <div ref={ref}>
        <motion.div style={reduced ? undefined : { y: gridY }}>
          <Stagger className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {skillCategories.map((category) => (
              <StaggerItem key={category.name} className="h-full">
                <SkillCard category={category} />
              </StaggerItem>
            ))}
          </Stagger>
        </motion.div>
      </div>
    </Section>
  );
}

function SkillCard({ category }: { category: SkillCategory }) {
  const Icon = skillIconMap[category.icon];

  return (
    <Card interactive variant="raised" className="flex h-full flex-col p-7">
      {/* Icon + title */}
      <div className="flex items-center gap-4">
        <span
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-accent-muted text-accent"
          aria-hidden="true"
        >
          <Icon size={22} />
        </span>
        <h3 className="text-h3 font-semibold text-text">{category.name}</h3>
      </div>

      {/* Professional-use description */}
      <p className="mt-4 text-body leading-relaxed text-muted">
        {category.description}
      </p>

      {/* Skill chips */}
      <ul className="mt-6 flex flex-wrap gap-2 pt-1">
        {category.skills.map((skill) => (
          <li key={skill}>
            <Chip>{skill}</Chip>
          </li>
        ))}
      </ul>
    </Card>
  );
}
