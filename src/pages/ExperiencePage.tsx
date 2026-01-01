import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Building, Calendar, CheckCircle, Code, TrendingUp, Users, Target, Lightbulb } from 'lucide-react';
import { portfolioData } from '../data/portfolio';
import SEO from '../components/SEO';
import { Badge } from '../components/ui/badge';
import { Card, CardContent } from '../components/ui/card';
import { fadeUpItem, hoverLift, staggerContainer, TRANSITION } from '../lib/motion';
import { calculateExperienceYears } from '../lib/experience';

const ExperiencePage: React.FC = () => {
  const { workExperience } = portfolioData;
  const shouldReduceMotion = useReducedMotion();
  const uniqueCompanies = new Set(workExperience.map((experience) => experience.company)).size;
  const experienceYears = calculateExperienceYears(workExperience);
  const yearsStat = experienceYears ? String(experienceYears) : '—';

  const experienceMeta: Record<string, {
    learnings?: string[];
    contributions?: string[];
    techStack?: string[];
    impact?: string;
  }> = {
    Bizzi: {
      learnings: [
        'Scaled asynchronous workflows with AWS SQS/Lambda and Redis caching to keep AP flows responsive',
        'Shipped secure audit trails and RBAC for enterprise customers',
        'Partnered with design to smooth onboarding and document status visibility',
        'Optimized database indexing and timeouts to stabilize critical jobs'
      ],
      contributions: [
        'Delivered invoice capture, approvals, and payment flows for AP automation',
        'Hardened compliance surface with audit logging and secure file storage',
        'Cut latency on event-driven steps by tuning queues, caches, and queries'
      ],
      techStack: ['Node.js', 'TypeScript', 'PostgreSQL', 'Redis', 'AWS SQS', 'AWS Lambda', 'React'],
      impact: 'Improved reliability and UX for finance teams processing invoices at scale'
    },
    Cigro: {
      learnings: [
        'Built real-time messaging with Sendbird and custom chat persistence',
        'Implemented subscription payments via Google/Apple IAP webhooks',
        'Practiced load testing with Autocannon/K6 plus Grafana dashboards',
        'Migrated events from EventEmitter2 to SQS + Lambda for scale'
      ],
      contributions: [
        'Integrated personalized chat storage for EveryTalk',
        'Launched reliable payment verification for Uobong',
        'Reduced response time through event-queue migration and caching'
      ],
      techStack: ['Node.js', 'TypeScript', 'Sendbird', 'PostgreSQL', 'AWS SQS', 'AWS Lambda', 'IAP', 'Autocannon', 'K6'],
      impact: 'Enabled stable messaging and billing for consumer apps under growth'
    },
    FSoft: {
      learnings: [
        'Strengthened React patterns and state management',
        'Applied performance optimizations and code-splitting',
        'Used React Query to keep UI and API state in sync'
      ],
      contributions: [
        'Built reusable UI components used across the squad',
        'Helped lower redundancy via component abstraction and docs'
      ],
      techStack: ['React', 'TypeScript', 'React Query', 'Tailwind CSS', 'Git', 'Scrum'],
      impact: 'Accelerated feature delivery with a shared UI toolkit'
    },
    Axpara: {
      learnings: [
        'Learned to collaborate closely with designers and PMs',
        'Practiced shipping React apps with iterative feedback',
        'Adopted engineering quality habits and code reviews'
      ],
      contributions: [
        'Delivered user-facing features across multiple web apps',
        'Maintained code quality through review cycles and refactors'
      ],
      techStack: ['React', 'JavaScript', 'CSS', 'HTML', 'Git'],
      impact: 'Shipped stable interfaces that matched customer expectations'
    }
  };

  // Merge base data with meta so ordering always follows portfolioData
  const enhancedExperience = workExperience.map((experience) => {
    const meta = experienceMeta[experience.company] ?? {};
    return {
      ...experience,
      learnings: meta.learnings ?? experience.responsibilities.slice(0, 3),
      contributions: meta.contributions ?? experience.responsibilities,
      techStack: meta.techStack ?? [],
      impact: meta.impact ?? 'Delivered features and collaborated across the team'
    };
  });

  const containerVariants = staggerContainer(shouldReduceMotion, { stagger: 0.08, delay: 0.08 });
  const itemVariants = fadeUpItem(shouldReduceMotion, 12);

  const timelineVariants = {
    hidden: { scaleY: shouldReduceMotion ? 1 : 0 },
    visible: {
      scaleY: 1,
      transition: shouldReduceMotion
        ? { duration: 0 }
        : TRANSITION.slow
    }
  };

  return (
    <div className="bg-gradient-to-br from-slate-50/70 via-white/60 to-blue-50/70 dark:from-gray-950/80 dark:via-gray-900/70 dark:to-slate-900/80 py-20 sm:py-24 overflow-hidden">
      <SEO
        title="Experience"
        description={`Work experience for ${portfolioData.personalInfo.name}, including roles and accomplishments with Node.js/TypeScript, React, AWS, and enterprise systems.`}
      />

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

      <div className="container-width">
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="max-w-6xl mx-auto">
          {/* Hero */}
          <motion.section variants={itemVariants} className="text-center mb-16 sm:mb-20">
            <motion.div
              initial={{ scale: shouldReduceMotion ? 1 : 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={shouldReduceMotion ? { duration: 0 } : TRANSITION.base}
              className="mb-8"
            >
              <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-2xl mb-6">
                <div aria-hidden="true" className="absolute -inset-3 rounded-3xl bg-[var(--brand-hero)] blur-2xl opacity-35" />
                <div className="relative inline-flex items-center justify-center w-20 h-20 bg-white/80 dark:bg-gray-900/40 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-xl shadow-slate-900/10">
                  <Building size={32} className="text-sky-700 dark:text-sky-300" />
                </div>
              </div>
            </motion.div>

            <motion.h1
              className="text-4xl md:text-6xl font-bold bg-clip-text mb-4"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={shouldReduceMotion ? { duration: 0 } : { ...TRANSITION.slow, delay: 0.08 }}
            >
              Experience
            </motion.h1>

            <motion.p
              className="text-lg md:text-2xl text-gray-700 dark:text-gray-200 max-w-4xl mx-auto leading-relaxed"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={shouldReduceMotion ? { duration: 0 } : { ...TRANSITION.slow, delay: 0.16 }}
            >
              A timeline of roles, lessons learned, and real impact shipped.
            </motion.p>

            <motion.div
              className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-10 max-w-3xl mx-auto"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={shouldReduceMotion ? { duration: 0 } : { ...TRANSITION.slow, delay: 0.24 }}
            >
              <Card className="glass-panel border border-gray-200 dark:border-gray-800 rounded-2xl">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">{uniqueCompanies}</div>
                  <div className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Companies</div>
                </CardContent>
              </Card>
              <Card className="glass-panel border border-gray-200 dark:border-gray-800 rounded-2xl">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">{yearsStat}</div>
                  <div className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Years</div>
                </CardContent>
              </Card>
              <Card className="glass-panel border border-gray-200 dark:border-gray-800 rounded-2xl">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">{portfolioData.projects.length}+</div>
                  <div className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Projects</div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.section>

          {/* Timeline */}
          <section className="relative max-w-6xl mx-auto">
            <motion.div
              className="absolute left-4 md:left-1/2 md:transform md:-translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-500 via-purple-500 to-green-500 rounded-full origin-top"
              variants={timelineVariants}
            />

            {enhancedExperience.map((experience, index) => (
              <motion.div
                key={`${experience.company}-${experience.period}-${experience.position}`}
                variants={itemVariants}
                className={`relative mb-14 md:mb-20 md:flex ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                <div className="absolute left-0 md:left-1/2 md:transform md:-translate-x-1/2 w-12 h-12 rounded-2xl z-10 flex items-center justify-center">
                  <div className="absolute inset-0 rounded-2xl bg-white/85 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 shadow-xl shadow-slate-900/10" />
                  <Building size={18} className="relative text-sky-700 dark:text-sky-300" />
                </div>

                <div
                  className={`ml-20 md:ml-0 md:w-5/12 ${
                    index % 2 === 0 ? 'md:mr-auto md:pr-12' : 'md:ml-auto md:pl-12'
                  }`}
                >
                  <motion.div {...hoverLift(shouldReduceMotion)} className="h-full">
                    <Card className="glass-panel border border-gray-200 dark:border-gray-800 overflow-hidden relative">
                      <div aria-hidden="true" className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-[var(--brand-hero)] blur-3xl opacity-10" />
                      <CardContent className="relative z-10 p-6 md:p-8">
                        <div className="mb-6">
                          <div className="flex items-start justify-between gap-4 mb-2">
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{experience.company}</h3>
                            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                              <Calendar size={16} className="text-sky-600 dark:text-sky-300" />
                              <span className="font-medium">{experience.period}</span>
                            </div>
                          </div>

                          <div className="flex flex-wrap items-center justify-between gap-3">
                            <p className="text-lg font-semibold text-sky-700 dark:text-sky-300">{experience.position}</p>
                          </div>

                          <div className="mt-3 flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300">
                            <TrendingUp size={16} className="mt-0.5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                            <p className="leading-relaxed">{experience.impact}</p>
                          </div>

                          {experience.techStack.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-4">
                              {experience.techStack.map((tech) => (
                                <Badge key={tech} variant="sky" className="rounded-full">
                                  {tech}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>

                        <div className="grid grid-cols-1 gap-4">
                          <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white/60 dark:bg-gray-900/30 p-4">
                            <div className="flex items-center gap-2 mb-3">
                              <Lightbulb size={18} className="text-sky-700 dark:text-sky-300" />
                              <h4 className="font-semibold text-gray-900 dark:text-white">Key Learnings</h4>
                            </div>
                            <ul className="space-y-2">
                              {experience.learnings.map((learning, idx) => (
                                <li key={idx} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-200">
                                  <CheckCircle size={14} className="text-emerald-600 dark:text-emerald-400 mt-0.5 flex-shrink-0" />
                                  <span>{learning}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white/60 dark:bg-gray-900/30 p-4">
                            <div className="flex items-center gap-2 mb-3">
                              <Target size={18} className="text-sky-700 dark:text-sky-300" />
                              <h4 className="font-semibold text-gray-900 dark:text-white">Key Contributions</h4>
                            </div>
                            <ul className="space-y-2">
                              {experience.contributions.map((contribution, idx) => (
                                <li key={idx} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-200">
                                  <CheckCircle size={14} className="text-sky-700 dark:text-sky-300 mt-0.5 flex-shrink-0" />
                                  <span>{contribution}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </section>

          {/* Closing */}
          <motion.section variants={itemVariants} className="text-center mt-16 sm:mt-20">
            <Card className="glass-panel border border-gray-200 dark:border-gray-800 overflow-hidden max-w-4xl mx-auto">
              <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
                <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-[var(--brand-hero)] blur-3xl opacity-10" />
              </div>
              <CardContent className="relative z-10 p-8 md:p-12">
                <div className="flex justify-center mb-6">
                  <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-2xl">
                    <div aria-hidden="true" className="absolute -inset-3 rounded-3xl bg-[var(--brand-hero)] blur-2xl opacity-30" />
                    <div className="relative inline-flex items-center justify-center w-20 h-20 bg-white/80 dark:bg-gray-900/40 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-xl shadow-slate-900/10">
                      <Users size={32} className="text-sky-700 dark:text-sky-300" />
                    </div>
                  </div>
                </div>

                <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Ready for the Next Challenge</h3>

                <p className="text-lg text-gray-700 dark:text-gray-200 mb-8 max-w-2xl mx-auto leading-relaxed">
                  Seeking a <span className="font-semibold text-sky-700 dark:text-sky-300">Fresher/Junior Full-Stack Developer</span>{' '}
                  position where I can keep growing while shipping reliable, user-focused products.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <Card className="glass-panel border border-gray-200 dark:border-gray-800 rounded-2xl">
                    <CardContent className="p-6 text-center">
                      <Code size={24} className="text-sky-700 dark:text-sky-300 mx-auto mb-3" />
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Technical Excellence</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">Scalable, maintainable modern stack</p>
                    </CardContent>
                  </Card>

                  <Card className="glass-panel border border-gray-200 dark:border-gray-800 rounded-2xl">
                    <CardContent className="p-6 text-center">
                      <Lightbulb size={24} className="text-sky-700 dark:text-sky-300 mx-auto mb-3" />
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Problem Solving</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">Practical solutions with measurable impact</p>
                    </CardContent>
                  </Card>

                  <Card className="glass-panel border border-gray-200 dark:border-gray-800 rounded-2xl">
                    <CardContent className="p-6 text-center">
                      <TrendingUp size={24} className="text-sky-700 dark:text-sky-300 mx-auto mb-3" />
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Growth Mindset</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">Continuous learning and iteration</p>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </motion.section>
        </motion.div>
      </div>
    </div>
  );
};

export default ExperiencePage;
