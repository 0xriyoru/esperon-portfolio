# Design Tokens & Theme Configuration

## Colors (Cyberpunk x Minimalist)
- **Background Main**: `#050505` (Deep Black)
- **Background Secondary**: `#121212` (Dark Gray - for sidebar or cards)
- **Text Primary**: `#E0E0E0` (Off-white)
- **Text Secondary**: `#888888` (Muted gray)
- **Accent 1 (Cyberpunk Yellow)**: `#FCEE09`
- **Accent 2 (Neon Cyan)**: `#00F0FF`
- **Accent 3 (Neon Magenta/Pink)**: `#FF003C`
- **Border Subtle**: `#222222`

## Typography
- **Sans-serif (Body)**: 'Inter', sans-serif
- **Monospace (Headings, Tech Details, Navigation)**: 'JetBrains Mono', 'Fira Code', or 'Space Mono'

## Visual Effects & Animations (Framer Motion)
- **Hover States**: Glowing neon borders using the accent colors.
- **Images**: Apply a CSS grayscale and halftone/dithered filter to profile images to match a terminal hacker aesthetic.
- **Background Texture**: Subtle CSS scanlines or a faint dot grid.
- **Animation Timing**: UX must feel FAST. Use duration `0.2s` for color/opacity changes. Use spring physics (`stiffness: 300, damping: 20`) for structural movements to make them feel snappy, not sluggish.