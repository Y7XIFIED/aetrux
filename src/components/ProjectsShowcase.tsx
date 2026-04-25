import { useMemo, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { projects, Project } from "@/data/projects";
import MagneticButton from "@/components/MagneticButton";
import MarqueeStrip from "@/components/MarqueeStrip";
import ServicesSection from "@/components/ServicesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import SmartImage from "@/components/SmartImage";
import Y7XIFIEDFooter from "@/components/Y7XIFIEDFooter";

interface ProjectsShowcaseProps {
  onProjectClick: (index: number) => void;
}

const FILTERS = ["ALL NODES", "CIPHER ARCHIVE", "SIGNAL TRACE", "LOCKED PROTOCOL", "SYNTH GRID", "LIVE RENDER"];
const FILTER_TO_CATEGORY: Record<string, string | null> = {
  "ALL NODES": null,
  "CIPHER ARCHIVE": "ARCHIVE",
  "SIGNAL TRACE": "TELEMETRY",
  "LOCKED PROTOCOL": "SECURE CHANNEL",
  "SYNTH GRID": "DATA CANVAS",
  "LIVE RENDER": "VISUAL RUNTIME",
};

const TiltCard = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 16;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -16;
    setTilt({ x, y });
  };

  return (
    <motion.div ref={ref} className={className} style={{ transformStyle: "preserve-3d", perspective: 800 }} animate={{ rotateX: tilt.y, rotateY: tilt.x }} transition={{ type: "spring", stiffness: 200, damping: 25 }} onMouseMove={handleMouseMove} onMouseLeave={() => setTilt({ x: 0, y: 0 })}>
      {children}
    </motion.div>
  );
};

const ProjectRow = ({ project, displayIndex, onView }: { project: Project; displayIndex: number; onView: () => void }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const panelY = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const isEven = displayIndex % 2 === 0;

  return (
    <motion.div ref={ref} className="purple-section-bg liquid-glass relative grid grid-cols-12 gap-6 md:gap-10 items-center px-6 md:px-12 py-20 md:py-28 border-t overflow-hidden" style={{ borderColor: "rgba(138,92,255,0.25)", minHeight: "80vh" }} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, amount: 0.1 }} transition={{ duration: 0.5 }}>
      <motion.div className="absolute pointer-events-none rounded-full" style={{ width: 600, height: 600, background: `radial-gradient(circle, ${project.accentColor}18 0%, transparent 70%)`, left: isEven ? "-15%" : "auto", right: isEven ? "auto" : "-15%", top: "50%", transform: "translateY(-50%)" }} animate={{ scale: [1, 1.12, 1] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} />

      <motion.div className={`col-span-12 md:col-span-6 relative z-10 flex flex-col gap-6 ${!isEven ? "md:col-start-7" : ""} liquid-glass rounded-2xl p-5 md:p-7`} initial={{ opacity: 0, x: isEven ? -50 : 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}>
        <div className="flex items-center gap-3"><div className="h-px w-8" style={{ backgroundColor: project.accentColor }} /><span className="text-[10px] uppercase tracking-[0.35em]" style={{ fontFamily: "var(--font-mono)", color: project.accentColor }}>CASE {project.code} // {project.category}</span></div>
        <h2 className="font-display uppercase tracking-tighter font-bold leading-[0.88]" style={{ fontSize: "clamp(2.8rem, 6vw, 5.5rem)" }}><span className="block text-glow" style={{ color: "var(--color-paper)" }}>{project.title[0]}</span><span className="block" style={{ WebkitTextStroke: `1.5px ${project.accentColor}`, color: "transparent" }}>{project.title[1]}</span></h2>
        <p className="text-sm leading-relaxed max-w-md" style={{ color: "rgba(238,242,255,0.68)" }}>{project.description}</p>
        <div className="flex flex-wrap gap-2">{project.tags.map((tag) => <span key={tag} className="text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-full border" style={{ fontFamily: "var(--font-mono)", borderColor: `${project.accentColor}60`, color: project.accentColor }}>{tag}</span>)}</div>
        <div className="flex items-center gap-4 border-t pt-4" style={{ borderColor: "rgba(138,92,255,0.25)" }}><span className="text-[10px] tracking-[0.2em]" style={{ fontFamily: "var(--font-mono)", color: "rgba(238,242,255,0.45)" }}>{project.date}</span><span style={{ color: "rgba(177,77,255,0.85)", fontSize: 10 }}>?</span><span className="text-[10px] tracking-[0.2em]" style={{ fontFamily: "var(--font-mono)", color: "var(--color-magenta-glitch)" }}>{project.status}</span></div>
        <MagneticButton onClick={onView} className="self-start liquid-glass flex items-center gap-3 px-5 py-3 rounded-full border bg-transparent cursor-pointer" style={{ borderColor: "rgba(138,92,255,0.45)", color: "var(--color-paper)" }}><span className="text-[11px] uppercase tracking-[0.22em]" style={{ fontFamily: "var(--font-mono)" }}>Open Dossier</span><ArrowRight size={14} /></MagneticButton>
      </motion.div>

      <motion.div className={`col-span-12 md:col-span-5 relative z-10 ${isEven ? "md:col-start-8" : "md:col-start-1 md:row-start-1"}`} style={{ y: panelY }}>
        <TiltCard>
          <motion.div className="relative overflow-hidden rounded-2xl aspect-[4/3] cursor-pointer" onClick={onView}>
            <SmartImage src={project.imageUrl} alt={`${project.title[0]} ${project.title[1]}`} className="absolute inset-0 w-full h-full object-contain" />
          </motion.div>
        </TiltCard>
      </motion.div>
    </motion.div>
  );
};

