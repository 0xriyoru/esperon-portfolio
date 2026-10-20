"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "@phosphor-icons/react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";

interface Milestone {
  id: string;
  date: string;
  title: string;
  subtitle?: string;
  certificateUrl?: string;
  previewImageUrl?: string;
  isAccent?: boolean;
}

const milestones: Milestone[] = [
  {
    id: "columban-to-lsb",
    date: "2021 — 2023",
    title: "Columban College, Inc. → Lyceum of Subic Bay",
    subtitle: "STEM Senior High School to BS Information Technology",
  },
  {
    id: "data-privacy-dart",
    date: "December 2023",
    title: "Data Privacy & IT/CS Career Development",
    subtitle: "Lyceum of Subic Bay",
    certificateUrl: "/certificates/data-privacy-dart-seminar.png",
    previewImageUrl: "/certificates/data-privacy-dart-seminar.png",
  },
  {
    id: "angular-ui",
    date: "October 2024",
    title:
      "Exploring the Angular Frameworks for UI Development: Enhancing your Web Application",
    subtitle: "Lyceum of Subic Bay",
    certificateUrl: "/certificates/angular-frameworks-ui-development.png",
    previewImageUrl: "/certificates/angular-frameworks-ui-development.png",
  },
  {
    id: "csharp-unity",
    date: "August 2025",
    title: "C# Scripting for Unity: Core Concepts and Best Practices",
    subtitle: "Lyceum of Subic Bay",
  },
  {
    id: "skydevs-summit",
    date: "September 2025",
    title: "Skydevs Hack, Play, & Learn Summit 2025 “Masterclass”",
    subtitle: "Skydev Solutions, Inc.",
    certificateUrl: "/certificates/skydevs-hack-play-learn-summit-2025.pdf",
    previewImageUrl: "/certificates/skydevs-hack-play-learn-summit-2025-1.png",
  },
  {
    id: "sparkcon",
    date: "November 2025",
    title: "SparkCon: The Next Wave of Innovation",
    subtitle: "Campus DevCon x Zellense",
  },
  {
    id: "topcit-l2",
    date: "December 2025",
    title: "Certified Level 2, TOPCIT (Test of Practical Competency in ICT)",
    subtitle: "IITP Korea",
    certificateUrl: "/certificates/topcit-level-2-certification.pdf",
    previewImageUrl: "/certificates/topcit-level-2-certification-1.png",
    isAccent: true,
  },
  {
    id: "sbma-ojt",
    date: "May — Sept 2026",
    title: "OJT Trainee · Asset Management Department (AMD) at SBMA",
    subtitle:
      "Subic Bay Metropolitan Authority · 486-Hour Practicum · Cloud Job Order System",
    isAccent: true,
  },
  {
    id: "devcon-convergence",
    date: "July 2026",
    title:
      "Convergence III: From Policy to People: The Governance & Human Side of Cyber Risk",
    subtitle: "DEVCON",
    certificateUrl: "/certificates/convergence-iii-recognition.pdf",
    previewImageUrl: "/certificates/convergence-iii-recognition-1.png",
  },
  {
    id: "aws-community-day",
    date: "August 2026",
    title: "AWS Community Day: Build, Break, Repeat!",
    subtitle: "AWS Community PH",
  },
  {
    id: "lenovo-legion-quest",
    date: "September 2026",
    title: "Lenovo Legion Campus Quest",
    subtitle: "Lenovo Legion",
  },
  {
    id: "hytec-power-tour",
    date: "September 2026",
    title: "Educational Tour: Hytec Power, Inc.",
    subtitle: "Hytec Power, Inc.",
  },
  {
    id: "norde-international-tour",
    date: "September 2026",
    title: "Educational Tour: Norde International Distributors",
    subtitle: "Norde International Distributors",
  },
  {
    id: "raite-2026",
    date: "October 2026",
    title:
      "RAITE 2026: CTRL + NEXT: Empowering Students as Future-Ready Digital Innovators and Technology Leaders",
    subtitle: "PSITE REGION III",
    isAccent: true,
  },
];

