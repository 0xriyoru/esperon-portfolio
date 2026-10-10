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

    const executeThemeChange = () => {
      if (mode === "auto") {
        const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        root.classList.toggle("dark", isDark);
        root.classList.toggle("light", !isDark);
      } else {
        root.classList.toggle("dark", mode === "dark");
        root.classList.toggle("light", mode === "light");
      }
      window.dispatchEvent(
        new CustomEvent("theme-change", { detail: { theme: mode } })
      );
    };

    const doc = typeof document !== "undefined" ? document : null;
    const hasViewTransition =
      Boolean(
        doc &&
        "startViewTransition" in doc &&
        typeof (doc as unknown as { startViewTransition?: unknown }).startViewTransition === "function" &&
        !window.matchMedia("(prefers-reduced-motion: reduce)").matches
      );

    if (hasViewTransition && doc) {
      doc.documentElement.classList.add("theme-view-transitioning");
      const transition = (doc as unknown as { startViewTransition: (cb: () => void) => { finished: Promise<void> } }).startViewTransition(() => {
        executeThemeChange();
      });
      transition.finished.finally(() => {
        doc.documentElement.classList.remove("theme-view-transitioning");
      });
    } else {
      executeThemeChange();
    }

    setIsOpen(false);
  };

  const commands: CommandItem[] = [
    // Navigation
    {
      id: "nav-profile",
      category: "NAVIGATION",
      label: "Go to Profile & Overview",
      detail: "Biography, core capabilities, and contact points",
      shortcut: "G P",
      action: () => navigateTo("profile"),
    },
    {
      id: "nav-projects",
      category: "NAVIGATION",
      label: "Go to Featured Projects",
      detail: "Mekai, SBMA-JO, Rebeat, ArtNest, and more",
      shortcut: "G J",
      action: () => navigateTo("projects"),
    },
    {
      id: "nav-skills",
      category: "NAVIGATION",
      label: "Go to Technical Inventory",
      detail: "Front-End, Back-End, AI Agents, and Tooling",
      shortcut: "G S",
      action: () => navigateTo("skills"),
    },
    {
      id: "nav-credentials",
      category: "NAVIGATION",
      label: "Go to Experience & Milestones",
      detail: "Work experience, certifications, and technical summits",
      shortcut: "G E",
      action: () => navigateTo("credentials"),
    },
    {
      id: "nav-activity",
      category: "NAVIGATION",
      label: "Go to GitHub Activity",
      detail: "Live commit activity telemetry",
      shortcut: "G A",
      action: () => navigateTo("activity"),
    },
    {
      id: "nav-contact",
      category: "NAVIGATION",
      label: "Go to Contact",
      detail: "Get in touch or start a conversation",
      shortcut: "G C",
      action: () => navigateTo("contact"),
    },

    // Actions
    {
      id: "act-cv",
      category: "ACTIONS",
      label: "View Resume / CV",
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
      label: "Copy Email Address",
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

    // Theme Controls
    {
      id: "theme-dark",
      category: "THEME",
      label: "Set Theme: Dark Mode",
      detail: "Deep obsidian canvas with subtle borders",
      action: () => setTheme("dark"),
    },
    {
      id: "theme-light",
      category: "THEME",
      label: "Set Theme: Light Mode",
      detail: "Clean high-contrast paper aesthetic",
      action: () => setTheme("light"),
    },
    {
      id: "theme-auto",
      category: "THEME",
      label: "Set Theme: System Preference",
      detail: "Synchronize with your operating system",
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
        setSearch("");
        setSelectedIndex(0);
        setIsOpen((prev) => !prev);
      } else if (e.key === "Escape" && isOpen) {
        e.preventDefault();
        setIsOpen(false);
      }
    };

    const handleOpenEvent = () => {
      setSearch("");
      setSelectedIndex(0);
      setIsOpen(true);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("portfolio:open-command-palette", handleOpenEvent);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("portfolio:open-command-palette", handleOpenEvent);
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

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
          className="fixed inset-0 z-[10000] bg-black/70 backdrop-blur-sm flex items-start justify-center pt-16 sm:pt-24 px-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: -8 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-xl border border-border-subtle bg-secondary/95 backdrop-blur-xl shadow-2xl rounded-2xl overflow-hidden flex flex-col max-h-[75vh]"
          >
            {/* Search Input Bar */}
            <div className="p-4 border-b border-border-subtle bg-main/50 flex items-center gap-3">
              <span className="text-muted text-sm">🔍</span>
              <input
                ref={inputRef}
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setSelectedIndex(0);
                }}
                onKeyDown={handleKeyNavigation}
                placeholder="Type a command or search..."
                className="w-full bg-transparent text-primary placeholder-muted outline-none text-sm font-sans"
              />
              <kbd className="px-2 py-0.5 bg-main border border-border-subtle rounded text-[10px] font-mono text-muted">
                ESC
              </kbd>
            </div>

            {/* Notification Banner */}
            {copiedNotification && (
              <div className="bg-accent-emerald/20 border-b border-accent-emerald/40 px-4 py-2 text-xs text-accent-emerald font-medium flex items-center justify-center gap-2">
                <span>✓</span>
                <span>Copied email to clipboard: rhodgesperon@gmail.com</span>
              </div>
            )}

            {/* Results List */}
            <div className="overflow-y-auto flex-1 p-2 space-y-1">
              {filtered.length === 0 ? (
                <div className="p-8 text-center text-muted text-xs font-sans">
                  No matching commands found for &quot;{search}&quot;
                </div>
              ) : (
                filtered.map((item, index) => {
                  const isSelected = index === selectedIndex;
                  return (
                    <button
                      key={item.id}
                      onClick={() => item.action()}
                      onMouseEnter={() => setSelectedIndex(index)}
                      className={`w-full text-left px-3.5 py-2.5 rounded-lg transition-all flex items-center justify-between gap-3 text-xs cursor-pointer ${
                        isSelected
                          ? "bg-main text-primary border border-border-subtle shadow-sm"
                          : "text-muted hover:text-primary"
                      }`}
                    >
                      <div className="flex flex-col min-w-0">
                        <div className="flex items-center gap-2">
                          <span
                            className={`text-[9px] font-mono px-1.5 py-0.5 rounded border ${
                              item.category === "NAVIGATION"
                                ? "border-accent-cyan/30 text-accent-cyan bg-accent-cyan/10"
                                : item.category === "ACTIONS"
                                ? "border-accent-amber/30 text-accent-amber bg-accent-amber/10"
                                : "border-border-subtle text-muted bg-main"
                            }`}
                          >
                            {item.category}
                          </span>
                          <span className="font-medium text-sm text-primary truncate">
                            {item.label}
                          </span>
                        </div>
                        {item.detail && (
                          <span className="text-[11px] text-muted truncate mt-0.5 pl-0.5">
                            {item.detail}
                          </span>
                        )}
                      </div>

                      {item.shortcut && (
                        <span className="text-[10px] font-mono text-muted px-2 py-0.5 border border-border-subtle bg-main rounded shrink-0">
                          {item.shortcut}
                        </span>
                      )}
                    </button>
                  );
                })
              )}
            </div>

            {/* Bottom Status Bar */}
            <div className="px-4 py-2.5 bg-main/60 border-t border-border-subtle flex items-center justify-between text-[11px] text-muted font-sans">
              <span className="flex items-center gap-2">
                <span>↑↓ to navigate</span>
                <span>•</span>
                <span>Enter to select</span>
              </span>
              <span>Rhodge Esperon</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
