"use client";

import { motion } from "framer-motion";
import { Briefcase, Building, Calendar, CheckCircle, Sparkles } from "lucide-react";
import { memo } from "react";
import SEO from "../components/SEO";
import { Badge } from "../components/ui/badge";
import { Card, CardContent } from "../components/ui/card";
import { usePortfolioData } from "../data/portfolio";
import { useTranslation } from "../i18n/useTranslation";
import { calculateExperienceYears } from "../lib/experience";
import { fadeUpItem, staggerContainer } from "../lib/motion";

const ExperiencePage = () => {
  console.log("🎨 [Render] ExperiencePage");
  const { workExperience } = usePortfolioData();
  const { t } = useTranslation();

  const years = calculateExperienceYears(workExperience);
  const companyCount = workExperience.length;
  const clientCount = new Set(workExperience.flatMap((e) => e.clients ?? [])).size;

  return (
    <div className="bg-slate-50 dark:bg-gray-950 py-16 sm:py-24 min-h-screen">
      <SEO title="Experience" description="Professional experience of Kha (Kane) Nguyen — Software Engineer at Bizzi, Cigro, FSoft, and Axpara. Node.js, React, AWS, and AP automation." />

      <div className="container-width max-w-4xl mx-auto px-4">
        <header className="mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">{t.experience.title}</h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            {t.experience.subtitle}
          </p>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mt-2">
            {t.experience.yearsCompaniesClients(years, companyCount, clientCount)}
          </p>
        </header>

        <motion.div
          variants={staggerContainer(0.08, 0)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-5%" }}
          className="relative space-y-8 pl-8 sm:pl-10"
        >
          <div
            aria-hidden="true"
            className="absolute left-[7px] sm:left-[11px] top-2 bottom-2 w-0.5 bg-gradient-to-b from-indigo-500 via-sky-500 to-purple-500 opacity-40"
          />

          {workExperience.map((exp, i) => (
            <motion.div key={i} variants={fadeUpItem(15)} className="relative">
              <span
                aria-hidden="true"
                className="absolute -left-8 sm:-left-10 top-8 w-3.5 h-3.5 rounded-full bg-gradient-to-br from-indigo-500 to-sky-500 ring-4 ring-slate-50 dark:ring-gray-950 shadow-[0_0_12px_rgba(99,102,241,0.6)]"
              />

              <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 overflow-hidden">
                <CardContent className="p-0">
                  <div className="p-6 sm:p-8">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-gradient-to-br from-indigo-500 to-sky-500 rounded-2xl">
                          <Briefcase className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold dark:text-white">{exp.position}</h3>
                          <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                            <Building size={16} />
                            <span>{exp.company}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-sm font-medium px-4 py-1.5 bg-slate-100 dark:bg-slate-800 rounded-full text-slate-600 dark:text-slate-300 self-start sm:self-center">
                        <Calendar size={14} />
                        <span>{exp.period}</span>
                      </div>
                    </div>

                    {exp.clients && exp.clients.length > 0 && (
                      <div className="flex flex-wrap items-center gap-1.5 mb-4">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-1">{t.experience.clientsLabel}</span>
                        {exp.clients.map((client) => (
                          <Badge key={client} variant="sky" className="font-normal normal-case">{client}</Badge>
                        ))}
                      </div>
                    )}

                    {exp.highlights && exp.highlights.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-6">
                        {exp.highlights.map((h, hi) => (
                          // Keyed by index — see HomeImpactStats.tsx for why
                          // keying by translated content breaks the fadeUp
                          // animation state on language switch.
                          <span
                            key={hi}
                            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-indigo-700 dark:text-indigo-300 bg-gradient-to-r from-indigo-50 to-sky-50 dark:from-indigo-950/40 dark:to-sky-950/40 ring-1 ring-inset ring-indigo-200 dark:ring-indigo-800/60"
                          >
                            <Sparkles size={12} className="text-indigo-500" />
                            {h}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="space-y-4">
                      <ul className="grid grid-cols-1 gap-3 list-none">
                        {exp.responsibilities.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-300">
                            <CheckCircle size={16} className="text-emerald-500 mt-0.5 shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default memo(ExperiencePage);
