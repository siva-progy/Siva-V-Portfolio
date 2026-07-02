import type { Certification, CertCategory } from "@/types";

/**
 * =========================================================================
 * CERTIFICATIONS CONTENT — edit this file to update the showcase.
 * All entries are [PLACEHOLDER] for Siva Suburamaniyam V. Replace titles,
 * providers, dates, credential IDs, and verify URLs with real ones.
 *
 * `logo` is optional: drop provider logos in public/icons/providers/ and
 * set the path, or leave it out to use the lettermark fallback.
 * =========================================================================
 */

export const certifications: Certification[] = [
  {
    title: "Google Data Analytics Professional Certificate",
    provider: "Google",
    category: "Data Analytics",
    issued: "2025",
    credentialId: "ABCD-1234-EFGH",
    verifyUrl: "https://www.coursera.org/",
    // logo: "/icons/providers/google.svg",
  },
  {
    title: "Python for Data Science",
    provider: "DataCamp",
    category: "Programming",
    issued: "2025",
    credentialId: "PY-5678",
    verifyUrl: "https://www.datacamp.com/",
  },
  {
    title: "SQL for Data Analysis",
    provider: "Mode / Coursera",
    category: "SQL",
    issued: "2024",
    verifyUrl: "https://www.coursera.org/",
  },
  {
    title: "Data Visualization with Power BI",
    provider: "Microsoft",
    category: "Business Intelligence",
    issued: "2025",
    credentialId: "PBI-9012",
    verifyUrl: "https://learn.microsoft.com/",
  },
  {
    title: "Financial Markets",
    provider: "Yale (Coursera)",
    category: "Finance",
    issued: "2024",
    verifyUrl: "https://www.coursera.org/",
  },
  {
    title: "Machine Learning Foundations",
    provider: "Coursera",
    category: "AI / ML",
    issued: "2025",
    verifyUrl: "https://www.coursera.org/",
  },
];

/** Ordered category list for filter chips, derived from the data. */
export const certCategories: CertCategory[] = Array.from(
  new Set(certifications.map((c) => c.category)),
);
