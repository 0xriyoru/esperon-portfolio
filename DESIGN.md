# Design System & Architecture Guidelines

## 1. Core Aesthetic
A fusion of high-precision **Living Data Schema** and **Cyberpunk Systems Engineering**. 
The interface presents content as a living telemetry stream, prioritizing readability, structural modularity, and snappy micro-interactions.

---

## 2. Layout Structure

### Fixed Cyberpunk Sidebar (`Sidebar.tsx`)
- **Width**: `250px` sticky desktop sidebar.
- **Header**: Operator identity (`Rhodge Esperon`), role (`AI & Full-Stack Developer`).
- **Nav Matrix**: Monospace nav items with real-time scroll-spy listening to `<main>` container:
  - `Profile` (`#profile`)
  - `Projects` (`#projects`)
  - `Skills` (`#skills`)
  - `Credentials` (`#credentials`)
  - `Activity` (`#activity`)
  - `Contact` (`#contact`)
- **Telemetry & Utilities**:
  - Live Database Connection status (`LIVE & HEALTHY` / `STANDBY` with Supabase ping).
  - 3-Way Theme Switcher (`AUTO`, `LIGHT`, `DARK`).
  - Command palette hint and reboot trigger (`[REBOOT]`).

### Main Content Area (`src/app/page.tsx`)
- **`// 01_PROFILE`**: Open canvas layout blending directly into dot-matrix background with telemetry bar, bio, 3 core capability chips (`01 // AI & BACKEND`, `02 // UI/UX DESIGN`, `03 // DATABASES`), action triggers, and a floating HUD portrait frame with rotating orbit ring.
- **`// 02_FEATURED_PROJECTS`**: Grid of cyber-cards with domain header, live status indicator (`DEPLOYED`, `DEVELOPMENT`, `ARCHIVED`), tags, and status filter tabs.
- **`// 03_TECHNICAL_INVENTORY`**: Modular inventory categories with module counts and interactive glowing tag pills.
- **`// 04_EXPERIENCE_&_SEMINARS`**: Vertical circuit timeline with connecting laser traces, glowing node pulses, organization badges, and filter tabs (`ALL`, `WORK`, `EVENTS & SEMINARS`).
- **`// 05_GITHUB_TRANSMISSION`**: Live GitHub contribution calendar with custom theme and interactive Year switcher (`PAST 1Y`, `2026`, `2025`, `2024`).
- **`// 06_CONTACT`**: Minimized communication panel with email trigger and direct links to GitHub & LinkedIn.

---

## 3. Interactive Motion & Cybernetic Cursor
- **`<BootSequence />`**: Cinematic ~2.2s boot sequence with step-by-step telemetry logs and smooth progress easing that adapts to Light/Dark theme instantly.
- **`<CyberCursor />`**: Dual-element reticle cursor (center laser dot + trailing spring crosshair ring) that expands and targets interactive elements on desktop.