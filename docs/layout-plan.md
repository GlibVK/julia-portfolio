# Layout plan: Julia portfolio

Build plan for the one-page portfolio site from the Figma mockup. Each section is sized to fit comfortably into one Claude 5-hour usage window, with room left for fixes.

- Figma file (Design Files page): https://www.figma.com/design/U0UJjEGouf1uoUEPAa8XkV/%D0%9C%D0%BE%D0%B5-%D0%BF%D0%BE%D1%80%D1%82%D1%84%D0%BE%D0%BB%D0%B8%D0%BE---Julia--Copy-?node-id=0-1
- The design is read-only for this work. Do not change anything in Figma.
- Mockup assets: `images/figma/<section-folder>/`
- Menu states, hover effects, animations and mobile menu (not in Figma): `docs/interaction-spec.md`. Read it before sections 01–07.

## Mockup overview

Four 1920x1024 screens of one scrolling page. All screens share a fixed left sidebar and a menu icon in the top-right corner. Each screen has a large light-grey background number ("01", "02", "03").

| Figma frame | Node | Site section |
|---|---|---|
| Creative portfolio home v5 | `1:130` | Home: hero + services row |
| Creative portfolio Designer intro | `1:63` | About: intro, services list, skill bars |
| Creative portfolio works | `1:183` | Works: portfolio cards |
| Creative portfolio Designer biodata | `1:2` | Education, Experiences, Interests, References |

## Sections

| # | Section | Figma nodes | Assets folder | Notes |
|---|---|---|---|---|
| 00 | Foundation (done) | whole page | none | Stack, file structure, fonts, color and spacing tokens, base styles, page grid (fixed sidebar + content), reusable background-number component |
| 01 | Sidebar (shared) (done) | sidebar elements in `1:130` | `images/figma/01-sidebar/` | Logo, nav with active underline and arrow, contact email, social icons, top-right menu icon, anchor links to sections |
| 02 | Home hero | `1:178`, `1:139`, `1:177`, `1:131` | `images/figma/02-home-hero/` | Portrait on the yellow rounded-diamond shape, "Designer / Developer" label, large name, background "01" |
| 03 | Home services + button | `1:162`, `1:166`, `1:170`, `1:140` | none | Three numbered services in a row and the black "View all works" button (reused in section 04) |
| 04 | About: intro and skills | `1:63` | none | Services list (reuse the component from 03), "Introduction" heading and text, four skill bars with percentages |
| 05 | Works: portfolio | `1:183` | `images/figma/05-works/` | Heading and intro text, horizontal row of cards with colored backgrounds, illustrations, SVG/PSD tags. Card illustrations (`1:225`, `1:251`, `1:281`) are exported as SVG without background. The 4th card is a cut-off duplicate of card 3 |
| 06 | Biodata | `1:2` | none | Education, Experiences, Interests, References as a 2x2 grid of timeline entries |
| 07 | Responsive | all | none | Tablet and mobile layouts: sidebar becomes a burger menu, columns stack, large type scales down |
| 08 | Final QA | all | none | Compare with Figma at 1920 / 1440 / 768 / 375 px, accessibility, performance, link check |

## How to run each section

1. Start a new session for each section.
2. Give it this file and the section number, plus the Figma link to the section's node.
3. Read only that section's nodes from Figma, not the whole page.
4. Finish with a visual check against the Figma screenshot at desktop and mobile width.
5. Leave fixes for the end of the same window, or for the next session before starting a new section.

## Foundation (section 00, done)

Decisions approved by the user:

- **Stack:** Vite 8 + React 19 + TypeScript 6, plain CSS with custom properties (no CSS framework). The app lives in `site/`.
- **Git:** repository at `julia-free/` root. `node_modules`, `site/dist` and the `.fig` file are ignored. Commit only after the user approves.
- **Old TemplatesJungle files** (`index.html`, `style.css`, `css/`, `js/`, old images in `images/`) stay where they are as reference. They are not used by the new site.
- **License credit:** keep a small "Design by TemplatesJungle" link to https://templatesjungle.com/ (add it in section 01, bottom of the sidebar).

### Structure

```
julia-free/
  site/                         Vite app (run all npm commands here)
    index.html                  HTML shell, Google Fonts Roboto 400/500/700/900
    vite.config.ts              alias '@figma' -> ../images/figma
    src/
      main.tsx                  entry; ?grid in the URL outlines sidebar and sections
      App.tsx                   page skeleton: sections home, about, works, biodata
      styles/tokens.css         colors, type scale, spacing, grid constants (from Figma)
      styles/base.css           reset and global element styles
      components/
        PageLayout/             fixed sidebar (400px) + content column
        Section/                one Figma frame: min-height 1024px, clips overflow
        BackgroundNumber/       large "01"/"02"/"03"; props x, y = Figma frame coords
  images/figma/                 mockup assets; import as '@figma/01-sidebar/julia-logo.svg'
  tools/fig-inspect/            offline reader for the local .fig file (see below)
```

