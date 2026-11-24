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
| 02 | Home hero (done) | `1:178`, `1:139`, `1:177`, `1:131` | `images/figma/02-home-hero/` | Portrait on the yellow rounded-diamond shape, "Designer / Developer" label, large name, background "01" |
| 03 | Home services + button (done) | `1:162`, `1:166`, `1:170`, `1:140` | none | Three numbered services in a row and the black "View all works" button (reused in section 04) |
| 04 | Experience: intro and skills (done) | `1:63` | none | Rebuilt as the demo's section 03: intro, personal info table, five skill bars, background "03"; sidebar also matched to the demo (see Section 04 notes) |
| 05 | Works: portfolio | `1:183` | `images/figma/05-works/` | Heading and intro text, horizontal row of cards with colored backgrounds, illustrations, SVG/PSD tags. Card illustrations (`1:225`, `1:251`, `1:281`) are exported as SVG without background. The 4th card is a cut-off duplicate of card 3 |
| 06 | About / Biodata (done) | `1:2` | none | The demo's "BIODATA" section placed above Experience as `about`: Education, Experiences, Interests, References in a 2x2 grid (see Section 06 notes) |
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
      App.tsx                   page skeleton: sections home, about, experience, works
      styles/tokens.css         colors, type scale, spacing, grid constants (from Figma)
      styles/base.css           reset and global element styles
      components/
        PageLayout/             fixed sidebar (400px) + content column
        Section/                one Figma frame: min-height 1024px, clips overflow
        BackgroundNumber/       large "01"/"02"/"03"; props x, y = Figma frame coords
  images/figma/                 mockup assets; import as '@figma/01-sidebar/julia-logo.svg'
  tools/fig-inspect/            offline reader for the local .fig file (see below)
