# Obsidian & Precision Dark-Tech UI Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the portfolio UI from a noisy, AI-cliché cyberpunk layout into a high-craft, modern Obsidian & Precision Dark-Tech developer portfolio with clean typography, refined glassmorphic cards, human-grounded copy, and zero bloat.

**Architecture:** Update global design tokens and utilities in `globals.css` with a deep obsidian palette; remove the 34KB `BootSequence.tsx` hacking mini-game and CRT scanline noise; modernize `Sidebar.tsx` and `MobileNav.tsx`; redesign the profile hero, projects grid, skills inventory, timeline credentials, and activity calendar into high-craft, responsive components.

**Tech Stack:** Next.js 16 (App Router), React 19, Tailwind CSS v4, Framer Motion, `@supabase/supabase-js`, `react-github-calendar`, Inter & JetBrains Mono fonts.

**Spec:** `docs/superpowers/specs/2026-09-08-obsidian-dark-tech-redesign-design.md`

## Global Constraints
- Do not break existing Supabase database integration or static data fallbacks (`projectsData.ts`).
- Preserve dark and light mode toggle functionality without regressions.
- Strict typography discipline: Headings and copy use Inter sans-serif; JetBrains Mono is strictly reserved for technical metadata, tags, and timestamps.
- Zero AI slop: No `SYSTEM // READY`, `OPERATOR // 0XRIYORU`, `DECRYPTING SCHEMA...`, scanlines, or glitch animations.

---

### Task 1: Design Tokens & CSS Utilities Cleanup

**Files:**
- Modify: `src/app/globals.css:1-108`

**Interfaces:**
- Consumes: Tailwind v4 `@theme inline` variables
- Produces: Refined CSS variables (`--theme-main`, `--theme-secondary`, `--theme-card`, `--theme-border-subtle`, `--theme-accent-cyan`, `--theme-accent-emerald`, `--theme-accent-amber`) and utility classes (`.glass-card`, `.obsidian-button`)

- [ ] **Step 1: Update design tokens and remove scanlines and glitch animations in `src/app/globals.css`**
Replace `.bg-scanlines`, `glitch-anim`, and `cyber-slice` with clean dark-tech tokens:
```css
@import "tailwindcss";

@theme inline {
  --color-main: var(--theme-main);
  --color-secondary: var(--theme-secondary);
  --color-card: var(--theme-card);
  --color-primary: var(--theme-primary);
  --color-muted: var(--theme-muted);
  --color-border-subtle: var(--theme-border-subtle);
  --color-accent-cyan: var(--theme-accent-cyan);
  --color-accent-emerald: var(--theme-accent-emerald);
  --color-accent-amber: var(--theme-accent-amber);

  --font-sans: var(--font-inter), ui-sans-serif, system-ui, sans-serif;
  --font-mono: var(--font-jetbrains-mono), ui-monospace, SFMono-Regular, monospace;
}

:root {
  --theme-main: #09090B;
  --theme-secondary: #121215;
  --theme-card: #18181B;
  --theme-primary: #FAFAFA;
  --theme-muted: #A1A1AA;
  --theme-border-subtle: rgba(255, 255, 255, 0.08);
  --theme-border-hover: rgba(255, 255, 255, 0.16);
  --theme-accent-cyan: #00F0FF;
  --theme-accent-emerald: #10B981;
  --theme-accent-amber: #F59E0B;
}

html.light {
  --theme-main: #FAFAFA;
  --theme-secondary: #F4F4F5;
  --theme-card: #FFFFFF;
  --theme-primary: #09090B;
  --theme-muted: #71717A;
  --theme-border-subtle: rgba(0, 0, 0, 0.08);
  --theme-border-hover: rgba(0, 0, 0, 0.16);
  --theme-accent-cyan: #0891B2;
  --theme-accent-emerald: #059669;
  --theme-accent-amber: #D97706;
}

html.dark {
  --theme-main: #09090B;
  --theme-secondary: #121215;
  --theme-card: #18181B;
  --theme-primary: #FAFAFA;
  --theme-muted: #A1A1AA;
  --theme-border-subtle: rgba(255, 255, 255, 0.08);
  --theme-border-hover: rgba(255, 255, 255, 0.16);
  --theme-accent-cyan: #00F0FF;
  --theme-accent-emerald: #10B981;
  --theme-accent-amber: #F59E0B;
}

@layer utilities {
  .glass-card {
    background-color: var(--theme-secondary);
    border: 1px solid var(--theme-border-subtle);
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04), 0 4px 20px rgba(0, 0, 0, 0.25);
    border-radius: 12px;
  }
  
  .glass-card:hover {
    border-color: var(--theme-border-hover);
  }

  .obsidian-button {
    border-radius: 8px;
    font-family: var(--font-sans);
    font-weight: 500;
    transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  }
}

body {
  background-color: var(--theme-main);
  color: var(--theme-primary);
  font-family: var(--font-sans);
  transition: background-color 0.2s ease, color 0.2s ease;
  selection-background-color: rgba(0, 240, 255, 0.2);
}

::selection {
  background: rgba(0, 240, 255, 0.25);
  color: var(--theme-primary);
}

:focus-visible {
  outline: 2px solid var(--theme-accent-cyan);
  outline-offset: 2px;
}
```

