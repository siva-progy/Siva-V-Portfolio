import {
  Github,
  Linkedin,
  Mail,
  Twitter,
  ExternalLink,
  FileText,
  BarChart3,
  Code2,
  Database,
  LineChart,
  Workflow,
  Wrench,
  Landmark,
  Users,
  type LucideIcon,
} from "lucide-react";
import type { IconKey, SkillIconKey } from "@/types";

/**
 * Central icon registry. Data files reference icons by string key
 * (keeping data serializable); components resolve them here.
 */
export const iconMap: Record<IconKey, LucideIcon> = {
  github: Github,
  linkedin: Linkedin,
  mail: Mail,
  twitter: Twitter,
  external: ExternalLink,
  resume: FileText,
};

/** Icons for skill categories (Phase 8). */
export const skillIconMap: Record<SkillIconKey, LucideIcon> = {
  analytics: BarChart3,
  code: Code2,
  database: Database,
  bi: LineChart,
  automation: Workflow,
  tools: Wrench,
  finance: Landmark,
  soft: Users,
};
