"use client";

import { motion } from "framer-motion";
import { Award, BadgeCheck, GraduationCap, Sparkles, Trophy } from "lucide-react";
import { memo, type ReactNode } from "react";
import CertificationCard from "../components/CertificationCard";
import CountUp from "../components/CountUp";
import PageHeader from "../components/PageHeader";
import SEO from "../components/SEO";
import { Badge } from "../components/ui/badge";
import { usePortfolioData } from "../data/portfolio";
import { useTranslation } from "../i18n/useTranslation";
import { fadeUpItem, staggerContainer } from "../lib/motion";

interface SectionHeadingProps {
  icon: ReactNode;
  accent: string;
  title: string;
  subtitle: string;
  count?: number;
}

const SectionHeading = ({ icon, accent, title, subtitle, count }: SectionHeadingProps) => (
  <div className="flex items-start gap-4 mb-8">
    <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${accent} text-white shadow-md shadow-slate-900/10`}>
      {icon}
    </div>
    <div className="flex-1 min-w-0">
      <div className="flex items-center gap-3">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{title}</h2>
        {typeof count === "number" && (
          <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-bold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
            {count}
          </span>
        )}
      </div>
      <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">{subtitle}</p>
    </div>
  </div>
);

const EducationPage = () => {
  const { education, certifications, awards } = usePortfolioData();
  const { t } = useTranslation();

  const stats = [
    { label: t.education.statDegrees, value: education.length, icon: GraduationCap },
    { label: t.education.statCertifications, value: certifications.length, icon: BadgeCheck },
    { label: t.education.statHonors, value: awards.length, icon: Trophy },
  ];

  return (
    <div className="py-16 sm:py-24 min-h-screen">
      <SEO title={t.seo.pages.education.title} description={t.seo.pages.education.description} />

      <div className="container-width max-w-5xl mx-auto px-4">
        <PageHeader eyebrow={t.education.eyebrow} title={t.education.title} subtitle={t.education.subtitle}>
          <motion.div
            variants={staggerContainer(0.06, 0.15)}
            initial="hidden"
            animate="visible"
            className="mt-8 inline-grid grid-cols-3 divide-x divide-slate-200 dark:divide-slate-800 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/50 backdrop-blur-xl overflow-hidden"
          >
            {stats.map((stat) => (
              <motion.div key={stat.label} variants={fadeUpItem(10)} className="px-6 sm:px-8 py-4 text-center">
                <p className="text-2xl font-extrabold bg-gradient-to-br from-indigo-600 to-sky-500 bg-clip-text text-transparent">
                  <CountUp value={stat.value} />
                </p>
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </PageHeader>

        {/* Academic timeline */}
        <section className="mb-20">
          <SectionHeading
            icon={<GraduationCap size={20} />}
            accent="from-indigo-500 to-sky-500"
            title={t.education.academicHeading}
            subtitle={t.education.academicSubtitle}
          />
          <motion.ol
            variants={staggerContainer(0.08, 0)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-5%" }}
            className="relative space-y-6 pl-8 sm:pl-10"
          >
            <div
              aria-hidden="true"
              className="absolute left-[7px] sm:left-[11px] top-3 bottom-3 w-0.5 bg-gradient-to-b from-indigo-500 via-sky-500 to-purple-500 opacity-40"
            />
            {education.map((edu, i) => {
              const inProgress = Boolean(edu.inProgress);
              return (
                <motion.li key={`${edu.institution}-${i}`} variants={fadeUpItem(15)} className="relative">
                  <span aria-hidden="true" className="absolute -left-8 sm:-left-10 top-7 w-3.5 h-3.5">
                    {inProgress && (
                      <span className="absolute inset-0 rounded-full bg-indigo-400 opacity-60 animate-ping motion-reduce:hidden" />
                    )}
                    <span
                      className={`absolute inset-0 rounded-full ring-4 ring-slate-50 dark:ring-slate-950 ${
                        inProgress
                          ? "bg-white dark:bg-slate-900 border-2 border-indigo-500"
                          : "bg-gradient-to-br from-indigo-500 to-sky-500 shadow-[0_0_12px_rgba(99,102,241,0.6)]"
                      }`}
                    />
                  </span>
                  <div className="rounded-3xl border border-slate-200/80 bg-white/90 dark:border-slate-800/80 dark:bg-slate-900/70 backdrop-blur-xl p-6 sm:p-7 shadow-sm">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                      <div>
                        <p className="text-[11px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-300 mb-1">
                          {edu.institution}
                        </p>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white">{edu.degree}</h3>
                      </div>
                      <div className="flex flex-wrap gap-2 sm:justify-end">
                        {inProgress && (
                          <Badge variant="sky" className="font-semibold normal-case">
                            <Sparkles size={11} className="mr-1" />
                            {t.education.inProgress}
                          </Badge>
                        )}
                        <Badge variant="secondary" className="font-medium normal-case bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                          {edu.period}
                        </Badge>
                      </div>
                    </div>
                    {(edu.gpa || edu.honors) && (
                      <div className="flex flex-wrap gap-2 mt-4">
                        {edu.gpa && (
                          <Badge variant="emerald" className="font-semibold normal-case">GPA {edu.gpa}</Badge>
                        )}
                        {edu.honors && (
                          <Badge variant="sky" className="font-semibold normal-case">
                            <Award size={11} className="mr-1" />
                            {edu.honors}
                          </Badge>
                        )}
                      </div>
                    )}
                  </div>
                </motion.li>
              );
            })}
          </motion.ol>
        </section>

        {/* Certifications */}
        <section className="mb-20">
          <SectionHeading
            icon={<BadgeCheck size={20} />}
            accent="from-emerald-500 to-teal-400"
            title={t.education.certificationsHeading}
            subtitle={t.education.certificationsSubtitle}
            count={certifications.length}
          />
          <motion.div
            variants={staggerContainer(0.06, 0)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-5%" }}
            className="grid grid-cols-1 md:grid-cols-2 gap-5"
          >
            {certifications.map((cert) => (
              <motion.div key={cert.url} variants={fadeUpItem(15)} className="h-full">
                <CertificationCard cert={cert} />
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Honors */}
        {awards.length > 0 && (
          <section>
            <SectionHeading
              icon={<Trophy size={20} />}
              accent="from-amber-500 to-orange-400"
              title={t.education.honorsHeading}
              subtitle={t.education.honorsSubtitle}
              count={awards.length}
            />
            <motion.div
              variants={staggerContainer(0.05, 0)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-5%" }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              {awards.map((award, i) => (
                <motion.div
                  key={`${award.name}-${award.period}-${i}`}
                  variants={fadeUpItem(10)}
                  className="flex items-center gap-4 rounded-2xl border border-slate-200/80 bg-white/90 dark:border-slate-800/80 dark:bg-slate-900/70 backdrop-blur-xl p-4 shadow-sm"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-md shadow-amber-500/20">
                    <Trophy size={18} />
                  </div>
                  <div className="min-w-0">
                    <p className="font-bold text-slate-900 dark:text-white leading-tight">{award.name}</p>
                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mt-0.5">
                      {award.period}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </section>
        )}
      </div>
    </div>
  );
};

export default memo(EducationPage);
