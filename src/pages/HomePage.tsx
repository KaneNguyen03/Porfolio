import { motion, useReducedMotion } from 'framer-motion';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import avatarImage from '../assets/ava.jpg';
import cvFile from '../assets/Nguyen_Xuan_Kha_Fullstack_CV.pdf';
import { portfolioData } from '../data/portfolio';
import { ArrowRight, Briefcase, Download, Github, Linkedin, Mail, MapPin, Star } from 'lucide-react';
import SEO from '../components/SEO';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Card } from '../components/ui/card';
import { fadeUpItem, hoverLift, staggerContainer, TRANSITION } from '../lib/motion';

const HomePage: React.FC = () => {
  const { personalInfo } = portfolioData;
  const navigate = useNavigate();
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = staggerContainer(shouldReduceMotion, { stagger: 0.08, delay: 0.08 });
  const itemVariants = fadeUpItem(shouldReduceMotion, 12);

  const socialLinks = [
    { icon: Github, url: personalInfo.github, label: 'GitHub' },
    { icon: Linkedin, url: personalInfo.linkedin, label: 'LinkedIn' },
    { icon: Mail, url: `mailto:${personalInfo.email}`, label: 'Email' }
  ];

  return (
    <div className="bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-gray-950 dark:via-gray-900 dark:to-slate-900 py-24">
      <SEO
        title="Home"
        description={personalInfo.objective}
      />
      <div className="min-h-screen flex items-center justify-center relative">
        <div className="container-width">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center max-w-5xl mx-auto"
          >
            {/* Hero Section */}
            <motion.div variants={itemVariants} className="mb-16">
              {/* Profile Avatar with Enhanced Design */}
              <motion.div
                initial={{ scale: shouldReduceMotion ? 1 : 0.96, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={shouldReduceMotion ? { duration: 0 } : TRANSITION.base}
                className="relative mb-8"
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
                  <div className="relative w-40 h-40 mx-auto">
                    <img
                      src={avatarImage}
                      alt={personalInfo.name}
                      className="w-full h-full rounded-full object-cover shadow-2xl border-4 border-white dark:border-gray-700"
                    />
                    {/* Status indicator */}
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
                  {/* Floating elements */}
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

              {/* Name and Title */}
              <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={shouldReduceMotion ? { duration: 0 } : { ...TRANSITION.slow, delay: 0.05 }}
                className="text-4xl md:text-7xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-white dark:via-gray-100 dark:to-white bg-clip-text text-transparent mb-6"
              >
                {personalInfo.name}
              </motion.h1>

              <motion.h2
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={shouldReduceMotion ? { duration: 0 } : { ...TRANSITION.slow, delay: 0.12 }}
                className="text-2xl md:text-4xl font-semibold text-blue-700 dark:text-blue-300 mb-6"
              >
                Software Engineer @ Bizzi • Open to Junior/Middle roles
              </motion.h2>

              {/* Location with enhanced styling */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={shouldReduceMotion ? { duration: 0 } : { ...TRANSITION.slow, delay: 0.2 }}
                className="inline-flex items-center space-x-2 mb-8"
              >
                <motion.div {...hoverLift(shouldReduceMotion)}>
                  <Card className="px-6 py-3 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 inline-flex items-center space-x-2">
                    <MapPin size={20} className="text-red-500" />
                    <span className="text-lg font-medium text-gray-700 dark:text-gray-300">{personalInfo.location}</span>
                  </Card>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Bio Section */}
            <motion.div variants={itemVariants} className="mb-16">
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={shouldReduceMotion ? { duration: 0 } : { ...TRANSITION.slow, delay: 0.25 }}
                className="text-left px-4 md:text-center text-xl md:text-2xl text-gray-700 dark:text-gray-200 leading-relaxed max-w-4xl mx-auto"
              >
                {personalInfo.objective}
              </motion.p>
            </motion.div>

            {/* Opportunity + Strengths */}
            <motion.div variants={itemVariants} className="mb-14">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Card className="glass-panel border border-blue-100 dark:border-gray-800 rounded-2xl p-4 text-left">
                  <Badge className="mb-3 w-fit">Currently</Badge>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Shipping AP automation features</p>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">Software Engineer @ Bizzi</p>
                </Card>
                <Card className="glass-panel border border-blue-100 dark:border-gray-800 rounded-2xl p-4 text-left">
                  <Badge className="mb-3 w-fit">Target roles</Badge>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Open to backend / full-stack tracks</p>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">Junior → Middle</p>
                </Card>
                <Card className="glass-panel border border-blue-100 dark:border-gray-800 rounded-2xl p-4 text-left">
                  <Badge className="mb-3 w-fit">Stack I love</Badge>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Node.js, React, AWS, SQL/Redis</p>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">API-first, event-driven</p>
                </Card>
              </div>
            </motion.div>


            {/* Action Buttons - Enhanced */}
            <motion.div variants={itemVariants} className="mb-16">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={shouldReduceMotion ? { duration: 0 } : { ...TRANSITION.slow, delay: 0.32 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <motion.div {...hoverLift(shouldReduceMotion)}>
                  <Button asChild className="h-12 rounded-2xl px-8 group">
                    <Link to="/projects">
                      <Briefcase size={20} />
                      <span>View My Work</span>
                      <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-200" />
                    </Link>
                  </Button>
                </motion.div>

                <motion.div {...hoverLift(shouldReduceMotion)}>
                  <Button asChild variant="outline" className="h-12 rounded-2xl px-8">
                    <Link to="/contact">
                      <Mail size={20} />
                      <span>Get In Touch</span>
                    </Link>
                  </Button>
                </motion.div>

                <motion.div {...hoverLift(shouldReduceMotion)}>
                  <Button asChild variant="outline" className="h-12 rounded-2xl px-8">
                    <a href={cvFile} download="Nguyen_Xuan_Kha_Fullstack_CV.pdf">
                      <Download size={20} />
                      <span>Download CV</span>
                    </a>
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Social Links - Enhanced */}
            <motion.div variants={itemVariants} className="mb-16">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={shouldReduceMotion ? { duration: 0 } : { ...TRANSITION.slow, delay: 0.38 }}
                className="flex justify-center space-x-6"
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
                        className="w-16 h-16 rounded-2xl shadow-lg border-gray-200 dark:border-gray-700 group-hover:shadow-xl group-hover:border-blue-300 dark:group-hover:border-blue-600"
                      >
                        <IconComponent
                          size={28}
                          className="text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200"
                        />
                      </Button>
                      
                      {/* Tooltip */}
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
            </motion.div>

            {/* Professional Summary */}
            <motion.div variants={itemVariants}>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.6 }}
                className="max-w-4xl mx-auto"
              >
                <Card className="rounded-3xl shadow-xl p-8 border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
                      <Star size={24} className="text-white" />
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 text-center">
                    Ready to Build Something Amazing?
                  </h3>

                  <p className="text-gray-600 dark:text-gray-400 text-center leading-relaxed">
                    I'm passionate about creating innovative solutions that make a real impact.
                    Whether you're looking to build a new application, enhance an existing system,
                    or explore cutting-edge technologies, I'm here to help bring your vision to life.
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

        {/* Scroll Indicator - Enhanced */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer group"
          onClick={() => navigate('/about')}
        >
          <div className="flex flex-col items-center space-y-2">
            <span className="text-sm text-gray-500 dark:text-gray-400 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              Explore More
            </span>
          </div>
          
        </motion.div>
      </div>
    </div>
  );
};

export default HomePage;
