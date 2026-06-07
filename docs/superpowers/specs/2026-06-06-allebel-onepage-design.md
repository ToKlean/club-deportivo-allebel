# Club Deportivo Allebel — One-Page Site Design Spec
Date: 2026-06-06

## Overview

One-page website for Club Deportivo Allebel, a women's volleyball club in Chile (Sub 12, Sub 15, Sub 17). Built on the existing React 19 + Vite + Hono + Cloudflare Workers repo. Sports-themed, dark with purple palette, aggressive/dynamic aesthetic inspired by the club's existing brand identity (wolf mascot, lightning motifs). GSAP ScrollTrigger drives all scroll animations.

## Stack

- **Frontend:** React 19 + Vite, CSS Modules
- **Animations:** GSAP 3 + ScrollTrigger plugin
- **Backend:** Hono Cloudflare Worker — no new API endpoints; serves static site. Structure unchanged from template.
- **Deploy:** Cloudflare Workers via `wrangler deploy`
- **Package Manager:** pnpm (all node operations via pnpm, not npm)

## Visual Identity

| Token | Value |
|---|---|
| `--color-bg` | `#0d0014` (near-black purple) |
| `--color-primary` | `#6B21A8` (purple) |
| `--color-primary-bright` | `#9333ea` (glow accents) |
| `--color-accent` | `#f5c518` (gold — CTAs only) |
| `--color-text` | `#ffffff` |
| `--color-text-muted` | `#c4b5d6` |
| Font | `Inter` for body, `Bebas Neue` for display headings |

Lightning effect: CSS `box-shadow` / `text-shadow` pulsing on key headings. No external particle lib.

## File Structure

```
src/react-app/
  components/
    Navbar.tsx + Navbar.module.css
    Hero.tsx + Hero.module.css
    Nosotros.tsx + Nosotros.module.css
    Categorias.tsx + Categorias.module.css
    Reclutamiento.tsx + Reclutamiento.module.css
    Galeria.tsx + Galeria.module.css
    Contacto.tsx + Contacto.module.css
  hooks/
    useScrollAnimation.ts      ← wraps GSAP ScrollTrigger fromTo
  styles/
    globals.css                ← CSS variables, reset, font imports
  assets/
    logo.png                   ← club logo (provided)
  App.tsx                      ← renders sections in order, no router
  main.tsx                     ← unchanged
```

## Sections

### 1. Navbar
- Fixed top bar, transparent on hero, solid `--color-bg` + backdrop blur after 80px scroll
- Logo left, anchor links right (Nosotros, Categorías, Únete, Contacto)
- GSAP: slides down on page load after hero timeline completes

### 2. Hero
Entry timeline (plays once on load, not scroll-triggered):
1. Background gradient + lightning CSS animation starts
2. Logo fades + scales from 0.6 → 1 (0.6s)
3. "ALLEBEL VOLEIBOL" split into words, each word slides up with stagger 0.1s
4. Subtitle "Compromiso · Disciplina · Pasión" fades up (delay 0.8s)
5. CTA button "¡ÚNETE YA!" bounces in, then has CSS `pulse` keyframe indefinitely
6. Volleyball SVG falls from top with GSAP bounce ease, settles bottom-right

CTA scrolls to `#reclutamiento`.

### 3. Nosotros
ScrollTrigger `start: "top 75%"`:
- Left col (text): `x: -60` → `x: 0`, fade in
- Right col (image placeholder): `x: 60` → `x: 0`, fade in
- Counters: 3 animated numbers count up from 0 when in view (GSAP `to` on a numeric value with `snap: 1`)
  - "50+ Jugadoras", "5 Años de Club", "3 Campeonatos" (placeholder values)

### 4. Categorías
3 cards in a row (1 col on mobile). ScrollTrigger stagger from below (`y: 80` → `y: 0`).

Each card:
- Icon (volleyball emoji or SVG)
- Category name (Sub 12 / Sub 15 / Sub 17)
- Age range badge
- Short placeholder description
- Hover: `scale(1.04)`, `box-shadow` purple glow, border brightens

### 5. Reclutamiento (`id="reclutamiento"`)
Full-width section, solid `--color-primary` background.
- Headline "¡BUSCAMOS NUEVAS JUGADORAS!" — GSAP SplitText (or manual span split) each word animates in with `skewX` + `y` for aggressive feel
- 3 bullet items (Compromiso, Disciplina, Pasión) stagger in from left
- CTA "¡ÚNETE YA!" scrolls to `#contacto`

### 6. Galería
6-image placeholder grid (2 rows × 3 cols, 2 cols on mobile).
- ScrollTrigger stagger fade-in from below
- Hover: purple overlay fades in + image scales 1.05 (CSS transition, no GSAP needed)
- Images: gray placeholder divs with "Foto del equipo" text until real photos provided

### 7. Contacto (`id="contacto"`)
3 large CTA buttons, stacked on mobile / row on desktop:

| Button | Action | Icon |
|---|---|---|
| Instagram | `href="instagram://user?username=allebelvoleibol"` with `<a>` fallback to `https://instagram.com/allebelvoleibol` | Instagram SVG |
| WhatsApp | `href="https://wa.me/56935809132"` | WhatsApp SVG |
| Llamar | `href="tel:+56935809132"` | Phone SVG |

Instagram deep-link: use `navigator.userAgent` check — if mobile, try `instagram://`; if desktop or fallback, open web URL. Implemented as an `onClick` handler.

Footer below buttons: club logo (small), "@allebelvoleibol", "© 2026 Club Deportivo Allebel".

## GSAP Setup

```ts
// hooks/useScrollAnimation.ts
// Registers ScrollTrigger plugin once, exports a hook that
// creates a fromTo tween on a ref with given vars when element enters viewport.
```

GSAP and ScrollTrigger installed as npm dependencies. `ScrollTrigger.refresh()` called after all images load to avoid offset issues.

## Responsive

- Breakpoints: 768px (tablet), 480px (mobile)
- Hero: text size scales down, volleyball SVG hidden on < 480px
- Categorías: 3-col → 1-col
- Contacto buttons: row → column stack
- All GSAP animations remain; only layout changes via CSS

## Out of Scope

- Contact form / email sending
- CMS or editable content
- Authentication
- Multiple pages / routing
- Real photos (placeholders only)
