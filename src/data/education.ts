import type { EducationItem } from "@/types";

/**
 * =========================================================================
 * EDUCATION CONTENT — edit this file to update the Education section.
 * All values are [PLACEHOLDER] for Siva Suburamaniyam V. Optional fields
 * (score, coursework, achievements, certificationsDuringStudy,
 * finalYearProject) only render when present, so trim freely.
 *
 * Order newest-first; the section renders them top-to-bottom on the rail.
 * =========================================================================
 */

export const education: EducationItem[] = [
  {
    degree: "Your Degree — Field of Study",
    institution: "Your University",
    college: "Your College Name",
    period: "20XX — 20XX",
    location: "City, India",
    score: "CGPA X.X / 10",
    coursework: [
      "Statistics",
      "Data Structures",
      "Database Systems",
      "Financial Management",
      "Business Analytics",
      "Econometrics",
    ],
    achievements: [
      "[PLACEHOLDER] Ranked in the top X% of the cohort.",
      "[PLACEHOLDER] Led a student analytics/finance club or event.",
      "[PLACEHOLDER] Won or placed in a relevant competition.",
    ],
    certificationsDuringStudy: [
      "[PLACEHOLDER] Google Data Analytics",
      "[PLACEHOLDER] SQL certification",
    ],
    finalYearProject: {
      title: "[PLACEHOLDER] Final-Year Project Title",
      summary:
        "[PLACEHOLDER] A capstone project that applied data analysis to a real finance/business question — describe the problem, what you built, and the result in one or two sentences.",
      stack: ["Python", "SQL", "Power BI"],
      outcome: "[PLACEHOLDER] Graded A · Recognised as a standout project",
      link: "https://github.com/",
    },
  },
  {
    degree: "Higher Secondary / Pre-University",
    institution: "Your School / Junior College",
    period: "20XX — 20XX",
    location: "City, India",
    score: "XX%",
    coursework: ["Mathematics", "Commerce / Science", "Economics"],
  },
];
