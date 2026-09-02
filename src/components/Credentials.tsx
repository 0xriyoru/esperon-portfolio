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
  }, []);

  const getTypeColor = (type: string) => {
    switch(type.toUpperCase()) {
      case 'WORK': return 'text-accent-pink border-accent-pink';
      case 'CERTIFICATION': return 'text-accent-cyan border-accent-cyan';
      case 'EVENT': return 'text-accent-yellow border-accent-yellow';
      default: return 'text-primary border-border-subtle';
    }
  };

  return (
    <div className="w-full">
      {loading ? (
        <div className="font-mono text-accent-cyan animate-pulse">&gt; DECRYPTING CREDENTIALS...</div>
      ) : credentials.length === 0 ? (
        <div className="font-mono text-accent-pink cyber-glitch-text" data-text="NO CREDENTIALS FOUND">NO CREDENTIALS FOUND</div>
      ) : (
        <div className="space-y-6">
          {credentials.map((cred, i) => (
            <motion.div
              key={cred.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.1 }}
              className="flex flex-col md:flex-row gap-4 p-4 border border-border-subtle bg-secondary hover:border-accent-cyan transition-colors cyber-card group"
            >
              <div className="md:w-48 shrink-0 flex flex-col justify-between">
                <span className={`text-[10px] font-mono border px-2 py-1 inline-block w-max mb-2 ${getTypeColor(cred.type)}`}>
                  {cred.type}
                </span>
                <span className="text-xs font-mono text-muted">{cred.date_range}</span>
              </div>
              
              <div className="flex-1 border-l border-border-subtle pl-4 md:pl-6">
                <h3 className="font-bold text-lg text-primary mb-1 group-hover:text-accent-yellow transition-colors">{cred.title}</h3>
                <div className="text-sm text-accent-cyan font-mono mb-2">{cred.organization}</div>
                {cred.description && (
                  <p className="text-sm text-muted">{cred.description}</p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
