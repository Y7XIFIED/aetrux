import { motion } from "framer-motion";
import footerImg from "../../assets/footer.png";

const brandLetters = "Y7XIFIED".split("");

const Y7XIFIEDFooter = () => {
  return (
    <footer
      className="border-t relative overflow-hidden"
      style={{ backgroundColor: "var(--color-ink)", borderColor: "rgba(138,92,255,0.25)" }}
    >
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(1000px 420px at 20% 0%, rgba(138,92,255,0.12), transparent 72%), radial-gradient(860px 360px at 82% 100%, rgba(177,77,255,0.1), transparent 72%)",
        }}
      />
      <div className="w-full max-w-[1800px] mx-auto px-4 md:px-8 py-5 md:py-6">
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-4 w-full">
          <div className="flex flex-col items-center md:items-start gap-3 py-1">
            <motion.h3
              className="font-display uppercase tracking-[0.2em] cursor-default"
              style={{ fontSize: "clamp(2rem, 6.5vw, 4.5rem)", color: "var(--color-paper)", lineHeight: 0.9 }}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{
                scale: 1.03,
                textShadow: "0 0 18px rgba(177,77,255,0.45)",
                transition: { duration: 0.2 },
              }}
            >
              {brandLetters.map((char, i) => (
                <motion.span
                  key={`${char}-${i}`}
                  style={{ display: "inline-block" }}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: 0.03 * i }}
                  whileHover={{ y: -4, color: "#b14dff", transition: { duration: 0.16 } }}
                >
                  {char}
                </motion.span>
              ))}
            </motion.h3>
            <motion.p
              className="uppercase text-center w-full"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "10px",
                letterSpacing: "0.2em",
                color: "rgba(238,242,255,0.62)",
                fontVariant: "all-small-caps",
              }}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.08 }}
              whileHover={{
                letterSpacing: "0.24em",
                color: "rgba(238,242,255,0.9)",
                transition: { duration: 0.2 },
              }}
            >
              · ALL RIGHTS RESERVE
            </motion.p>
          </div>

          <img
            src={footerImg}
            alt="Y7XIFIED"
            className="w-full max-w-[320px] h-auto object-contain"
            style={{ imageRendering: "pixelated" }}
            loading="lazy"
          />
        </div>
      </div>
    </footer>
  );
};

export default Y7XIFIEDFooter;
