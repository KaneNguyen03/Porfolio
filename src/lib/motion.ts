import type { Transition, Variants } from 'framer-motion';

export const EASING = [0.16, 1, 0.3, 1] as const;

export const TRANSITION: Record<'fast' | 'base' | 'slow', Transition> = {
  fast: { duration: 0.18, ease: EASING },
  base: { duration: 0.32, ease: EASING },
  slow: { duration: 0.5, ease: EASING }
};

export function pageVariants(shouldReduceMotion: boolean | null | undefined): Variants {
  const reduceMotion = !!shouldReduceMotion;
  return {
    initial: { opacity: 0, y: reduceMotion ? 0 : 8 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: reduceMotion ? 0 : -8 }
  };
}

export function staggerContainer(
  shouldReduceMotion: boolean | null | undefined,
  options?: { stagger?: number; delay?: number }
): Variants {
  const reduceMotion = !!shouldReduceMotion;
  const stagger = options?.stagger ?? 0.08;
  const delay = options?.delay ?? 0.08;

  return {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: reduceMotion
        ? { duration: 0 }
        : { staggerChildren: stagger, delayChildren: delay }
    }
  };
}

export function fadeUpItem(shouldReduceMotion: boolean | null | undefined, distance = 12): Variants {
  const reduceMotion = !!shouldReduceMotion;
  return {
    hidden: { opacity: 0, y: reduceMotion ? 0 : distance },
    visible: {
      opacity: 1,
      y: 0,
      transition: reduceMotion ? { duration: 0 } : TRANSITION.base
    }
  };
}

export function scaleInItem(shouldReduceMotion: boolean | null | undefined, from = 0.98): Variants {
  const reduceMotion = !!shouldReduceMotion;
  return {
    hidden: { opacity: 0, scale: reduceMotion ? 1 : from },
    visible: {
      opacity: 1,
      scale: 1,
      transition: reduceMotion ? { duration: 0 } : TRANSITION.base
    }
  };
}

export function hoverLift(shouldReduceMotion: boolean | null | undefined) {
  const reduceMotion = !!shouldReduceMotion;
  return reduceMotion
    ? { whileHover: undefined, whileTap: undefined }
    : {
        whileHover: { y: -2, scale: 1.02 },
        whileTap: { scale: 0.98 }
      };
}
