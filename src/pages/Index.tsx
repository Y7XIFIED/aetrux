import { useState, useCallback, useEffect, useRef, lazy, Suspense } from "react";
import { AnimatePresence, motion } from "framer-motion";
import LoadingScreen from "@/components/LoadingScreen";
import CursorSpotlight from "@/components/CursorSpotlight";
import GrainOverlay from "@/components/GrainOverlay";
import StickyNav from "@/components/StickyNav";
import ScrollProgress from "@/components/ScrollProgress";
import { useLenis } from "@/hooks/useLenis";

const HeroSection = lazy(() => import("@/components/HeroSection"));
const ProjectPage = lazy(() => import("@/components/ProjectPage"));
const ProjectsShowcase = lazy(() => import("@/components/ProjectsShowcase"));

type View = "loading" | "hero" | "project";
const KONAMI = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];

const GlitchOverlay = ({ show, onDone }: { show: boolean; onDone: () => void }) => {
  useEffect(() => {
    if (show) {
      const id = setTimeout(onDone, 2400);
      return () => clearTimeout(id);
    }
  }, [show, onDone]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div className="fixed inset-0 z-[9998] pointer-events-none flex items-center justify-center overflow-hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          {Array.from({ length: 12 }).map((_, i) => (
            <motion.div key={i} className="absolute inset-0" style={{ background: `rgba(${i % 2 === 0 ? "138,92,255" : "186,166,214"},0.07)`, clipPath: `inset(${Math.random() * 80}% 0 ${Math.random() * 20}% 0)` }} animate={{ x: [0, (Math.random() - 0.5) * 20, 0], opacity: [0, 1, 0] }} transition={{ duration: 0.2 + Math.random() * 0.3, delay: i * 0.08, ease: "linear" }} />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const Index = () => {
  const [view, setView] = useState<View>("loading");
  const [projectIndex, setProjectIndex] = useState(0);
  const [showShowcase, setShowShowcase] = useState(false);
  const [glitch, setGlitch] = useState(false);
  const [prefs] = useState({ cobalt: 100, magenta: 100, chrome: 100, gritty: true, grid: true, scanlines: true, lowMotion: false, sound: false });
  const konamiRef = useRef<string[]>([]);
  const audioCtx = useRef<AudioContext | null>(null);

  useLenis();

  useEffect(() => {
    // Warm critical chunks while the loading screen is visible.
    void import("@/components/HeroSection");
    void import("@/components/ProjectsShowcase");
  }, []);

  useEffect(() => {
    if (view !== "hero") {
      setShowShowcase(false);
      return;
    }
    // Let the hero become interactive first, then mount the heavy showcase tree.
    const timer = window.setTimeout(() => setShowShowcase(true), 250);
    return () => window.clearTimeout(timer);
  }, [view]);

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--intensity-cobalt", String(prefs.cobalt / 100));
    root.style.setProperty("--intensity-magenta", String(prefs.magenta / 100));
    root.style.setProperty("--intensity-chrome", String(prefs.chrome / 100));
    root.style.setProperty("--scanline-opacity", prefs.scanlines ? "1" : "0");
    root.style.setProperty("--grid-opacity", prefs.grid ? "1" : "0");
    root.style.setProperty("--noise-opacity", prefs.gritty ? "1" : "0");
    root.dataset.motion = prefs.lowMotion ? "low" : "high";
    root.dataset.gritty = prefs.gritty ? "on" : "off";
  }, [prefs]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      konamiRef.current = [...konamiRef.current, e.key].slice(-KONAMI.length);
      if (konamiRef.current.join(",") === KONAMI.join(",")) {
        setGlitch(true);
        konamiRef.current = [];
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  useEffect(() => {
    if (prefs.lowMotion) return;
    const onMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth - 0.5) * 2;
      const ny = (e.clientY / window.innerHeight - 0.5) * 2;
      document.querySelectorAll<HTMLElement>(".collage-panel").forEach((el, i) => {
        const depth = 6 + (i % 3) * 2;
        el.style.transform = `translate3d(${nx * depth}px, ${ny * depth}px, 0)`;
      });
    };
    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.querySelectorAll<HTMLElement>(".collage-panel").forEach((el) => {
        el.style.transform = "";
      });
    };
  }, [prefs.lowMotion]);

  useEffect(() => {
    if (!prefs.sound) return;
    const beep = (freq: number, duration = 0.03) => {
      if (!audioCtx.current) audioCtx.current = new AudioContext();
      const ctx = audioCtx.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.frequency.value = freq;
      gain.gain.value = 0.02;
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    };
    const hover = (e: Event) => {
      const t = e.target as HTMLElement;
      if (t.closest("button,a,[data-cursor]")) beep(520, 0.02);
    };
    const click = () => beep(260, 0.05);
    document.addEventListener("mouseover", hover);
    document.addEventListener("click", click);
    return () => {
      document.removeEventListener("mouseover", hover);
      document.removeEventListener("click", click);
    };
  }, [prefs.sound]);

  const handleLoadComplete = useCallback(() => setView("hero"), []);
  const handleNavigateToProject = useCallback((index = 0) => {
    setProjectIndex(index);
    setView("project");
    window.scrollTo({ top: 0 });
  }, []);
  const handleBackToHero = useCallback(() => {
    setView("hero");
    window.scrollTo({ top: 0 });
  }, []);
  const handleScrollTo = (targetId: string) => {
    if (view !== "hero") {
      handleBackToHero();
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth", block: "start" });
        });
      });
      return;
    }
    document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="relative" style={{ backgroundColor: "var(--color-ink)" }}>
      <CursorSpotlight />
      {prefs.gritty && <GrainOverlay />}
      <ScrollProgress />
      <GlitchOverlay show={glitch} onDone={() => setGlitch(false)} />

      <StickyNav
        view={view === "project" ? "project" : "hero"}
        onNavigate={view === "project" ? handleBackToHero : () => handleNavigateToProject(0)}
        onProjectsOpen={() => handleScrollTo("projects")}
        onServicesOpen={() => handleScrollTo("services")}
      />

      <AnimatePresence mode="wait">
        {view === "loading" && <LoadingScreen key="loading" onComplete={handleLoadComplete} />}
        {view === "hero" && (
          <div key="hero-page">
            <Suspense fallback={<div className="min-h-screen" />}>
              <HeroSection onNavigate={() => handleNavigateToProject(0)} />
              {showShowcase && <ProjectsShowcase onProjectClick={handleNavigateToProject} />}
            </Suspense>
          </div>
        )}
        {view === "project" && (
          <Suspense fallback={<div className="min-h-screen" />}>
            <ProjectPage key="project" onBack={handleBackToHero} initialIndex={projectIndex} />
          </Suspense>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;

