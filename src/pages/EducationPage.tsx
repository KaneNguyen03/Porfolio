import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { GraduationCap, Calendar, Award, ExternalLink, BookOpen, Target, TrendingUp, Users } from 'lucide-react';
import { portfolioData } from '../data/portfolio';
import SEO from '../components/SEO';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { fadeUpItem, hoverLift, staggerContainer, TRANSITION } from '../lib/motion';

const EducationPage: React.FC = () => {
  const { education, certifications } = portfolioData;
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = staggerContainer(shouldReduceMotion, { stagger: 0.08, delay: 0.08 });
  const itemVariants = fadeUpItem(shouldReduceMotion, 12);

  const academicAchievements = [
    {
      title: "Software Engineering Very Good",
      description: "Specialized in full-stack development with focus on modern web technologies",
      metrics: "3.21/4.0 GPA"
    },
    {
      title: "Project Leadership",
      description: "Led multiple capstone projects using agile methodologies",
      metrics: "6+ Projects"
    },
    {
      title: "Technical Proficiency",
      description: "Mastered diverse technology stack from frontend to cloud deployment",
      metrics: "10+ Technologies"
    }
  ];

  return (
    <div className="bg-linear-to-br from-slate-50/70 via-white/60 to-blue-50/70 dark:from-gray-950/80 dark:via-gray-900/70 dark:to-slate-900/80 py-20 sm:py-24 overflow-hidden">
      <SEO
        title="Education"
        description={`Education and certifications for ${portfolioData.personalInfo.name}. Academic background, training, and professional learning.`}
      />

      {/* Subtle spotlight */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/2 h-130 w-130 -translate-x-1/2 rounded-full bg-(--brand-hero) blur-[110px] opacity-20 dark:opacity-10"
        animate={
          shouldReduceMotion
            ? undefined
            : { x: ['-50%', '-48%', '-50%'], y: [0, 10, 0], scale: [1, 1.03, 1] }
        }
        transition={shouldReduceMotion ? { duration: 0 } : { duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        style={{ translateX: '-50%' }}
      />

      <div className="container-width">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-6xl mx-auto"
        >
          {/* Hero Section */}
          <motion.div variants={itemVariants} className="text-center mb-20">
            <motion.div
              initial={{ scale: shouldReduceMotion ? 1 : 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={shouldReduceMotion ? { duration: 0 } : TRANSITION.base}
              className="mb-8"
            >
              <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-2xl mb-6">
                <div aria-hidden="true" className="absolute -inset-3 rounded-3xl bg-(--brand-hero) blur-2xl opacity-35" />
                <div className="relative inline-flex items-center justify-center w-20 h-20 bg-white/80 dark:bg-slate-950/60 border border-slate-200/70 dark:border-slate-800/70 rounded-2xl shadow-xl shadow-slate-900/10">
                  <GraduationCap size={32} className="text-sky-700 dark:text-sky-300" />
                </div>
              </div>
            </motion.div>
            
            <motion.h1
              className="text-4xl md:text-6xl font-bold text-slate-950 dark:text-white mb-4 tracking-tight"
              initial={{ y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={shouldReduceMotion ? { duration: 0 } : { ...TRANSITION.slow, delay: 0.08 }}
            >
              Learning Journey
            </motion.h1>
            
            <motion.p 
              className="text-lg md:text-2xl text-slate-700 dark:text-slate-200 max-w-4xl mx-auto leading-relaxed"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={shouldReduceMotion ? { duration: 0 } : { ...TRANSITION.slow, delay: 0.16 }}
            >
              Building expertise through <span className="font-semibold text-sky-700 dark:text-sky-300">continuous education</span> and professional development.
            </motion.p>
            
            {/* Education Summary */}
            <motion.div 
              className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-10 max-w-4xl mx-auto"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={shouldReduceMotion ? { duration: 0 } : { ...TRANSITION.slow, delay: 0.24 }}
            >
              <Card className="glass-panel border border-slate-200/70 dark:border-slate-800/70 rounded-2xl">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-slate-950 dark:text-white">4</div>
                  <div className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Years</div>
                </CardContent>
              </Card>
              <Card className="glass-panel border border-slate-200/70 dark:border-slate-800/70 rounded-2xl">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-slate-950 dark:text-white">3.21</div>
                  <div className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">GPA</div>
                </CardContent>
              </Card>
              <Card className="glass-panel border border-slate-200/70 dark:border-slate-800/70 rounded-2xl">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-slate-950 dark:text-white">{portfolioData.projects.length}+</div>
                  <div className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Projects</div>
                </CardContent>
              </Card>
              <Card className="glass-panel border border-slate-200/70 dark:border-slate-800/70 rounded-2xl">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-slate-950 dark:text-white">{certifications.length}</div>
                  <div className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Certifications</div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          {/* Academic Education Section - Enhanced */}
          <motion.div variants={itemVariants} className="mb-20">
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-slate-950 dark:text-white text-center mb-4"
              variants={itemVariants}
            >
              Academic Foundation
            </motion.h2>
            <motion.p
              className="text-lg text-slate-600 dark:text-slate-300 text-center mb-12 max-w-2xl mx-auto"
              variants={itemVariants}
            >
              Comprehensive software engineering education with hands-on project experience
            </motion.p>
            
            <motion.div variants={containerVariants} className="max-w-6xl mx-auto" initial={false}>
              {education.map((edu, index) => (
                <motion.div
                  key={index}
                  {...hoverLift(shouldReduceMotion)}
                  variants={itemVariants}
                  transition={shouldReduceMotion ? { duration: 0 } : TRANSITION.slow}
                  className="mb-6"
                >
                  <Card className="glass-panel border border-slate-200/70 dark:border-slate-800/70 overflow-hidden relative">
                    <div aria-hidden="true" className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-(--brand-hero) blur-3xl opacity-10" />
                    <CardContent className="relative z-10 p-8 md:p-12">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                      {/* University Info */}
                      <div className="lg:col-span-2">
                        <div className="flex items-start space-x-6 mb-6">
                          <div className="w-20 h-20 bg-white/80 dark:bg-slate-950/60 border border-slate-200/70 dark:border-slate-800/70 rounded-2xl flex items-center justify-center shrink-0 shadow-xl shadow-slate-900/10">
                            <GraduationCap size={32} className="text-sky-700 dark:text-sky-300" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-2xl md:text-3xl font-bold text-slate-950 dark:text-white mb-2">
                              {edu.degree}
                            </h3>
                            <p className="text-xl text-sky-700 dark:text-sky-300 font-semibold mb-3">
                              {edu.institution}
                            </p>
                            <div className="flex items-center space-x-2 text-slate-600 dark:text-slate-300">
                              <Calendar size={18} />
                              <span className="font-medium">{edu.period}</span>
                            </div>
                          </div>
                        </div>
                        
                        {/* Academic Journey */}
                        <div className="rounded-2xl p-6 border border-slate-200/70 dark:border-slate-800/70 bg-white/60 dark:bg-slate-950/30">
                          <h4 className="font-semibold text-slate-950 dark:text-white mb-3 flex items-center">
                            <BookOpen size={18} className="mr-2 text-sky-700 dark:text-sky-300" />
                            Academic Highlights
                          </h4>
                          <ul className="space-y-2 text-slate-700 dark:text-slate-200">
                            <li className="flex items-start space-x-2">
                              <Target size={14} className="text-sky-700 dark:text-sky-300 mt-1 shrink-0" />
                              <span>Specialized in full-stack web development and software architecture</span>
                            </li>
                            <li className="flex items-start space-x-2">
                              <Target size={14} className="text-sky-700 dark:text-sky-300 mt-1 shrink-0" />
                              <span>Led multiple capstone projects using modern development methodologies</span>
                            </li>
                            <li className="flex items-start space-x-2">
                              <Target size={14} className="text-sky-700 dark:text-sky-300 mt-1 shrink-0" />
                              <span>Gained expertise in cloud computing and DevOps practices</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                      
                      {/* Achievements */}
                      <div className="lg:col-span-1">
                        {edu.gpa && (
                          <div className="rounded-2xl p-6 border border-slate-200/70 dark:border-slate-800/70 bg-white/60 dark:bg-slate-950/30 mb-6">
                            <div className="text-center">
                              <div className="w-16 h-16 bg-white/80 dark:bg-slate-950/60 border border-slate-200/70 dark:border-slate-800/70 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl shadow-slate-900/10">
                                <Award size={28} className="text-sky-700 dark:text-sky-300" />
                              </div>
                              <div className="text-3xl font-bold text-slate-950 dark:text-white mb-1">{edu.gpa}</div>
                              <div className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Cumulative GPA</div>
                            </div>
                          </div>
                        )}
                        
                        {/* Academic Achievements */}
                        <div className="grid grid-cols-1 gap-4">
                          {academicAchievements.map((achievement, idx) => (
                            <div key={idx} className="text-center p-4 rounded-2xl border border-slate-200/70 dark:border-slate-800/70 bg-white/60 dark:bg-slate-950/30">
                              <div className="text-lg font-bold text-slate-950 dark:text-white">{achievement.metrics}</div>
                              <div className="text-xs text-slate-600 dark:text-slate-300">{achievement.title}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Certifications Section - Enhanced */}
          <motion.div variants={itemVariants} className="mb-20">
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-slate-950 dark:text-white text-center mb-4"
              variants={itemVariants}
            >
              Professional Certifications
            </motion.h2>
            <motion.p
              className="text-lg text-slate-600 dark:text-slate-300 text-center mb-12 max-w-2xl mx-auto"
              variants={itemVariants}
            >
              Validated expertise through industry-recognized certifications
            </motion.p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {certifications.map((cert, index) => (
                <motion.div
                  key={index}
                  transition={shouldReduceMotion ? { duration: 0 } : { ...TRANSITION.base, delay: index * 0.06 }}
                  {...hoverLift(shouldReduceMotion)}
                  variants={itemVariants}
                  className="relative"
                >
                  <Card className="glass-panel border border-slate-200/70 dark:border-slate-800/70 overflow-hidden relative">
                    <div aria-hidden="true" className="absolute -top-24 -right-24 h-56 w-56 rounded-full bg-(--brand-hero) blur-3xl opacity-10" />
                    <CardContent className="relative z-10 p-8">
                      <div className="text-center mb-6">
                        <div className="w-16 h-16 bg-white/80 dark:bg-slate-950/60 border border-slate-200/70 dark:border-slate-800/70 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl shadow-slate-900/10">
                          <Award size={28} className="text-sky-700 dark:text-sky-300" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-950 dark:text-white mb-3 leading-tight">
                          {cert.name}
                        </h3>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-center justify-center gap-2 text-slate-600 dark:text-slate-300">
                          <Calendar size={16} className="text-sky-600 dark:text-sky-300" />
                          <span className="font-medium">{cert.date}</span>
                        </div>

                        <div className="rounded-2xl p-4 border border-slate-200/70 dark:border-slate-800/70 bg-white/60 dark:bg-slate-950/30">
                          <div className="text-center">
                            <div className="w-2 h-2 bg-emerald-400 rounded-full mx-auto mb-2 animate-pulse" />
                            <span className="text-sm font-medium text-slate-700 dark:text-slate-200">Verified Credential</span>
                          </div>
                        </div>

                        <Button asChild size="lg" className="w-full rounded-2xl">
                          <a href={cert.url} target="_blank" rel="noopener noreferrer">
                            <ExternalLink size={18} />
                            <span>View Certificate</span>
                          </a>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Learning Philosophy - Enhanced */}
          <motion.div variants={itemVariants}>
            <Card className="glass-panel border border-slate-200/70 dark:border-slate-800/70 overflow-hidden max-w-5xl mx-auto">
              <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
                <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-(--brand-hero) blur-3xl opacity-10" />
              </div>
              <CardContent className="relative z-10 p-10 md:p-12 text-center">
                <div className="flex justify-center mb-8">
                  <div className="w-20 h-20 bg-white/80 dark:bg-slate-950/60 border border-slate-200/70 dark:border-slate-800/70 rounded-2xl flex items-center justify-center shadow-xl shadow-slate-900/10">
                    <TrendingUp size={32} className="text-sky-700 dark:text-sky-300" />
                  </div>
                </div>

                <h3 className="text-3xl md:text-4xl font-bold text-slate-950 dark:text-white mb-6">Lifelong Learning Mindset</h3>

                <p className="text-lg text-slate-700 dark:text-slate-200 leading-relaxed max-w-3xl mx-auto mb-10">
                  Education is about building the ability to adapt, innovate, and solve real problems. I keep learning to
                  stay current with modern engineering practices.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <Card className="glass-panel border border-slate-200/70 dark:border-slate-800/70 rounded-2xl">
                    <CardContent className="p-6 text-center">
                      <BookOpen size={24} className="text-sky-700 dark:text-sky-300 mx-auto mb-3" />
                      <h4 className="font-semibold text-slate-950 dark:text-white mb-2">Knowledge Seeking</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-300">Explore new tools & methodologies</p>
                    </CardContent>
                  </Card>

                  <Card className="glass-panel border border-slate-200/70 dark:border-slate-800/70 rounded-2xl">
                    <CardContent className="p-6 text-center">
                      <Users size={24} className="text-sky-700 dark:text-sky-300 mx-auto mb-3" />
                      <h4 className="font-semibold text-slate-950 dark:text-white mb-2">Collaborative Growth</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-300">Learn via mentorship & sharing</p>
                    </CardContent>
                  </Card>

                  <Card className="glass-panel border border-slate-200/70 dark:border-slate-800/70 rounded-2xl">
                    <CardContent className="p-6 text-center">
                      <Target size={24} className="text-sky-700 dark:text-sky-300 mx-auto mb-3" />
                      <h4 className="font-semibold text-slate-950 dark:text-white mb-2">Practical Application</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-300">Turn theory into shipped work</p>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default EducationPage;
