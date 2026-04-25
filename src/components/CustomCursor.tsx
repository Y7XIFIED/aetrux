import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const CustomCursor = () => {
  const [hasFinePointer, setHasFinePointer] = useState(true);
  const [hidden, setHidden] = useState(true);
  const [hovering, setHovering] = useState(false);
  const [label, setLabel] = useState("");
  const [pos, setPos] = useState({ x: -120, y: -120 });
  const rafRef = useRef<number | null>(null);
  const lastPointerRef = useRef({ x: -120, y: -120 });

  useEffect(() => {
    const mql = window.matchMedia("(any-pointer: fine)");
    const syncPointer = () => setHasFinePointer(mql.matches);
    syncPointer();
    mql.addEventListener("change", syncPointer);
    if (!mql.matches) {
      return () => mql.removeEventListener("change", syncPointer);
    }

    const onMove = (e: PointerEvent) => {
      lastPointerRef.current = { x: e.clientX, y: e.clientY };
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        setPos(lastPointerRef.current);
        setHidden(false);
        const el = document.elementFromPoint(lastPointerRef.current.x, lastPointerRef.current.y) as HTMLElement | null;
        const target = el?.closest("a,button,[role='button'],[data-cursor],.cursor-target") as HTMLElement | null;
        setHovering(Boolean(target));
        setLabel(target?.dataset.cursor || "");
      });
    };

    const onWindowBlur = () => setHidden(true);
    const onWindowFocus = () => {
      if (lastPointerRef.current.x >= 0 && lastPointerRef.current.y >= 0) {
        setHidden(false);
      }
    };
    const onVisibility = () => {
      if (document.hidden) {
        setHidden(true);
      } else if (lastPointerRef.current.x >= 0 && lastPointerRef.current.y >= 0) {
        setHidden(false);
      }
    };

    document.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("blur", onWindowBlur);
    window.addEventListener("focus", onWindowFocus);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      mql.removeEventListener("change", syncPointer);
      document.removeEventListener("pointermove", onMove);
      window.removeEventListener("blur", onWindowBlur);
      window.removeEventListener("focus", onWindowFocus);
      document.removeEventListener("visibilitychange", onVisibility);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  useEffect(() => {
    if (!hasFinePointer) return;
    const prev = document.body.style.cursor;
    document.body.style.cursor = "none";
    return () => {
      document.body.style.cursor = prev;
    };
  }, [hasFinePointer]);

  if (!hasFinePointer) return null;

  return (
    <>
      <motion.div
        className="fixed pointer-events-none z-[2147483647]"
        animate={{ x: pos.x, y: pos.y, opacity: hidden ? 0 : 1 }}
        transition={{ type: "spring", stiffness: 420, damping: 28, mass: 0.5 }}
        style={{ transform: "translate(-50%, -50%)" }}
      >
        <motion.div
          className="relative"
          animate={{ width: hovering ? 48 : 30, height: hovering ? 48 : 30 }}
          transition={{ type: "spring", stiffness: 260, damping: 22 }}
          style={{
            border: "1.5px solid rgba(138, 92, 255, 0.95)",
            borderRadius: 8,
            background: "rgba(6,10,20,0.58)",
            boxShadow: "0 0 0 1px rgba(138,92,255,0.35), 0 0 18px rgba(138,92,255,0.25)",
          }}
        >
          <div className="absolute left-1/2 top-1/2 w-2 h-2 rounded-full -translate-x-1/2 -translate-y-1/2" style={{ background: "#A98CFF" }} />
        </motion.div>
      </motion.div>

      {label && (
        <motion.div
          className="fixed pointer-events-none z-[2147483647]"
          animate={{ x: pos.x + 16, y: pos.y - 18, opacity: hidden ? 0 : 1 }}
          transition={{ type: "spring", stiffness: 420, damping: 28, mass: 0.5 }}
        >
          <div className="px-2 py-1 text-[9px] uppercase tracking-[0.2em] border rounded" style={{ fontFamily: "var(--font-mono)", color: "var(--color-paper)", borderColor: "rgba(138,92,255,0.55)", background: "rgba(7,9,15,0.85)" }}>
            {label}
          </div>
        </motion.div>
      )}
    </>
  );
};

export default CustomCursor;

