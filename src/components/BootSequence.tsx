"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const bootLogs = [
  "INITIALIZING NEURAL KERNEL [BUILD_v4.8]...",
  "VERIFYING CRYPTOGRAPHIC HANDSHAKE...",
  "MOUNTING REPOSITORY SCHEMAS & DATABASE...",
  "SYNCING OPERATOR TELEMETRY // 0XRIYORU",
  "ESTABLISHING SECURE REALTIME WEBSOCKETS...",
  "SYSTEM MOUNTED. ACCESS GRANTED."
];

export default function BootSequence({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [logIndex, setLogIndex] = useState(0);

  useEffect(() => {
    // Early theme application to match system or stored preference immediately
    const savedTheme = localStorage.getItem("theme") || "auto";
    const root = document.documentElement;
    if (savedTheme === "light") {
      root.classList.add("light");
      root.classList.remove("dark");
    } else if (savedTheme === "dark") {
      root.classList.add("dark");
      root.classList.remove("light");
    } else {
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      if (isDark) {
        root.classList.add("dark");
        root.classList.remove("light");
      } else {
        root.classList.add("light");
        root.classList.remove("dark");
      }
    }

    // Smooth sequence (~2.2 seconds total)
    const timeline = [
      { p: 12, delay: 250, log: 0 },
      { p: 34, delay: 600, log: 1 },
      { p: 58, delay: 1050, log: 2 },
      { p: 78, delay: 1500, log: 3 },
      { p: 92, delay: 1850, log: 4 },
      { p: 100, delay: 2200, log: 5 },
    ];

    const timers: NodeJS.Timeout[] = [];

    timeline.forEach(({ p, delay, log }) => {
      const timer = setTimeout(() => {
        setProgress(p);
        setLogIndex(log);
        if (p === 100) {
          setTimeout(() => setLoading(false), 450);
        }
      }, delay);
      timers.push(timer);
    });

    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <>
      <AnimatePresence>
        {loading && (
          <motion.div
            key="boot-screen"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, filter: "blur(12px)", scale: 1.02 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-main text-primary font-mono overflow-hidden"
          >
            {/* Ambient Background Grid & Scanlines */}
            <div className="absolute inset-0 bg-scanlines bg-dot-grid opacity-60 pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-cyan/10 rounded-full blur-[140px] pointer-events-none" />

            {/* Central High-Tech Terminal Container */}
            <div className="relative z-10 w-full max-w-lg mx-6 p-6 sm:p-8 border border-border-subtle bg-secondary/95 cyber-card shadow-[0_0_60px_rgba(0,0,0,0.4)]">
              {/* Header Telemetry */}
              <div className="flex items-center justify-between border-b border-border-subtle pb-4 mb-6 text-xs text-muted">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-accent-cyan animate-pulse shadow-[0_0_10px_rgba(0,240,255,0.9)]" />
                  <span className="text-primary font-bold tracking-wider">NODE // 0XRIYORU</span>
                </div>
                <span className="text-[10px] text-accent-yellow font-bold tracking-widest px-2 py-0.5 border border-accent-yellow/30 bg-accent-yellow/10">
                  BOOT_SEQ // v4.8
                </span>
              </div>

              {/* Status & Progress Percentage */}
              <div className="flex justify-between items-end mb-2.5 text-xs font-mono">
                <span className="text-accent-cyan font-bold flex items-center gap-1.5 truncate max-w-[320px]">
                  <span>&gt;</span>
                  <span className="truncate">{bootLogs[logIndex]}</span>
                </span>
                <span className="text-primary font-bold text-base tracking-wider">{progress}%</span>
              </div>

              {/* Futuristic Cyber Progress Bar */}
              <div className="w-full h-2.5 bg-main border border-border-subtle p-0.5 overflow-hidden mb-6">
                <motion.div
                  className="h-full bg-accent-cyan shadow-[0_0_14px_rgba(0,240,255,0.9)]"
                  initial={{ width: "0%" }}
                  animate={{ width: `${progress}%` }}
                  transition={{ ease: "easeOut", duration: 0.3 }}
                />
              </div>

              {/* Telemetry Output Log Window */}
              <div className="space-y-1.5 bg-main/90 p-3.5 border border-border-subtle text-[11px] font-mono">
                {bootLogs.slice(0, logIndex + 1).map((log, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-2"
                  >
                    <span className="text-accent-cyan font-bold text-[10px]">[OK]</span>
                    <span
                      className={`truncate ${
                        i === logIndex ? "text-accent-yellow font-bold" : "text-muted"
                      }`}
                    >
                      {log}
                    </span>
                  </motion.div>
                ))}
              </div>

              <div className="mt-4 flex justify-between items-center text-[10px] text-muted font-mono">
                <span>SECURITY: ENCRYPTED</span>
                <span className="animate-pulse text-accent-pink">STANDBY...</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!loading && children}
    </>
  );
}
