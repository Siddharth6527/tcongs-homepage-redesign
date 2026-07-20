# Tcongs Infotech — Homepage Redesign

A premium, dark-themed landing page redesign for **Tcongs Infotech**, built as an internship shortlisting assignment. The goal was to demonstrate strong frontend skills, design sense, and deployment ability.

## Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| **React** | 19 | UI framework |
| **Vite** | 8 | Build tool & dev server |
| **Tailwind CSS** | 4 | Utility-first styling |
| **Framer Motion** | 12 | Scroll-triggered & hover animations |
| **React Icons** | 5 | Icon library (Font Awesome) |

## What Was Built

This is a **single-page, fully responsive landing page** designed from scratch (no Bootstrap templates, no copied UI).

### Sections

- **Navbar** — Sticky glassmorphism header with smooth scroll links and an animated mobile hamburger menu
- **Hero** — Bold headline with gradient text, browser-window mockup with shimmer effect, floating stat cards, and animated blobs
- **Trust Bar** — Animated counters (150+ projects, 50+ clients, 7+ years, 4.9★ rating) that trigger on scroll
- **Services** — 6 interactive cards with hover lift, gradient overlays, and icon scaling
- **Why Choose Us** — 4 feature cards highlighting fast delivery, scalable architecture, modern UI/UX, and 24x7 support
- **Process** — 5-step alternating timeline with gradient connector line and scroll-reveal animations
- **Portfolio** — 4 project cards with emoji visuals, hover shimmer effects, and gradient reveals
- **Testimonials** — 3 client review cards with star ratings and avatar badges
- **CTA** — Large glassmorphism call-to-action card with background glow
- **Footer** — 4-column layout with social icons, quick links, services list, and contact info
- **Scroll-to-top** — Floating button that appears after scrolling 500px

### Design Details

- Dark theme with deep navy background (`ink-950`)
- Multi-layered gradient glow orbs (blue → violet → pink)
- Animated blob backgrounds with staggered timing
- Subtle grid pattern overlay with radial fade mask
- Custom gradient scrollbar
- `Space Grotesk` for display headings, `Inter` for body text
- Smooth hover transitions on every interactive element
- Custom selection color (`brand-400/35`)
- Respects `prefers-reduced-motion` for accessibility

### Animations

| Element | Animation |
|---|---|
| Navbar | Glass effect on scroll |
| Hero | Staggered fade-in on load, floating cards |
| Counters | Animated number counting (eased cubic) |
| Service cards | Hover lift + gradient reveal |
| Portfolio | Hover shimmer overlay |
| Timeline | Scroll-triggered reveal |
| Testimonials | Hover lift effect |
| All sections | Fade-up on viewport entry |

### Responsiveness

Tested and optimized for:
- Mobile (< 640px)
- Tablet (640px – 1024px)
- Laptop (1024px – 1536px)
- Desktop (1536px+)

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview
```

## Deployment

Deployed on **Vercel**. The live URL is shared with the recruitment team for the assignment submission.

## Live URL

<!-- Add your Vercel URL here after deployment -->
> https://tcongs-homepage-redesign.vercel.app

---

Built by Siddharth as part of the Tcongs Infotech internship application.
