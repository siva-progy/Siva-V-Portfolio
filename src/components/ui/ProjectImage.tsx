"use client";

import Image from "next/image";
import { useState } from "react";
import { ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProjectImageProps {
  src: string;
  alt: string;
  /** Aspect ratio utility, e.g. "aspect-[16/10]". */
  aspect?: string;
  className?: string;
  /** Preload as LCP candidate (Next 16 replacement for `priority`). */
  preload?: boolean;
}

/**
 * Cover/diagram image for a project. Uses next/image for optimisation, but
 * falls back to a labelled placeholder tile if the file is missing or fails
 * to load — so the layout never shows a broken image while real assets are
 * still being added. Placeholder mirrors the final image's aspect ratio to
 * avoid layout shift.
 */
export function ProjectImage({
  src,
  alt,
  aspect = "aspect-[16/10]",
  className,
  preload = false,
}: ProjectImageProps) {
  const [failed, setFailed] = useState(false);

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-lg border border-border bg-surface-2",
        aspect,
        className,
      )}
    >
      {failed ? (
        <div
          className="flex h-full w-full flex-col items-center justify-center gap-3 text-subtle"
          role="img"
          aria-label={alt}
        >
          <ImageIcon size={28} aria-hidden="true" />
          <span className="px-6 text-center text-caption">
            Cover image coming soon
          </span>
        </div>
      ) : (
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 1024px) 100vw, 620px"
          className="object-cover"
          preload={preload}
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}
