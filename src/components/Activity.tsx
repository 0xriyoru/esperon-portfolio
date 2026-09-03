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
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="border border-border-subtle bg-secondary p-5 md:p-6 cyber-card"
      >
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6 border-b border-border-subtle pb-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-accent-pink animate-pulse" />
            <span className="font-mono text-xs text-muted tracking-widest uppercase">
              Github Transmission / 0xriyoru
            </span>
          </div>

          {/* Year selector buttons */}
          <div className="flex items-center gap-1.5 font-mono text-xs">
            <span className="text-muted mr-1 text-[11px]">YEAR:</span>
            {availableYears.map((yr) => {
              const isSelected = selectedYear === yr;
              return (
                <button
                  key={yr}
                  onClick={() => setSelectedYear(yr)}
                  className={`px-2 py-0.5 border text-[10px] transition-colors ${
                    isSelected
                      ? "border-accent-cyan bg-accent-cyan/15 text-accent-cyan font-bold shadow-[0_0_8px_rgba(0,240,255,0.3)]"
                      : "border-border-subtle bg-main text-muted hover:text-primary hover:border-muted"
                  }`}
                >
                  {yr === "last" ? "PAST 1Y" : yr}
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
              dark: ["#121212", "#4d0012", "#990024", "#cc0030", "#FF003C"],
              light: ["#D8D8CF", "#FCA5A5", "#EF4444", "#DC2626", "#991B1B"],
            }}
            blockSize={10.5}
            blockMargin={3}
            fontSize={11}
            blockRadius={0}
          />
        </div>
      </motion.div>
    </div>
  );
}

