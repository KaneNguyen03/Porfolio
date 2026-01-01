import { motion, useReducedMotion } from 'framer-motion';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import avatarImage from '../assets/ava.jpg';
import cvFile from '../assets/Nguyen_Xuan_Kha_Fullstack_CV.pdf';
import { portfolioData } from '../data/portfolio';
import { ArrowRight, Briefcase, ChevronDown, Download, Github, Linkedin, Mail, MapPin, Star } from 'lucide-react';
import SEO from '../components/SEO';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Card } from '../components/ui/card';
import { fadeUpItem, hoverLift, staggerContainer, TRANSITION } from '../lib/motion';
import { calculateExperienceYears } from '../lib/experience';

const HomePage: React.FC = () => {
  const { personalInfo, projects, workExperience } = portfolioData;
  const navigate = useNavigate();
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = staggerContainer(shouldReduceMotion, { stagger: 0.08, delay: 0.08 });
  const itemVariants = fadeUpItem(shouldReduceMotion, 12);

  const socialLinks = [
    { icon: Github, url: personalInfo.github, label: 'GitHub' },
    { icon: Linkedin, url: personalInfo.linkedin, label: 'LinkedIn' },
    { icon: Mail, url: `mailto:${personalInfo.email}`, label: 'Email' }
  ];

  const githubHandle = (() => {
    const url = personalInfo.github?.trim();
    if (!url) return null;
    const parts = url.split('/').filter(Boolean);
    const githubUsername = parts[parts.length - 1];
    return githubUsername || null;
  })();

  const experienceYears = calculateExperienceYears(workExperience);

  const projectCount = projects?.length ?? 0;
  const currentRole = workExperience?.[0];

  const highlights = [
    { label: 'Experience', value: experienceYears ? `${experienceYears} years` : 'Shipping Node.js & React' },
    { label: 'Projects', value: projectCount ? `${projectCount}+ shipped` : 'Product-focused builds' },
    { label: 'Focus', value: 'API-first, event-driven' }
  ];

  return (
    <div className="bg-gradient-to-br from-slate-50/70 via-white/60 to-blue-50/70 dark:from-gray-950/80 dark:via-gray-900/70 dark:to-slate-900/80 py-20 sm:py-24 overflow-hidden">
      <SEO
        title="Home"
        description={personalInfo.objective}
      />
      <div className="min-h-screen flex items-center justify-center relative">
        {/* Subtle hero spotlight (lets the global brand backdrop feel intentional) */}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[var(--brand-hero)] blur-[110px] opacity-20 dark:opacity-10"
          animate={
            shouldReduceMotion
              ? undefined
              : { x: ['-50%', '-48%', '-50%'], y: [0, 10, 0], scale: [1, 1.03, 1] }
          }
          transition={
            shouldReduceMotion
              ? { duration: 0 }
              : { duration: 10, repeat: Infinity, ease: 'easeInOut' }
          }
          style={{ translateX: '-50%' }}
        />

        <div className="container-width">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-6xl mx-auto"
          >
            {/* Hero */}
            <motion.div variants={itemVariants} className="mb-12 sm:mb-16">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
                {/* Left: Avatar + credibility */}
                <div className="lg:col-span-5 text-center lg:text-left">
                  <motion.div
                    initial={{ scale: shouldReduceMotion ? 1 : 0.96, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={shouldReduceMotion ? { duration: 0 } : TRANSITION.base}
                    className="relative mb-7"
                  >
                    <div className="relative inline-block">
                      <motion.div
                        className="absolute -inset-4 bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 rounded-full opacity-75 blur-lg"
                        animate={
                          shouldReduceMotion
                            ? undefined
                            : { opacity: [0.55, 0.8, 0.55], scale: [0.98, 1.02, 0.98] }
                        }
                        transition={
                          shouldReduceMotion
                            ? { duration: 0 }
                            : { duration: 4.5, repeat: Infinity, ease: 'easeInOut' }
                        }
                      />
                      <div className="relative w-40 h-40 sm:w-44 sm:h-44 mx-auto lg:mx-0">
                        <img
                          src={avatarImage}
                          alt={personalInfo.name}
                          className="w-full h-full rounded-full object-cover shadow-2xl border-4 border-white dark:border-gray-700"
                        />
                        <motion.div
                          className="absolute bottom-4 right-4 w-6 h-6 bg-green-500 rounded-full border-4 border-white dark:border-gray-700"
                          animate={shouldReduceMotion ? undefined : { scale: [1, 1.15, 1] }}
                          transition={
                            shouldReduceMotion
                              ? { duration: 0 }
                              : { duration: 2.2, repeat: Infinity, ease: 'easeInOut' }
                          }
                        />
                      </div>
                      <motion.div
                        className="absolute -top-2 -right-2 w-8 h-8 bg-blue-500 rounded-lg opacity-80"
                        animate={shouldReduceMotion ? undefined : { y: [0, -8, 0] }}
                        transition={
                          shouldReduceMotion
                            ? { duration: 0 }
                            : { duration: 3.2, repeat: Infinity, ease: 'easeInOut' }
                        }
                      />
                      <motion.div
                        className="absolute -bottom-2 -left-2 w-6 h-6 bg-purple-500 rounded-full opacity-80"
                        animate={shouldReduceMotion ? undefined : { y: [0, 8, 0] }}
                        transition={
                          shouldReduceMotion
                            ? { duration: 0 }
                            : { duration: 3.6, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }
                        }
                      />
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={shouldReduceMotion ? { duration: 0 } : { ...TRANSITION.base, delay: 0.02 }}
                    className="flex flex-wrap justify-center lg:justify-start gap-2 mb-6"
                  >
                    <Badge className="rounded-full px-4 py-2">Full-stack • Backend</Badge>
                    {githubHandle && (
                      <Badge variant="sky" className="rounded-full px-4 py-2">
                        @{githubHandle}
                      </Badge>
                    )}
                    <Badge variant="emerald" className="rounded-full px-4 py-2">Open to Junior/Middle roles</Badge>
                  </motion.div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-3">
                    {highlights.map((item) => (
                      <Card
                        key={item.label}
                        className="glass-panel border border-gray-200 dark:border-gray-800 rounded-2xl px-4 py-3"
                      >
                        <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                          {item.label}
                        </p>
                        <p className="text-base font-semibold text-gray-900 dark:text-white truncate">
                          {item.value}
                        </p>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Right: Headline + bio + CTAs */}
                <div className="lg:col-span-7 text-center lg:text-left">
                  <motion.h1
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={shouldReduceMotion ? { duration: 0 } : { ...TRANSITION.slow, delay: 0.05 }}
                    className="text-4xl md:text-6xl font-bold bg-[var(--brand-hero)] bg-clip-text text-transparent mb-4"
                  >
                    {personalInfo.name}
                  </motion.h1>

                  <motion.h2
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={shouldReduceMotion ? { duration: 0 } : { ...TRANSITION.slow, delay: 0.12 }}
                    className="text-xl md:text-3xl font-semibold text-blue-700 dark:text-blue-300 mb-5"
                  >
                    {personalInfo.title} @ Bizzi • Open to Junior/Middle roles
                  </motion.h2>

                  <motion.div
                    initial={{ y: 16, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={shouldReduceMotion ? { duration: 0 } : { ...TRANSITION.slow, delay: 0.18 }}
                    className="flex justify-center lg:justify-start"
                  >
                    <motion.div {...hoverLift(shouldReduceMotion)}>
                      <Card className="px-5 py-3 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 inline-flex items-center space-x-2">
                        <MapPin size={18} className="text-red-500" />
                        <span className="text-sm sm:text-base font-medium text-gray-700 dark:text-gray-300">{personalInfo.location}</span>
                      </Card>
                    </motion.div>
                  </motion.div>

                  <motion.p
                    initial={{ y: 16, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={shouldReduceMotion ? { duration: 0 } : { ...TRANSITION.slow, delay: 0.24 }}
                    className="text-left lg:text-left text-lg md:text-xl text-gray-700 dark:text-gray-200 leading-relaxed max-w-3xl mx-auto lg:mx-0 mt-6"
                  >
                    {personalInfo.objective}
                  </motion.p>

                  <motion.div
                    initial={{ y: 18, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={shouldReduceMotion ? { duration: 0 } : { ...TRANSITION.slow, delay: 0.32 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mt-8"
                  >
                    <motion.div {...hoverLift(shouldReduceMotion)}>
                      <Button asChild size="lg" className="h-12 rounded-2xl px-8 group shadow-lg shadow-sky-500/20 hover:shadow-sky-500/30">
                        <Link to="/projects">
                          <Briefcase size={20} />
                          <span>View My Work</span>
                          <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-200" />
                        </Link>
                      </Button>
                    </motion.div>

                    <motion.div {...hoverLift(shouldReduceMotion)}>
                      <Button asChild size="lg" variant="outline" className="h-12 rounded-2xl px-8">
                        <Link to="/contact">
                          <Mail size={20} />
                          <span>Get In Touch</span>
                        </Link>
                      </Button>
                    </motion.div>

                    <motion.div {...hoverLift(shouldReduceMotion)}>
                      <Button asChild size="lg" variant="outline" className="h-12 rounded-2xl px-8">
                        <a href={cvFile} download="Nguyen_Xuan_Kha_Fullstack_CV.pdf">
                          <Download size={20} />
                          <span>Download CV</span>
                        </a>
                      </Button>
                    </motion.div>
                  </motion.div>

                  <motion.div
                    initial={{ y: 14, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={shouldReduceMotion ? { duration: 0 } : { ...TRANSITION.slow, delay: 0.38 }}
                    className="flex justify-center lg:justify-start gap-4 mt-8"
                  >
                    {socialLinks.map((social) => {
                      const IconComponent = social.icon;
                      return (
                        <motion.a
                          key={social.label}
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={shouldReduceMotion ? undefined : { y: -2, scale: 1.06 }}
                          whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
                          transition={TRANSITION.fast}
                          className="group relative"
                          aria-label={social.label}
                        >
                          <Button
                            variant="outline"
                            size="icon"
                            className="w-14 h-14 rounded-2xl shadow-lg border-gray-200 dark:border-gray-700 group-hover:shadow-xl group-hover:border-blue-300 dark:group-hover:border-blue-600"
                          >
                            <IconComponent
                              size={26}
                              className="text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200"
                            />
                          </Button>

                          <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                            <div className="bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 px-3 py-1 rounded-lg text-sm font-medium whitespace-nowrap">
                              {social.label}
                              <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-b-2 border-transparent border-b-gray-900 dark:border-b-gray-100"></div>
                            </div>
                          </div>
                        </motion.a>
                      );
                    })}
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* Opportunity + Strengths */}
            <motion.div variants={itemVariants} className="mb-14">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Card className="glass-panel border border-blue-100 dark:border-gray-800 rounded-2xl p-4 text-left">
                  <Badge className="mb-3 w-fit">Now</Badge>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{currentRole?.period ?? 'Present'}</p>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">
                    {currentRole ? `${currentRole.position} @ ${currentRole.company}` : 'Open to opportunities'}
                  </p>
                </Card>
                <Card className="glass-panel border border-blue-100 dark:border-gray-800 rounded-2xl p-4 text-left">
                  <Badge className="mb-3 w-fit">Proof</Badge>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Hands-on delivery across teams</p>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">
                    {experienceYears ? `${experienceYears} years experience` : 'Product shipping'}
                  </p>
                </Card>
                <Card className="glass-panel border border-blue-100 dark:border-gray-800 rounded-2xl p-4 text-left">
                  <Badge className="mb-3 w-fit">Portfolio</Badge>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Projects & case studies</p>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">{projectCount}+ projects</p>
                </Card>
              </div>
            </motion.div>



            {/* Professional Summary */}
            <motion.div variants={itemVariants}>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={shouldReduceMotion ? { duration: 0 } : { ...TRANSITION.slow, delay: 0.55 }}
                className="max-w-4xl mx-auto"
              >
                <Card className="rounded-3xl shadow-xl p-8 border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
                      <Star size={24} className="text-white" />
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 text-center">
                    Let’s build reliable products together
                  </h3>

                  <p className="text-gray-600 dark:text-gray-400 text-center leading-relaxed">
                    I enjoy turning complex workflows into clean, scalable systems — with strong APIs, great UX,
                    and pragmatic performance wins.
                  </p>

                  <div className="mt-6 flex justify-center">
                    <Button asChild variant="link" className="h-auto p-0">
                      <Link to="/about">
                        <span>Learn more about me</span>
                        <ArrowRight size={16} />
                      </Link>
                    </Button>
                  </div>
                </Card>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
