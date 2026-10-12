"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, CaretDown } from "@phosphor-icons/react";
import { supabase } from "@/lib/supabase";
import { staticProjects, Project } from "@/data/projectsData";

const statusLabel: Record<Project["status"], string> = {
  DEPLOYED: "Live",
  DEVELOPMENT: "In progress",
  ARCHIVED: "Archived",
};

function StatusMark({ status }: { status: Project["status"] }) {
  const base = "inline-block h-2 w-2 rounded-full";
  if (status === "DEPLOYED") return <span className={`${base} bg-accent`} aria-hidden="true" />;
  if (status === "DEVELOPMENT")
    return <span className={`${base} border border-accent`} aria-hidden="true" />;
  return <span className={`${base} bg-rule-strong`} aria-hidden="true" />;
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>(staticProjects);
  const [openId, setOpenId] = useState<string | null>(staticProjects[0]?.id ?? null);

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
                  status: merged[existingIndex].status,
                  link: merged[existingIndex].link || remote.link,
                  github: merged[existingIndex].github || remote.github,
                  domain: merged[existingIndex].domain || remote.domain,
                };
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

  return (
    <ul className="border-t border-rule-strong">
      {projects.map((project) => {
        const isOpen = openId === project.id;
        const panelId = `project-panel-${project.id}`;
        const status = project.status?.toUpperCase() as Project["status"];
        return (
          <li key={project.id} className="border-b border-rule">
            <h3>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenId(isOpen ? null : project.id)}
                className="group grid w-full cursor-pointer grid-cols-[1fr_auto] items-baseline gap-x-6 gap-y-1 py-6 text-left md:grid-cols-12 md:py-8"
              >
                <span
                  className={`font-display text-4xl font-light leading-none tracking-tight transition-[transform,color] duration-500 [transition-timing-function:var(--ease-out-expo)] group-hover:translate-x-2 md:col-span-6 md:text-6xl ${
                    isOpen ? "text-accent" : "text-ink"
                  }`}
                >
                  {project.title}
                </span>
                <span className="order-3 col-span-2 text-sm text-ink-soft md:order-none md:col-span-4 md:text-base">
                  {project.type}
                </span>
                <span className="order-2 inline-flex items-center gap-2 justify-self-end text-sm text-ink-soft md:order-none md:col-span-2 md:justify-self-start">
                  <StatusMark status={status} />
                  {statusLabel[status] ?? "In progress"}
                  <CaretDown
                    size={16}
                    aria-hidden="true"
                    className={`ml-1 transition-transform duration-500 [transition-timing-function:var(--ease-out-expo)] md:ml-auto ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </span>
              </button>
            </h3>

            <div
              id={panelId}
              role="region"
              aria-label={`${project.title} details`}
              className="row-panel"
              data-open={isOpen}
              inert={!isOpen}
            >
              <div>
                <div className="grid gap-8 pb-10 md:grid-cols-12 md:gap-10">
                  <div className="md:col-span-6">
                    <p className="max-w-[62ch] text-base leading-relaxed">{project.description}</p>

                    {project.architecture && (
                      <div className="mt-5">
                        <span className="block font-mono text-[11px] uppercase tracking-wider text-ink-soft">
                          Architecture
                        </span>
                        <span className="mt-1 block font-mono text-[13px] leading-relaxed text-ink">
                          {project.architecture}
                        </span>
                      </div>
                    )}

                    {project.tags && project.tags.length > 0 && (
                      <div className="mt-5 flex flex-wrap gap-1.5">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-note border border-rule bg-paper px-2 py-0.5 font-mono text-[12px] text-ink-soft"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="md:col-span-6">
                    {project.highlights && project.highlights.length > 0 && (
                      <ul className="max-w-[62ch] space-y-2.5 text-[15px] leading-relaxed text-ink-soft">
                        {project.highlights.map((item, hIdx) => (
                          <li
                            key={hIdx}
                            className="relative pl-3.5 before:absolute before:left-0 before:top-[0.65em] before:h-1 before:w-1 before:rounded-full before:bg-rule-strong"
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    )}

                    <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
                      {project.confidential ? (
                        <span className="font-mono text-xs text-ink-soft">
                          Internal government deployment (SBMA AMD). Confidential access.
                        </span>
                      ) : (
                        <>
                          {project.link && (
                            <a
                              href={project.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-accent link-draw"
                            >
                              {project.link.includes("github.com") ? "View on GitHub" : "Open site"}
                              <ArrowUpRight size={14} aria-hidden="true" />
                            </a>
                          )}
                          {project.github && project.github !== project.link && (
                            <a
                              href={project.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 link-draw"
                            >
                              Source code
                              <ArrowUpRight size={14} aria-hidden="true" />
                            </a>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
