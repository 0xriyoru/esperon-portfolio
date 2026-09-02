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
  }, []);

  return (
    <div className="w-full">
      {loading ? (
        <div className="font-mono text-accent-cyan animate-pulse">&gt; QUERYING SKILLS SCHEMA...</div>
      ) : skills.length === 0 ? (
        <div className="font-mono text-accent-pink cyber-glitch-text" data-text="NO SKILLS DATA FOUND">NO SKILLS DATA FOUND</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {skills.map((group, i) => (
            <motion.div
              key={group.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.1 }}
              className="border border-border-subtle bg-main p-6 cyber-card group hover:border-accent-cyan transition-colors"
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xs text-muted font-mono">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="font-bold text-lg group-hover:text-accent-cyan transition-colors">{group.category}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {group.skill_list.map((skill, j) => (
                  <span 
                    key={j} 
                    className="text-xs font-mono border border-border-subtle bg-secondary px-3 py-1 hover:border-accent-yellow hover:text-accent-yellow transition-colors cursor-default"
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