function MilestoneBranch({ item }: { item: Milestone }) {
  return (
    <div className="transition-colors">
      <div className="font-mono text-xs font-semibold tracking-tight text-accent">
        {item.date}
      </div>

      <h3 className="mt-1 font-display text-lg font-light leading-snug tracking-tight text-ink md:text-[18.5px]">
        {item.title}
      </h3>

      {item.subtitle && (
        <p className="mt-1 font-mono text-[11.5px] leading-relaxed text-ink-soft">
          {item.subtitle}
        </p>
      )}

      {/* Clickable Certificate Preview */}
      {item.certificateUrl && item.previewImageUrl && (
        <a
          href={item.certificateUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`View ${item.title} certificate`}
          className="group/cert relative mt-2.5 block w-[216px] cursor-pointer overflow-hidden rounded-note border border-rule-strong bg-paper transition-all duration-200 hover:-translate-y-1 hover:border-accent"
        >
          <div className="relative h-[136px] w-full overflow-hidden bg-paper-deep">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={item.previewImageUrl}
              alt={item.title}
              loading="lazy"
              className="h-full w-full object-cover object-top transition-transform duration-300 group-hover/cert:scale-[1.04]"
            />
          </div>

          {/* Clean minimal arrow indicator on top right */}
          <span className="absolute right-2 top-2 text-ink/75 transition-all duration-200 group-hover/cert:text-accent group-hover/cert:translate-x-0.5 group-hover/cert:-translate-y-0.5 drop-shadow-xs">
            <ArrowUpRight size={16} weight="bold" />
          </span>
        </a>
      )}
    </div>
  );
}

