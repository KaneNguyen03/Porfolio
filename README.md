# Kane Nguyen — Portfolio

Modern React + TypeScript portfolio (Vite + Tailwind + Framer Motion + React Router) showcasing work for junior-to-middle Software Engineer roles.

## Highlights
- Responsive, animated multi-page site (Home, About, Projects, Experience, Education, Contact) with light/dark theme persistence via [src/contexts/ThemeContext.tsx](src/contexts/ThemeContext.tsx).
- Data-driven profile: update one source for bio, skills, roles, and projects in [src/data/portfolio.ts](src/data/portfolio.ts).
- Projects grid with tech filters, expandable achievements, and image/video slots.
- Contact form using EmailJS with automatic mailto fallback when env vars are absent.
- Code-splitting via React lazy + Suspense; ready for Vercel deployment.

## UX/UI Improvement Plan
- **Narrative:** Reframe hero copy and CTA to highlight “seeking junior/middle backend/full-stack roles,” add proof (metrics, shipped features) per project.
- **Visual system:** Establish a token set for spacing, radii, and color accents; keep consistent gradients and shadows; use purposeful typography (e.g., strong display for hero, readable body for case studies).
- **Case-study cards:** Add quick tags (team size, role, result), collapse long text by default, and surface primary metric per project; keep filter chips sticky on scroll.
- **Interaction polish:** Micro-animations on hover/press, reduced motion respect, focus-visible outlines, and keyboard-friendly buttons/links.
- **Credibility:** Surface current Bizzi role, include “available for junior/middle roles” badge, and add testimonials/reference highlights on Contact.
- **Performance:** Compress hero/project assets, prefer responsive `object-cover` images, and audit bundle via `npm run analyze`.

## Quick Start
1. Prerequisites: Node.js >= 18 and npm.
2. Install: `npm install`
3. Dev server: `npm run dev`
4. Build: `npm run build`
5. Preview build: `npm run preview`

## Scripts
- `npm run dev` — Vite dev server.
- `npm run build` — TypeScript project refs then Vite build.
- `npm run type-check` — TS no-emit check.
- `npm run lint` — ESLint.
- `npm run analyze` — bundle analysis mode.

## Environment (EmailJS)
Add a `.env` (or provider secrets):
```
VITE_SERVICE_ID=<emailjs_service_id>
VITE_TEMPLATE_ID=<emailjs_template_id>
VITE_PUBLIC_KEY=<emailjs_public_key>
```
If missing, the Contact form falls back to mailto using the email in [src/data/portfolio.ts](src/data/portfolio.ts).

## Content & Assets
- Edit portfolio text, roles, and skills in [src/data/portfolio.ts](src/data/portfolio.ts).
- Map project images in [src/assets/projectImages.ts](src/assets/projectImages.ts) and store files under src/assets/projects/.
- Swap avatar/CV in src/assets/ava.jpg and src/assets/Nguyen_Xuan_Kha_Fullstack_CV.pdf.
- Tweak page layouts under src/pages/ and shared UI in src/components/.

## Deployment
- Vercel ready: see [vercel.json](vercel.json); set Node 22.x (per [VERCEL_BUILD_FIX.md](VERCEL_BUILD_FIX.md)).
- Default commands: `npm install`, `npm run build`, output `dist`.

## Hiring Focus
Positioned for junior-to-middle Software Engineer roles with emphasis on Node.js/TypeScript, React, AWS, and event-driven backends. Ensure visible metrics and current Bizzi experience stay updated in [src/data/portfolio.ts](src/data/portfolio.ts).
