import type { SkillCategory } from "@/types";

export const skillCategories: SkillCategory[] = [
  {
    name: "Data Analytics",
    icon: "analytics",
    description:
      "Analyzing, cleaning, and interpreting data to generate meaningful business insights.",
    skills: [
      "Microsoft Excel",
      "SQL",
      "Python",
      "Pandas",
      "Data Cleaning",
      "Exploratory Data Analysis",
      "Statistics",
    ],
  },

  {
    name: "Business Intelligence",
    icon: "bi",
    description:
      "Designing interactive dashboards and reports that support business decision-making.",
    skills: [
      "Power BI",
      "Dashboard Design",
      "Data Visualization",
    ],
  },

  {
    name: "Automation & Development",
    icon: "automation",
    description:
      "Developing automation solutions and scalable applications using modern technologies.",
    skills: [
      "Python",
      "FastAPI",
      "n8n",
      "Playwright",
      "REST APIs",
      "Git",
    ],
  },

  {
    name: "Professional Skills",
    icon: "soft",
    description:
      "Strong analytical thinking with effective communication and problem-solving abilities.",
    skills: [
      "Problem Solving",
      "Critical Thinking",
      "Business Analysis",
      "Communication",
      "Team Collaboration",
      "Time Management",
    ],
  },
];