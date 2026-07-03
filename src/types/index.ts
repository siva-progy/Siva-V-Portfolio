/**
 * Central type contracts for the portfolio.
 *
 * These interfaces are the boundary between CONTENT (which lives in `src/data`)
 * and PRESENTATION (components in `src/components`). Components accept these
 * types as props and never hardcode personal data. To update the site,
 * edit files in `src/data` only.
 */

/* ------------------------------------------------------------------ */
/* Profile                                                             */
/* ------------------------------------------------------------------ */

export interface Profile {
  /** Full name, e.g. "Siva Suburamaniyam V" */
  name: string;
  /** Short role line, e.g. "Data Analyst | Finance Enthusiast" */
  role: string;
  /** One-sentence headline used in the hero */
  tagline: string;
  /** 2–4 sentence professional summary for the About section */
  summary: string;
  /** City, Country */
  location: string;
  /** Contact email (no mailto: prefix) */
  email: string;
  /** Public path to the resume PDF, e.g. "/resume/siva-resume.pdf" */
  resumeUrl: string;
  /** Optional availability note, e.g. "Open to Data Analyst roles" */
  availability?: string;
}

/* ------------------------------------------------------------------ */
/* Social links                                                        */
/* ------------------------------------------------------------------ */

/** Icon keys map to a lookup in `src/lib/icons.ts` — keeps data serializable. */
export type IconKey =
  | "github"
  | "linkedin"
  | "mail"
  | "twitter"
  | "external"
  | "resume";

export interface SocialLink {
  label: string;
  href: string;
  icon: IconKey;
}

/* ------------------------------------------------------------------ */
/* Skills                                                              */
/* ------------------------------------------------------------------ */

/** Icon keys for skill categories — resolved in src/lib/icons.ts. */
export type SkillIconKey =
  | "analytics"
  | "code"
  | "database"
  | "bi"
  | "automation"
  | "tools"
  | "finance"
  | "soft";

export interface SkillCategory {
  /** e.g. "Data Analytics", "Finance Knowledge" */
  name: string;
  /** Icon key rendered on the category card. */
  icon: SkillIconKey;
  /** How these skills are used professionally (shown under the title). */
  description: string;
  /** Individual skill chips — no proficiency %, per design spec */
  skills: string[];
}

/* ------------------------------------------------------------------ */
/* Projects (most important section)                                   */
/* ------------------------------------------------------------------ */

export interface ProjectLinks {
  github?: string;
  live?: string;
  video?: string;
  caseStudy?: string;
}

export type ProjectStatus = "Completed" | "In progress" | "Ongoing";

/** One result/impact metric, e.g. { value: "-30%", label: "reporting time" }. */
export interface ProjectMetric {
  value: string;
  label: string;
}

/**
 * Full case-study project. Rendered as a premium alternating case study,
 * not a card. Optional fields let simpler projects omit sections cleanly
 * (the component only renders blocks that have content).
 */
export interface Project {
  /** URL-safe unique id, e.g. "revenue-forecasting" */
  slug: string;
  title: string;
  /** One-line summary shown under the title */
  summary: string;

  /* --- Case-study narrative (each block optional except overview) --- */
  /** Overview paragraph — always shown. */
  overview: string;
  problem?: string;
  /** Research / analysis approach. */
  research?: string;
  solution?: string;
  challenges?: string;
  /** Key learnings / reflection. */
  learnings?: string;

  /* --- Structured meta --- */
  /** Technology stack tags. */
  stack: string[];
  /** Result/impact metrics (0–4 render as a stat row). */
  metrics?: ProjectMetric[];
  /** Role on the project, e.g. "Solo — Analysis & reporting". */
  role?: string;
  /** Display timeline, e.g. "3 weeks · 2025". */
  timeline?: string;
  status?: ProjectStatus;

  /* --- Media --- */
  /** Public path to cover image, e.g. "/images/projects/x.jpg". */
  image: string;
  /** Alt text for the cover image (accessibility). */
  imageAlt: string;
  /** Optional architecture diagram image path. */
  architectureImage?: string;
  architectureAlt?: string;

  /** Feature prominently as a full case study (vs. compact card). */
  featured?: boolean;
  links: ProjectLinks;
}

/* ------------------------------------------------------------------ */
/* Experience & Education (timelines)                                  */
/* ------------------------------------------------------------------ */

export interface ExperienceItem {
  role: string;
  organization: string;
  /** Display string, e.g. "2023 — Present" */
  period: string;
  location?: string;
  /** Bullet highlights */
  highlights: string[];
}

/** Highlighted final-year / capstone project shown as a feature card. */
export interface FinalYearProject {
  title: string;
  /** 1–2 sentence summary of what it was and why it mattered. */
  summary: string;
  /** Optional tech/tools used. */
  stack?: string[];
  /** Optional outcome/grade note, e.g. "Graded A · Best project nominee". */
  outcome?: string;
  /** Optional link (repo, writeup, demo). */
  link?: string;
}

export interface EducationItem {
  degree: string;
  institution: string;
  /** Optional college name if distinct from the university/board. */
  college?: string;
  period: string;
  location?: string;
  /** Short one-line note (used by the About snapshot). */
  detail?: string;
  /** e.g. "CGPA 8.6 / 10" or "82%". Optional. */
  score?: string;
  /** Relevant coursework tags. */
  coursework?: string[];
  /** Notable achievements during this program. */
  achievements?: string[];
  /** Certifications earned during study (titles). */
  certificationsDuringStudy?: string[];
  /** Highlighted final-year project (rendered as a feature card). */
  finalYearProject?: FinalYearProject;
}

/* ------------------------------------------------------------------ */
/* Certifications                                                      */
/* ------------------------------------------------------------------ */

/** Category badge for a certification — used by the filter chips. */
export type CertCategory =
  | "Data Analytics"
  | "Programming"
  | "SQL"
  | "AI / ML"
  | "Business Intelligence"
  | "Finance";

export interface Certification {
  title: string;
  provider: string;
  /** Category badge / filter key. */
  category: CertCategory;
  /**
   * Public path to provider logo, e.g. "/icons/providers/x.svg".
   * Optional — a lettermark fallback renders when absent.
   */
  logo?: string;
  /** Display string, e.g. "Mar 2025" */
  issued: string;
  /** Optional credential ID for verification. */
  credentialId?: string;
  verifyUrl?: string;
}

/* ------------------------------------------------------------------ */
/* Navigation                                                          */
/* ------------------------------------------------------------------ */

export interface NavItem {
  label: string;
  /** In-page anchor, e.g. "#projects" */
  href: string;
}

/* ------------------------------------------------------------------ */
/* Site-wide metadata (SEO)                                            */
/* ------------------------------------------------------------------ */

export interface SiteConfig {
  /** Canonical production URL, e.g. "https://sivasubramaniyam.netlify.app" */
  url: string;
  title: string;
  description: string;
  /** Public path to OG image */
  ogImage: string;
  keywords: string[];
}
