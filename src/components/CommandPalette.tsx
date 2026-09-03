"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CommandItem {
  id: string;
  category: "NAVIGATION" | "ACTIONS" | "THEME";
  label: string;
  detail?: string;
  shortcut?: string;
  action: () => void;
}

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copiedNotification, setCopiedNotification] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const navigateTo = (sectionId: string) => {
    setIsOpen(false);
    const mainEl = document.querySelector("main");
    const target = document.getElementById(sectionId);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
      window.history.pushState(null, "", `#${sectionId}`);
    } else if (mainEl) {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const copyEmail = () => {
    navigator.clipboard.writeText("rhodgesperon@gmail.com");
    setCopiedNotification(true);
    setTimeout(() => {
      setCopiedNotification(false);
      setIsOpen(false);
    }, 1200);
  };

  const setTheme = (mode: "auto" | "light" | "dark") => {
    localStorage.setItem("theme", mode);
    const root = document.documentElement;
    if (mode === "auto") {
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      root.classList.toggle("dark", isDark);
      root.classList.toggle("light", !isDark);
    } else {
      root.classList.toggle("dark", mode === "dark");
      root.classList.toggle("light", mode === "light");
    }
    window.dispatchEvent(new Event("theme-change"));
    setIsOpen(false);
  };

  const relaunchBreach = () => {
    sessionStorage.removeItem("portfolio_boot_seen");
    window.dispatchEvent(new CustomEvent("portfolio:reboot"));
    setIsOpen(false);
  };

  const commands: CommandItem[] = [
    // Navigation
    {
      id: "nav-profile",
      category: "NAVIGATION",
      label: "Jump to Profile // 01",
      detail: "Operator Bio & Core Capabilities",
      shortcut: "G P",
      action: () => navigateTo("profile"),
    },
    {
      id: "nav-projects",
      category: "NAVIGATION",
      label: "Jump to Projects // 02",
      detail: "Mekai, SBMA-JO, Rebeat, ArtNest & more",
      shortcut: "G J",
      action: () => navigateTo("projects"),
    },
    {
      id: "nav-skills",
      category: "NAVIGATION",
      label: "Jump to Technical Inventory // 03",
      detail: "Front-End, Back-End, AI Agents & Tooling",
      shortcut: "G S",
      action: () => navigateTo("skills"),
    },
    {
      id: "nav-credentials",
      category: "NAVIGATION",
      label: "Jump to Experience & Seminars // 04",
      detail: "SBMA Internship, Certifications & Hackathons",
      shortcut: "G C",
      action: () => navigateTo("credentials"),
    },
    {
      id: "nav-activity",
      category: "NAVIGATION",
      label: "Jump to GitHub Transmission // 05",
      detail: "Live commit activity telemetry",
      shortcut: "G A",
      action: () => navigateTo("activity"),
    },
    {
      id: "nav-contact",
      category: "NAVIGATION",
      label: "Jump to Contact // 06",
      detail: "Initialize transmission with operator",
      shortcut: "G M",
      action: () => navigateTo("contact"),
    },

    // Actions
    {
      id: "act-cv",
      category: "ACTIONS",
      label: "Open CV / Resume Dossier",
      detail: "Full technical resume & credentials (cv.html)",
      shortcut: "CV",
      action: () => {
        window.open("/cv.html", "_blank");
        setIsOpen(false);
      },
    },
    {
      id: "act-email",
      category: "ACTIONS",
      label: "Copy Operator Email",
      detail: "rhodgesperon@gmail.com",
      shortcut: "COPY",
      action: copyEmail,
    },
    {
      id: "act-github",
      category: "ACTIONS",
      label: "Open GitHub Profile",
      detail: "https://github.com/0xriyoru",
      action: () => {
        window.open("https://github.com/0xriyoru", "_blank");
        setIsOpen(false);
      },
    },
    {
      id: "act-linkedin",
      category: "ACTIONS",
      label: "Open LinkedIn Profile",
      detail: "https://www.linkedin.com/in/rhodge-esperon",
      action: () => {
        window.open("https://www.linkedin.com/in/rhodge-esperon", "_blank");
        setIsOpen(false);
      },
    },
    {
      id: "act-reboot",
      category: "ACTIONS",
      label: "Execute Breach Protocol Minigame",
      detail: "Replay the interactive Cyberpunk ICE breach",
      shortcut: "REBOOT",
      action: relaunchBreach,
    },

    // Theme Controls
    {
      id: "theme-dark",
      category: "THEME",
      label: "Set Theme: Dark Cyberpunk Mode",
      detail: "Deep black canvas with neon accents",
      action: () => setTheme("dark"),
    },
    {
      id: "theme-light",
      category: "THEME",
      label: "Set Theme: Light Alabaster Schema",
      detail: "Clean high-contrast architectural paper",
      action: () => setTheme("light"),
    },
    {
      id: "theme-auto",
      category: "THEME",
      label: "Set Theme: System Auto Detect",
      detail: "Sync with operating system preference",
      action: () => setTheme("auto"),
    },
  ];

  const filtered = commands.filter((cmd) => {
    const q = search.toLowerCase().trim();
    if (!q) return true;
    return (
      cmd.label.toLowerCase().includes(q) ||
      cmd.category.toLowerCase().includes(q) ||
      (cmd.detail && cmd.detail.toLowerCase().includes(q))
    );
  });

  // Global Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.key === "Escape" && isOpen) {
        e.preventDefault();
        setIsOpen(false);
      }
    };

    const handleOpenEvent = () => {
      setIsOpen(true);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("portfolio:open-command-palette", handleOpenEvent);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("portfolio:open-command-palette", handleOpenEvent);
    };
  }, [isOpen]);

  // Focus input and reset selection when opened
  useEffect(() => {
    if (isOpen) {
      setSearch("");
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Handle keyboard list navigation
  const handleKeyNavigation = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % (filtered.length || 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filtered.length) % (filtered.length || 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filtered[selectedIndex]) {
        filtered[selectedIndex].action();
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-[10000] bg-black/75 backdrop-blur-md flex items-start justify-center pt-16 sm:pt-24 px-4 font-mono"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-xl border-2 border-accent-cyan/80 bg-secondary shadow-[0_0_40px_rgba(0,240,255,0.2)] cyber-card overflow-hidden flex flex-col max-h-[75vh]"
          >
            {/* Header Telemetry */}
            <div className="flex items-center justify-between px-4 py-2.5 bg-main/90 border-b border-border-subtle text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-accent-cyan animate-pulse shadow-[0_0_6px_rgba(0,240,255,0.8)]" />
                <span className="font-bold text-accent-cyan tracking-wider">COMMAND // MATRIX</span>
              </div>
              <div className="flex items-center gap-2 text-[10px] text-muted">
                <span className="hidden sm:inline">NAVIGATE: [↑/↓]</span>
                <span>SELECT: [ENTER]</span>
                <button
                  onClick={() => setIsOpen(false)}
                  className="px-1.5 py-0.5 bg-secondary border border-border-subtle text-primary hover:border-accent-pink hover:text-accent-pink transition-colors"
                >
                  ESC
                </button>
              </div>
            </div>

            {/* Search Input Bar */}
            <div className="p-3 border-b border-border-subtle bg-main/40 flex items-center gap-3">
              <span className="text-accent-cyan font-bold text-sm">&gt;</span>
              <input
                ref={inputRef}
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setSelectedIndex(0);
                }}
                onKeyDown={handleKeyNavigation}
                placeholder="Search commands, sections, or actions..."
                className="w-full bg-transparent text-primary placeholder-muted outline-none text-sm font-mono tracking-wide"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="text-muted hover:text-primary text-xs px-2"
                >
                  CLEAR
                </button>
              )}
            </div>

            {/* Notification Banner */}
            {copiedNotification && (
              <div className="bg-accent-cyan/20 border-b border-accent-cyan px-4 py-1.5 text-xs text-accent-cyan font-bold flex items-center justify-center gap-2 animate-pulse">
                <span>✓</span>
                <span>COPIED TO CLIPBOARD: rhodgesperon@gmail.com</span>
              </div>
            )}

            {/* Results List */}
            <div className="overflow-y-auto flex-1 p-2 space-y-1 divide-y divide-border-subtle/30">
              {filtered.length === 0 ? (
                <div className="p-8 text-center text-muted text-xs">
                  &gt; NO DIRECTIVES FOUND FOR &quot;{search}&quot;
                </div>
              ) : (
                filtered.map((item, index) => {
                  const isSelected = index === selectedIndex;
                  return (
                    <button
                      key={item.id}
                      onClick={() => item.action()}
                      onMouseEnter={() => setSelectedIndex(index)}
                      className={`w-full text-left px-3 py-2.5 transition-all flex items-center justify-between gap-3 text-xs ${
                        isSelected
                          ? "bg-accent-cyan/15 border-l-2 border-accent-cyan text-primary shadow-[0_0_12px_rgba(0,240,255,0.1)]"
                          : "text-muted hover:text-primary"
                      }`}
                    >
                      <div className="flex flex-col min-w-0">
                        <div className="flex items-center gap-2">
                          <span
                            className={`text-[9px] font-bold px-1.5 py-0.2 border ${
                              item.category === "NAVIGATION"
                                ? "border-accent-cyan/40 text-accent-cyan bg-accent-cyan/10"
                                : item.category === "ACTIONS"
                                ? "border-accent-yellow/40 text-accent-yellow bg-accent-yellow/10"
                                : "border-accent-pink/40 text-accent-pink bg-accent-pink/10"
                            }`}
                          >
                            {item.category}
                          </span>
                          <span className={`font-bold truncate ${isSelected ? "text-accent-cyan" : "text-primary"}`}>
                            {item.label}
                          </span>
                        </div>
                        {item.detail && (
                          <span className="text-[11px] text-muted truncate mt-0.5 font-sans">
                            {item.detail}
                          </span>
                        )}
                      </div>

                      {item.shortcut && (
                        <span className="text-[10px] text-muted px-1.5 py-0.5 border border-border-subtle bg-main shrink-0">
                          {item.shortcut}
                        </span>
                      )}
                    </button>
                  );
                })
              )}
            </div>

            {/* Bottom Status Bar */}
            <div className="px-4 py-2 bg-main/90 border-t border-border-subtle flex items-center justify-between text-[10px] text-muted">
              <span>RHODGE ESPERON // AGENTIC AI & FULL-STACK</span>
              <span className="text-accent-yellow tracking-wider">COMMAND MATRIX READY</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
