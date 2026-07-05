"use client";

import { motion } from "framer-motion";
import { ShieldCheck, ArrowUpRight } from "lucide-react";
import { Chip } from "@/components/ui/Chip";
import { ProviderLogo } from "@/components/ui/ProviderLogo";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { transitionStandard } from "@/animations/variants";
import type { Certification } from "@/types";

/**
 * A single certification, styled as a valuable achievement rather than a
 * grid tile. Soft glass-skeuomorphic surface, provider logo/monogram,
 * category badge, issue date, optional credential ID, and a verify action
 * that opens in a new tab. Gentle hover lift (reduced-motion safe).
 *
 * Uses `layout` so the card animates smoothly when filters/search reflow
 * the grid.
 */
export function CertificateCard({ cert }: { cert: Certification }) {
  const reduced = useReducedMotion();

  return (
    <motion.article
      layout={!reduced}
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={transitionStandard}
      whileHover={reduced ? undefined : { y: -4 }}
      className="group flex h-full flex-col rounded-lg border border-border bg-surface/70 p-6 shadow-[var(--shadow-md)] backdrop-blur-md"
      style={{ willChange: "transform" }}
    >
      {/* Header: logo + category */}
      <div className="flex items-start justify-between gap-3">
        <ProviderLogo provider={cert.provider} logo={cert.logo} />
        <Chip accent className="shrink-0">
          {cert.category}
        </Chip>
      </div>

      {/* Title + provider */}
      <h3 className="mt-5 text-h3 font-semibold leading-snug text-text">
        {cert.title}
      </h3>
      <p className="mt-1.5 text-body text-muted">{cert.provider}</p>

      {/* Meta */}
      <dl className="mt-4 flex flex-col gap-1 text-caption text-subtle">
        <div className="flex gap-2">
          <dt className="font-mono uppercase tracking-[0.1em]">Issued</dt>
          <dd className="text-muted">{cert.issued}</dd>
        </div>
        {cert.credentialId && (
          <div className="flex gap-2">
            <dt className="font-mono uppercase tracking-[0.1em]">ID</dt>
            <dd className="truncate text-muted">{cert.credentialId}</dd>
          </div>
        )}
      </dl>

      {/* Verify action */}
      {/* Certificate / Verify action */}
{(cert.verifyUrl || cert.certificateUrl) && (
  <a
    href={cert.verifyUrl || cert.certificateUrl}
    target="_blank"
    rel="noopener noreferrer"
    className="mt-6 inline-flex items-center gap-2 self-start rounded-md border border-border bg-surface px-4 py-2 text-caption font-medium text-text transition-colors hover:border-accent/50 hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
  >
    <ShieldCheck size={15} aria-hidden="true" />

    {cert.verifyUrl ? "Verify Credential" : "View Certificate"}

    <ArrowUpRight
      size={14}
      aria-hidden="true"
      className="opacity-60 transition-transform group-hover:translate-x-0.5"
    />
  </a>
)}
    </motion.article>
  );
}
