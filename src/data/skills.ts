import type { SkillCategory } from "@/types";

/**
 * =========================================================================
 * SKILLS CONTENT — edit this file to update the capability showcase.
 * Each category has an icon, a professional-use description (how the skills
 * are actually applied, not just a list), and skill chips. No proficiency
 * percentages, by design.
 *
 * All content is [PLACEHOLDER]-adjacent and written for a Data Analyst /
 * Finance profile (Siva Suburamaniyam V). Trim skills you don't use.
 * =========================================================================
 */

export const skillCategories: SkillCategory[] = [
  {
    name: "Data Analytics",
    icon: "analytics",
    description:
      "How I turn raw data into answers — profiling, cleaning, and analysing datasets to find the pattern that actually drives a decision.",
    skills: [
      "Exploratory Data Analysis",
      "Data Cleaning",
      "Statistical Analysis",
      "Data Modelling",
      "Forecasting",
      "A/B Testing",
    ],
  },
  {
    name: "Programming",
    icon: "code",
    description:
      "The languages I reach for to automate analysis and work with data at scale, from quick scripts to reusable pipelines.",
    skills: ["Python", "pandas", "NumPy", "scikit-learn", "R", "JavaScript"],
  },
  {
    name: "Databases",
    icon: "database",
    description:
      "How I source and shape data — writing queries, joining across tables, and structuring data so it's reliable to analyse.",
    skills: ["SQL", "PostgreSQL", "MySQL", "Query Optimisation", "Data Warehousing"],
  },
  {
    name: "Business Intelligence",
    icon: "bi",
    description:
      "How I make findings usable — building dashboards and reports that stakeholders can read at a glance and act on.",
    skills: ["Power BI", "Tableau", "DAX", "Looker Studio", "Dashboard Design"],
  },
  {
    name: "Automation",
    icon: "automation",
    description:
      "How I remove repetitive work — turning manual, monthly processes into repeatable pipelines that run themselves.",
    skills: ["ETL Pipelines", "Python Scripting", "Excel Macros", "Scheduled Reports"],
  },
  {
    name: "Tools",
    icon: "tools",
    description:
      "The everyday environment I work in to version, collaborate, and ship analysis.",
    skills: ["Git", "GitHub", "Jupyter", "VS Code", "Google Sheets"],
  },
  {
    name: "Finance Knowledge",
    icon: "finance",
    description:
      "The domain lens I bring to numbers — reading data in the context of real financial and business questions.",
    skills: [
      "Financial Analysis",
      "Budgeting & Forecasting",
      "Valuation Basics",
      "Risk Metrics",
      "Market Data",
    ],
  },
  {
    name: "Soft Skills",
    icon: "soft",
    description:
      "How I make analysis land — communicating clearly, collaborating with stakeholders, and framing insight for the audience.",
    skills: [
      "Data Storytelling",
      "Stakeholder Communication",
      "Problem Solving",
      "Attention to Detail",
      "Collaboration",
    ],
  },
];
