"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";

type Skill = {
  id: string;
  category: string;
  skill_list: string[];
};

export default function Skills() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSkills() {
      try {
        const { data, error } = await supabase
          .from("skills")
          .select("*")
          .order("created_at", { ascending: true });

        if (error) throw error;
        if (data) setSkills(data);
      } catch (error) {
        console.error("Error fetching skills:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchSkills();

    const channel = supabase
      .channel("skills-realtime")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "skills" },
        () => {
          fetchSkills();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <div className="w-full">
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {[1, 2, 3, 4].map((n) => (
            <div
              key={n}
              className="p-6 rounded-xl border border-border-subtle bg-secondary/40 animate-pulse h-40"
            />
          ))}
        </div>
      ) : skills.length === 0 ? (
        <div className="p-12 border border-border-subtle bg-secondary/50 rounded-xl text-center text-muted text-sm font-sans">
          No skills inventory records found.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {skills.map((group, i) => (
        <motion.div
          key={group.id}
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: i * 0.06 }}
          className="glass-card p-6 group hover:-translate-y-1 transition-all duration-200 relative overflow-hidden"
        >
          {/* Category Header */}
          <div className="flex items-center justify-between border-b border-border-subtle pb-3 mb-4">
            <h3 className="font-cyber font-bold text-sm sm:text-base text-primary group-hover:text-accent-cyan transition-colors tracking-wide uppercase">
              {group.category}
            </h3>
            <span className="text-[10px] font-mono text-muted bg-main/80 border border-border-subtle px-2.5 py-0.5 rounded">
              {group.skill_list.length} technologies
            </span>
          </div>

          {/* Skills Tags Grid */}
          <div className="flex flex-wrap gap-2">
            {group.skill_list.map((skill, j) => (
              <span
                key={j}
                className="text-xs font-mono border border-border-subtle/80 bg-main/90 px-2.5 py-1 text-muted rounded hover:border-accent-cyan/50 hover:text-accent-cyan hover:bg-accent-cyan/10 hover:shadow-[0_0_8px_rgba(0,240,255,0.2)] transition-all cursor-default"
              >
                {skill}
              </span>
            ))}
          </div>

          {/* Bottom Laser Trace on Hover */}
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-accent-cyan to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        </motion.div>
      ))}
        </div>
      )}
    </div>
  );
}
