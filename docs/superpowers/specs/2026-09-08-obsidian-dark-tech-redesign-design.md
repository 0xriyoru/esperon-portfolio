# Design Specification: Obsidian & Precision Dark-Tech UI Redesign

- **Date**: 2026-09-08
- **Topic**: Portfolio UI Redesign & "Unslop"
- **Status**: Approved
- **Author**: Rhodge Esperon & AI Pair Assistant

---

## 1. Executive Summary & Goals

The goal of this redesign is to eliminate AI-generated "slop", sci-fi clichés, and visual clutter from the developer portfolio of **Rhodge Esperon**, elevating it to a world-class, production-grade engineer portfolio inspired by high-craft dark-tech aesthetics (e.g., Linear, Vercel, Emil Kowalski).

### Key Objectives
1. **Unslop**: Remove fake sci-fi telemetry (`SYSTEM // READY`, `OPERATOR // 0XRIYORU`, `DECRYPTING SCHEMA...`), CRT scanlines, glitch animations, plus-sign schematic corners, and database connection indicators.
2. **Elevate Aesthetics & Craft**: Introduce a cohesive **Obsidian & Precision Dark-Tech** design system featuring deep zinc/obsidian tones, crisp typography pairing (Inter for readable content + JetBrains Mono for technical telemetry), refined glassmorphic cards, and soft ambient glows.
3. **Streamline Architecture & Performance**: Deprecate the 34KB `BootSequence.tsx` hacking mini-game, simplify canvas background effects, and optimize First Contentful Paint (FCP) and layout stability.
4. **Authentic Narrative**: Ground the biography, capability chips, and project descriptions in real engineering impact (SBMA government systems, OCR pipelines, Web Audio engine, BSIT 4th year).

---

## 2. Design System & Tokens

### 2.1 Color Palette
- **Backgrounds**:
  - Main Canvas (`--theme-main`): `#09090B` (Rich Obsidian Dark) / `#FAFAFA` (Crisp Light Mode)
  - Surface Secondary (`--theme-secondary`): `#121215` (Slate-950) / `#F4F4F5` (Zinc-100 Light Mode)
  - Card Elevated (`--theme-card`): `#18181B` (Zinc-900 with subtle opacity) / `#FFFFFF`
- **Borders & Inset Highlights**:
  - Subtle Border (`--theme-border-subtle`): `rgba(255, 255, 255, 0.08)` / `rgba(0, 0, 0, 0.08)`
  - Hover Border: `rgba(255, 255, 255, 0.18)` / `rgba(0, 0, 0, 0.18)`
  - Inset Highlight: `inset 0 1px 0 rgba(255, 255, 255, 0.05)`
- **Accents**:
  - Primary Accent: Electric Cyan (`#00F0FF` / `#06B6D4` - dark) / `#0891B2` (light)
  - Success / Available: Emerald (`#10B981`)
  - In Progress / Warning: Warm Amber (`#F59E0B`)
  - Text Primary: `#FAFAFA` (dark) / `#09090B` (light)
  - Text Muted: `#A1A1AA` (Zinc-400 dark) / `#71717A` (Zinc-500 light)

### 2.2 Typography
- **Headings & Body**: Inter (`var(--font-inter)`), font-weight 400–700, tight tracking (`tracking-tight`), human-first readability. Eliminates uppercase monospace headings.
- **Technical Metas & Tags**: JetBrains Mono (`var(--font-jetbrains-mono)`), text size 10px–13px, uppercase tracking for tech badges, timestamps, commit hashes, and architecture tags.

---

## 3. Structural & Component Architecture

### 3.1 Layout & Navigation
- **`src/app/layout.tsx`**:
  - Remove `BootSequence` wrapper, removing unnecessary audio event listeners and 34KB bloat.
  - Simplify background into a subtle, high-performance radial ambient gradient or refined micro-dot canvas.
  - Retain `CommandPalette`, `MobileNav`, `Sidebar`, and `PageWrapper`.
