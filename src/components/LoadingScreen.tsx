import { forwardRef, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LoadingScreenProps {
  onComplete: () => void;
}

const WORDS = ["Booting", "Indexing", "Decoding"];
const DURATION_MS = 900;

const LoadingScreen = forwardRef<HTMLDivElement, LoadingScreenProps>(
  ({ onComplete }, ref) => {
    const [wordIndex, setWordIndex] = useState(0);
    const [count, setCount] = useState(0);
    const rafRef = useRef<number | null>(null);
    const startTimeRef = useRef<number | null>(null);

    useEffect(() => {
      const interval = setInterval(() => {
        setWordIndex((i) => (i + 1) % WORDS.length);
      }, 900);
      return () => clearInterval(interval);
    }, []);

    useEffect(() => {
      const animate = (timestamp: number) => {
        if (!startTimeRef.current) startTimeRef.current = timestamp;
        const elapsed = timestamp - startTimeRef.current;
        const progress = Math.min(elapsed / DURATION_MS, 1);
        setCount(Math.floor(progress * 100));

        if (progress < 1) {
          rafRef.current = requestAnimationFrame(animate);
        } else {
          setCount(100);
          setTimeout(() => onComplete(), 80);
        }
      };
      rafRef.current = requestAnimationFrame(animate);
      return () => {
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
      };
    }, [onComplete]);

    const progress = count / 100;
    const padded = String(count).padStart(3, "0");

    return (
      <motion.div
        ref={ref}
        key="loading"
        className="fixed inset-0 z-[9999] flex flex-col overflow-hidden"
        style={{ backgroundColor: "var(--color-ink)" }}
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } }}
      >
        <div className="absolute inset-0 scanline-overlay opacity-30 pointer-events-none" />
        <div className="absolute top-10 left-10 w-20 h-20 checker-block opacity-70" />
        <div className="absolute bottom-16 right-14 w-24 h-24 checker-block opacity-40" />

        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{ opacity: [0.85, 1, 0.85] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
          style={{ background: "radial-gradient(circle at 20% 20%, rgba(138,92,255,0.12) 0%, transparent 60%)" }}
        />

        <div className="absolute top-6 left-6 md:top-8 md:left-10 px-3 py-2 pixel-window">
          <span className="data-label">INIT // SIGNAL LAB</span>
        </div>

        <div className="absolute top-6 right-6 md:top-8 md:right-10 px-3 py-2 pixel-window">
          <span className="data-label" style={{ color: "var(--color-magenta-glitch)" }}>Loading Archive</span>
        </div>

        <div className="flex-1 flex items-center justify-center">
          <div className="pixel-window px-10 py-7 min-w-[280px] md:min-w-[420px]">
            <div className="flex items-center justify-between mb-4">
              <span className="data-label">% decode</span>
              <span className="text-xs" style={{ fontFamily: "var(--font-mono)", color: "var(--color-chrome-gray)" }}>{padded}</span>
            </div>

            <AnimatePresence mode="wait">
              <motion.span
                key={WORDS[wordIndex]}
                className="block uppercase"
                style={{
                  fontFamily: "var(--font-display)",
                  color: "var(--color-paper)",
                  fontSize: "clamp(1.6rem, 4vw, 2.6rem)",
                  letterSpacing: "0.06em",
                }}
                initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -16, filter: "blur(6px)" }}
                transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              >
                {WORDS[wordIndex]}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <div className="w-full h-[6px] relative overflow-hidden" style={{ backgroundColor: "rgba(95,59,255,0.15)" }}>
            <motion.div
              className="absolute top-0 left-0 h-full origin-left"
              style={{
                scaleX: progress,
                background: "linear-gradient(90deg, var(--color-electric-blue), var(--color-magenta-glitch))",
                boxShadow: "0 0 12px rgba(138,92,255,0.45)",
              }}
            />
          </div>
        </div>
      </motion.div>
    );
  }
);

LoadingScreen.displayName = "LoadingScreen";

export default LoadingScreen;

