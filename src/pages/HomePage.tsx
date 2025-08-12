import { motion } from 'framer-motion';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import avatarImage from '../assets/ava.jpg';
import cvFile from '../assets/Nguyen_Xuan_Kha_Fullstack_CV.pdf';
import { portfolioData } from '../data/portfolio';
import { ArrowRight, Briefcase, Download, Github, Linkedin, Mail, MapPin, Star } from 'lucide-react';

const HomePage: React.FC = () => {
  const { personalInfo } = portfolioData;
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6 }
    }
  };

  const socialLinks = [
    { icon: Github, url: personalInfo.github, label: 'GitHub' },
    { icon: Linkedin, url: personalInfo.linkedin, label: 'LinkedIn' },
    { icon: Mail, url: `mailto:${personalInfo.email}`, label: 'Email' }
  ];

  return (
    <div className="bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 py-28">
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
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="relative mb-8"
              >
                <div className="relative inline-block">
                  <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 rounded-full opacity-75 blur-lg animate-pulse"></div>
                  <div className="relative w-40 h-40 mx-auto">
                    <img
                      src={avatarImage}
                      alt={personalInfo.name}
                      className="w-full h-full rounded-full object-cover shadow-2xl border-4 border-white dark:border-gray-700"
                    />
                    {/* Status indicator */}
                    <div className="absolute bottom-4 right-4 w-6 h-6 bg-green-500 rounded-full border-4 border-white dark:border-gray-700 animate-pulse"></div>
                  </div>
                  {/* Floating elements */}
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-500 rounded-lg opacity-80 animate-bounce [animation-delay:200ms]"></div>
                  <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-purple-500 rounded-full opacity-80 animate-bounce [animation-delay:400ms]"></div>
                </div>
              </motion.div>

              {/* Name and Title */}
              <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-4xl md:text-7xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-white dark:via-gray-100 dark:to-white bg-clip-text text-transparent mb-6"
              >
                {personalInfo.name}
              </motion.h1>

              <motion.h2
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-2xl md:text-4xl font-semibold text-blue-600 dark:text-blue-400 mb-6"
              >
                {personalInfo.title}
              </motion.h2>

              {/* Location with enhanced styling */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="inline-flex items-center space-x-2 bg-white dark:bg-gray-800 px-6 py-3 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 mb-8"
              >
                <MapPin size={20} className="text-red-500" />
                <span className="text-lg font-medium text-gray-700 dark:text-gray-300">{personalInfo.location}</span>
              </motion.div>
            </motion.div>

            {/* Bio Section */}
            <motion.div variants={itemVariants} className="mb-16">
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="text-left px-4 md:text-center text-xl md:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-4xl mx-auto"
              >
                {personalInfo.objective}
              </motion.p>
            </motion.div>


            {/* Action Buttons - Enhanced */}
            <motion.div variants={itemVariants} className="mb-16">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <Link
                  to="/projects"
                  className="inline-flex items-center justify-center space-x-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 group"
                >
                  <Briefcase size={20} />
                  <span>View My Work</span>
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-200" />
                </Link>

                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center space-x-3 px-8 py-4 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-semibold rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 border border-gray-200 dark:border-gray-600"
                >
                  <Mail size={20} />
                  <span>Get In Touch</span>
                </Link>

                <a
                  href={cvFile}
                  download="Nguyen_Xuan_Kha_Fullstack_CV.pdf"
                  className="inline-flex items-center justify-center space-x-3 px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <Download size={20} />
                  <span>Download CV</span>
                </a>
              </motion.div>
            </motion.div>

            {/* Social Links - Enhanced */}
            <motion.div variants={itemVariants} className="mb-16">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.4 }}
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
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="group relative"
                      aria-label={social.label}
                    >
                      <div className="w-16 h-16 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center transition-all duration-300 group-hover:shadow-xl group-hover:border-blue-300 dark:group-hover:border-blue-600">
                        <IconComponent
                          size={28}
                          className="text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200"
                        />
                      </div>
                      
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
                className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 border border-gray-200 dark:border-gray-700 max-w-4xl mx-auto"
              >
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
                  <Link
                    to="/about"
                    className="inline-flex items-center space-x-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors duration-200"
                  >
                    <span>Learn more about me</span>
                    <ArrowRight size={16} />
                  </Link>
                </div>
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
