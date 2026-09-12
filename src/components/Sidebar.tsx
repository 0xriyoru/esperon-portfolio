"use client";

import { useEffect, useState } from "react";
import ThemeToggle from "@/components/ThemeToggle";

const navItems = [
  { id: "01", name: "Profile", path: "profile" },
  { id: "02", name: "Projects", path: "projects" },
  { id: "03", name: "Skills", path: "skills" },
  { id: "04", name: "Experience", path: "credentials" },
  { id: "05", name: "Activity", path: "activity" },
  { id: "06", name: "Contact", path: "contact" },
];

export default function Sidebar() {
  const [activeSection, setActiveSection] = useState("profile");

  useEffect(() => {
    const mainEl = document.querySelector("main");
    if (!mainEl) return;

    const handleScroll = () => {
      // If near bottom of main container, activate 'contact'
      if (mainEl.scrollHeight - mainEl.scrollTop - mainEl.clientHeight < 120) {
        setActiveSection("contact");
        return;
      }

      const scrollPosition = mainEl.scrollTop + 180;

      for (let i = navItems.length - 1; i >= 0; i--) {
        const item = navItems[i];
        const element = document.getElementById(item.path);
        if (element) {
          const top = element.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(item.path);
            break;
          }
        }
      }
    };

    mainEl.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => mainEl.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    setActiveSection(path);
    const element = document.getElementById(path);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      window.history.pushState(null, "", `#${path}`);
    }
  };

  return (
    <aside className="hidden lg:flex w-[260px] shrink-0 h-screen sticky top-0 bg-secondary/95 backdrop-blur-md flex-col justify-between border-r border-border-subtle p-6 z-20 shadow-[4px_0_24px_rgba(0,0,0,0.3)]">
      <div>
        {/* Brand / Identity */}
        <div className="mb-8">
          <h1 className="font-cyber text-base sm:text-lg text-primary font-bold tracking-wide uppercase">
            Rhodge Esperon
          </h1>
          <p className="text-xs text-muted mt-1 font-sans">
            Full-Stack &amp; AI Systems Developer
          </p>

          {/* Status Badge with Live Equalizer Animation */}
          <div className="mt-3 inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-main border border-border-subtle text-[11px] text-accent-emerald font-sans">
            {/* 3-bar live equalizer */}
            <span className="flex items-end gap-[2px] h-3 w-3 select-none">
              <span className="w-[2px] bg-accent-emerald rounded-full animate-[eq-bounce-1_1.2s_ease-in-out_infinite]" />
              <span className="w-[2px] bg-accent-emerald rounded-full animate-[eq-bounce-2_1s_ease-in-out_infinite]" />
              <span className="w-[2px] bg-accent-emerald rounded-full animate-[eq-bounce-3_1.4s_ease-in-out_infinite]" />
            </span>
            <span className="font-medium">Available for roles</span>
          </div>
        </div>

        {/* Navigation Matrix */}
        <nav className="flex flex-col gap-1">
          {navItems.map((item) => {
            const isActive = activeSection === item.path;

            return (
              <a
                key={item.path}
                href={`#${item.path}`}
                onClick={(e) => handleClick(e, item.path)}
                className={`relative text-xs px-3.5 py-2.5 flex items-center justify-between transition-all duration-150 rounded-lg group ${
                  isActive
                    ? "text-primary font-semibold bg-main border border-border-subtle shadow-sm translate-x-0.5"
                    : "text-muted hover:text-primary hover:bg-main/50"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span
                    className={`font-mono text-[10px] ${
                      isActive ? "text-accent-cyan font-bold" : "text-muted/50"
                    }`}
                  >
                    {item.id}
                  </span>
                  <span className="font-sans font-medium tracking-wide">
                    {item.name}
                  </span>
                </div>

                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan shadow-[0_0_8px_rgba(0,240,255,0.7)]" />
                )}
              </a>
            );
          })}
        </nav>
      </div>

      {/* Utilities & Footer */}
      <div className="flex flex-col gap-4 pt-4 border-t border-border-subtle">
        {/* Node Status Telemetry */}
        <div className="flex items-center justify-between text-[10px] font-mono text-muted px-1">
          <span className="text-muted/80">LATENCY: 18ms</span>
          <span className="text-accent-cyan font-medium">LIVE_STREAM</span>
        </div>

        {/* Theme Switcher */}
        <ThemeToggle />
      </div>
    </aside>
  );
}
