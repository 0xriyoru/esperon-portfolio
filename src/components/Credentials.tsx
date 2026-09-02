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

    // Listen to real-time database changes
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
          badge: "text-accent-pink border-accent-pink/40 bg-accent-pink/10",
          node: "bg-accent-pink shadow-[0_0_8px_rgba(255,0,60,0.8)]",
          border: "hover:border-accent-pink/60",
        };
      case "RECOGNITION":
        return {
          badge: "text-accent-yellow border-accent-yellow/50 bg-accent-yellow/15 shadow-[0_0_8px_rgba(252,238,9,0.3)]",
          node: "bg-accent-yellow shadow-[0_0_10px_rgba(252,238,9,1)]",
          border: "hover:border-accent-yellow/80 hover:shadow-[0_0_20px_rgba(252,238,9,0.15)]",
        };
      case "CERTIFICATE":
      case "CERTIFICATION":
        return {
          badge: "text-emerald-400 border-emerald-400/40 bg-emerald-400/10",
          node: "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]",
          border: "hover:border-emerald-400/60",
        };
      case "EVENT":
        return {
          badge: "text-accent-cyan border-accent-cyan/40 bg-accent-cyan/10",
          node: "bg-accent-cyan shadow-[0_0_8px_rgba(0,240,255,0.8)]",
          border: "hover:border-accent-cyan/60",
        };
      case "SEMINAR":
      default:
        return {
          badge: "text-muted border-border-subtle bg-main",
          node: "bg-muted shadow-[0_0_4px_rgba(255,255,255,0.2)]",
          border: "hover:border-accent-cyan/50",
        };
    }
  };

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
      <div className="flex items-center gap-2 mb-8 font-mono text-xs overflow-x-auto pb-2">
        <span className="text-muted mr-2 text-[11px] uppercase tracking-wider">FILTER:</span>
        {[
          { id: "ALL", label: "ALL" },
          { id: "WORK", label: "WORK EXPERIENCE" },
          { id: "CERTS", label: "RECOGNITIONS & CERTS" },
          { id: "EVENTS", label: "EVENTS & SEMINARS" },
        ].map((f) => (
          <button
            key={f.id}
            onClick={() => setActiveFilter(f.id)}
            className={`px-3 py-1 border transition-colors whitespace-nowrap ${
              activeFilter === f.id
                ? "border-accent-cyan bg-accent-cyan/15 text-accent-cyan font-bold shadow-[0_0_8px_rgba(0,240,255,0.2)]"
                : "border-border-subtle bg-secondary text-muted hover:text-primary hover:border-muted"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="font-mono text-accent-cyan animate-pulse py-8">&gt; DECRYPTING CREDENTIALS SCHEMA...</div>
      ) : filteredCredentials.length === 0 ? (
        <div className="font-mono text-muted py-6 text-sm border border-border-subtle p-6 bg-secondary text-center">
          No records found for filter: {activeFilter}
        </div>
      ) : (
        <div className="relative pl-6 md:pl-8 border-l border-border-subtle space-y-6">
          {filteredCredentials.map((cred, i) => {
            const style = getTypeStyle(cred.type);
            const isRecognition = cred.type.toUpperCase() === "RECOGNITION";

            return (
              <motion.div
                key={cred.id}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className={`relative group border border-border-subtle bg-secondary p-5 md:p-6 cyber-card transition-all duration-200 ${style.border}`}
              >
                {/* Timeline Circuit Node */}
                <div
                  className={`absolute -left-[31px] md:-left-[39px] top-6 w-3 h-3 rounded-full border-2 border-main ${style.node}`}
                />

                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`text-[10px] font-mono border px-2 py-0.5 font-bold uppercase tracking-wider ${style.badge}`}>
                      {cred.type === "RECOGNITION" ? "★ RECOGNITION" : cred.type}
                    </span>
                    <span className="text-xs font-mono text-accent-cyan">{cred.organization}</span>
                  </div>
                  <span className="text-xs font-mono text-muted">{cred.date_range}</span>
                </div>

                <h3 className={`font-mono font-bold text-lg mb-2 transition-colors ${
                  isRecognition 
                    ? "text-primary group-hover:text-accent-yellow" 
                    : "text-primary group-hover:text-accent-cyan"
                }`}>
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
                        className="px-2 py-0.5 text-[9px] font-mono border border-border-subtle bg-main text-muted"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}

                {/* Proof / Certificate link actions */}
                {(cred.certificate_url || cred.credential_url) && (
                  <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-border-subtle/50 font-mono text-xs">
                    {cred.certificate_url && (
                      <a
                        href={cred.certificate_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1 border border-accent-yellow/60 bg-accent-yellow/10 text-accent-yellow text-[11px] font-bold hover:bg-accent-yellow hover:text-main transition-colors shadow-[0_0_8px_rgba(252,238,9,0.15)]"
                      >
                        <span>VIEW CERTIFICATE / PROOF</span>
                        <span>↗</span>
                      </a>
                    )}
                    {cred.credential_url && !cred.certificate_url && (
                      <a
                        href={cred.credential_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1 border border-accent-cyan/60 bg-accent-cyan/10 text-accent-cyan text-[11px] hover:bg-accent-cyan hover:text-main transition-colors"
                      >
                        <span>VIEW CREDENTIAL</span>
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

