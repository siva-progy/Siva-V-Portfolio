"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface ProviderLogoProps {
  provider: string;
  logo?: string;
  className?: string;
}

/**
 * Provider logo tile. Renders the logo image when available; otherwise a
 * clean monogram (first two initials) on a soft surface — so a missing logo
 * still looks intentional and premium rather than broken.
 */
export function ProviderLogo({ provider, logo, className }: ProviderLogoProps) {
  const [failed, setFailed] = useState(false);

  const initials = provider
    .split(/[\s/]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("");

  const showImage = logo && !failed;

  return (
    <div
      className={cn(
        "flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-border bg-surface",
        className,
      )}
    >
      {showImage ? (
        <Image
          src={logo}
          alt={`${provider} logo`}
          width={28}
          height={28}
          className="object-contain"
          onError={() => setFailed(true)}
        />
      ) : (
        <span
          className="font-mono text-caption font-medium text-muted"
          aria-label={provider}
        >
          {initials}
        </span>
      )}
    </div>
  );
}
