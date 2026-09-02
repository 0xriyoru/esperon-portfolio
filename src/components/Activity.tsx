"use client";

import { motion } from "framer-motion";
import { GitHubCalendar } from "react-github-calendar";

export default function Activity() {
  return (
    <div className="w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="border border-border-subtle bg-secondary p-8 cyber-card overflow-x-auto"
      >
        <div className="flex items-center gap-2 mb-8 border-b border-border-subtle pb-4">
          <div className="w-2 h-2 bg-accent-pink animate-pulse" />
          <span className="font-mono text-xs text-muted tracking-widest uppercase">Github Transmission Activity</span>
        </div>
        
        <div className="flex justify-center min-w-[750px]">
          <GitHubCalendar 
            username="rhodgeesperon" 
            colorScheme="dark"
            theme={{
              dark: ['#121212', '#4d0012', '#990024', '#cc0030', '#FF003C']
            }}
            blockSize={14}
            blockMargin={5}
            fontSize={12}
            blockRadius={0}
          />
        </div>
      </motion.div>
    </div>
  );
}
