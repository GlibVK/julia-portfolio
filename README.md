# Julia — one-page portfolio

A personal portfolio site rebuilt in React from the free "Julia" template by
[TemplatesJungle](https://templatesjungle.com/) (layout and motion copied from its live demo,
graphics from its Figma file). The site keeps the template's credit link, as its licence requires.

- Home page: hero, biodata, experience and skills, featured works, contact with FAQ and a mail form.
- `/portfolio/`: every project with category filters.

Live site: published to GitHub Pages from `master` by `.github/workflows/deploy-pages.yml`.

## Stack

Vite 8, React 19, TypeScript, plain CSS with custom properties. No UI or animation libraries.
Both pages are prerendered to static HTML at build time and hydrated in the browser.

## Run locally

The app lives in `site/` (Node 20.19+ or 22.12+):

```powershell
cd site
npm install
npm run dev        # http://localhost:5173
npm run build      # typecheck, build and prerender into site/dist
npm run preview    # serve site/dist at http://localhost:4173
```

## Add a project

1. Put its picture in `images/portfolio/source/<name>.jpg` (or `.png`).
2. Run `npm run images` in `site/` to write the optimised tiles.
3. Add an entry to `projects` in `site/src/data/site.ts` with `cover: { kind: 'photo', photo: '<name>' }`
   and its `categories`; `featured: true` also shows it on the home page and in the menu.

## Docs

- `docs/layout-plan.md`: build plan, measurements and decisions per section.
- `docs/interaction-spec.md`: menu, hover and scroll-reveal behaviour.
