import { Section } from "@/components/layout/Section";
import { AnimatedDivider } from "@/components/ui/AnimatedDivider";
import { Reveal } from "@/components/ui/Reveal";
import { Stagger, StaggerItem } from "@/components/ui/Stagger";
import { CaseStudy } from "./CaseStudy";
import { ProjectCard } from "./ProjectCard";
import { featuredProjects, otherProjects } from "@/data/projects";

/**
 * Projects — the portfolio centerpiece (~40–45% of scroll).
 *
 * Featured projects render as large alternating case studies with sticky
 * covers, parallax, and full narrative (overview → problem → research →
 * solution → challenges → architecture → results → learnings → stack →
 * links). Remaining projects render as a compact "More work" grid.
 *
 * Fully data-driven from /data/projects.ts — add/remove projects there.
 */
export function Projects() {
  return (
    <Section
      id="projects"
      index="02"
      eyebrow="Projects"
      title="Featured Projects"
      lead="Projects that showcase my ability to analyze data, automate workflows, and build practical solutions using Python, SQL, Power BI, and modern development tools."
    >
      {/* Featured case studies, divided for editorial rhythm */}
      <div className="flex flex-col">
        {featuredProjects.map((project, i) => (
          <div key={project.slug}>
            {i > 0 && <AnimatedDivider className="my-4" />}
            <CaseStudy project={project} index={i} />
          </div>
        ))}
      </div>

      {/* More work */}
      {otherProjects.length > 0 && (
        <div className="mt-[clamp(4rem,8vh,7rem)]">
          <Reveal>
            <h3 className="mb-8 font-mono text-caption uppercase tracking-[0.14em] text-subtle">
              More work
            </h3>
          </Reveal>
          <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {otherProjects.map((project) => (
              <StaggerItem key={project.slug} className="h-full">
                <ProjectCard project={project} />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      )}
    </Section>
  );
}
