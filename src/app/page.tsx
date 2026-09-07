"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import PageViews from "@/components/PageViews";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Credentials from "@/components/Credentials";
import Activity from "@/components/Activity";

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
    <div className="flex flex-col gap-16 sm:gap-24 pb-24">
      {/* Hero / Profile Section (Open Canvas Layout) */}
      <section id="profile" className="pt-6 sm:pt-10 pb-8 scroll-mt-24 relative">
        {/* Top Telemetry Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 font-mono text-xs border-b border-border-subtle pb-4 mb-8">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <span className="flex items-center gap-2 text-accent-cyan font-semibold">
              <span className="w-2 h-2 rounded-full bg-accent-cyan shadow-[0_0_8px_rgba(6,182,212,0.6)]" />
              SYSTEM // READY
            </span>
            <span className="text-muted">|</span>
            <span className="text-muted hidden sm:inline">LOC: OLONGAPO / SUBIC BAY, PH</span>
            {timeStr && (
              <>
                <span className="text-muted hidden md:inline">|</span>
                <span className="text-accent-cyan/90 hidden md:inline font-mono">
                  PHT // {timeStr} [UTC+8]
                </span>
              </>
            )}
          </div>
          <div className="text-[10px] sm:text-[11px] text-accent-yellow font-medium tracking-wider uppercase flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-yellow" />
            AVAILABILITY: OPEN FOR ROLES & CONTRACTS
          </div>
        </div>

        <div className="flex flex-col-reverse lg:flex-row justify-between items-start lg:items-center gap-10 lg:gap-12">
          {/* Left Column: Bio & Core Info */}
          <div className="w-full max-w-2xl flex-1">
            <div className="text-xs font-mono text-accent-cyan tracking-widest uppercase mb-2 flex items-center gap-2">
              <span>// ENGINEERING SYSTEMS ARCHITECTURE</span>
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-mono font-black text-primary tracking-tighter uppercase mb-3 leading-tight sm:leading-none">
              RHODGE ESPERON
            </h1>

            <div className="text-xs sm:text-sm font-mono text-accent-cyan tracking-wider uppercase mb-6 flex flex-wrap items-center gap-2">
              <span>BSIT 4TH YEAR @ LYCEUM OF SUBIC BAY</span>
              <span className="text-muted">•</span>
              <span className="text-primary font-bold">AI & FULL-STACK DEVELOPER</span>
            </div>

            <p className="text-muted text-xs sm:text-sm md:text-base leading-relaxed mb-6 max-w-xl font-sans">
              AI &amp; Full-Stack Developer and 4th-year IT student specializing in agentic AI workflows, backend system architecture, and UI/UX engineering. Experienced in delivering production systems—from internal government asset platforms at SBMA to low-latency Web Audio engines and OCR pipelines.
            </p>

            {/* Core Capability HUD Chips */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8 font-mono text-xs">
              <div className="p-3.5 bg-secondary border border-border-subtle rounded-md hover:border-accent-cyan/60 transition-colors">
                <div className="text-[10px] text-accent-cyan mb-1 font-bold tracking-wider">01 // AI & BACKEND</div>
                <div className="text-primary font-medium">Agentic LLMs, Node & Next.js</div>
              </div>
              <div className="p-3.5 bg-secondary border border-border-subtle rounded-md hover:border-accent-yellow/60 transition-colors">
                <div className="text-[10px] text-accent-yellow mb-1 font-bold tracking-wider">02 // UI/UX DESIGN</div>
                <div className="text-primary font-medium">Figma, Design Systems & Prototyping</div>
              </div>
              <div className="p-3.5 bg-secondary border border-border-subtle rounded-md hover:border-accent-pink/60 transition-colors">
                <div className="text-[10px] text-accent-pink mb-1 font-bold tracking-wider">03 // DATABASES</div>
                <div className="text-primary font-medium">PostgreSQL, Supabase & APIs</div>
              </div>
            </div>

            {/* Action Buttons Trio */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 font-mono pt-1">
              <a
                href="#projects"
                className="bg-accent-cyan text-main font-bold px-5 py-2.5 text-xs sm:text-sm hover:brightness-110 transition-all cyber-button flex items-center gap-2 active:scale-95 shadow-[0_0_15px_rgba(6,182,212,0.25)] whitespace-nowrap"
              >
                <span>EXPLORE PROJECTS</span>
                <span>↗</span>
              </a>
              <a
                href="/cv.html"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-border-subtle bg-secondary text-primary px-5 py-2.5 text-xs sm:text-sm hover:border-accent-cyan hover:text-accent-cyan transition-all cyber-button active:scale-95 flex items-center gap-2 whitespace-nowrap"
              >
                <span>VIEW CV / RESUME</span>
                <span>↗</span>
              </a>
              <a
                href="#contact"
                className="border border-border-subtle bg-secondary text-muted hover:text-primary px-5 py-2.5 text-xs sm:text-sm hover:border-accent-yellow transition-all cyber-button active:scale-95 whitespace-nowrap"
              >
                <span>GET IN TOUCH ↗</span>
              </a>
            </div>
          </div>

          {/* Right Column: Hardware Schematic Frame */}
          <div className="relative shrink-0 mx-auto lg:mx-0 flex items-center justify-center py-4 px-4">
            {/* Ambient Radial Lighting */}
            <div className="absolute w-64 h-64 rounded-full bg-accent-cyan/10 blur-3xl pointer-events-none -z-10" />

            {/* Precision Schematic Boundary Container */}
            <div className="relative p-2.5 border border-border-subtle bg-secondary/40 rounded-xl">
              {/* Corner Calibration Marks */}
              <span className="absolute -top-1.5 -left-1.5 font-mono text-accent-cyan/60 text-xs leading-none select-none">+</span>
              <span className="absolute -top-1.5 -right-1.5 font-mono text-accent-cyan/60 text-xs leading-none select-none">+</span>
              <span className="absolute -bottom-1.5 -left-1.5 font-mono text-accent-cyan/60 text-xs leading-none select-none">+</span>
              <span className="absolute -bottom-1.5 -right-1.5 font-mono text-accent-cyan/60 text-xs leading-none select-none">+</span>

              {/* Header Telemetry Badge */}
              <div className="flex items-center justify-between gap-3 px-3 py-1.5 mb-2 border border-border-subtle bg-main/80 rounded font-mono text-[9px] text-muted">
                <span className="flex items-center gap-1.5 text-accent-cyan font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan" />
                  OPERATOR // 0XRIYORU
                </span>
                <span className="tracking-wider">ID: RE-2026</span>
              </div>

              {/* Portrait Image Container */}
              <div className="relative w-56 sm:w-64 h-64 sm:h-76 border border-border-subtle bg-secondary rounded-lg overflow-hidden group shadow-[0_8px_30px_rgba(0,0,0,0.5)]">
                <Image
                  src="/profile.png"
                  alt="Rhodge Esperon"
                  fill
                  priority
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-main/70 via-transparent to-transparent pointer-events-none" />

                {/* Subic Bay Intern & BSIT Badge at image bottom */}
                <div className="absolute bottom-2.5 left-2.5 right-2.5 bg-main/90 backdrop-blur-sm border border-border-subtle px-2.5 py-1 rounded font-mono text-[9px] flex items-center justify-between">
                  <span className="text-primary font-semibold">SBMA IT INTERN ALUMNI</span>
                  <span className="text-accent-yellow">BSIT &apos;27</span>
                </div>
              </div>

              {/* Footer Telemetry Badge */}
              <div className="flex items-center justify-between px-3 py-1.5 mt-2 border border-border-subtle bg-main/80 rounded font-mono text-[9px] text-muted">
                <span className="text-muted tracking-wider">FULL-STACK & AI AGENTS</span>
                <span className="text-accent-cyan font-medium flex items-center gap-1">
                  <span className="w-1 h-1 rounded-full bg-accent-cyan animate-ping" />
                  AVAILABLE
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Projects Section */}
      <section id="projects" className="scroll-mt-24">
        <div className="flex items-center gap-3 mb-8 border-b border-border-subtle pb-3">
          <span className="text-xs font-mono text-accent-yellow font-bold">// 02_</span>
          <h2 className="text-xl sm:text-2xl font-mono font-bold text-primary tracking-wide">
            FEATURED_PROJECTS
          </h2>
        </div>

        <Projects />
      </section>

      {/* Skills Section */}
      <section id="skills" className="scroll-mt-24">
        <div className="flex items-center gap-3 mb-8 border-b border-border-subtle pb-3">
          <span className="text-xs font-mono text-accent-pink font-bold">// 03_</span>
          <h2 className="text-xl sm:text-2xl font-mono font-bold text-primary tracking-wide">
            TECHNICAL_INVENTORY
          </h2>
        </div>

        <Skills />
      </section>

      {/* Credentials Section */}
      <section id="credentials" className="scroll-mt-24">
        <div className="flex items-center gap-3 mb-8 border-b border-border-subtle pb-3">
          <span className="text-xs font-mono text-accent-cyan font-bold">// 04_</span>
          <h2 className="text-xl sm:text-2xl font-mono font-bold text-primary tracking-wide">
            EXPERIENCE_&_SEMINARS
          </h2>
        </div>

        <Credentials />
      </section>

      {/* Activity Section */}
      <section id="activity" className="scroll-mt-24">
        <div className="flex items-center gap-3 mb-8 border-b border-border-subtle pb-3">
          <span className="text-xs font-mono text-accent-yellow font-bold">// 05_</span>
          <h2 className="text-xl sm:text-2xl font-mono font-bold text-primary tracking-wide">
            GITHUB_TRANSMISSION
          </h2>
        </div>

        <Activity />
      </section>

      {/* Contact Section */}
      <section id="contact" className="scroll-mt-24 mb-16 flex flex-col items-center justify-center text-center relative py-12 md:py-16 overflow-hidden border border-border-subtle bg-secondary rounded-xl">
        <div className="text-[11px] font-mono text-accent-cyan mb-3 tracking-widest uppercase">// 06_GET_IN_TOUCH</div>
        <h2 className="text-2xl md:text-3xl font-bold font-mono text-primary mb-3">
          READY TO BUILD INTELLIGENT SYSTEMS?
        </h2>
        <p className="text-muted max-w-lg mx-auto mb-8 text-xs md:text-sm px-6 leading-relaxed">
          Whether you need an enterprise web system, an agentic AI workflow, or an accessible data system—let&apos;s build something robust together.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center relative z-10 w-full sm:w-auto px-6">
          <a
            href="mailto:rhodgesperon@gmail.com"
            className="w-full sm:w-auto bg-accent-cyan text-main font-bold font-mono px-5 py-2.5 text-xs hover:brightness-110 transition-all cyber-button active:scale-95 shadow-[0_0_12px_rgba(6,182,212,0.25)]"
          >
            START A CONVERSATION
          </a>
          <a
            href="https://github.com/0xriyoru"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto border border-border-subtle bg-main text-primary font-mono px-5 py-2.5 text-xs hover:border-accent-cyan transition-colors cyber-button active:scale-95"
          >
            GITHUB ↗
          </a>
          <a
            href="https://www.linkedin.com/in/rhodge-esperon"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto border border-border-subtle bg-main text-primary font-mono px-5 py-2.5 text-xs hover:border-accent-yellow transition-colors cyber-button active:scale-95"
          >
            LINKEDIN ↗
          </a>
        </div>
      </section>

      <PageViews />
    </div>
  );
}
