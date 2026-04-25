import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface StickyNavProps {
  onNavigate?: () => void;
  view?: "hero" | "project";
  onProjectsOpen?: () => void;
  onServicesOpen?: () => void;
}

const StickyNav = ({ onNavigate, view = "hero", onProjectsOpen, onServicesOpen }: StickyNavProps) => {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const h = now.getHours();
      const ampm = h >= 12 ? "PM" : "AM";
      const h12 = h % 12 || 12;
      setTime(`${h12}:${String(now.getMinutes()).padStart(2, "0")} ${ampm}`);
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  const nav = (
    <nav
      className="fixed top-0 left-0 right-0 z-[2147483647] grid grid-cols-3 items-center px-6 md:px-12 py-3"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        background:
          "linear-gradient(180deg, rgba(34,18,52,0.95) 0%, rgba(20,12,33,0.92) 52%, rgba(14,10,24,0.95) 100%)",
        backdropFilter: "blur(44px) saturate(220%)",
        WebkitBackdropFilter: "blur(44px) saturate(220%)",
        borderBottom: "1px solid rgba(177,77,255,0.62)",
        boxShadow:
          "inset 0 1px 0 rgba(255,255,255,0.32), inset 0 -1px 0 rgba(177,77,255,0.34), 0 18px 48px rgba(8,4,16,0.78)",
        transform: "translateZ(0)",
        willChange: "transform",
      }}
    >
      <span className="text-[10px] tracking-[0.2em]" style={{ fontFamily: "var(--font-mono)", color: "rgba(236,226,255,0.78)" }}>
        {time}
      </span>

      <span className="text-xs tracking-[0.4em] uppercase text-center" style={{ fontFamily: "var(--font-display)", color: "rgba(245,238,255,0.97)" }}>
        Y7XIFIED
      </span>

      <div className="flex items-center justify-end gap-2">
        {view === "hero" && (
          <>
            <button
              onClick={onProjectsOpen}
              className="text-[10px] uppercase tracking-[0.2em] px-3 py-1.5 rounded-full transition-all duration-200 hover:bg-white/10 cursor-pointer"
              style={{
                fontFamily: "var(--font-mono)",
                color: "rgba(236,226,255,0.82)",
                border: "1px solid rgba(177,77,255,0.3)",
                background: "rgba(255,255,255,0.04)",
              }}
            >
              Projects
            </button>
            <button
              onClick={onServicesOpen}
              className="text-[10px] uppercase tracking-[0.2em] px-4 py-1.5 rounded-full border transition-all duration-200 hover:bg-white hover:text-black cursor-pointer"
              style={{
                fontFamily: "var(--font-mono)",
                borderColor: "rgba(177,77,255,0.62)",
                color: "rgba(245,238,255,0.95)",
                background: "rgba(177,77,255,0.18)",
              }}
            >
              Services
            </button>
          </>
        )}
        {view === "project" && (
          <button
            onClick={onNavigate}
            className="text-[10px] uppercase tracking-[0.2em] px-4 py-1.5 rounded-full border transition-all duration-200 hover:bg-white hover:text-black cursor-pointer"
            style={{
              fontFamily: "var(--font-mono)",
              borderColor: "rgba(177,77,255,0.62)",
              color: "rgba(245,238,255,0.95)",
              background: "rgba(177,77,255,0.18)",
            }}
          >
            &lt; Back
          </button>
        )}
      </div>
    </nav>
  );

  if (typeof document === "undefined") return nav;
  return createPortal(nav, document.body);
};

export default StickyNav;
