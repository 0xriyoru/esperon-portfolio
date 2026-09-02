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

    // Listen to real-time database changes
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
        <div className="font-mono text-accent-cyan animate-pulse py-8">&gt; QUERYING SKILLS SCHEMA...</div>
      ) : skills.length === 0 ? (
        <div className="font-mono text-muted p-8 border border-border-subtle bg-secondary text-center">
          No skills data loaded from database.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {skills.map((group, i) => (
            <motion.div
              key={group.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.08 }}
              className="border border-border-subtle bg-secondary p-6 cyber-card group hover:border-accent-cyan transition-all duration-200"
            >
              {/* Category Header */}
              <div className="flex items-center justify-between border-b border-border-subtle pb-3 mb-4 font-mono">
                <div className="flex items-center gap-2.5">
                  <span className="text-[10px] text-accent-yellow font-bold">
                    [{String(i + 1).padStart(2, "0")}]
                  </span>
                  <h3 className="font-bold text-sm tracking-wide text-primary group-hover:text-accent-cyan transition-colors uppercase">
                    {group.category}
                  </h3>
                </div>
                <span className="text-[10px] text-muted">{group.skill_list.length} MODULES</span>
              </div>

              {/* Skills Tags Grid */}
              <div className="flex flex-wrap gap-2">
                {group.skill_list.map((skill, j) => (
                  <span
                    key={j}
                    className="text-xs font-mono border border-border-subtle bg-main px-3 py-1.5 text-muted hover:text-accent-cyan hover:border-accent-cyan/50 hover:bg-accent-cyan/5 transition-colors cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
