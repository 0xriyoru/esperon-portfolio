"use client";

import { useEffect, useRef, useState } from "react";

export default function CyberCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Disable custom cursor on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let rafId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!isVisible) setIsVisible(true);

      // Instant center dot update (0ms latency)
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }
    };

    // Smooth snappy trailing for outer ring (60fps lerp, high speed)
    const animate = () => {
      ringX += (mouseX - ringX) * 0.45;
      ringY += (mouseY - ringY) * 0.45;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      }

      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);

    const onMouseDown = () => setIsClicked(true);
    const onMouseUp = () => setIsClicked(false);
    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const isInteractive = target.closest(
        'a, button, input, textarea, select, [role="button"], .cyber-button, .cyber-card, .cursor-pointer'
      );
      setIsHovered(!!isInteractive);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("mouseover", onMouseOver, { passive: true });
    document.body.addEventListener("mouseleave", onMouseLeave);
    document.body.addEventListener("mouseenter", onMouseEnter);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("mouseover", onMouseOver);
      document.body.removeEventListener("mouseleave", onMouseLeave);
      document.body.removeEventListener("mouseenter", onMouseEnter);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[99999] overflow-hidden">
      {/* Outer Reticle Crosshair (Instant Snappy Lerp) */}
      <div
        ref={ringRef}
        className="absolute top-0 left-0 -ml-4 -mt-4 will-change-transform"
      >
        <div
          className={`w-8 h-8 rounded-full border transition-all duration-150 flex items-center justify-center ${
            isClicked
              ? "scale-75 border-accent-pink bg-accent-pink/20"
              : isHovered
              ? "scale-150 rotate-45 border-accent-yellow bg-accent-yellow/10 shadow-[0_0_12px_rgba(252,238,9,0.5)]"
              : "scale-100 rotate-0 border-accent-cyan/70 shadow-[0_0_8px_rgba(0,240,255,0.3)]"
          }`}
        >
          {isHovered && (
            <>
              <span className="absolute -top-1 w-1.5 h-0.5 bg-accent-yellow" />
              <span className="absolute -bottom-1 w-1.5 h-0.5 bg-accent-yellow" />
              <span className="absolute -left-1 h-1.5 w-0.5 bg-accent-yellow" />
              <span className="absolute -right-1 h-1.5 w-0.5 bg-accent-yellow" />
            </>
          )}
        </div>
      </div>

      {/* Center Laser Dot (0ms Zero-Latency Hardware Transform) */}
      <div
        ref={dotRef}
        className="absolute top-0 left-0 -ml-1 -mt-1 will-change-transform"
      >
        <div
          className={`w-2 h-2 rounded-full transition-colors duration-100 ${
            isClicked
              ? "bg-accent-pink shadow-[0_0_10px_rgba(255,0,60,1)] scale-125"
              : isHovered
              ? "bg-accent-yellow shadow-[0_0_10px_rgba(252,238,9,1)] scale-75"
              : "bg-accent-cyan shadow-[0_0_8px_rgba(0,240,255,1)]"
          }`}
        />
      </div>
    </div>
  );
}
