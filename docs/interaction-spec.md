# Interaction spec: menu and effects not shown in Figma

The Figma mockup shows static desktop screens only. This file describes the behaviour of the live demo (https://demo.templatesjungle.com/julia/) and how to rebuild it in our React app. Read it before sections 01–07.

## How this was checked (2026-11-24)

- The demo serves the same `index.html`, `style.css`, `js/script.js`, `js/plugins.js` and `css/vendor.css` as the local template in `julia-free/` (identical apart from line endings). The local files are a reliable source of exact values.
- The demo uses jQuery 1.11, Bootstrap 5.3.1 (scrollspy, collapse, accordion), AOS (scroll reveal) and Swiper (slider). **We use none of them**: every effect below is small enough for CSS plus a few React hooks.
- Measured in the browser at 1920×1024 and 375×812: hover colours, durations, active menu state, reveal behaviour, mobile menu.

Labels used below:
- **Copy**: rebuild as in the demo.
- **Improve**: the demo behaviour is broken or inaccessible; build it better.
- **Decided**: settled by the user (see the last section).

## Figma vs demo: content differences

| Topic | Figma (our source of truth) | Demo |
|---|---|---|
| Nav items | Home, About, Works, Experience, Education, References | Home, About, Experience, Works, Contact, Pages (PRO dropdown), Get PRO |
| Section order | Home → About (intro + skills) → Works → Biodata | Home → Biodata → Intro + skills → Portfolio → Contact |
| Contact section | none | FAQ accordion + contact form (section "05") |
| Menu icon top right | visible on desktop (`1:133`, 24px at x 1837, y 63) | hidden on desktop; a burger only below 992px |
| Nav dividers | two 1px black lines (under the logo area and above the email), arrow icon next to the active item | 1px grey line under every item, no arrow |

Rule: **layout, content and colours follow Figma; motion and states follow the demo**, with the improvements listed here. Exception (user, 2026-11-24): the home screen (hero, services, button, background "01") copies the demo's layout and type; see "Home screen follows the demo" in `layout-plan.md`.

## 1. Sidebar menu (desktop, ≥ 992px)

**Copy**
- Each nav link has an underline that grows from the left on hover and stays on the active item:
  - pseudo-element `::before`, `position: absolute; bottom: -1px; height: 1px; width: 0 → 100%`
  - colour `#212529` in the demo. **Built:** 1px black line (`var(--color-ink)`) replaces a 0.5px grey divider under every item as it grows, animated with `clip-path` (user feedback).
  - `transition: width 0.6s ease-out`
  - Better for performance: animate `transform: scaleX(0 → 1)` with `transform-origin: left` instead of `width`, with the same timing.
- Text colour does not change on hover (stays #111).
- Active item = the section currently in view (Bootstrap scrollspy in the demo). In Figma the active item also shows the `arrow-right` icon (`1:160`, 24px, right side of the row). Show the arrow only on the active item and fade it in with `opacity 0.3s`.
- Smooth scrolling on click: already done in `base.css` (`scroll-behavior: smooth`, off under `prefers-reduced-motion`).

**Improve**
- Scrollspy: write a `useActiveSection(ids)` hook with `IntersectionObserver` (`rootMargin: '-40% 0px -55% 0px'`, so the active section is the one crossing the middle of the screen). Set `aria-current="true"` on the active link and style it with `[aria-current]`, not a separate class.
- Clicking a link updates the URL hash (default anchor behaviour). Keep it so sections can be shared by link.
- Email link: the demo turns it brown (#A98073, a leftover theme colour). Do not copy that. Use the same underline-grow effect as the nav, or `opacity: 0.6` on hover, `150ms`.
- Social icons: the demo has no hover state. Add `opacity: 0.6` on hover/focus, `150ms ease`. Give each icon link an `aria-label` ("Facebook" etc.).
- Credit link: the demo shows "HTML by TemplatesJungle" at the bottom of the sidebar (`border-top`, `padding-block: 1.5rem`). We use "Design by TemplatesJungle" in the same place, 12–14px, `--color-body`.

## 2. Menu button and mobile menu (< 992px)

Demo values (**Copy**):
- Burger: `position: fixed; top: 40px; right: 40px` (20px + 20px margin), 26×26px, three 2px bars 8px apart, `transition-duration: 0.25s`.
- Open state turns it into an X: the middle bar rotates 45°, the top bar goes to `top: 0; rotate(0)`, the bottom bar goes to `top: 0; rotate(90deg)`.
- The sidebar becomes a drawer: `width: 280px`, `transform: translate3d(-100%,0,0) → 0`, `transition: transform 0.3s ease-out`, white background, above the page.
- **Built (section 01):** our drawer slides in from the **right**, because the menu button is in the top-right corner (Figma). Width `min(400px, 100vw)`, same content and layout as the sidebar.

Demo bugs (**Improve**):
- The menu does not close after tapping a link, on Esc, or on a tap outside. Close it in all three cases.
- The drawer content is clipped on the left at 375px (logo shows as "ulia."). Use our own padding, no clipping.
- The button is an `<a>` without `href` or label. Use `<button type="button" aria-expanded aria-controls="sidebar" aria-label="Open menu">` and change the label to "Close menu" when open.
- No backdrop and no scroll lock: add a semi-transparent backdrop (`rgb(0 0 0 / 0.3)`, fades in over 0.3s) and lock page scroll while open (`overflow: hidden` on `<html>`).
- Focus: move focus into the drawer on open, keep Tab inside it (or set `inert` on `<main>`), return focus to the button on close.
- `prefers-reduced-motion`: no slide or morph; open and close instantly.
- Drawer easing: keep `0.3s`, but use `cubic-bezier(0.32, 0.72, 0, 1)` for opening (the ease-out in the demo feels abrupt); closing `0.2s ease-in`.

**Decided (revised):** the menu button and drawer are shown only below 992px; on desktop the sidebar is the menu.

## 3. Scroll reveal (replaces AOS)

Demo settings: AOS with `duration: 1200ms`, `easing: ease`, default trigger offset 120px from the bottom of the viewport. `once` is off, so elements hide again when they leave the screen and **replay** every time you scroll back.

Effects used:

| Effect | Start state | End state |
|---|---|---|
| `fade-up` | `opacity: 0; transform: translateY(100px)` | `opacity: 1; transform: none` |
| `fade-right` | `opacity: 0; transform: translateX(-100px)` | same |
| `fade-in` | `opacity: 0` | `opacity: 1` |

Where they are used (mapped to our sections):

| Element | Effect | Delay |
|---|---|---|
| Hero portrait (section 02) | fade-right | 0 |
| Hero text block: label + name (02) | fade-in | 0 |
| Service 01 / 02 / 03 (03) | fade-up | 0 / 100 / 200ms |
| "View all works" button (03) | fade-up | 300ms |
| Intro heading block, info rows, skill list (04) | fade-up | 0 |
| Works heading and intro text (05) | fade-up | 0 |
| Works card row (05) | fade-up | 0 |
| Biodata columns (06), each entry | fade-up | 0 / 100 / 200 / 300ms within a column |

Implementation (**Improve**):
- `useInView(ref, { rootMargin: '0px 0px -120px 0px', once: true })` hook + a `<Reveal effect="fade-up" delay={100}>` wrapper component that sets `data-reveal` / `data-visible` attributes. CSS does the transitions.
- Shorten the duration to **800ms** with `cubic-bezier(0.22, 1, 0.36, 1)` and the distance to **40px**. 1.2s with 100px feels slow on a portfolio people skim; the stagger stays the same.
- **Decided**: play once (no replay when scrolling back).
- No-JS and reduced motion: content must be visible. Hide elements only when `html.js` is set (add the class in `main.tsx`) and only under `@media (prefers-reduced-motion: no-preference)`.
- Animate only `opacity` and `transform`. No layout shift.

## 4. Heading letter animation (`txt-fx slide-up`)

Used on: "Julia Stiles" (hero), "Experienced Creative mind", "Portfolio", "Education", "Experiences", "Interests", "References".

Demo mechanics (**Copy**):
- The script wraps each word in `<span class="word">` (`display: inline-block; overflow: hidden`) and each letter in `<span class="letter">` (`display: inline-block`).
- Each letter starts at `transform: translate3d(0, 1.2em, 0)`, hidden below the word's clip edge, and slides up to 0.
- `transition: transform 0.9s cubic-bezier(.5, 0, .53, 1)`.
- Delay per letter: `100ms + 10ms × index`. Spaces also count as an index.
- It starts when the parent block gets the reveal class (AOS `aos-animate`).

Our version:
- `<SplitText as="h1" text="Julia Stiles" />` component, rendered by React (no DOM rewriting). The heading keeps the real text for screen readers: the visual letters are `aria-hidden="true"` and the full text is in a `visually-hidden` span (better than `aria-label` on a heading).
- Triggered by the same `useInView` as section 3, once.
- Watch line height: "Julia Stiles" has `line-height: 0.8`, so `overflow: hidden` on the words would cut the tops and bottoms of the glyphs. Give `.word` a vertical padding (about 0.1em) and a matching negative margin, then check that nothing is clipped at 1920px.
- Reduced motion: letters are visible from the start.

## 5. Buttons

- Figma: black `#111` rectangle, 259×93px, text "view all works" 16px Bold with `textCase: UPPER` (render with `text-transform: uppercase`), no radius.
- Demo hover (**Copy**): background `#212529 → #424649`, `transition: background-color 0.15s ease-in-out`. For us: `#111 → #424649` (add a `--color-button-bg-hover` token).
- Add `:active { transform: scale(0.98) }` (100ms) and a visible `:focus-visible` ring (already global in `base.css`).
- Same component for "View all works" (03, 04) and any button in 05.

## 6. Works slider (section 05)

Demo (Swiper): 3 cards per view at ≥ 1200px (gap 30px), 2 below (gap 20px at ≥ 768px), drag/swipe, clickable pagination bullets under the row (active bullet in the template's red #FF534A). Cards have no hover effect. The 4th card in Figma is cut off at the right edge, which matches a slider that overflows.

**Decided**: native CSS `scroll-snap` (no library; swipe works on touch, trackpad and Shift+wheel), plus prev/next buttons and dots.

Either way:
- Bullets/dots use `--color-ink`, not red.
- Cards get a light hover: illustration `transform: scale(1.03)` over 400ms, cursor pointer only if the card links somewhere.
- Keyboard: the row is focusable (`tabindex="0"`, `role="region"`, `aria-label="Portfolio"`) so arrow keys scroll it.

## 7. Skill bars (section 04)

- The demo bars are static (no animation) and have a bug: "Adobe Illustrator 75%" is drawn at 90%.
- Ours: the width comes from the same number as the label (one data array, no hard-coded classes).
- Add a fill animation on reveal: `transform: scaleX(0 → value)` with `transform-origin: left`, 1s `cubic-bezier(0.22, 1, 0.36, 1)`, 100ms stagger between bars, once. Off under reduced motion.

## 8. Background numbers

- Demo: `::after` with `content: attr(data-text)`, `font-size: 37.5rem`, `line-height: 70%`, `letter-spacing: -0.1em`, `color: #F1F1F1`, `right: -10%; bottom: 100px; z-index: -1`. Below 768px only `right: 0` changes, so the 600px number covers the mobile layout.
- Ours: the `BackgroundNumber` component from section 00 (exact Figma position). No animation in the demo; keep it static.
- Section 07: scale the size with `clamp()` (for example `clamp(12rem, 31vw, 37.5rem)`) and position it from the right on narrow screens.

## 9. Not rebuilt

- "Pages" dropdown and "Get PRO" link (PRO links for TemplatesJungle).
- Unused template code: preloader, Isotope filter, Chocolat lightbox, `slide-in`, `slide-clip`, `swipe-up`, `polygon`, `open-up`, `domino`, `zoom` text effects. They exist in `style.css`/`script.js` but nothing on the page uses them.
- jQuery, Bootstrap, AOS, Swiper.

## 10. General rules for all effects

- Only `transform` and `opacity` are animated (the nav underline uses `scaleX`).
- Every effect has a `prefers-reduced-motion: reduce` fallback: content is shown in its final state.
- Hover effects go inside `@media (hover: hover)` so they don't stick on touch screens.
- Interactive elements work by keyboard with a visible focus ring.
- Shared timing tokens go in `tokens.css`: `--duration-fast: 150ms`, `--duration-base: 300ms`, `--duration-reveal: 800ms`, `--ease-out: cubic-bezier(0.22, 1, 0.36, 1)`, `--ease-text: cubic-bezier(.5, 0, .53, 1)`.
- Hooks live in `src/hooks/` (`useInView`, `useActiveSection`, `useMenu`), and wrapper components in `src/components/` (`Reveal`, `SplitText`).

## Decisions (approved by the user, 2026-11-24)

1. **Menu button and drawer exist only below 992px** (changed 2026-11-24 after user feedback: on desktop the button opened a second copy of the visible sidebar). From 992px the Figma top-right icon is not shown; `Menu.tsx` closes an open drawer when the window grows past 992px. Icon: bars 2px thick, 7.2px apart (`--menu-bar-step`; 9 screen px at 125% scaling, the smallest crisp step there is 0.8px); the middle bar is its right 10px (as in Figma) and grows to the full 16px on hover by animating `width` (not `clip-path`, which left grey half-pixels); square bar ends.
2. **Contact section**: not built. The sidebar email covers contact.
3. **Scroll reveal** (revised 2026-11-24) **replays as in the demo**: it hides again when the element scrolls back below the trigger line and plays on the next scroll down. Elements that leave through the top stay shown.
4. **Works slider**: native CSS `scroll-snap`, no Swiper.
5. **Motion speed** (revised 2026-11-24): reveals copy the demo exactly — 1200ms, 100px, `ease`, trigger 120px above the bottom edge. The earlier 800ms / 40px / `--ease-out` choice was dropped after the user compared the site with the demo. Section 3 above describes the original reasoning.
