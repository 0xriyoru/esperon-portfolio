"use client";

import { ArrowUpRight } from "@phosphor-icons/react";
import { staticSkills, getSkillMeta } from "@/data/skillsData";

export default function Skills() {
  const skills = staticSkills;

  return (
    <div className="grid grid-cols-1 gap-x-12 gap-y-12 md:grid-cols-2 lg:gap-x-16 lg:gap-y-14">
      {skills.map((group) => (
        <section key={group.id} className="border-t border-rule-strong pt-5">
          <div className="flex items-baseline justify-between gap-4 mb-4">
            <h3 className="font-display text-xl sm:text-2xl font-light tracking-tight text-ink">
              {group.category}
            </h3>
            <span className="font-mono text-xs text-ink-soft shrink-0">
              {group.skill_list.length} items
            </span>
          </div>

          <div className="flex flex-wrap gap-2.5">
            {group.skill_list.map((skillName) => {
              const meta = getSkillMeta(skillName);
              const Icon = meta.icon;

              return (
                <a
                  key={skillName}
                  href={meta.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${meta.name} (official website, opens in new tab)`}
                  className="group inline-flex items-center gap-2 rounded-note border border-rule bg-paper px-3 py-1.5 text-sm text-ink-soft transition-all duration-200 hover:border-accent hover:bg-paper-deep hover:text-ink hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-2 focus-visible:outline-accent"
                >
                  <span className="flex items-center justify-center text-ink-soft transition-colors group-hover:text-accent shrink-0">
                    <Icon size={15} aria-hidden="true" />
                  </span>
                  <span className="text-[13.5px] font-medium leading-none text-ink transition-colors group-hover:text-accent">
                    {meta.name}
                  </span>
                  <ArrowUpRight
                    size={12}
                    weight="bold"
                    className="text-ink-soft/40 transition-all group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0"
                    aria-hidden="true"
                  />
                </a>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
