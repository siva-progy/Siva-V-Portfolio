import { ImageResponse } from "next/og";
import { profile } from "@/data/profile";
import { siteConfig } from "@/data/site";

export const runtime = "edge";
export const alt = siteConfig.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Dynamically generated Open Graph / Twitter card. Uses only inline styles
 * (ImageResponse doesn't support external CSS), rendering the brand mark and
 * role on a dark card so social shares always look intentional — no manual
 * asset to maintain.
 */
export default function OpengraphImage() {
  const initials = profile.name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0a0a0b",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            width: 96,
            height: 96,
            borderRadius: 20,
            background: "#1a1a1d",
            border: "1px solid #242428",
            color: "#f5f5f7",
            fontSize: 44,
            fontWeight: 700,
            justifyContent: "center",
          }}
        >
          {initials}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ color: "#38bdf8", fontSize: 28, fontWeight: 600 }}>
            {profile.role}
          </div>
          <div style={{ color: "#f5f5f7", fontSize: 76, fontWeight: 700, lineHeight: 1.05 }}>
            {profile.name}
          </div>
          <div style={{ color: "#a1a1a8", fontSize: 30, marginTop: 8 }}>
            {profile.tagline}
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
