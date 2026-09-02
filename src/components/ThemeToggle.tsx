"use client";

import { useEffect, useState } from "react";

type Theme = "auto" | "light" | "dark";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("auto");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = (localStorage.getItem("theme") as Theme) || "auto";
    setTheme(savedTheme);
    applyTheme(savedTheme);

    // Listen to system preference changes
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      const current = (localStorage.getItem("theme") as Theme) || "auto";
      if (current === "auto") {
        applyTheme("auto");
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const applyTheme = (mode: Theme) => {
    const root = document.documentElement;
    if (mode === "auto") {
      const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      if (systemDark) {
        root.classList.add("dark");
        root.classList.remove("light");
      } else {
        root.classList.add("light");
        root.classList.remove("dark");
      }
    } else if (mode === "dark") {
      root.classList.add("dark");
      root.classList.remove("light");
    } else if (mode === "light") {
      root.classList.add("light");
      root.classList.remove("dark");
    }
  };

  const handleSelectTheme = (newTheme: Theme) => {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    applyTheme(newTheme);
  };

  if (!mounted) return null;

  return (
    <div className="flex items-center justify-between border border-border-subtle bg-main p-1.5 font-mono text-[10px] cyber-card">
      <span className="text-muted text-[9px] uppercase tracking-wider pl-1.5 hidden sm:inline">
        THEME
      </span>
      <div className="flex items-center gap-1">
        <button
          onClick={() => handleSelectTheme("auto")}
          title="System Auto Preference"
          className={`px-2 py-0.5 transition-colors uppercase ${
            theme === "auto"
              ? "bg-accent-cyan/15 text-accent-cyan font-bold border border-accent-cyan/50"
              : "text-muted hover:text-primary"
          }`}
        >
          AUTO
        </button>
        <button
          onClick={() => handleSelectTheme("light")}
          title="Light Alabaster Mode"
          className={`px-2 py-0.5 transition-colors uppercase ${
            theme === "light"
              ? "bg-accent-yellow/20 text-accent-yellow font-bold border border-accent-yellow/50"
              : "text-muted hover:text-primary"
          }`}
        >
          LIGHT
        </button>
        <button
          onClick={() => handleSelectTheme("dark")}
          title="Dark Cyberpunk Mode"
          className={`px-2 py-0.5 transition-colors uppercase ${
            theme === "dark"
              ? "bg-accent-pink/20 text-accent-pink font-bold border border-accent-pink/50"
              : "text-muted hover:text-primary"
          }`}
        >
          DARK
        </button>
      </div>
    </div>
  );
}
