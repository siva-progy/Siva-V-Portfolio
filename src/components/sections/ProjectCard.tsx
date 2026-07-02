"use client";

import { Github, ArrowUpRight } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Chip } from "@/components/ui/Chip";
import { ProjectImage } from "@/components/ui/ProjectImage";
import type { Project } from "@/types";

/**
 * Compact project card for the "More work" grid (non-featured projects).
 * Uses the interactive Card lift. Links are real anchors for accessibility.
 */
export function ProjectCard({ project }: { project: Project }) {
  return (
    <Card interactive className="flex h-full flex-col overflow-hidden">
      <ProjectImage
        src={project.image}
        alt={project.imageAlt}
        aspect="aspect-[16/10]"
        className="rounded-none border-0 border-b border-border"
      />
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-3">
          <h4 className="text-h3 font-semibold text-text">{project.title}</h4>
          {project.status && (
            <span className="mt-1 shrink-0 font-mono text-[0.65rem] uppercase tracking-[0.1em] text-subtle">
              {project.status}
            </span>
          )}
        </div>
        <p className="mt-2 flex-1 text-body leading-relaxed text-muted">
          {project.summary}
        </p>
        <ul className="mt-4 flex flex-wrap gap-2">
          {project.stack.slice(0, 4).map((t) => (
            <li key={t}>
              <Chip>{t}</Chip>
            </li>
          ))}
        </ul>
        {(project.links.github || project.links.live) && (
          <div className="mt-5 flex items-center gap-4 border-t border-border pt-4">
            {project.links.live && (
              <a
                href={project.links.live}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-caption text-muted transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                Live <ArrowUpRight size={14} aria-hidden="true" />
              </a>
            )}
            {project.links.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-caption text-muted transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                <Github size={14} aria-hidden="true" /> GitHub
              </a>
            )}
          </div>
        )}
      </div>
    </Card>
  );
}
