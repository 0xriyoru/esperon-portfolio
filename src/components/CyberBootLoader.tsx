"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function CyberBootLoader() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [currentLog, setCurrentLog] = useState("CORE_INIT // V4.8");

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    let interval: NodeJS.Timeout | null = null;

    const startBoot = () => {
      setProgress(0);
      setLoading(true);
      if (interval) clearInterval(interval);
      if (timer) clearTimeout(timer);

      const logs = [
        { p: 12, text: "INITIALIZING PLATFORM CORE..." },
        { p: 32, text: "LOADING INTERACTIVE SCHEMAS..." },
        { p: 58, text: "MOUNTING MOTION CONTROLS..." },
        { p: 82, text: "CALIBRATING TELEMETRY..." },
        { p: 100, text: "WORKSPACE READY // WELCOME" },
      ];

      let currentP = 0;
      // 100 ticks of 22ms = exactly 2200ms (~2.2 seconds)
      interval = setInterval(() => {
        currentP += 1;
        if (currentP >= 100) {
          currentP = 100;
          if (interval) clearInterval(interval);
          timer = setTimeout(() => {
            setLoading(false);
          }, 320);
        }
        setProgress(currentP);

        for (let i = logs.length - 1; i >= 0; i--) {
          if (currentP >= logs[i].p) {
            setCurrentLog(logs[i].text);
            break;
          }
        }
      }, 22);
    };

    startBoot();

    // Listen for reboot event triggered by theme toggling or user reboot button
    const handleReboot = () => {
      startBoot();
    };

    window.addEventListener("portfolio:reboot", handleReboot);

    return () => {
      if (interval) clearInterval(interval);
      if (timer) clearTimeout(timer);
      window.removeEventListener("portfolio:reboot", handleReboot);
    };
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.03 }}
          transition={{ duration: 0.45, ease: "easeInOut" }}
          className="fixed inset-0 z-[100000] bg-main text-primary flex flex-col items-center justify-center p-6 select-none overflow-hidden transition-colors duration-200"
        >
          {/* Subtle Themed Ambient Scanlines */}
          <div className="absolute inset-0 hazard-stripes opacity-20 dark:opacity-25 pointer-events-none" />

          {/* Ambient Glow Aura */}
          <div className="absolute w-72 h-72 rounded-full bg-accent-cyan/15 dark:bg-accent-cyan/10 blur-3xl pointer-events-none -z-10 animate-pulse" />

          {/* Top Bar */}
          <div className="absolute top-6 left-6 right-6 flex items-center justify-between text-[11px] font-mono text-muted border-b border-border-subtle pb-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent-cyan animate-ping" />
              <span className="text-accent-cyan font-semibold">BOOT_SEQUENCE // INITIALIZATION</span>
            </div>
            <div className="text-[10px] font-mono text-muted/80">
              SYS_VER 4.8 // READY
            </div>
          </div>

          {/* 3D Holographic Cyber Gyroscope / Tesseract */}
          <div className="relative w-48 h-48 sm:w-56 sm:h-56 flex items-center justify-center [perspective:1000px] mb-8">
            {/* Outer Orbit Ring with 3D Tilt */}
            <div className="absolute inset-0 rounded-full border border-dashed border-accent-cyan/70 dark:border-accent-cyan/40 animate-[spin-slow_12s_linear_infinite] [transform:rotateX(65deg)_rotateZ(45deg)]" />

            {/* Mid Orbit Ring with Counter-Rotation */}
            <div className="absolute inset-3 rounded-full border border-accent-amber/70 dark:border-accent-amber/40 animate-[spin-reverse_16s_linear_infinite] [transform:rotateY(65deg)_rotateZ(30deg)]" />

            {/* Third 3D Ring */}
            <div className="absolute inset-6 rounded-full border border-dashed border-accent-cyan/60 dark:border-accent-cyan/30 animate-[spin-slow_20s_linear_infinite] [transform:rotateX(45deg)_rotateY(45deg)]" />

            {/* Center 3D Wireframe Cube Core */}
            <div className="relative w-20 h-20 [transform-style:preserve-3d] animate-[spin-slow_8s_linear_infinite] flex items-center justify-center">
              {/* Glowing Core Laser Sphere */}
              <div className="w-10 h-10 rounded-full bg-accent-cyan/20 border-2 border-accent-cyan shadow-[0_0_24px_rgba(8,145,178,0.35)] dark:shadow-[0_0_24px_rgba(0,240,255,0.6)] animate-pulse flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-accent-cyan shadow-[0_0_10px_rgba(8,145,178,0.7)] dark:shadow-[0_0_12px_rgba(0,240,255,0.9)]" />
              </div>

              {/* 3D Wireframe Edges */}
              <div className="absolute inset-0 border border-accent-cyan/80 dark:border-accent-cyan/60 [transform:rotateX(45deg)]" />
              <div className="absolute inset-0 border border-accent-amber/80 dark:border-accent-amber/60 [transform:rotateY(45deg)]" />
            </div>

            {/* Reticle Corner Framing */}
            <div className="absolute -top-3 -left-3 w-3 h-3 border-t border-l border-accent-cyan pointer-events-none" />
            <div className="absolute -top-3 -right-3 w-3 h-3 border-t border-r border-accent-cyan pointer-events-none" />
            <div className="absolute -bottom-3 -left-3 w-3 h-3 border-b border-l border-accent-cyan pointer-events-none" />
            <div className="absolute -bottom-3 -right-3 w-3 h-3 border-b border-r border-accent-cyan pointer-events-none" />
          </div>

          {/* Progress Readout & Percent Counter */}
          <div className="w-full max-w-md flex flex-col items-center gap-3">
            <div className="w-full flex items-center justify-between text-xs font-mono">
              <span className="text-accent-cyan tracking-wider font-semibold truncate max-w-[280px]">
                {currentLog}
              </span>
              <span className="font-cyber font-bold text-accent-cyan text-sm tracking-wider">
                {progress}%
              </span>
            </div>

            {/* Cyberpunk Progress Bar */}
            <div className="w-full h-2 bg-secondary border border-border-subtle rounded-full overflow-hidden p-[1px]">
              <motion.div
                className="h-full bg-gradient-to-r from-accent-cyan via-accent-amber to-accent-cyan shadow-[0_0_12px_rgba(0,240,255,0.7)] rounded-full"
                style={{ width: `${progress}%` }}
                transition={{ ease: "easeOut", duration: 0.1 }}
              />
            </div>

            {/* System Status Indicators */}
            <div className="w-full flex justify-between text-[10px] font-mono text-muted/80 pt-1">
              <span>STATUS: ONLINE</span>
              <span>REGION: ASIA-PACIFIC</span>
              <span>LATENCY: 18ms</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