- **`src/components/Sidebar.tsx`**:
  - Clean brand identity: "Rhodge Esperon" in Inter bold, "Full-Stack & AI Systems Developer".
  - Live availability badge: "Available for roles & contracts" with pulsing emerald dot.
  - Streamlined nav items (`Profile`, `Projects`, `Skills`, `Experience`, `Activity`, `Contact`) with smooth active pill transitions.
  - Footer with sleek Theme Toggle, `Ctrl + K` Command trigger, and contact email. Remove database connection status box and easter egg breach minigame button.
- **`src/components/MobileNav.tsx`**:
  - Sleek top/bottom glass bar with clean section jump pills and theme switch.

### 3.2 Main Content Sections (`src/app/page.tsx`)
- **`#profile` (Hero)**:
  - Header: Live PHT time (`PHT // 15:45 [UTC+8]`), location (`Olongapo / Subic Bay, PH`), and availability badge.
  - Bio: Human, punchy copy detailing real work (SBMA IT intern, OCR reader, Web Audio, BSIT 4th year).
  - 3 Focus Cards:
    1. *Full-Stack Systems* (Next.js, TypeScript, PostgreSQL, Supabase)
    2. *Agentic AI & Specialized Pipelines* (LLM workflows, OCR processing, Python)
    3. *Interactive Web & UI Craft* (Figma design systems, Web Audio API, PWA)
  - Actions: "Explore Projects ↗", "Resume / CV ↗", and "Get in Touch ↗".
  - Portrait: Clean modern card with soft cyan/indigo ambient halo, high-res photo, and clean caption ("BSIT '27 • SBMA IT Alumni").
- **`#projects` (`Projects.tsx`)**:
  - Clean filter pills (`ALL`, `DEPLOYED`, `IN PROGRESS`, `ARCHIVED`).
  - Cards with subtle top borders, verified domain badges, architecture pills, bulleted engineering highlights, tech tags, and direct demo/GitHub links.
  - SBMA-JO displayed as "Internal Gov System • Restricted Access".
- **`#skills` (`Skills.tsx`)**:
  - Modern card grid grouped by category (Frontend & Web, Backend & Databases, AI & Specializations, Tools & Cloud) with crisp interactive pill badges.
- **`#credentials` (`Credentials.tsx`)**:
  - Chronological timeline with sleek node markers, categorized by Work, Recognitions & Certs, Events & Seminars.
  - Direct links to certificates/proof where available.
- **`#activity` (`Activity.tsx`)**:
  - Clean GitHub activity heatmap using modern emerald/monochrome color scale.
- **`#contact`**:
  - Glassmorphic card with quick copy email action, direct mailto, GitHub, and LinkedIn links.

---

## 4. De-slopping & Cleanup Plan

| Action | Target | Rationale |
| :--- | :--- | :--- |
| **Delete/Deprecate** | `src/components/BootSequence.tsx` | 34KB hacking game deadweight, audio listeners, gimmicky distraction. |
| **Remove CSS Slop** | `src/app/globals.css` | Delete `.bg-scanlines`, `glitch-hover`, `glitch-anim`, `cyber-slice`. |
| **Refine Canvas** | `src/components/CyberBackgroundCanvas.tsx` | Simplify canvas to subtle, lightweight ambient particle/dot effect without EMP click shockwaves. |
| **Clean Copy** | All sections | Remove `// 01_`, `OPERATOR`, `SYSTEM READY`, `DECRYPTING SCHEMA`, etc. |

---

## 5. Verification Plan

1. **Build & Type Check**: Run `npm run build` to verify zero TypeScript or Next.js build errors.
2. **Local Preview**: Verify on `http://localhost:3000` for responsive behavior on mobile and desktop, light mode and dark mode transitions, and smooth scroll navigation.
3. **Lighthouse / Performance**: Validate elimination of layout shifts, scanline rendering overhead, and audio lag.
