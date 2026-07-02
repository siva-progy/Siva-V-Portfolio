import { siteConfig } from "@/data/site";
import { profile, socials } from "@/data/profile";

/**
 * Person JSON-LD structured data. Rendered as a script tag in the layout so
 * search engines can parse Siva's identity, role, and profiles. Data-driven
 * from the same sources as the UI (no duplication).
 */
export function StructuredData() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: profile.role,
    description: siteConfig.description,
    url: siteConfig.url,
    email: `mailto:${profile.email}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: profile.location,
    },
    sameAs: socials
      .filter((s) => !s.href.startsWith("mailto:"))
      .map((s) => s.href),
  };

  return (
    <script
      type="application/ld+json"
      // JSON.stringify output is safe here (no user input).
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
