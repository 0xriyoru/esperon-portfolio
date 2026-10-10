"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { GitHubCalendar } from "react-github-calendar";

// Default verified years based on actual GitHub activity
const DEFAULT_YEARS = ["last", "2026"];

export default function Activity() {
  const [selectedYear, setSelectedYear] = useState<string>("last");
  const [availableYears, setAvailableYears] = useState<string[]>(DEFAULT_YEARS);
  const [contributionTotals, setContributionTotals] = useState<Record<string, number>>({});
  const [isLightMode, setIsLightMode] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const checkTheme = () => {
      setIsLightMode(document.documentElement.classList.contains("light"));
    };
    checkTheme();

    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    window.addEventListener("theme-change", checkTheme);

    // Dynamically query contribution metadata to verify active years and accurate telemetry counts
    const fetchActiveYears = async () => {
      try {
        const res = await fetch("https://github-contributions-api.jogruber.de/v4/0xriyoru", {
          cache: "no-store",
          headers: {
            "Cache-Control": "no-cache",
          },
        });
        if (!res.ok) return;
        const data = await res.json();

        // Extract active years with verified contributions (> 0)
        const totals: Record<string, number> = {};
        if (data.total && typeof data.total === "object") {
          Object.entries(data.total).forEach(([yr, cnt]) => {
            if (typeof cnt === "number") {
              totals[yr] = cnt;
            }
          });
        }

        // Calculate past 365 days contribution total
        if (Array.isArray(data.contributions)) {
          totals["last"] = data.contributions.reduce(
            (acc: number, cur: { count?: number }) => acc + (cur.count || 0),
            0
          );
        }

        setContributionTotals(totals);

        const verifiedYears = Object.keys(totals)
          .filter((yr) => yr !== "last" && totals[yr] > 0)
          .sort((a, b) => Number(b) - Number(a));

        if (verifiedYears.length > 0) {
          setAvailableYears(["last", ...verifiedYears]);
        }
      } catch (err) {
        console.warn("Unable to fetch dynamic GitHub contribution metadata:", err);
      }
    };

    fetchActiveYears();

    return () => {
      observer.disconnect();
      window.removeEventListener("theme-change", checkTheme);
    };
  }, []);

  const currentCount = contributionTotals[selectedYear];

  return (
    <div className="w-full">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="glass-card p-6 relative overflow-hidden group"
      >
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 border-b border-border-subtle pb-4">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-accent-emerald animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
            <span className="text-[11px] font-mono text-accent-cyan font-semibold">Live Telemetry</span>
            <a
              href="https://github.com/0xriyoru"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono text-muted hover:text-primary transition-colors"
            >
              github.com/0xriyoru ↗
            </a>
            {currentCount !== undefined && (
              <span className="text-[10px] font-mono text-accent-emerald border border-accent-emerald/30 bg-accent-emerald/10 px-2 py-0.5 rounded font-medium">
                {currentCount} {currentCount === 1 ? "contribution" : "contributions"}
              </span>
            )}
          </div>

          {/* Dynamic Year selector buttons */}
          <div className="flex items-center gap-1.5 text-xs">
            {availableYears.map((yr) => {
              const isSelected = selectedYear === yr;
              return (
                <button
                  key={yr}
                  onClick={() => setSelectedYear(yr)}
                  className={`px-3 py-1 rounded-md text-xs font-mono transition-all cursor-pointer ${
                    isSelected
                      ? "bg-accent-cyan text-black font-bold shadow-[0_0_10px_rgba(0,240,255,0.4)]"
                      : "bg-main border border-border-subtle text-muted hover:text-primary hover:border-accent-cyan/30"
                  }`}
                >
                  {yr === "last" ? "Past Year" : yr}
                </button>
              );
            })}
          </div>
        </div>

        <div className="w-full overflow-x-auto flex justify-center py-2 min-h-[140px] items-center">
          {mounted ? (
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
          ) : (
            <div className="h-[140px] flex items-center justify-center text-xs font-mono text-muted/60 animate-pulse">
              Loading GitHub activity...
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
