# Pre-Deployment Checklist

Work top to bottom. Items marked ⚠️ are required for a correct production site;
others are polish.

## Content
- [ ] `src/data/profile.ts` — real name, role, tagline, email, location, socials
- [ ] `src/data/profile.ts` — `resumeUrl` points at your real PDF filename
- [ ] `src/data/about.ts` — story, current status, career goal, strengths, education snapshot
- [ ] `src/data/projects.ts` — real projects (remove `[PLACEHOLDER]` text)
- [ ] `src/data/skills.ts` — trim/replace skills per category
- [ ] `src/data/education.ts` — real degrees, coursework, final-year project
- [ ] `src/data/certificates.ts` — real certs + verify URLs + credential IDs
- [ ] `src/data/contact.ts` — closing message reviewed
- [ ] ⚠️ `src/data/site.ts` — `url` set to final Netlify/custom domain

## Assets (place in `public/`)
- [ ] ⚠️ `public/fonts/Satoshi-Variable.woff2` — Satoshi font (Fontshare)
- [ ] ⚠️ `public/resume/…​.pdf` — résumé
- [ ] `public/images/projects/*.jpg` — project covers + architecture diagrams
- [ ] `public/icons/providers/*.svg` — certificate provider logos
- [ ] `public/favicon.ico`, `public/icons/icon-192.png`, `public/icons/icon-512.png`

## Build & quality
- [ ] `npm install` succeeds
- [ ] `npm run typecheck` passes
- [ ] `npm run lint` passes
- [ ] ⚠️ `npm run build` succeeds locally
- [ ] `npm run start` — click through every section, both themes

## Manual QA
- [ ] Dark ↔ light toggle works, no flash on reload
- [ ] Smooth scroll + nav active highlighting + progress bar
- [ ] Mobile menu: opens, locks scroll, Escape closes, focus restored
- [ ] Contact form: validation errors, success state; with JS off → mailto
- [ ] Keyboard-only pass: skip link, focus rings, all links/buttons reachable
- [ ] `prefers-reduced-motion` on → animations collapse
- [ ] Responsive: 360px, 768px, 1024px, 1440px, ultrawide

## Netlify
- [ ] Repo connected; build green
- [ ] ⚠️ Forms → Enable form detection → redeploy
- [ ] Submit a test message; confirm it appears in Netlify Forms
- [ ] Custom domain set; `url` in `site.ts` matches

## SEO (post-deploy)
- [ ] `/sitemap.xml`, `/robots.txt`, `/manifest.webmanifest` resolve
- [ ] OG image renders (`/opengraph-image`) — test in a link preview
- [ ] Lighthouse: aim SEO 100, A11y 100, Best Practices 100, Perf 95+
