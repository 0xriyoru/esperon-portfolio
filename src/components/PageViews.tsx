"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function PageViews() {
  const [views, setViews] = useState<number | null>(null);

  useEffect(() => {
    const incrementAndFetchViews = async () => {
      // In a real app, this should ideally be an API route calling an RPC function 
      // or edge function to avoid exposing the ability to increment arbitrarily.
      // We will assume an RPC function `increment_page_view` was created in Supabase.
      try {
        const { data, error } = await supabase.rpc('increment_page_view');
        
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
    <div className="fixed bottom-6 right-6 font-mono text-xs text-muted bg-secondary border border-border-subtle px-3 py-1.5 rounded-sm z-50 shadow-lg flex items-center gap-2">
      <span className="w-2 h-2 rounded-full bg-accent-cyan animate-pulse" />
      <span><span className="text-accent-cyan">{views.toLocaleString()}</span> VISITS</span>
    </div>
  );
}
