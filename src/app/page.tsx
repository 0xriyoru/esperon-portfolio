"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import PageViews from "@/components/PageViews";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Credentials from "@/components/Credentials";
import Activity from "@/components/Activity";

export default function Home() {
  const [timeStr, setTimeStr] = useState<string>("");
  const [copiedEmail, setCopiedEmail] = useState(false);

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

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("rhodgesperon@gmail.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <div className="flex flex-col gap-20 sm:gap-28 pb-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Hero / Profile Section */}
      <section id="profile" className="pt-8 sm:pt-14 pb-4 scroll-mt-24 relative">
        {/* Top Status Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs border-b border-border-subtle pb-4 mb-10">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-muted">
            <span className="flex items-center gap-1.5 text-primary font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-emerald animate-pulse" />
              Subic Bay &amp; Olongapo, PH
            </span>
            <span>•</span>
            {timeStr ? (
              <span className="font-mono text-accent-cyan/90">
                PHT {timeStr} [UTC+8]
              </span>
            ) : (
              <span className="font-mono text-accent-cyan/90">PHT [UTC+8]</span>
            )}
          </div>

          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-accent-emerald/10 border border-accent-emerald/20 text-[11px] text-accent-emerald font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-emerald" />
            <span>Available for roles &amp; contracts</span>
          </div>
        </div>

        <div className="flex flex-col-reverse lg:flex-row justify-between items-start lg:items-center gap-10 lg:gap-14">
          {/* Left Column: Bio & Identity */}
          <div className="w-full max-w-2xl flex-1">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-main border border-border-subtle text-[11px] font-mono text-accent-cyan font-medium mb-4">
              <span>Full-Stack &amp; AI Systems Engineer</span>
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold font-sans text-primary tracking-tight mb-4 leading-[1.1]">
              Rhodge Esperon
            </h1>

            <p className="text-muted text-sm sm:text-base leading-relaxed mb-8 max-w-xl font-sans">
              4th-year IT student at Lyceum of Subic Bay specializing in production web systems, agentic AI workflows, and UI/UX engineering. Experienced in building high-reliability platforms—from internal government asset systems at SBMA to OCR processing pipelines and low-latency audio applications.
            </p>

            {/* Core Capability Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8 text-xs">
              <div className="p-4 bg-secondary/80 border border-border-subtle rounded-xl hover:border-border-hover transition-all duration-200">
                <div className="text-[11px] font-mono text-accent-cyan font-semibold mb-1">
                  Full-Stack Systems
                </div>
                <div className="text-muted leading-snug">
                  Next.js, TypeScript, PostgreSQL RLS &amp; Supabase
                </div>
              </div>

              <div className="p-4 bg-secondary/80 border border-border-subtle rounded-xl hover:border-border-hover transition-all duration-200">
                <div className="text-[11px] font-mono text-accent-amber font-semibold mb-1">
                  Agentic AI &amp; Pipelines
                </div>
                <div className="text-muted leading-snug">
                  LLM Workflows, OCR Engines &amp; Python Services
                </div>
              </div>

              <div className="p-4 bg-secondary/80 border border-border-subtle rounded-xl hover:border-border-hover transition-all duration-200">
                <div className="text-[11px] font-mono text-primary font-semibold mb-1">
                  Interface &amp; Audio Craft
                </div>
                <div className="text-muted leading-snug">
                  Figma Design Systems, Web Audio &amp; PWAs
                </div>
              </div>
            </div>

            {/* Action Buttons Trio */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-1">
              <a
                href="#projects"
                className="bg-primary text-main font-medium px-5 py-2.5 text-xs sm:text-sm rounded-lg hover:opacity-90 transition-all flex items-center gap-2 shadow-sm active:scale-95"
              >
                <span>Explore Projects</span>
                <span>↓</span>
              </a>
              <a
                href="/cv.html"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-border-subtle bg-secondary text-primary px-5 py-2.5 text-xs sm:text-sm rounded-lg hover:border-border-hover hover:bg-secondary/80 transition-all flex items-center gap-2 active:scale-95 font-medium"
              >
                <span>View CV / Resume</span>
                <span>↗</span>
              </a>
              <a
                href="#contact"
                className="text-muted hover:text-primary px-4 py-2.5 text-xs sm:text-sm transition-colors font-medium"
              >
                <span>Get in Touch →</span>
              </a>
            </div>
          </div>

          {/* Right Column: Refined Portrait Card */}
          <div className="relative shrink-0 mx-auto lg:mx-0 flex items-center justify-center py-2">
            {/* Ambient Back Glow */}
            <div className="absolute w-56 h-56 rounded-full bg-accent-cyan/15 blur-3xl pointer-events-none -z-10" />

            <div className="relative p-2 rounded-2xl border border-border-subtle bg-secondary/50 shadow-xl backdrop-blur-sm">
              <div className="relative w-56 sm:w-64 h-64 sm:h-72 rounded-xl overflow-hidden group">
                <Image
                  src="/profile.png"
                  alt="Rhodge Esperon"
                  fill
                  priority
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                {/* Bottom Caption Pill */}
                <div className="absolute bottom-3 left-3 right-3 bg-black/70 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-lg flex items-center justify-between text-[11px] font-mono">
                  <span className="text-white font-medium">SBMA IT Alumni</span>
                  <span className="text-accent-cyan">BSIT &apos;27</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section id="projects" className="scroll-mt-24">
        <div className="flex flex-col gap-1 mb-8 border-b border-border-subtle pb-4">
          <h2 className="text-2xl font-bold font-sans text-primary tracking-tight">
            Featured Projects
          </h2>
          <p className="text-xs sm:text-sm text-muted">
            Production web platforms, internal government systems, and architecture highlights
          </p>
        </div>

        <Projects />
      </section>

      {/* Technical Inventory Section */}
      <section id="skills" className="scroll-mt-24">
        <div className="flex flex-col gap-1 mb-8 border-b border-border-subtle pb-4">
          <h2 className="text-2xl font-bold font-sans text-primary tracking-tight">
            Technical Inventory
          </h2>
          <p className="text-xs sm:text-sm text-muted">
            Core technologies, backend databases, and specialization toolkits
          </p>
        </div>

        <Skills />
      </section>

      {/* Experience & Credentials Section */}
      <section id="credentials" className="scroll-mt-24">
        <div className="flex flex-col gap-1 mb-8 border-b border-border-subtle pb-4">
          <h2 className="text-2xl font-bold font-sans text-primary tracking-tight">
            Experience &amp; Milestones
          </h2>
          <p className="text-xs sm:text-sm text-muted">
            Government internship, verified certifications, hackathons, and technical summits
          </p>
        </div>

        <Credentials />
      </section>

      {/* Activity Section */}
      <section id="activity" className="scroll-mt-24">
        <div className="flex flex-col gap-1 mb-8 border-b border-border-subtle pb-4">
          <h2 className="text-2xl font-bold font-sans text-primary tracking-tight">
            GitHub Transmission
          </h2>
          <p className="text-xs sm:text-sm text-muted">
            Live contribution frequency and activity telemetry
          </p>
        </div>

        <Activity />
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="scroll-mt-24 mb-16 flex flex-col items-center justify-center text-center relative py-12 md:py-16 px-6 overflow-hidden border border-border-subtle bg-secondary/80 rounded-2xl shadow-lg"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-cyan/10 border border-accent-cyan/20 text-accent-cyan text-xs font-mono mb-4">
          <span>Let&apos;s Build Together</span>
        </div>

        <h2 className="text-2xl md:text-3xl font-bold font-sans text-primary mb-3 tracking-tight">
          Ready to engineer intelligent systems?
        </h2>
        <p className="text-muted max-w-lg mx-auto mb-8 text-xs md:text-sm leading-relaxed">
          Whether you need a scalable web application, an agentic AI workflow, or an accessible data system—let&apos;s build something resilient together.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center relative z-10 w-full sm:w-auto">
          <a
            href="mailto:rhodgesperon@gmail.com"
            className="w-full sm:w-auto bg-primary text-main font-medium px-5 py-2.5 text-xs sm:text-sm rounded-lg hover:opacity-90 transition-all flex items-center justify-center gap-2 active:scale-95 shadow-sm"
          >
            <span>Start a Conversation</span>
            <span>✉</span>
          </a>

          <button
            onClick={handleCopyEmail}
            className="w-full sm:w-auto border border-border-subtle bg-main text-muted hover:text-primary px-4 py-2.5 text-xs sm:text-sm rounded-lg transition-colors font-mono cursor-pointer"
          >
            {copiedEmail ? "✓ Copied to clipboard" : "Copy Email"}
          </button>

          <a
            href="https://github.com/0xriyoru"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto border border-border-subtle bg-main text-muted hover:text-primary px-4 py-2.5 text-xs sm:text-sm rounded-lg transition-colors font-mono"
          >
            GitHub ↗
          </a>

          <a
            href="https://www.linkedin.com/in/rhodge-esperon"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto border border-border-subtle bg-main text-muted hover:text-primary px-4 py-2.5 text-xs sm:text-sm rounded-lg transition-colors font-mono"
          >
            LinkedIn ↗
          </a>
        </div>
      </section>

      <PageViews />
    </div>
  );
}
