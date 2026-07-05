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
    title: "Data Science with Machine Learning",
    provider: "LMES / UPTOR",
    category: "Data Science",
    issued: "2026",
    credentialId: "DS_2031024",
    certificateUrl: "/certificates/ds-with-ml.pdf",
  },

  {
    title: "Google Data Analytics Professional Certificate",
    provider: "Coursera / Google",
    category: "Data Analytics",
    issued: "2024",
    credentialId: "TOSYKRGLDKON",
    verifyUrl: "https://coursera.org/verify/professional-cert/TOSYKRGLDKON",
    // logo: "/icons/providers/google.svg",
  },
  {
    title: "IBM Data Science Professional Certificate",
    provider: "Coursera / IBM",
    category: "Data Science",
    issued: "2024",
    credentialId: "203ZAEVYX680",
    verifyUrl: "https://coursera.org/verify/professional-cert/203ZAEVYX680",
  },
  {
    title: "IBM Introduction to Data Science Professional Certificate",
    provider: "Coursera / IBM",
    category: "Data Science",
    issued: "2024",
    credentialId: "Q1ZAXVTXO4SN",
    verifyUrl: "https://coursera.org/verify/professional-cert/Q1ZAXVTXO4SN",
  },
  {
    title: "Data Visualization with Power BI (Value Added Course)",
    provider: "Amypo Technologies Pvt Ltd",
    category: "Business Intelligence",
    issued: "2025",
    credentialId: "AMY-251009095707352",
    certificateUrl: "/certificates/power-bi.pdf",
  },
];

/** Ordered category list for filter chips, derived from the data. */
export const certCategories: CertCategory[] = Array.from(
  new Set(certifications.map((c) => c.category)),
);
