import type { SiteConfig } from "@/types";

/**
 * Site-wide config for SEO/metadata. Update `url` to the final Netlify
 * domain before deploy. All other content data lives in sibling files.
 */
export const siteConfig: SiteConfig = {
  // TODO: replace with final Netlify domain
  url: "https://siva-portfolio.netlify.app",
  title: "Siva Suburamaniyam V",
  description:
    "Data Analyst and Finance Enthusiast. Turning data into clear, decision-ready insight.",
  ogImage: "/images/og.png",
  keywords: [
    "Siva Suburamaniyam",
    "Data Analyst",
    "Finance",
    "Data Analysis Portfolio",
    "SQL",
    "Python",
    "Power BI",
  ],
};
