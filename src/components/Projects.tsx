"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { motion } from "framer-motion";

type Project = {
  id: string;
  title: string;
  description: string;
  type: string;
  tags: string[];
  status: string;
  link: string;
  domain: string;
  image_url: string;
};

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: true });
        
      if (!error && data) {
        setProjects(data);
      }
      setLoading(false);
    };
    
    fetchProjects();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {[1, 2].map((i) => (
          <div key={i} className="h-[400px] border border-border-subtle bg-secondary animate-pulse flex items-center justify-center">
            <span className="font-mono text-muted text-xs">Querying database...</span>
          </div>
        ))}
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="p-8 border border-border-subtle bg-secondary text-center">
        <p className="text-muted font-mono text-sm">No projects found in database.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {projects.map((project, i) => (
        <motion.a
          href={project.link || "#"}
          target={project.link ? "_blank" : undefined}
          rel={project.link ? "noopener noreferrer" : undefined}
          key={project.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.3, delay: i * 0.1 }}
          className={`group relative border border-border-subtle bg-secondary flex flex-col min-h-[400px] transition-colors overflow-hidden cyber-card ${project.link ? 'hover:border-accent-yellow cursor-pointer' : 'cursor-default'}`}
        >
          {/* Top Header - Domain & Link Arrow */}
          <div className="flex justify-between items-center p-4 border-b border-border-subtle font-mono text-xs text-muted">
             <span>{project.domain || "LOCAL_NETWORK"}</span>
             <span className={`${project.link ? 'group-hover:text-accent-yellow transition-colors' : 'opacity-0'}`}>↗</span>
          </div>
          
          {/* Main Body */}
          <div className="flex flex-col flex-1 p-6">
            <h3 className={`font-mono font-bold text-2xl text-primary mb-2 transition-colors ${project.link ? 'group-hover:text-accent-yellow' : ''}`}>
              {project.title}
            </h3>
            <div className="text-xs font-mono text-accent-cyan mb-4">{project.type}</div>
            
            <p className="text-muted text-sm flex-1 mb-8">
              {project.description}
            </p>

            {/* Bottom Section - Status & Tags */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mt-auto">
              <div className="flex flex-wrap gap-2 order-2 sm:order-1">
                {project.tags?.map((tag, idx) => (
                  <span key={idx} className={`px-2 py-1 text-[10px] font-mono border border-border-subtle text-muted transition-colors ${project.link ? 'group-hover:border-accent-yellow/30' : ''}`}>
                    {tag.toUpperCase()}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-2 font-mono text-[10px] tracking-widest text-muted order-1 sm:order-2 shrink-0">
                <span className={`w-2 h-2 rounded-full ${project.status?.toLowerCase() === 'deployed' ? 'bg-accent-cyan animate-[pulse_2s_ease-in-out_infinite]' : 'bg-accent-pink'}`} />
                {project.status?.toUpperCase() || 'DEVELOPMENT'}
              </div>
            </div>
          </div>
        </motion.a>
      ))}
    </div>
  );
}
