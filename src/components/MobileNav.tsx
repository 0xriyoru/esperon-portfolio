"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";
import ThemeToggle from "@/components/ThemeToggle";

const navItems = [
  { name: "Profile", path: "profile" },
  { name: "Projects", path: "projects" },
  { name: "Skills", path: "skills" },
  { name: "Credentials", path: "credentials" },
  { name: "Activity", path: "activity" },
  { name: "Contact", path: "contact" },
];

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("profile");
  const [dbStatus, setDbStatus] = useState<"online" | "connecting" | "standby">("connecting");

  useEffect(() => {
    // Check Supabase connection health
    async function checkHealth() {
      try {
        const { error } = await supabase.from("page_views").select("id").limit(1);
        if (error && error.code !== "PGRST116") {
          setDbStatus("standby");
        } else {
          setDbStatus("online");
        }
      } catch {
        setDbStatus("standby");
      }
    }
    checkHealth();

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

  const triggerReboot = () => {
    sessionStorage.removeItem("portfolio_boot_seen");
    window.dispatchEvent(new CustomEvent("portfolio:reboot"));
    setIsOpen(false);
  };

  return (
    <>
      {/* Mobile Top Telemetry Bar (Visible only on < 1024px) */}
      <header className="lg:hidden sticky top-0 z-40 bg-secondary/95 backdrop-blur border-b border-border-subtle px-4 py-3 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-2 font-mono">
          <span
            className={`w-2 h-2 rounded-full shrink-0 ${
              dbStatus === "online"
                ? "bg-accent-cyan shadow-[0_0_8px_rgba(0,240,255,0.8)] animate-pulse"
                : dbStatus === "connecting"
                ? "bg-accent-yellow animate-pulse"
                : "bg-accent-pink"
            }`}
          />
          <span className="font-bold text-xs tracking-wider text-primary uppercase">
            RHODGE // 0XRIYORU
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Quick Command Trigger */}
          <button
            onClick={openCommandPalette}
            className="font-mono text-[10px] px-2 py-1 bg-main border border-border-subtle text-accent-cyan hover:border-accent-cyan transition-colors"
            title="Open Command Palette (Ctrl+K)"
          >
            ⌘K
          </button>

          {/* Hamburger Cyber Trigger */}
          <button
            onClick={() => setIsOpen((prev) => !prev)}
            aria-label="Toggle Navigation Menu"
            className="font-mono text-xs px-2.5 py-1 bg-main border border-border-subtle text-primary hover:border-accent-cyan hover:text-accent-cyan transition-colors flex items-center gap-1.5"
          >
            <span className="text-accent-cyan font-bold">{isOpen ? "[X]" : "[SYS]"}</span>
            <span>{isOpen ? "CLOSE" : "MENU"}</span>
          </button>
        </div>
      </header>

      {/* Slide-out Cyber Drawer Overlay */}
      <AnimatePresence>
        {isOpen && (
          <div className="lg:hidden fixed inset-0 z-50">
            {/* Backdrop blur overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            />

            {/* Off-canvas Navigation Drawer */}
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 280 }}
              className="absolute top-0 right-0 w-72 max-w-[85vw] h-full bg-secondary border-l border-border-subtle p-6 flex flex-col justify-between shadow-[0_0_30px_rgba(0,0,0,0.8)] overflow-y-auto"
            >
              <div>
                {/* Header info */}
                <div className="flex items-center justify-between border-b border-border-subtle pb-4 mb-6">
                  <div>
                    <h2 className="font-mono text-base font-bold text-primary">Rhodge Esperon</h2>
                    <p className="text-[11px] text-muted font-mono">AI & Full-Stack Developer</p>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="font-mono text-xs text-muted hover:text-accent-pink px-2 py-1 border border-border-subtle"
                  >
                    ✕
                  </button>
                </div>

                {/* Nav Links */}
                <nav className="flex flex-col gap-2 font-mono">
                  {navItems.map((item) => {
                    const isActive = activeSection === item.path;
                    return (
                      <button
                        key={item.path}
                        onClick={() => handleNavClick(item.path)}
                        className={`text-left px-3 py-2.5 text-sm transition-all rounded flex items-center gap-2.5 ${
                          isActive
                            ? "text-accent-cyan font-bold bg-accent-cyan/10 border-l-2 border-accent-cyan shadow-[0_0_12px_rgba(0,240,255,0.15)]"
                            : "text-muted hover:text-primary hover:bg-main/40"
                        }`}
                      >
                        <span className={`text-xs ${isActive ? "text-accent-cyan font-bold" : "opacity-0"}`}>
                          &gt;
                        </span>
                        <span className={isActive ? "tracking-wider" : ""}>{item.name}</span>
                      </button>
                    );
                  })}
                </nav>

                {/* Extra Quick Actions */}
                <div className="mt-6 pt-4 border-t border-border-subtle/60 flex flex-col gap-2 font-mono text-xs">
                  <a
                    href="/cv.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsOpen(false)}
                    className="px-3 py-2 bg-main border border-border-subtle text-accent-cyan hover:border-accent-cyan transition-colors flex items-center justify-between"
                  >
                    <span>VIEW CV / RESUME</span>
                    <span>↗</span>
                  </a>
                  <button
                    onClick={openCommandPalette}
                    className="px-3 py-2 bg-main border border-border-subtle text-primary hover:border-accent-yellow hover:text-accent-yellow transition-colors flex items-center justify-between"
                  >
                    <span>COMMAND PALETTE</span>
                    <span className="text-[10px] text-muted">Ctrl+K</span>
                  </button>
                </div>
              </div>

              {/* Bottom Telemetry & Theme Switcher */}
              <div className="flex flex-col gap-4 pt-6 border-t border-border-subtle">
                <div className="flex items-center gap-2.5 font-mono text-xs bg-main p-2.5 border border-border-subtle">
                  <span
                    className={`w-2 h-2 rounded-full shrink-0 ${
                      dbStatus === "online"
                        ? "bg-accent-cyan animate-pulse shadow-[0_0_6px_rgba(0,240,255,0.8)]"
                        : "bg-accent-yellow"
                    }`}
                  />
                  <div className="flex flex-col">
                    <span className="text-[8px] text-muted uppercase">DATABASE TELEMETRY</span>
                    <span className="text-[10px] text-accent-cyan font-bold">
                      {dbStatus === "online" ? "SYSTEM LIVE & SYNCED" : "CONNECTING..."}
                    </span>
                  </div>
                </div>

                <ThemeToggle />

                <div className="flex items-center justify-between font-mono text-[10px] text-muted">
                  <span>LOC: PH // UTC+8</span>
                  <button
                    onClick={triggerReboot}
                    className="text-accent-cyan hover:text-accent-yellow transition-colors underline"
                  >
                    [REBOOT ICE]
                  </button>
                </div>
              </div>
            </motion.aside>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