export default function Journey() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [maxScroll, setMaxScroll] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    restDelta: 0.001,
  });

  // Geometry for individual milestone nodes along the center wave
  const STEP_X = 325;
  const FIRST_X = 140;
  const NODE_WIDTH = 290;
  const WAVE_HEIGHT = 100;
  const CREST_Y = 24;
  const TROUGH_Y = 76;
  const nodes = milestones.map((item, i) => {
    const isTop = i % 2 === 0;
    const cx = FIRST_X + i * STEP_X;
    const cy = isTop ? CREST_Y : TROUGH_Y;
    return {
      item,
      isTop,
      cx,
      cy,
    };
  });

  const lastX = nodes[nodes.length - 1].cx;
  const trackTotalWidth = lastX + NODE_WIDTH + 160;

  // 1. Edge-to-edge static base track (starts way off-screen left and extends off-screen right)
  const LEAD_EDGE = 2500;
  const staticBasePath = [
    `M ${-LEAD_EDGE},${nodes[0].cy}`,
    `L ${nodes[0].cx},${nodes[0].cy}`,
  ];
  for (let i = 0; i < nodes.length - 1; i++) {
    const curr = nodes[i];
    const next = nodes[i + 1];
    const midX = Math.round((curr.cx + next.cx) / 2);
    staticBasePath.push(
      `C ${midX},${curr.cy} ${midX},${next.cy} ${next.cx},${next.cy}`
    );
  }
  staticBasePath.push(`L ${lastX + LEAD_EDGE},${nodes[nodes.length - 1].cy}`);
  const fullBaseTrack = staticBasePath.join(" ");

  // 2. Liquid blue progress line (starts at Node 0 so 0% to 100% maps visibly across the milestones)
  const liquidSegments: string[] = [
    `M ${-LEAD_EDGE},${nodes[0].cy}`,
    `L ${nodes[0].cx},${nodes[0].cy}`,
  ];
  for (let i = 0; i < nodes.length - 1; i++) {
    const curr = nodes[i];
    const next = nodes[i + 1];
    const midX = Math.round((curr.cx + next.cx) / 2);
    liquidSegments.push(
      `C ${midX},${curr.cy} ${midX},${next.cy} ${next.cx},${next.cy}`
    );
  }
  liquidSegments.push(`L ${lastX + LEAD_EDGE},${nodes[nodes.length - 1].cy}`);
  const branchWavePath = liquidSegments.join(" ");

  useEffect(() => {
    const updateDimensions = () => {
      const vw = window.innerWidth;
      // Calculate true scroll distance from the total width of the canvas
      const leftPad = Math.max(40, (vw - 1280) / 2 + 40);
      const totalWidth = trackTotalWidth + leftPad + 200;
      setMaxScroll(Math.max(0, totalWidth - vw));
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, [trackTotalWidth]);

  // Allow swipeable manual pan on top of vertical scroll progress
  const panOffset = useMotionValue<number>(0);
  const smoothPan = useSpring(panOffset, {
    stiffness: 120,
    damping: 24,
    restDelta: 0.001,
  });

  const scrollX = useTransform<number, number>(
    smoothProgress,
    [0, 1],
    [0, -maxScroll]
  );

  const combinedX = useTransform<number, number>(
    [scrollX, smoothPan],
    ([sx, px]) => Math.min(0, Math.max(-maxScroll, (sx as number) + (px as number)))
  );

  // Total length of path = 2500 (lead-in) + ~4225 (milestones) + 2500 (lead-out) ≈ 9225px
  // Node 01 is at distance 2500/9225 ≈ 0.271
  // Final Node 14 is at distance (2500 + 4225)/9225 ≈ 0.729
  // Map combinedX scroll progress from Node 1 (0.28) through Node 14 (0.75) to edge (1.0)
  const activeProgress = useTransform<number, number>(
    combinedX,
    [0, -maxScroll * 0.9, -maxScroll || -1],
    [0.28, 0.75, 1]
  );

  return (
    <div>
      {/* ========================================================
          DESKTOP VIEW (lg+): Horizontal Center-Axis Branching Map
         ======================================================== */}
      <div ref={containerRef} className="relative hidden lg:block h-[480vh]">
        <div className="sticky top-0 h-[100dvh] w-full overflow-hidden flex flex-col justify-between pt-16 pb-6">
          {/* Top-Anchored Section Header */}
          <div className="mx-auto w-full max-w-[1280px] px-5 md:px-10 shrink-0">
            <h2 className="font-display text-4xl font-light tracking-tight md:text-6xl text-ink">
              Journey
            </h2>
          </div>

          {/* Horizontal Branching Track (overflow-x-clip only so vertical content never gets sliced) */}
          <div className="relative w-full flex-1 flex items-center overflow-x-clip">
            <motion.div
              ref={trackRef}
              style={reduce ? undefined : { x: combinedX }}
              onPan={(_, info) => {
                const current = panOffset.get();
                panOffset.set(current + info.delta.x);
              }}
              className="relative pl-[max(2.5rem,calc((100vw-1280px)/2+2.5rem))] pr-32 cursor-grab active:cursor-grabbing select-none"
            >
              {/* 3-Band Canvas: Top Branches (260px) + Center Wave Spine (100px) + Bottom Branches (260px) */}
              <div
                className="relative h-[620px]"
                style={{ width: `${trackTotalWidth}px` }}
              >
                {/* Center SVG Git / Wave Spine (y: 260px to 360px) */}
                <svg
                  className="pointer-events-none absolute left-0 top-[260px] w-full"
                  style={{ height: `${WAVE_HEIGHT}px`, overflow: "visible" }}
                  aria-hidden="true"
                >
                  {/* Base Structural Track */}
                  <path
                    d={branchWavePath}
                    fill="none"
                    stroke="rgba(18, 21, 26, 0.18)"
                    strokeWidth="2"
                  />

                  {/* Animated Cobalt Progress Trace */}
                  <motion.path
                    d={branchWavePath}
                    fill="none"
                    stroke="var(--color-accent, #2340d9)"
                    strokeWidth="3.5"
                    style={{
                      pathLength: reduce ? 1 : activeProgress,
                    }}
                  />

                  {/* Vertical Branch Stems & Commit Rings */}
                  {nodes.map(({ item, isTop, cx, cy }) => {
                    const stemY2 = isTop ? 0 : WAVE_HEIGHT;
                    return (
                      <g key={item.id}>
                        {/* Vertical Stem */}
                        <line
                          x1={cx}
                          y1={cy}
                          x2={cx}
                          y2={stemY2}
                          stroke={
                            item.isAccent
                              ? "var(--color-accent, #2340d9)"
                              : "rgba(18, 21, 26, 0.55)"
                          }
                          strokeWidth="2"
                        />

                        {/* Commit Ring */}
                        <circle
                          cx={cx}
                          cy={cy}
                          r="7.5"
                          fill="#edeff2"
                          stroke={
                            item.isAccent
                              ? "var(--color-accent, #2340d9)"
                              : "#12151a"
                          }
                          strokeWidth="3"
                        />

                        {item.isAccent && (
                          <circle
                            cx={cx}
                            cy={cy}
                            r="2.5"
                            fill="var(--color-accent, #2340d9)"
                          />
                        )}
                      </g>
                    );
                  })}
                </svg>

                {/* Alternating Top & Bottom Milestone Nodes */}
                {nodes.map(({ item, isTop, cx }) => (
                  <div
                    key={item.id}
                    style={{
                      width: `${NODE_WIDTH}px`,
                      left: `${cx - 16}px`,
                      ...(isTop
                        ? { bottom: `${620 - 260 + 4}px` }
                        : { top: `${260 + WAVE_HEIGHT + 4}px` }),
                    }}
                    className="absolute z-10"
                  >
                    <MilestoneBranch item={item} />
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ========================================================
          MOBILE VIEW (< lg): Vertical Git Branch Timeline
         ======================================================== */}
      <div className="lg:hidden py-16 md:py-24">
        <div className="mx-auto max-w-[1280px] px-5 md:px-10">
          <h2 className="font-display text-4xl font-light tracking-tight md:text-6xl text-ink mb-12">
            Journey
          </h2>

          <div className="relative pl-6 border-l-2 border-rule-strong space-y-10">
            {milestones.map((item) => (
              <div key={item.id} className="relative">
                <span
                  className={`absolute -left-[31px] top-1.5 h-3.5 w-3.5 rounded-full border-[3px] bg-paper ${
                    item.isAccent ? "border-accent" : "border-ink"
                  }`}
                />
                <MilestoneBranch item={item} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
