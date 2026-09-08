"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { GitHubCalendar } from "react-github-calendar";

const availableYears = ["last", "2026", "2025", "2024"];

export default function Activity() {
  const [selectedYear, setSelectedYear] = useState<string>("last");
  const [isLightMode, setIsLightMode] = useState(false);

  useEffect(() => {
    const checkTheme = () => {
      setIsLightMode(document.documentElement.classList.contains("light"));
    };
    checkTheme();

    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    window.addEventListener("theme-change", checkTheme);

    return () => {
      observer.disconnect();
      window.removeEventListener("theme-change", checkTheme);
    };
  }, []);

  return (
    <div className="w-full">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="glass-card p-6"
      >
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 border-b border-border-subtle pb-4">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-accent-emerald animate-pulse" />
            <a
              href="https://github.com/0xriyoru"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono text-muted hover:text-primary transition-colors"
            >
              github.com/0xriyoru ↗
            </a>
          </div>

          {/* Year selector buttons */}
          <div className="flex items-center gap-1.5 text-xs">
            {availableYears.map((yr) => {
              const isSelected = selectedYear === yr;
              return (
                <button
                  key={yr}
                  onClick={() => setSelectedYear(yr)}
                  className={`px-3 py-1 rounded-md text-xs font-mono transition-colors cursor-pointer ${
                    isSelected
                      ? "bg-primary text-main font-semibold shadow-sm"
                      : "bg-main border border-border-subtle text-muted hover:text-primary"
                  }`}
                >
                  {yr === "last" ? "Past Year" : yr}
                </button>
              );
            })}
          </div>
        </div>

        <div className="w-full overflow-x-auto flex justify-center py-2">
          <GitHubCalendar
            username="0xriyoru"
            year={selectedYear === "last" ? undefined : Number(selectedYear)}
            colorScheme={isLightMode ? "light" : "dark"}
            theme={{
              dark: ["#18181B", "#064e3b", "#047857", "#059669", "#10b981"],
              light: ["#F4F4F5", "#A7F3D0", "#34D399", "#10B981", "#059669"],
            }}
            blockSize={11}
            blockMargin={3}
            fontSize={11}
            blockRadius={2}
          />
        </div>
      </motion.div>
    </div>
  );
}
