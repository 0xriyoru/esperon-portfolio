"use client";

import { useEffect, useMemo, useState } from "react";
import { GithubLogo } from "@phosphor-icons/react";
import fallbackData from "@/data/githubContributions2026.json";

interface ContributionDay {
  date: string;
  count: number;
  level: number;
}

interface ApiResponse {
  total: Record<string, number>;
  contributions: ContributionDay[];
}

const MONTH_LABELS = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUN",
  "JUL",
  "AUG",
  "SEP",
  "OCT",
  "NOV",
  "DEC",
];

const ROW_LABELS: Record<number, string> = {
  0: "MON",
  2: "WED",
  4: "FRI",
};

export default function Activity() {
  const [data, setData] = useState<ApiResponse>(fallbackData as ApiResponse);
  const [selectedYear, setSelectedYear] = useState<string>("2026");
  const [hoveredDay, setHoveredDay] = useState<{
    date: string;
    count: number;
    x: number;
    y: number;
  } | null>(null);

  useEffect(() => {
    let active = true;
    const fetchContributions = async () => {
      try {
        const res = await fetch(
          `https://github-contributions-api.jogruber.de/v4/0xriyoru?y=${selectedYear}`,
          { cache: "no-store" }
        );
        if (!res.ok) return;
        const json: ApiResponse = await res.json();
        if (active && json?.contributions?.length) {
          setData(json);
        }
      } catch {
        // Fallback to static JSON
      }
    };

    fetchContributions();
    return () => {
      active = false;
    };
  }, [selectedYear]);

  // Compute key statistics
  const stats = useMemo(() => {
    const list = data.contributions || [];
    const total = data.total?.[selectedYear] ?? list.reduce((acc, c) => acc + c.count, 0);
    const activeDays = list.filter((c) => c.count > 0).length;

    let longestRun = 0;
    let currentRun = 0;

    list.forEach((c) => {
      if (c.count > 0) {
        currentRun++;
        if (currentRun > longestRun) longestRun = currentRun;
      } else {
        currentRun = 0;
      }
    });

    return { total, activeDays, longestRun };
  }, [data, selectedYear]);

  // Layout math for 53-week x 7-row matrix
  const matrix = useMemo(() => {
    const list = data.contributions || [];
    if (!list.length) return { cells: [], monthPositions: [] };

    const firstDate = new Date(list[0].date + "T00:00:00Z");
    const day0Offset = (firstDate.getUTCDay() + 6) % 7; // Monday = 0, Sunday = 6

    const monthPositions: { label: string; col: number }[] = [];

    const cells = list.map((item, idx) => {
      const d = new Date(item.date + "T00:00:00Z");
      const row = (d.getUTCDay() + 6) % 7;
      const col = Math.floor((idx + day0Offset) / 7);

      if (item.date.endsWith("-01")) {
        const monthIdx = d.getUTCMonth();
        monthPositions.push({
          label: MONTH_LABELS[monthIdx],
          col,
        });
      }

      return {
        ...item,
        row,
        col,
      };
    });

    return { cells, monthPositions };
  }, [data]);

  // Dimensions - enlarged to fully occupy vertical and horizontal column space
  const CELL_SIZE = 20;
  const STEP_X = 25; // 20px cell + 5px gap
  const STEP_Y = 36; // 20px cell + 16px vertical gap for generous breathing room
  const PADDING_LEFT = 52;
  const PADDING_TOP = 48;
  const TOTAL_WIDTH = PADDING_LEFT + 53 * STEP_X + 28; // ~1405px
  const TOTAL_HEIGHT = PADDING_TOP + 7 * STEP_Y + 28; // ~328px

  return (
    <div className="rounded-note border border-rule-strong bg-paper">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-rule-strong px-5 py-3.5 sm:px-6">
        <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-ink">
          <GithubLogo size={15} weight="bold" className="text-accent" aria-hidden="true" />
          <span>GitHub</span>
          <span className="text-ink-soft">/</span>
          <a
            href="https://github.com/0xriyoru"
            target="_blank"
            rel="noopener noreferrer"
            className="text-ink hover:text-accent link-draw transition-colors"
          >
            @0xriyoru
          </a>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs">
          <span className="text-ink-soft uppercase tracking-wider">Year</span>
          <div className="inline-flex rounded-[2px] border border-rule bg-paper px-2.5 py-1 font-mono text-xs font-medium text-ink">
            {selectedYear}
          </div>
        </div>
      </div>

      {/* Main Grid: Left Metrics + Right Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Left Stats Column */}
        <div className="grid grid-cols-3 divide-x divide-rule border-b border-rule lg:col-span-4 lg:grid-cols-1 lg:divide-x-0 lg:divide-y lg:border-b-0 lg:border-r lg:border-rule-strong">
          {/* Total Contributions */}
          <div className="p-5 sm:p-6 lg:p-7">
            <div className="font-display text-3xl font-light tracking-tight text-ink sm:text-4xl lg:text-5xl">
              {stats.total.toLocaleString()}
            </div>
            <div className="mt-2 font-mono text-[10px] sm:text-[11px] uppercase tracking-wider text-ink-soft">
              Total Contributions
            </div>
          </div>

          {/* Longest Active Run */}
          <div className="p-5 sm:p-6 lg:p-7">
            <div className="font-display text-3xl font-light tracking-tight text-ink sm:text-4xl lg:text-5xl">
              {stats.longestRun}
              <span className="ml-1 text-sm sm:text-base font-normal text-ink-soft font-mono">
                {stats.longestRun === 1 ? "day" : "days"}
              </span>
            </div>
            <div className="mt-2 font-mono text-[10px] sm:text-[11px] uppercase tracking-wider text-ink-soft">
              Longest Active Run
            </div>
          </div>

          {/* Active Days */}
          <div className="p-5 sm:p-6 lg:p-7">
            <div className="font-display text-3xl font-light tracking-tight text-ink sm:text-4xl lg:text-5xl">
              {stats.activeDays}
              <span className="ml-1 text-sm sm:text-base font-normal text-ink-soft font-mono">
                {stats.activeDays === 1 ? "day" : "days"}
              </span>
            </div>
            <div className="mt-2 font-mono text-[10px] sm:text-[11px] uppercase tracking-wider text-ink-soft">
              Active Days
            </div>
          </div>
        </div>

        {/* Right Matrix Column - enlarged to fill full container height and width */}
        <div className="relative flex flex-col justify-center p-6 sm:p-8 lg:col-span-8 min-h-[360px] lg:min-h-[400px]">
          <div className="relative w-full overflow-x-auto">
            <svg
              viewBox={`0 0 ${TOTAL_WIDTH} ${TOTAL_HEIGHT}`}
              className="h-[320px] sm:h-[350px] lg:h-[370px] min-w-[880px] w-full select-none"
              style={{ overflow: "visible" }}
            >
              {/* Month Labels - large & highly readable */}
              {matrix.monthPositions.map((m, idx) => (
                <text
                  key={idx}
                  x={PADDING_LEFT + m.col * STEP_X}
                  y={24}
                  className="fill-ink font-mono text-[13px] font-medium tracking-wider uppercase"
                >
                  {m.label}
                </text>
              ))}

              {/* Day of Week Labels - large & highly readable */}
              {Object.entries(ROW_LABELS).map(([rowIdx, label]) => (
                <text
                  key={rowIdx}
                  x={2}
                  y={PADDING_TOP + Number(rowIdx) * STEP_Y + 15}
                  className="fill-ink font-mono text-[12px] font-medium tracking-wider uppercase"
                >
                  {label}
                </text>
              ))}

              {/* Cells */}
              {matrix.cells.map((cell) => {
                const cx = PADDING_LEFT + cell.col * STEP_X + CELL_SIZE / 2;
                const cy = PADDING_TOP + cell.row * STEP_Y + CELL_SIZE / 2;
                const hasContributions = cell.count > 0;

                // Dynamic radius calculation scaled to fill vertical grid
                const radius = hasContributions
                  ? Math.min(10.5, Math.max(4.2, 3.8 + Math.sqrt(cell.count) * 1.35))
                  : 2.2;

                return (
                  <g
                    key={cell.date}
                    className="cursor-pointer"
                    onMouseEnter={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      setHoveredDay({
                        date: cell.date,
                        count: cell.count,
                        x: rect.left + rect.width / 2,
                        y: rect.top,
                      });
                    }}
                    onMouseLeave={() => setHoveredDay(null)}
                  >
                    {/* Transparent Hit Area */}
                    <rect
                      x={cx - CELL_SIZE / 2 - 2}
                      y={cy - CELL_SIZE / 2 - 2}
                      width={CELL_SIZE + 4}
                      height={CELL_SIZE + 4}
                      fill="transparent"
                    />

                    {hasContributions ? (
                      <>
                        {/* Outer Concentric Halo Ring */}
                        <circle
                          cx={cx}
                          cy={cy}
                          r={radius + 2.8}
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={1.0}
                          className="text-accent opacity-40 transition-transform duration-150 hover:scale-110"
                        />
                        {/* Solid Inner Dot */}
                        <circle
                          cx={cx}
                          cy={cy}
                          r={radius}
                          fill="currentColor"
                          className="text-accent transition-transform duration-150 hover:scale-125"
                        />
                      </>
                    ) : (
                      /* Pinpoint for Inactive Days */
                      <circle
                        cx={cx}
                        cy={cy}
                        r={radius}
                        fill="rgba(18, 21, 26, 0.22)"
                        className="transition-colors hover:fill-ink-soft"
                      />
                    )}
                  </g>
                );
              })}
            </svg>

            {/* Interactive Tooltip */}
            {hoveredDay && (
              <div
                className="pointer-events-none fixed z-50 -translate-x-1/2 -translate-y-[calc(100%+8px)] rounded-[2px] border border-rule-strong bg-paper-deep px-2.5 py-1 font-mono text-[11px] text-ink shadow-md"
                style={{
                  left: hoveredDay.x,
                  top: hoveredDay.y,
                }}
              >
                <span className="font-semibold text-accent">
                  {hoveredDay.count === 0 ? "No" : hoveredDay.count}
                </span>{" "}
                {hoveredDay.count === 1 ? "contribution" : "contributions"} on{" "}
                <span className="text-ink-soft">
                  {new Date(hoveredDay.date + "T00:00:00Z").toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
