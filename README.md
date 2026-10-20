# Rhodge Esperon — Full-Stack Web & Defensive Cybersecurity Portfolio

<p align="center">
  <a href="https://esperonrhodge.vercel.app">
    <img src="https://img.shields.io/badge/Live%20Portfolio-esperonrhodge.vercel.app-2340D9?style=for-the-badge&logo=vercel&logoColor=white" alt="Live Portfolio" />
  </a>
  <a href="https://esperonrhodge.vercel.app/cv.pdf">
    <img src="https://img.shields.io/badge/Curriculum%20Vitae-Download%20PDF-12151A?style=for-the-badge&logo=adobeacrobatreader&logoColor=white" alt="Curriculum Vitae" />
  </a>
  <a href="https://www.linkedin.com/in/rhodge-esperon">
    <img src="https://img.shields.io/badge/LinkedIn-rhodge--esperon-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn Profile" />
  </a>
  <a href="mailto:rhodgesperon@gmail.com">
    <img src="https://img.shields.io/badge/Email-rhodgesperon%40gmail.com-EA4335?style=for-the-badge&logo=gmail&logoColor=white" alt="Direct Email" />
  </a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Focus-Full--Stack%20Web%20%26%20Defensive%20Cyber-edeff2?style=flat-square&color=2340D9&labelColor=12151A" alt="Role Focus" />
  <img src="https://img.shields.io/badge/Education-BSIT%20%40%20Lyceum%20of%20Subic%20Bay-edeff2?style=flat-square&color=2340D9&labelColor=12151A" alt="Education" />
  <img src="https://img.shields.io/badge/Location-Olongapo%20City%2C%20Philippines%20(UTC%2B8)-edeff2?style=flat-square&color=2340D9&labelColor=12151A" alt="Location" />
  <img src="https://img.shields.io/badge/Status-Open%20to%20Opportunities-brightgreen?style=flat-square" alt="Status" />
</p>

---

## Overview

4th-year BS Information Technology student at Lyceum of Subic Bay College in Olongapo. Focused on full-stack web development and defensive cybersecurity, with an active interest in SOC operations and secure systems.

This repository powers [esperonrhodge.vercel.app](https://esperonrhodge.vercel.app), built as a static Next.js 16 export paired with Supabase PostgREST/Realtime hydration and live GitHub contribution telemetry.

---

## Featured Engineering Work

### 1. Enterprise Job Order Management System (486-Hour Practicum)
**Organization:** Subic Bay Metropolitan Authority (SBMA) — Asset Management Department (AMD)  
**Period:** May 2026 – September 2026

* **Problem:** AMD relied on an unmaintained local-host server with data-loss risks, no audit trail, and manual maintenance request tracking across port facilities.
* **Solution:** Built and deployed a cloud PostgreSQL and Supabase Job Order Management System with PL/pgSQL atomic numbering (`709-MMYY-CCCC`), row-level locks, Role-Based Access Control (RBAC), and Cloudflare Turnstile verification.
* **Outcome:** Digitized Commission on Audit (COA) accountable Form PPD-CF-36 serialization and completed a 486-hour industry practicum.

---

### 2. Competitive Programming, Certifications & Summits
**Milestones:** TOPCIT Level 2, RAITE 2026, DEVCON Convergence III, AWS Community Day PH

* **TOPCIT Level 2 Certification (Dec 2025):** Certified Level 2 in the Test of Practical Competency in ICT (IITP Korea).
* **RAITE 2026 Regional Programming Challenge (Oct 2026):** Represented Lyceum of Subic Bay in algorithmic problem-solving across Central Luzon (PSITE).
* **Conferences & Seminars:** Participated in DEVCON Convergence III (Cyber Risk Governance), AWS Community Day Philippines (Taguig City), and the Skydevs Hack, Play & Learn Summit 2025.
* **Journey Timeline:** Interactive horizontal center-axis Git branching timeline verifiable at [esperonrhodge.vercel.app/#journey](https://esperonrhodge.vercel.app/#journey).

---

### 3. Field Notebook Design System & Zero-Server Web Architecture
**Implementation:** [`src/app/globals.css`](src/app/globals.css), [`src/components/Projects.tsx`](src/components/Projects.tsx), [`src/components/Journey.tsx`](src/components/Journey.tsx), [`src/components/Activity.tsx`](src/components/Activity.tsx)

* **Field Notebook Aesthetic:** Light-mode paper-and-ink palette (`#edeff2` paper, `#12151a` ink, `#2340d9` cobalt accent, `1px` structural rules, `3px` radius). Typographic hierarchy pairs Bricolage Grotesque display headers with IBM Plex Sans body copy and IBM Plex Mono technical metadata.
* **Static Export:** Compiles to static HTML/CSS/JS (`output: 'export'`) for fast edge delivery with zero server compute overhead.
* **Supabase Hydration & Offline Fallback:** Queries Supabase PostgREST and subscribes to `projects-realtime` WebSocket updates while falling back immediately to local TypeScript dictionaries ([`src/data/projectsData.ts`](src/data/projectsData.ts) and [`src/data/githubContributions2026.json`](src/data/githubContributions2026.json)) when offline.

---

## Technical Stack

| Domain | Technologies |
| :--- | :--- |
| **Frontend** | React 19, Next.js 16 (App Router, Static Export), TypeScript 5, Tailwind CSS v4, Motion (`motion/react`) |
| **Backend & Database** | PostgreSQL 15+, Supabase, PostgREST, Row-Level Security (RLS), PL/pgSQL Stored Procedures |
| **Design & Icons** | Field Notebook Token System, `@phosphor-icons/react`, `@icons-pack/react-simple-icons`, CSS 3D Transforms |
| **Tooling & Deployment** | Git, GitHub Actions / Vercel Edge CDN, ESLint 9, Supabase CLI |

---

## Repository Structure

* [`src/app/page.tsx`](src/app/page.tsx) — Main page assembly, hero line-mask reveals, and section layout.
* [`src/components/Projects.tsx`](src/components/Projects.tsx) — Project ledger with 3D paper-hinge specimen cards, Supabase Realtime sync, and offline fallback.
* [`src/components/Journey.tsx`](src/components/Journey.tsx) — Center-axis horizontal Git branching timeline covering academic milestones, the 486-hour SBMA practicum, competitions, and verifiable certificates.
* [`src/components/Skills.tsx`](src/components/Skills.tsx) — Categorized technical tool taxonomy and ecosystem links.
* [`src/components/Activity.tsx`](src/components/Activity.tsx) — Live SVG dot-matrix GitHub contribution visualizer (`@0xriyoru`) and Supabase view counter.
* [`src/lib/supabase.ts`](src/lib/supabase.ts) — Supabase client initialization.
* [`supabase/migrations/`](supabase/migrations/) — PostgreSQL table schemas, RLS policies, and RPC functions.

---

## Contact

* **Portfolio:** [esperonrhodge.vercel.app](https://esperonrhodge.vercel.app)
* **Curriculum Vitae:** [Download CV (PDF)](https://esperonrhodge.vercel.app/cv.pdf)
* **LinkedIn:** [linkedin.com/in/rhodge-esperon](https://www.linkedin.com/in/rhodge-esperon)
* **GitHub:** [@0xriyoru](https://github.com/0xriyoru)
* **Email:** [rhodgesperon@gmail.com](mailto:rhodgesperon@gmail.com)
