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
      case "EVENT":
        return {
          badge: "text-accent-yellow border-accent-yellow/40 bg-accent-yellow/10",
          node: "bg-accent-yellow shadow-[0_0_8px_rgba(252,238,9,0.8)]",
          border: "hover:border-accent-yellow/60",
        };
      case "SEMINAR":
      case "CERTIFICATION":
      default:
        return {
          badge: "text-accent-cyan border-accent-cyan/40 bg-accent-cyan/10",
          node: "bg-accent-cyan shadow-[0_0_8px_rgba(0,240,255,0.8)]",
          border: "hover:border-accent-cyan/60",
        };
    }
  };

  const filteredCredentials = credentials.filter((cred) => {
    if (activeFilter === "ALL") return true;
    if (activeFilter === "WORK") return cred.type.toUpperCase() === "WORK";
    if (activeFilter === "EVENTS")
      return cred.type.toUpperCase() === "EVENT" || cred.type.toUpperCase() === "SEMINAR";
    return true;
  });

  return (
    <div className="w-full">
      {/* Filter Tabs */}
      <div className="flex items-center gap-2 mb-8 font-mono text-xs overflow-x-auto pb-2">
        <span className="text-muted mr-2 text-[11px] uppercase tracking-wider">FILTER:</span>
        {["ALL", "WORK", "EVENTS"].map((f) => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            className={`px-3 py-1 border transition-colors ${
              activeFilter === f
                ? "border-accent-cyan bg-accent-cyan/15 text-accent-cyan font-bold shadow-[0_0_8px_rgba(0,240,255,0.2)]"
                : "border-border-subtle bg-secondary text-muted hover:text-primary hover:border-muted"
            }`}
          >
            {f === "EVENTS" ? "EVENTS & SEMINARS" : f}
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
                  <div className="flex items-center gap-3">
                    <span className={`text-[10px] font-mono border px-2 py-0.5 font-bold uppercase tracking-wider ${style.badge}`}>
                      {cred.type}
                    </span>
                    <span className="text-xs font-mono text-accent-cyan">{cred.organization}</span>
                  </div>
                  <span className="text-xs font-mono text-muted">{cred.date_range}</span>
                </div>

                <h3 className="font-mono font-bold text-lg text-primary mb-2 group-hover:text-accent-yellow transition-colors">
                  {cred.title}
                </h3>

                {cred.description && (
                  <p className="text-muted text-xs md:text-sm leading-relaxed font-sans">
                    {cred.description}
                  </p>
                )}
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
