"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "@/components/ThemeToggle";

const navItems = [
  { name: "Profile", path: "profile" },
  { name: "Projects", path: "projects" },
  { name: "Skills", path: "skills" },
  { name: "Experience", path: "credentials" },
  { name: "Activity", path: "activity" },
  { name: "Contact", path: "contact" },
];

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("profile");

  useEffect(() => {
    const mainEl = document.querySelector("main");
    if (!mainEl) return;

    const handleScroll = () => {
      if (mainEl.scrollHeight - mainEl.scrollTop - mainEl.clientHeight < 120) {
        setActiveSection("contact");
        return;
      }

      const scrollPosition = mainEl.scrollTop + 180;
      for (let i = navItems.length - 1; i >= 0; i--) {
        const item = navItems[i];
        const element = document.getElementById(item.path);
        if (element && scrollPosition >= element.offsetTop) {
          setActiveSection(item.path);
          break;
        }
      }
    };

    mainEl.addEventListener("scroll", handleScroll, { passive: true });
    return () => mainEl.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (path: string) => {
    setIsOpen(false);
    setActiveSection(path);
    const element = document.getElementById(path);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      window.history.pushState(null, "", `#${path}`);
    }
  };

  const openCommandPalette = () => {
    setIsOpen(false);
    window.dispatchEvent(new CustomEvent("portfolio:open-command-palette"));
  };

  return (
    <>
      {/* Mobile Top Header (Visible on < 1024px) */}
      <header className="lg:hidden sticky top-0 z-40 bg-secondary/90 backdrop-blur-md border-b border-border-subtle px-5 py-3.5 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-accent-emerald animate-pulse" />
          <span className="font-sans font-bold text-sm text-primary tracking-tight">
            Rhodge Esperon
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Quick Command Trigger */}
          <button
            onClick={openCommandPalette}
            className="px-2 py-1 rounded bg-main border border-border-subtle text-muted hover:text-primary text-xs font-mono transition-colors"
            title="Open Command Palette (Ctrl+K)"
          >
            ⌘K
          </button>

          {/* Menu Toggle */}
          <button
            onClick={() => setIsOpen((prev) => !prev)}
            aria-label="Toggle Navigation Menu"
            className="px-3 py-1 rounded bg-main border border-border-subtle text-primary hover:border-accent-cyan/50 text-xs font-medium transition-colors"
          >
            {isOpen ? "Close" : "Menu"}
          </button>
        </div>
      </header>

      {/* Slide-out Drawer */}
      <AnimatePresence>
        {isOpen && (
          <div className="lg:hidden fixed inset-0 z-50">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              className="absolute top-0 right-0 w-72 max-w-[85vw] h-full bg-secondary border-l border-border-subtle p-6 flex flex-col justify-between shadow-2xl overflow-y-auto"
            >
              <div>
                {/* Header info */}
                <div className="flex items-center justify-between border-b border-border-subtle pb-4 mb-6">
                  <div>
                    <h2 className="font-sans text-base font-bold text-primary">Rhodge Esperon</h2>
                    <p className="text-xs text-muted font-sans mt-0.5">Full-Stack & AI Developer</p>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-xs text-muted hover:text-primary p-1.5 rounded hover:bg-main transition-colors"
                  >
                    ✕
                  </button>
                </div>

                {/* Nav Links */}
                <nav className="flex flex-col gap-1.5">
                  {navItems.map((item) => {
                    const isActive = activeSection === item.path;
                    return (
                      <button
                        key={item.path}
                        onClick={() => handleNavClick(item.path)}
                        className={`text-left px-3.5 py-2.5 text-sm rounded-lg transition-all flex items-center justify-between ${
                          isActive
                            ? "text-primary font-medium bg-main border border-border-subtle shadow-sm"
                            : "text-muted hover:text-primary hover:bg-main/50"
                        }`}
                      >
                        <span>{item.name}</span>
                        {isActive && (
                          <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan" />
                        )}
                      </button>
                    );
                  })}
                </nav>

                {/* Extra Quick Actions */}
                <div className="mt-6 pt-4 border-t border-border-subtle flex flex-col gap-2 text-xs">
                  <a
                    href="/cv.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsOpen(false)}
                    className="px-3.5 py-2.5 rounded-lg bg-main border border-border-subtle text-primary hover:border-accent-cyan/50 transition-colors flex items-center justify-between font-medium"
                  >
                    <span>View CV / Resume</span>
                    <span>↗</span>
                  </a>
                  <button
                    onClick={openCommandPalette}
                    className="px-3.5 py-2.5 rounded-lg bg-main border border-border-subtle text-muted hover:text-primary transition-colors flex items-center justify-between font-medium"
                  >
                    <span>Command Palette</span>
                    <span className="text-[10px] font-mono">Ctrl+K</span>
                  </button>
                </div>
              </div>

              {/* Bottom Theme Switcher & Status */}
              <div className="flex flex-col gap-4 pt-6 border-t border-border-subtle">
                <ThemeToggle />
                <div className="flex items-center justify-between text-[11px] text-muted font-sans">
                  <span>Subic Bay, PH</span>
                  <a href="mailto:rhodgesperon@gmail.com" className="hover:text-primary transition-colors">
                    Contact ↗
                  </a>
                </div>
              </div>
            </motion.aside>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
