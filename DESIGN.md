# Design System & Layout Rules

## Core Aesthetic
The site is a fusion of minimalist structure and Cyberpunk/Cybersecurity elements. It should feel like a high-end terminal. Dark mode only. Avoid clutter; use the neon accent colors from TOKENS.md sparingly for maximum impact (e.g., terminal cursors, active links, button hover states).

## Global Layout
- **Left Sidebar (Fixed)**: 
  - Width: ~250px.
  - Contains navigation links (About, Projects, Experience, Certs, Contact).
  - Bottom of sidebar: A mock "Ask anything" command palette hint (e.g., `Ctrl + K`) and a generic contact email.
- **Main Content Area (Scrollable)**:
  - Centered horizontally within the remaining viewport.
  - Max-width for text readability (e.g., `max-w-3xl`).
  - Top padding to align with the sidebar nicely.

## Animations & UX (Use Framer Motion)
- **Page Load Reveal**: Content should slide up slightly (`y: 10`) and fade in (`opacity: 1`) on mount. Keep it fast (`duration: 0.3`).
- **Staggered Lists**: Project cards and experience items should stagger in one by one (e.g., `staggerChildren: 0.1`) so it looks like a terminal loading data.
- **Glitch Hover Effect**: On primary buttons or active links, add a very subtle, fast CSS text-shadow glitch effect or a quick color flicker using Framer Motion.
- **Active Navigation**: The active sidebar link should have a monospace `>` cursor before it or a neon left-border highlight.

## Component Rules
- **Profile Image**: Must use the dithered/halftone styling outlined in TOKENS.md.
- **Cards (Projects/Experience)**: Minimalist borders (`Border Subtle`). On hover, the border transitions to a glowing `Neon Cyan` or `Neon Magenta`.