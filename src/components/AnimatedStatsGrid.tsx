"use client";

import { motion } from "framer-motion";

interface StatItem {
  number: string;
  label: string;
  sublabel: string;
  tag: string;
}

const stats: StatItem[] = [
  {
    tag: "EXPERIENCE",
    number: "04+",
    label: "Years Dev Journey",
    sublabel: "BSIT studies & production software builds",
  },
  {
    tag: "APPLICATIONS",
    number: "12+",
    label: "Shipped Platforms",
    sublabel: "Full-stack apps, AI pipelines & PWAs",
  },
  {
    tag: "PERFORMANCE",
    number: "60 FPS",
    label: "Web Audio Engine",
    sublabel: "Low-latency buffer caching in Rebeat",
  },
  {
    tag: "SECURITY",
    number: "100%",
    label: "Access Control & RLS",
    sublabel: "PostgreSQL Row-Level Security policies",
  },
];

export default function AnimatedStatsGrid() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 my-8">
      {stats.map((stat, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35, delay: i * 0.08 }}
          whileHover={{ y: -3 }}
          className="relative p-4 sm:p-5 rounded-xl border border-border-subtle bg-secondary/80 backdrop-blur-sm group hover:border-accent-cyan/40 transition-all duration-200 overflow-hidden"
        >
          {/* Top Micro Tag */}
          <div className="text-[10px] font-mono text-accent-cyan/80 mb-2 tracking-wider flex items-center justify-between">
            <span>{stat.tag}</span>
            <span className="w-1 h-1 rounded-full bg-accent-cyan/60 group-hover:bg-accent-cyan group-hover:scale-125 transition-all" />
          </div>

          {/* Metric Number (Cyber Display Font) */}
          <div className="font-cyber font-bold text-2xl sm:text-3xl lg:text-4xl text-primary tracking-tight group-hover:text-accent-cyan transition-colors mb-1">
            {stat.number}
          </div>

          {/* Label */}
          <div className="text-xs sm:text-sm font-semibold text-primary/90 leading-tight mb-1">
            {stat.label}
          </div>

          {/* Sublabel */}
          <div className="text-[11px] text-muted leading-snug">
            {stat.sublabel}
          </div>

          {/* Bottom Laser Trace on Hover */}
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-accent-cyan to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </motion.div>
      ))}
    </div>
  );
}
