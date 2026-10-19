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

  const rotateX = useTransform(springY, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-10, 10]);

  const handlePointerMove = (e: React.PointerEvent<HTMLElement>) => {
    if (reduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    rawX.set((e.clientX - rect.left) / rect.width - 0.5);
    rawY.set((e.clientY - rect.top) / rect.height - 0.5);
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
      className="hero-fade mix-blend-multiply lg:col-span-4 lg:justify-self-end"
    >
      <motion.div
        style={
          reduce
            ? undefined
            : {
                rotateX,
                rotateY,
              }
        }
        className="relative h-60 w-60 md:h-72 md:w-72"
      >
        {/* Feathered bottom/shoulder blur layer (no circular mask) */}
        <Image
          src="/profile.png"
          alt=""
          aria-hidden="true"
          width={288}
          height={288}
          className="pointer-events-none absolute inset-0 h-full w-full translate-y-1 scale-[1.02] object-cover opacity-50 blur-md grayscale-[0.15] [mask-image:linear-gradient(to_bottom,transparent_60%,black_85%,transparent_100%)]"
        />

        {/* Full portrait with natural head/hair silhouette and soft bottom-edge fade */}
        <Image
          src="/profile.png"
          alt="Portrait of Rhodge Esperon"
          width={288}
          height={288}
          priority
          className="relative h-full w-full object-cover grayscale-[0.15] [mask-image:linear-gradient(to_bottom,black_78%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,black_78%,transparent_100%)]"
        />
      </motion.div>

      <figcaption className="mt-3 text-sm text-ink-soft">
        Olongapo City, Philippines
      </figcaption>
    </figure>
  );
}
