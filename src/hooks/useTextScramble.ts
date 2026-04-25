import { useState, useEffect, useRef } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*";

export const useTextScramble = (
  text: string,
  trigger: boolean = true,
  duration: number = 1200,
  delay: number = 0
) => {
  const [output, setOutput] = useState(text);
  const rafRef = useRef<number>();

  useEffect(() => {
    if (!trigger) return;

    let start: number | null = null;
    let timeoutId: ReturnType<typeof setTimeout>;

    const animate = (timestamp: number) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const progress = Math.min(elapsed / duration, 1);
      const resolvedCount = Math.floor(progress * text.length);

      const result = text
        .split("")
        .map((char, i) => {
          if (char === " " || char === "/" || char === "\n" || char === "-") return char;
          if (i < resolvedCount) return char;
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        })
        .join("");

      setOutput(result);

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        setOutput(text);
      }
    };

    timeoutId = setTimeout(() => {
      rafRef.current = requestAnimationFrame(animate);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [text, trigger, duration, delay]);

  return output;
};