```

Commands (PowerShell, in `julia-free\site`): `npm run dev` (http://localhost:5173), `npm run typecheck`, `npm run build` (includes the prerender), `npm run preview` (serves `dist/`, http://localhost:4173), `npm run images` (regenerates optimised images).

### Conventions for the next sections

- Put each section's components in `src/components/<Name>/` with a `.tsx` and a `.css` file. Use tokens from `tokens.css`; add a token there instead of hard-coding a repeated value.
- Coordinates: content column starts at Figma x = 400. Inside a section, CSS left = Figma x - 400; top = Figma y relative to the frame.
- Figma line height "Auto" (stored as `100 PERCENT`) is `var(--line-height-auto)` = 1.172 for Roboto. Figma letter spacing in % maps to em (-10% = -0.1em).
- Figma applies letter spacing between characters only; CSS also adds it after the last one. Anchor text with negative letter spacing by its left edge.
- Section ids (demo order, since 2026-11-24): `home` (1:130), `about` (biodata, 1:2), `experience` (1:63), `works` (1:183). See Section 06 notes.
- The layout is desktop-only for now: at narrow widths the 400px sidebar overlaps content. Section 07 fixes this.
- **Responsive rules (user, 2026-11-24, revised the same day to follow the demo), apply to every section below 992px:** copy the live demo's stacked layout (measure it at 375, 393 and 768px): one column with 48px side padding, images as wide as the column (capped at their demo size, centred), text and buttons aligned to the left edge, demo font formulas (e.g. name `calc(3rem + 8.5vw)`, h3 `calc(1.3rem + 0.6vw)`); nothing cut off or running off screen; the same appear animations as on desktop; the 1920px layout must not change. From 992 to 1920px the desktop composition shrinks proportionally (`--fig-px`, see Section 02 notes); check at 992 and ~1300px too. Reference: the hero in section 02.

### Reading Figma without the MCP server

The Figma MCP Starter plan hit its call limit during section 00. The local `.fig` file has the same node ids, so it can be read offline (read-only):

```powershell
# Windows PowerShell 5.1 only unzips files named .zip, so copy the .fig first
Copy-Item .\julia-personal-portfolio-online-cv-figma-template.fig $env:TEMP\julia-fig.zip -Force
Expand-Archive $env:TEMP\julia-fig.zip -DestinationPath $env:TEMP\julia-fig -Force
node tools/fig-inspect/decode.cjs $env:TEMP\julia-fig\canvas.fig $env:TEMP\julia-fig\nodes.json
node tools/fig-inspect/tree.cjs $env:TEMP\julia-fig\nodes.json 1:130 2
```

`tree.cjs` prints each node's position, size, fill colors, stroke and text styles (font, size, line height, letter spacing). It does not render screenshots; use exported PNGs or the Figma app for visual comparison. It also does not print rotation or mask flags: read the raw `transform` matrix (`m00 m01 m02 / m10 m11 m12`) and `mask` in `nodes.json` (section 02 needed both).

## Section 01 notes (done)

- Components: `Sidebar/SidebarContent` (logo, nav, email, social icons, credit), `Nav`, `SocialLinks`, `Menu` (top-right button + drawer). Content lives in `src/data/site.ts`; the email and social URLs are placeholders to replace before launch.
- The same `SidebarContent` renders in the fixed sidebar and in the drawer. The drawer is a native `<dialog>` opened with `showModal()` (focus trap, Esc, inert page), slides in from the right (the button is top-right), closes on link click, Esc and backdrop click, and locks page scroll.
- Active nav item: `useActiveSection` (IntersectionObserver, middle band of the viewport) + `useActiveNavItem` (Experience / Education share the biodata screen; the last clicked one wins, otherwise Experience). It sets `aria-current`.
- (Done in section 06: one nav item per section; the temporary spans are gone.)
- User feedback (2026-11-24): every nav item has a static grey 1px divider (`--color-divider`); on hover a 1px black line (`--color-ink`, as in Figma) fills it from the left while the grey part shrinks (clip-path, no overlap), and stays on the active item. The divider is 0.5px; both have rounded ends. "References" was replaced by a collapsible "Projects" item (grey chevron rotates down and turns black, submenu with placeholder links in `projectsGroup` in `site.ts`). Grey static lines sit above and below the social icons. Nav order stays as in Figma: Home, About, Works, Experience, Education, Projects.
- Below 992px the fixed sidebar is hidden and the menu button (top 12px, right 12px) opens the drawer. From 992px the button and drawer are hidden and an open drawer closes itself (`DESKTOP_QUERY` in `Menu.tsx`; keep 992px in sync with `Menu.css` and `PageLayout.css`). The burger bars are 7.2px apart (`--menu-bar-step` in `Menu.css`, whole screen pixels at 125% scaling); the middle bar is 10px wide, right-aligned, and grows to 16px on hover by animating its `width` (changed 2026-11-24: `clip-path` is painted without pixel snapping and left a half-grey row and grey right edge at 125% scaling; scaleX blurs). Bars have square ends (a 1px radius made the corner pixels grey). Colour `--color-text` #111, as the Figma icon. The rest of the responsive layout is section 07.
- The active-item arrow from Figma (`1:160`) was removed at the user's request; the active item is marked only by the yellow line.
- Verified at 1920x1024: logo, nav and active line land on the Figma coordinates (within 1px). The bottom block (email, lines, icons) moved by up to 25px after the extra grey line was added at the user's request.
- Testing tip: the built-in browser pane throttles frames while hidden, so IntersectionObserver and transitions lag there. Wait 2-3 s between steps or keep the pane visible.

## Section 02 notes (done)

- Component `HomeHero` (inside `Section id="home"`): portrait group, role label `<p>` and the page `<h1>` "Julia Stiles".
- Figma geometry that the plan did not list: the yellow shape `1:179` and a hidden alpha mask `1:181` (595x601, larger) are rounded rectangles (radius 150) **rotated 45deg around their top-left corner**. The mask clips the portrait, so the head rises above the yellow diamond and the jeans end in the mask's bottom corner. CSS copies this: `.hero__mask` is rotated with `overflow: hidden`, the `<img>` inside is rotated back by -45deg at the Figma position converted into the mask's coordinates (formula in `HomeHero.css`). In Figma the picture is the top layer, so `.hero__pic` has `z-index: 1`.
- Shared motion pieces for later sections (current reveal timing: see "Scroll reveal = demo AOS" in Section 03 notes):
  - `hooks/useRevealTrigger` — returns `{ ref, active }`; `active` while the element's layout top (its rect minus its own current translateY) is above `innerHeight - 120`. Scroll/resize listener throttled with rAF. Used by `Reveal` and `SplitText`. (An IntersectionObserver version was dropped: it sees the drawn, shifted box, so the trigger line moved with the animation.)
  - `components/Reveal` — `<Reveal effect="fade-up|fade-right|fade-in" delay={ms} className>` renders a `<div>` with `data-reveal` / `data-visible`; CSS in `Reveal.css`; `as` renders another tag (`as="li"`).
  - `components/SplitText` — `<SplitText as="h2" text="..." className>`; letters slide up 1.2em, 900ms `--ease-text`, delay `--text-delay-base` + index x `--text-delay-step` (spaces count). Plain text for screen readers in a `.visually-hidden` span, letters `aria-hidden`. Words clip with `--split-text-bleed` (0.1em) padding cancelled by a negative margin; verified that nothing is clipped at line-height 0.8.
  - `main.tsx` adds `html.js`; hidden start states apply only under `.js` + `prefers-reduced-motion: no-preference`.
- New tokens: `--duration-text`, `--reveal-distance`, `--text-delay-base`, `--text-delay-step`, `--split-text-bleed`, `--radius-hero-shape`.
- Verified at 1920x1024 (getBoundingClientRect): picture frame (411.9, -37.6), yellow diamond bounding box from (469.1, 92.4), portrait (615.0, 57.0) on the page = (203.1, 94.6) inside the frame, label (1155, 213), name (1155, 286, width 550) — all within 0.1px of Figma. "Julia" / "Stiles" break onto two lines as in Figma. The name's CSS box is 364.8px high (2 x 0.8 x 228) vs 352px in Figma; glyph positions are unaffected.
- Below 992px: **replaced** — see "Stacked layout = demo" below. (First version: centred 480px column, text centred under the portrait.)
- Desktops narrower than 1920px (user report 2026-11-24: at ~1300px the name was off screen, wider it was half cut): `--fig-px` in `tokens.css` = `min(1px, (100vw - 400px) / 1520)` is one Figma pixel of the content column. Every absolute desktop value in the hero and in `BackgroundNumber` is `calc(<Figma value> * var(--fig-px))`, and `--section-min-height` is `1024 * --fig-px`, so the whole frame shrinks as one picture between 992 and 1920px and is exact at 1920+. The role label never goes below 12px. Below 992px `--fig-px` is `min(1px, 100vw / 1520)`; the stacked hero ignores it, but the background "01" now shows (small, behind the portrait) and the home section is only as tall as its content. Checked at 992, 1310, 1920 and 375px. Note: `100vw` includes the scrollbar, so the composition is ~1% wider than the column; the right-most pixel of "01" can be clipped.
- One section = at least one screen (user request 2026-11-24): `--section-min-height` is `max(1024 * --fig-px, 100svh)`, so the next section and its background number appear only after scrolling, on any width and height. Below 992px the background number ignores the Figma x/y and sits in the section's bottom-right corner (`--bg-number-mobile-size` 50vw, bottom 20% cut off by the section edge), so it is in the same place on every screen. On desktop it keeps the scaled Figma position. Checked at 375x812, 615x898, 768x1024, 1310x1190, 1920x1024 and 1920x1400.
- **Convention for sections 03–06:** position desktop elements with `calc(<Figma value> * var(--fig-px))`, not fixed px, so they scale with the hero.
- Performance: done in "Speed and SEO pass" below (portrait now AVIF/WebP/PNG at 423/846px).

## Home screen follows the demo (user decision 2026-11-24)

After comparing screenshots, the user asked for the home screen to match the live demo (https://demo.templatesjungle.com/julia/), which they call the original. Measured on the demo at a 2000x978 viewport (our `--fig-px` = 1 there; numbers below are page px) and copied into `HomeHero.css`, `Services.css`, `ButtonLink.css`, `tokens.css`:

| Element | Demo (= ours now) | Was (Figma) |
|---|---|---|
| Picture | same art; yellow x 570–1148, head top 48, jeans end 715 → Figma group at 98% (828.5px) at (454.4, −51.2) | 845px at (411.9, −37.7) |
| "Designer / Developer" | x 1166, glyph top 147; 14.4px Regular, uppercase, no letter spacing, `rgb(33 37 41 / 0.75)` | 20px Bold, +10%, black, y 213 |
| "Julia Stiles" | x 1166; Roboto Bold 218px, −6%, #212529, lines 252px apart (line-height 1.156), first baseline y ~352 | Black 228px, −5%, #333, line-height 0.8 |
| Services | y 732, x 550 / 858 / 1166 (308 apart, 284 wide); number and text 14.4px #333 (lh 1.7), title 28px Bold #212529 (lh 1.2), 8px gap | y 797, 12 / 22 / 16px |
| Button | x 1474, y 732, 217x74, #212529, 16px Regular uppercase | 259x93, #111, Bold |
| Background "01" | box (1325, 249), glyph baseline y ~806 (demo: 600px, line-height 0.7, right −10%, bottom 100px) | (1342, 463) |

Verified on our page at 2000x978: label, both name lines (Julia 1166–1577, Stiles 1166–1641 — identical widths), services, button and "01" within 1px of the demo; picture within the ~2px precision of a screenshot. No overlaps or horizontal scroll at 1920, 1310, 992 and 393px. The button text stays "View all works" (demo: "View All Work"). The rest of the site still follows Figma unless the user asks otherwise.

## Stacked layout = demo (below 992px, user request 2026-11-24)

Measured on the demo at 393x852, 375x667 and 768x1024 and copied; our page now matches it to the pixel at 393 and 768 (picture box, label, name baselines, services, button, section height, background number):

- `.hero`: padding 48px top / 48px sides / 48px bottom (`--hero-mobile-top|inline|bottom`).
- Picture: `.hero__media` is the demo's image box — column width, max 596px, centred, aspect 592:684, a size container. The Figma picture group inside is 139.95cqw wide at (−16.15cqw, −16.75cqw), the same proportions as on desktop (box 592 at (550, 48) ↔ group 828.5 at (454.4, −51.2)). On desktop `.hero__media` is `display: contents`.
- Text left-aligned (was centred). Label 14.4px, 8px under the picture box. Name `calc(3rem + 8.5vw)` (81px at 393 → two lines, 113px at 768 → one line), `margin-top: -0.078em` puts the baseline where the demo has it.
- Services stacked 16px apart, starting `8px + 0.078em-of-the-name` under the name; titles `calc(1.3rem + 0.6vw)`. Button 217x74, 16px under the last service.
- Background "01": 600px, line-height 0.7, right edge = column right edge, bottom 100px above the section bottom (demo `.bg-text::after`); on phones the left of the "0" runs off screen, as in the demo.
- Sections keep `min-height: 100svh` (user rule), so on short phones the home screen still fills the screen.
- Not copied: the demo's menu button (26px at top/right 40px); ours stays as built in section 01 (confirmed by the user 2026-11-24 after comparing at 768px).

## Section 03 notes (done, built together with 02)

- `components/Services` (`<Services items className stagger>`): `<ul>` of numbered items (number from the order, title `<h2>`, text). Data in `site.ts` → `services`. Reuse it in section 04 with its own placement class.
- `components/ButtonLink` (`<ButtonLink href className>`): black button link, hover `#111 → --color-button-bg-hover` (150ms, only under `hover: hover`), `:active` scale 0.98. The section sets its size. Wrap it in `<Reveal>` instead of revealing the button itself, so the press transform and the reveal transform don't clash. Data: `site.ts` → `allWorksLink` (placeholder `#works` until a projects page exists).
- Home placement (`HomeHero.css`): services row at Figma y 797, items at x 499 / 780 / 1065 (grid columns 281 / 285 / 253), button 259x93 as a fourth column of the row (x 1350, y 797) — moved from the Figma corner (x 1661, y 931) at the user's request, as in the demo, so it shows on the first screen with the services. All values x `--fig-px`; type never goes below 10–14px and the button never gets narrower than its text. Inner offsets use service 02 (title +16, text +66); services 01 and 03 differ by up to 4px in Figma.
- **Scroll reveal = demo AOS** (user, 2026-11-24, after comparing with https://demo.templatesjungle.com/julia/ and its DevTools styles; replaces the earlier 800ms/40px decision and a short-lived scroll-linked variant): start `opacity: 0` + shifted 100px (`--reveal-distance`; fade-up from below, fade-right from the left), then opacity and transform change together over **1200ms** with **`ease`** (`--duration-reveal`, `--ease-reveal`). Trigger as AOS `offset: 120`: the element's real top passes 120px above the bottom edge (`useRevealTrigger`). **Replays like the demo** (AOS `once: false`, `mirror: false`; user, 2026-11-24): scrolling back up until the block is below the line hides it again, and it plays again on the next scroll down; a block that leaves through the top of the screen stays shown. The heading letters (`SplitText`) replay the same way. Checked at 393x852: load → hero only; 600 → all; 1600 → all stay; back to 0 → services hidden; 600 again → replayed. Demo measured: 0.2s → opacity 0.22 / 78px, 0.4s → 0.58 / 42px, 0.6s → 0.82 / 18px, 1.2s → done; ours matches.
- Services fade up with 0 / 100 / 200ms stagger, the button with 300ms (as `data-aos-delay`). Hero: portrait fade-right and text fade-in use the same 1200ms / 100px.
- `Section` clips only horizontally (`overflow-x: clip`); the background number sits in `.section__bg`, which clips it at the section edges, so fade-up blocks are not cut while they start below the section edge.
- Below 992px: see "Stacked layout = demo" below.
- Checked: 1920x1024 services match Figma; 2000x978 (user's screen) — services and button play on load in one row, staggered; 393x852 — the first service (top 740 > 852 - 120) plays after ~100px of scroll, then the others at 200 / 300 / 500px.
- Smooth mouse-wheel scrolling (user request 2026-11-24): `hooks/useSmoothWheel`, called once in `App`. No library. Takes over mouse-wheel notches only (legacy `wheelDeltaY` multiple of 120 in Chromium/Safari, `deltaMode` lines in Firefox) and glides the page to a target with time-based easing (`GLIDE_MS` 110). Native scrolling stays for touchpads/touch, `prefers-reduced-motion: reduce`, Ctrl+wheel zoom, horizontal wheels, inner scrollable areas and open dialogs; a key press or pointer down stops a glide. `scroll-behavior: smooth` in `base.css` still handles anchor links. Checked with synthetic events; the feel with a real mouse needs a manual check.
- Testing tip: the browser restores the scroll position on reload; set `history.scrollRestoration = 'manual'` and scroll to the top before testing load-time reveals.

## Section 04 notes (done, rebuilt to follow the demo)

**User decision 2026-11-24:** this screen and the sidebar follow the live demo (its section "03", "Experienced Creative mind"), not Figma 1:63. The first Figma-based version (services list, button, Source Sans 3 skill labels) was replaced; the font file was removed again.

- Component `ExperienceIntro` (was `AboutIntro`; since section 06 inside `Section id="experience"`). Data in `site.ts`: `experienceIntro`, `personalInfo` (`{ label, value, href? }`, placeholders from the demo) and `skills` (`{ name, value }`: one number sets the label and the bar width; the demo draws Illustrator at 90% while its label says 75%).
- Measured on the demo at 2000x978 (`--fig-px` = 1 there; values are page px, CSS left = x - 400) and multiplied by `--fig-px` below that: section padding 48; intro column x 858.5, 592 wide (label 14.4px muted uppercase, heading `SplitText` h2 Roboto Bold 80px #212529, text 14.4px #333); row at y 401 with the info table at x 550.5 and the skills at x 1166.5, both 592 wide, 24px apart, first rows at y 425.
- Heading lines are 116px apart (1.45em) with 96px (1.2em) word boxes at the top of each line, as the demo's inline-block words produce.
- Table: `<dl>` with grid rows, label 33% bold, 8px cell padding, 0.8px `--color-divider` line under every row (41.3px rows). Skills: 500 weight, row 24.5 + 8px bar, 40px apart, percentage at the right end; bar track `#e9ecef`, fill `#ff534a`, radius 15, fill width = value of (track - 8px), starting 1px left of the track.
- The blocks are in one flow (not absolute), so minimum font sizes on small desktops push blocks down instead of overlapping.
- Background number "03" at (1325, 198): the demo's box right edge (120.8px past its section) and glyph baseline (754px under the section top). Numbers now follow the demo order: home 01, about 03, works 04, biodata 02. Done in section 06: biodata is now `about` (02), above `experience` (03).
- Motion: intro, table and skills fade up (demo AOS timing, replay), heading letters slide up, bars grow from the left (`scaleX`, 1s `--ease-out`, 100ms apart; the demo bars are static) and empty again when the block resets. Full bars without JS or with reduced motion.
- Below 992px (demo measured at 393x852): one column, 48px padding; heading `calc(1.625rem + 4.5vw)`; table 88px under the text, skills 64px under the table.
- Verified at 2000x978 against the demo: label, heading lines, text, table rows, skill rows, bars, fills and the "03" box all within 0.5px. No overlaps or horizontal scroll at 1300, 992 and 375px; `npm run build` passes.

### Sidebar follows the demo (same day)

- Measured at 2000x978: 48px left inset (`--sidebar-inset-x`, also the drawer from 576px), logo ink at (48, 48) — our text logo (Roboto Black 64px) is the same size as the demo's 140x49 image, `margin-top: -11.4px` puts the top of "l" on the 48px padding; nav list from y 145, rows 44px (18px on a 43.2px line), 235px wide (`--sidebar-content-width`).
- Bottom group ends at the screen's bottom edge: email 14.4px (16px margin + 16px padding), grey line, icons 16px lower, grey line 16px under the icons, credit 14.4px with 24px above and 40px below. Within 1.5px of the demo (our lines stay 0.5px with rounded ends, per earlier user feedback).
- Nav order: Home, About, Experience, Works, Education, Projects (demo puts Experience before Works; Contact and Get PRO are not built). `sectionIds` is now an explicit list in scroll order.
- Social icons: the demo's five outline icons (Facebook, Twitter, YouTube, Pinterest, Instagram), 24px, 16px apart, `#212529`, inline SVG in `SocialLinks/SocialIcon.tsx` (paths copied from the template's sprite) so colour and hover come from CSS. The Figma icon files in `images/figma/01-sidebar/social/` are no longer used.
- Kept from earlier user decisions: hover/active black line, collapsible Projects, burger and drawer, 400px sidebar column (the demo's narrower column is invisible; changing it would move the home screen). Credit text stays "Design by TemplatesJungle".

## Section 06 notes (done: About = the demo's "BIODATA")

**User decision 2026-11-24:** page order and nav follow the demo — Home 01, About 02 (biodata), Experience 03 ("Experienced Creative mind"), Works 04. Section ids: `home`, `about`, `experience`, `works`; one nav item per section (Home, About, Experience, Works, then the Projects group). "Education" was removed from the nav (the demo has no such item); the temporary `#experience` / `#education` spans are gone. `sectionIds` is derived from `navItems`.

- Component `Biodata` (inside `Section id="about"`), data `biodata` in `site.ts` (eyebrow + four groups of two `{ date, title, text }` entries, placeholders from the demo).
- Measured on the demo at 2000x978 (page px, x `--fig-px` below 2000): section padding 48; two 592px columns at x 550.5 / 1166.5; row 1 at y 48 (the "BIODATA" label only in the first column, so "Experiences" starts at y 48 and "Education" at 72.5), row 2 at y 488.8; group padding-bottom 48. Heading 56px Bold #212529, box 81.6px (1.457em, word boxes 1.2em at the top), 8px margin. Entry: date 14.4px, title 28px Bold (line 1.2, 8px margin), text 14.4px (16px margin); the first entry of each group has 16px padding above and below. All positions on our page within 0.1px of the demo.
- Background "02" at (1325, 291.5): the demo's right edge and glyph baseline (848px under the section top).
- Motion as the demo: each row fades up; inside, the entries fade up 0 / 100 / 200 / 300ms apart (left column first); headings slide up letter by letter. Replays like the other reveals.
- Below 992px (demo at 393x852): one column, 48px padding, groups 48px apart; heading `calc(1.475rem + 2.7vw)`, titles `calc(1.3rem + 0.6vw)`.
- The "Experienced Creative mind" component was renamed `AboutIntro` → `ExperienceIntro` (classes `intro__*`, data `experienceIntro`); it now lives in `Section id="experience"`.
- Checked: active nav item = the section in view (Home, About, Experience, Works); no overlaps or horizontal scroll at 2000, 1300, 992 and 375px; no console errors; `npm run build` passes.

## Speed and SEO pass (2026-11-24, user-approved steps 1–5)

Nothing visible or animated was meant to change; checked after the pass (2000x978, 393x852): same positions to the pixel, reveals start hidden and play on load, replay on scroll back, letters, menu open/close, burger bars, smooth wheel; no console errors, no hydration warnings.

- **Portrait:** `npm run images` (`scripts/optimize-images.mjs`, dev dependency `sharp` 0.35.5 — audited first: no install scripts, no network code; `child_process` only for platform detection) writes `images/figma/02-home-hero/optimized/julia-portrait-{423,846}.{avif,webp,png}` and `public/og-image.jpg` (1200x630). `HomeHero` uses `<picture>` with `sizes="(max-width: 991.98px) 240px, 423px"`. The 2.6 MB original stays in the repo as the source but is no longer shipped. Desktop and phones download the 846px AVIF: 66 KB.
- **Font:** Roboto is self-hosted: `public/fonts/roboto-latin-var.woff2` (43 KB, one variable file for weights 100–900, Latin subset, from fonts.gstatic.com, SIL Open Font License 1.1), `@font-face` in `src/styles/fonts.css`, `<link rel="preload">` in `index.html`. No requests to Google any more. `"Roboto Fallback"` (Arial with Roboto metrics) avoids a layout shift while the font loads.
- **Prerender:** `npm run build` = `tsc` → client build → SSR build of `src/entry-server.tsx` into `dist-server/` (git-ignored) → `scripts/prerender.mjs` puts the rendered page into `dist/index.html`. `main.tsx` hydrates it (`hydrateRoot`) and falls back to `createRoot` on the dev server. Rules for future code: nothing may read `window`/`document` during render (only in effects) — `useActiveNavItem` now applies the URL hash in an effect for this reason; and the server and client trees must match. `html.js` is set by an inline script in `index.html` before the first paint, so prerendered content does not flash before the reveals hide it.
- **SEO tags:** favicon (`public/favicon.svg`, yellow diamond), `theme-color`, Open Graph + Twitter card (`og-image.jpg`), JSON-LD `Person`, `public/robots.txt`. With `SITE_URL` set at build time (`$env:SITE_URL = 'https://…'; npm run build`) the prerender also adds `<link rel="canonical">`, `og:url`, an absolute `og:image`, the Person `url`, `sitemap.xml` and its line in `robots.txt`. The live address is not known yet.
- **Reveals:** `useRevealTrigger` now shares one scroll/resize listener for all blocks and reads every position before updating any state (one layout per frame instead of one per block). Same trigger and replay rules.
- **Cleanup:** removed tokens left over from the Figma hero (`--font-size-display`, `--line-height-display`, `--font-size-label`); `?grid` debug outlines only on the dev server.
- Not changed on purpose: React itself (~78 KB gzip of 244 KB JS) — fine for this site.

## Asset notes

- `images/figma/_unused/` holds a photo that is hidden in every frame of the mockup. It is not part of the visible design.
- The other files in `images/` (banner, portfolio, thumbnails, logos) belong to the original TemplatesJungle HTML template, not to the mockup. Decided in section 00: keep them in place as reference; the new site does not use them.
- The HTML template license requires keeping the TemplatesJungle credit link unless the paid version is used. Decided in section 00: keep a small credit link (added in section 01).
