"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { memo, useEffect, useState } from "react";
import { EASING } from "../lib/motion";

const ROLE_INTERVAL = 2800;

interface HeroHeadlineProps {
  name: string;
  roles: string[];
}

const HeroHeadline = memo(({ name, roles }: HeroHeadlineProps) => {
  const reduceMotion = useReducedMotion();
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    if (reduceMotion) return;
    const id = window.setInterval(
      () => setRoleIndex((i) => (i + 1) % roles.length),
      ROLE_INTERVAL,
    );
    return () => window.clearInterval(id);
  }, [reduceMotion, roles.length]);

  const words = name.split(" ");
  const currentRole = roles[roleIndex % roles.length];

  return (
    <div>
      <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-slate-900 dark:text-white mb-4 tracking-tight">
        {reduceMotion ? (
          name
        ) : (
          <span className="inline-flex flex-wrap items-end gap-x-3 gap-y-1 justify-center lg:justify-start">
            {words.map((word, i) => (
              <motion.span
                // biome-ignore lint/suspicious/noArrayIndexKey: word list is stable
                key={`${word}-${i}`}
                initial={{ opacity: 0, y: 22, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{
                  duration: 0.55,
                  delay: 0.2 + i * 0.08,
                  ease: EASING,
                }}
                className="inline-block"
              >
                {word}
              </motion.span>
            ))}
            <motion.span
              aria-hidden="true"
              className="inline-block w-[6px] rounded-sm bg-gradient-to-b from-sky-400 via-indigo-500 to-purple-500"
              style={{ height: "0.78em" }}
              initial={{ opacity: 0, scaleY: 0 }}
              animate={{
                opacity: [1, 0, 1],
                scaleY: 1,
              }}
              transition={{
                opacity: {
                  duration: 1.1,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                  delay: 0.2 + words.length * 0.08,
                },
                scaleY: { duration: 0.3, delay: 0.2 + words.length * 0.08 },
              }}
            />
          </span>
        )}
      </h1>

      <div className="text-xl md:text-2xl font-semibold mb-6 h-9 relative">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={currentRole}
            initial={reduceMotion ? false : { opacity: 0, y: 14, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -14, filter: "blur(6px)" }}
            transition={{ duration: 0.45, ease: EASING }}
            className="absolute inset-0 flex items-center justify-center lg:justify-start text-slate-700 dark:text-slate-200"
          >
            {currentRole}
          </motion.span>
        </AnimatePresence>
      </div>

    </div>
  );
});

HeroHeadline.displayName = "HeroHeadline";

export default HeroHeadline;
