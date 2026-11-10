"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, BadgeCheck, Calendar, Sparkles } from "lucide-react";
import { memo } from "react";
import { useTilt } from "../hooks/useTilt";
import { useTranslation } from "../i18n/useTranslation";
import { TRANSITION } from "../lib/motion";
import type { Certification } from "../types/portfolio";

// Stable per-issuer accent so the same organisation always gets the same
// monogram colour across the home strip and the education page.
const ISSUER_ACCENTS: Record<string, string> = {
  AWS: "from-orange-500 to-amber-400",
  UM: "from-blue-600 to-amber-400",
  UCI: "from-sky-500 to-amber-400",
  CN: "from-emerald-500 to-teal-400",
  UMN: "from-rose-500 to-amber-400",
  CU: "from-amber-500 to-slate-700",
};
const FALLBACK_ACCENT = "from-indigo-500 to-sky-500";

const skillItem = {
  hidden: { opacity: 0, y: 6, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { ...TRANSITION.base, delay: 0.15 + i * 0.05 },
  }),
};

interface CertificationCardProps {
  cert: Certification;
  /** Compact variant for the home-page strip (no summary, fewer skills). */
  compact?: boolean;
}

const CertificationCard = memo(({ cert, compact = false }: CertificationCardProps) => {
  const { t } = useTranslation();
  const tilt = useTilt(5);
  const accent = ISSUER_ACCENTS[cert.issuerShort] ?? FALLBACK_ACCENT;
  const skills = compact ? cert.skills.slice(0, 2) : cert.skills;
  const featured = Boolean(cert.featured);

  return (
    <div style={{ perspective: 900 }} className={`relative h-full rounded-3xl ${featured ? "glow-border" : ""}`}>
      <motion.a
        href={cert.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${cert.name} - ${t.education.verify}`}
        style={tilt.style}
        onPointerMove={tilt.onPointerMove}
        onPointerLeave={tilt.onPointerLeave}
        whileHover={{ y: -6, scale: 1.015 }}
        transition={TRANSITION.spring}
        className={`shine-card group relative flex h-full flex-col rounded-3xl border p-6 text-left backdrop-blur-xl transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
          featured
            ? "featured-halo border-amber-200/70 bg-gradient-to-br from-amber-50/90 via-white/90 to-orange-50/80 dark:border-amber-900/50 dark:from-amber-950/40 dark:via-slate-900/80 dark:to-orange-950/30"
            : "border-slate-200/80 bg-white/90 shadow-sm hover:shadow-xl hover:shadow-indigo-500/10 dark:border-slate-800/80 dark:bg-slate-900/70"
        }`}
      >
        {/* Soft issuer-tinted wash in the corner */}
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-gradient-to-br ${accent} opacity-[0.08] blur-2xl transition-opacity duration-500 group-hover:opacity-[0.2] dark:opacity-[0.12]`}
        />

        {featured && (
          <span className="absolute right-5 top-5 inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider text-white shadow-md shadow-amber-500/30">
            <Sparkles size={11} className="animate-pulse" />
            {t.education.featured}
          </span>
        )}

        <div className="relative flex items-start justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <motion.div
              whileHover={{ rotate: [0, -6, 6, 0], transition: { duration: 0.5 } }}
              className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${accent} text-[11px] font-extrabold tracking-wide text-white shadow-md shadow-slate-900/10 ${featured ? "float-slow" : ""}`}
            >
              {cert.issuerShort}
            </motion.div>
            <div className="min-w-0">
              <p className="truncate text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                {cert.issuer}
              </p>
              <p className={`text-[11px] font-semibold ${featured ? "text-amber-600 dark:text-amber-300" : "text-indigo-600 dark:text-indigo-300"}`}>
                {t.education.certTypes[cert.type]} · {cert.platform}
              </p>
            </div>
          </div>
          {!featured && (
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-400 transition-all duration-300 group-hover:bg-indigo-600 group-hover:text-white dark:bg-slate-800">
              <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          )}
        </div>

        <h3 className={`relative mt-4 font-bold leading-snug text-slate-900 dark:text-white ${compact ? "text-sm line-clamp-2" : "text-base"}`}>
          {cert.name}
        </h3>

        {!compact && (
          <p className="relative mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
            {cert.summary}
          </p>
        )}

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative mt-auto pt-4 flex flex-wrap items-center gap-1.5"
        >
          {skills.map((skill, i) => (
            <motion.span
              key={skill}
              custom={i}
              variants={skillItem}
              className={`rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                featured
                  ? "bg-amber-100/80 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200"
                  : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400"
              }`}
            >
              {skill}
            </motion.span>
          ))}
        </motion.div>

        <div className="relative mt-4 flex items-center justify-between border-t border-slate-100 pt-3 text-xs dark:border-slate-800">
          <span className="inline-flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
            <Calendar size={12} />
            {cert.date}
          </span>
          <span className="inline-flex items-center gap-1 font-semibold text-emerald-600 dark:text-emerald-400 transition-transform duration-300 group-hover:translate-x-0.5">
            <BadgeCheck size={14} />
            {t.education.verify}
            <ArrowUpRight size={12} className="opacity-0 -translate-x-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0" />
          </span>
        </div>
      </motion.a>
    </div>
  );
});

CertificationCard.displayName = "CertificationCard";

export default CertificationCard;
