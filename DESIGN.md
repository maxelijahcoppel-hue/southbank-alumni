# Southbank Alumni Network — Design System

## Brand

Southbank International School alumni platform. Premium, academic but fresh.
Not corporate, not childish. Think well-designed university prospectus meets modern web app.

Reference aesthetic: Linear's dark theme, Stripe Atlas page, globe.gl demos.

## Color Palette

| Token | Value | Usage |
|-------|-------|-------|
| `--bg-dark` | `#0a1628` | Map page background |
| `--bg-light` | `#fafafa` | Directory, form pages |
| `--bg-card` | `#ffffff` (light) / `rgba(255,255,255,0.05)` (dark) | Cards |
| `--text-primary` | `#1a1a1a` (light) / `#e8e8e8` (dark) | Body text |
| `--text-muted` | `#6b7280` (light) / `rgba(255,255,255,0.5)` (dark) | Secondary text |
| `--accent-gold` | `#d4a843` | Pins, tags, active states, primary accent |
| `--accent-blue` | `#4a90d9` | Links, secondary interactive elements |
| `--success` | `#4ad99a` | Approved badge, success states |
| `--error` | `#ef4444` | Validation errors, rejected badge |
| `--border` | `#e5e7eb` (light) / `rgba(255,255,255,0.08)` (dark) | Dividers, card borders |

## Theme

Two themes, page-level (not user-togglable):
- **Dark:** Map page. `data-theme="dark"` on root. Nav: transparent bg, white text.
- **Light:** All other pages. Default. Nav: white bg, dark text.

## Typography

| Level | Font | Size | Weight | Usage |
|-------|------|------|--------|-------|
| Display | Geist Sans | 36px (text-4xl) | 700 | Stats numbers |
| H1 | Geist Sans | 24px (text-2xl) | 700 | Page headings |
| H2 | Geist Sans | 20px (text-xl) | 700 | Section headings |
| Body | Geist Sans | 16px (text-base) | 400 | Paragraphs, descriptions |
| Small | Geist Sans | 14px (text-sm) | 400 | Labels, tags, meta |
| Mono | Geist Mono | 14px | 400 | Stats, codes |

Line height: 1.5 for body, 1.2 for headings, 1 for display stats.

## Spacing

Base unit: 4px (Tailwind default).

| Token | Value | Usage |
|-------|-------|-------|
| `gap-sm` | 8px (gap-2) | Between tags, inline elements |
| `gap-md` | 16px (gap-4) | Between cards, list items |
| `gap-lg` | 32px (gap-8) | Between sections |
| `page-pad` | 32px desktop / 16px mobile | Page edge padding |
| `card-pad` | 24px (p-6) | Inside cards |

## Components

### Tag
`rounded-md bg-accent-gold/12 border border-accent-gold/20 text-sm px-2.5 py-1 text-accent-gold`

### Card
`rounded-xl bg-white dark:bg-white/5 shadow-sm p-6 border border-border`

### Button (Primary)
`rounded-lg bg-accent-gold text-bg-dark px-5 py-2.5 font-medium hover:bg-accent-gold/90`

### Button (Secondary)
`rounded-lg border border-border px-5 py-2.5 font-medium hover:bg-black/5`

### Map Pin
`w-2.5 h-2.5 rounded-full bg-accent-gold shadow-[0_0_12px_rgba(212,168,67,0.5)] hover:scale-150 transition-transform cursor-pointer`

### Nav Link
`text-sm font-medium opacity-60 hover:opacity-100 transition-opacity`
Active: `opacity-100 text-accent-gold`

### Badge
Approved: `bg-success/12 text-success text-xs px-2 py-0.5 rounded-full`
Pending: `bg-accent-gold/12 text-accent-gold text-xs px-2 py-0.5 rounded-full`
Rejected: `bg-error/12 text-error text-xs px-2 py-0.5 rounded-full`

## Breakpoints

| Viewport | Width | Layout changes |
|----------|-------|----------------|
| Mobile | < 768px | 1-col cards, hamburger nav, bottom sheet filters |
| Tablet | 768-1024px | 2-col cards, filter overlay, alumni card overlay |
| Desktop | > 1024px | 3-col cards, sidebar filters, slide-in alumni card |

## Map Page

- No heading text. The map IS the hero. Logo in nav is sufficient.
- All pins: gold (#d4a843) with glow shadow. Hover: scale 1.5x.
- Filter sidebar: 280px, left side (desktop). Bottom sheet (mobile).
- Stats overlay: bottom-left corner. Display font, muted label.
- Timeline slider: bottom center, 60% width.
- Alumni card: slides in from right (desktop) or up from bottom (mobile). 380px width.

## Icons

Lucide React (already installed). Use for:
- Navigation: Map, Users, Lightbulb, Calendar, Heart
- Actions: Search, Filter, ExternalLink, Check, X
- Status: CheckCircle, Clock, XCircle

## Motion

Minimal, intentional:
- Pin hover: `transition-transform 200ms`
- Card slide-in: `transition-transform 300ms ease-out`
- Filter results: `transition-opacity 200ms`
- Timeline auto-play: ~200ms per year step, cancels on interaction
- Page transitions: none (instant navigation)
