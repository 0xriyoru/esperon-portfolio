"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";

export default function ExperienceSlab({
  children,
}: {
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 26,
    mass: 0.4,
  });

  const rotateX = useTransform(
    smoothProgress,
    [0, 0.35, 0.65, 1],
    [12, 0, 0, -10]
  );
  const scale = useTransform(
    smoothProgress,
    [0, 0.35, 0.65, 1],
    [0.965, 1, 1, 0.975]
  );
  const y = useTransform(smoothProgress, [0, 0.35, 0.65, 1], [24, 0, 0, -16]);

  return (
    <div
      ref={ref}
      style={{ perspective: "1200px" }}
      className="border-y border-rule-strong bg-paper-deep/40"
    >
      <motion.div
        style={
          reduce
            ? undefined
            : {
                rotateX,
                scale,
                y,
                transformOrigin: "center center",
                transformStyle: "preserve-3d",
              }
        }
        className="bg-accent text-on-accent will-change-transform"
      >
        {children}
      </motion.div>
    </div>
  );
}
