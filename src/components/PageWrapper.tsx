"use client";

import { motion } from "framer-motion";

export default function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="flex-1 w-full max-w-4xl xl:max-w-5xl mx-auto py-8 sm:py-20 px-4 sm:px-8"
    >
      {children}
    </motion.div>
  );
}
