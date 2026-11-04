# Gulzar Fashion

A minimal-luxury ladies' suits storefront — elegant, soft, premium. Built for a client as a design preview.

**Live preview:** https://gulzar-fashion-preview.pages.dev

## Features

- **Hero slider** — full-screen auto-rotating showcase (01/03) with arrow + counter navigation
- **Collections** — 3-piece / 2-piece collection cards
- **Product grid** — 8 suits with fabric details and sale pricing
- **Trending carousel** — Khaadi-style slow auto-scrolling product rail (pauses on hover), arrows + dots
- **About + dark footer** — brand story and elegant footer
- **Floating WhatsApp button** — ordering hook (currently disabled in preview)

## Tech

Pure HTML + CSS + JavaScript — no frameworks, no build step. Product data lives in a single file (`js/products.js`); the grid and carousel render from it.

## Structure

```
index.html          # page (hero, collections, shop, trending, about, footer)
css/style.css       # minimal-luxury theme (ivory / espresso / gold)
js/products.js      # product data (single source of truth)
js/main.js          # sliders, grid renderer, carousel, header
images/             # product photography
```

## Status

Design preview — WhatsApp ordering is intentionally disabled until launch.

---

Built by [Abdullah Balouch](https://github.com/makkimadni948-svg) · Hack The Planet
