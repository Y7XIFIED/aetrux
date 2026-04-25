import { useEffect, useRef } from "react";

const CursorSpotlight = () => {
  const spotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf: number;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const onMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const tick = () => {
      currentX = lerp(currentX, targetX, 0.08);
      currentY = lerp(currentY, targetY, 0.08);
      if (spotRef.current) {
        spotRef.current.style.transform = `translate(${currentX - 200}px, ${currentY - 200}px)`;
      }
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={spotRef}
      className="pointer-events-none fixed top-0 left-0 z-[9996] will-change-transform"
      style={{
        width: 400,
        height: 400,
        background:
          "radial-gradient(circle, rgba(138,92,255,0.09) 0%, rgba(138,92,255,0.03) 40%, transparent 70%)",
        borderRadius: "50%",
      }}
    />
  );
};

export default CursorSpotlight;

