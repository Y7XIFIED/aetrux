import { forwardRef, useRef, useState } from "react";
import { motion } from "framer-motion";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  strength?: number;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

const MagneticButton = forwardRef<HTMLButtonElement, MagneticButtonProps>(
  ({ children, className, style, onClick, strength = 0.3, type = "button", disabled = false }, _ref) => {
    const innerRef = useRef<HTMLButtonElement>(null);
    const [pos, setPos] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent) => {
      const rect = innerRef.current?.getBoundingClientRect();
      if (!rect) return;
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      setPos({
        x: (e.clientX - cx) * strength,
        y: (e.clientY - cy) * strength,
      });
    };

    const handleMouseLeave = () => setPos({ x: 0, y: 0 });

    return (
      <motion.button
        ref={innerRef}
        animate={{ x: pos.x, y: pos.y }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={onClick}
        className={className}
        style={style}
        whileTap={{ scale: 0.93 }}
        type={type}
        disabled={disabled}
      >
        {children}
      </motion.button>
    );
  }
);

MagneticButton.displayName = "MagneticButton";

export default MagneticButton;
