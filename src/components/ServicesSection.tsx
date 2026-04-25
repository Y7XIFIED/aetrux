import { motion } from "framer-motion";
import { Code2, Layers, Cpu, Globe, Shield, Zap } from "lucide-react";

const services = [
  {
    icon: Code2,
    code: "SRV-01",
    title: "Frontend Engineering",
    desc: "High-performance React applications with pixel-perfect interfaces and sub-100ms interactions.",
    accentColor: "#8A5CFF",
  },
  {
    icon: Layers,
    code: "SRV-02",
    title: "Design Systems",
    desc: "Scalable token-driven component libraries that stay consistent across every surface and screen size.",
    accentColor: "#B14DFF",
  },
  {
    icon: Cpu,
    code: "SRV-03",
    title: "Backend Architecture",
    desc: "Cloud-native APIs and distributed systems engineered for resilience, scale, and zero downtime.",
    accentColor: "#9C6BFF",
  },
  {
    icon: Globe,
    code: "SRV-04",
    title: "Full-Stack Products",
    desc: "End-to-end digital products from concept to production - design, code, and infrastructure.",
    accentColor: "#A248FF",
  },
  {
    icon: Shield,
    code: "SRV-05",
    title: "Security & Auth",
    desc: "Zero-trust authentication platforms, encryption middleware, and audit-ready compliance layers.",
    accentColor: "#7B4BFF",
  },
  {
    icon: Zap,
    code: "SRV-06",
    title: "Motion & Interaction",
    desc: "Cinematic animations and physics-based interactions that elevate products from functional to unforgettable.",
    accentColor: "#C16CFF",
  },
];

const ServiceCard = ({ s, i }: { s: (typeof services)[0]; i: number }) => (
  <motion.div
    className="relative group p-6 rounded-2xl border flex flex-col gap-5 cursor-default overflow-hidden liquid-glass"
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    whileHover={{ borderColor: `${s.accentColor}70`, y: -4, boxShadow: `0 20px 40px ${s.accentColor}22` }}
    data-cursor="VIEW"
  >
    <div
      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
      style={{ background: `radial-gradient(ellipse at 50% 0%, ${s.accentColor}22 0%, transparent 70%)` }}
    />

    <div className="flex items-start justify-between">
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center liquid-glass"
        style={{ border: `1px solid ${s.accentColor}55` }}
      >
        <s.icon size={18} style={{ color: s.accentColor }} />
      </div>
      <span
        className="text-[9px] uppercase tracking-[0.3em]"
        style={{ fontFamily: "var(--font-mono)", color: "rgba(245,245,245,0.35)" }}
      >
        {s.code}
      </span>
    </div>

    <div className="flex flex-col gap-2">
      <h3
        className="font-display uppercase tracking-tight text-sm font-bold"
        style={{ color: "#f5f5f5" }}
      >
        {s.title}
      </h3>
      <p
        className="text-xs leading-relaxed"
        style={{ fontFamily: "var(--font-mono)", color: "rgba(245,245,245,0.62)", fontSize: "11px" }}
      >
        {s.desc}
      </p>
    </div>

    <motion.div
      className="h-px w-0 group-hover:w-full transition-all duration-500 rounded-full"
      style={{ background: `linear-gradient(90deg, ${s.accentColor}, transparent)` }}
    />
  </motion.div>
);

const ServicesSection = () => (
  <section
    id="services"
    className="relative px-6 md:px-12 py-24 md:py-32 border-t overflow-hidden"
    style={{ borderColor: "rgba(138,92,255,0.25)", backgroundColor: "var(--color-ink)" }}
  >
    <div
      className="absolute inset-0 z-0 pointer-events-none"
      style={{
        background:
          "radial-gradient(1200px 520px at 16% 24%, rgba(138,92,255,0.18), transparent 72%), radial-gradient(900px 480px at 84% 78%, rgba(177,77,255,0.14), transparent 72%)",
      }}
    />

    <div className="container mx-auto relative z-10">
      <motion.div
        className="flex items-end justify-between mb-16 pb-8 border-b"
        style={{ borderColor: "rgba(138,92,255,0.25)" }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <div className="h-px w-6" style={{ backgroundColor: "#8A5CFF" }} />
            <span className="text-[10px] uppercase tracking-[0.4em]" style={{ fontFamily: "var(--font-mono)", color: "#8A5CFF" }}>
              Capabilities
            </span>
          </div>
          <h2
            className="font-display uppercase font-bold tracking-tighter text-glow"
            style={{ fontSize: "clamp(2.5rem, 7vw, 6rem)", lineHeight: 0.9, color: "#f5f5f5" }}
          >
            Services
          </h2>
        </div>
        <span
          className="hidden md:block font-display text-[10px] uppercase tracking-[0.3em]"
          style={{ color: "#bbb0d3" }}
        >
          {String(services.length).padStart(2, "0")} offerings
        </span>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {services.map((s, i) => <ServiceCard key={s.code} s={s} i={i} />)}
      </div>
    </div>
  </section>
);

export default ServicesSection;
