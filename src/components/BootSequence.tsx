"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const matrixGrid = [
  ["BD", "E9", "1C", "BD", "BD"],
  ["1C", "1C", "BD", "BD", "55"],
  ["BD", "BD", "55", "BD", "BD"],
  ["1C", "55", "55", "E9", "BD"],
  ["55", "1C", "BD", "55", "55"],
];

const hackingSteps = [
  { row: 4, col: 0, val: "55", delay: 350 },
  { row: 4, col: 1, val: "1C", delay: 750 },
  { row: 3, col: 3, val: "E9", delay: 1200 },
  { row: 0, col: 3, val: "BD", delay: 1650 },
];

export default function BootSequence({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [buffer, setBuffer] = useState<string[]>([]);
  const [activeCell, setActiveCell] = useState<{ row: number; col: number } | null>(null);
  const [activeRow, setActiveRow] = useState<number | null>(0);
  const [activeCol, setActiveCol] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState("63.00");
  const [v1Uploaded, setV1Uploaded] = useState(false);
  const [v2Uploaded, setV2Uploaded] = useState(false);
  const [v3Uploaded, setV3Uploaded] = useState(false);
  const [breachSuccess, setBreachSuccess] = useState(false);

  useEffect(() => {
    // Early theme initialization
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

    const timers: NodeJS.Timeout[] = [];

    // Rapid countdown timer animation
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        const val = parseFloat(prev) - 0.42;
        if (val <= 0) {
          clearInterval(interval);
          return "00.00";
        }
        return val.toFixed(2);
      });
    }, 50);

    // Step 1: select 55
    timers.push(
      setTimeout(() => {
        setActiveRow(4);
        setActiveCell({ row: 4, col: 0 });
        setBuffer(["55"]);
      }, 350)
    );

    // Step 2: select 1C (completes V1)
    timers.push(
      setTimeout(() => {
        setActiveCol(1);
        setActiveCell({ row: 4, col: 1 });
        setBuffer(["55", "1C"]);
        setV1Uploaded(true);
      }, 800)
    );

    // Step 3: select E9
    timers.push(
      setTimeout(() => {
        setActiveRow(3);
        setActiveCol(null);
        setActiveCell({ row: 3, col: 3 });
        setBuffer(["55", "1C", "E9"]);
      }, 1250)
    );

    // Step 4: select BD (completes V2 & V3)
    timers.push(
      setTimeout(() => {
        setActiveRow(null);
        setActiveCol(3);
        setActiveCell({ row: 0, col: 3 });
        setBuffer(["55", "1C", "E9", "BD"]);
        setV2Uploaded(true);
        setV3Uploaded(true);
        setBreachSuccess(true);
      }, 1700)
    );

    // Fade out and grant access
    timers.push(
      setTimeout(() => {
        setLoading(false);
      }, 2350)
    );

    return () => {
      clearInterval(interval);
      timers.forEach(clearTimeout);
    };
  }, []);

  return (
    <>
      <AnimatePresence>
        {loading && (
          <motion.div
            key="breach-screen"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.03, filter: "blur(10px)" }}
            transition={{ duration: 0.45, ease: "easeInOut" }}
            className="fixed inset-0 z-[100000] flex items-center justify-center bg-[#070908] text-[#9FEF00] font-mono overflow-hidden select-none p-4 sm:p-8"
          >
            {/* Background Scanlines & CRT Distortion */}
            <div className="absolute inset-0 bg-scanlines opacity-50 pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(#9FEF00_0.8px,transparent_0.8px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

            {/* Main Cyberpunk Breach Protocol Frame */}
            <div className="relative z-10 w-full max-w-4xl border-2 border-[#9FEF00]/80 bg-[#090D09]/95 p-4 sm:p-6 shadow-[0_0_50px_rgba(159,239,0,0.25)]">
              {/* Top Header Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-[#9FEF00]/50 pb-3 mb-5 text-xs">
                <div className="flex items-center gap-3">
                  <span className="font-black text-sm tracking-widest bg-[#9FEF00] text-black px-2 py-0.5">
                    NET===TECH
                  </span>
                  <span className="text-[#9FEF00]/70 text-[11px] hidden sm:inline">
                    // NEURAL_DAEMON_INTERFACE
                  </span>
                </div>

                <div className="bg-[#9FEF00] text-black px-4 py-1 text-xs font-black tracking-wider uppercase shadow-[0_0_10px_rgba(159,239,0,0.5)]">
                  BREACH PROTOCOL INTERFACE
                </div>

                <div className="text-[10px] text-[#9FEF00]/60 tracking-widest hidden md:inline">
                  PROTOCOL 6120-AA4 // NODE_0XRIYORU
                </div>
              </div>

              {/* Upper HUD Row: Timer & Buffer */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 border-b border-[#9FEF00]/30 pb-5">
                {/* Breach Time Remaining */}
                <div className="border border-[#9FEF00]/40 bg-black/50 p-3.5 flex flex-col justify-between">
                  <span className="text-[10px] tracking-wider text-[#9FEF00]/70 uppercase">
                    BREACH TIME REMAINING
                  </span>
                  <div className="text-2xl sm:text-3xl font-black tracking-widest text-[#9FEF00] mt-1 font-mono">
                    {timeLeft}
                  </div>
                </div>

                {/* Buffer Slots */}
                <div className="md:col-span-2 border border-[#9FEF00]/40 bg-black/50 p-3.5">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[10px] tracking-wider text-[#9FEF00]/70 uppercase">
                      BUFFER MEMORY
                    </span>
                    <span className="text-[10px] text-[#9FEF00]/60">CAPACITY: 6 BYTES</span>
                  </div>
                  <div className="flex gap-2">
                    {[0, 1, 2, 3, 4, 5].map((idx) => {
                      const val = buffer[idx];
                      return (
                        <div
                          key={idx}
                          className={`w-10 h-10 sm:w-11 sm:h-11 border flex items-center justify-center font-bold text-sm sm:text-base font-mono transition-all ${
                            val
                              ? "border-[#9FEF00] bg-[#9FEF00] text-black shadow-[0_0_10px_rgba(159,239,0,0.6)]"
                              : "border-[#9FEF00]/30 text-[#9FEF00]/20 bg-black/40"
                          }`}
                        >
                          {val || "--"}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Lower Section: Code Matrix & Sequence Required */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left: Code Matrix */}
                <div className="border border-[#9FEF00]/40 bg-black/60 p-4">
                  <div className="flex justify-between items-center mb-3 text-xs border-b border-[#9FEF00]/30 pb-2">
                    <span className="font-bold uppercase tracking-wider text-[#9FEF00]">
                      CODE MATRIX
                    </span>
                    <span className="text-[10px] text-[#9FEF00]/60">5x5 GRID</span>
                  </div>

                  <div className="grid grid-rows-5 gap-2 font-mono text-sm sm:text-base font-bold">
                    {matrixGrid.map((rowArr, rIdx) => {
                      const isRowHighlight = activeRow === rIdx;
                      return (
                        <div
                          key={rIdx}
                          className={`grid grid-cols-5 gap-2 p-1 transition-colors ${
                            isRowHighlight ? "bg-[#9FEF00]/15" : ""
                          }`}
                        >
                          {rowArr.map((byte, cIdx) => {
                            const isCellActive =
                              activeCell?.row === rIdx && activeCell?.col === cIdx;
                            const isColHighlight = activeCol === cIdx;

                            return (
                              <div
                                key={cIdx}
                                className={`h-8 sm:h-9 flex items-center justify-center border transition-all ${
                                  isCellActive
                                    ? "border-[#00F0FF] bg-[#00F0FF] text-black font-black shadow-[0_0_12px_#00F0FF] scale-105"
                                    : isColHighlight
                                    ? "border-[#9FEF00] bg-[#9FEF00]/20 text-[#9FEF00]"
                                    : "border-transparent text-[#9FEF00]/80 hover:text-[#9FEF00]"
                                }`}
                              >
                                {byte}
                              </div>
                            );
                          })}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Right: Sequence Required to Upload */}
                <div className="border border-[#9FEF00]/40 bg-black/60 p-4 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-center mb-4 text-xs border-b border-[#9FEF00]/30 pb-2">
                      <span className="font-bold uppercase tracking-wider text-[#9FEF00]">
                        SEQUENCE REQUIRED TO UPLOAD
                      </span>
                      <span className="text-[10px] text-[#9FEF00]/60">DAEMONS: 3</span>
                    </div>

                    <div className="space-y-3 font-mono text-xs">
                      {/* Daemon V1 */}
                      <div
                        className={`p-2.5 border transition-all flex items-center justify-between ${
                          v1Uploaded
                            ? "border-[#9FEF00] bg-[#9FEF00]/15 shadow-[0_0_10px_rgba(159,239,0,0.3)]"
                            : "border-[#9FEF00]/30 bg-black/40"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-bold tracking-wider">55 1C</span>
                          <span className="text-[10px] text-[#9FEF00]/70">DATAMINE_V1 (BASIC)</span>
                        </div>
                        <span className={`text-[10px] font-bold ${v1Uploaded ? "text-[#9FEF00]" : "text-[#9FEF00]/40"}`}>
                          {v1Uploaded ? "[INSTALLED]" : "[PENDING]"}
                        </span>
                      </div>

                      {/* Daemon V2 */}
                      <div
                        className={`p-2.5 border transition-all flex items-center justify-between ${
                          v2Uploaded
                            ? "border-[#9FEF00] bg-[#9FEF00]/15 shadow-[0_0_10px_rgba(159,239,0,0.3)]"
                            : "border-[#9FEF00]/30 bg-black/40"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-bold tracking-wider">1C E9 BD</span>
                          <span className="text-[10px] text-[#9FEF00]/70">DATAMINE_V2 (ADVANCED)</span>
                        </div>
                        <span className={`text-[10px] font-bold ${v2Uploaded ? "text-[#9FEF00]" : "text-[#9FEF00]/40"}`}>
                          {v2Uploaded ? "[INSTALLED]" : "[PENDING]"}
                        </span>
                      </div>

                      {/* Daemon V3 */}
                      <div
                        className={`p-2.5 border transition-all flex items-center justify-between ${
                          v3Uploaded
                            ? "border-[#9FEF00] bg-[#9FEF00]/15 shadow-[0_0_10px_rgba(159,239,0,0.3)]"
                            : "border-[#9FEF00]/30 bg-black/40"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-bold tracking-wider">BD BD 55</span>
                          <span className="text-[10px] text-[#9FEF00]/70">DATAMINE_V3 (ROOT_ACCESS)</span>
                        </div>
                        <span className={`text-[10px] font-bold ${v3Uploaded ? "text-[#9FEF00]" : "text-[#9FEF00]/40"}`}>
                          {v3Uploaded ? "[INSTALLED]" : "[PENDING]"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Status Banner */}
                  <div className="mt-4 pt-3 border-t border-[#9FEF00]/30 text-center font-mono">
                    {breachSuccess ? (
                      <div className="text-xs sm:text-sm font-black text-[#00F0FF] tracking-wider animate-pulse flex items-center justify-center gap-2">
                        <span>●</span>
                        <span>BREACH SUCCESSFUL // CONNECTING TO NODE_0XRIYORU...</span>
                      </div>
                    ) : (
                      <div className="text-[11px] text-[#9FEF00]/70 tracking-wider">
                        BYPASSING ICE & DECRYPTING PORTFOLIO SCHEMAS...
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!loading && children}
    </>
  );
}
