"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
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

function FactItems({ ariaHidden = false }: { ariaHidden?: boolean }) {
  return (
    <div
      aria-hidden={ariaHidden || undefined}
      className="flex shrink-0 items-center gap-14 pr-14 md:gap-20 md:pr-20"
    >
      {/* Studying */}
      <div className="flex shrink-0 items-center gap-4">
        <Image
          src="/lsb-ccs-logo.png"
          alt="Lyceum of Subic Bay College of Computer Studies crest"
          width={44}
          height={52}
          className="h-12 w-auto shrink-0 object-contain"
        />
        <div>
          <div className="text-xs text-ink-soft">Studying</div>
          <div className="mt-0.5 text-[15px] text-ink">
            BS Information Technology, Lyceum of Subic Bay. 2023 to present.
          </div>
        </div>
      </div>

      <span aria-hidden="true" className="h-8 w-px shrink-0 bg-rule" />

      {/* On-The-Job Training */}
      <div className="flex shrink-0 items-center gap-4">
        <Image
          src="/sbma-logo.png"
          alt="Subic Bay Metropolitan Authority logo"
          width={126}
          height={44}
          className="h-10 w-auto shrink-0 object-contain"
        />
        <div>
          <div className="text-xs text-ink-soft">On-The-Job Training</div>
          <div className="mt-0.5 text-[15px] text-ink">
            Asset Management Department (AMD) at SBMA, May to September 2026.
          </div>
        </div>
      </div>

      <span aria-hidden="true" className="h-8 w-px shrink-0 bg-rule" />

      {/* Works with */}
      <div className="flex shrink-0 items-center gap-4">
        <div
          aria-hidden="true"
          className="flex items-center gap-2 rounded-note border border-rule px-3 py-2 text-ink-soft"
        >
          {stackIcons.map(({ Icon, name }) => (
            <Icon key={name} size={16} />
          ))}
        </div>
        <div>
          <div className="text-xs text-ink-soft">Works with</div>
          <div className="mt-0.5 text-[15px] text-ink">
            React, Next.js, TypeScript, PostgreSQL, Supabase, Tailwind CSS, Figma.
          </div>
        </div>
      </div>

      <span aria-hidden="true" className="h-8 w-px shrink-0 bg-rule" />
    </div>
  );
}

export default function FactTicker() {
  const reduce = useReducedMotion();

  if (reduce) {
    return (
      <div className="mx-auto max-w-[1280px] overflow-x-auto px-5 py-8 mix-blend-multiply md:px-10">
        <FactItems />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1280px] px-5 py-8 mix-blend-multiply md:px-10">
      <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent_0%,black_12%,black_88%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_right,transparent_0%,black_12%,black_88%,transparent_100%)]">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 32,
            ease: "linear",
            repeat: Infinity,
          }}
          className="flex w-max items-center will-change-transform"
        >
          <FactItems />
          <FactItems ariaHidden />
        </motion.div>
      </div>
    </div>
  );
}
