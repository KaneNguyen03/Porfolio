import React from 'react';
import { motion } from 'framer-motion';
import { Code, Database, Server, Cloud, GitBranch, Award, MapPin, Calendar, Mail } from 'lucide-react';
import { portfolioData } from '../data/portfolio';
import avatarImage from '../assets/ava.jpg';

const AboutPage: React.FC = () => {
  const { personalInfo, skills, awards } = portfolioData;

  const skillCategories = [
    {
      icon: Code,
      title: 'Programming Languages',
      skills: skills.programmingLanguages,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20'
    },
    {
      icon: Code,
      title: 'Frontend',
      skills: skills.frontend,
      color: 'from-emerald-500 to-emerald-600',
      bgColor: 'bg-emerald-50 dark:bg-emerald-900/20'
    },
    {
      icon: Server,
      title: 'Backend',
      skills: skills.backend,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20'
    },
    {
      icon: Database,
      title: 'Databases',
      skills: skills.databases,
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50 dark:bg-orange-900/20'
    },
    {
      icon: Cloud,
      title: 'DevOps',
      skills: skills.devops,
      color: 'from-rose-500 to-rose-600',
      bgColor: 'bg-rose-50 dark:bg-rose-900/20'
    },
    {
      icon: GitBranch,
      title: 'Version Control',
      skills: skills.vcs,
      color: 'from-indigo-500 to-indigo-600',
      bgColor: 'bg-indigo-50 dark:bg-indigo-900/20'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  const skillCardVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.6 }
    }
  };

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
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="mb-8"
            >
              <div className="relative inline-block">
                <img
                  src={avatarImage}
                  alt={personalInfo.name}
                  className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover shadow-2xl border-4 border-white dark:border-gray-700 mx-auto"
                />
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white dark:border-gray-700"></div>
              </div>
            </motion.div>
            
            <motion.h1 
              className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-white dark:via-gray-100 dark:to-white bg-clip-text text-transparent mb-6"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              About Me
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Passionate <span className="font-semibold text-blue-600 dark:text-blue-400">Full-Stack Developer</span> crafting exceptional digital experiences
            </motion.p>
            
            {/* Quick Info */}
            <motion.div 
              className="flex flex-wrap justify-center gap-6 mt-8"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <MapPin size={16} />
                <span className="text-sm font-medium">Ho Chi Minh City, Vietnam</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <Calendar size={16} />
                <span className="text-sm font-medium">1+ Years Experience</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <Mail size={16} />
                <span className="text-sm font-medium">{personalInfo.email}</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Bio Section - Enhanced */}
          <motion.div variants={itemVariants} className="mb-20">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 md:p-12 border border-gray-200 dark:border-gray-700 relative overflow-hidden">
              {/* Background Pattern */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-full -translate-y-32 translate-x-32 opacity-60"></div>
              
              <div className="relative z-10">
                <motion.h2 
                  className="p-4 text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8 text-center"
                  whileInView={{ y: 0, opacity: 1 }}
                  initial={{ y: 20, opacity: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  My Journey
                </motion.h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 items-center px-6 py-4 lg:px-20 lg:py-6">
                  <motion.div
                    whileInView={{ x: 0, opacity: 1 }}
                    initial={{ x: -30, opacity: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                  >
                    <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                      As a dedicated Software Engineering student at FPT University, I'm pursuing my passion for creating 
                      impactful digital solutions. With hands-on experience in full-stack development, I specialize in 
                      building modern web applications that solve real-world problems.
                    </p>
                    <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                      My journey in tech began with curiosity and has evolved into expertise across the development stack. 
                      I thrive on <span className="font-semibold text-blue-600 dark:text-blue-400">innovative problem-solving</span> and 
                      creating user-centric applications using cutting-edge technologies like React.js, Node.js, and cloud platforms. 
                      Every project I work on is an opportunity to learn, grow, and deliver exceptional value.
                    </p>
                    
                    {/* Key Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-8">
                      <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-xl text-wrap">
                        <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">6+</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Projects</div>
                      </div>
                      <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                        <div className="text-2xl font-bold text-green-600 dark:text-green-400">1+</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Years</div>
                      </div>
                      <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                        <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">10+</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Technologies</div>
                      </div>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    className="flex justify-center lg:justify-end mt-8 lg:mt-0"
                    whileInView={{ x: 0, opacity: 1 }}
                    initial={{ x: 30, opacity: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="relative group">
                      {/* Main Avatar Container */}
                      <div className="relative w-80 h-80 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-3xl p-1 shadow-2xl group-hover:shadow-blue-500/25 transition-all duration-500">
                        <div className="w-full h-full bg-white dark:bg-gray-800 rounded-3xl p-2">
                          <img
                            src={avatarImage}
                            alt={personalInfo.name}
                            className="w-full h-full rounded-2xl object-cover"
                          />
                        </div>
                        
                        {/* Floating Badge */}
                        <div className="absolute -top-3 -left-3 bg-white dark:bg-gray-800 rounded-full p-3 shadow-lg border-4 border-green-400 group-hover:scale-110 transition-transform duration-300">
                          <Code size={20} className="text-green-500" />
                        </div>
                        
                        {/* Status Indicator */}
                        <div className="absolute -bottom-3 -right-3 bg-white dark:bg-gray-800 rounded-full px-4 py-2 shadow-lg border border-gray-200 dark:border-gray-600">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Available</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Decorative Elements */}
                      <div className="absolute -top-6 -right-6 w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl animate-bounce opacity-80 shadow-lg"></div>
                      <div className="absolute -bottom-6 -left-6 w-8 h-8 bg-gradient-to-br from-green-400 to-blue-500 rounded-xl animate-pulse opacity-80 shadow-lg"></div>
                      
                      {/* Subtle Background Glow */}
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-2xl -z-10 group-hover:blur-xl transition-all duration-500"></div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Skills Section - Enhanced */}
          <motion.div variants={itemVariants} className="mb-20">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white text-center mb-4"
              whileInView={{ y: 0, opacity: 1 }}
              initial={{ y: 20, opacity: 0 }}
              transition={{ duration: 0.6 }}
            >
              Technical Excellence
            </motion.h2>
            <motion.p 
              className="text-lg text-gray-600 dark:text-gray-400 text-center mb-16 max-w-2xl mx-auto"
              whileInView={{ y: 0, opacity: 1 }}
              initial={{ y: 20, opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              A comprehensive toolkit of modern technologies and frameworks
            </motion.p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {skillCategories.map((category, index) => {
                const IconComponent = category.icon;
                return (
                  <motion.div
                    key={category.title}
                    variants={skillCardVariants}
                    whileInView="visible"
                    initial="hidden"
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ 
                      y: -8,
                      transition: { duration: 0.3 }
                    }}
                    className={`relative overflow-hidden rounded-2xl ${category.bgColor} border border-gray-200 dark:border-gray-700 group hover:shadow-xl transition-all duration-300`}
                  >
                    {/* Gradient overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                    
                    <div className="relative p-8">
                      {/* Header */}
                      <div className="flex items-center mb-6">
                        <div className={`bg-gradient-to-br ${category.color} p-3 rounded-xl mr-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                          <IconComponent size={24} className="text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-gray-800 dark:group-hover:text-gray-100 transition-colors duration-300">
                          {category.title}
                        </h3>
                      </div>
                      
                      {/* Skills Grid */}
                      <div className="grid grid-cols-2 gap-3">
                        {category.skills.map((skill, skillIndex) => (
                          <motion.div
                            key={skill}
                            initial={{ opacity: 0, scale: 0.5 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ 
                              duration: 0.4, 
                              delay: (index * 0.1) + (skillIndex * 0.05) 
                            }}
                            className="bg-white dark:bg-gray-800 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 text-center shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100 dark:border-gray-600"
                          >
                            {skill}
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Awards Section - Enhanced */}
          <motion.div variants={itemVariants}>
            <motion.h2 
              className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white text-center mb-4"
              whileInView={{ y: 0, opacity: 1 }}
              initial={{ y: 20, opacity: 0 }}
              transition={{ duration: 0.6 }}
            >
              Honors & Recognition
            </motion.h2>
            <motion.p 
              className="text-lg text-gray-600 dark:text-gray-400 text-center mb-16 max-w-2xl mx-auto"
              whileInView={{ y: 0, opacity: 1 }}
              initial={{ y: 20, opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Academic achievements and professional recognition
            </motion.p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {awards.map((award, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  whileHover={{ 
                    y: -8,
                    transition: { duration: 0.3 }
                  }}
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700 relative overflow-hidden group hover:shadow-2xl transition-all duration-300"
                >
                  {/* Background Pattern */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-yellow-100 to-orange-100 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-full -translate-y-16 translate-x-16 opacity-60 group-hover:scale-150 transition-transform duration-500"></div>
                  
                  <div className="relative z-10">
                    <div className="flex items-start space-x-6">
                      <div className="bg-gradient-to-br from-yellow-400 to-orange-500 p-4 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <Award size={32} className="text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-yellow-600 dark:group-hover:text-yellow-400 transition-colors duration-300">
                          {award.name}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 font-medium">
                          {award.period}
                        </p>
                        {/* Achievement indicator */}
                        <div className="mt-4 flex items-center space-x-2">
                          <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                          <span className="text-sm text-gray-500 dark:text-gray-400">Achievement Unlocked</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            {/* Call to Action */}
            <motion.div 
              className="text-center mt-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="inline-flex items-center space-x-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 px-8 py-4 rounded-2xl border border-blue-200 dark:border-blue-700">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-lg font-medium text-gray-700 dark:text-gray-300">
                  Ready to create amazing things together
                </span>
                <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse [animation-delay:0.5s]"></div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutPage;
