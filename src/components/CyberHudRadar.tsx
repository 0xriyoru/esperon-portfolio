"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function CyberHudRadar() {
  const [isCalibrating, setIsCalibrating] = useState(false);
  const [calibratedTheme, setCalibratedTheme] = useState<string>("SYNC");

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null;

    const handleThemeChange = (e: Event) => {
      const customEvt = e as CustomEvent<{ theme: string }>;
      const themeMode = customEvt.detail?.theme?.toUpperCase() || "SYNC";
      setCalibratedTheme(themeMode);
      setIsCalibrating(true);

      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setIsCalibrating(false);
      }, 850);
    };

    window.addEventListener("theme-change", handleThemeChange);
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      window.removeEventListener("theme-change", handleThemeChange);
    };
  }, []);

  return (
    <div className="relative shrink-0 mx-auto lg:mx-0 flex items-center justify-center p-4 select-none">
      {/* Ambient Cyber Aura Glow */}
      <div className={`absolute w-72 h-72 rounded-full blur-3xl pointer-events-none -z-10 transition-colors duration-500 ${
        isCalibrating ? "bg-accent-cyan/35 scale-110" : "bg-accent-cyan/15 animate-pulse"
      }`} />
      <div className="absolute w-60 h-60 rounded-full bg-accent-amber/10 blur-2xl pointer-events-none -z-10" />

      {/* Outer Orbit Ring 1 (Clockwise Rotation) */}
      <div className={`absolute w-[310px] sm:w-[350px] h-[310px] sm:h-[350px] rounded-full border border-dashed transition-colors duration-300 pointer-events-none animate-[spin-slow_28s_linear_infinite] ${
        isCalibrating ? "border-accent-cyan/60" : "border-accent-cyan/20"
      }`}>
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
      <div className={`absolute -top-1 -left-1 w-3.5 h-3.5 border-t-2 border-l-2 transition-all duration-300 pointer-events-none ${
        isCalibrating ? "border-accent-cyan shadow-[0_0_10px_rgba(0,240,255,0.8)] scale-110" : "border-accent-cyan/60"
      }`} />
      <div className={`absolute -top-1 -right-1 w-3.5 h-3.5 border-t-2 border-r-2 transition-all duration-300 pointer-events-none ${
        isCalibrating ? "border-accent-cyan shadow-[0_0_10px_rgba(0,240,255,0.8)] scale-110" : "border-accent-cyan/60"
      }`} />
      <div className={`absolute -bottom-1 -left-1 w-3.5 h-3.5 border-b-2 border-l-2 transition-all duration-300 pointer-events-none ${
        isCalibrating ? "border-accent-cyan shadow-[0_0_10px_rgba(0,240,255,0.8)] scale-110" : "border-accent-cyan/60"
      }`} />
      <div className={`absolute -bottom-1 -right-1 w-3.5 h-3.5 border-b-2 border-r-2 transition-all duration-300 pointer-events-none ${
        isCalibrating ? "border-accent-cyan shadow-[0_0_10px_rgba(0,240,255,0.8)] scale-110" : "border-accent-cyan/60"
      }`} />

      {/* Main Image Container Card */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
        className={`relative p-2.5 rounded-2xl border bg-secondary/80 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.5)] group overflow-hidden transition-colors duration-300 ${
          isCalibrating ? "border-accent-cyan/70 shadow-[0_0_24px_rgba(0,240,255,0.25)]" : "border-border-subtle/90"
        }`}
      >
        {/* Technical Micro-Decal Header */}
        <div className="flex items-center justify-between text-[10px] font-mono text-muted px-1 pb-2 border-b border-border-subtle/60 mb-2">
          <span className={`transition-colors duration-200 ${isCalibrating ? "text-accent-cyan font-bold" : "text-accent-cyan font-medium"}`}>
            {isCalibrating ? "MODE_SYNC ACTIVE" : "PORTFOLIO EDITION"}
          </span>
          <span className={isCalibrating ? "text-accent-cyan font-mono" : ""}>
            {isCalibrating ? "0xSYNC" : "SUBIC BAY, PH"}
          </span>
        </div>

        {/* Portrait Media */}
        <div className="relative w-56 sm:w-64 h-64 sm:h-72 rounded-xl overflow-hidden" suppressHydrationWarning>
          <Image
            src="/profile.png"
            alt="Rhodge Esperon"
            fill
            priority
            suppressHydrationWarning
            className={`object-cover transition-all duration-700 group-hover:scale-105 ${
              isCalibrating ? "brightness-110 contrast-105" : ""
            }`}
          />

          {/* Bryl Lim-inspired Optic Laser Scanline & Holographic Calibration Overlay */}
          {isCalibrating && (
            <>
              {/* Sweeping Optic Laser Line */}
              <div className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-accent-cyan to-transparent shadow-[0_0_12px_rgba(0,240,255,1),0_0_20px_rgba(0,240,255,0.8)] z-20 pointer-events-none animate-avatar-scan" />

              {/* Holographic matrix scanlines */}
              <div className="absolute inset-0 bg-accent-cyan/10 hazard-stripes mix-blend-overlay z-10 pointer-events-none animate-pulse" />
            </>
          )}

          {/* Vignette Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

          {/* Bottom Telemetry Badge */}
          <div className={`absolute bottom-2.5 left-2.5 right-2.5 bg-black/85 backdrop-blur-md border px-3 py-1.5 rounded-lg flex items-center justify-between text-[11px] font-mono transition-all duration-200 ${
            isCalibrating ? "border-accent-cyan text-accent-cyan shadow-[0_0_12px_rgba(0,240,255,0.3)]" : "border-white/10 text-white"
          }`}>
            <div className="flex items-center gap-1.5 truncate mr-2">
              <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                isCalibrating ? "bg-accent-cyan animate-ping" : "bg-accent-emerald animate-pulse"
              }`} />
              <span className="font-medium truncate">
                {isCalibrating ? `THEME // ${calibratedTheme}` : "BSIT Candidate"}
              </span>
            </div>
            <span className="text-accent-cyan font-semibold shrink-0">
              {isCalibrating ? "OK" : "'27"}
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
