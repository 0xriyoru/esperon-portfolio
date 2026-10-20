"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  wrap,
} from "motion/react";
import {
  SiFigma,
  SiNextdotjs,
  SiPostgresql,
  SiReact,
  SiSupabase,
  SiTailwindcss,
  SiTypescript,
} from "@icons-pack/react-simple-icons";

const stackIcons = [
  { Icon: SiReact, name: "React" },
  { Icon: SiNextdotjs, name: "Next.js" },
  { Icon: SiTypescript, name: "TypeScript" },
  { Icon: SiPostgresql, name: "PostgreSQL" },
  { Icon: SiSupabase, name: "Supabase" },
  { Icon: SiTailwindcss, name: "Tailwind CSS" },
  { Icon: SiFigma, name: "Figma" },
];

function FactGroup({
  measureRef,
  ariaHidden = false,
}: {
  measureRef?: React.Ref<HTMLDivElement>;
  ariaHidden?: boolean;
}) {
  return (
    <div
      ref={measureRef}
      aria-hidden={ariaHidden || undefined}
      className="flex shrink-0 items-center gap-16 pr-16 md:gap-24 md:pr-24"
    >
      {/* Academic Standing */}
      <div className="flex shrink-0 items-center gap-4">
        <Image
          src="/lsb-ccs-logo.png"
          alt="Lyceum of Subic Bay College of Computer Studies crest"
          width={44}
          height={52}
          draggable={false}
          className="h-11 w-auto shrink-0 select-none object-contain pointer-events-none"
        />
        <div>
          <div className="text-xs text-ink-soft">Academic Standing</div>
          <div className="mt-0.5 whitespace-nowrap text-[15px] text-ink">
            BSIT Senior · Class of 2027 · Defensive Security & Web Focus
          </div>
        </div>
      </div>

      <span aria-hidden="true" className="h-8 w-px shrink-0 bg-rule" />

      {/* Industry Practicum */}
      <div className="flex shrink-0 items-center gap-4">
        <Image
          src="/sbma-logo.png"
          alt="Subic Bay Metropolitan Authority logo"
          width={126}
          height={44}
          draggable={false}
          className="h-9 w-auto shrink-0 select-none object-contain pointer-events-none"
        />
        <div>
          <div className="text-xs text-ink-soft">Industry Practicum</div>
          <div className="mt-0.5 whitespace-nowrap text-[15px] text-ink">
            Asset Management Division at SBMA · 500-Hour OJT Completed
          </div>
        </div>
      </div>

      <span aria-hidden="true" className="h-8 w-px shrink-0 bg-rule" />

      {/* Target Trajectory */}
      <div className="flex shrink-0 items-center gap-4">
        <div
          aria-hidden="true"
          className="flex items-center gap-1.5 rounded-note border border-rule bg-paper px-2.5 py-1.5 text-ink-soft pointer-events-none"
        >
          {stackIcons.map(({ Icon, name }) => (
            <Icon key={name} size={15} />
          ))}
        </div>
        <div>
          <div className="text-xs text-ink-soft">Target Trajectory</div>
          <div className="mt-0.5 whitespace-nowrap text-[15px] text-ink">
            Junior Full-Stack Developer · SOC Tier 1 Security Analyst
          </div>
        </div>
      </div>

      <span aria-hidden="true" className="h-8 w-px shrink-0 bg-rule" />
    </div>
  );
}

const BASE_VELOCITY = -45; // baseline pixels per second drift

export default function FactTicker() {
  const reduce = useReducedMotion();
  const setRef = useRef<HTMLDivElement>(null);
  const setWidthRef = useRef(0);
  const isPanningRef = useRef(false);
  const velocityRef = useRef(BASE_VELOCITY);

  const x = useMotionValue(0);

  useEffect(() => {
    const updateWidth = () => {
      if (setRef.current) {
        setWidthRef.current = setRef.current.offsetWidth;
      }
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  useAnimationFrame((_, delta) => {
    if (reduce || !setWidthRef.current) return;
    const dt = delta / 1000;

    if (isPanningRef.current) return;

    // Decay any swipe flick velocity smoothly back to baseline drift
    velocityRef.current += (BASE_VELOCITY - velocityRef.current) * Math.min(dt * 3.2, 1);

    const nextX = x.get() + velocityRef.current * dt;
    x.set(wrap(-setWidthRef.current, 0, nextX));
  });

  if (reduce) {
    return (
      <div className="w-full overflow-x-auto py-8 mix-blend-multiply">
        <div className="mx-auto flex max-w-[1280px] px-5 md:px-10">
          <FactGroup />
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full overflow-hidden py-8 mix-blend-multiply [mask-image:linear-gradient(to_right,transparent_0%,black_6%,black_94%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_right,transparent_0%,black_6%,black_94%,transparent_100%)]">
      <motion.div
        style={{ x }}
        onPanStart={() => {
          isPanningRef.current = true;
        }}
        onPan={(_, info) => {
          if (!setWidthRef.current) return;
          const nextX = x.get() + info.delta.x;
          x.set(wrap(-setWidthRef.current, 0, nextX));
        }}
        onPanEnd={(_, info) => {
          isPanningRef.current = false;
          // Carry the user's swipe flick velocity with momentum
          velocityRef.current = info.velocity.x;
        }}
        className="flex w-max items-center will-change-transform cursor-grab active:cursor-grabbing select-none"
      >
        <FactGroup measureRef={setRef} />
        <FactGroup ariaHidden />
        <FactGroup ariaHidden />
      </motion.div>
    </div>
  );
}