const ProjectsShowcase = ({ onProjectClick }: ProjectsShowcaseProps) => {
  const [filter, setFilter] = useState("ALL NODES");
  const filtered = useMemo(() => {
    const category = FILTER_TO_CATEGORY[filter];
    return category ? projects.filter((p) => p.category === category) : projects;
  }, [filter]);

  return (
    <div className="purple-section-bg">
      <section id="projects" className="purple-section-bg liquid-glass px-6 md:px-12 py-16 md:py-20 relative overflow-hidden">
        <div className="container mx-auto">
          <div className="flex items-end justify-between pb-8 border-b" style={{ borderColor: "rgba(138,92,255,0.25)" }}>
            <div className="flex flex-col gap-2"><span className="text-[10px] uppercase tracking-[0.4em]" style={{ fontFamily: "var(--font-mono)", color: "var(--color-chrome-gray)" }}>Cipher Vault</span><h2 className="font-display uppercase font-bold tracking-tighter text-glow" style={{ fontSize: "clamp(3.5rem, 9vw, 8rem)", lineHeight: 0.9, color: "var(--color-paper)" }}>Case Registries</h2></div>
          </div>
          <div className="flex flex-wrap gap-2 mt-4">
            {FILTERS.map((f) => (
              <button key={f} onClick={() => setFilter(f)} className="liquid-glass px-3 py-2 rounded-full border text-[10px] uppercase tracking-[0.2em]" style={{ fontFamily: "var(--font-mono)", borderColor: filter === f ? "var(--color-electric-blue)" : "rgba(138,92,255,0.25)", color: filter === f ? "var(--color-paper)" : "var(--color-chrome-gray)", background: filter === f ? "rgba(138,92,255,0.2)" : "transparent" }}>{f}</button>
            ))}
          </div>
        </div>
      </section>

      <MarqueeStrip speed={20} />

      {filtered.map((project, i) => (
        <ProjectRow key={project.id} project={project} displayIndex={i} onView={() => onProjectClick(projects.findIndex((p) => p.id === project.id))} />
      ))}

      <ServicesSection />
      <TestimonialsSection />
      <Y7XIFIEDFooter />
    </div>
  );
};

export default ProjectsShowcase;

