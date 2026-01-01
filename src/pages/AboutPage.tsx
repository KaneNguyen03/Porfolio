import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Calendar, Code, Cloud, Database, GitBranch, Mail, MapPin, Server, Trophy } from 'lucide-react';
import { portfolioData } from '../data/portfolio';
import avatarImage from '../assets/ava.jpg';
import SEO from '../components/SEO';
import { Badge } from '../components/ui/badge';
import { Card, CardContent } from '../components/ui/card';
import { fadeUpItem, scaleInItem, staggerContainer, TRANSITION } from '../lib/motion';
import { calculateExperienceYears } from '../lib/experience';

const AboutPage: React.FC = () => {
  const { personalInfo, skills, awards, workExperience, projects } = portfolioData;
  const shouldReduceMotion = useReducedMotion();

  const experienceYears = calculateExperienceYears(workExperience);

  const experienceLabel = experienceYears ? `${experienceYears} Years Experience` : 'Experience';
  const yearsStat = experienceYears ? String(experienceYears) : '—';
  const technologiesCount = new Set(
    [
      ...skills.programmingLanguages,
      ...skills.frontend,
      ...skills.backend,
      ...skills.databases,
      ...skills.devops,
      ...skills.vcs
    ].map((item) => item.trim()).filter(Boolean)
  ).size;

  const skillCategories = [
    { icon: Code, title: 'Programming Languages', skills: skills.programmingLanguages },
    { icon: Code, title: 'Frontend', skills: skills.frontend },
    { icon: Server, title: 'Backend', skills: skills.backend },
    { icon: Database, title: 'Databases', skills: skills.databases },
    { icon: Cloud, title: 'DevOps', skills: skills.devops },
    { icon: GitBranch, title: 'Version Control', skills: skills.vcs }
  ];

  const containerVariants = staggerContainer(shouldReduceMotion, { stagger: 0.08, delay: 0.08 });
  const itemVariants = fadeUpItem(shouldReduceMotion, 12);
  const skillCardVariants = scaleInItem(shouldReduceMotion, 0.985);

  return (
    <>
      <SEO
        title="About"
        description={`About ${personalInfo.name} — ${personalInfo.title} based in ${personalInfo.location}. Skills, awards, and professional background.`}
      />
      <div className="bg-gradient-to-br from-slate-50/70 via-white/60 to-blue-50/70 dark:from-gray-950/80 dark:via-gray-900/70 dark:to-slate-900/80 py-20 sm:py-24 overflow-hidden">
        {/* Subtle spotlight */}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[var(--brand-hero)] blur-[110px] opacity-20 dark:opacity-10"
          animate={
            shouldReduceMotion
              ? undefined
              : { x: ['-50%', '-48%', '-50%'], y: [0, 10, 0], scale: [1, 1.03, 1] }
          }
          transition={shouldReduceMotion ? { duration: 0 } : { duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          style={{ translateX: '-50%' }}
        />

        <div className="container-width relative">
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="max-w-6xl mx-auto">
            {/* Hero */}
            <motion.section variants={itemVariants} className="text-center mb-16 sm:mb-20">
              <motion.div
                initial={{ scale: shouldReduceMotion ? 1 : 0.96, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={shouldReduceMotion ? { duration: 0 } : TRANSITION.base}
                className="mb-7"
              >
                <div className="relative inline-block">
                  <motion.div
                    aria-hidden="true"
                    className="absolute -inset-4 rounded-full bg-[var(--brand-hero)] blur-lg opacity-35"
                    animate={
                      shouldReduceMotion
                        ? undefined
                        : { opacity: [0.24, 0.38, 0.24], scale: [0.99, 1.02, 0.99] }
                    }
                    transition={shouldReduceMotion ? { duration: 0 } : { duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
                  />

                  <div className="relative w-36 h-36 md:w-44 md:h-44 mx-auto">
                    <img
                      src={avatarImage}
                      alt={personalInfo.name}
                      className="w-full h-full rounded-full object-cover shadow-2xl border-4 border-white dark:border-slate-800"
                    />
                    <motion.div
                      aria-hidden="true"
                      className="absolute bottom-4 right-4 w-6 h-6 bg-emerald-500 rounded-full border-4 border-white dark:border-slate-800"
                      animate={shouldReduceMotion ? undefined : { scale: [1, 1.15, 1] }}
                      transition={shouldReduceMotion ? { duration: 0 } : { duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                    />
                  </div>
                </div>
              </motion.div>

              <motion.h1
                className="text-4xl md:text-6xl font-bold text-slate-950 dark:text-white mb-4 tracking-tight"
                initial={{ y: 16, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={shouldReduceMotion ? { duration: 0 } : { ...TRANSITION.slow, delay: 0.06 }}
              >
                About
              </motion.h1>

              <motion.p
                className="text-lg md:text-2xl text-slate-700 dark:text-slate-200 max-w-4xl mx-auto leading-relaxed"
                initial={{ y: 16, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={shouldReduceMotion ? { duration: 0 } : { ...TRANSITION.slow, delay: 0.12 }}
              >
                Passionate <span className="font-semibold text-sky-700 dark:text-sky-300">Full-Stack Developer</span> crafting
                clean, reliable products.
              </motion.p>

              <motion.div
                className="flex flex-wrap justify-center gap-2 mt-6"
                initial={{ y: 12, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={shouldReduceMotion ? { duration: 0 } : { ...TRANSITION.slow, delay: 0.18 }}
              >
                <Badge className="rounded-full px-4 py-2">{personalInfo.title}</Badge>
                <Badge variant="emerald" className="rounded-full px-4 py-2">Open to Junior/Middle roles</Badge>
              </motion.div>

              {/* Quick Info */}
              <motion.div
                className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-4xl mx-auto"
                initial={{ y: 12, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={shouldReduceMotion ? { duration: 0 } : { ...TRANSITION.slow, delay: 0.24 }}
              >
                <Card className="glass-panel border border-slate-200/70 dark:border-slate-800/70 rounded-2xl">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-center gap-2 text-slate-700 dark:text-slate-200">
                      <MapPin size={16} className="text-sky-600 dark:text-sky-300" />
                      <span className="text-sm font-semibold">{personalInfo.location}</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass-panel border border-slate-200/70 dark:border-slate-800/70 rounded-2xl">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-center gap-2 text-slate-700 dark:text-slate-200">
                      <Calendar size={16} className="text-sky-600 dark:text-sky-300" />
                      <span className="text-sm font-semibold">{experienceLabel}</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass-panel border border-slate-200/70 dark:border-slate-800/70 rounded-2xl">
                  <CardContent className="p-4">
                    <a
                      className="flex items-center justify-center gap-2 text-slate-700 dark:text-slate-200 hover:text-sky-700 dark:hover:text-sky-300"
                      href={`mailto:${personalInfo.email}`}
                    >
                      <Mail size={16} className="text-sky-600 dark:text-sky-300" />
                      <span className="text-sm font-semibold">{personalInfo.email}</span>
                    </a>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.section>

            {/* Bio */}
            <motion.section variants={itemVariants} className="mb-16 sm:mb-20">
              <Card className="glass-panel border border-slate-200/70 dark:border-slate-800/70 overflow-hidden">
                <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
                  <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-[var(--brand-hero)] blur-3xl opacity-10 dark:opacity-10" />
                </div>

                <CardContent className="p-8 md:p-12 relative">
                  <motion.h2
                    variants={itemVariants}
                    className="text-3xl md:text-4xl font-bold text-slate-950 dark:text-white text-center mb-8"
                  >
                    My Journey
                  </motion.h2>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                    <motion.div variants={itemVariants} className="lg:col-span-7">
                      <p className="text-base md:text-lg text-slate-700 dark:text-slate-200 leading-relaxed mb-5">
                        As a Software Engineering graduate from FPT University, I focus on creating impactful digital solutions.
                        With hands-on experience in full-stack development, I specialize in building modern web applications that
                        solve real-world problems.
                      </p>

                      <p className="text-base md:text-lg text-slate-700 dark:text-slate-200 leading-relaxed mb-7">
                        My journey in tech began with curiosity and has evolved into expertise across the stack. I thrive on{' '}
                        <span className="font-semibold text-sky-700 dark:text-sky-300">innovative problem-solving</span> and creating
                        user-centric applications using technologies like React.js, Node.js, and cloud platforms.
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <Card className="border border-slate-200/70 dark:border-slate-800/70 rounded-2xl">
                          <CardContent className="p-4 text-center">
                            <div className="text-2xl font-bold text-slate-950 dark:text-white">{projects.length}+</div>
                            <div className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                              Projects
                            </div>
                          </CardContent>
                        </Card>
                        <Card className="border border-slate-200/70 dark:border-slate-800/70 rounded-2xl">
                          <CardContent className="p-4 text-center">
                            <div className="text-2xl font-bold text-slate-950 dark:text-white">{yearsStat}</div>
                            <div className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                              Years
                            </div>
                          </CardContent>
                        </Card>
                        <Card className="border border-slate-200/70 dark:border-slate-800/70 rounded-2xl">
                          <CardContent className="p-4 text-center">
                            <div className="text-2xl font-bold text-slate-950 dark:text-white">{technologiesCount}+</div>
                            <div className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                              Technologies
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </motion.div>

                    <motion.div variants={itemVariants} className="lg:col-span-5 flex justify-center lg:justify-end">
                      <div className="relative w-full max-w-sm">
                        <div className="absolute -inset-4 rounded-3xl bg-[var(--brand-hero)] blur-2xl opacity-20" aria-hidden="true" />
                        <div className="relative rounded-3xl p-2 bg-white/70 dark:bg-slate-950/50 border border-slate-200/70 dark:border-slate-800/70">
                          <img
                            src={avatarImage}
                            alt={personalInfo.name}
                            className="w-full aspect-square rounded-2xl object-cover"
                          />
                          <div className="absolute top-4 left-4">
                            <Badge variant="sky" className="rounded-full px-3 py-1">
                              <span className="inline-flex items-center gap-2">
                                <Code size={14} />
                                Available
                              </span>
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </motion.section>

            {/* Skills */}
            <motion.section variants={itemVariants} className="mb-16 sm:mb-20">
              <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold text-slate-950 dark:text-white text-center mb-3">
                Technical Strengths
              </motion.h2>
              <motion.p variants={itemVariants} className="text-base md:text-lg text-slate-600 dark:text-slate-300 text-center mb-10 max-w-2xl mx-auto">
                A practical toolkit for shipping and scaling modern web applications.
              </motion.p>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {skillCategories.map((category, index) => {
                  const IconComponent = category.icon;
                  return (
                    <motion.div
                      key={category.title}
                      variants={skillCardVariants}
                      initial="hidden"
                      animate="visible"
                      transition={shouldReduceMotion ? { duration: 0 } : { ...TRANSITION.base, delay: index * 0.06 }}
                      whileHover={shouldReduceMotion ? undefined : { y: -4 }}
                      className="h-full"
                    >
                      <Card className="h-full border border-slate-200/70 dark:border-slate-800/70">
                        <CardContent className="p-6">
                          <div className="flex items-center gap-3 mb-5">
                            <span className="inline-flex items-center justify-center w-10 h-10 rounded-2xl bg-slate-100 dark:bg-slate-800 text-sky-700 dark:text-sky-300">
                              <IconComponent size={20} />
                            </span>
                            <h3 className="text-lg font-bold text-slate-950 dark:text-white">
                              {category.title}
                            </h3>
                          </div>

                          <div className="flex flex-wrap gap-2">
                            {category.skills.map((skill) => (
                              <Badge key={skill} className="rounded-full px-3 py-1">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            </motion.section>

            {/* Awards */}
            <motion.section variants={itemVariants}>
              <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold text-slate-950 dark:text-white text-center mb-3">
                Honors & Recognition
              </motion.h2>
              <motion.p variants={itemVariants} className="text-base md:text-lg text-slate-600 dark:text-slate-300 text-center mb-10 max-w-2xl mx-auto">
                Academic achievements and recognition that reflect consistency and ownership.
              </motion.p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {awards.map((award, index) => (
                  <motion.div
                    key={`${award.name}-${award.period}`}
                    initial={{ opacity: 0, x: shouldReduceMotion ? 0 : index % 2 === 0 ? -18 : 18 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={shouldReduceMotion ? { duration: 0 } : { ...TRANSITION.base, delay: index * 0.08 }}
                    whileHover={shouldReduceMotion ? undefined : { y: -4 }}
                  >
                    <Card className="border border-slate-200/70 dark:border-slate-800/70 overflow-hidden">
                      <CardContent className="p-6 relative">
                        <div aria-hidden="true" className="absolute -top-12 -right-12 h-32 w-32 rounded-full bg-[var(--brand-hero)] blur-2xl opacity-10" />

                        <div className="relative flex items-start gap-4">
                          <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 text-sky-700 dark:text-sky-300 inline-flex items-center justify-center">
                            <Trophy size={22} />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-bold text-slate-950 dark:text-white mb-1">
                              {award.name}
                            </h3>
                            <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">
                              {award.period}
                            </p>
                            <div className="mt-4 flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                              <motion.span
                                aria-hidden="true"
                                className="w-2 h-2 bg-emerald-400 rounded-full"
                                animate={shouldReduceMotion ? undefined : { opacity: [0.6, 1, 0.6] }}
                                transition={shouldReduceMotion ? { duration: 0 } : { duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                              />
                              Achievement
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              <motion.div
                variants={itemVariants}
                className="text-center mt-12"
                transition={shouldReduceMotion ? { duration: 0 } : { ...TRANSITION.base, delay: 0.2 }}
              >
                <Card className="glass-panel border border-slate-200/70 dark:border-slate-800/70 inline-block">
                  <CardContent className="p-5">
                    <div className="inline-flex items-center gap-3 text-slate-800 dark:text-slate-100 font-semibold">
                      <motion.span
                        aria-hidden="true"
                        className="w-2.5 h-2.5 bg-emerald-400 rounded-full"
                        animate={shouldReduceMotion ? undefined : { scale: [1, 1.18, 1] }}
                        transition={shouldReduceMotion ? { duration: 0 } : { duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                      />
                      Ready to create amazing things together
                      <motion.span
                        aria-hidden="true"
                        className="w-2.5 h-2.5 bg-sky-400 rounded-full"
                        animate={shouldReduceMotion ? undefined : { scale: [1, 1.18, 1] }}
                        transition={
                          shouldReduceMotion
                            ? { duration: 0 }
                            : { duration: 2.2, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }
                        }
                      />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.section>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default AboutPage;
