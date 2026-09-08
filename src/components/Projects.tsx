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
        // Fallback to staticProjects
      }
    };

    fetchProjects();

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

  const filterOptions = [
    { id: "ALL", label: "All Projects" },
    { id: "DEPLOYED", label: "Deployed" },
    { id: "DEVELOPMENT", label: "In Progress" },
    { id: "ARCHIVED", label: "Archived" },
  ];

  const filteredProjects = projects.filter((project) => {
    if (activeFilter === "ALL") return true;
    return project.status?.toUpperCase() === activeFilter;
  });

  return (
    <div className="w-full">
      {/* Filter controls */}
      <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-1">
        {filterOptions.map((f) => {
          const isSelected = activeFilter === f.id;
          return (
            <button
              key={f.id}
              onClick={() => setActiveFilter(f.id)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap cursor-pointer ${
                isSelected
                  ? "bg-primary text-main shadow-sm"
                  : "bg-secondary text-muted hover:text-primary hover:bg-secondary/80 border border-border-subtle"
              }`}
            >
              {f.label}
            </button>
          );
        })}
      </div>

      {filteredProjects.length === 0 ? (
        <div className="p-12 border border-border-subtle bg-secondary/50 rounded-xl text-center text-muted text-sm font-sans">
          No projects found under this filter.
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
              className="glass-card flex flex-col justify-between overflow-hidden group hover:-translate-y-0.5 transition-all duration-200"
            >
              <div>
                {/* Header - Domain / Status */}
                <div className="flex justify-between items-center px-6 py-3.5 border-b border-border-subtle bg-main/40 text-xs">
                  <span className="truncate max-w-[220px] font-mono text-[11px] text-muted tracking-wide">
                    {project.domain || project.type || "System Architecture"}
                  </span>
                  <div className="flex items-center gap-1.5 text-[11px] font-mono shrink-0">
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        project.status === "DEPLOYED"
                          ? "bg-accent-emerald shadow-[0_0_8px_rgba(16,185,129,0.7)]"
                          : project.status === "DEVELOPMENT"
                          ? "bg-accent-amber shadow-[0_0_8px_rgba(245,158,11,0.7)]"
                          : "bg-muted"
                      }`}
                    />
                    <span
                      className={
                        project.status === "DEPLOYED"
                          ? "text-accent-emerald font-medium"
                          : project.status === "DEVELOPMENT"
                          ? "text-accent-amber font-medium"
                          : "text-muted"
                      }
                    >
                      {project.status === "DEPLOYED"
                        ? "Production"
                        : project.status === "DEVELOPMENT"
                        ? "In Progress"
                        : "Archived"}
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6">
                  <div className="flex flex-col gap-2 mb-3">
                    <h3 className="font-sans font-bold text-xl text-primary group-hover:text-accent-cyan transition-colors tracking-tight">
                      {project.title}
                    </h3>
                    {project.architecture && (
                      <div className="text-[11px] font-mono text-muted bg-main/70 border border-border-subtle px-2.5 py-1 rounded-md inline-flex items-center gap-1.5 w-fit">
                        <span className="text-accent-cyan">Architecture:</span>
                        <span>{project.architecture}</span>
                      </div>
                    )}
                  </div>

                  <p className="text-muted text-xs sm:text-sm leading-relaxed mb-4 font-sans">
                    {project.description}
                  </p>

                  {/* Highlights */}
                  {project.highlights && project.highlights.length > 0 && (
                    <div className="space-y-1.5 mb-2 pt-3 border-t border-border-subtle/50">
                      {project.highlights.map((item, hIdx) => (
                        <div key={hIdx} className="flex items-start gap-2 text-xs text-muted font-sans">
                          <span className="text-accent-cyan text-[10px] select-none mt-0.5">▹</span>
                          <span className="leading-snug">{item}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Bottom Footer - Tech Tags & Action Buttons */}
              <div className="px-6 pb-6 pt-3 border-t border-border-subtle bg-main/20 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex flex-wrap gap-1.5">
                  {project.tags?.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 text-[10px] font-mono border border-border-subtle bg-secondary text-muted rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Action Links */}
                <div className="flex items-center gap-2 text-xs shrink-0 w-full sm:w-auto justify-end">
                  {project.confidential ? (
                    <span className="text-[11px] text-accent-amber/90 bg-accent-amber/10 border border-accent-amber/20 px-2.5 py-1 rounded-md flex items-center gap-1.5 font-medium">
                      <span>Restricted Gov Access 🔒</span>
                    </span>
                  ) : (
                    <>
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 bg-primary text-main text-xs font-medium rounded-lg hover:opacity-90 transition-all flex items-center gap-1 active:scale-95 shadow-sm"
                        >
                          <span>Live Demo</span>
                          <span>↗</span>
                        </a>
                      )}
                      {project.github && project.github !== project.link && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 border border-border-subtle bg-secondary text-primary text-xs font-medium rounded-lg hover:border-border-hover transition-colors flex items-center gap-1 active:scale-95"
                        >
                          <span>Source</span>
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
