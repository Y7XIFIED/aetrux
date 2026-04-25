import { motion } from "framer-motion";
import { Award } from "lucide-react";

const awards = [
  { year: "2026", title: "Awwwards SOTD", category: "Portfolio Design" },
  { year: "2025", title: "CSS Design Awards", category: "Best UI/UX" },
  { year: "2025", title: "FWA of the Month", category: "Frontend Excellence" },
  { year: "2024", title: "Webby Award", category: "Technical Achievement" },
  { year: "2024", title: "Dribbble Featured", category: "Motion Design" },
];

const AwardsSection = () => (
  <section
    className="relative px-6 md:px-12 py-16 border-t overflow-hidden"
    style={{ borderColor: "#1f1f1f", backgroundColor: "#0a0a0a" }}
  >
    <div className="container mx-auto">
      <div className="flex flex-col md:flex-row md:items-center gap-8 md:gap-0">
        {/* Label */}
        <div className="flex items-center gap-3 md:w-48 flex-shrink-0">
          <Award size={14} style={{ color: "#8A5CFF" }} />
          <span className="text-[10px] uppercase tracking-[0.4em]" style={{ fontFamily: "var(--font-mono)", color: "#888888" }}>
            Recognition
          </span>
        </div>

        {/* Awards row */}
        <div className="flex-1 flex flex-wrap md:flex-nowrap items-center gap-px">
          {awards.map((a, i) => (
            <motion.div
              key={i}
              className="flex-1 min-w-[140px] flex flex-col gap-1 px-5 py-4 border-l group cursor-default"
              style={{ borderColor: "rgba(255,255,255,0.07)" }}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              whileHover={{ backgroundColor: "rgba(138,92,255,0.04)" }}
            >
              <span
                className="text-[9px] uppercase tracking-[0.3em] group-hover:text-[#8A5CFF] transition-colors"
                style={{ fontFamily: "var(--font-mono)", color: "rgba(245,245,245,0.3)" }}
              >
                {a.year}
              </span>
              <span
                className="text-xs font-bold uppercase tracking-tight"
                style={{ color: "#f5f5f5", fontFamily: "var(--font-display)" }}
              >
                {a.title}
              </span>
              <span
                className="text-[9px] uppercase tracking-[0.2em]"
                style={{ fontFamily: "var(--font-mono)", color: "rgba(245,245,245,0.35)" }}
              >
                {a.category}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default AwardsSection;


