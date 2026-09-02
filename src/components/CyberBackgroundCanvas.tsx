"use client";

import { useEffect, useRef } from "react";

interface Shockwave {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  opacity: number;
  speed: number;
}

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
    let shockwaves: Shockwave[] = [];

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const handleClick = (e: MouseEvent) => {
      // Spawn EMP shockwave at click position
      shockwaves.push({
        x: e.clientX,
        y: e.clientY,
        radius: 0,
        maxRadius: Math.max(width, height) * 0.45,
        opacity: 0.8,
        speed: 12,
      });
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("click", handleClick);

    const spacing = 24;
    let animationFrameId: number;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const isLight = document.documentElement.classList.contains("light");
      const baseDotColor = isLight ? "rgba(180, 180, 170, 0.45)" : "rgba(45, 45, 45, 0.6)";
      const hoverColor = isLight ? "rgba(0, 130, 145, " : "rgba(0, 240, 255, ";
      const waveColor = isLight ? "rgba(196, 0, 47, " : "rgba(252, 238, 9, ";

      // Update and draw shockwaves
      for (let s = shockwaves.length - 1; s >= 0; s--) {
        const sw = shockwaves[s];
        sw.radius += sw.speed;
        sw.opacity *= 0.95;

        // Draw outer EMP ring
        ctx.beginPath();
        ctx.arc(sw.x, sw.y, sw.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `${waveColor}${sw.opacity * 0.4})`;
        ctx.lineWidth = 2;
        ctx.stroke();

        if (sw.opacity < 0.01 || sw.radius > sw.maxRadius) {
          shockwaves.splice(s, 1);
        }
      }

      // Draw interactive dot matrix
      for (let x = 12; x < width; x += spacing) {
        for (let y = 12; y < height; y += spacing) {
          const dx = mouseX - x;
          const dy = mouseY - y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          let dotRadius = 1;
          let fill = baseDotColor;

          // Mouse hover proximity radar glow (120px radius)
          if (dist < 120) {
            const intensity = 1 - dist / 120;
            dotRadius = 1 + intensity * 2.2;
            fill = `${hoverColor}${0.3 + intensity * 0.7})`;
          }

          // Check if affected by any active shockwave
          for (let s = 0; s < shockwaves.length; s++) {
            const sw = shockwaves[s];
            const swDist = Math.sqrt((sw.x - x) ** 2 + (sw.y - y) ** 2);
            const waveDiff = Math.abs(swDist - sw.radius);

            if (waveDiff < 30) {
              const waveIntensity = (1 - waveDiff / 30) * sw.opacity;
              dotRadius = Math.max(dotRadius, 1 + waveIntensity * 3.5);
              fill = `${waveColor}${waveIntensity * 0.9})`;
            }
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
      window.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0 opacity-80"
    />
  );
}
