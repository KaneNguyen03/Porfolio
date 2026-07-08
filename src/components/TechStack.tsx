"use client";

import { AnimatePresence, motion } from "framer-motion";
import { memo, useState } from "react";
import { useTranslation } from "../i18n/useTranslation";
import { TRANSITION, fadeUpItem, staggerContainer } from "../lib/motion";

interface TechCluster {
  labelKey: "frontend" | "backend" | "infrastructure" | "architecture";
  icon: string;
  technologies: string[];
  color: string;
}

const techClusters: TechCluster[] = [
  {
    labelKey: "frontend",
    icon: "⚡",
    technologies: ["React.js", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    color: "from-blue-500 to-cyan-400",
  },
  {
    labelKey: "backend",
    icon: "⚙️",
    technologies: ["Node.js", "NestJS", "Fastify", "Express", "ASP.NET Core", "REST", "gRPC"],
    color: "from-emerald-500 to-teal-400",
  },
  {
    labelKey: "infrastructure",
    icon: "☁️",
    technologies: ["AWS", "EC2", "RDS", "SQS", "S3", "Lambda", "Docker", "RabbitMQ", "Redis"],
    color: "from-orange-500 to-yellow-400",
  },
  {
    labelKey: "architecture",
    icon: "🏗️",
    technologies: ["CQRS", "Saga Pattern", "Clean Architecture", "SOLID", "DDD"],
    color: "from-purple-500 to-pink-400",
  },
];

const TechStack = memo(() => {
  const [activeCluster, setActiveCluster] = useState<string | null>(null);
  const { t } = useTranslation();
  const container = staggerContainer(0.04, 0);

  return (
    <section className="py-20">
      <div className="container-width max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={TRANSITION.base}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold dark:text-white mb-3">
            {t.home.techStackTitle}
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
            {t.home.techStackSubtitle}
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-5%" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {techClusters.map((cluster) => {
            const label = t.home.techStackClusters[cluster.labelKey];
            const isActive = activeCluster === label;
            const isDimmed = activeCluster !== null && !isActive;

            return (
              <motion.button
                key={cluster.labelKey}
                variants={fadeUpItem(15)}
                onClick={() => setActiveCluster(isActive ? null : label)}
                className={`relative overflow-hidden rounded-2xl p-6 text-left transition-all duration-300 border ${
                  isActive
                    ? "border-transparent ring-2 ring-indigo-500 shadow-xl shadow-indigo-500/20 scale-[1.02]"
                    : "border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700"
                } ${
                  isDimmed ? "opacity-30 scale-95 blur-[1px]" : "opacity-100"
                } bg-white dark:bg-slate-900`}
                style={{ willChange: "transform, opacity" }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${cluster.color} opacity-[0.03] dark:opacity-[0.06]`} />

                <div className="relative z-10">
                  <span className="text-2xl mb-3 block">{cluster.icon}</span>
                  <h3 className="text-lg font-bold dark:text-white mb-3">{label}</h3>

                  <AnimatePresence>
                    {(!activeCluster || isActive) && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="flex flex-wrap gap-1.5"
                      >
                        {cluster.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                          >
                            {tech}
                          </span>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.button>
            );
          })}
        </motion.div>

        {activeCluster && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-xs text-slate-400 mt-6"
          >
            {t.home.techStackReset}
          </motion.p>
        )}
      </div>
    </section>
  );
});

export default TechStack;
