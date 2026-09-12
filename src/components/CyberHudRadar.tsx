"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function CyberHudRadar() {
  return (
    <div className="relative shrink-0 mx-auto lg:mx-0 flex items-center justify-center p-4 select-none">
      {/* Ambient Cyber Aura Glow */}
      <div className="absolute w-72 h-72 rounded-full bg-accent-cyan/15 blur-3xl pointer-events-none -z-10 animate-pulse" />
      <div className="absolute w-60 h-60 rounded-full bg-accent-amber/10 blur-2xl pointer-events-none -z-10" />

      {/* Outer Orbit Ring 1 (Clockwise Rotation) */}
      <div className="absolute w-[310px] sm:w-[350px] h-[310px] sm:h-[350px] rounded-full border border-dashed border-accent-cyan/20 pointer-events-none animate-[spin-slow_28s_linear_infinite]">
        <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-accent-cyan shadow-[0_0_8px_rgba(0,240,255,0.8)]" />
        <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-accent-cyan/50" />
      </div>

      {/* Mid Orbit Ring 2 with Cardinal Coordinates (Counter-Clockwise Rotation) */}
      <div className="absolute w-[280px] sm:w-[316px] h-[280px] sm:h-[316px] rounded-full border border-border-subtle/80 pointer-events-none animate-[spin-reverse_36s_linear_infinite]">
        <div className="absolute top-1 left-1/2 -translate-x-1/2 text-[8px] font-mono text-accent-cyan/70">
          000°
        </div>
        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 text-[8px] font-mono text-muted">
          180°
        </div>
        <div className="absolute left-1 top-1/2 -translate-y-1/2 text-[8px] font-mono text-muted">
          270°
        </div>
        <div className="absolute right-1 top-1/2 -translate-y-1/2 text-[8px] font-mono text-accent-amber/70">
          090°
        </div>
      </div>

      {/* Sleek Technical Framing Corners */}
      <div className="absolute -top-1 -left-1 w-3.5 h-3.5 border-t-2 border-l-2 border-accent-cyan/60 pointer-events-none" />
      <div className="absolute -top-1 -right-1 w-3.5 h-3.5 border-t-2 border-r-2 border-accent-cyan/60 pointer-events-none" />
      <div className="absolute -bottom-1 -left-1 w-3.5 h-3.5 border-b-2 border-l-2 border-accent-cyan/60 pointer-events-none" />
      <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 border-b-2 border-r-2 border-accent-cyan/60 pointer-events-none" />

      {/* Main Image Container Card */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
        className="relative p-2.5 rounded-2xl border border-border-subtle/90 bg-secondary/80 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.5)] group overflow-hidden"
      >
        {/* Technical Micro-Decal Header */}
        <div className="flex items-center justify-between text-[10px] font-mono text-muted px-1 pb-2 border-b border-border-subtle/60 mb-2">
          <span className="text-accent-cyan font-medium">PORTFOLIO EDITION</span>
          <span>SUBIC BAY, PH</span>
        </div>

        {/* Portrait Media */}
        <div className="relative w-56 sm:w-64 h-64 sm:h-72 rounded-xl overflow-hidden" suppressHydrationWarning>
          <Image
            src="/profile.png"
            alt="Rhodge Esperon"
            fill
            priority
            suppressHydrationWarning
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />

          {/* Vignette Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

          {/* Reticle Target Crosshairs on Hover */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none flex items-center justify-center">
            <div className="w-12 h-12 border border-accent-cyan/40 rounded-full flex items-center justify-center animate-ping" />
            <div className="absolute w-full h-[1px] bg-accent-cyan/20" />
            <div className="absolute h-full w-[1px] bg-accent-cyan/20" />
          </div>

          {/* Bottom Telemetry Badge */}
          <div className="absolute bottom-2.5 left-2.5 right-2.5 bg-black/85 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-lg flex items-center justify-between text-[11px] font-mono">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-emerald animate-pulse" />
              <span className="text-white font-medium">BSIT Candidate</span>
            </div>
            <span className="text-accent-cyan font-semibold">&apos;27</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
