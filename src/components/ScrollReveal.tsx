"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { TRANSITION } from "../lib/motion";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  direction?: "up" | "down" | "left" | "right" | "scale";
  delay?: number;
  distance?: number;
  once?: boolean;
}

const directionVariants = {
  up: (distance: number) => ({ hidden: { opacity: 0, y: distance }, visible: { opacity: 1, y: 0 } }),
  down: (distance: number) => ({ hidden: { opacity: 0, y: -distance }, visible: { opacity: 1, y: 0 } }),
  left: (distance: number) => ({ hidden: { opacity: 0, x: -distance }, visible: { opacity: 1, x: 0 } }),
  right: (distance: number) => ({ hidden: { opacity: 0, x: distance }, visible: { opacity: 1, x: 0 } }),
  scale: (_distance: number) => ({ hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1 } }),
};

export default function ScrollReveal({
  children,
  className = "",
  direction = "up",
  delay = 0,
  distance = 30,
  once = true,
}: ScrollRevealProps) {
  const { ref, controls } = useScrollReveal({ once });

  const variants = directionVariants[direction](distance);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
      transition={{ ...TRANSITION.base, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
