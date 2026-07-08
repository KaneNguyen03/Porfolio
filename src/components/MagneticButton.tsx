"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { type ReactNode, useEffect, useRef } from "react";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  /** Max pixel displacement of the button. Brief target: 2-4px. */
  strength?: number;
  /** Pixel detection radius around the button center. */
  range?: number;
}

export default function MagneticButton({
  children,
  className,
  strength = 4,
  range = 80,
}: MagneticButtonProps) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 });

  useEffect(() => {
    if (reduceMotion) return;
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    let pendingX = 0;
    let pendingY = 0;

    function flush() {
      x.set(pendingX);
      y.set(pendingY);
      raf = 0;
    }

    function update(clientX: number, clientY: number) {
      const node = ref.current;
      if (!node) return;
      const rect = node.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = clientX - cx;
      const dy = clientY - cy;
      const dist = Math.hypot(dx, dy);

      if (dist > range) {
        pendingX = 0;
        pendingY = 0;
      } else {
        const closeness = 1 - dist / range;
        const dirX = dist > 0.001 ? dx / dist : 0;
        const dirY = dist > 0.001 ? dy / dist : 0;
        pendingX = dirX * strength * closeness;
        pendingY = dirY * strength * closeness;
      }
      if (!raf) raf = requestAnimationFrame(flush);
    }

    function onMove(e: PointerEvent) {
      if (e.pointerType === "touch") return;
      update(e.clientX, e.clientY);
    }

    function onLeave() {
      pendingX = 0;
      pendingY = 0;
      if (!raf) raf = requestAnimationFrame(flush);
    }

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("blur", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("blur", onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [range, reduceMotion, strength, x, y]);

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x: springX, y: springY, willChange: "transform" }}
    >
      {children}
    </motion.div>
  );
}
