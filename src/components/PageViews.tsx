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
    <span className="font-mono text-[13px]">
      {views.toLocaleString()} {views === 1 ? "visit" : "visits"}
    </span>
  );
}
