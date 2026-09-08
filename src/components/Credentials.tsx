"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";

type Credential = {
  id: string;
  title: string;
  organization: string;
  type: string;
  date_range: string;
  description: string;
  certificate_url?: string;
  credential_url?: string;
  skills_acquired?: string[];
  is_featured?: boolean;
};

export default function Credentials() {
  const [credentials, setCredentials] = useState<Credential[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<string>("ALL");

  useEffect(() => {
    async function fetchCredentials() {
      try {
        const { data, error } = await supabase
          .from("credentials")
          .select("*")
          .order("created_at", { ascending: true });

        if (error) throw error;
        if (data) setCredentials(data);
      } catch (error) {
        console.error("Error fetching credentials:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchCredentials();

    const channel = supabase
      .channel("credentials-realtime")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "credentials" },
        () => {
          fetchCredentials();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const getTypeStyle = (type: string) => {
    switch (type.toUpperCase()) {
      case "WORK":
        return {
          label: "Work Experience",
          badge: "text-accent-cyan bg-accent-cyan/10 border-accent-cyan/20",
          node: "bg-accent-cyan shadow-[0_0_8px_rgba(0,240,255,0.6)]",
        };
      case "RECOGNITION":
        return {
          label: "Recognition",
          badge: "text-accent-amber bg-accent-amber/10 border-accent-amber/20",
          node: "bg-accent-amber shadow-[0_0_8px_rgba(245,158,11,0.6)]",
        };
      case "CERTIFICATE":
      case "CERTIFICATION":
        return {
          label: "Certification",
          badge: "text-accent-emerald bg-accent-emerald/10 border-accent-emerald/20",
          node: "bg-accent-emerald shadow-[0_0_8px_rgba(16,185,129,0.6)]",
        };
      case "EVENT":
      case "SEMINAR":
      default:
        return {
          label: "Conference / Event",
          badge: "text-muted bg-main border-border-subtle",
          node: "bg-muted shadow-[0_0_6px_rgba(255,255,255,0.2)]",
        };
    }
  };

  const filterOptions = [
    { id: "ALL", label: "All Milestones" },
    { id: "WORK", label: "Work Experience" },
    { id: "CERTS", label: "Certifications & Honors" },
    { id: "EVENTS", label: "Events & Seminars" },
  ];

  const filteredCredentials = credentials.filter((cred) => {
    const t = cred.type.toUpperCase();
    if (activeFilter === "ALL") return true;
    if (activeFilter === "WORK") return t === "WORK";
    if (activeFilter === "CERTS") return t === "RECOGNITION" || t === "CERTIFICATE" || t === "CERTIFICATION";
    if (activeFilter === "EVENTS") return t === "EVENT" || t === "SEMINAR";
    return true;
  });

  return (
    <div className="w-full">
      {/* Filter Tabs */}
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

      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className="p-6 rounded-xl border border-border-subtle bg-secondary/40 animate-pulse h-32"
            />
          ))}
        </div>
      ) : filteredCredentials.length === 0 ? (
        <div className="p-12 border border-border-subtle bg-secondary/50 rounded-xl text-center text-muted text-sm font-sans">
          No records found under this filter.
        </div>
      ) : (
        <div className="relative pl-6 md:pl-8 border-l border-border-subtle space-y-6">
          {filteredCredentials.map((cred, i) => {
            const style = getTypeStyle(cred.type);

            return (
              <motion.div
                key={cred.id}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="relative group glass-card p-6 hover:-translate-y-0.5 transition-all duration-200"
              >
                {/* Timeline Node */}
                <div
                  className={`absolute -left-[31px] md:-left-[39px] top-6 w-3 h-3 rounded-full border-2 border-main ${style.node}`}
                />

                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`text-[11px] font-mono border px-2.5 py-0.5 rounded-md font-medium tracking-wide ${style.badge}`}>
                      {style.label}
                    </span>
                    <span className="text-xs font-mono text-primary font-medium">{cred.organization}</span>
                  </div>
                  <span className="text-xs font-mono text-muted">{cred.date_range}</span>
                </div>

                <h3 className="font-sans font-bold text-lg text-primary group-hover:text-accent-cyan transition-colors mb-2 tracking-tight">
                  {cred.title}
                </h3>

                {cred.description && (
                  <p className="text-muted text-xs md:text-sm leading-relaxed font-sans mb-4">
                    {cred.description}
                  </p>
                )}

                {/* Skills Acquired Tags */}
                {cred.skills_acquired && cred.skills_acquired.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {cred.skills_acquired.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 text-[10px] font-mono border border-border-subtle bg-main/80 text-muted rounded-md"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}

                {/* Proof / Certificate link actions */}
                {(cred.certificate_url || cred.credential_url) && (
                  <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-border-subtle/50 text-xs">
                    {cred.certificate_url && (
                      <a
                        href={cred.certificate_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md border border-accent-amber/30 bg-accent-amber/10 text-accent-amber text-xs font-medium hover:bg-accent-amber/20 transition-colors"
                      >
                        <span>View Certificate / Proof</span>
                        <span>↗</span>
                      </a>
                    )}
                    {cred.credential_url && !cred.certificate_url && (
                      <a
                        href={cred.credential_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md border border-accent-cyan/30 bg-accent-cyan/10 text-accent-cyan text-xs font-medium hover:bg-accent-cyan/20 transition-colors"
                      >
                        <span>View Credential</span>
                        <span>↗</span>
                      </a>
                    )}
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
