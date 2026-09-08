"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function PageViews() {
  const [views, setViews] = useState<number | null>(null);

  useEffect(() => {
    const incrementAndFetchViews = async () => {
      try {
        const { data, error } = await supabase.rpc("increment_page_view");

        if (!error && data !== null) {
          setViews(data);
        }
      } catch (e) {
        console.error(e);
      }
    };

    incrementAndFetchViews();
  }, []);

  if (views === null) return null;

  return (
    <div className="fixed bottom-5 right-5 font-mono text-[11px] text-muted bg-secondary/90 backdrop-blur-md border border-border-subtle px-3 py-1.5 rounded-full z-30 shadow-lg flex items-center gap-2">
      <span className="w-1.5 h-1.5 rounded-full bg-accent-emerald animate-pulse" />
      <span>
        <span className="text-primary font-semibold">{views.toLocaleString()}</span> visits
      </span>
    </div>
  );
}
