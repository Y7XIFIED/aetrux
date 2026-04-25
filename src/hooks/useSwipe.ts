import { useEffect, useRef } from "react";

interface UseSwipeProps {
  onLeft?: () => void;
  onRight?: () => void;
  threshold?: number;
  enabled?: boolean;
}

export const useSwipe = ({
  onLeft,
  onRight,
  threshold = 50,
  enabled = true,
}: UseSwipeProps) => {
  const startX = useRef<number | null>(null);

  useEffect(() => {
    if (!enabled) return;
    const handleTouchStart = (e: TouchEvent) => {
      startX.current = e.touches[0].clientX;
    };
    const handleTouchEnd = (e: TouchEvent) => {
      if (startX.current === null) return;
      const delta = startX.current - e.changedTouches[0].clientX;
      if (delta > threshold) onLeft?.();
      else if (delta < -threshold) onRight?.();
      startX.current = null;
    };
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });
    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [onLeft, onRight, threshold, enabled]);
};
