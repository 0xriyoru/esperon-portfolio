"use client";

import { useState, useEffect } from "react";
import PageViews from "@/components/PageViews";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Credentials from "@/components/Credentials";
import Activity from "@/components/Activity";
import ScrambleText from "@/components/ScrambleText";
import CyberHudRadar from "@/components/CyberHudRadar";
import AnimatedStatsGrid from "@/components/AnimatedStatsGrid";

export default function Home() {
  const [timeStr, setTimeStr] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(
        now.toLocaleTimeString("en-US", {
          timeZone: "Asia/Manila",
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col gap-20 sm:gap-28 pb-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Hero / Profile Section */}
      <section id="profile" className="pt-8 sm:pt-14 pb-4 scroll-mt-24 relative">
        {/* Top Status Bar with Clean Telemetry */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs border-b border-border-subtle/80 pb-4 mb-10">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-muted">
            <span className="flex items-center gap-1.5 text-primary font-medium font-mono text-[11px]">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-emerald animate-pulse" />
              14.8219° N, 120.2712° E · SUBIC BAY, PH
            </span>
            <span className="text-border-subtle select-none">|</span>
            {timeStr ? (
              <span className="font-mono text-accent-cyan/90 text-[11px]">
                PHT {timeStr} (UTC+8)
              </span>
            ) : (
              <span className="font-mono text-accent-cyan/90 text-[11px]">PHT (UTC+8)</span>
            )}
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-main border border-accent-emerald/30 text-[11px] text-accent-emerald font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-emerald animate-ping" />
            <span>AVAILABLE FOR ROLES &amp; PROJECTS</span>
          </div>
        </div>

        <div className="flex flex-col-reverse lg:flex-row justify-between items-start lg:items-center gap-10 lg:gap-14">
          {/* Left Column: Bio & Identity */}
          <div className="w-full max-w-2xl flex-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-main border border-accent-cyan/30 text-[11px] font-mono text-accent-cyan font-medium mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan animate-pulse" />
              <span>FULL-STACK &amp; AI SYSTEMS DEVELOPER</span>
            </div>

            <h1 className="text-2xl sm:text-4xl md:text-[44px] font-bold font-cyber text-primary tracking-wide mb-3 leading-tight uppercase">
              <ScrambleText text="RHODGE ESPERON" />
            </h1>

            <p className="text-muted text-sm sm:text-base leading-relaxed mb-6 max-w-xl font-sans">
              4th-year BS Information Technology student at Lyceum of Subic Bay specializing in production web systems, agentic AI workflows, and UI/UX engineering. Experienced in building high-reliability platforms, OCR processing pipelines, and low-latency audio applications.
            </p>

            {/* Core Capability Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6 text-xs">
              <div className="p-4 bg-secondary/80 border border-border-subtle rounded-xl hover:border-accent-cyan/40 hover:shadow-[0_0_12px_rgba(0,240,255,0.1)] transition-all duration-200 group">
                <div className="text-[11px] font-mono text-accent-cyan font-semibold mb-1.5 flex items-center justify-between">
                  <span>01 · Full-Stack</span>
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity">↗</span>
                </div>
                <div className="text-muted leading-snug font-sans text-xs">
                  Next.js, TypeScript, PostgreSQL RLS &amp; Supabase
                </div>
              </div>

              <div className="p-4 bg-secondary/80 border border-border-subtle rounded-xl hover:border-accent-amber/40 hover:shadow-[0_0_12px_rgba(245,158,11,0.1)] transition-all duration-200 group">
                <div className="text-[11px] font-mono text-accent-amber font-semibold mb-1.5 flex items-center justify-between">
                  <span>02 · Agentic AI</span>
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity">↗</span>
                </div>
                <div className="text-muted leading-snug font-sans text-xs">
                  LLM Workflows, OCR Engines &amp; Python Services
                </div>
              </div>

              <div className="p-4 bg-secondary/80 border border-border-subtle rounded-xl hover:border-primary/40 hover:shadow-[0_0_12px_rgba(255,255,255,0.08)] transition-all duration-200 group">
                <div className="text-[11px] font-mono text-primary font-semibold mb-1.5 flex items-center justify-between">
                  <span>03 · Interfaces</span>
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity">↗</span>
                </div>
                <div className="text-muted leading-snug font-sans text-xs">
                  Figma Design Systems, Web Audio &amp; PWAs
                </div>
              </div>
            </div>

            {/* Action Buttons Trio with Clean Chamfers */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-1">
              <a
                href="#projects"
                className="cyber-chamfer-btn bg-primary text-main font-cyber font-bold px-6 py-3 text-xs tracking-wider uppercase hover:bg-accent-cyan hover:text-black transition-all flex items-center gap-2 shadow-[0_0_16px_rgba(0,240,255,0.2)] active:scale-95 cursor-pointer"
              >
                <span>Explore Projects ↓</span>
              </a>

              <a
                href="/cv.html"
                target="_blank"
                rel="noopener noreferrer"
                className="cyber-chamfer-btn border border-border-subtle bg-secondary text-primary font-cyber font-medium px-5 py-3 text-xs tracking-wider uppercase hover:border-accent-cyan/60 hover:text-accent-cyan transition-all flex items-center gap-2 active:scale-95"
              >
                <span>View CV / Resume ↗</span>
              </a>

              <a
                href="#contact"
                className="text-muted hover:text-accent-cyan font-mono text-xs px-3 py-2.5 transition-colors flex items-center gap-1.5"
              >
                <span>Get In Touch →</span>
              </a>
            </div>
          </div>

          {/* Right Column: Cyber HUD Radar & Orbit Ring Frame */}
          <CyberHudRadar />
        </div>

        {/* High-Impact Animated Stats Grid */}
        <AnimatedStatsGrid />
      </section>

      {/* Featured Projects Section */}
      <section id="projects" className="scroll-mt-24">
        <div className="flex flex-col gap-1 mb-8 border-b border-border-subtle/80 pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan" />
              <h2 className="text-lg sm:text-2xl font-bold font-cyber text-primary tracking-wide uppercase">
                Featured Projects
              </h2>
            </div>
            <span className="hidden sm:inline-block font-mono text-[11px] text-muted border border-border-subtle px-2.5 py-0.5 rounded">
              Production Works
            </span>
          </div>
          <p className="text-xs sm:text-sm text-muted">
            Production web platforms, internal enterprise systems, and architecture highlights
          </p>
        </div>

        <Projects />
      </section>

      {/* Technical Inventory Section */}
      <section id="skills" className="scroll-mt-24">
        <div className="flex flex-col gap-1 mb-8 border-b border-border-subtle/80 pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-amber" />
              <h2 className="text-lg sm:text-2xl font-bold font-cyber text-primary tracking-wide uppercase">
                Technical Inventory
              </h2>
            </div>
            <span className="hidden sm:inline-block font-mono text-[11px] text-muted border border-border-subtle px-2.5 py-0.5 rounded">
              Core Tooling &amp; Stack
            </span>
          </div>
          <p className="text-xs sm:text-sm text-muted">
            Core technologies, backend databases, and specialization toolkits
          </p>
        </div>

        <Skills />
      </section>

      {/* Experience & Credentials Section */}
      <section id="credentials" className="scroll-mt-24">
        <div className="flex flex-col gap-1 mb-8 border-b border-border-subtle/80 pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan" />
              <h2 className="text-lg sm:text-2xl font-bold font-cyber text-primary tracking-wide uppercase">
                Experience &amp; Credentials
              </h2>
            </div>
            <span className="hidden sm:inline-block font-mono text-[11px] text-muted border border-border-subtle px-2.5 py-0.5 rounded">
              Milestones
            </span>
          </div>
          <p className="text-xs sm:text-sm text-muted">
            Industry internship, verified certifications, hackathons, and technical summits
          </p>
        </div>

        <Credentials />
      </section>

      {/* Activity Section */}
      <section id="activity" className="scroll-mt-24">
        <div className="flex flex-col gap-1 mb-8 border-b border-border-subtle/80 pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-emerald" />
              <h2 className="text-lg sm:text-2xl font-bold font-cyber text-primary tracking-wide uppercase">
                GitHub Activity
              </h2>
            </div>
            <span className="hidden sm:inline-block font-mono text-[11px] text-muted border border-border-subtle px-2.5 py-0.5 rounded">
              Live Contributions
            </span>
          </div>
          <p className="text-xs sm:text-sm text-muted">
            Live contribution frequency and activity telemetry
          </p>
        </div>

        <Activity />
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="scroll-mt-24 mb-16 flex flex-col items-center justify-center text-center relative py-14 md:py-20 px-6 overflow-hidden border border-border-subtle bg-secondary/80 backdrop-blur-md rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.5)]"
      >
        {/* Subtle Ambient Cyber Glow */}
        <div className="absolute w-80 h-80 rounded-full bg-accent-cyan/10 blur-3xl pointer-events-none -z-10 animate-pulse" />
        <div className="absolute w-60 h-60 rounded-full bg-accent-amber/5 blur-2xl pointer-events-none -z-10" />

        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold font-cyber text-primary mb-3 tracking-wide uppercase">
          Ready to engineer intelligent systems?
        </h2>
        <p className="text-muted max-w-lg mx-auto mb-8 text-xs md:text-sm leading-relaxed font-sans">
          Whether you need a scalable web application, an agentic AI workflow, or an accessible data system—let&apos;s build something resilient together.
        </p>

        {/* Action Button Row */}
        <div className="flex flex-wrap items-center justify-center gap-3 relative z-10 w-full max-w-md">
          {/* Primary CTA */}
          <a
            href="mailto:rhodgesperon@gmail.com"
            className="h-11 px-6 rounded-xl bg-primary text-main font-cyber font-bold text-xs tracking-wider uppercase hover:bg-accent-cyan hover:text-black transition-all flex items-center justify-center gap-2.5 shadow-[0_0_16px_rgba(0,240,255,0.2)] active:scale-95 cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span>Start Conversation</span>
          </a>

          {/* Icon Link: GitHub */}
          <a
            href="https://github.com/0xriyoru"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
            title="GitHub (0xriyoru)"
            className="w-11 h-11 rounded-xl border border-border-subtle bg-main text-muted hover:text-primary hover:border-accent-cyan/60 hover:bg-accent-cyan/10 transition-all flex items-center justify-center active:scale-95 shadow-xs"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
            </svg>
          </a>

          {/* Icon Link: LinkedIn */}
          <a
            href="https://www.linkedin.com/in/rhodge-esperon"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
            title="LinkedIn (Rhodge Esperon)"
            className="w-11 h-11 rounded-xl border border-border-subtle bg-main text-muted hover:text-accent-cyan hover:border-accent-cyan/60 hover:bg-accent-cyan/10 transition-all flex items-center justify-center active:scale-95 shadow-xs"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.64c-.95 0-1.72.78-1.72 1.73s.77 1.73 1.72 1.73c.96 0 1.73-.78 1.73-1.73s-.77-1.73-1.73-1.73Z" />
            </svg>
          </a>
        </div>

        {/* Direct Email Metadata Footer */}
        <div className="mt-8 pt-6 border-t border-border-subtle/60 w-full max-w-md flex items-center justify-between text-[11px] font-mono text-muted/80">
          <span>rhodgesperon@gmail.com</span>
          <span>SUBIC BAY, PH (UTC+8)</span>
        </div>
      </section>

      <PageViews />
    </div>
  );
}
