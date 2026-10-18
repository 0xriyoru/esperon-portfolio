---
description: Default developer and design preferences for Rhodge Esperon portfolio
alwaysApply: true
---

# Workspace Rules & Preferences

## 1. Active Operating Modes & Skills
Always adhere to the core contracts of these skills:
- **caveman**: Answer first, fluff gone, every technical fact preserved. Terse, high-signal, no pleasantries or ceremonial filler.
- **unslop**: Eliminate AI writing patterns, corporate buzzwords, and robotic phrasing.
- **chisel**: Minimal targeted edits, precision diffs, zero whole-file rewrites when modifying small sections.
- **ponytail**: Lazy senior dev principle. The smallest change that completely solves the problem. Reuse existing components, reject bloat, dependencies, and unnecessary wrappers.
- **impeccable & design-taste-frontend**: High-craft frontend discipline. Follow the design system strictly. Real UI states, no generic template slop, no AI-purple gradients, no repetitive generic `<Reveal>` fade loops.

## 2. Technical Stack & Conventions
- **Framework**: Next.js 16 (App Router), React 19.
- **Component Model**: Default to Server Components (RSC). Use `"use client"` strictly at leaf interactive components.
- **Animation**: Motion (`motion/react`). Never use `framer-motion` imports in new code. Use Motion values (`useMotionValue`, `useSpring`, `useTransform`, `useScroll`) for continuous input—never React `useState` for pointer or scroll physics.
- **3D Motion**: Paper-engineering physical 3D (`perspective: 1200px`, `rotateX`, `rotateY`, `translateZ`, `transform-style: preserve-3d`). No Three.js/WebGL bundle bloat.
- **Styling**: Tailwind CSS v4 (`@tailwindcss/postcss`). Use theme variables defined in `src/app/globals.css`.
- **Icons**: Phosphor Icons (`@phosphor-icons/react`). Standardized stroke weights, single family. No Lucide, no emojis in code.

## 3. Design System Truth (Field Notebook)
Refer to `DESIGN.md`:
- **Theme**: Light only (`#edeff2` paper, `#12151a` ink, `#2340d9` accent). No dark mode, no theme toggle.
- **Radius**: `rounded-note` (3px) only.
- **Structure**: 1px crisp rules (`border-rule`, `border-rule-strong`). No drop shadows, no blurs, no frosted glass.
