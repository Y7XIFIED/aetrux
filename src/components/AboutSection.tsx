import { motion } from "framer-motion";

const AboutSection = () => {
  return (
    <section
      id="about"
      className="relative px-6 md:px-12 py-24 md:py-32 border-t overflow-hidden"
      style={{ borderColor: "rgba(255,255,255,0.1)", backgroundColor: "#060A14" }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(1200px 420px at 10% 30%, rgba(40,92,255,0.14), transparent 70%), radial-gradient(700px 300px at 85% 80%, rgba(20,50,130,0.22), transparent 70%)",
        }}
      />

      <div className="container mx-auto relative z-10">
        <motion.div
          className="flex items-center gap-3 mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="h-px w-10" style={{ backgroundColor: "#4A7DFF" }} />
          <span
            className="text-[10px] uppercase tracking-[0.35em]"
            style={{ fontFamily: "var(--font-mono)", color: "#8EB3FF" }}
          >
            About / File 02
          </span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          <div className="lg:col-span-7 flex flex-col gap-6">
            <motion.h2
              className="font-display uppercase tracking-tight leading-[0.88]"
              style={{ fontSize: "clamp(2.6rem, 7.6vw, 6.6rem)", color: "#F4F7FF" }}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            >
              AETRUX
              <br />
              <span style={{ color: "#87AFFF" }}>Signal Methods</span>
            </motion.h2>

            <motion.p
              className="max-w-2xl leading-relaxed"
              style={{ fontFamily: "var(--font-mono)", color: "rgba(236,243,255,0.76)", fontSize: "12px", letterSpacing: "0.045em" }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.18 }}
            >
              AETRUX is an internet culture systems studio operating as a digital signal lab. We turn noisy visual
              references, subculture archives, and interface behaviors into structured web systems that feel precise,
              alive, and intentionally strange.
            </motion.p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
              {[
                { label: "Field", value: "Internet Culture Systems" },
                { label: "Output", value: "Web / Motion / Interfaces" },
                { label: "Approach", value: "Archive -> Protocol -> Build" },
              ].map((item) => (
                <motion.div
                  key={item.label}
                  className="rounded-none border px-4 py-4"
                  style={{
                    borderColor: "rgba(122,162,255,0.35)",
                    background: "linear-gradient(180deg, rgba(37,63,132,0.24), rgba(13,22,48,0.34))",
                  }}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45 }}
                >
                  <p
                    className="uppercase text-[10px] tracking-[0.32em]"
                    style={{ fontFamily: "var(--font-mono)", color: "#86ADFF" }}
                  >
                    {item.label}
                  </p>
                  <p
                    className="mt-2 text-[11px] leading-relaxed"
                    style={{ fontFamily: "var(--font-mono)", color: "rgba(245,249,255,0.84)" }}
                  >
                    {item.value}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            className="lg:col-span-5 border p-5 md:p-6 flex flex-col gap-4"
            style={{
              borderColor: "rgba(122,162,255,0.3)",
              background:
                "repeating-linear-gradient(0deg, rgba(255,255,255,0.02) 0 1px, transparent 1px 18px), linear-gradient(160deg, rgba(22,37,83,0.35), rgba(9,14,30,0.65))",
            }}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          >
            <p className="text-[10px] uppercase tracking-[0.33em]" style={{ fontFamily: "var(--font-mono)", color: "#93B7FF" }}>
              Lab Notes
            </p>
            <p className="text-[11px] leading-relaxed" style={{ fontFamily: "var(--font-mono)", color: "rgba(235,242,255,0.78)" }}>
              We design with contrast, motion with purpose, and systems that can scale without losing aesthetic
              signature.
            </p>
            <div className="h-px w-full" style={{ backgroundColor: "rgba(142,179,255,0.25)" }} />
            <ul className="space-y-2 text-[11px]" style={{ fontFamily: "var(--font-mono)", color: "rgba(235,242,255,0.85)" }}>
              <li>01 // Build identities that feel native to digital culture.</li>
              <li>02 // Translate visual chaos into coherent UI systems.</li>
              <li>03 // Ship fast without flattening the artistic direction.</li>
            </ul>
            <div className="pt-2 text-[10px] uppercase tracking-[0.24em]" style={{ fontFamily: "var(--font-mono)", color: "#6F95ED" }}>
              Status: Archive Active
            </div>
          </motion.div>
        </div>

        <div className="mt-10 border-t pt-4" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
          <p
            className="text-[10px] uppercase tracking-[0.32em]"
            style={{ fontFamily: "var(--font-mono)", color: "rgba(190,210,255,0.62)" }}
          >
            This section has been fully recontextualized for the Y7XIFIED signal-lab identity.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
