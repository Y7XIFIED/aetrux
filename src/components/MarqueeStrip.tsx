import { forwardRef } from "react";

interface MarqueeStripProps {
  items?: string[];
  speed?: number;
  className?: string;
}

const DEFAULT_ITEMS = [
  "ARCHIVE",
  "SIGNAL",
  "PROTOCOL",
  "TRACE",
  "ECHO",
  "VECTOR",
  "SYNTH",
  "CORTEX",
];

const MarqueeStrip = forwardRef<HTMLDivElement, MarqueeStripProps>(
  ({ items = DEFAULT_ITEMS, speed = 30, className = "" }, ref) => {
    const loopItems = [...items, ...items, ...items, ...items];

    return (
      <div
        ref={ref}
        className={`overflow-hidden w-full ${className}`}
        style={{
          borderTop: "1px solid #1f1f1f",
          borderBottom: "1px solid #1f1f1f",
        }}
      >
        <div
          className="flex items-center gap-0 whitespace-nowrap"
          style={{
            animation: `marquee-scroll ${speed}s linear infinite`,
            willChange: "transform",
          }}
        >
          {loopItems.map((item, i) => (
            <span key={i} className="flex items-center gap-0">
              <span
                className="px-6 py-3 text-[10px] uppercase tracking-[0.35em]"
                style={{
                  fontFamily: "var(--font-display)",
                  color: "var(--color-chrome-gray)",
                }}
              >
                {item}
              </span>
              <span style={{ color: "var(--color-magenta-glitch)", fontSize: "6px", lineHeight: 1 }}>?</span>
            </span>
          ))}
        </div>
      </div>
    );
  }
);

MarqueeStrip.displayName = "MarqueeStrip";

export default MarqueeStrip;
