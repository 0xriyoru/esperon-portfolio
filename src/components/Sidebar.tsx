"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";

const navItems = [
  { name: "Profile", path: "profile" },
  { name: "Projects", path: "projects" },
  { name: "Skills", path: "skills" },
  { name: "Credentials", path: "credentials" },
  { name: "Activity", path: "activity" },
  { name: "Contact", path: "contact" },
];

export default function Sidebar() {
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
      // If near bottom of main container, activate 'contact'
      if (mainEl.scrollHeight - mainEl.scrollTop - mainEl.clientHeight < 120) {
        setActiveSection("contact");
        return;
      }

      // Find currently visible section in the main scroll container
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
    <aside className="w-[250px] shrink-0 h-screen sticky top-0 bg-secondary flex flex-col justify-between border-r border-border-subtle p-6 z-10 shadow-[4px_0_24px_rgba(0,0,0,0.5)]">
      <div>
        <div className="mb-10">
          <h1 className="font-mono text-xl text-primary font-bold tracking-tight">Rhodge Esperon</h1>
          <p className="text-xs text-muted mt-1.5 font-mono">AI Engineer & Cybersec</p>
        </div>

        <nav className="flex flex-col gap-2">
          {navItems.map((item) => {
            const isActive = activeSection === item.path;

            return (
              <a
                key={item.path}
                href={`#${item.path}`}
                onClick={(e) => handleClick(e, item.path)}
                className={`relative font-mono text-sm px-3 py-2 flex items-center transition-all duration-200 rounded ${
                  isActive
                    ? "text-accent-cyan font-bold bg-accent-cyan/10 border-l-2 border-accent-cyan shadow-[0_0_12px_rgba(0,240,255,0.15)]"
                    : "text-muted hover:text-primary hover:bg-main/40"
                }`}
              >
                <span className="flex items-center gap-2">
                  <span className={`text-xs ${isActive ? "text-accent-cyan font-bold" : "opacity-0"}`}>
                    &gt;
                  </span>
                  <span className={isActive ? "tracking-wider" : ""}>{item.name}</span>
                </span>
              </a>
            );
          })}
        </nav>
      </div>

      <div className="flex flex-col gap-4">
        {/* Live Database Status Legend */}
        <div className="flex items-center gap-3 font-mono text-xs border border-border-subtle bg-main p-3 cyber-card">
          <span
            className={`w-2 h-2 rounded-full shrink-0 ${
              dbStatus === "online"
                ? "bg-accent-cyan animate-[pulse_2s_ease-in-out_infinite] shadow-[0_0_8px_rgba(0,240,255,0.8)]"
                : dbStatus === "connecting"
                ? "bg-accent-yellow animate-pulse"
                : "bg-accent-pink shadow-[0_0_8px_rgba(255,0,60,0.8)]"
            }`}
          />
          <div className="flex flex-col overflow-hidden">
            <span className="text-[9px] text-muted tracking-wider uppercase">DB Connection</span>
            <span
              className={`text-[11px] font-bold tracking-wide ${
                dbStatus === "online"
                  ? "text-accent-cyan"
                  : dbStatus === "connecting"
                  ? "text-accent-yellow"
                  : "text-accent-pink"
              }`}
            >
              {dbStatus === "online"
                ? "LIVE & HEALTHY"
                : dbStatus === "connecting"
                ? "CONNECTING..."
                : "STANDBY"}
            </span>
          </div>
        </div>

        <div className="text-xs text-muted font-mono flex flex-col gap-2 pt-2 border-t border-border-subtle">
          <div className="flex items-center gap-2 opacity-50 cursor-not-allowed">
            <span className="px-1.5 py-0.5 bg-main border border-border-subtle rounded text-[10px] text-primary">
              Ctrl + K
            </span>
            <span className="text-[11px]">Command</span>
          </div>
          <a
            href="mailto:rhodgesperon@gmail.com"
            className="hover:text-accent-yellow transition-colors text-[11px] truncate"
          >
            rhodgesperon@gmail.com
          </a>
        </div>
      </div>
    </aside>
  );
}

