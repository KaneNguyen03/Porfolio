"use client";

import { motion } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";
import { memo } from "react";
import { Link } from "react-router-dom";
import { usePortfolioData } from "../data/portfolio";
import { useTranslation } from "../i18n/useTranslation";
import { TRANSITION } from "../lib/motion";
import MagneticButton from "./MagneticButton";
import { Button } from "./ui/button";

// Closing conversion band: the home page previously ended straight into the
// footer with no "hire me" moment after five content sections.
const HomeCtaBand = memo(() => {
  const { personalInfo } = usePortfolioData();
  const { t } = useTranslation();

  return (
    <section className="py-20">
      <div className="container-width max-w-5xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={TRANSITION.slow}
          className="relative overflow-hidden rounded-3xl border border-indigo-200/60 dark:border-indigo-900/50 bg-white/80 dark:bg-slate-900/70 backdrop-blur-xl px-6 py-12 sm:px-12 sm:py-16 text-center shadow-xl shadow-indigo-500/10"
        >
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-sky-500/5 to-purple-500/10" />
          <div aria-hidden="true" className="pointer-events-none absolute -top-24 left-1/2 h-48 w-96 -translate-x-1/2 rounded-full bg-gradient-to-r from-indigo-500 to-sky-500 opacity-20 blur-3xl" />

          <div className="relative">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-300 mb-3">
              {t.home.ctaEyebrow}
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4">
              <span className="gradient-text-animated">{t.home.ctaTitle}</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-xl mx-auto mb-8">
              {t.home.ctaBody}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <MagneticButton>
                <Button asChild size="lg" className="rounded-full px-8 gap-2 group relative overflow-hidden">
                  <Link to="/contact">
                    <span className="cta-ripple-glow" aria-hidden="true" />
                    <span className="relative z-10">{t.home.ctaPrimary}</span>
                    <ArrowRight className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </Button>
              </MagneticButton>
              <MagneticButton>
                <Button asChild variant="outline" size="lg" className="rounded-full px-8 gap-2">
                  <a href={`mailto:${personalInfo.email}`}>
                    <Mail className="h-4 w-4" />
                    {t.home.ctaSecondary}
                  </a>
                </Button>
              </MagneticButton>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
});

HomeCtaBand.displayName = "HomeCtaBand";

export default HomeCtaBand;
