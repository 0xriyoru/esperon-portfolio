"use client";

import { useState, useEffect, useSyncExternalStore } from "react";
import { GitHubCalendar } from "react-github-calendar";

const YEAR = 2026;
const noopSubscribe = () => () => {};

export default function Activity() {
  const [count, setCount] = useState<number | null>(null);
  // false during SSR/hydration, true on the client
  const mounted = useSyncExternalStore(noopSubscribe, () => true, () => false);

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const res = await fetch("https://github-contributions-api.jogruber.de/v4/0xriyoru", {
          cache: "no-store",
        });
        if (!res.ok) return;
        const data = await res.json();
        const total = data?.total?.[YEAR];
        if (typeof total === "number") setCount(total);
      } catch (err) {
        console.warn("Unable to fetch GitHub contribution total:", err);
      }
    };

    fetchCount();
  }, []);

  return (
    <div>
      <p className="text-[15px] text-ink-soft">
        {count !== null && (
          <>
            <span className="font-mono text-ink">{count}</span>{" "}
            {count === 1 ? "contribution" : "contributions"} in {YEAR} on{" "}
          </>
        )}
        {count === null && <>{YEAR} activity on </>}
        <a
          href="https://github.com/0xriyoru"
          target="_blank"
          rel="noopener noreferrer"
          className="text-ink underline decoration-rule-strong hover:decoration-accent"
        >
          github.com/0xriyoru
        </a>
      </p>

      <div className="mt-6 flex min-h-[140px] w-full items-center overflow-x-auto">
        {mounted ? (
          <GitHubCalendar
            username="0xriyoru"
            year={YEAR}
            colorScheme="light"
            theme={{
              light: ["#dde1e8", "#b7c1f2", "#7f93ea", "#2340d9", "#182ea3"],
            }}
            blockSize={11}
            blockMargin={3}
            fontSize={12}
            blockRadius={1}
          />
        ) : (
          <div className="h-[140px] w-full animate-pulse bg-paper-deep" aria-hidden="true" />
        )}
      </div>
    </div>
  );
}
