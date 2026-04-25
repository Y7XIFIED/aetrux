import { useEffect } from "react";

interface UseKeyboardNavProps {
  onLeft?: () => void;
  onRight?: () => void;
  onEscape?: () => void;
  enabled?: boolean;
}

export const useKeyboardNav = ({
  onLeft,
  onRight,
  onEscape,
  enabled = true,
}: UseKeyboardNavProps) => {
  useEffect(() => {
    if (!enabled) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") onLeft?.();
      if (e.key === "ArrowRight") onRight?.();
      if (e.key === "Escape") onEscape?.();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onLeft, onRight, onEscape, enabled]);
};
