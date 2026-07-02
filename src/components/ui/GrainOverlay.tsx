/**
 * A fixed, full-viewport film-grain overlay using inline SVG fractal noise.
 * Static (no animation) so it costs essentially nothing after paint — it's a
 * single composited layer at very low opacity. `mix-blend-overlay` lets it
 * add texture without shifting the palette. Purely decorative + aria-hidden.
 *
 * Server component (no interactivity) — keeps it out of the client bundle.
 */
export function GrainOverlay() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[1] opacity-[0.035] mix-blend-overlay"
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        backgroundRepeat: "repeat",
      }}
    />
  );
}
