import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Calendar, User, Code, ExternalLink, Github, Play } from 'lucide-react';
import { portfolioData } from '../data/portfolio';
import SEO from '../components/SEO';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { fadeUpItem, hoverLift, scaleInItem, staggerContainer, TRANSITION } from '../lib/motion';

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
  const { projects } = portfolioData;
  const shouldReduceMotion = useReducedMotion();
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [showMoreTech, setShowMoreTech] = useState<string | null>(null);
  const [showMoreResponsibilities, setShowMoreResponsibilities] = useState<string | null>(null);

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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 pt-20 pb-16">
      <SEO
        title="Projects"
        description={`Projects by ${portfolioData.personalInfo.name}: full-stack and backend work with Node.js, TypeScript, React, AWS, and more.`}
      />
      <div className="container-width">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Hero Section */}
          <motion.div variants={itemVariants} className="text-center mb-20">
            <motion.div
              initial={{ scale: shouldReduceMotion ? 1 : 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={shouldReduceMotion ? { duration: 0 } : TRANSITION.base}
              className="mb-8"
            >
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg mb-6">
                <Code size={32} className="text-white" />
              </div>
            </motion.div>
            
            <motion.h1 
              className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-white dark:via-gray-100 dark:to-white bg-clip-text text-transparent mb-6"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={shouldReduceMotion ? { duration: 0 } : { ...TRANSITION.slow, delay: 0.08 }}
            >
              Project Portfolio
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={shouldReduceMotion ? { duration: 0 } : { ...TRANSITION.slow, delay: 0.16 }}
            >
              Showcasing <span className="font-semibold text-blue-600 dark:text-blue-400">innovative solutions</span> and technical excellence across diverse domains
            </motion.p>
            
            {/* Project Summary */}
            <motion.div 
              className="flex flex-wrap justify-center gap-8 mt-12"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={shouldReduceMotion ? { duration: 0 } : { ...TRANSITION.slow, delay: 0.24 }}
            >
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{projects.length}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Projects</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 dark:text-green-400">{allTechnologies.length}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Technologies</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">~2</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Years</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600 dark:text-orange-400">100%</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Passion</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Filter Buttons - Enhanced */}
          <motion.div variants={itemVariants} className="mb-16">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Filter by Technology
              </h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Explore projects built with specific technologies and frameworks
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
              {filters.map((filter) => (
                <motion.div key={filter} {...hoverLift(shouldReduceMotion)}>
                  <Button
                    onClick={() => setSelectedFilter(filter)}
                    variant={selectedFilter === filter ? 'default' : 'outline'}
                    className="h-12 rounded-2xl px-6 shadow-lg"
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
                className="text-center mt-6"
              >
                <div className="inline-flex items-center space-x-2 bg-blue-50 dark:bg-blue-900/20 px-4 py-2 rounded-full border border-blue-200 dark:border-blue-700">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
                    Showing {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''} with {selectedFilter}
                  </span>
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Projects Grid - Enhanced */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.18 }}
          >
            {filteredProjects.map((project) => (
              <motion.div
                key={project.name}
                variants={cardVariants}
                {...hoverLift(shouldReduceMotion)}
                className="h-full"
              >
                <Card className="relative overflow-hidden group hover:shadow-2xl transition-all duration-500 flex flex-col h-full p-6 bg-white dark:bg-gray-800">
                  {/* Background Pattern */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 rounded-full -translate-y-32 translate-x-32 opacity-60 group-hover:scale-125 transition-transform duration-500"></div>

                  <div className="relative z-10 flex flex-col h-full">
                  {/* Project Header */}
                  <div className="relative h-52 md:h-66 rounded-2xl overflow-hidden mb-6 flex-shrink-0 shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                    {project.liveDemo && project.liveDemo.includes('youtube.com') ? (
                      // YouTube embedded video
                      <div className="relative w-full h-full">
                        <iframe
                          src={`https://www.youtube.com/embed/${project.liveDemo.split('watch?v=')[1]?.split('&')[0]}?start=${project.liveDemo.includes('t=') ? project.liveDemo.split('t=')[1]?.split('s')[0] || '0' : '0'}`}
                          title={`${project.name} Demo`}
                          className="w-full h-full rounded-2xl"
                          frameBorder="0"
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
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end rounded-2xl p-4">
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
                      <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white leading-tight">
                        {project.name}
                      </h3>
                    </div>
                  )}

                  {/* Project Details - Using flex-grow to expand */}
                  <div className="flex flex-col flex-grow space-y-4">
                    {/* Meta Information */}
                    <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 flex-shrink-0">
                      <div className="flex items-center space-x-2">
                        <Calendar size={16} className="text-blue-500" />
                        <span className="font-medium">{project.period}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <User size={16} className="text-purple-500" />
                        <span className="font-medium text-purple-600 dark:text-purple-400">{project.role}</span>
                      </div>
                    </div>

                    {/* Technologies - Enhanced with Tooltip */}
                    <div className="flex-shrink-0">
                      <div className="flex items-center space-x-2 mb-4">
                        <Code size={18} className="text-blue-600 dark:text-blue-400" />
                        <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                          Tech Stack
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.slice(0, 6).map((tech) => (
                          <Badge
                            key={tech}
                            variant="sky"
                            className="rounded-xl px-3 py-1.5 text-xs font-medium normal-case hover:scale-105 transition-transform duration-200"
                          >
                            {tech}
                          </Badge>
                        ))}
                        {project.technologies.length > 6 && (
                          <div className="relative group">
                            <Badge
                              className="rounded-xl px-3 py-1.5 text-xs font-medium normal-case cursor-pointer hover:scale-105 transition-transform duration-200"
                              onMouseEnter={() => setShowMoreTech(project.name)}
                              onMouseLeave={() => setShowMoreTech(null)}
                            >
                              +{project.technologies.length - 6} more
                            </Badge>
                            
                            {/* Tooltip for additional technologies */}
                            {showMoreTech === project.name && (
                              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 z-50">
                                <div className="bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 px-4 py-3 rounded-2xl shadow-2xl border max-w-xs">
                                  <div className="text-xs font-semibold mb-2 text-center">Additional Technologies:</div>
                                  <div className="flex flex-wrap gap-1.5">
                                    {project.technologies.slice(6).map((tech) => (
                                      <span key={tech} className="px-2 py-1 bg-white/20 dark:bg-gray-800/20 rounded-lg text-xs font-medium">
                                        {tech}
                                      </span>
                                    ))}
                                  </div>
                                  {/* Arrow */}
                                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900 dark:border-t-gray-100"></div>
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Responsibilities - Enhanced with Expandable Content */}
                    <div className="flex-grow">
                      <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
                        <span className="w-3 h-3 bg-gradient-to-r from-green-500 to-blue-500 rounded-full mr-3"></span>
                        Key Achievements
                      </h4>
                      <div className="bg-gradient-to-br from-gray-50 to-blue-50/50 dark:from-gray-700/50 dark:to-blue-900/20 rounded-2xl p-4 border border-gray-200 dark:border-gray-600">
                        <div className="space-y-3">
                          {project.responsibilities.slice(0, 3).map((responsibility, idx) => (
                            <div
                              key={idx}
                              className="text-sm text-gray-700 dark:text-gray-300 flex items-start space-x-3 leading-relaxed"
                            >
                              <span className="text-green-500 mt-1.5 w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></span>
                              <span className="flex-1 font-medium">{responsibility}</span>
                            </div>
                          ))}
                          
                          {/* Expandable section for additional responsibilities */}
                          {project.responsibilities.length > 3 && (
                            <div className="relative">
                              {showMoreResponsibilities === project.name && (
                                <div className="space-y-3 mt-3 pt-3 border-t border-gray-300 dark:border-gray-600">
                                  {project.responsibilities.slice(3).map((responsibility, idx) => (
                                    <div
                                      key={idx + 3}
                                      className="text-sm text-gray-700 dark:text-gray-300 flex items-start space-x-3 leading-relaxed animate-fade-in"
                                    >
                                      <span className="text-green-500 mt-1.5 w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></span>
                                      <span className="flex-1 font-medium">{responsibility}</span>
                                    </div>
                                  ))}
                                </div>
                              )}
                              
                              <button
                                onClick={() => setShowMoreResponsibilities(
                                  showMoreResponsibilities === project.name ? null : project.name
                                )}
                                className="mt-3"
                              >
                                <Button variant="link" size="sm" className="h-auto p-0 text-xs">
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
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons - Enhanced */}
                    <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-gray-200 dark:border-gray-700 flex-shrink-0 mt-auto">
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
                          <Button disabled className="w-full rounded-2xl h-12 flex-1 bg-gray-400 text-white hover:bg-gray-400">
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
                  </div>
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
                <div className="w-20 h-20 bg-gradient-to-br from-gray-400 to-gray-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Code size={32} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  No Projects Found
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
                  No projects found for <span className="font-semibold text-blue-600 dark:text-blue-400">{selectedFilter}</span>. 
                  Try selecting a different technology filter.
                </p>
                <button
                  onClick={() => setSelectedFilter('All')}
                  className="mt-6"
                >
                  <Button className="rounded-2xl h-12 px-6">Show All Projects</Button>
                </button>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default ProjectsPage;
