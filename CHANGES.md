# ACTUS unified site — change log

Base: `Actus_white_blue-main`. Theme palettes merged from `actus-black-gold-main`,
`actus-bg-dark-blue-main` and `actus-main` (Graphite Oxblood).

## Task 1: theme switcher

| File | Change |
|---|---|
| `lib/themes.ts` | **New.** Theme registry (id, label, color scheme, browser theme-color, swatch), `DEFAULT_THEME`, storage key, `?theme=` param, no-flash boot script. |
| `app/globals.css` | `:root` = White & Blue. Added `[data-theme='black-gold' \| 'dark-blue' \| 'graphite']` blocks. New tokens replace the old hardcoded colours: `--elevated`, `--on-brand`, `--on-brand-hover`, `--header-bg`, `--footer-bg`, `--logo-inverted-mid`, `--shadow-rgb`, `--text-gradient`. |
| `components/theme-provider.tsx` | **New.** React context: `useTheme()` → `{ theme, themes, setTheme }`. Persists the choice to localStorage. |
| `components/theme-switcher.tsx` | **New.** Header dropdown (Base UI menu, radio items with swatches, closes on select, keyboard accessible). |
| `components/ui/dropdown-menu.tsx` | Copied from `actus-bg-dark-blue-main` (same `@base-ui/react` dependency). |
| `app/layout.tsx` | Wraps the app in `<ThemeProvider>` and runs the boot script in `<head>`. Viewport derives from `DEFAULT_THEME`. |
| `components/site-header.tsx` | Adds `<ThemeSwitcher />`. `bg-white` changed to `bg-header` / `bg-elevated`. |
| `site-footer`, `newsletter-form`, `section`, `actus-logo`, `home/contact-section`, `home/try-it`, `home/hero-illustration`, `app/page.tsx` | Hardcoded white and navy values changed to theme tokens. |

Configuration:
- `NEXT_PUBLIC_DEFAULT_THEME=white-blue|black-gold|dark-blue|graphite`: site default (build time).
- `?theme=<id>` in the URL forces a theme for that visit, e.g. for sharing a preview.
- `<ThemeProvider defaultTheme=… persist={false}>`: per-app overrides.
- To add a theme, add one entry in `lib/themes.ts` and one `[data-theme]` block in `globals.css`.

## Task 2: text (`data/home.ts`)
- What is ACTUS card: "The Standard" → "The ACTUS Standard"
- "Why is it important?" → "Why is ACTUS important?"
- "How can you try it?" → "How can you try ACTUS?"
- What is ACTUS description: "…the foundation that stewards it." → "…stewards ACTUS."
- Footer: `© {year} …` → `© Year ACTUS Financial Research Foundation`, set by `foundationInfo.copyrightYear`.

## Task 3: new sections
| File | Change |
|---|---|
| `data/showcase.ts` | Rewritten. `useCaseItems` has 4 empty slots and `projectItems` has 5. |
| `components/home/showcase-card.tsx` | **New.** Shared card. Shows a placeholder until `title` is filled. |
| `components/home/use-cases.tsx` | **New.** "ACTUS Use cases": responsive 1→2→4 column grid. |
| `components/home/projects-carousel.tsx` | **New.** "ACTUS Projects": Embla carousel with dots and prev/next. |
| `components/home/showcase-carousel.tsx` | **Removed.** The old "ACTUS Use Cases & Projects" carousel would duplicate the new sections. |
| `app/page.tsx` | The two new sections take the old carousel's slot (after Quick resources, before Get involved). |

---

# v2 — logos, gallery, refined White & Blue, Colors dropdown

## 1. Logo integration (source: `Actus-UI-Redesign/ACTUS-Logos`, originals untouched)
Web copies in `public/brand/`, white backgrounds removed with a colour-to-alpha pass so they sit on any theme.

