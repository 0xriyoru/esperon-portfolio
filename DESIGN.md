# Design system: field notebook

One theme (light), one accent, one radius. Built for recruiters and hiring managers scanning a developer portfolio.

## Color
- Paper `#edeff2`, deep paper `#e1e4ea` (loading states only)
- Ink `#12151a`, soft ink `#4a5362` (secondary text, 6:1 on paper)
- Rules `rgba(18,21,26,.16)` and strong `.55`
- Accent `#2340d9`, deep `#182ea3`. White on accent passes AA. Used for: primary CTA, one full-bleed internship field, live-status dot, links, the contribution graph scale.
- No dark mode, no theme toggle. Do not add a second accent.

## Type
- Display: Bricolage Grotesque, weights 300 to 500. Headlines are light, never bold. Max 6rem, tracking -0.03em.
- Body: IBM Plex Sans.
- Mono: IBM Plex Mono, for technical data (dates, tag lists, counts, code).

## Shape and depth
- One radius: 3px (`rounded-note`). Buttons and the CV chip only.
- No shadows, no blur, no glass. Structure comes from 1px rules.

## Layout
- Max width 1280px, gutters 20px / 40px.
- Section families are used once each: hero split, fact row, index list, accent field, side-heading ledger, definition columns, activity strip, contact footer.

## Motion
- One authored moment: hero name lines rise out of a mask once, then the rule draws.
- Project rows open with a grid-rows transition. Links draw an underline on hover.
- Paper-engineering 3D: tactile, physics-driven depth (`perspective: 1200px`, `rotateX`, `rotateY`, `translateZ`) for key focal specimens (hero badge, project hinge cards, experience slab). No WebGL or Three.js.
- All of it is disabled under `prefers-reduced-motion`.

## Copy rules
- No invented numbers. Every figure comes from CV.md or live data (Supabase, GitHub, visit counter).
- No em dashes, no emoji, no arrow glyphs as icons. Icons are Phosphor.
- One label per intent: "Email me" (mailto), "View CV".