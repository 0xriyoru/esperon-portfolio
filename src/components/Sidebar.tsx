"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const navItems = [
  { name: "About", path: "about" },
  { name: "Projects", path: "projects" },
  { name: "Skills", path: "skills" },
  { name: "Credentials", path: "credentials" },
  { name: "Activity", path: "activity" },
  { name: "Contact", path: "contact" },
];

export default function Sidebar() {
  const [activeSection, setActiveSection] = useState("about");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -60% 0px" }
    );

    // Small delay to ensure elements exist
    setTimeout(() => {
      navItems.forEach((item) => {
        const element = document.getElementById(item.path);
        if (element) observer.observe(element);
      });
    }, 100);

    return () => observer.disconnect();
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    const element = document.getElementById(path);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      window.history.pushState(null, "", `#${path}`);
    }
  };

  return (
    <aside className="w-[250px] shrink-0 h-screen sticky top-0 bg-secondary flex flex-col justify-between border-r border-border-subtle p-6 z-10 shadow-[4px_0_24px_rgba(0,0,0,0.5)]">
      <div>
        <div className="mb-12">
          <h1 className="font-mono text-xl text-primary font-bold tracking-tight">Rhodge Esperon</h1>
          <p className="text-sm text-muted mt-2">AI Engineer & Cybersec</p>
        </div>

        <nav className="flex flex-col gap-5">
          {navItems.map((item) => {
            const isActive = activeSection === item.path;
            
            return (
              <a 
                key={item.path} 
                href={`#${item.path}`}
                onClick={(e) => handleClick(e, item.path)}
                className={`relative group font-mono text-sm flex items-center transition-colors ${
                  isActive ? "text-accent-cyan" : "text-muted hover:text-primary glitch-hover"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="sidebar-active-indicator"
                    className="absolute left-[-24px] w-1 h-full bg-accent-cyan"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  />
                )}
                {isActive && <span className="mr-2 text-accent-cyan">&gt;</span>}
                <span className={isActive ? "cyber-glitch-text" : ""} data-text={item.name}>{item.name}</span>
              </a>
            );
          })}
        </nav>
      </div>

      <div className="text-xs text-muted font-mono flex flex-col gap-3">
        <div className="flex items-center gap-2 mb-2 opacity-50 cursor-not-allowed">
          <span className="px-2 py-1 bg-main border border-border-subtle rounded-md text-primary">Ctrl + K</span>
          <span>Command</span>
        </div>
        <p className="hover:text-accent-yellow transition-colors glitch-hover cursor-pointer">
          rhodgesperon@gmail.com
        </p>
      </div>
    </aside>
  );
}
