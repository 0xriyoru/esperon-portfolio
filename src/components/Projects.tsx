"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { motion } from "framer-motion";

type Project = {
  id: string;
  title: string;
  description: string;
  type: string;
  tags: string[];
  status: string;
  link: string;
  domain: string;
  image_url: string;
};

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<string>("ALL");

  useEffect(() => {
    const fetchProjects = async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("created_at", { ascending: true });

      if (!error && data) {
        setProjects(data);
      }
      setLoading(false);
    };

    fetchProjects();

    // Listen to real-time database changes
    const channel = supabase
      .channel("projects-realtime")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "projects" },
        () => {
          fetchProjects();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const filteredProjects = projects.filter((project) => {
    if (activeFilter === "ALL") return true;
    return project.status?.toUpperCase() === activeFilter;
  });

  return (
    <div className="w-full">
      {/* Filter controls */}
      <div className="flex items-center gap-2 mb-8 font-mono text-xs overflow-x-auto pb-2">
        <span className="text-muted mr-2 text-[11px] uppercase tracking-wider">FILTER:</span>
        {["ALL", "DEPLOYED", "DEVELOPMENT", "ARCHIVED"].map((f) => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            className={`px-3 py-1 border transition-colors ${
              activeFilter === f
                ? "border-accent-yellow bg-accent-yellow/15 text-accent-yellow font-bold shadow-[0_0_8px_rgba(252,238,9,0.2)]"
                : "border-border-subtle bg-secondary text-muted hover:text-primary hover:border-muted"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {[1, 2].map((i) => (
            <div
              key={i}
              className="h-[360px] border border-border-subtle bg-secondary animate-pulse flex items-center justify-center cyber-card"
            >
              <span className="font-mono text-accent-cyan text-xs">&gt; QUERYING PROJECTS SCHEMA...</span>
            </div>
          ))}
        </div>
      ) : filteredProjects.length === 0 ? (
        <div className="p-8 border border-border-subtle bg-secondary text-center font-mono text-muted text-sm cyber-card">
          No projects found under status: {activeFilter}
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredProjects.map((project, i) => (
            <motion.a
              href={project.link || undefined}
              target={project.link ? "_blank" : undefined}
              rel={project.link ? "noopener noreferrer" : undefined}
              key={project.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.3, delay: i * 0.06 }}
              className={`group relative border border-border-subtle bg-secondary flex flex-col min-h-[360px] transition-all duration-200 overflow-hidden cyber-card ${
                project.link
                  ? "hover:border-accent-yellow hover:shadow-[0_0_20px_rgba(252,238,9,0.1)] cursor-pointer"
                  : "cursor-default"
              }`}
            >
              {/* Top Header - Domain & Link Arrow */}
              <div className="flex justify-between items-center p-4 border-b border-border-subtle font-mono text-xs text-muted bg-main/40">
                <span className="truncate max-w-[240px] text-[11px]">{project.domain || "INTERNAL"}</span>
                <span
                  className={`text-sm ${
                    project.link
                      ? "group-hover:text-accent-yellow group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                      : "opacity-0"
                  }`}
                >
                  ↗
                </span>
              </div>

              {/* Main Body */}
              <div className="flex flex-col flex-1 p-6">
                <h3
                  className={`font-mono font-bold text-2xl text-primary mb-1.5 transition-colors ${
                    project.link ? "group-hover:text-accent-yellow" : ""
                  }`}
                >
                  {project.title}
                </h3>
                <div className="text-xs font-mono text-accent-cyan mb-4 font-bold tracking-wider">
                  {project.type}
                </div>

                <p className="text-muted text-xs md:text-sm leading-relaxed flex-1 mb-6 font-sans">
                  {project.description}
                </p>

                {/* Bottom Section - Status & Tags */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mt-auto pt-4 border-t border-border-subtle/60">
                  <div className="flex flex-wrap gap-1.5 order-2 sm:order-1">
                    {project.tags?.map((tag, idx) => (
                      <span
                        key={idx}
                        className={`px-2 py-0.5 text-[9px] font-mono border border-border-subtle bg-main text-muted transition-colors ${
                          project.link ? "group-hover:border-accent-yellow/30" : ""
                        }`}
                      >
                        {tag.toUpperCase()}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 font-mono text-[10px] tracking-widest text-muted order-1 sm:order-2 shrink-0">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        project.status?.toLowerCase() === "deployed"
                          ? "bg-accent-cyan animate-[pulse_2s_ease-in-out_infinite] shadow-[0_0_6px_rgba(0,240,255,0.8)]"
                          : project.status?.toLowerCase() === "development"
                          ? "bg-accent-pink shadow-[0_0_6px_rgba(255,0,60,0.8)]"
                          : "bg-muted"
                      }`}
                    />
                    <span className="text-[10px] uppercase">{project.status || "DEVELOPMENT"}</span>
                  </div>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      )}
    </div>
  );
}
