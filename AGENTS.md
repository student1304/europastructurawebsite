# AGENTS.md

## Project Overview

Static single-page website for **Europa Structura AISBL**, an independent research foundation focused on technology and finance in the European Union. No build system, no package manager, no framework — plain HTML/CSS/JS served as static files.

## Project Structure

```
index.html          # Single-page site (all sections in one file)
css/style.css       # All custom styles
js/script.js        # All client-side behavior
images/             # Site images (logo, infographic)
images/partners/    # Partner logos (SVG preferred, PNG/JPG fallbacks)
```

## Technology Stack

- **HTML5** — single `index.html` with anchor-based section navigation
- **Bulma 0.9.3** — CSS framework loaded via CDN (`cdn.jsdelivr.net`)
- **Vanilla JavaScript** — no libraries or dependencies
- **No build step** — edit files directly, no compilation or bundling

## Commands

There are no build, test, or lint commands. To preview locally, serve the directory with any static file server:

```sh
python3 -m http.server 8000
# or
npx serve .
```

## Architecture & Patterns

### Single-Page Navigation

All content sections live in `index.html` inside `<div id="..." class="content">` blocks. Navigation links (`#home`, `#about`, `#research`, `#publications`, `#partners`, `#contact`) toggle section visibility via JS — only one section is visible at a time (CSS class `.active`).

- Sections are hidden by default with `max-height: 0; overflow: hidden; opacity: 0`
- The `.active` class reveals a section with a slide-down animation
- Exception: `:first-of-type` content section (Home) is visible by default via CSS

### Modal Pattern

The infographic modal uses Bulma's `.modal` component. It is toggled via the `.is-active` class. Closing is handled three ways: close button, background click, and Escape key.

### Mobile Responsive

- Hamburger menu (`.navbar-burger`) appears at ≤768px
- Three breakpoints: default, 768px, 480px
- Partners grid collapses from multi-column → 2-column → single-column

## Style Conventions

- **CSS**: Custom styles in `css/style.css`, Bulma classes used directly in HTML
- **Font stack**: `'Segoe UI', Tahoma, Geneva, Verdana, sans-serif`
- **Naming**: Bulma conventions (`.is-active`, `.has-background-light`, `.navbar-item`) mixed with semantic custom classes (`.partners-grid`, `.partner-logo`, `.header-container`)
- **Partner logos**: SVG format preferred; stored in `images/partners/` with lowercase hyphenated filenames (e.g., `technology-institute.svg`)
- **External links**: Always use `target="_blank" rel="noopener noreferrer"`

## Gotchas

1. **No build system** — changes are live immediately. There's no hot-reload, transpilation, or minification.
2. **CDN dependency** — Bulma is loaded from `cdn.jsdelivr.net`. The site requires internet access to render correctly.
3. **Section visibility is JS-driven** — if JavaScript fails to load, only the Home section is visible (via the CSS `:first-of-type` rule). All other sections remain hidden.
4. **All content is in one file** — `index.html` contains every section. There are no routes or separate pages.
5. **No `<head>` meta for SEO/social** — no Open Graph tags, favicon, or description meta tag currently exist.
6. **Contact email** — `info@europa-structura.eu` is used in both the Research and Contact sections.
