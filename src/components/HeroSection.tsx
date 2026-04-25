import { lazy, Suspense, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Layers, Sparkles } from "lucide-react";
import MagneticButton from "@/components/MagneticButton";
import MarqueeStrip from "@/components/MarqueeStrip";
import { useTextScramble } from "@/hooks/useTextScramble";

const FloatingParticles = lazy(() => import("@/components/FloatingParticles"));
const LaserFlow = lazy(() => import("@/components/LaserFlow"));

interface HeroSectionProps {
  onNavigate: () => void;
}

const HERO_ACCENT = "var(--color-magenta-glitch)";

const StaggeredTitle = ({ lines, baseDelay = 0 }: { lines: string[]; baseDelay?: number }) => {
  let globalIndex = 0;
  return (
    <>
      {lines.map((line, li) => (
        <span key={li} style={{ display: "block" }}>
          {line.split("").map((char) => {
            const idx = globalIndex++;
            return (
              <motion.span
                key={idx}
                style={{ display: char === " " ? "inline" : "inline-block" }}
                initial={{ opacity: 0, y: 32, rotateX: -80 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ delay: baseDelay + idx * 0.024, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ color: HERO_ACCENT, y: -2, transition: { duration: 0.15 } }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            );
          })}
        </span>
      ))}
    </>
  );
};

const HeroSection = ({ onNavigate }: HeroSectionProps) => {
  const [showVisualFx, setShowVisualFx] = useState(false);

  useEffect(() => {
    // Defer expensive visual layers so headline and nav become interactive first.
    const timer = window.setTimeout(() => setShowVisualFx(true), 220);
    return () => window.clearTimeout(timer);
  }, []);

  const scrambledSubtitle = useTextScramble(
    "An archival interface studio mapping internet culture into usable systems. We build signals, not pages.",
    true,
    1400,
    600
  );
  const quickLinks = [
    { Icon: Layers, target: "services", cursor: "SERVICES" },
    { Icon: Sparkles, target: "testimonials", cursor: "TESTIMONIALS" },
  ] as const;

  const scrollToTarget = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <motion.div
      key="hero"
      className="relative w-full min-h-screen overflow-hidden"
      style={{ backgroundColor: "var(--color-ink)" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
    >
      {showVisualFx && (
        <Suspense fallback={null}>
          <div className="absolute inset-0 z-0 pointer-events-none opacity-90">
            <LaserFlow
              color="var(--color-magenta-glitch)"
              mouseTiltStrength={0.03}
              horizontalBeamOffset={0.18}
              verticalBeamOffset={-0.26}
              fogIntensity={0.52}
              wispIntensity={4.6}
              className="w-full h-full"
            />
          </div>
          <FloatingParticles count={14} accentColor="var(--color-magenta-glitch)" />
        </Suspense>
      )}

      <div className="relative z-10 container mx-auto px-6 md:px-12 min-h-screen flex flex-col justify-between py-8 md:py-10">
        <div className="md:hidden" />

        <div className="grid grid-cols-12 gap-4 md:gap-8 flex-1 items-center mt-0">
          <div className="col-span-12 md:col-span-9 md:pr-16 flex flex-col gap-7 justify-center">
            <h1 className="font-display uppercase tracking-tighter font-medium leading-[0.95] md:leading-[0.86] max-w-3xl" style={{ fontSize: "clamp(3.2rem, 8.8vw, 7.4rem)", color: "var(--color-paper)", perspective: "600px" }}>
              <StaggeredTitle lines={["AETRUX"]} baseDelay={0.1} />
            </h1>

            <motion.div className="flex items-center gap-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
              <motion.div className="h-px" style={{ backgroundColor: HERO_ACCENT }} initial={{ width: 0 }} animate={{ width: 86 }} transition={{ delay: 0.85, duration: 0.8, ease: "easeOut" }} />
              <motion.span className="uppercase tracking-[0.3em]" style={{ fontFamily: "var(--font-mono)", color: HERO_ACCENT, fontSize: "clamp(10px, 1.05vw, 13px)" }} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.1, duration: 0.5 }}>
                internet culture systems
              </motion.span>
            </motion.div>

            <motion.p className="font-light leading-relaxed max-w-2xl" style={{ color: "rgba(238,242,255,0.84)", fontFamily: "var(--font-mono)", fontSize: "clamp(12px, 1.2vw, 15px)", letterSpacing: "0.05em" }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25, duration: 0.6 }}>
              {scrambledSubtitle}
            </motion.p>

            <motion.div className="flex items-center gap-3" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45, duration: 0.6 }}>
              {quickLinks.map(({ Icon, target, cursor }, i) => (
                <MagneticButton key={target} onClick={() => scrollToTarget(target)} data-cursor={cursor} className="w-10 h-10 rounded-full border flex items-center justify-center bg-transparent cursor-pointer" style={{ borderColor: "color-mix(in srgb, var(--color-magenta-glitch) 35%, transparent)", color: HERO_ACCENT }} strength={0.45}>
                  <motion.span whileHover={{ rotate: 18, scale: 1.15, color: HERO_ACCENT }} whileTap={{ scale: 0.86 }} className="flex items-center justify-center">
                    <Icon size={16} />
                  </motion.span>
                </MagneticButton>
              ))}
            </motion.div>
          </div>

        </div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.0, duration: 0.7 }}>
          <MarqueeStrip />
        </motion.div>

        <div className="pb-2" />
      </div>
    </motion.div>
  );
};

export default HeroSection;

