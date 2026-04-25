import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send } from "lucide-react";
import MagneticButton from "@/components/MagneticButton";
import { submitContact } from "@/lib/api";

interface ContactOverlayProps {
  open: boolean;
  onClose: () => void;
}

const PARTICLES = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  angle: (i / 30) * Math.PI * 2,
  dist: 60 + Math.random() * 80,
  size: 3 + Math.random() * 5,
}));

const ContactOverlay = ({ open, onClose }: ContactOverlayProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const [burst, setBurst] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;

    setError("");
    setSubmitting(true);
    setBurst(true);

    try {
      await submitContact({ name, email, message });
      setTimeout(() => {
        setSent(true);
        setBurst(false);
        setSubmitting(false);
      }, 450);
    } catch (err) {
      setSubmitting(false);
      setBurst(false);
      setError(err instanceof Error ? err.message : "Failed to send message.");
    }
  };

  const handleClose = () => {
    setSent(false);
    setError("");
    setSubmitting(false);
    setBurst(false);
    setName("");
    setEmail("");
    setMessage("");
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[9990] flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <motion.div
            className="absolute inset-0"
            style={{ background: "rgba(10,10,10,0.92)", backdropFilter: "blur(24px)" }}
            onClick={handleClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.div
            className="relative z-10 w-full max-w-lg mx-6 rounded-2xl p-8 md:p-12 liquid-glass-strong"
            style={{ border: "1px solid rgba(177,77,255,0.4)" }}
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <button
              onClick={handleClose}
              className="absolute top-5 right-5 p-2 rounded-full border cursor-pointer"
              style={{ borderColor: "rgba(255,255,255,0.1)", color: "rgba(245,245,245,0.5)" }}
              data-cursor="CLOSE"
              type="button"
            >
              <X size={14} />
            </button>

            <AnimatePresence mode="wait">
              {!sent ? (
                <motion.form key="form" onSubmit={handleSubmit} className="flex flex-col gap-6" initial={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-3">
                      <div className="h-px w-6" style={{ backgroundColor: "#8A5CFF" }} />
                      <span className="text-[10px] uppercase tracking-[0.4em]" style={{ fontFamily: "var(--font-mono)", color: "#8A5CFF" }}>
                        Get in Touch
                      </span>
                    </div>
                    <h3 className="font-display uppercase tracking-tighter font-bold" style={{ fontSize: "clamp(2rem, 5vw, 3rem)", color: "#f5f5f5", lineHeight: 0.9 }}>
                      Let's Work
                      <br />
                      <span style={{ WebkitTextStroke: "1.5px #8A5CFF", color: "transparent" }}>Together</span>
                    </h3>
                  </div>

                  {[
                    { id: "name", label: "Name", value: name, setter: setName, type: "text", placeholder: "AETRUX" },
                    { id: "email", label: "Email", value: email, setter: setEmail, type: "email", placeholder: "hello@aetrux.dev" },
                  ].map((f) => (
                    <div key={f.id} className="flex flex-col gap-1.5">
                      <label className="text-[10px] uppercase tracking-[0.3em]" style={{ fontFamily: "var(--font-mono)", color: "#888888" }}>
                        {f.label}
                      </label>
                      <input
                        type={f.type}
                        value={f.value}
                        onChange={(e) => f.setter(e.target.value)}
                        placeholder={f.placeholder}
                        required
                        className="w-full rounded-lg px-4 py-3 text-sm outline-none transition-all duration-200 liquid-glass"
                        style={{
                          border: "1px solid rgba(255,255,255,0.1)",
                          color: "#f5f5f5",
                          fontFamily: "var(--font-mono)",
                          fontSize: "11px",
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = "#8A5CFF";
                          e.target.style.boxShadow = "0 0 0 1px rgba(138,92,255,0.2)";
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = "rgba(255,255,255,0.1)";
                          e.target.style.boxShadow = "none";
                        }}
                        disabled={submitting}
                      />
                    </div>
                  ))}

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] uppercase tracking-[0.3em]" style={{ fontFamily: "var(--font-mono)", color: "#888888" }}>
                      Message
                    </label>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Tell me about your project..."
                      required
                      rows={4}
                      className="w-full rounded-lg px-4 py-3 text-sm outline-none transition-all duration-200 resize-none liquid-glass"
                      style={{
                        border: "1px solid rgba(255,255,255,0.1)",
                        color: "#f5f5f5",
                        fontFamily: "var(--font-mono)",
                        fontSize: "11px",
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = "#8A5CFF";
                        e.target.style.boxShadow = "0 0 0 1px rgba(138,92,255,0.2)";
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = "rgba(255,255,255,0.1)";
                        e.target.style.boxShadow = "none";
                      }}
                      disabled={submitting}
                    />
                  </div>

                  {error && (
                    <p className="text-[11px]" style={{ fontFamily: "var(--font-mono)", color: "#ff7aa4" }}>
                      {error}
                    </p>
                  )}

                  <div className="relative flex justify-end">
                    <MagneticButton
                      className="relative flex items-center gap-3 px-6 py-3 rounded-full cursor-pointer overflow-hidden liquid-glass disabled:opacity-60 disabled:cursor-not-allowed"
                      style={{ background: "rgba(138,92,255,0.35)", color: "var(--color-paper)", border: "1px solid rgba(177,77,255,0.55)" }}
                      strength={0.3}
                      type="submit"
                      disabled={submitting}
                    >
                      <span className="text-[11px] uppercase tracking-[0.25em] font-bold" style={{ fontFamily: "var(--font-mono)" }}>
                        {submitting ? "Sending..." : "Send Message"}
                      </span>
                      <motion.span animate={burst ? { x: [0, 8, 0], rotate: [0, 15, 0] } : {}}>
                        <Send size={14} />
                      </motion.span>
                    </MagneticButton>
                  </div>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  className="flex flex-col items-center justify-center gap-6 py-8 text-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <div className="relative w-24 h-24 flex items-center justify-center">
                    {PARTICLES.map((p) => (
                      <motion.div
                        key={p.id}
                        className="absolute rounded-full"
                        style={{ width: p.size, height: p.size, backgroundColor: "#8A5CFF" }}
                        initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                        animate={{
                          x: Math.cos(p.angle) * p.dist,
                          y: Math.sin(p.angle) * p.dist,
                          opacity: 0,
                          scale: 0,
                        }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: p.id * 0.01 }}
                      />
                    ))}
                    <motion.div
                      className="w-16 h-16 rounded-full flex items-center justify-center liquid-glass"
                      style={{ border: "2px solid #8A5CFF" }}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 300, delay: 0.2 }}
                    >
                      <Send size={24} color="#8A5CFF" />
                    </motion.div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3 className="font-display uppercase tracking-tighter font-bold text-2xl" style={{ color: "#f5f5f5" }}>
                      Message Sent!
                    </h3>
                    <p className="text-[11px]" style={{ fontFamily: "var(--font-mono)", color: "rgba(245,245,245,0.5)" }}>
                      I'll get back to you within 24 hours.
                    </p>
                  </div>
                  <MagneticButton
                    onClick={handleClose}
                    className="px-6 py-2.5 rounded-full border cursor-pointer text-[10px] uppercase tracking-[0.25em] liquid-glass"
                    style={{ borderColor: "rgba(255,255,255,0.2)", color: "rgba(245,245,245,0.7)", fontFamily: "var(--font-mono)" }}
                    strength={0.2}
                    type="button"
                  >
                    Close
                  </MagneticButton>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ContactOverlay;
