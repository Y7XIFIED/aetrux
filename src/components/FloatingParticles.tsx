import { useMemo } from "react";
import { motion } from "framer-motion";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
  color: string;
}

interface FloatingParticlesProps {
  count?: number;
  accentColor?: string;
}

const FloatingParticles = ({ count = 20, accentColor = "#ffffff" }: FloatingParticlesProps) => {
  const particles = useMemo<Particle[]>(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2.5 + 0.5,
        duration: Math.random() * 14 + 8,
        delay: Math.random() * 6,
        opacity: Math.random() * 0.25 + 0.04,
        color: i % 5 === 0 ? accentColor : "#ffffff",
      })),
    [count, accentColor]
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-[1]">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            willChange: "transform, opacity",
          }}
          animate={{
            y: [0, -55, 0],
            x: [0, Math.random() > 0.5 ? 12 : -12, 0],
            opacity: [p.opacity, p.opacity * 3, p.opacity],
            scale: [1, 1.4, 1],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

export default FloatingParticles;