| Placement | Logo used | Why |
|---|---|---|
| Header + mobile menu | `ACTUS Logo.png` → `actus-wordmark.png` (mark + wordmark, tagline trimmed) | The tagline is ~4px tall at header size and turns into noise. |
| Footer | `ACTUS-RESEARCH-FOUNDATION.png`, reversed to white | The site belongs to the foundation, and the footer is dark in every theme. |
| Favicon | `ACTUS Favicon.png` → `favicon-32/192/512.png`, `apple-touch-icon.png`, `favicon-32-dark.png` | Official favicon art, cropped to the A so it reads at 16–32px; white version for dark browser UI. |
| New "Powered by ACTUS" partners section | Research Foundation, Users Association, Powered by ACTUS | The three ecosystem marks. |
| Not used on the web | `Actus Logo CMYK (print).jpg`, `Actus Logo RGB (web).jpg`, `Actus Logo (black version).png` | CMYK is print-only; the RGB JPG duplicates the PNG on a white box; the black outline version is for single-colour print. Dark themes use the colour logo reversed to white instead. |

Files: `components/actus-logo.tsx` (renders official PNGs; `variant` + `tone` props; `tone="auto"` reverses on dark themes), `components/site-footer.tsx`, `app/layout.tsx` (icons), `app/globals.css` (`.brand-logo` reverse rule), `data/partners.ts`, `components/home/powered-by.tsx`.

## 2. Gallery section (same page, after "ACTUS Projects")
- `data/gallery.ts`: categories plus 8 PLACEHOLDER items (generic copy, no real events, names or dates). Set `image` / `href` per item when real content exists.
- `components/home/gallery.tsx`: dark "stage" band in the active theme's deepest colour, filter chips with counts (All, Hackathons, Announcements, Previous Winners, Upcoming Events), bento grid, generated ACTUS-tile artwork when there's no image, staggered scroll-in animation, hover lift and sheen, pulsing dot on upcoming items. Respects reduced-motion.
- `app/globals.css`: `.gallery-*` styles and keyframes.

## 3. White & Blue refinement (`[data-theme='white-blue']` only; other themes unchanged)
- Palette sampled from the official logo: navy `#002d56`, blue `#0069aa`, mid `#015289`; off-white paper `#fbfcfd`, cool-grey neutrals, no cyan.
- Headline: navy resolving into logo blue (no rainbow gradient). Headings in Inter 700, tight tracking.
- Buttons: solid navy with a subtle top highlight and layered navy-tinted shadows; outline buttons are hairline.
- Cards: hairline borders, soft two-layer shadows, 2px solid accent instead of a gradient bar; smaller radius (0.5rem); hero glows toned down.
- `components/home/hero.tsx`: glow opacities read `--hero-glow-a/b` tokens.

## 4. Separate "Colors" dropdown
- `lib/themes.ts`: every entry has a `group`: `theme` (White & Blue, Black & Gold, Dark Blue, Graphite) or `palette` (Sandpaper, Sage, Harbor, Plum Noir).
- `components/theme-switcher.tsx`: `group` prop; the header renders two dropdowns (Theme, Colors). One skin is active at a time; the other dropdown shows "none selected".
- `app/globals.css`: `[data-theme='sandpaper' | 'sage' | 'harbor' | 'plum']` palettes (Sandpaper adds a paper grain).
- `components/site-header.tsx`: second dropdown; from 1024 to 1279px the dropdowns are icon-only and nav links are slightly tighter so everything fits.

---

# v3 — Gallery "Read more" + dedicated /gallery page

- `components/home/gallery.tsx`: adds a "Read more" button under the home-page gallery grid, linking to `/gallery`. Exports `GalleryCard` for reuse; category icons moved to a shared module. Nothing else on the home page changed.
- `app/gallery/page.tsx` (new): the dedicated Gallery page, which uses the same header, footer and theme system.
  - A hero with breadcrumb, title, intro and jump links (with counts) to each category.
  - One section each for Hackathons, Announcements, Previous Winners and Upcoming Events, using the same cards and animations as the home gallery.
  - A "Back to home" link that returns to the gallery on the home page.
