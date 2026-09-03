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
            <span className="flex items-center gap-2 text-accent-cyan font-bold">
              <span className="w-2 h-2 rounded-full bg-accent-cyan animate-pulse shadow-[0_0_8px_rgba(0,240,255,0.8)]" />
              SYSTEM // ONLINE
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
          <div className="text-[10px] sm:text-[11px] text-accent-yellow tracking-widest uppercase">
            CLEARANCE: L4 // AGENTIC AI & FULL-STACK
          </div>
        </div>

        <div className="flex flex-col-reverse lg:flex-row justify-between items-start lg:items-center gap-10 lg:gap-12">
          {/* Left Column: Bio & Core Info */}
          <div className="w-full max-w-2xl flex-1">
            <div className="text-xs font-mono text-accent-pink tracking-widest uppercase mb-2 flex items-center gap-2">
              <span>&gt; INITIALIZING OPERATOR DATA</span>
              <span className="w-2 h-3 bg-accent-pink inline-block animate-pulse" />
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
              I am a 4th year student at Lyceum of Subic Bay specializing in AI agents, backend systems, and UI/UX engineering. Focused on transforming complex data into robust, production-grade applications.
            </p>

            {/* Core Capability HUD Chips */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8 font-mono text-xs">
              <div className="p-3 bg-secondary/80 border border-border-subtle hover:border-accent-cyan transition-colors">
                <div className="text-[10px] text-accent-cyan mb-1 font-bold">01 // AI & BACKEND</div>
                <div className="text-primary">Agentic LLMs, Node & Next.js</div>
              </div>
              <div className="p-3 bg-secondary/80 border border-border-subtle hover:border-accent-yellow transition-colors">
                <div className="text-[10px] text-accent-yellow mb-1 font-bold">02 // UI/UX DESIGN</div>
                <div className="text-primary">Figma, Systems & Prototyping</div>
              </div>
              <div className="p-3 bg-secondary/80 border border-border-subtle hover:border-accent-pink transition-colors">
                <div className="text-[10px] text-accent-pink mb-1 font-bold">03 // DATABASES</div>
                <div className="text-primary">PostgreSQL, Supabase & APIs</div>
              </div>
            </div>

            {/* Action Buttons Trio */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 font-mono pt-1">
              <a
                href="#projects"
                className="bg-accent-cyan text-main font-bold px-5 py-3 text-xs sm:text-sm hover:bg-accent-yellow transition-all cyber-button flex items-center gap-2 active:scale-95 shadow-[0_0_15px_rgba(0,240,255,0.25)] whitespace-nowrap"
              >
                <span>EXPLORE PROJECTS</span>
                <span>↗</span>
              </a>
              <a
                href="/cv.html"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-accent-cyan/50 bg-secondary text-accent-cyan px-5 py-3 text-xs sm:text-sm hover:border-accent-yellow hover:text-accent-yellow transition-all cyber-button active:scale-95 flex items-center gap-2 whitespace-nowrap"
              >
                <span>VIEW CV / RESUME</span>
                <span>↗</span>
              </a>
              <a
                href="#contact"
                className="border border-border-subtle bg-secondary text-primary px-5 py-3 text-xs sm:text-sm hover:border-accent-pink hover:text-accent-pink transition-all cyber-button active:scale-95 whitespace-nowrap"
              >
                <span>TRANSMIT MESSAGE</span>
              </a>
            </div>
          </div>

          {/* Right Column: Floating Cyberpunk HUD Portrait with Full Circular Orbit Rings */}
          <div className="relative shrink-0 mx-auto lg:mx-0 flex items-center justify-center py-6 px-6">
            {/* Ambient Radial Glow */}
            <div className="absolute w-60 sm:w-80 h-60 sm:h-80 rounded-full bg-accent-cyan/15 blur-3xl pointer-events-none -z-10" />

            {/* Target Laser Crosshairs */}
            <div className="absolute w-[320px] sm:w-[390px] h-[1px] bg-gradient-to-r from-transparent via-accent-cyan/30 to-transparent pointer-events-none" />
            <div className="absolute h-[320px] sm:h-[390px] w-[1px] bg-gradient-to-b from-transparent via-accent-cyan/30 to-transparent pointer-events-none" />

            {/* Inner Ring: Concentric Stationary HUD Circle */}
            <div className="absolute w-[240px] sm:w-[280px] h-[240px] sm:h-[280px] rounded-full border border-border-subtle/80 pointer-events-none" />

            {/* Middle Ring: Active Spinning Dashed Cyan Ring with Orbital Nodes */}
            <div className="absolute w-[270px] sm:w-[325px] h-[270px] sm:h-[325px] rounded-full border-2 border-accent-cyan/50 border-dashed pointer-events-none animate-[spin_30s_linear_infinite] shadow-[0_0_15px_rgba(0,240,255,0.2)]">
              {/* Glowing Orbital Node 1 (North) */}
              <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-accent-cyan shadow-[0_0_10px_rgba(0,240,255,1)]" />
              {/* Glowing Orbital Node 2 (South) */}
              <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-accent-yellow shadow-[0_0_10px_rgba(252,238,9,1)]" />
            </div>

            {/* Outer Ring: Reverse Spinning Dotted Ring with Accent Markers */}
            <div className="absolute w-[305px] sm:w-[365px] h-[305px] sm:h-[365px] rounded-full border border-accent-yellow/35 border-dotted pointer-events-none animate-[spin_55s_linear_infinite_reverse]">
              {/* Glowing Orbital Node 3 (West) */}
              <div className="absolute top-1/2 -left-1.5 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-accent-pink shadow-[0_0_8px_rgba(255,0,60,1)]" />
              {/* Glowing Orbital Node 4 (East) */}
              <div className="absolute top-1/2 -right-1.5 -translate-y-1/2 w-2 h-2 rounded-full bg-accent-cyan shadow-[0_0_8px_rgba(0,240,255,1)]" />
            </div>

            {/* Operator Badge on top */}
            <div className="absolute -top-1 left-4 bg-secondary border border-border-subtle px-2.5 py-0.5 font-mono text-[9px] text-accent-cyan tracking-widest z-20 flex items-center gap-1.5 shadow-[0_0_8px_rgba(0,240,255,0.2)]">
              <span className="w-1.5 h-1.5 bg-accent-cyan rounded-full animate-pulse" />
              OPERATOR // 0XRIYORU
            </div>

            {/* Portrait Image Container */}
            <div className="relative w-52 sm:w-60 h-60 sm:h-72 border-2 border-border-subtle bg-secondary cyber-card overflow-hidden z-10 group shadow-[0_0_30px_rgba(0,0,0,0.8)]">
              <Image
                src="/profile.png"
                alt="Rhodge Esperon"
                fill
                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-accent-cyan/10 mix-blend-overlay pointer-events-none" />
              <div className="absolute inset-0 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:4px_4px] opacity-20 mix-blend-overlay pointer-events-none" />

              {/* Cyber corner brackets */}
              <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-accent-cyan pointer-events-none" />
              <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-accent-pink pointer-events-none" />
            </div>

            {/* Status Metric Badge */}
            <div className="absolute -bottom-1 right-4 bg-main border border-border-subtle px-2.5 py-0.5 font-mono text-[9px] text-muted tracking-wider z-20 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan animate-pulse" />
              STATUS: ONLINE & READY
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
      <section id="contact" className="scroll-mt-24 mb-16 flex flex-col items-center justify-center text-center relative py-12 md:py-16 overflow-hidden border border-border-subtle bg-secondary cyber-card">
        {/* Decorative background circle/crosshair */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-10">
          <div className="w-[200px] md:w-[320px] h-[200px] md:h-[320px] rounded-full border border-accent-cyan" />
          <div className="absolute w-[280px] md:w-[440px] h-[280px] md:h-[440px] rounded-full border border-border-subtle border-dashed" />
        </div>

        <div className="text-[11px] font-mono text-accent-yellow mb-3 tracking-widest">FINAL TRANSMISSION / 06</div>
        <h2 className="text-2xl md:text-3xl font-bold font-mono text-primary mb-3">
          HAVE A SYSTEM TO SECURE?
        </h2>
        <p className="text-muted max-w-lg mx-auto mb-8 text-xs md:text-sm px-6 leading-relaxed">
          I&apos;m ready to learn, contribute, and turn complex security vulnerabilities into fortified,
          resilient infrastructure.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center relative z-10 w-full sm:w-auto px-6">
          <a
            href="mailto:rhodgesperon@gmail.com"
            className="w-full sm:w-auto bg-accent-cyan text-main font-bold font-mono px-5 py-2.5 text-xs hover:bg-accent-yellow transition-colors cyber-button active:scale-95"
          >
            START A CONVERSATION
          </a>
          <a
            href="https://github.com/0xriyoru"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto border border-border-subtle bg-main text-primary font-mono px-5 py-2.5 text-xs hover:border-accent-cyan transition-colors cyber-button active:scale-95"
          >
            GITHUB
          </a>
          <a
            href="https://www.linkedin.com/in/rhodge-esperon"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto border border-border-subtle bg-main text-primary font-mono px-5 py-2.5 text-xs hover:border-accent-pink transition-colors cyber-button active:scale-95"
          >
            LINKEDIN
          </a>
        </div>
      </section>

      <PageViews />
    </div>
  );
}
