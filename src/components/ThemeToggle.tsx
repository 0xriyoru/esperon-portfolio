"use client";

import { useSyncExternalStore } from "react";

type Theme = "auto" | "light" | "dark";

function applyThemeToDOM(mode: Theme) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  if (mode === "auto") {
    const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    root.classList.toggle("dark", systemDark);
    root.classList.toggle("light", !systemDark);
  } else {
    root.classList.toggle("dark", mode === "dark");
    root.classList.toggle("light", mode === "light");
  }
}

function subscribe(callback: () => void) {
  window.addEventListener("theme-change", callback);
  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  mediaQuery.addEventListener("change", callback);
  return () => {
    window.removeEventListener("theme-change", callback);
    mediaQuery.removeEventListener("change", callback);
  };
}

function getSnapshot(): Theme {
  const saved = (localStorage.getItem("theme") as Theme) || "auto";
  applyThemeToDOM(saved);
  return saved;
}

function getServerSnapshot(): Theme {
  return "auto";
}

export default function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const handleSelectTheme = (newTheme: Theme) => {
    if (newTheme === theme) return;

    localStorage.setItem("theme", newTheme);

    const executeThemeChange = () => {
      applyThemeToDOM(newTheme);
      window.dispatchEvent(
        new CustomEvent("theme-change", { detail: { theme: newTheme } })
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
      if (
        typeof window !== "undefined" &&
        !window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ) {
        const curtain = document.createElement("div");
        curtain.className = "theme-curtain-fallback";
        document.body.appendChild(curtain);
        setTimeout(executeThemeChange, 220);
        setTimeout(() => {
          curtain.remove();
        }, 460);
      } else {
        executeThemeChange();
      }
    }
  };

  return (
    <div className="flex items-center justify-between border border-border-subtle bg-main/70 p-1 rounded-lg text-xs font-sans">
      <span className="text-muted text-[11px] pl-2 font-medium">Theme</span>
      <div className="flex items-center gap-0.5 bg-secondary/80 p-0.5 rounded-md border border-border-subtle/50">
        <button
          onClick={() => handleSelectTheme("auto")}
          title="System Auto Preference"
          className={`px-2 py-1 rounded text-[11px] font-medium transition-all cursor-pointer ${
            theme === "auto"
              ? "bg-main text-primary shadow-xs"
              : "text-muted hover:text-primary"
          }`}
        >
          Auto
        </button>
        <button
          onClick={() => handleSelectTheme("light")}
          title="Light Mode"
          className={`px-2 py-1 rounded text-[11px] font-medium transition-all cursor-pointer ${
            theme === "light"
              ? "bg-main text-primary shadow-xs"
              : "text-muted hover:text-primary"
          }`}
        >
          Light
        </button>
        <button
          onClick={() => handleSelectTheme("dark")}
          title="Dark Mode"
          className={`px-2 py-1 rounded text-[11px] font-medium transition-all cursor-pointer ${
            theme === "dark"
              ? "bg-main text-primary shadow-xs"
              : "text-muted hover:text-primary"
          }`}
        >
          Dark
        </button>
      </div>
    </div>
  );
}
