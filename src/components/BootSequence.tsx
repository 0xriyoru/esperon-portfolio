"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const HEX_POOL = ["1C", "55", "BD", "E9", "7A"];

interface PathStep {
  row: number;
  col: number;
  val: string;
  isRowMove: boolean;
}

interface Daemon {
  name: string;
  sequence: string[];
  type: string;
  uploaded: boolean;
}

type SequencePhase = "PROMPT" | "MATRIX_GAME" | "DONE";

function generateSolvableBreach() {
  const size = 5;
  const grid: string[][] = Array.from({ length: size }, () => Array(size).fill(""));

  const path: PathStep[] = [];
  const startRow = 0;
  const col0 = Math.floor(Math.random() * size);
  const val0 = HEX_POOL[Math.floor(Math.random() * HEX_POOL.length)];
  grid[startRow][col0] = val0;
  path.push({ row: startRow, col: col0, val: val0, isRowMove: true });

  let row1 = Math.floor(Math.random() * size);
  while (row1 === startRow) row1 = Math.floor(Math.random() * size);
  const val1 = HEX_POOL[Math.floor(Math.random() * HEX_POOL.length)];
  grid[row1][col0] = val1;
  path.push({ row: row1, col: col0, val: val1, isRowMove: false });

  let col1 = Math.floor(Math.random() * size);
  while (col1 === col0) col1 = Math.floor(Math.random() * size);
  const val2 = HEX_POOL[Math.floor(Math.random() * HEX_POOL.length)];
  grid[row1][col1] = val2;
  path.push({ row: row1, col: col1, val: val2, isRowMove: true });

  let row2 = Math.floor(Math.random() * size);
  while (row2 === row1) row2 = Math.floor(Math.random() * size);
  const val3 = HEX_POOL[Math.floor(Math.random() * HEX_POOL.length)];
  grid[row2][col1] = val3;
  path.push({ row: row2, col: col1, val: val3, isRowMove: false });

  let col2 = Math.floor(Math.random() * size);
  while (col2 === col1) col2 = Math.floor(Math.random() * size);
  const val4 = HEX_POOL[Math.floor(Math.random() * HEX_POOL.length)];
  grid[row2][col2] = val4;
  path.push({ row: row2, col: col2, val: val4, isRowMove: true });

  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (!grid[r][c]) {
        grid[r][c] = HEX_POOL[Math.floor(Math.random() * HEX_POOL.length)];
      }
    }
  }

  const daemons: Daemon[] = [
    {
      name: "DATAMINE_V1",
      type: "BASIC",
      sequence: [val0, val1],
      uploaded: false,
    },
    {
      name: "DATAMINE_V2",
      type: "ADVANCED",
      sequence: [val1, val2, val3],
      uploaded: false,
    },
    {
      name: "DATAMINE_V3",
      type: "ROOT_ACCESS",
      sequence: [val2, val3, val4],
      uploaded: false,
    },
  ];

  return { grid, path, daemons };
}

// Ultra-reliable Web Audio API Buffer Engine (0ms latency, unlimited polyphony, persistent across refreshes)
class CyberpunkAudioEngine {
  public ctx: AudioContext | null = null;
  public enabled: boolean = true;
  private buffers: Map<string, AudioBuffer> = new Map();
  private customMp3: HTMLAudioElement | null = null;

  constructor() {
    if (typeof window !== "undefined") {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();

      // Check if user has breach.mp3
      fetch("/sounds/breach.mp3", { method: "HEAD" })
        .then((res) => {
          if (res.ok) this.customMp3 = new Audio("/sounds/breach.mp3");
        })
        .catch(() => {});

      // Decode all .wav assets into fast AudioBuffers
      const soundNames = ["breach_start", "byte_select", "daemon_upload", "breach_success", "error"];
      soundNames.forEach(async (name) => {
        try {
          const res = await fetch(`/sounds/${name}.wav`);
          if (res.ok) {
            const arrayBuf = await res.arrayBuffer();
            if (this.ctx) {
              const audioBuf = await this.ctx.decodeAudioData(arrayBuf);
              this.buffers.set(name, audioBuf);
            }
          }
        } catch {
          // Fallback to oscillator synthesis if needed
        }
      });

      // Auto-unlock on user interaction
      const unlock = () => {
        if (this.ctx && this.ctx.state === "suspended") {
          this.ctx.resume().catch(() => {});
        }
      };

      window.addEventListener("pointerdown", unlock, { passive: true });
      window.addEventListener("keydown", unlock, { passive: true });
      window.addEventListener("click", unlock, { passive: true });
    }
  }

