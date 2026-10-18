<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Agent skills

### Issue tracker

Issues and specs are tracked as local markdown files under `.scratch/`. See `docs/agents/issue-tracker.md`.

### Triage labels

Using canonical triage labels (`needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`). See `docs/agents/triage-labels.md`.

### Domain docs

Single-context layout (`CONTEXT.md` and `docs/adr/` at repo root). See `docs/agents/domain.md`.

## Active Skills & Coding Standards

Every agent operating in this repository must adhere to:
- **Skills**: `caveman` (terse, answer-first), `unslop` (clean prose), `chisel` (minimal token edits), `ponytail` (minimal complete diffs, YAGNI), `impeccable` & `design-taste-frontend` (strict adherence to `DESIGN.md`).
- **Motion**: `motion/react` with hardware-accelerated CSS 3D (`perspective: 1200px`, `rotateX/Y`). No Three.js/WebGL bloat.
- **Rules**: Field notebook design system (`#edeff2` paper, `#12151a` ink, `#2340d9` accent, 1px rules, 3px radius). No dark mode.
