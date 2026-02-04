import type { Transition, Variants } from "framer-motion";

export const EASING = [0.16, 1, 0.3, 1] as const;

export const TRANSITION: Record<"fast" | "base" | "slow", Transition> = {
  fast: { duration: 0.15, ease: EASING },
  base: { duration: 0.25, ease: EASING },
  slow: { duration: 0.4, ease: EASING },
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
