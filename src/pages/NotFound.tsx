import { motion } from "framer-motion";
import { ArrowLeft, Home } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import notFoundArt from "../../assets/404.jpg";
import StickyNav from "@/components/StickyNav";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="relative min-h-screen overflow-hidden px-6 md:px-12 py-10 md:py-12" style={{ backgroundColor: "var(--color-ink)" }}>
      <StickyNav view="project" onNavigate={() => navigate("/")} />

      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(800px 450px at 20% 15%, rgba(138,92,255,0.16), transparent 70%), radial-gradient(700px 420px at 85% 70%, rgba(177,77,255,0.15), transparent 70%)",
        }}
        animate={{ opacity: [0.65, 1, 0.7] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />

      {Array.from({ length: 6 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute left-0 right-0 h-[2px] pointer-events-none"
          style={{ top: `${12 + i * 14}%`, background: "linear-gradient(90deg, transparent, rgba(177,77,255,0.45), transparent)" }}
          animate={{ x: ["-20%", "20%", "-20%"], opacity: [0.2, 0.7, 0.2] }}
          transition={{ duration: 2.4 + i * 0.35, repeat: Infinity, ease: "linear" }}
        />
      ))}

      <div className="relative z-10 container mx-auto min-h-[86vh] pt-16 md:pt-20 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        <div className="lg:col-span-6 flex flex-col gap-5">
          <motion.p
            className="text-[10px] uppercase tracking-[0.35em]"
            style={{ fontFamily: "var(--font-mono)", color: "var(--color-chrome-gray)" }}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            Error Node // Route Missing
          </motion.p>

          <motion.h1
            className="font-display uppercase leading-[0.86] tracking-tight"
            style={{ fontSize: "clamp(3.2rem, 9vw, 7rem)", color: "var(--color-paper)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.05 }}
          >
            404
            <br />
            <span style={{ color: "var(--color-electric-blue)" }}>Something Weird</span>
          </motion.h1>

          <motion.p
            className="max-w-xl text-sm leading-relaxed"
            style={{ fontFamily: "var(--font-mono)", color: "rgba(238,242,255,0.76)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.18 }}
          >
            The address <span style={{ color: "var(--color-electric-blue)" }}>{location.pathname}</span> does not exist in this signal map.
            Jump back to home or return to the previous node.
          </motion.p>

          <motion.div className="flex flex-wrap gap-3 pt-2" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.24 }}>
            <button
              onClick={() => navigate("/")}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-[11px] uppercase tracking-[0.22em]"
              style={{ fontFamily: "var(--font-mono)", borderColor: "rgba(138,92,255,0.55)", color: "var(--color-paper)", background: "rgba(12,16,28,0.72)" }}
            >
              <Home size={14} />
              Go Home
            </button>
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-[11px] uppercase tracking-[0.22em]"
              style={{ fontFamily: "var(--font-mono)", borderColor: "rgba(138,92,255,0.35)", color: "var(--color-chrome-gray)", background: "transparent" }}
            >
              <ArrowLeft size={14} />
              Go Back
            </button>
          </motion.div>
        </div>

        <div className="lg:col-span-6">
          <motion.div
            className="relative border collage-panel p-3 md:p-4"
            style={{ borderColor: "rgba(138,92,255,0.35)" }}
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <motion.img
              src={notFoundArt}
              alt="404 visual"
              className="w-full h-auto object-contain"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 4.6, repeat: Infinity, ease: "easeInOut" }}
            />
            <div className="absolute top-4 left-4 px-2 py-1 border text-[9px] uppercase tracking-[0.2em]" style={{ fontFamily: "var(--font-mono)", borderColor: "rgba(138,92,255,0.45)", color: "var(--color-paper)", background: "rgba(7,9,15,0.8)" }}>
              Unknown Frame
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
