"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import PageViews from "@/components/PageViews";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Credentials from "@/components/Credentials";
import Activity from "@/components/Activity";

export default function Home() {
  return (
    <div className="flex flex-col gap-24 pb-24">
      {/* Hero Section */}
      <section id="about" className="pt-12 scroll-mt-24">
        <div className="flex gap-8 items-start mb-6">
          <div className="relative w-24 h-24 rounded-md overflow-hidden border-2 border-border-subtle shrink-0">
            <Image
              src="/profile.png"
              alt="Rhodge Esperon"
              fill
              className="object-cover grayscale hover:grayscale-0 transition-all duration-300"
            />
            <div className="absolute inset-0 bg-accent-cyan/10 mix-blend-overlay pointer-events-none" />
            {/* Halftone / scanline effect overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:4px_4px] opacity-20 mix-blend-overlay pointer-events-none" />
          </div>
          <div>
            <h1 className="text-4xl font-mono font-bold text-primary mb-2 flex items-center">
              Rhodge Esperon
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ repeat: Infinity, duration: 1 }}
                className="ml-2 w-3 h-8 bg-accent-yellow inline-block"
              />
            </h1>
            <p className="text-xl text-accent-cyan font-mono mb-4">AI Engineer & Cybersecurity Specialist</p>
          </div>
        </div>
        <p className="text-muted leading-relaxed mb-6 max-w-2xl">
          BSIT Student at Lyceum of Subic Bay. Building intelligent systems and securing them.
          Transitioning into advanced cybersecurity and agentic AI.
        </p>
        <div className="flex flex-wrap gap-4 font-mono text-sm">
          <div className="px-3 py-1 bg-secondary border border-border-subtle rounded-md text-accent-yellow shadow-[0_0_10px_rgba(252,238,9,0.1)]">
            Hackathons: 3+
          </div>
          <div className="px-3 py-1 bg-secondary border border-border-subtle rounded-md text-accent-cyan shadow-[0_0_10px_rgba(0,240,255,0.1)]">
            ISC2 Candidate
          </div>
          <div className="px-3 py-1 bg-secondary border border-border-subtle rounded-md text-accent-pink shadow-[0_0_10px_rgba(255,0,60,0.1)]">
            Google Cyber Cert
          </div>
        </div>
      </section>


      {/* Projects Section */}
      <section id="projects" className="scroll-mt-24">
        <h2 className="text-2xl font-mono font-bold mb-8 text-primary flex items-center gap-2">
          <span className="text-accent-yellow">#</span> Projects
        </h2>

        <Projects />
      </section>

      {/* Skills Section */}
      <section id="skills" className="scroll-mt-24">
        <h2 className="text-2xl font-mono font-bold mb-8 text-primary flex items-center gap-2">
          <span className="text-accent-pink">#</span> Skills
        </h2>
        <Skills />
      </section>

      {/* Credentials Section */}
      <section id="credentials" className="scroll-mt-24">
        <h2 className="text-2xl font-mono font-bold mb-8 text-primary flex items-center gap-2">
          <span className="text-accent-cyan">#</span> Credentials
        </h2>
        <Credentials />
      </section>

      {/* Activity Section */}
      <section id="activity" className="scroll-mt-24">
        <h2 className="text-2xl font-mono font-bold mb-8 text-primary flex items-center gap-2">
          <span className="text-accent-yellow">#</span> Activity
        </h2>
        <Activity />
      </section>

      {/* Contact Section */}
      <section id="contact" className="scroll-mt-24 mb-32 flex flex-col items-center justify-center text-center relative py-24 overflow-hidden border border-border-subtle bg-secondary cyber-card">
        {/* Decorative background circle/crosshair */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-10">
          <div className="w-[300px] md:w-[500px] h-[300px] md:h-[500px] rounded-full border border-accent-cyan" />
          <div className="absolute w-[400px] md:w-[600px] h-[400px] md:h-[600px] rounded-full border border-border-subtle border-dashed" />
        </div>

        <div className="text-xs font-mono text-accent-yellow mb-6 tracking-widest">FINAL TRANSMISSION / 06</div>
        <h2 className="text-4xl md:text-5xl font-bold font-mono text-primary mb-6">
          HAVE A SYSTEM TO SECURE?
        </h2>
        <p className="text-muted max-w-xl mx-auto mb-10 text-sm md:text-base px-6">
          I'm ready to learn, contribute, and turn complex security vulnerabilities into fortified,
          resilient infrastructure.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center relative z-10 w-full sm:w-auto px-6">
          <a
            href="mailto:rhodgesperon@gmail.com"
            className="w-full sm:w-auto bg-accent-cyan text-main font-bold font-mono px-6 py-3 hover:bg-accent-yellow transition-colors cyber-button"
          >
            START A CONVERSATION
          </a>
          <a
            href="https://github.com/0xriyoru"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto border border-border-subtle bg-main text-primary font-mono px-6 py-3 hover:border-accent-cyan transition-colors cyber-button"
          >
            GITHUB
          </a>
          <a
            href="https://www.linkedin.com/in/rhodge-esperon"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto border border-border-subtle bg-main text-primary font-mono px-6 py-3 hover:border-accent-pink transition-colors cyber-button"
          >
            LINKEDIN
          </a>
        </div>
      </section>

      <PageViews />
    </div>
  );
}