  public unlock() {
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume().catch(() => {});
    }
  }

  private playBuffer(name: string, pitch = 1.0, volume = 0.5) {
    if (!this.enabled) return;
    this.unlock();

    if (!this.ctx) return;

    const buffer = this.buffers.get(name);
    if (buffer) {
      // Fast Web Audio Buffer Source
      const source = this.ctx.createBufferSource();
      const gain = this.ctx.createGain();

      source.buffer = buffer;
      source.playbackRate.value = pitch;
      gain.gain.value = volume;

      source.connect(gain);
      gain.connect(this.ctx.destination);

      source.start(0);
    } else {
      // Procedural oscillator synthesis fallback
      this.synthFallback(name, pitch, volume);
    }
  }

  private synthFallback(name: string, pitch = 1.0, volume = 0.5) {
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      if (name === "byte_select") {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(1400 * pitch, now);
        osc.frequency.exponentialRampToValueAtTime(700 * pitch, now + 0.05);
        gain.gain.setValueAtTime(volume * 0.4, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.06);
      } else if (name === "error") {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(120, now);
        gain.gain.setValueAtTime(volume * 0.4, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.12);
      }
    } catch {}
  }

  playStart() {
    if (!this.enabled) return;
    if (this.customMp3) {
      this.customMp3.currentTime = 0;
      this.customMp3.play().catch(() => {});
      return;
    }
    this.playBuffer("breach_start", 1.0, 0.5);
  }

  playSelect() {
    this.playBuffer("byte_select", 1.1, 0.4);
  }

  playByteSelect(pitch = 1.0) {
    if (this.customMp3) return;
    this.playBuffer("byte_select", pitch, 0.7);
  }

  playError() {
    if (this.customMp3) return;
    this.playBuffer("error", 1.0, 0.6);
  }

  playDaemonInstalled() {
    if (this.customMp3) return;
    this.playBuffer("daemon_upload", 1.0, 0.7);
  }

  playBreachSuccess() {
    if (this.customMp3) return;
    this.playBuffer("breach_success", 1.0, 0.8);
  }
}