Commands (PowerShell, in `julia-free\site`): `npm run dev` (http://localhost:5173), `npm run typecheck`, `npm run build`.

### Conventions for the next sections

- Put each section's components in `src/components/<Name>/` with a `.tsx` and a `.css` file. Use tokens from `tokens.css`; add a token there instead of hard-coding a repeated value.
- Coordinates: content column starts at Figma x = 400. Inside a section, CSS left = Figma x - 400; top = Figma y relative to the frame.
- Figma line height "Auto" (stored as `100 PERCENT`) is `var(--line-height-auto)` = 1.172 for Roboto. Figma letter spacing in % maps to em (-10% = -0.1em).
- Figma applies letter spacing between characters only; CSS also adds it after the last one. Anchor text with negative letter spacing by its left edge.
- Section ids: `home` (1:130), `about` (1:63), `works` (1:183), `biodata` (1:2). Experience / Education / References anchors go inside `biodata` (section 06).
- The layout is desktop-only for now: at narrow widths the 400px sidebar overlaps content. Section 07 fixes this.

### Reading Figma without the MCP server

The Figma MCP Starter plan hit its call limit during section 00. The local `.fig` file has the same node ids, so it can be read offline (read-only):

```powershell
Expand-Archive .\julia-personal-portfolio-online-cv-figma-template.fig -DestinationPath $env:TEMP\julia-fig -Force
node tools/fig-inspect/decode.cjs $env:TEMP\julia-fig\canvas.fig $env:TEMP\julia-fig\nodes.json
node tools/fig-inspect/tree.cjs $env:TEMP\julia-fig\nodes.json 1:130 2
```

`tree.cjs` prints each node's position, size, fill colors, stroke and text styles (font, size, line height, letter spacing). It does not render screenshots; use exported PNGs or the Figma app for visual comparison.

## Section 01 notes (done)

- Components: `Sidebar/SidebarContent` (logo, nav, email, social icons, credit), `Nav`, `SocialLinks`, `Menu` (top-right button + drawer). Content lives in `src/data/site.ts`; the email and social URLs are placeholders to replace before launch.
- The same `SidebarContent` renders in the fixed sidebar and in the drawer. The drawer is a native `<dialog>` opened with `showModal()` (focus trap, Esc, inert page), slides in from the right (the button is top-right), closes on link click, Esc and backdrop click, and locks page scroll.
- Active nav item: `useActiveSection` (IntersectionObserver, middle band of the viewport) + `useActiveNavItem` (Experience / Education share the biodata screen; the last clicked one wins, otherwise Experience). It sets `aria-current`.
- Section 06 must move the ids `experience`, `education` from the temporary spans in `App.tsx` onto the real blocks.
- User feedback (2026-11-24): every nav item has a static grey 1px divider (`--color-divider`); on hover a 1px black line (`--color-ink`, as in Figma) fills it from the left while the grey part shrinks (clip-path, no overlap), and stays on the active item. The divider is 0.5px; both have rounded ends. "References" was replaced by a collapsible "Projects" item (grey chevron rotates down and turns black, submenu with placeholder links in `projectsGroup` in `site.ts`). Grey static lines sit above and below the social icons. Nav order stays as in Figma: Home, About, Works, Experience, Education, Projects.
- Below 992px the fixed sidebar is hidden and the menu button (top 12px, right 12px) opens the drawer. From 992px the button and drawer are hidden and an open drawer closes itself (`DESKTOP_QUERY` in `Menu.tsx`; keep 992px in sync with `Menu.css` and `PageLayout.css`). The burger bars are 7.2px apart (`--menu-bar-step` in `Menu.css`, whole screen pixels at 125% scaling); the middle bar is clipped to 10px and grows to 16px on hover (clip-path, not scaleX). The rest of the responsive layout is section 07.
- The active-item arrow from Figma (`1:160`) was removed at the user's request; the active item is marked only by the yellow line.
- Verified at 1920x1024: logo, nav and active line land on the Figma coordinates (within 1px). The bottom block (email, lines, icons) moved by up to 25px after the extra grey line was added at the user's request.
- Testing tip: the built-in browser pane throttles frames while hidden, so IntersectionObserver and transitions lag there. Wait 2-3 s between steps or keep the pane visible.

## Asset notes

- `images/figma/_unused/` holds a photo that is hidden in every frame of the mockup. It is not part of the visible design.
- The other files in `images/` (banner, portfolio, thumbnails, logos) belong to the original TemplatesJungle HTML template, not to the mockup. Decided in section 00: keep them in place as reference; the new site does not use them.
- The HTML template license requires keeping the TemplatesJungle credit link unless the paid version is used. Decided in section 00: keep a small credit link (added in section 01).