- [ ] **Step 2: Verify CSS syntax and build**
Run: `npm run build`
Expected: PASS

- [ ] **Step 3: Commit Task 1 changes**
```bash
git add src/app/globals.css
git commit -m "style: modernize design tokens and remove scanline/glitch slop"
```

---

### Task 2: Deprecate `BootSequence` & Refine Ambient Background

**Files:**
- Modify: `src/app/layout.tsx:1-55`
- Modify: `src/components/CyberBackgroundCanvas.tsx:1-144`
- Delete: `src/components/BootSequence.tsx`

**Interfaces:**
- Consumes: Clean canvas layout
- Produces: Uncluttered `RootLayout` without audio event listeners or hacking minigame overhead

- [ ] **Step 1: Remove `BootSequence` from `src/app/layout.tsx`**
Remove `BootSequence` import and wrapper; keep `CyberBackgroundCanvas`, `CommandPalette`, `MobileNav`, `Sidebar`, and `PageWrapper`. Remove `bg-scanlines bg-dot-grid` from `<body>`.

- [ ] **Step 2: Simplify `src/components/CyberBackgroundCanvas.tsx`**
Replace mouse click EMP shockwaves with subtle, gentle ambient proximity illumination on a sparse grid with low opacity.

- [ ] **Step 3: Delete `src/components/BootSequence.tsx`**
Remove the 34KB hacking game file from the codebase.

- [ ] **Step 4: Verify build succeeds**
Run: `npm run build`
Expected: PASS without missing import errors.

- [ ] **Step 5: Commit Task 2 changes**
```bash
git add src/app/layout.tsx src/components/CyberBackgroundCanvas.tsx
git rm src/components/BootSequence.tsx
git commit -m "refactor: eliminate boot sequence minigame and refine ambient canvas"
```

---

### Task 3: Streamline Sidebar & Mobile Navigation

**Files:**
- Modify: `src/components/Sidebar.tsx:1-181`
- Modify: `src/components/MobileNav.tsx:1-200`

**Interfaces:**
- Consumes: Navigation items list
- Produces: Clean, modern desktop sticky sidebar and mobile bar without fake telemetry or easter egg clutter

- [ ] **Step 1: Update `src/components/Sidebar.tsx`**
- Header: "Rhodge Esperon" with role "Full-Stack & AI Developer" and emerald status badge "Available for work".
- Nav: Clean items with subtle active pill, without `>` ASCII prefix.
- Footer: Remove "DB Connection: LIVE & HEALTHY" box and `[BREACH MINIGAME]` button. Retain ThemeToggle, Command Palette shortcut, and email link.

- [ ] **Step 2: Update `src/components/MobileNav.tsx`**
- Remove telemetry junk and match the new obsidian dark-tech aesthetic with clean backdrop blur.

- [ ] **Step 3: Verify build succeeds**
Run: `npm run build`
Expected: PASS

- [ ] **Step 4: Commit Task 3 changes**
```bash
git add src/components/Sidebar.tsx src/components/MobileNav.tsx
git commit -m "feat: modernize sidebar and mobile navigation with obsidian styling"
```

---

### Task 4: De-slop & Elevate Hero / Profile Section

**Files:**
- Modify: `src/app/page.tsx:32-176`

**Interfaces:**
- Consumes: Real profile information from `PRODUCT.md` and `CV.md`
- Produces: High-craft hero with authentic bio, 3 core focus cards, and elegant portrait framing

- [ ] **Step 1: Rewrite Profile Section in `src/app/page.tsx`**
- Replace `SYSTEM // READY`, `OPERATOR // 0XRIYORU`, and `// ENGINEERING SYSTEMS ARCHITECTURE` with clean live time badge, Subic Bay location, and "Available for roles & contracts".
- Headline: Inter bold with tight tracking: "Rhodge Esperon". Subheading: "Full-Stack Developer & AI Systems Engineer".
- Bio: Grounded narrative: "4th-year IT student at Lyceum of Subic Bay specializing in production web systems, agentic AI workflows, and UI/UX engineering. Experienced in delivering internal government platforms at SBMA, OCR pipelines, and low-latency audio applications."
- Capability Cards: 3 clean glassmorphic cards:
  1. *Full-Stack Systems* (Next.js, TypeScript, Supabase, PostgreSQL RLS)
  2. *Agentic AI & Specialized Pipelines* (LLM workflows, OCR processing, Python)
  3. *Systems & UI/UX Craft* (Figma design systems, Web Audio API, PWA)
