"use client";

import { motion } from "framer-motion";
import { memo } from "react";
import { usePortfolioData } from "../data/portfolio";
import { fadeUpItem, staggerContainer } from "../lib/motion";

const HomeImpactStats = memo(() => {
  const { workExperience } = usePortfolioData();
  const highlights = workExperience[0]?.highlights ?? [];

  if (highlights.length === 0) return null;

  return (
    <section className="py-12">
      <div className="container-width max-w-5xl mx-auto px-4">
        <motion.div
          variants={staggerContainer(0.06, 0)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-5%" }}
          className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-slate-200 dark:divide-slate-800 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-slate-900/40 backdrop-blur-xl overflow-hidden"
        >
          {highlights.map((h, i) => (
            // Keyed by index, not content: the highlight text changes when
            // the language toggles, and keying by content would remount
            // these nodes after the parent's whileInView animation has
            // already settled — leaving the new nodes stuck at their
            // "hidden" (opacity: 0) initial state forever.
            <motion.div key={i} variants={fadeUpItem(15)} className="p-8 text-center">
              <p className="text-xl sm:text-2xl font-extrabold bg-gradient-to-br from-indigo-600 to-sky-500 bg-clip-text text-transparent">
                {h}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
});

HomeImpactStats.displayName = "HomeImpactStats";

export default HomeImpactStats;
