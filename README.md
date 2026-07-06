# Siva Suburamaniyam V — Portfolio

A premium, minimal personal portfolio built as a luxury digital product.
Dark-first with a light/dark toggle, editorial typography, soft skeuomorphic
depth, subtle parallax, and a fully data-driven architecture — update content
by editing files in `src/data`, never the components.

**Stack:** Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · Framer
Motion · Lenis smooth scroll · next-themes · Lucide. Optimised for Netlify.

---

## 1. Quick start

```bash
npm install      # install dependencies
npm run dev      # start dev server → http://localhost:3000
npm run build    # production build
npm run start    # serve the production build locally
npm run lint      # lint
npm run typecheck # TypeScript check (tsc --noEmit)
```

> Requires **Node 20.9+**.

---

## 2. Required manual steps before it looks/deploys perfectly

These are assets and values only you can provide. The site runs without them
(graceful placeholders are built in), but complete them before going live:

1. **Satoshi font** *(required for the intended look)*
   Download the Satoshi variable font from Fontshare
   (https://www.fontshare.com/fonts/satoshi — free for commercial use) and place:
   ```
   public/fonts/Satoshi-Variable.woff2
   ```
   The path is wired in `src/lib/fonts.ts`. Until it exists, the build falls
   back to system-ui via the configured fallback stack.

2. **Your real content** — edit files in `src/data` (see §5). Every value
   marked `[PLACEHOLDER]` is safe to replace.

3. **Resume PDF**
   ```
   public/resume/siva-suburamaniyam-resume.pdf
   ```
   Update the filename in `src/data/profile.ts` (`resumeUrl`) if different.

4. **Project & certificate images** (optional — placeholders render otherwise)
   ```
   public/images/projects/*.jpg      # project covers + architecture diagrams
   public/icons/providers/*.svg      # certificate provider logos
   ```
   Paths are set per item in `src/data/projects.ts` and `src/data/certificates.ts`.

5. **App icons** for the PWA manifest / Apple touch icon
   ```
   public/favicon.ico
   public/icons/icon-192.png
   public/icons/icon-512.png
   ```
   A brand SVG favicon (`src/app/icon.svg`) is already included and used by
   default; the PNG/ICO versions improve device/PWA coverage.

6. **Production URL** — set your final domain in `src/data/site.ts` (`url`).
   This drives canonical URLs, Open Graph, sitemap, and robots.

7. **Netlify Forms** — enable form detection once in the Netlify UI
   (Forms → Enable form detection). See §4.

No environment variables are required. See `.env.example` for optional ones.

---

## 3. Architecture

```
src/
  app/            App Router entry, metadata, SEO routes, global CSS
  components/
    layout/       Container, Section shell, Navbar, MobileMenu
    sections/     Hero, About, Projects (CaseStudy/ProjectCard), Skills,
                  Education, Certifications, Contact (+ ContactForm), Footer
    ui/           Reusable primitives (Button, Card, Chip, glows, etc.)
    seo/          StructuredData (JSON-LD)
  animations/     Shared Framer Motion variants + easing
  hooks/          useReducedMotion, useScrollState, useActiveSection, …
  lib/            cn() util, icon registry, fonts
  providers/      ThemeProvider, SmoothScrollProvider
  data/           ← ALL CONTENT LIVES HERE (edit these)
  types/          TypeScript contracts for all content
  styles/         (reserved)
public/           fonts, images, resume, icons, __forms.html
```

**Design system:** all tokens (colors, type scale, spacing, radii, shadows,
easing) are defined once in `src/app/globals.css` via Tailwind v4 `@theme`.
Components reference semantic tokens only (`bg-surface`, `text-accent`, …), so
theming and light/dark are centralised.

---

## 4. Netlify deployment

1. Push the repo to GitHub/GitLab.
2. In Netlify: **Add new site → Import an existing project**, pick the repo.
3. Build settings are auto-detected from `netlify.toml`:
   - Build command: `npm run build`
   - `@netlify/plugin-nextjs` handles the App Router, SSR, and `next/image`.
4. Deploy.
5. **Enable Netlify Forms:** Netlify UI → **Forms → Enable form detection**,
   then redeploy. The contact form is registered via `public/__forms.html`
   (required because Next.js doesn't emit static HTML for React forms). With
   JavaScript disabled, the form falls back to a `mailto:` link automatically.
6. Set your custom domain and update `url` in `src/data/site.ts`.

---

## 5. What to edit in the future (content only)

You should almost never touch component files. To update the site:

| Task                    | File                          |
|-------------------------|-------------------------------|
| Name, role, tagline, email, résumé, socials | `src/data/profile.ts` |
| About story, status, goal, strengths | `src/data/about.ts`    |
| **Add / edit projects** | `src/data/projects.ts`        |
| **Add / edit skills**   | `src/data/skills.ts`          |
| **Add / edit education**| `src/data/education.ts`       |
| **Add / edit certificates** | `src/data/certificates.ts` |
| Contact copy            | `src/data/contact.ts`         |
| Nav links               | `src/data/navigation.ts`      |
| SEO title/description/keywords/URL | `src/data/site.ts` |

**Add a project:** append an object to the `projects` array in
`projects.ts`. Set `featured: true` for a full case study, `false` for a
compact card. Only the fields you fill in render — omit blocks you don't need.

**Add experience:** the `ExperienceItem` type exists in `src/types`. Create
`src/data/experience.ts` following the `education.ts` pattern and render it in
a section (or ask to add an Experience section).

### Changing colors / theme
Edit the token values in `src/app/globals.css`:
- Light theme under `:root`, dark theme under `.dark`.
- The single accent is `--c-accent` (dark) / the `:root` accent (light).
Change those two and the whole site follows.

### Changing animations
- Global easing/durations/variants: `src/animations/variants.ts`.
- All motion respects `prefers-reduced-motion` automatically.

---

## 6. Accessibility & performance notes

- Semantic landmarks (`header`/`nav`/`main`/`section`/`footer`), one `<h1>`,
  correct heading nesting, skip-link, visible focus rings, `aria-current` on
  active nav, labelled icon buttons, `aria-modal` mobile menu with focus
  management and scroll lock.
- `prefers-reduced-motion` collapses all motion (CSS + JS level).
- `next/image` with modern formats (AVIF/WebP), `preload` on the LCP image,
  lazy elsewhere, and `qualities` allowlisted (Next 16 requirement).
- Fonts self-hosted via `next/font` (no layout shift).
- Ambient/grain layers are GPU-composited; grain is a static server component.

---

## 7. License

Personal portfolio. Fonts and any third-party logos you add are subject to
their own licenses.
