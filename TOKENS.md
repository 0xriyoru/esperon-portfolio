# Design Tokens & Theme Configuration

> **Single Source of Truth**: [`src/app/globals.css`](src/app/globals.css).  
> All tokens defined here are exported via Tailwind CSS v4 `@theme inline` for direct utility consumption (e.g., `bg-main`, `text-primary`, `border-border-subtle`, `font-cyber`).

---

## 1. Theme Color Modes (Calibrated Titanium System)

### Dark Theme (Industrial Titanium & Neon Telemetry) — Default
- `--theme-main`: `#08090C` (Deep Titanium Black Canvas)
- `--theme-secondary`: `#101217` (Surface Slate / Sidebar / Container Fill)
- `--theme-card`: `#14171E` (Elevated Card Surface)
- `--theme-primary`: `#F4F4F6` (Crisp High-Contrast Primary Text)
- `--theme-muted`: `#8E929B` (Refined Technical Gray / Subtitle Text)
- `--theme-border-subtle`: `rgba(255, 255, 255, 0.08)` (Precision Micro-Divider)
- `--theme-border-hover`: `rgba(0, 240, 255, 0.35)` (Cyan Glow Border Hover)
- `--theme-accent-cyan`: `#00F0FF` (Electric Neon Cyan / Primary Interactive)
- `--theme-accent-emerald`: `#10B981` (Operational Green / Online Telemetry)
- `--theme-accent-amber`: `#F59E0B` (Precision Warning Amber)
- `--theme-accent-yellow`: `#FCEE09` (High-Voltage Neon Cyber Yellow)
- `--theme-accent-rose`: `#FF003C` (System Alert Rose / Critical Indicator)

### Light Theme (Technical Blueprint Alabaster) — `html.light`
- `--theme-main`: `#F6F7F9` (Warm Alabaster Blueprint Canvas)
- `--theme-secondary`: `#ECEEF2` (Concrete Slate Surface)
- `--theme-card`: `#FFFFFF` (Pure Card White)
- `--theme-primary`: `#0C0D10` (Charcoal Black Text)
- `--theme-muted`: `#626772` (Muted Technical Charcoal)
- `--theme-border-subtle`: `rgba(0, 0, 0, 0.09)` (Precision Architectural Border)
- `--theme-border-hover`: `rgba(8, 145, 178, 0.45)` (Deep Cyan Border Hover)
- `--theme-accent-cyan`: `#0891B2` (Deep Precision Cyan)
- `--theme-accent-emerald`: `#059669` (Technical Forest Emerald)
- `--theme-accent-amber`: `#D97706` (Deep Warning Amber)
- `--theme-accent-yellow`: `#CA8A04` (Deep Ochre Amber)
- `--theme-accent-rose`: `#E11D48` (Deep Crimson Accent)

---

## 2. Typography

- **Sans-Serif (`font-sans`)**: `'Inter'`, `var(--font-inter)`, ui-sans-serif, system-ui, sans-serif
  - *Usage*: Long-form reading, descriptions, project summaries, body text.
- **Monospace (`font-mono`)**: `'JetBrains Mono'`, `var(--font-jetbrains-mono)`, monospace
  - *Usage*: Code snippets, status indicators, telemetry chips, timestamps, terminal logs.
- **Cyber / Display (`font-cyber`)**: `'Orbitron'`, `'Chakra Petch'`, `var(--font-orbitron)`, sans-serif
  - *Usage*: Section badges, HUD headers, chamfered buttons, action triggers, command palette titles.
- **Tactical Angular (`font-chakra`)**: `'Chakra Petch'`, `var(--font-chakra)`, sans-serif
  - *Usage*: Tactical callouts, military/hardware serial labels.

---

## 3. Hardware & Cybernetic Utilities

- **`.cyber-chamfer`**: Geometric chamfer cut corners for cards and containers:
  `clip-path: polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))`
- **`.cyber-chamfer-btn`**: Asymmetrical diagonal cut button with micro-scale interactive feedback:
  `clip-path: polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)`
- **`.cyber-chamfer-tag`**: Compact 6px chamfer for badges and chip labels.
- **`.hazard-stripes`**: Subtle 45° repeating mechanical warning lines using `--theme-border-subtle`.
- **`.glass-card`**: Restrained frosted card container (12px radius) using `color-mix(in srgb, var(--theme-secondary) 82%, transparent)` with `backdrop-filter: blur(12px)`, top specular edge reflection, and electric cyan hover glow.
- **`.cyber-card`**: Backward-compatible frosted hardware container (12px radius, 12px blur, cyan hover glow).
- **`.cyber-button`**: Tactical button styling utilizing `--font-cyber` with refined tracking.

---

## 4. Glassmorphism & Frosted Surfaces

Frosted glass effects are applied systematically across overlay, card, and floating elements:
- **Primary Content Cards (`.glass-card`, `.cyber-card`)**: `color-mix(82% secondary, transparent)` with `backdrop-filter: blur(12px)`
- **Command Palette (`CommandPalette.tsx`)**: `bg-secondary/95 backdrop-blur-xl border border-border-subtle shadow-2xl`
- **Sticky Desktop Navigation (`Sidebar.tsx`)**: `bg-secondary/95 backdrop-blur-md border-r border-border-subtle`
- **Mobile Header & Drawer (`MobileNav.tsx`)**: `bg-secondary/90 backdrop-blur-md` with `bg-black/60 backdrop-blur-sm` backdrop
- **Telemetry HUD Radar (`CyberHudRadar.tsx`)**: `bg-secondary/80 backdrop-blur-md border border-border-subtle/90`
- **Telemetry Stats Grid (`AnimatedStatsGrid.tsx`)**: `bg-secondary/80 backdrop-blur-sm border border-border-subtle`
- **Floating Page Views Pill (`PageViews.tsx`)**: `bg-secondary/90 backdrop-blur-md border border-border-subtle`
- **Bottom CTA Banner (`page.tsx`)**: `bg-secondary/80 backdrop-blur-md border border-border-subtle`

---

## 5. Motion, Transitions & Micro-Interactions

- **Tactile Quick Transitions**: `transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1)` (buttons and interactive chips).
- **Smooth Card Glow & Depth**: `0.25s ease` (border-color, box-shadow, and subtle `-translate-y-1` hover lift).
- **Framer Motion Reveals**: Viewport entries utilize `duration: 0.3` to `0.5`, `ease: "easeOut"`.
- **System Ambient Animations**:
  - `spin-slow`: 20s linear infinite rotation (HUD radar discs).
  - `laser-sweep`: Horizontal scanning beam across cards.
  - `radar-pulse`: Breathing sonar wave on telemetry widgets.
  - `eq-bounce-1..3`: Realtime activity audio visualizer bars.