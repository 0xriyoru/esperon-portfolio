"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";

const SPRING = { stiffness: 180, damping: 22, mass: 0.5 };

export default function HeroSpecimen() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const springX = useSpring(rawX, SPRING);
  const springY = useSpring(rawY, SPRING);

  const rotateX = useTransform(springY, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-12, 12]);
  const sheetX = useTransform(springX, [-0.5, 0.5], [8, -8]);
  const sheetY = useTransform(springY, [-0.5, 0.5], [8, -8]);

  const handlePointerMove = (e: React.PointerEvent<HTMLElement>) => {
    if (reduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    rawX.set(nx);
    rawY.set(ny);
  };

  const handlePointerLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  return (
    <figure
      ref={ref}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{ perspective: "1200px" }}
      className="hero-fade lg:col-span-4 lg:justify-self-end"
    >
      <motion.div
        style={
          reduce
            ? undefined
            : {
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
              }
        }
        className="relative inline-block"
      >
        {/* Backing index-sheet plane */}
        <motion.div
          aria-hidden="true"
          style={
            reduce
              ? undefined
              : {
                  x: sheetX,
                  y: sheetY,
                  translateZ: -18,
                }
          }
          className="pointer-events-none absolute inset-0 translate-x-2.5 translate-y-2.5 rounded-note border border-rule-strong bg-paper-deep/60"
        />

        {/* Primary portrait specimen frame */}
        <div
          style={reduce ? undefined : { transform: "translateZ(8px)" }}
          className="relative rounded-note border border-rule-strong bg-paper p-2"
        >
          <Image
            src="/profile-hero.jpg"
            alt="Portrait of Rhodge Esperon"
            width={640}
            height={853}
            priority
            className="h-72 w-54 object-cover object-top grayscale-[0.08] md:h-96 md:w-72"
          />
        </div>
      </motion.div>

      <figcaption className="mt-3 text-sm text-ink-soft">
        Olongapo City, Philippines
      </figcaption>
    </figure>
  );
}
