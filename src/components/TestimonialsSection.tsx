import { motion } from "framer-motion";

const testimonials = [
  {
    quote: "AETRUX turned chaos into a system we could actually ship.",
    name: "Nora Velez",
    role: "Product Lead",
  },
  {
    quote: "The interface feels cinematic but still performs under pressure.",
    name: "Ilias Rahman",
    role: "Engineering Manager",
  },
  {
    quote: "Distinct visual language, clean execution, and fast iteration.",
    name: "Mina Choi",
    role: "Creative Director",
  },
];

const TestimonialsSection = () => {
  return (
    <section
      id="testimonials"
      className="relative px-6 md:px-12 py-24 md:py-28 border-t overflow-hidden"
      style={{ borderColor: "rgba(138,92,255,0.25)", backgroundColor: "var(--color-ink)" }}
    >
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(1000px 420px at 20% 22%, rgba(138,92,255,0.14), transparent 72%), radial-gradient(860px 360px at 82% 72%, rgba(177,77,255,0.12), transparent 72%)",
        }}
      />

      <div className="container mx-auto relative z-10">
        <motion.div
          className="flex items-end justify-between mb-14 pb-8 border-b"
          style={{ borderColor: "rgba(138,92,255,0.25)" }}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
        >
          <div>
            <p className="text-[10px] uppercase tracking-[0.35em]" style={{ fontFamily: "var(--font-mono)", color: "var(--color-chrome-gray)" }}>
              Proof Signals
            </p>
            <h2 className="font-display uppercase tracking-tight" style={{ fontSize: "clamp(2.4rem, 6vw, 5.5rem)", lineHeight: 0.9, color: "var(--color-paper)" }}>
              Testimonials
            </h2>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {testimonials.map((item, i) => (
            <motion.article
              key={item.name}
              className="liquid-glass rounded-2xl border p-6 flex flex-col gap-5"
              style={{ borderColor: "rgba(138,92,255,0.3)" }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
            >
              <p className="text-sm leading-relaxed" style={{ color: "rgba(238,242,255,0.82)" }}>
                "{item.quote}"
              </p>
              <div>
                <p className="text-[11px] uppercase tracking-[0.2em]" style={{ fontFamily: "var(--font-mono)", color: "var(--color-paper)" }}>
                  {item.name}
                </p>
                <p className="text-[10px] uppercase tracking-[0.2em]" style={{ fontFamily: "var(--font-mono)", color: "rgba(238,242,255,0.55)" }}>
                  {item.role}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;