- `components/gallery/reveal-section.tsx` (new): a section that plays the gallery entrance animation when scrolled into view.
- `components/gallery/category-icons.ts` (new): category → icon map shared by both pages.
- `data/gallery.ts`: adds `readMore` (label + href), a `description` per category, and `galleryPage` copy. Both pages read the same `galleryItems`, so they stay in sync.

---

# v4 — hero caption, combined showcase box, curated gallery, cleanup

- **Hero caption** (`components/home/hero.tsx`, `data/home.ts` → `hero.illustrationCaption`): one line under the hero illustration, "From legal terms to cash flows, in one standard language."
- **One box with three sections** (`components/home/showcase-hub.tsx`, new; `data/showcase.ts`):
  - ACTUS Use cases: 3 cards, no carousel.
  - ACTUS Projects: 3 cards, no carousel.
  - Winners of ACTUS projects: a carousel of 4 SAMPLE winners that slides automatically (`winnersCarousel.intervalMs`, default 4.5s). It pauses on hover or keyboard focus and when the tab is hidden, has a pause/play button, and starts paused for reduced-motion users.
  - Replaces the separate Use cases section and the Projects carousel on the home page.
- **Home gallery** (`components/home/gallery.tsx`, `data/gallery.ts` → `gallerySection.homeItemIds`): only 3 cards, with Announcement (Standard update) as the large primary card, then Community news, then Hackathon. The filter buttons are removed. The `/gallery` page is unchanged and still shows all four categories.
- **Powered by ACTUS section removed** from the home page (`app/page.tsx`). Header, footer and favicon logos are unchanged.
- **Footer**: "© 2019 ACTUS Financial Research Foundation" (`data/home.ts` → `copyrightYear`).
- No longer used, safe to delete: `components/home/use-cases.tsx`, `components/home/projects-carousel.tsx`, `components/home/powered-by.tsx`, `data/partners.ts`.

---

# v5 — winners carousel: one winner per slide
- `components/home/showcase-hub.tsx`: each slide is one full-width winner card (award panel + project details) at every screen size. It auto-advances 1 → 2 → 3 → 4 → 1, with 4 dots. The card shows "Winner N of 4".
- `data/showcase.ts`: removed the "Hall of fame" eyebrow from the winners heading.

---

# v6 — full foundation address
- `data/home.ts` → `foundationInfo.location`: "1507 Blue Meadow Road, Rockville, MD 20854 USA" (shown in the Contact section and the footer on both pages).

---

# v7 — Gallery only on its own page
- `app/page.tsx`: Gallery section removed from the home page. The `/gallery` page is unchanged otherwise.
- `app/gallery/page.tsx`: "Go back to home page" button at the top (beside the breadcrumb) and at the bottom; both go to `/`.
- `data/gallery.ts`: `galleryPage.backLabel` is now "Go back to home page".

---

# v8 — winners carousel with image banners
- `components/home/winner-banners.tsx` (new): four MOCK dashboard "screenshots" drawn as SVG in the active theme's colours: loan payment schedule, bond portfolio, on-chain contract registry, and rate-shock risk heat map. All numbers and IDs are sample values.
- `components/home/showcase-hub.tsx`: each slide is a large banner, with the image full-bleed behind the text on desktop and on top with the text below on phones and tablets. A slow zoom plays on the active slide (off for reduced-motion users). It still shows one winner per slide, auto-sliding 1 → 2 → 3 → 4 → 1.
- `data/showcase.ts`: each winner has `banner` (which mock to draw) and `image` (a real image path; when set, it replaces the mock).

---

# v9 — hero spacing + header switcher fix
- `components/home/hero.tsx`: smaller top padding above the hero (desktop 112px → 32px; tablet/mobile slightly smaller too), removing the empty band under the header.
- `components/theme-switcher.tsx`: the Theme and Colors buttons are compact (icon + colour swatch) at every width, and the button text never wraps. At 1536px and wider the full theme name used to wrap onto 3 lines and squash the header. The menus still list the full names.
