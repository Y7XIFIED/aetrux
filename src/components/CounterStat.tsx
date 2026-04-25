import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface CounterStatProps {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  label: string;
  accentColor?: string;
}

const CounterStat = ({
  value,
  suffix = "",
  prefix = "",
  duration = 2000,
  label,
  accentColor = "#8A5CFF",
}: CounterStatProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start: number | null = null;
    const step = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(ease * value));
      if (progress < 1) requestAnimationFrame(step);
      else setCount(value);
    };
    requestAnimationFrame(step);
  }, [inView, value, duration]);

  return (
    <div ref={ref} className="flex flex-col gap-1">
      <span
        className="tabular-nums font-display font-bold"
        style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", color: accentColor, lineHeight: 1 }}
      >
        {prefix}{count}{suffix}
      </span>
      <span
        className="text-[10px] uppercase tracking-[0.3em]"
        style={{ fontFamily: "var(--font-mono)", color: "rgba(245,245,245,0.45)" }}
      >
        {label}
      </span>
    </div>
  );
};

export default CounterStat;


