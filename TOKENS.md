# Design Tokens & Theme Configuration

## Theme Modes (Dual-Palette System)

### Dark Theme (Cyberpunk Terminal)
- `--theme-main`: `#050505` (Deep Black Canvas)
- `--theme-secondary`: `#101010` (Dark Charcoal / Card Surfaces)
- `--theme-primary`: `#E0E0E0` (High-Contrast Off-White Text)
- `--theme-muted`: `#888888` (Muted Telemetry Gray)
- `--theme-border-subtle`: `#222222` (Subtle Grid & Card Borders)
- `--theme-accent-yellow`: `#FCEE09` (Cyberpunk Electric Yellow)
- `--theme-accent-cyan`: `#00F0FF` (Neon Cyan)
- `--theme-accent-pink`: `#FF003C` (Neon Crimson / Magenta)

### Light Theme (Cyber-Alabaster Schema)
- `--theme-main`: `#EFEFE9` (Alabaster Paper / Schema Canvas)
- `--theme-secondary`: `#E3E3DC` (Warm Concrete Card Surface)
- `--theme-primary`: `#121212` (Crisp Charcoal Text)
- `--theme-muted`: `#62625C` (Muted Technical Gray)
- `--theme-border-subtle`: `#CBCBC2` (Precision Schema Lines)
- `--theme-accent-yellow`: `#997A00` (Deep Industrial Amber)
- `--theme-accent-cyan`: `#008291` (Deep High-Tech Teal)
- `--theme-accent-pink`: `#C4002F` (Deep Crimson Accent)

---

## Typography
- **Sans-Serif (Body & Descriptions)**: `'Inter'`, `var(--font-inter)`, sans-serif
- **Monospace (Headings, Telemetry, Navigation, Metrics)**: `'JetBrains Mono'`, `var(--font-jetbrains-mono)`, monospace

---

## Visual Utilities & Classes
- `.cyber-card`: High-tech polygon sliced corners (`clip-path: polygon(24px 0, 100% 0, 100% calc(100% - 24px), calc(100% - 24px) 100%, 0 100%, 0 24px)`)
- `.cyber-button`: Angled button slice (`clip-path: polygon(15px 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%, 0 15px)`)
- `.bg-scanlines`: Subtitle 4px scanlines with blend modes
- `.bg-dot-grid`: Radial dot-matrix grid (20px by 20px)
- `.glitch-hover`: High-speed chromatic text shadow jitter on hover

---

## Motion & Spring Physics
- **Fast Interactive Transitions**: `0.2s ease`
- **Spring Physics for Structural Elements**: `stiffness: 400`, `damping: 25`
- **Cursor Springs**: `stiffness: 500`, `damping: 28` for reticle smoothing