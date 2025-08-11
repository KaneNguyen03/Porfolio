import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Calendar, Award, ExternalLink, BookOpen, Target, TrendingUp, Users } from 'lucide-react';
import { portfolioData } from '../data/portfolio';

const EducationPage: React.FC = () => {
  const { education, certifications } = portfolioData;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8 }
    }
  };

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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 pt-20 pb-16">
      <div className="container-width">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Hero Section */}
          <motion.div variants={itemVariants} className="text-center mb-20">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-500 to-blue-600 rounded-2xl shadow-lg mb-6">
                <GraduationCap size={32} className="text-white" />
              </div>
            </motion.div>
            
            <motion.h1 
              className="p-2 text-2xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-white dark:via-gray-100 dark:to-white bg-clip-text text-transparent mb-12"
              initial={{ y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Learning Journey
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Building expertise through <span className="font-semibold text-green-600 dark:text-green-400">continuous education</span> and professional development
            </motion.p>
            
            {/* Education Summary */}
            <motion.div 
              className="flex flex-wrap justify-center gap-8 mt-12"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">4</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Years</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 dark:text-green-400">3.21</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">GPA</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600 dark:text-orange-400">6+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Projects</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">{certifications.length}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Certifications</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Academic Education Section - Enhanced */}
          <motion.div variants={itemVariants} className="mb-20">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white text-center mb-4"
              whileInView={{ y: 0, opacity: 1 }}
              initial={{ y: 20, opacity: 0 }}
              transition={{ duration: 0.6 }}
            >
              Academic Foundation
            </motion.h2>
            <motion.p 
              className="text-lg text-gray-600 dark:text-gray-400 text-center mb-16 max-w-2xl mx-auto"
              whileInView={{ y: 0, opacity: 1 }}
              initial={{ y: 20, opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Comprehensive software engineering education with hands-on project experience
            </motion.p>
            
            <div className="max-w-6xl mx-auto">
              {education.map((edu, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  whileHover={{ 
                    y: -8,
                    transition: { duration: 0.3 }
                  }}
                  className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 md:p-12 border border-gray-200 dark:border-gray-700 relative overflow-hidden group hover:shadow-2xl transition-all duration-500 mb-8"
                >
                  {/* Background Pattern */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900/20 dark:to-blue-900/20 rounded-full -translate-y-32 translate-x-32 opacity-60 group-hover:scale-125 transition-transform duration-500"></div>
                  
                  <div className="relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                      {/* University Info */}
                      <div className="lg:col-span-2">
                        <div className="flex items-start space-x-6 mb-6">
                          <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-blue-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300">
                            <GraduationCap size={32} className="text-white" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                              {edu.degree}
                            </h3>
                            <p className="text-xl text-green-600 dark:text-green-400 font-semibold mb-3">
                              {edu.institution}
                            </p>
                            <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                              <Calendar size={18} />
                              <span className="font-medium">{edu.period}</span>
                            </div>
                          </div>
                        </div>
                        
                        {/* Academic Journey */}
                        <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-2xl p-6 border border-green-200 dark:border-green-700">
                          <h4 className="font-semibold text-green-800 dark:text-green-300 mb-3 flex items-center">
                            <BookOpen size={18} className="mr-2" />
                            Academic Highlights
                          </h4>
                          <ul className="space-y-2 text-green-700 dark:text-green-300">
                            <li className="flex items-start space-x-2">
                              <Target size={14} className="text-green-500 mt-1 flex-shrink-0" />
                              <span>Specialized in full-stack web development and software architecture</span>
                            </li>
                            <li className="flex items-start space-x-2">
                              <Target size={14} className="text-green-500 mt-1 flex-shrink-0" />
                              <span>Led multiple capstone projects using modern development methodologies</span>
                            </li>
                            <li className="flex items-start space-x-2">
                              <Target size={14} className="text-green-500 mt-1 flex-shrink-0" />
                              <span>Gained expertise in cloud computing and DevOps practices</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                      
                      {/* Achievements */}
                      <div className="lg:col-span-1">
                        {edu.gpa && (
                          <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-6 border border-blue-200 dark:border-blue-700 mb-6">
                            <div className="text-center">
                              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <Award size={28} className="text-white" />
                              </div>
                              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1">{edu.gpa}</div>
                              <div className="text-sm text-blue-700 dark:text-blue-300 font-medium">Cumulative GPA</div>
                            </div>
                          </div>
                        )}
                        
                        {/* Academic Achievements */}
                        <div className="grid grid-cols-1 gap-4">
                          {academicAchievements.map((achievement, idx) => (
                            <div key={idx} className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                              <div className="text-lg font-bold text-purple-600 dark:text-purple-400">{achievement.metrics}</div>
                              <div className="text-xs text-gray-600 dark:text-gray-400">{achievement.title}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Certifications Section - Enhanced */}
          <motion.div variants={itemVariants} className="mb-20">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white text-center mb-4"
              whileInView={{ y: 0, opacity: 1 }}
              initial={{ y: 20, opacity: 0 }}
              transition={{ duration: 0.6 }}
            >
              Professional Certifications
            </motion.h2>
            <motion.p 
              className="text-lg text-gray-600 dark:text-gray-400 text-center mb-16 max-w-2xl mx-auto"
              whileInView={{ y: 0, opacity: 1 }}
              initial={{ y: 20, opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Validated expertise through industry-recognized certifications
            </motion.p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {certifications.map((cert, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ 
                    y: -8,
                    transition: { duration: 0.3 }
                  }}
                  className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 border border-gray-200 dark:border-gray-700 relative overflow-hidden group hover:shadow-2xl transition-all duration-500"
                >
                  {/* Background Pattern */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 rounded-full -translate-y-16 translate-x-16 opacity-60 group-hover:scale-150 transition-transform duration-500"></div>
                  
                  <div className="relative z-10">
                    {/* Certificate Header */}
                    <div className="text-center mb-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <Award size={28} className="text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 leading-tight group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">
                        {cert.name}
                      </h3>
                    </div>
                    
                    {/* Certificate Info */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-center space-x-2 text-gray-600 dark:text-gray-400">
                        <Calendar size={16} />
                        <span className="font-medium">{cert.date}</span>
                      </div>
                      
                      {/* Validation Badge */}
                      <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-4 border border-green-200 dark:border-green-700">
                        <div className="text-center">
                          <div className="w-2 h-2 bg-green-400 rounded-full mx-auto mb-2 animate-pulse"></div>
                          <span className="text-sm font-medium text-green-700 dark:text-green-300">Verified Credential</span>
                        </div>
                      </div>
                      
                      {/* View Certificate Button */}
                      <a
                        href={cert.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium py-3 px-6 rounded-2xl transition-all duration-200 transform hover:scale-105 group-hover:shadow-lg"
                      >
                        <ExternalLink size={18} />
                        <span>View Certificate</span>
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Learning Philosophy - Enhanced */}
          <motion.div variants={itemVariants}>
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-12 border border-gray-200 dark:border-gray-700 relative overflow-hidden group hover:shadow-2xl transition-all duration-500 max-w-5xl mx-auto">
              {/* Background Pattern */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-green-50 dark:from-blue-900/20 dark:via-purple-900/20 dark:to-green-900/20 opacity-60"></div>
              
              <div className="relative z-10 text-center">
                <div className="flex justify-center mb-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <TrendingUp size={32} className="text-white" />
                  </div>
                </div>
                
                <h3 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                  Lifelong Learning Mindset
                </h3>
                
                <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl mx-auto mb-10">
                  Education is not just about acquiring knowledge—it's about developing the ability to adapt, 
                  innovate, and solve complex problems. My commitment to continuous learning drives me to stay 
                  at the forefront of technology and best practices in software development.
                </p>
                
                {/* Learning Principles */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
                  <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-2xl border border-blue-200 dark:border-blue-700">
                    <BookOpen size={24} className="text-blue-600 dark:text-blue-400 mx-auto mb-3" />
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Knowledge Seeking</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Constantly exploring new technologies and methodologies</p>
                  </div>
                  
                  <div className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 rounded-2xl border border-green-200 dark:border-green-700">
                    <Users size={24} className="text-green-600 dark:text-green-400 mx-auto mb-3" />
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Collaborative Growth</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Learning through mentorship and knowledge sharing</p>
                  </div>
                  
                  <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-900/30 dark:to-violet-900/30 rounded-2xl border border-purple-200 dark:border-purple-700">
                    <Target size={24} className="text-purple-600 dark:text-purple-400 mx-auto mb-3" />
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Practical Application</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Applying theoretical knowledge to real-world challenges</p>
                  </div>
                </div>
                
                {/* Future Learning Goals */}
                <div className="mt-12">
                  <div className="inline-flex items-center space-x-4 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 px-8 py-4 rounded-2xl border border-green-200 dark:border-green-700">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-lg font-medium text-gray-700 dark:text-gray-300">
                      Always evolving, always learning, always growing
                    </span>
                    <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse [animation-delay:0.5s]"></div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default EducationPage;
