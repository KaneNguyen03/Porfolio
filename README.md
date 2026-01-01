# Kane Nguyen — Portfolio

Modern React + TypeScript portfolio built with Vite, Tailwind CSS, Framer Motion, and React Router. The site showcases experience, projects, and contact details with a polished, animated UI and light/dark themes.

## Features
- Responsive multi-page layout (Home, About, Projects, Experience, Education, Contact) powered by React Router.
- Animated sections and interactive cards using Framer Motion.
- Light/Dark theme with persistent preference via localStorage ([src/contexts/ThemeContext.tsx](src/contexts/ThemeContext.tsx)).
- Data-driven content: edit one file to update profile, skills, work history, and projects ([src/data/portfolio.ts](src/data/portfolio.ts)).
- Projects grid with tech filters, expandable achievements, image/video support, and CTA buttons.
- Contact form with EmailJS integration plus graceful `mailto:` fallback when credentials are missing.

## Tech Stack
- React 18, TypeScript, Vite
- Tailwind CSS
- Framer Motion
- React Router DOM
- Lucide React icons

## Getting Started
1. Prerequisites: Node.js >= 18 and npm.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the dev server:
   ```bash
   npm run dev
   ```
4. Build for production:
   ```bash
   npm run build
   ```
5. Preview the production build locally:
   ```bash
   npm run preview
   ```

## Scripts
- `npm run dev` — start Vite dev server.
- `npm run build` — type-check (project references) then build.
- `npm run type-check` — TypeScript no-emit check.
- `npm run lint` — ESLint across the project.
- `npm run analyze` — bundle analysis mode for Vite.

## Environment Variables (EmailJS)
Set these in a `.env` file or your hosting provider to enable the contact form:
```
VITE_SERVICE_ID=<emailjs_service_id>
VITE_TEMPLATE_ID=<emailjs_template_id>
VITE_PUBLIC_KEY=<emailjs_public_key>
```
If any are missing, the form automatically falls back to a `mailto:` link targeting your configured email in [src/data/portfolio.ts](src/data/portfolio.ts).

## Customization
- **Portfolio data:** update text, links, skills, and projects in [src/data/portfolio.ts](src/data/portfolio.ts).
- **Images:** map project images in [src/assets/projectImages.ts](src/assets/projectImages.ts) and place files under `src/assets/projects/`.
- **Branding/CV:** swap `src/assets/ava.jpg` and `src/assets/Nguyen_Xuan_Kha_Fullstack_CV.pdf` as needed.
- **Styling:** adjust Tailwind utility classes in components under `src/components/` and page layouts under `src/pages/`.

## Deployment
- Default adapter works on Vercel; see [vercel.json](vercel.json) for settings.
- Use Node 22.x in Vercel Project Settings (per [VERCEL_BUILD_FIX.md](VERCEL_BUILD_FIX.md)); build command `npm run build`, output `dist`.

## Project Structure
- `src/components/` — shared UI (header, footer, error boundary, etc.).
- `src/pages/` — route-based screens.
- `src/contexts/` — theme provider.
- `src/data/` — portfolio content and typings.
- `src/assets/` — images and static assets.

## Notes
- There are no automated tests yet; run `npm run build` before shipping.
- Lighthouse/performance optimizations (code-splitting via lazy routes, optimized assets) are already applied in the current layout.
