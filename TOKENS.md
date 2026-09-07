# Design Tokens & Theme Configuration

## Theme Modes (Industrial Precision System)

### Dark Theme (Industrial Titanium Slate)
- `--theme-main`: `#0B0C0E` (Deep Titanium Slate Canvas)
- `--theme-secondary`: `#131518` (Surface Slate / Card Background)
- `--theme-primary`: `#EDEDED` (Crisp High-Contrast Off-White Text)
- `--theme-muted`: `#80858E` (Refined Technical Gray)
- `--theme-border-subtle`: `#202328` (Precision 1px Micro-Border)
- `--theme-accent-yellow`: `#F59E0B` (Industrial Precision Amber)
- `--theme-accent-cyan`: `#06B6D4` (High-Tech Precision Cyan / Teal)
- `--theme-accent-pink`: `#F43F5E` (Precision Coral / Rose Indicator)

### Light Theme (Technical Blueprint Alabaster)
- `--theme-main`: `#F7F7F5` (Warm Alabaster Technical Canvas)
- `--theme-secondary`: `#EFEFEA` (Warm Concrete Card Surface)
- `--theme-primary`: `#111315` (Crisp Charcoal Text)
- `--theme-muted`: `#686C75` (Muted Technical Gray)
- `--theme-border-subtle`: `#DCDCD6` (Precision Blueprint Lines)
- `--theme-accent-yellow`: `#D97706` (Deep Technical Amber)
- `--theme-accent-cyan`: `#0891B2` (Deep Precision Cyan)
- `--theme-accent-pink`: `#E11D48` (Deep Crimson Accent)

---

## Typography
- **Sans-Serif (Headings & Readable Descriptions)**: `'Inter'`, `var(--font-inter)`, sans-serif
- **Monospace (Telemetry, Chips, Timestamps, Metrics, Navigation)**: `'JetBrains Mono'`, `var(--font-jetbrains-mono)`, monospace

---

## Visual Utilities & Classes
- `.cyber-card`: Precision hardware container with 8px radius, subtle 1px border highlight, and clean depth
- `.cyber-button`: High-tactile action button with 4px radius and active micro-scale
- `.bg-scanlines`: Subtle ambient scanlines with 2% blend mode
- `.bg-dot-grid`: Radial dot-matrix grid (20px by 20px)

---

## Motion & Transitions
- **Fast Interactive Transitions**: `0.2s ease`
- **Framer Motion Viewport Reveals**: `duration: 0.3`, `ease: "easeOut"`