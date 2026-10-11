"use client";

import { useState } from "react";
import { ArrowUpRight } from "@phosphor-icons/react";
import { staticCredentials } from "@/data/credentialsData";

const VISIBLE_COUNT = 6;

export default function Credentials() {
  const [showAll, setShowAll] = useState(false);

  // The internship has its own band above this list, so it is not repeated here.
  const entries = staticCredentials.filter((c) => c.type?.toUpperCase() !== "WORK");
  const visible = showAll ? entries : entries.slice(0, VISIBLE_COUNT);

  return (
    <div>
      <ul className="border-t border-rule-strong">
        {visible.map((cred) => {
          const url = cred.certificate_url || cred.credential_url;
          return (
            <li
              key={cred.id}
              className="grid gap-x-8 gap-y-1 border-b border-rule py-5 md:grid-cols-[9rem_1fr_auto]"
            >
              <span className="font-mono text-[13px] text-ink-soft">{cred.date_range}</span>
              <div>
                <h3 className="text-base font-medium leading-snug">{cred.title}</h3>
                <p className="mt-0.5 text-[15px] text-ink-soft">{cred.organization}</p>
                {cred.description && (
                  <p className="mt-2 max-w-[62ch] text-[15px] leading-relaxed text-ink-soft">
                    {cred.description}
                  </p>
                )}
              </div>
              {url && (
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-1 self-start text-sm text-accent link-draw md:mt-0"
                >
                  Certificate
                  <ArrowUpRight size={14} aria-hidden="true" />
                </a>
              )}
            </li>
          );
        })}
      </ul>

      {entries.length > VISIBLE_COUNT && (
        <button
          type="button"
          onClick={() => setShowAll((v) => !v)}
          className="mt-6 cursor-pointer text-sm text-accent link-draw"
        >
          {showAll ? "Show fewer" : `Show all ${entries.length}`}
        </button>
      )}
    </div>
  );
}
