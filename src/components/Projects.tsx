"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowUpRight, CaretDown } from "@phosphor-icons/react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";
import { supabase } from "@/lib/supabase";
import { staticProjects, Project } from "@/data/projectsData";

const statusLabel: Record<Project["status"], string> = {
  DEPLOYED: "Live",
  DEVELOPMENT: "In progress",
  ARCHIVED: "Archived",
};

const ROW_SPRING = { stiffness: 220, damping: 26, mass: 0.4 };
const UNFOLD_EASE = [0.16, 1, 0.3, 1] as const;

function StatusMark({ status }: { status: Project["status"] }) {
  const base = "inline-block h-2 w-2 rounded-full";
  if (status === "DEPLOYED") return <span className={`${base} bg-accent`} aria-hidden="true" />;
  if (status === "DEVELOPMENT")
    return <span className={`${base} border border-accent`} aria-hidden="true" />;
  return <span className={`${base} bg-rule-strong`} aria-hidden="true" />;
}

function ProjectRow({
  project,
  isOpen,
  onToggle,
  onHover,
  onLeave,
  reduce,
}: {
  project: Project;
  isOpen: boolean;
  onToggle: () => void;
  onHover: () => void;
  onLeave: () => void;
  reduce: boolean | null;
}) {
  const rowRef = useRef<HTMLLIElement>(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const springX = useSpring(rawX, ROW_SPRING);
  const springY = useSpring(rawY, ROW_SPRING);

  const rotateX = useTransform(springY, [-0.5, 0.5], [3, -3]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-3, 3]);

  useEffect(() => {
    if (isOpen) {
      rawX.set(0);
      rawY.set(0);
      onLeave();
    }
  }, [isOpen, onLeave, rawX, rawY]);

  const handleMouseEnter = () => {
    if (!isOpen) {
      onHover();
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLLIElement>) => {
    if (reduce || !rowRef.current || isOpen) return;
    const rect = rowRef.current.getBoundingClientRect();
    rawX.set((e.clientX - rect.left) / rect.width - 0.5);
    rawY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handlePointerLeave = () => {
    rawX.set(0);
    rawY.set(0);
    onLeave();
  };

  const panelId = `project-panel-${project.id}`;
  const status = project.status?.toUpperCase() as Project["status"];

  return (
    <li
      ref={rowRef}
      onMouseEnter={handleMouseEnter}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{ perspective: "1200px" }}
      className="border-b border-rule"
    >
      <motion.div
        style={
          reduce
            ? undefined
            : {
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
              }
        }
      >
        <h3>
          <button
            type="button"
            aria-expanded={isOpen}
            aria-controls={panelId}
            onClick={onToggle}
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
      </motion.div>

      <div
        id={panelId}
        role="region"
        aria-label={`${project.title} details`}
        className="row-panel"
        data-open={isOpen}
        inert={!isOpen}
      >
        <div>
          <motion.div
            initial={false}
            animate={
              reduce
                ? { opacity: 1 }
                : {
                    rotateX: isOpen ? 0 : -18,
                    y: isOpen ? 0 : -8,
                    opacity: isOpen ? 1 : 0,
                  }
            }
            transition={{ duration: 0.48, ease: UNFOLD_EASE }}
            style={
              reduce
                ? undefined
                : {
                    transformPerspective: 1200,
                    transformOrigin: "top center",
                  }
            }
            className="grid gap-8 pb-10 md:grid-cols-12 md:gap-10"
          >
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
              {project.preview && (
                project.link ? (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open ${project.title} website in new tab`}
                    className="group/preview mb-5 block overflow-hidden rounded-note border border-rule-strong bg-paper p-1.5 transition-all duration-200 hover:-translate-y-0.5 hover:border-accent active:translate-y-0"
                  >
                    <div className="relative overflow-hidden rounded-[2px] border border-rule bg-paper-deep">
                      <Image
                        src={project.preview}
                        alt={`${project.title} interface preview`}
                        width={640}
                        height={380}
                        className="aspect-16/10 w-full object-cover object-top transition-transform duration-500 [transition-timing-function:var(--ease-out-expo)] group-hover/preview:scale-[1.02]"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-ink/25 opacity-0 transition-opacity duration-200 group-hover/preview:opacity-100">
                        <span className="inline-flex items-center gap-1.5 rounded-note border border-rule bg-paper px-3 py-1.5 font-mono text-[12px] font-medium text-ink">
                          {project.link.includes("github.com") ? "View on GitHub" : "Open site"}
                          <ArrowUpRight size={13} weight="bold" />
                        </span>
                      </div>
                    </div>
                  </a>
                ) : (
                  <div className="mb-5 overflow-hidden rounded-note border border-rule-strong bg-paper p-1.5">
                    <div className="overflow-hidden rounded-[2px] border border-rule bg-paper-deep">
                      <Image
                        src={project.preview}
                        alt={`${project.title} interface preview`}
                        width={640}
                        height={380}
                        className="aspect-16/10 w-full object-cover object-top"
                      />
                    </div>
                  </div>
                )
              )}

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

              {project.confidential && (
                <div className="mt-6">
                  <span className="font-mono text-xs text-ink-soft">
                    Internal government deployment (SBMA AMD). Confidential access.
                  </span>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </li>
  );
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>(staticProjects);
  const [openId, setOpenId] = useState<string | null>(null);
  const [hoveredProject, setHoveredProject] = useState<Project | null>(null);
  const reduce = useReducedMotion();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 300, damping: 28, mass: 0.3 });
  const springY = useSpring(mouseY, { stiffness: 300, damping: 28, mass: 0.3 });

  const handleListMouseMove = (e: React.MouseEvent<HTMLUListElement>) => {
    if (reduce) return;
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  };

  useEffect(() => {
    let active = true;
    const fetchProjects = async () => {
      try {
        const { data, error } = await supabase
          .from("projects")
          .select("*")
          .order("created_at", { ascending: true });

        if (active && !error && data && data.length > 0) {
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
                  status:
                    (remote.status?.toUpperCase() as Project["status"]) ||
                    merged[existingIndex].status,
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
    return () => {
      active = false;
    };
  }, []);

  return (
    <>
      <ul
        onMouseMove={handleListMouseMove}
        onMouseLeave={() => setHoveredProject(null)}
        className="border-t border-rule-strong"
      >
        {projects.map((project) => (
          <ProjectRow
            key={project.id}
            project={project}
            isOpen={openId === project.id}
            onToggle={() => {
              setOpenId((prev) => {
                const next = prev === project.id ? null : project.id;
                if (next) setHoveredProject(null);
                return next;
              });
            }}
            onHover={() => {
              if (openId !== project.id) {
                setHoveredProject(project);
              }
            }}
            onLeave={() => {
              setHoveredProject((prev) => (prev?.id === project.id ? null : prev));
            }}
            reduce={reduce}
          />
        ))}
      </ul>

      {/* Floating 3D Cursor Preview Portal */}
      <AnimatePresence>
        {hoveredProject?.preview && hoveredProject.id !== openId && !reduce && (
          <motion.div
            aria-hidden="true"
            initial={{ opacity: 0, scale: 0.88, rotateY: 8, rotateX: -4 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0, rotateX: 0 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.15 } }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              x: springX,
              y: springY,
              translateX: "32px",
              translateY: "-50%",
              transformPerspective: 1000,
              pointerEvents: "none",
              zIndex: 50,
            }}
            className="hidden lg:block w-84 md:w-96 rounded-note border border-rule-strong bg-paper p-2 shadow-2xl"
          >
            <div className="overflow-hidden rounded-[2px] border border-rule bg-paper-deep">
              <Image
                src={hoveredProject.preview}
                alt=""
                width={640}
                height={380}
                priority
                className="aspect-16/10 w-full object-cover object-top"
              />
            </div>
            <div className="mt-2 flex items-center justify-between px-1 font-mono text-[11px] text-ink-soft">
              <span className="font-sans font-medium text-ink">{hoveredProject.title}</span>
              <span>{hoveredProject.confidential ? "RESTRICTED // AMD" : hoveredProject.domain || "WEB INTERFACE"}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
