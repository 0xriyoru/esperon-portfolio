"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "@/components/ThemeToggle";

const navItems = [
  { id: "01", name: "Profile", path: "profile" },
  { id: "02", name: "Projects", path: "projects" },
  { id: "03", name: "Skills", path: "skills" },
  { id: "04", name: "Experience", path: "credentials" },
  { id: "05", name: "Activity", path: "activity" },
  { id: "06", name: "Contact", path: "contact" },
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
                    <h2 className="font-cyber text-base font-bold text-primary uppercase">Rhodge Esperon</h2>
                    <p className="text-xs text-muted font-sans mt-0.5">Full-Stack &amp; AI Developer</p>
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
                        className={`text-left px-3.5 py-2.5 text-xs rounded-lg transition-all flex items-center justify-between ${
                          isActive
                            ? "text-primary font-bold bg-main border border-border-subtle shadow-sm"
                            : "text-muted hover:text-primary hover:bg-main/50"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className={`font-mono text-[10px] ${isActive ? "text-accent-cyan font-bold" : "text-muted/50"}`}>
                            {item.id}
                          </span>
                          <span className="font-sans font-medium tracking-wide">{item.name}</span>
                        </div>
                        {isActive && (
                          <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan shadow-[0_0_6px_rgba(0,240,255,0.8)]" />
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
