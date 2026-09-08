"use client";

import { useEffect, useRef } from "react";

export default function CyberBackgroundCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let mouseX = -1000;
    let mouseY = -1000;

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    const spacing = 32;
    let animationFrameId: number;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const isLight = document.documentElement.classList.contains("light");
      const baseDotColor = isLight ? "rgba(0, 0, 0, 0.05)" : "rgba(255, 255, 255, 0.05)";
      const hoverPrefix = isLight ? "rgba(8, 145, 178, " : "rgba(0, 240, 255, ";

      for (let x = 16; x < width; x += spacing) {
        for (let y = 16; y < height; y += spacing) {
          const dx = mouseX - x;
          const dy = mouseY - y;
          const distSq = dx * dx + dy * dy;

          let dotRadius = 0.85;
          let fill = baseDotColor;

          // Proximity illumination (radius 100px)
          if (distSq < 10000) {
            const dist = Math.sqrt(distSq);
            const intensity = 1 - dist / 100;
            dotRadius = 0.85 + intensity * 1.5;
            fill = `${hoverPrefix}${(0.15 + intensity * 0.45).toFixed(3)})`;
          }

          ctx.beginPath();
          ctx.arc(x, y, dotRadius, 0, Math.PI * 2);
          ctx.fillStyle = fill;
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 opacity-70 transition-opacity duration-500"
    />
  );
}
