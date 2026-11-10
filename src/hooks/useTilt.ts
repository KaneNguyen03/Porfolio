import { useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { useCallback, type PointerEvent } from "react";

/**
 * Pointer-driven 3D tilt for cards. Returns spring-smoothed rotateX/rotateY
 * motion values plus the handlers to wire onto the element. Disabled for
 * touch pointers and when the user prefers reduced motion.
 */
export function useTilt(maxDeg = 6) {
  const reduceMotion = useReducedMotion();
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const rotateX = useSpring(rx, { stiffness: 180, damping: 18, mass: 0.4 });
  const rotateY = useSpring(ry, { stiffness: 180, damping: 18, mass: 0.4 });

  const onPointerMove = useCallback(
    (e: PointerEvent<HTMLElement>) => {
      if (reduceMotion || e.pointerType === "touch") return;
      const rect = e.currentTarget.getBoundingClientRect();
      const dx = (e.clientX - rect.left) / rect.width - 0.5;
      const dy = (e.clientY - rect.top) / rect.height - 0.5;
      ry.set(dx * maxDeg * 2);
      rx.set(-dy * maxDeg * 2);
    },
    [maxDeg, reduceMotion, rx, ry],
  );

  const onPointerLeave = useCallback(() => {
    rx.set(0);
    ry.set(0);
  }, [rx, ry]);

  return {
    style: reduceMotion
      ? undefined
      : { rotateX, rotateY, transformStyle: "preserve-3d" as const },
    onPointerMove,
    onPointerLeave,
  };
}
