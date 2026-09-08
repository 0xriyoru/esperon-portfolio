"use client";

import { useEffect, useState } from "react";
import ThemeToggle from "@/components/ThemeToggle";

const navItems = [
  { name: "Profile", path: "profile" },
  { name: "Projects", path: "projects" },
  { name: "Skills", path: "skills" },
  { name: "Experience", path: "credentials" },
  { name: "Activity", path: "activity" },
  { name: "Contact", path: "contact" },
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
          <h1 className="font-sans text-lg text-primary font-bold tracking-tight">
            Rhodge Esperon
          </h1>
          <p className="text-xs text-muted mt-1 font-sans">
            Full-Stack & AI Systems Developer
          </p>
          <div className="mt-3 inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-accent-emerald/10 border border-accent-emerald/20 text-[11px] text-accent-emerald font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-emerald animate-pulse" />
            <span>Open to opportunities</span>
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
                className={`relative font-sans text-sm px-3.5 py-2 flex items-center justify-between transition-all duration-150 rounded-lg group ${
                  isActive
                    ? "text-primary font-medium bg-main border border-border-subtle shadow-sm"
                    : "text-muted hover:text-primary hover:bg-main/50"
                }`}
              >
                <span>{item.name}</span>
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan shadow-[0_0_8px_rgba(0,240,255,0.6)]" />
                )}
              </a>
            );
          })}
        </nav>
      </div>

      {/* Utilities & Footer */}
      <div className="flex flex-col gap-4 pt-4 border-t border-border-subtle">
        {/* Theme Switcher */}
        <ThemeToggle />

        <div className="flex items-center justify-between text-xs text-muted pt-1">
          <button
            onClick={() => window.dispatchEvent(new CustomEvent("portfolio:open-command-palette"))}
            className="flex items-center gap-1.5 text-muted hover:text-primary transition-colors group cursor-pointer"
            title="Open Command Palette"
          >
            <kbd className="px-1.5 py-0.5 bg-main border border-border-subtle rounded text-[10px] font-mono text-muted group-hover:border-accent-cyan/50 group-hover:text-primary transition-colors">
              Ctrl K
            </kbd>
            <span className="text-[11px]">Command</span>
          </button>

          <a
            href="mailto:rhodgesperon@gmail.com"
            className="text-[11px] text-muted hover:text-accent-cyan transition-colors"
          >
            Email ↗
          </a>
        </div>
      </div>
    </aside>
  );
}