- Action buttons: "Explore Projects ↗" (primary cyan), "Resume / CV ↗" (glass outline), "Get in Touch ↗" (subtle link).
- Portrait Frame: Remove corner `+` marks and schematic borders; use an elegant rounded container with subtle ambient halo, high-res photo, and a clean tag: "BSIT '27 • SBMA IT Alumni".

- [ ] **Step 2: Verify build succeeds**
Run: `npm run build`
Expected: PASS

- [ ] **Step 3: Commit Task 4 changes**
```bash
git add src/app/page.tsx
git commit -m "feat: overhaul hero profile section with de-slopped typography and portrait"
```

---

### Task 5: Modernize Featured Projects

**Files:**
- Modify: `src/components/Projects.tsx:80-243`

**Interfaces:**
- Consumes: `staticProjects` and Supabase realtime project records
- Produces: Polished project cards with subtle hover highlights, verified domain labels, tech pills, and clean action buttons

- [ ] **Step 1: Refine `Projects.tsx` card presentation**
- Filter bar: Clean pill buttons (`ALL`, `DEPLOYED`, `IN PROGRESS`, `ARCHIVED`).
- Cards: Replace heavy boxy borders with `.glass-card` styling and subtle top border highlight on hover.
- Domain & Status: Clean domain badge and status indicator (`Production` in emerald, `In Progress` in amber, `Archived` in muted zinc).
- Project title: Inter bold with clean typography; clean architecture badge.
- Description & Highlights: Polished typography and bulleted points.
- Gov access: Clean "Internal Government System • Restricted Access" badge for SBMA-JO.
- Action buttons: Clean "Live Demo ↗" and "Source ↗" buttons with smooth hover feedback.

- [ ] **Step 2: Verify build succeeds**
Run: `npm run build`
Expected: PASS

- [ ] **Step 3: Commit Task 5 changes**
```bash
git add src/components/Projects.tsx
git commit -m "feat: polish featured projects with obsidian glass cards and clean badges"
```

---

### Task 6: Refine Skills, Experience, Activity & Contact

**Files:**
- Modify: `src/components/Skills.tsx:50-103`
- Modify: `src/components/Credentials.tsx:60-230`
- Modify: `src/components/Activity.tsx:30-85`
- Modify: `src/app/page.tsx:178-265`

**Interfaces:**
- Consumes: Supabase credentials, skills data, and GitHub calendar API
- Produces: Unified obsidian dark-tech experience across remaining sections

- [ ] **Step 1: Update `Skills.tsx`**
- Replace `> QUERYING SKILLS SCHEMA...` with clean skeleton or loader.
- Restyle skill cards into glass cards with clean category headers and sleek pill tags.

- [ ] **Step 2: Update `Credentials.tsx`**
- Replace `> DECRYPTING CREDENTIALS SCHEMA...` with clean indicator.
- Refine timeline nodes and cards for Work Experience, Recognitions & Certs, and Seminars with clean links to certificates.

- [ ] **Step 3: Update `Activity.tsx`**
- Change GitHub calendar theme from blood-red to modern obsidian-emerald scale:
  `dark: ["#121215", "#064e3b", "#047857", "#059669", "#10b981"]`
  `light: ["#E4E4E7", "#A7F3D0", "#34D399", "#10B981", "#059669"]`

- [ ] **Step 4: Update `#contact` in `src/app/page.tsx`**
- Clean, focused CTA card with copy-to-clipboard email trigger, mailto button, GitHub, and LinkedIn links. Remove `// 06_GET_IN_TOUCH`.

- [ ] **Step 5: Verify build succeeds**
Run: `npm run build`
Expected: PASS

- [ ] **Step 6: Commit Task 6 changes**
```bash
git add src/components/Skills.tsx src/components/Credentials.tsx src/components/Activity.tsx src/app/page.tsx
git commit -m "feat: restyle skills, timeline, github activity, and contact sections"
```

---

### Task 7: Full Verification & Final Polish

**Files:**
- Verify: Full project workspace

**Interfaces:**
- Consumes: Next.js dev and production build
- Produces: 100% verified, responsive, clean, un-slopped portfolio

- [ ] **Step 1: Run complete production build**
Run: `npm run build`
Expected: Clean build with zero errors.

- [ ] **Step 2: Run linter**
Run: `npm run lint`
Expected: 0 errors or clean exit.

- [ ] **Step 3: Verify preview on localhost:3000**
Check responsive desktop layout, mobile drawer, dark/light theme switching, and scroll spy.
