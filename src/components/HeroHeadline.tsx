"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { memo, useEffect, useState } from "react";
import { EASING } from "../lib/motion";

const ROLE_INTERVAL = 2800;
const TICK_INTERVAL = 90;

interface HeroHeadlineProps {
  name: string;
  roles: string[];
}

const HeroHeadline = memo(({ name, roles }: HeroHeadlineProps) => {
  const reduceMotion = useReducedMotion();
  const [roleIndex, setRoleIndex] = useState(0);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (reduceMotion) return;
    const id = window.setInterval(
      () => setRoleIndex((i) => (i + 1) % roles.length),
      ROLE_INTERVAL,
    );
    return () => window.clearInterval(id);
  }, [reduceMotion, roles.length]);

  useEffect(() => {
    if (reduceMotion) return;
    const id = window.setInterval(() => setTick((t) => (t + 1) % 1000), TICK_INTERVAL);
    return () => window.clearInterval(id);
  }, [reduceMotion]);

  const words = name.split(" ");
  const currentRole = roles[roleIndex % roles.length];

  return (
    <div>
      <h1
        className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-slate-900 dark:text-white mb-4 tracking-tight"
        aria-label={name}
      >
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

      <div className="text-xl md:text-2xl font-semibold mb-2 h-9 relative">
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

      <div
        className="text-[11px] md:text-xs font-mono text-slate-500 dark:text-slate-500 mb-6 flex items-center gap-2 justify-center lg:justify-start select-none"
        aria-hidden="true"
      >
        <span className="text-emerald-500">$</span>
        <span className="text-slate-600 dark:text-slate-400">~/portfolio</span>
        <span className="text-slate-400 dark:text-slate-600">›</span>
        <span className="text-indigo-500 dark:text-indigo-400">
          tick_{String(tick).padStart(3, "0")}
        </span>
        <span className="text-slate-400 dark:text-slate-600">·</span>
        <motion.span
          className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500"
          animate={
            reduceMotion
              ? undefined
              : { opacity: [1, 0.35, 1], scale: [1, 1.25, 1] }
          }
          transition={{
            duration: 1.4,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <span className="text-slate-600 dark:text-slate-400">online</span>
      </div>
    </div>
  );
});

HeroHeadline.displayName = "HeroHeadline";

export default HeroHeadline;
