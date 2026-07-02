import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    // Modern formats; Netlify serves next/image via @netlify/plugin-nextjs.
    formats: ["image/avif", "image/webp"],
    // Match our Tailwind breakpoints for right-sized srcset generation.
    deviceSizes: [640, 768, 1024, 1280, 1536, 1920],
    imageSizes: [32, 48, 64, 96, 128, 192, 256, 384],
    // Required in Next.js 16 — allowlist of quality values.
    qualities: [75, 90],
    remotePatterns: [],
  },
  // React Compiler is stable in Next 16 but off by default; enable once
  // babel-plugin-react-compiler is installed for automatic memoization.
};

export default nextConfig;
