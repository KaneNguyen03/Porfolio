"use client";

import { useAnimation, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

interface UseScrollRevealOptions {
  threshold?: number;
  once?: boolean;
  margin?: string;
}

export function useScrollReveal(opts: UseScrollRevealOptions = {}) {
  const { threshold = 0.1, once = true, margin = "-10% 0px" } = opts;
  const ref = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const inView = useInView(ref, { once, amount: threshold, margin } as any);

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else if (!once) {
      controls.start("hidden");
    }
  }, [inView, controls, once]);

  return { ref, controls, inView };
}
