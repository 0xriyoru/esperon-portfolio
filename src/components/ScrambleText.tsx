"use client";

import { useState, useEffect, useCallback, useRef } from "react";

interface ScrambleTextProps {
  text: string;
  className?: string;
  triggerOnHover?: boolean;
  speed?: number;
  scrambleChars?: string;
}

const DEFAULT_CHARS = "01!<>-_\\/[]{}—=+*^?#________XYZ$@&%~";

export default function ScrambleText({
  text,
  className = "",
  triggerOnHover = true,
  speed = 28,
  scrambleChars = DEFAULT_CHARS,
}: ScrambleTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const animatingRef = useRef(false);

  const scramble = useCallback(() => {
    if (animatingRef.current) return;
    animatingRef.current = true;

    let iteration = 0;
    const maxIterations = text.length;

    const interval = setInterval(() => {
      setDisplayText(() =>
        text
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";
            if (index < iteration) {
              return text[index];
            }
            return scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
          })
          .join("")
      );

      if (iteration >= maxIterations) {
        clearInterval(interval);
        setDisplayText(text);
        animatingRef.current = false;
      }

      iteration += 1 / 2;
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed, scrambleChars]);

  useEffect(() => {
    const timer = setTimeout(() => {
      scramble();
    }, 150);
    return () => clearTimeout(timer);
  }, [scramble]);

  return (
    <span
      onMouseEnter={triggerOnHover ? scramble : undefined}
      className={`inline-block select-none ${className}`}
    >
      {displayText}
    </span>
  );
}
