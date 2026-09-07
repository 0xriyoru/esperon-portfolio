"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { motion } from "framer-motion";
import { staticProjects, Project } from "@/data/projectsData";

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>(staticProjects);
  const [activeFilter, setActiveFilter] = useState<string>("ALL");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data, error } = await supabase
          .from("projects")
          .select("*")
          .order("created_at", { ascending: true });

        if (!error && data && data.length > 0) {
          // Merge dynamic Supabase rows with rich static architecture highlights
          setProjects((prev) => {
            const merged = [...prev];
            data.forEach((remote) => {
              const existingIndex = merged.findIndex(
                (p) =>
                  p.id === remote.id ||
                  p.title?.toLowerCase() === remote.title?.toLowerCase()
              );
              if (existingIndex >= 0) {
                merged[existingIndex] = {
                  ...merged[existingIndex],
                  ...remote,
                  // Preserve detailed architecture & highlights if remote is minimal
                  architecture:
                    merged[existingIndex].architecture || remote.type || "Full-Stack System",
                  highlights:
                    merged[existingIndex].highlights || remote.highlights || [],
                };
              } else {
                merged.push({
                  id: remote.id,
                  title: remote.title,
                  type: remote.type || "Web System",
                  architecture: remote.type || "System Architecture",
                  description: remote.description || "",
                  highlights: remote.highlights || [],
                  tags: remote.tags || [],
                  status: (remote.status?.toUpperCase() as Project["status"]) || "DEVELOPMENT",
                  link: remote.link,
                  domain: remote.domain,
                });
              }
            });
            return merged;
          });
        }
      } catch {
        // Graceful fallback: staticProjects is already loaded
      }
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
            className={`px-3 py-1 border rounded transition-colors ${
              activeFilter === f
                ? "border-accent-cyan bg-accent-cyan/15 text-accent-cyan font-bold shadow-[0_0_8px_rgba(6,182,212,0.2)]"
                : "border-border-subtle bg-secondary text-muted hover:text-primary hover:border-muted"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {filteredProjects.length === 0 ? (
        <div className="p-8 border border-border-subtle bg-secondary rounded-lg text-center font-mono text-muted text-sm">
          No projects found under status: {activeFilter}
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredProjects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              className="group relative border border-border-subtle bg-secondary/90 hover:border-accent-cyan/50 transition-all duration-200 rounded-lg flex flex-col justify-between overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.3)]"
            >
              <div>
                {/* Top Header - Domain / Classification & Status Pill */}
                <div className="flex justify-between items-center px-5 py-3.5 border-b border-border-subtle/80 bg-main/50 font-mono text-xs">
                  <span className="truncate max-w-[220px] text-[11px] text-muted tracking-wider">
                    {project.domain || "ENGINEERING PROJECT"}
                  </span>
                  <div className="flex items-center gap-2 text-[10px] tracking-widest uppercase shrink-0">
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        project.status === "DEPLOYED"
                          ? "bg-accent-cyan shadow-[0_0_6px_rgba(6,182,212,0.8)]"
                          : project.status === "DEVELOPMENT"
                          ? "bg-accent-yellow shadow-[0_0_6px_rgba(245,158,11,0.8)]"
                          : "bg-muted"
                      }`}
                    />
                    <span
                      className={
                        project.status === "DEPLOYED"
                          ? "text-accent-cyan font-bold"
                          : project.status === "DEVELOPMENT"
                          ? "text-accent-yellow font-bold"
                          : "text-muted"
                      }
                    >
                      {project.status === "DEPLOYED"
                        ? "PRODUCTION"
                        : project.status === "DEVELOPMENT"
                        ? "IN PROGRESS"
                        : "ARCHIVED"}
                    </span>
                  </div>
                </div>

                {/* Main Card Body */}
                <div className="p-5 sm:p-6">
                  <div className="flex flex-col gap-2 mb-4">
                    <h3 className="font-mono font-bold text-2xl text-primary group-hover:text-accent-cyan transition-colors">
                      {project.title}
                    </h3>
                    {project.architecture && (
                      <div className="text-[10px] font-mono text-accent-cyan/90 bg-accent-cyan/10 border border-accent-cyan/20 px-2.5 py-1 rounded inline-flex items-center gap-1.5 w-fit">
                        <span className="font-bold">ARCH:</span>
                        <span>{project.architecture}</span>
                      </div>
                    )}
                  </div>

                  <p className="text-muted text-xs md:text-sm leading-relaxed mb-4 font-sans">
                    {project.description}
                  </p>

                  {/* Architecture & Engineering Highlights */}
                  {project.highlights && project.highlights.length > 0 && (
                    <div className="space-y-1.5 mb-5 pt-3 border-t border-border-subtle/40">
                      {project.highlights.map((item, hIdx) => (
                        <div key={hIdx} className="flex items-start gap-2 text-xs text-muted/90 font-sans">
                          <span className="text-accent-cyan text-[10px] select-none mt-0.5">▹</span>
                          <span className="leading-snug">{item}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Bottom Footer - Tech Tags & Action Buttons */}
              <div className="px-5 sm:px-6 pb-5 pt-3 border-t border-border-subtle/50 bg-main/20 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex flex-wrap gap-1.5">
                  {project.tags?.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 text-[9px] font-mono border border-border-subtle bg-secondary text-muted rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Action Links */}
                <div className="flex items-center gap-2 font-mono text-xs shrink-0 w-full sm:w-auto justify-end">
                  {project.confidential ? (
                    <span className="text-[10px] text-accent-yellow bg-accent-yellow/10 border border-accent-yellow/30 px-2.5 py-1 rounded flex items-center gap-1.5">
                      <span>CONFIDENTIAL GOV ACCESS 🔒</span>
                    </span>
                  ) : (
                    <>
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1 bg-accent-cyan text-main text-[11px] font-bold rounded hover:brightness-110 transition-all flex items-center gap-1 active:scale-95 shadow-[0_0_8px_rgba(6,182,212,0.2)]"
                        >
                          <span>LIVE DEMO</span>
                          <span>↗</span>
                        </a>
                      )}
                      {project.github && project.github !== project.link && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1 border border-border-subtle bg-secondary text-primary text-[11px] rounded hover:border-accent-cyan hover:text-accent-cyan transition-colors flex items-center gap-1 active:scale-95"
                        >
                          <span>SOURCE</span>
                          <span>↗</span>
                        </a>
                      )}
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