export default function BootSequence({ children }: { children: React.ReactNode }) {
  const [phase, setPhase] = useState<SequencePhase>("PROMPT");
  const [mode, setMode] = useState<"MANUAL" | "AUTO">("MANUAL");

  const [gridData, setGridData] = useState<string[][]>([]);
  const [daemons, setDaemons] = useState<Daemon[]>([]);
  const [solutionPath, setSolutionPath] = useState<PathStep[]>([]);
  const [buffer, setBuffer] = useState<string[]>([]);
  const [usedCoords, setUsedCoords] = useState<string[]>([]);
  const [activeCell, setActiveCell] = useState<{ row: number; col: number } | null>(null);
  const [activeRow, setActiveRow] = useState<number | null>(0);
  const [activeCol, setActiveCol] = useState<number | null>(null);
  const [isRowMove, setIsRowMove] = useState(true);
  const [timeLeft, setTimeLeft] = useState(60.0);
  const [breachSuccess, setBreachSuccess] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(true);

  const audioRef = useRef<CyberpunkAudioEngine | null>(null);
  const autoSolverTimers = useRef<NodeJS.Timeout[]>([]);

  const setupPuzzle = () => {
    autoSolverTimers.current.forEach(clearTimeout);
    autoSolverTimers.current = [];

    const puzzle = generateSolvableBreach();
    setGridData(puzzle.grid);
    setDaemons(puzzle.daemons);
    setSolutionPath(puzzle.path);
    setBuffer([]);
    setUsedCoords([]);
    setActiveCell(null);
    setActiveRow(0);
    setActiveCol(null);
    setIsRowMove(true);
    setTimeLeft(60.0);
    setBreachSuccess(false);
  };

  useEffect(() => {
    audioRef.current = new CyberpunkAudioEngine();
    setupPuzzle();

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

    const timerInterval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0.1) {
          clearInterval(timerInterval);
          return 0;
        }
        return parseFloat((prev - 0.1).toFixed(1));
      });
    }, 100);

    return () => {
      clearInterval(timerInterval);
      autoSolverTimers.current.forEach(clearTimeout);
    };
  }, []);

  // Choice 1: Launch Playable Minigame
  const handleStartMinigame = () => {
    audioRef.current?.playSelect();
    audioRef.current?.playStart();
    setMode("MANUAL");
    setPhase("MATRIX_GAME");
  };

  // Choice 2: Launch Neural Auto-Solver
  const handleStartAutoSolve = () => {
    audioRef.current?.playSelect();
    audioRef.current?.playStart();
    setMode("AUTO");
    setPhase("MATRIX_GAME");

    const currentBuf: string[] = [];
    const currentUsed: string[] = [];

    solutionPath.forEach((step, idx) => {
      autoSolverTimers.current.push(
        setTimeout(() => {
          if (step.isRowMove) {
            setIsRowMove(true);
            setActiveRow(step.row);
            setActiveCol(null);
          } else {
            setIsRowMove(false);
            setActiveRow(null);
            setActiveCol(step.col);
          }

          setActiveCell({ row: step.row, col: step.col });
          currentBuf.push(step.val);
          currentUsed.push(`${step.row},${step.col}`);
          setBuffer([...currentBuf]);
          setUsedCoords([...currentUsed]);

          const pitch = 0.9 + idx * 0.12;
          audioRef.current?.playByteSelect(pitch);
          checkDaemons(currentBuf);

          if (idx === solutionPath.length - 1) {
            setBreachSuccess(true);
            audioRef.current?.playBreachSuccess();
            setTimeout(() => setPhase("DONE"), 900);
          }
        }, idx * 420)
      );
    });
  };

  // Choice 3: Direct Instant Access
  const handleDirectAccess = () => {
    audioRef.current?.playSelect();
    setPhase("DONE");
  };

  const checkDaemons = (newBuffer: string[]) => {
    setDaemons((prevDaemons) => {
      const updated = prevDaemons.map((d) => {
        if (d.uploaded) return d;
        const seqStr = d.sequence.join(",");
        const bufStr = newBuffer.join(",");
        if (bufStr.includes(seqStr)) {
          audioRef.current?.playDaemonInstalled();
          return { ...d, uploaded: true };
        }
        return d;
      });

      const completedCount = updated.filter((d) => d.uploaded).length;
      if (completedCount === updated.length && !breachSuccess) {
        setBreachSuccess(true);
        audioRef.current?.playBreachSuccess();
        setTimeout(() => setPhase("DONE"), 900);
      }

      return updated;
    });
  };

  // Interactive Click on Matrix Cell
  const handleCellClick = (r: number, c: number, byte: string) => {
    if (breachSuccess || buffer.length >= 6) return;

    const coordKey = `${r},${c}`;
    if (usedCoords.includes(coordKey)) {
      audioRef.current?.playError();
      return;
    }

    if (isRowMove) {
      if (r !== activeRow) {
        audioRef.current?.playError();
        return;
      }
    } else {
      if (c !== activeCol) {
        audioRef.current?.playError();
        return;
      }
    }

    // Valid move!
    const newBuffer = [...buffer, byte];
    const newUsed = [...usedCoords, coordKey];
    setBuffer(newBuffer);
    setUsedCoords(newUsed);
    setActiveCell({ row: r, col: c });

    const pitch = 0.9 + newBuffer.length * 0.12;
    audioRef.current?.playByteSelect(pitch);

    checkDaemons(newBuffer);

    // Switch axis to alternating Cyberpunk rule
    if (isRowMove) {
      setIsRowMove(false);
      setActiveRow(null);
      setActiveCol(c);
    } else {
      setIsRowMove(true);
      setActiveRow(r);
      setActiveCol(null);
    }
  };

  const toggleAudio = (e: React.MouseEvent) => {
    e.stopPropagation();
    const next = !audioEnabled;
    setAudioEnabled(next);
    if (audioRef.current) {
      audioRef.current.enabled = next;
      if (next) audioRef.current.unlock();
    }
  };

  return (
    <>
      <AnimatePresence>
        {phase !== "DONE" && (
          <motion.div
            key="breach-container"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.03, filter: "blur(10px)" }}
            transition={{ duration: 0.45, ease: "easeInOut" }}
            className="fixed inset-0 z-[100000] flex items-center justify-center bg-[#070908] text-[#9FEF00] font-mono overflow-hidden select-none p-4 sm:p-8"
          >
            {/* Background Scanlines & CRT Distortion */}
            <div className="absolute inset-0 bg-scanlines opacity-50 pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(#9FEF00_0.8px,transparent_0.8px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

            {/* PHASE 1: ACCESS PROTOCOL DECISION SCREEN */}
            {phase === "PROMPT" && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative z-10 w-full max-w-2xl border-2 border-[#9FEF00]/80 bg-[#090D09]/95 p-6 sm:p-8 shadow-[0_0_50px_rgba(159,239,0,0.25)]"
              >
                {/* Header */}
                <div className="flex justify-between items-center border-b-2 border-[#9FEF00]/50 pb-3 mb-6">
                  <div className="flex items-center gap-2.5">
                    <span className="font-black text-sm bg-[#9FEF00] text-black px-2 py-0.5">
                      NET===TECH
                    </span>
                    <span className="text-xs text-[#9FEF00]/70">// GATEWAY_INITIALIZER</span>
                  </div>
                  <button
                    onClick={toggleAudio}
                    className="text-[10px] border border-[#9FEF00]/40 px-2 py-0.5 hover:bg-[#9FEF00]/20"
                  >
                    {audioEnabled ? "AUDIO [ON]" : "AUDIO [MUTE]"}
                  </button>
                </div>

                {/* Telemetry Target Info */}
                <div className="space-y-1 mb-8 text-xs bg-black/60 border border-[#9FEF00]/30 p-4">
                  <div className="flex justify-between">
                    <span className="text-[#9FEF00]/60">TARGET NODE:</span>
                    <span className="font-bold text-white">RHODGE ESPERON // 0XRIYORU</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#9FEF00]/60">ICE FIREWALL:</span>
                    <span className="font-bold text-[#00F0FF]">CYBERPUNK 2077 MATRIX v4.2</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#9FEF00]/60">STATUS:</span>
                    <span className="font-bold text-accent-yellow animate-pulse">ICE LOCKED</span>
                  </div>
                </div>

                {/* Question & Choices */}
                <div className="mb-6">
                  <div className="text-xs font-bold uppercase tracking-widest text-[#9FEF00] mb-4">
                    &gt; SELECT ACCESS PROTOCOL:
                  </div>

                  <div className="space-y-3">
                    {/* Choice 1: Play Minigame */}
                    <button
                      onClick={handleStartMinigame}
                      className="w-full text-left p-4 border border-[#9FEF00]/60 bg-black/40 hover:bg-[#9FEF00] hover:text-black group transition-all duration-150 flex flex-col sm:flex-row sm:items-center justify-between gap-2 shadow-[0_0_12px_rgba(159,239,0,0.15)]"
                    >
                      <div>
                        <div className="font-bold text-sm tracking-wider flex items-center gap-2">
                          <span className="text-[#00F0FF] group-hover:text-black">[01]</span>
                          <span>MANUAL ICE BREACH (PLAY MINIGAME)</span>
                        </div>
                        <p className="text-[11px] text-[#9FEF00]/70 group-hover:text-black/80 mt-1">
                          Solve the 5x5 Cyberpunk Breach Protocol puzzle yourself with alternating row/column moves.
                        </p>
                      </div>
                      <span className="text-xs font-bold shrink-0 text-[#00F0FF] group-hover:text-black">
                        START HACK ↗
                      </span>
                    </button>

                    {/* Choice 2: Neural Auto-Daemon Override */}
                    <button
                      onClick={handleStartAutoSolve}
                      className="w-full text-left p-4 border border-[#9FEF00]/40 bg-black/40 hover:bg-[#9FEF00]/20 group transition-all duration-150 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                    >
                      <div>
                        <div className="font-bold text-sm tracking-wider flex items-center gap-2">
                          <span className="text-accent-yellow">[02]</span>
                          <span>NEURAL AUTO-SOLVE & PROCEED</span>
                        </div>
                        <p className="text-[11px] text-[#9FEF00]/70 mt-1">
                          Watch the algorithmic solver crack the randomized puzzle live (~2.2s cinematic hack).
                        </p>
                      </div>
                      <span className="text-xs font-bold shrink-0 text-accent-yellow">
                        AUTO HACK ↗
                      </span>
                    </button>

                    {/* Choice 3: Direct Instant Entry */}
                    <button
                      onClick={handleDirectAccess}
                      className="w-full text-left p-3.5 border border-border-subtle bg-black/20 hover:border-accent-cyan hover:text-accent-cyan group transition-colors flex items-center justify-between text-xs"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-muted">[03]</span>
                        <span>DIRECT ICE-BYPASS (INSTANT ACCESS)</span>
                      </div>
                      <span className="text-muted group-hover:text-accent-cyan">SKIP INTRO →</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* PHASE 2: MATRIX HACKING INTERFACE */}
            {phase === "MATRIX_GAME" && (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative z-10 w-full max-w-4xl border-2 border-[#9FEF00]/80 bg-[#090D09]/95 p-4 sm:p-6 shadow-[0_0_50px_rgba(159,239,0,0.25)]"
              >
                {/* Top Header Bar */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-[#9FEF00]/50 pb-3 mb-5 text-xs">
                  <div className="flex items-center gap-3">
                    <span className="font-black text-sm tracking-widest bg-[#9FEF00] text-black px-2 py-0.5">
                      NET===TECH
                    </span>
                    <span className="text-[#9FEF00]/80 text-[11px] font-bold">
                      {mode === "MANUAL" ? "[MANUAL HACK IN PROGRESS]" : "[AUTO-DAEMON SOLVER]"}
                    </span>
                  </div>

                  <div className="bg-[#9FEF00] text-black px-4 py-1 text-xs font-black tracking-wider uppercase shadow-[0_0_10px_rgba(159,239,0,0.5)]">
                    BREACH PROTOCOL INTERFACE
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    {mode === "MANUAL" && (
                      <button
                        onClick={handleStartAutoSolve}
                        className="text-[10px] text-black bg-[#9FEF00] font-bold px-2 py-0.5 hover:bg-white transition-colors"
                      >
                        AUTO SOLVE
                      </button>
                    )}
                    <button
                      onClick={setupPuzzle}
                      className="text-[10px] text-[#9FEF00] border border-[#9FEF00]/40 px-2 py-0.5 hover:bg-[#9FEF00]/20 transition-colors"
                    >
                      RESET
                    </button>
                    <button
                      onClick={toggleAudio}
                      className="text-[10px] text-[#9FEF00] border border-[#9FEF00]/40 px-2 py-0.5 hover:bg-[#9FEF00]/20 transition-colors"
                    >
                      {audioEnabled ? "AUDIO [ON]" : "AUDIO [MUTE]"}
                    </button>
                    <button
                      onClick={handleDirectAccess}
                      className="text-[10px] text-accent-cyan border border-accent-cyan/50 px-2 py-0.5 hover:bg-accent-cyan/20 font-bold"
                    >
                      [SKIP]
                    </button>
                  </div>
                </div>

                {/* Upper HUD Row: Timer & Buffer */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 border-b border-[#9FEF00]/30 pb-5">
                  <div className="border border-[#9FEF00]/40 bg-black/50 p-3.5 flex flex-col justify-between">
                    <span className="text-[10px] tracking-wider text-[#9FEF00]/70 uppercase">
                      BREACH TIME REMAINING
                    </span>
                    <div className="text-2xl sm:text-3xl font-black tracking-widest text-[#9FEF00] mt-1 font-mono">
                      {timeLeft.toFixed(2)}s
                    </div>
                  </div>

                  <div className="md:col-span-2 border border-[#9FEF00]/40 bg-black/50 p-3.5">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[10px] tracking-wider text-[#9FEF00]/70 uppercase">
                        BUFFER MEMORY ({buffer.length}/6)
                      </span>
                      <span className="text-[10px] text-[#9FEF00]/60">
                        {isRowMove ? "SELECT FROM ACTIVE ROW" : "SELECT FROM ACTIVE COLUMN"}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      {[0, 1, 2, 3, 4, 5].map((idx) => {
                        const val = buffer[idx];
                        return (
                          <div
                            key={idx}
                            className={`w-10 h-10 sm:w-11 sm:h-11 border flex items-center justify-center font-bold text-sm sm:text-base font-mono transition-all ${
                              val
                                ? "border-[#9FEF00] bg-[#9FEF00] text-black shadow-[0_0_10px_rgba(159,239,0,0.6)] scale-105"
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
                      <span className="text-[10px] text-accent-cyan tracking-wider">
                        {isRowMove
                          ? `ACTIVE ROW: ${activeRow !== null ? activeRow + 1 : "-"}`
                          : `ACTIVE COL: ${activeCol !== null ? activeCol + 1 : "-"}`}
                      </span>
                    </div>

                    <div className="grid grid-rows-5 gap-2 font-mono text-sm sm:text-base font-bold">
                      {gridData.map((rowArr, rIdx) => {
                        const isRowHighlight = activeRow === rIdx;
                        return (
                          <div
                            key={rIdx}
                            className={`grid grid-cols-5 gap-2 p-1 transition-colors rounded ${
                              isRowHighlight ? "bg-[#9FEF00]/15 border-l-2 border-r-2 border-[#9FEF00]/60" : ""
                            }`}
                          >
                            {rowArr.map((byte, cIdx) => {
                              const isCellActive =
                                activeCell?.row === rIdx && activeCell?.col === cIdx;
                              const isColHighlight = activeCol === cIdx;
                              const isUsed = usedCoords.includes(`${rIdx},${cIdx}`);
                              const isClickable =
                                mode === "MANUAL" &&
                                !isUsed &&
                                ((isRowMove && rIdx === activeRow) ||
                                  (!isRowMove && cIdx === activeCol));

                              return (
                                <button
                                  key={cIdx}
                                  onClick={() => handleCellClick(rIdx, cIdx, byte)}
                                  disabled={!isClickable}
                                  className={`h-8 sm:h-9 flex items-center justify-center border font-mono transition-all select-none ${
                                    isCellActive
                                      ? "border-[#00F0FF] bg-[#00F0FF] text-black font-black shadow-[0_0_12px_#00F0FF] scale-105"
                                      : isUsed
                                      ? "border-transparent text-[#9FEF00]/20 opacity-30 cursor-not-allowed"
                                      : isClickable
                                      ? "border-[#9FEF00]/50 text-[#9FEF00] hover:bg-[#9FEF00] hover:text-black hover:scale-105 cursor-pointer shadow-[0_0_8px_rgba(159,239,0,0.4)]"
                                      : isColHighlight
                                      ? "border-[#9FEF00]/20 bg-[#9FEF00]/5 text-[#9FEF00]/40 cursor-not-allowed"
                                      : "border-transparent text-[#9FEF00]/40 cursor-not-allowed"
                                  }`}
                                >
                                  {isUsed ? "[--]" : byte}
                                </button>
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
                        <span className="text-[10px] text-[#9FEF00]/60">
                          {daemons.filter((d) => d.uploaded).length}/{daemons.length} INSTALLED
                        </span>
                      </div>

                      <div className="space-y-3 font-mono text-xs">
                        {daemons.map((d, idx) => (
                          <div
                            key={idx}
                            className={`p-2.5 border transition-all flex items-center justify-between ${
                              d.uploaded
                                ? "border-[#9FEF00] bg-[#9FEF00]/15 shadow-[0_0_10px_rgba(159,239,0,0.4)]"
                                : "border-[#9FEF00]/30 bg-black/40"
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <span className="text-sm font-bold tracking-wider">
                                {d.sequence.join(" ")}
                              </span>
                              <span className="text-[10px] text-[#9FEF00]/70">
                                {d.name} ({d.type})
                              </span>
                            </div>
                            <span
                              className={`text-[10px] font-bold ${
                                d.uploaded ? "text-[#9FEF00] animate-pulse" : "text-[#9FEF00]/40"
                              }`}
                            >
                              {d.uploaded ? "[INSTALLED]" : "[PENDING]"}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Status Banner */}
                    <div className="mt-4 pt-3 border-t border-[#9FEF00]/30 text-center font-mono">
                      {breachSuccess ? (
                        <div className="text-xs sm:text-sm font-black text-[#00F0FF] tracking-wider animate-pulse flex items-center justify-center gap-2">
                          <span>●</span>
                          <span>BREACH SUCCESSFUL // CONNECTING TO NODE_0XRIYORU...</span>
                        </div>
                      ) : buffer.length >= 6 ? (
                        <div className="flex items-center justify-center gap-3">
                          <span className="text-xs text-accent-pink font-bold">BUFFER FULL</span>
                          <button
                            onClick={setupPuzzle}
                            className="text-xs text-black bg-[#9FEF00] px-2 py-0.5 font-bold hover:bg-white"
                          >
                            RETRY
                          </button>
                          <button
                            onClick={handleDirectAccess}
                            className="text-xs text-accent-cyan border border-accent-cyan px-2 py-0.5"
                          >
                            ENTER ANYWAY
                          </button>
                        </div>
                      ) : (
                        <div className="text-[11px] text-[#9FEF00]/80 tracking-wider">
                          {mode === "MANUAL"
                            ? isRowMove
                              ? `> SELECT BYTE ALONG ROW ${(activeRow !== null ? activeRow + 1 : 1)}`
                              : `> SELECT BYTE ALONG COL ${(activeCol !== null ? activeCol + 1 : 1)}`
                            : "> NEURAL DAEMON AUTO-SOLVING PATH..."}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {phase === "DONE" && children}
    </>
  );
}
