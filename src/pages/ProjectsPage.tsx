import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Calendar, User, Code, ExternalLink, Github, Play } from 'lucide-react';
import { portfolioData } from '../data/portfolio';
import SEO from '../components/SEO';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { fadeUpItem, hoverLift, scaleInItem, staggerContainer, TRANSITION } from '../lib/motion';
import { calculateExperienceYears } from '../lib/experience';

// Normalize technology labels to avoid duplicates (e.g., React.js vs React)
const normalizeTech = (tech: string): string => {
  const t = tech.trim().toLowerCase();
  switch (t) {
    case 'react.js':
    case 'react':
      return 'React';
    case 'tailwind css':
    case 'tailwindcss':
      return 'Tailwind CSS';
    case 'vitejs':
    case 'vite':
      return 'Vite';
    case 'material-ui':
    case 'mui':
      return 'MUI';
    case 'styled-components':
    case 'styled components':
      return 'Styled Components';
    case 'node.js':
    case 'nodejs':
      return 'Node.js';
    case 'react query':
    case 'tanstack query':
      return 'React Query';
    default:
      return tech; // keep original label when no mapping
  }
};

const ProjectsPage: React.FC = () => {
  const { projects, workExperience } = portfolioData;
  const shouldReduceMotion = useReducedMotion();
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [showMoreTech, setShowMoreTech] = useState<string | null>(null);
  const [showMoreResponsibilities, setShowMoreResponsibilities] = useState<string | null>(null);

  const experienceYears = calculateExperienceYears(workExperience);
  const yearsStat = experienceYears ? String(experienceYears) : '—';

  // Extract unique normalized technologies for filtering and counting
  const allTechnologies = Array.from(
    new Set(
      projects.flatMap(project => project.technologies.map(normalizeTech))
    )
  );
  const filters = ['All', ...allTechnologies.slice(0, 8)]; // Show first 8 technologies

  const filteredProjects = selectedFilter === 'All'
    ? projects
    : projects.filter(project => project.technologies.map(normalizeTech).includes(selectedFilter));

  const containerVariants = staggerContainer(shouldReduceMotion, { stagger: 0.06, delay: 0.08 });
  const itemVariants = fadeUpItem(shouldReduceMotion, 10);
  const cardVariants = scaleInItem(shouldReduceMotion, 0.985);

  return (
    <div className="bg-linear-to-br from-slate-50/70 via-white/60 to-blue-50/70 dark:from-gray-950/80 dark:via-gray-900/70 dark:to-slate-900/80 py-20 sm:py-24 overflow-hidden">
      <SEO
        title="Projects"
        description={`Projects by ${portfolioData.personalInfo.name}: full-stack and backend work with Node.js, TypeScript, React, AWS, and more.`}
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
                  <Code size={32} className="text-sky-700 dark:text-sky-300" />
                </div>
              </div>
            </motion.div>
            
            <motion.h1 
              className="text-4xl md:text-6xl font-bold text-slate-950 dark:text-white mb-4"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={shouldReduceMotion ? { duration: 0 } : { ...TRANSITION.slow, delay: 0.08 }}
            >
              Project{' '}
                Portfolio
          
            </motion.h1>
            
            <motion.p 
              className="text-lg md:text-2xl text-slate-700 dark:text-slate-200 max-w-4xl mx-auto leading-relaxed"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={shouldReduceMotion ? { duration: 0 } : { ...TRANSITION.slow, delay: 0.16 }}
            >
              A selection of shipped work, spanning full-stack products and backend systems.
            </motion.p>
            
            {/* Project Summary */}
            <motion.div 
              className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-10 max-w-4xl mx-auto"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={shouldReduceMotion ? { duration: 0 } : { ...TRANSITION.slow, delay: 0.24 }}
            >
              <Card className="glass-panel border border-slate-200/70 dark:border-slate-800/70 rounded-2xl">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-slate-950 dark:text-white">{projects.length}</div>
                  <div className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Projects</div>
                </CardContent>
              </Card>
              <Card className="glass-panel border border-slate-200/70 dark:border-slate-800/70 rounded-2xl">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-slate-950 dark:text-white">{allTechnologies.length}</div>
                  <div className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Technologies</div>
                </CardContent>
              </Card>
              <Card className="glass-panel border border-slate-200/70 dark:border-slate-800/70 rounded-2xl">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-slate-950 dark:text-white">{yearsStat}</div>
                  <div className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Years</div>
                </CardContent>
              </Card>
              <Card className="glass-panel border border-slate-200/70 dark:border-slate-800/70 rounded-2xl">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-slate-950 dark:text-white">100%</div>
                  <div className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Ownership</div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          {/* Filter Buttons - Enhanced */}
          <motion.div variants={itemVariants} className="mb-12">
            <div className="text-center mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-950 dark:text-white mb-2">
                Filter by Technology
              </h2>
              <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
                Pick a stack to see the most relevant work.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-2 max-w-4xl mx-auto">
              {filters.map((filter) => (
                <motion.div key={filter} {...hoverLift(shouldReduceMotion)}>
                  <Button
                    onClick={() => setSelectedFilter(filter)}
                    variant={selectedFilter === filter ? 'default' : 'outline'}
                    className="h-11 rounded-full px-5"
                  >
                    {filter}
                  </Button>
                </motion.div>
              ))}
            </div>
            
            {/* Active Filter Indicator */}
            {selectedFilter !== 'All' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={shouldReduceMotion ? { duration: 0 } : TRANSITION.base}
                className="text-center mt-5"
              >
                <Badge variant="sky" className="rounded-full px-4 py-2">
                  Showing {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''} with {selectedFilter}
                </Badge>
              </motion.div>
            )}
          </motion.div>

          {/* Projects Grid - Enhanced */}
          <motion.div
            key={selectedFilter}
            variants={containerVariants}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
            initial="hidden"
            animate="visible"
          >
            {filteredProjects.map((project) => (
              <motion.div
                key={project.name}
                variants={cardVariants}
                {...hoverLift(shouldReduceMotion)}
                className="h-full"
              >
                <Card className="relative overflow-hidden group transition-all duration-300 flex flex-col h-full border border-slate-200/70 dark:border-slate-800/70">
                  <div aria-hidden="true" className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-(--brand-hero) blur-3xl opacity-10 group-hover:opacity-15 transition-opacity" />

                  <CardContent className="relative z-10 flex flex-col h-full p-6">
                  {/* Project Header */}
                  <div className="relative h-52 md:h-66 rounded-2xl overflow-hidden mb-6 shrink-0 shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                    {project.liveDemo && project.liveDemo.includes('youtube.com') ? (
                      // YouTube embedded video
                      <div className="relative w-full h-full">
                        <iframe
                          src={`https://www.youtube-nocookie.com/embed/${project.liveDemo.split('watch?v=')[1]?.split('&')[0]}?start=${project.liveDemo.includes('t=') ? project.liveDemo.split('t=')[1]?.split('s')[0] || '0' : '0'}`}
                          title={`${project.name} Demo`}
                          className="w-full h-full rounded-2xl"
                          frameBorder="0"
                          loading="lazy"
                          referrerPolicy="strict-origin-when-cross-origin"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </div>
                    ) : (
                      // Regular project image
                      <>
                        <img
                          src={project.image || 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=400&fit=crop'}
                          alt={project.name}
                          className="w-full h-full object-contain rounded-2xl group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent flex items-end rounded-2xl p-4">
                          <h3 className="text-white text-lg md:text-xl font-bold leading-tight">
                            {project.name}
                          </h3>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Project Title - Now outside video area for YouTube projects */}
                  {project.liveDemo && project.liveDemo.includes('youtube.com') && (
                    <div className="mb-4">
                      <h3 className="text-xl md:text-2xl font-bold text-slate-950 dark:text-white leading-tight">
                        {project.name}
                      </h3>
                    </div>
                  )}

                  {/* Project Details - Using grow to expand */}
                  <div className="flex flex-col grow space-y-4">
                    {/* Meta Information */}
                    <div className="flex items-center justify-between text-sm text-slate-600 dark:text-slate-300 shrink-0">
                      <div className="flex items-center space-x-2">
                        <Calendar size={16} className="text-sky-600 dark:text-sky-300" />
                        <span className="font-medium">{project.period}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <User size={16} className="text-sky-600 dark:text-sky-300" />
                        <span className="font-semibold text-slate-800 dark:text-slate-100">{project.role}</span>
                      </div>
                    </div>

                    {/* Technologies - Enhanced with Tooltip */}
                    <div className="shrink-0">
                      <div className="flex items-center space-x-2 mb-4">
                        <Code size={18} className="text-sky-700 dark:text-sky-300" />
                        <span className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                          Tech Stack
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.slice(0, 6).map((tech) => (
                          <Badge
                            key={tech}
                            variant="sky"
                            className="rounded-full px-3 py-1.5 text-xs font-medium normal-case"
                          >
                            {tech}
                          </Badge>
                        ))}
                        {project.technologies.length > 6 && (
                          <div className="relative group">
                            <Badge
                              className="rounded-full px-3 py-1.5 text-xs font-medium normal-case cursor-pointer"
                              onMouseEnter={() => setShowMoreTech(project.name)}
                              onMouseLeave={() => setShowMoreTech(null)}
                            >
                              +{project.technologies.length - 6} more
                            </Badge>
                            
                            {/* Tooltip for additional technologies */}
                            {showMoreTech === project.name && (
                              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 z-50">
                                <div className="bg-slate-950 text-white px-4 py-3 rounded-2xl shadow-2xl border border-slate-800 max-w-xs">
                                  <div className="text-xs font-semibold mb-2 text-center">Additional technologies</div>
                                  <div className="flex flex-wrap gap-1.5">
                                    {project.technologies.slice(6).map((tech) => (
                                      <span key={tech} className="px-2 py-1 bg-white/10 rounded-lg text-xs font-medium">
                                        {tech}
                                      </span>
                                    ))}
                                  </div>
                                  {/* Arrow */}
                                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-950"></div>
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Responsibilities - Enhanced with Expandable Content */}
                    <div className="grow">
                      <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-100 mb-4 flex items-center">
                        <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full mr-3"></span>
                        Key Achievements
                      </h4>
                      <div className="bg-white/60 dark:bg-slate-950/40 rounded-2xl p-4 border border-slate-200/70 dark:border-slate-800/70">
                        <div className="space-y-3">
                          {project.responsibilities.slice(0, 3).map((responsibility, idx) => (
                            <div
                              key={idx}
                              className="text-sm text-slate-700 dark:text-slate-200 flex items-start space-x-3 leading-relaxed"
                            >
                              <span className="mt-1.5 w-2 h-2 bg-emerald-500 rounded-full shrink-0"></span>
                              <span className="flex-1 font-medium">{responsibility}</span>
                            </div>
                          ))}
                          
                          {/* Expandable section for additional responsibilities */}
                          {project.responsibilities.length > 3 && (
                            <div className="relative">
                              {showMoreResponsibilities === project.name && (
                                <div className="space-y-3 mt-3 pt-3 border-t border-slate-200 dark:border-slate-800">
                                  {project.responsibilities.slice(3).map((responsibility, idx) => (
                                    <div
                                      key={idx + 3}
                                      className="text-sm text-slate-700 dark:text-slate-200 flex items-start space-x-3 leading-relaxed"
                                    >
                                      <span className="mt-1.5 w-2 h-2 bg-emerald-500 rounded-full shrink-0"></span>
                                      <span className="flex-1 font-medium">{responsibility}</span>
                                    </div>
                                  ))}
                                </div>
                              )}
                              
                              <div className="mt-3">
                                <Button
                                  variant="link"
                                  size="sm"
                                  className="h-auto p-0 text-xs"
                                  onClick={() =>
                                    setShowMoreResponsibilities(
                                      showMoreResponsibilities === project.name ? null : project.name
                                    )
                                  }
                                >
                                  <span>
                                    {showMoreResponsibilities === project.name
                                      ? 'Show less'
                                      : `+${project.responsibilities.length - 3} more achievements`}
                                  </span>
                                  <span
                                    className={`transform transition-transform duration-200 ${
                                      showMoreResponsibilities === project.name ? 'rotate-180' : ''
                                    }`}
                                  >
                                    ▼
                                  </span>
                                </Button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons - Enhanced */}
                    <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-gray-200 dark:border-gray-700 shrink-0 mt-auto">
                      <div className="flex flex-1 gap-3">
                        {project.liveDemo && !project.liveDemo.includes('youtube.com') ? (
                          <motion.div className="flex-1" {...hoverLift(shouldReduceMotion)}>
                            <Button asChild className="w-full rounded-2xl h-12">
                              <a href={project.liveDemo} target="_blank" rel="noopener noreferrer">
                                <ExternalLink size={16} />
                                <span>Live Demo</span>
                              </a>
                            </Button>
                          </motion.div>
                        ) : !project.liveDemo ? (
                          <Button disabled className="w-full rounded-2xl h-12 flex-1">
                            <ExternalLink size={16} />
                            <span>Coming Soon</span>
                          </Button>
                        ) : (
                          <Button variant="secondary" className="w-full rounded-2xl h-12 flex-1">
                            <Play size={16} />
                            <span>Video Demo</span>
                          </Button>
                        )}
                        
                        {project.github ? (
                          <motion.div className="flex-1" {...hoverLift(shouldReduceMotion)}>
                            <Button asChild variant="secondary" className="w-full rounded-2xl h-12">
                              <a href={project.github} target="_blank" rel="noopener noreferrer">
                                <Github size={16} />
                                <span>Code</span>
                              </a>
                            </Button>
                          </motion.div>
                        ) : (
                          <Button disabled variant="secondary" className="w-full rounded-2xl h-12 flex-1">
                            <Github size={16} />
                            <span>Private</span>
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* No Projects Message - Enhanced */}
          {filteredProjects.length === 0 && (
            <motion.div
              variants={itemVariants}
              className="text-center py-20"
            >
              <div className="max-w-md mx-auto">
                <div className="w-20 h-20 bg-white/80 dark:bg-slate-950/60 border border-slate-200/70 dark:border-slate-800/70 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Code size={32} className="text-sky-700 dark:text-sky-300" />
                </div>
                <h3 className="text-xl font-bold text-slate-950 dark:text-white mb-3">
                  No Projects Found
                </h3>
                <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed">
                  No projects found for <span className="font-semibold text-sky-700 dark:text-sky-300">{selectedFilter}</span>. 
                  Try selecting a different technology filter.
                </p>
                <div className="mt-6">
                  <Button
                    className="rounded-full h-11 px-6"
                    onClick={() => setSelectedFilter('All')}
                  >
                    Show All Projects
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default ProjectsPage;
