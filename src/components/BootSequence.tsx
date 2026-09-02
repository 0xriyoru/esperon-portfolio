"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const bootMessages = [
  "BREACHING MAINFRAME...",
  "BYPASSING ICE PROTOCOLS...",
  "DECRYPTING NEURAL LINK...",
  "SYNCING BIOMETRICS...",
  "ACCESS GRANTED"
];

export default function BootSequence({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      index++;
      if (index < bootMessages.length) {
        setMessageIndex(index);
      } else {
        clearInterval(interval);
        setTimeout(() => setLoading(false), 800);
      }
    }, 400);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <AnimatePresence>
        {loading && (
          <motion.div
            key="boot-screen"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#FCEE09] text-main font-mono overflow-hidden"
          >
            {/* Aggressive background glitch lines */}
            <motion.div 
              animate={{ 
                top: ["-10%", "110%", "50%", "110%", "-10%"],
                opacity: [0, 0.5, 0.8, 0, 0.5]
              }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "linear", times: [0, 0.4, 0.5, 0.9, 1] }}
              className="absolute left-0 w-full h-32 bg-gradient-to-b from-transparent via-black/20 to-transparent pointer-events-none mix-blend-overlay"
            />
            
            <div className="flex flex-col items-start max-w-lg w-full px-8 relative z-10">
              <motion.div 
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                className="mb-8 font-black text-6xl tracking-tighter"
              >
                <div className="cyber-glitch-text block" data-text="SYSTEM">SYSTEM</div>
                <div className="cyber-glitch-text block" data-text="OVERRIDE">OVERRIDE</div>
              </motion.div>
              
              <div className="space-y-1 w-full bg-main text-[#FCEE09] p-6 cyber-card">
                {bootMessages.slice(0, messageIndex + 1).map((msg, i) => {
                  const isLast = i === bootMessages.length - 1;
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20, filter: "blur(4px)" }}
                      animate={{ 
                        opacity: 1, 
                        x: 0, 
                        filter: "blur(0px)",
                        clipPath: isLast 
                          ? ["inset(0 0 100% 0)", "inset(40% 0 10% 0)", "inset(10% 0 80% 0)", "inset(0 0 0 0)"]
                          : "inset(0 0 0 0)"
                      }}
                      transition={{ 
                        duration: isLast ? 0.4 : 0.1, 
                        times: isLast ? [0, 0.3, 0.6, 1] : undefined 
                      }}
                      className={`text-lg font-bold tracking-widest ${
                        isLast 
                          ? 'text-[#00F0FF] text-xl mt-4 bg-main p-2 inline-block shadow-[4px_0_0_#FF003C,-4px_0_0_#00F0FF]' 
                          : ''
                      }`}
                    >
                      {isLast ? `[ ${msg} ]` : `> ${msg}`}
                    </motion.div>
                  );
                })}
                
                {messageIndex < bootMessages.length - 1 && (
                  <motion.div
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ repeat: Infinity, duration: 0.2 }}
                    className="w-4 h-6 bg-[#00F0FF] mt-2"
                  />
                )}
              </div>
            </div>
            
            {/* Chromatic aberration flashes on the whole screen */}
            <motion.div 
              animate={{ 
                opacity: [0, 1, 0, 0, 0.8, 0],
                x: [0, -10, 0, 0, 10, 0]
              }}
              transition={{ repeat: Infinity, duration: 2, times: [0, 0.05, 0.1, 0.8, 0.85, 0.9] }}
              className="absolute inset-0 border-[8px] border-[#FF003C] pointer-events-none mix-blend-difference"
            />
          </motion.div>
        )}
      </AnimatePresence>
      
      {!loading && children}
    </>
  );
}
