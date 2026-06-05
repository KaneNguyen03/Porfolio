import type { Transition, Variants } from "framer-motion";

export const EASING = [0.16, 1, 0.3, 1] as const;
export const EASING_SMOOTH = [0.45, 0, 0.55, 1] as const;

export const TRANSITION: Record<"fast" | "base" | "slow" | "spring", Transition> = {
  fast: { duration: 0.15, ease: EASING },
  base: { duration: 0.25, ease: EASING },
  slow: { duration: 0.4, ease: EASING },
  spring: { type: "spring", stiffness: 300, damping: 30, mass: 0.8, restDelta: 0.001 },
};

export function staggerContainer(stagger = 0.05, delay = 0): Variants {
  return {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: stagger, delayChildren: delay },
    },
  };
}

export function fadeUpItem(distance = 10): Variants {
  return {
    hidden: { opacity: 0, y: distance },
    visible: {
      opacity: 1,
      y: 0,
      transition: TRANSITION.base,
    },
  };
}

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: TRANSITION.base,
  },
};

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: TRANSITION.base,
  },
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: TRANSITION.base,
  },
};

export const cardHover = {
  rest: { scale: 1, y: 0, boxShadow: "0 4px 20px rgba(0,0,0,0.06)" },
  hover: {
    scale: 1.02,
    y: -8,
    boxShadow: "0 20px 60px rgba(99,102,241,0.15)",
    transition: TRANSITION.spring,
  },
};

export const glowHover = {
  rest: { boxShadow: "0 0 0 rgba(99,102,241,0)" },
  hover: {
    boxShadow: "0 0 30px rgba(99,102,241,0.3), 0 0 60px rgba(99,102,241,0.1)",
    transition: { duration: 0.3 },
  },
};
