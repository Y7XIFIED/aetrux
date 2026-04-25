import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, ExternalLink, X } from "lucide-react";
import { projects } from "@/data/projects";
import FloatingParticles from "@/components/FloatingParticles";
import MagneticButton from "@/components/MagneticButton";
import { useTextScramble } from "@/hooks/useTextScramble";
import { useKeyboardNav } from "@/hooks/useKeyboardNav";
import { useSwipe } from "@/hooks/useSwipe";
import SmartImage from "@/components/SmartImage";

interface ProjectPageProps {
  onBack: () => void;
  initialIndex?: number;
}

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? "100%" : "-100%", opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? "-100%" : "100%", opacity: 0 }),
};

const ProjectPage = ({ onBack, initialIndex = 0 }: ProjectPageProps) => {
  const [projectIndex, setProjectIndex] = useState(initialIndex);
  const [direction, setDirection] = useState(1);
  const [showHint, setShowHint] = useState(true);
  const [viewerIndex, setViewerIndex] = useState<number | null>(null);

  const project = projects[projectIndex];
  const title0 = useTextScramble(project.title[0], true, 900, 150);
  const title1 = useTextScramble(project.title[1], true, 900, 350);

  useEffect(() => {
    const id = setTimeout(() => setShowHint(false), 4000);
    return () => clearTimeout(id);
  }, []);

  const navigate = (delta: number) => {
    setDirection(delta);
    setProjectIndex((i) => (i + delta + projects.length) % projects.length);
  };

  const navigateToIndex = (nextIndex: number) => {
    if (nextIndex === projectIndex) return;
    setDirection(nextIndex > projectIndex ? 1 : -1);
    setProjectIndex(nextIndex);
  };

  const navigateViewer = (delta: number) => {
    if (viewerIndex === null) return;
    setViewerIndex((viewerIndex + delta + project.gallery.length) % project.gallery.length);
  };

  useKeyboardNav({
    onLeft: () => (viewerIndex === null ? navigate(-1) : navigateViewer(-1)),
    onRight: () => (viewerIndex === null ? navigate(1) : navigateViewer(1)),
    onEscape: () => (viewerIndex === null ? onBack() : setViewerIndex(null)),
    enabled: true,
  });
  useSwipe({ onLeft: () => navigate(1), onRight: () => navigate(-1) });

  const related = projects.filter((_, i) => i !== projectIndex).slice(0, 3);
  const videoMap: Record<string, string> = {
    ARCHIVE: "/videos/lab-archive.mp4",
    "VISUAL RUNTIME": "/videos/lab-archive.mp4",
    TELEMETRY: "/videos/lab-telemetry.mp4",
    "DATA CANVAS": "/videos/lab-telemetry.mp4",
    "SECURE CHANNEL": "/videos/lab-secure.mp4",
  };

  return (
    <motion.div
      key="project"
      className="purple-section-bg relative w-full"
      initial={{ clipPath: "inset(0 100% 0 0)", opacity: 0 }}
      animate={{ clipPath: "inset(0 0% 0 0)", opacity: 1 }}
      exit={{ clipPath: "inset(0 0 0 100%)", opacity: 0 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="relative w-full min-h-screen overflow-hidden">
        <div className="hidden md:block absolute inset-0 z-0">
          <AnimatePresence mode="wait">
            <motion.video
              key={project.videoUrl}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
              initial={{ opacity: 0, scale: 1.06 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.9 }}
            >
              <source src={videoMap[project.category] || project.videoUrl} type="video/mp4" />
            </motion.video>
          </AnimatePresence>
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, transparent 40%, rgba(7,9,15,0.9) 100%)" }} />
        </div>

        <FloatingParticles count={16} accentColor={project.accentColor} />
        <div className="absolute top-6 right-6 md:top-8 md:right-10 z-20">
          <MagneticButton
            onClick={onBack}
            className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] bg-transparent border-none cursor-pointer"
            style={{ fontFamily: "var(--font-mono)", color: "rgba(238,242,255,0.75)" }}
            type="button"
          >
            <ArrowLeft size={14} />
            Return To Archive
          </MagneticButton>
        </div>

        <div className="relative z-10 container mx-auto px-6 md:px-12 min-h-screen flex flex-col justify-between py-8 md:py-10">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={`title-${projectIndex}`}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-12 gap-4 md:gap-8 pt-16 md:pt-48"
            >
              <div className="col-span-12 md:col-span-8 flex flex-col gap-5">
                <h1 className="font-display uppercase tracking-tighter font-medium" style={{ fontSize: "clamp(3.75rem, 12vw, 7.5rem)", lineHeight: 0.85 }}>
                  <span className="block text-glow" style={{ color: "var(--color-paper)" }}>{title0}</span>
                  <span className="block" style={{ WebkitTextStroke: `1.5px ${project.accentColor}`, color: "transparent" }}>{title1}</span>
                </h1>
                <p style={{ color: "rgba(238,242,255,0.9)", whiteSpace: "pre-line" }}>{project.subtitle}</p>
              </div>
              <div className="col-span-12 md:col-span-4">
                <p style={{ color: "rgba(238,242,255,0.72)" }}>{project.description}</p>
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex mt-4 items-center gap-2 text-[10px] uppercase tracking-[0.2em] border rounded-full px-4 py-2"
                    style={{ fontFamily: "var(--font-mono)", borderColor: project.accentColor, color: project.accentColor }}
                  >
                    Open Channel
                    <ExternalLink size={10} />
                  </a>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="purple-section-bg relative px-6 md:px-12 py-24 border-t" style={{ borderColor: "rgba(138,92,255,0.25)" }}>
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px mb-20" style={{ background: "rgba(138,92,255,0.2)" }}>
            {[
              { label: "Signal Problem", content: project.challenge, color: "#B14DFF" },
              { label: "Method", content: project.solution, color: project.accentColor },
              { label: "Result", content: project.outcome, color: "#8A5CFF" },
            ].map((item) => (
              <div key={item.label} className="flex flex-col gap-4 p-8" style={{ background: "var(--color-ink)" }}>
                <span className="text-[10px] uppercase tracking-[0.35em]" style={{ fontFamily: "var(--font-mono)", color: item.color }}>{item.label}</span>
                <p style={{ color: "rgba(238,242,255,0.7)", fontFamily: "var(--font-mono)", fontSize: "11px" }}>{item.content}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-20">
            {project.gallery.map((src, i) => (
              <motion.div key={i} className="relative overflow-hidden rounded-2xl aspect-video cursor-pointer" whileHover={{ scale: 1.01 }} onClick={() => setViewerIndex(i)}>
                <SmartImage src={src} alt={`Evidence ${i + 1}`} className="absolute inset-0 w-full h-full object-contain" />
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {related.map((r) => (
              <motion.div key={r.id} className="relative rounded-2xl overflow-hidden aspect-video cursor-pointer" whileHover={{ scale: 1.02, y: -4 }} onClick={() => navigateToIndex(projects.indexOf(r))}>
                <SmartImage src={r.imageUrl} alt={r.title[0]} className="absolute inset-0 w-full h-full object-contain" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {viewerIndex !== null && (
          <motion.div className="fixed inset-0 z-[10000] bg-black/90 flex items-center justify-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <button type="button" onClick={() => setViewerIndex(null)} className="absolute top-6 right-6 p-2 border rounded-full" style={{ borderColor: "rgba(138,92,255,0.5)", color: "var(--color-paper)" }}><X size={16} /></button>
            <button type="button" onClick={() => navigateViewer(-1)} className="absolute left-6 p-2 border rounded-full" style={{ borderColor: "rgba(138,92,255,0.5)", color: "var(--color-paper)" }}><ArrowLeft size={16} /></button>
            <div className="w-[min(92vw,1200px)] h-[min(82vh,680px)] relative rounded-xl overflow-hidden">
              <SmartImage src={project.gallery[viewerIndex]} alt="Evidence fullscreen" className="w-full h-full object-contain" loading="eager" />
            </div>
            <button type="button" onClick={() => navigateViewer(1)} className="absolute right-6 p-2 border rounded-full" style={{ borderColor: "rgba(138,92,255,0.5)", color: "var(--color-paper)" }}><ArrowRight size={16} /></button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showHint && <motion.div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 px-3 py-2 rounded-full pixel-window text-[9px]" style={{ fontFamily: "var(--font-mono)", color: "rgba(238,242,255,0.55)" }}>Navigate • Esc to exit</motion.div>}
      </AnimatePresence>
    </motion.div>
  );
};

export default ProjectPage;
