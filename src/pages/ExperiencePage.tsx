import React from 'react';
import { motion } from 'framer-motion';
import { Building, Calendar, CheckCircle, Code, TrendingUp, Users, Target, Lightbulb } from 'lucide-react';
import { portfolioData } from '../data/portfolio';

const ExperiencePage: React.FC = () => {
  const { workExperience } = portfolioData;

  // Enhanced work experience with learning outcomes and contributions
  const enhancedExperience = [
    {
      ...workExperience[0], // Cigro
      learnings: [
        "Mastered real-time messaging integration with Sendbird API and custom database design",
        "Gained expertise in payment system integration with Google/Apple IAP and webhook handling",
        "Learned AWS cloud services migration from EventEmitter2 to SQS + Lambda architecture",
        "Developed proficiency in load testing methodologies using Autocannon and K6 with Grafana visualization"
      ],
      contributions: [
        "Successfully integrated real-time messaging for EveryTalk Project with personalized chat data storage",
        "Implemented robust payment system handling subscription workflows for Uobong platform",
        "Migrated event architecture improving system scalability and reducing response time by 35%",
        "Conducted comprehensive load testing ensuring system stability under high concurrent user scenarios"
      ],
      techStack: ["Node.js", "TypeScript", "Sendbird API", "AWS SQS", "AWS Lambda", "Google IAP", "Apple IAP", "PostgreSQL", "Webhooks", "Autocannon", "K6", "Grafana"],
      impact: "Enhanced user engagement through real-time messaging and streamlined payment processing"
    },
    {
      ...workExperience[1], // FSoft
      learnings: [
        "Mastered React ecosystem and modern state management patterns",
        "Implemented performance optimization techniques reducing load time by 40%",
        "Gained expertise in React Query for efficient data synchronization"
      ],
      contributions: [
        "Developed 5+ reusable UI components adopted across 1 product teams",
        "Reduced codebase redundancy by 30% through component abstraction"
      ],
      techStack: ["React.js", "TypeScript", "React Query", "Tailwind CSS", "Git", "Scrum"],
      impact: "Improved team productivity by 25% through reusable component library"
    },
    {
      ...workExperience[2], // Axpara - Fresher
      learnings: [
        "Advanced React.js development skills with complex application architectures",
        "Enhanced cross-functional collaboration with designers and product managers",
        "Deepened understanding of software development best practices and quality standards"
      ],
      contributions: [
        "Delivered multiple high-quality web applications using React.js and related technologies",
        "Collaborated effectively with cross-functional teams to create user-centric products",
        "Contributed to maintaining high code quality and development standards"
      ],
      techStack: ["React.js", "JavaScript", "CSS3", "HTML5", "Git", "Agile"],
      impact: "Contributed to successful product delivery through effective team collaboration"
    },
    {
      ...workExperience[3], // Axpara - Internship
      learnings: [
        "Foundational software engineering principles and code review processes",
        "Practical experience with agile development methodologies",
        "Professional development environment and team collaboration skills"
      ],
      contributions: [
        "Provided constructive feedback in code reviews improving overall code quality",
        "Gained valuable hands-on experience in software development lifecycle",
        "Successfully transitioned from academic learning to professional development"
      ],
      techStack: ["JavaScript", "React.js", "Git", "Code Review", "Agile"],
      impact: "Built strong foundation for professional software development career"
    }
  ];

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

  const timelineVariants = {
    hidden: { scaleY: 0 },
    visible: {
      scaleY: 1,
      transition: { duration: 1.5 }
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
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg mb-6">
                <Building size={32} className="text-white" />
              </div>
            </motion.div>
            
            <motion.h1 
              className="p-2 text-4xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-white dark:via-gray-100 dark:to-white bg-clip-text text-transparent mb-6"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Professional Journey
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Transforming challenges into <span className="font-semibold text-blue-600 dark:text-blue-400">growth opportunities</span> through continuous learning and meaningful contributions
            </motion.p>
            
            {/* Experience Summary */}
            <motion.div 
              className="flex flex-wrap justify-center gap-8 mt-12"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">3</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Companies</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 dark:text-green-400">~2</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Years</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">8+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Projects</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Professional Timeline */}
          <div className="relative max-w-6xl mx-auto">
            {/* Timeline Line */}
            <motion.div 
              className="absolute left-4 md:left-1/2 md:transform md:-translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-500 via-purple-500 to-green-500 rounded-full origin-top"
              variants={timelineVariants}
            ></motion.div>

            {enhancedExperience.map((experience, index) => (
              <motion.div
                key={experience.company}
                variants={itemVariants}
                className={`relative mb-20 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Timeline Node */}
                <div className="absolute left-0 md:left-1/2 md:transform md:-translate-x-1/2 w-12 h-12 bg-white dark:bg-gray-800 rounded-2xl border-4 border-blue-500 z-10 flex items-center justify-center shadow-lg">
                  <Building size={20} className="text-blue-500" />
                </div>

                {/* Experience Card */}
                <div className={`ml-20 md:ml-0 md:w-5/12 ${
                  index % 2 === 0 ? 'md:mr-auto md:pr-12' : 'md:ml-auto md:pl-12'
                }`}>
                  <motion.div
                    whileHover={{ 
                      y: -8,
                      transition: { duration: 0.3 }
                    }}
                    className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 border border-gray-200 dark:border-gray-700 relative overflow-hidden group hover:shadow-2xl transition-all duration-500"
                  >
                    {/* Background Pattern */}
                    <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 rounded-full -translate-y-20 translate-x-20 opacity-60 group-hover:scale-125 transition-transform duration-500"></div>
                    
                    <div className="relative z-10">
                      {/* Company Header */}
                      <div className="mb-6">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                            {experience.company}
                          </h3>
                          <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                            <Calendar size={16} />
                            <span>{experience.period}</span>
                          </div>
                        </div>
                        <h4 className="text-xl text-blue-600 dark:text-blue-400 font-semibold mb-3">
                          {experience.position}
                        </h4>
                        
                        {/* Tech Stack */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {experience.techStack.map((tech) => (
                            <span
                              key={tech}
                              className="px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-xs font-medium"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Key Sections */}
                      <div className="grid grid-cols-1 gap-6">
                        {/* Learning Outcomes */}
                        <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-4 border border-green-200 dark:border-green-700">
                          <div className="flex items-center mb-3">
                            <Lightbulb size={18} className="text-green-600 dark:text-green-400 mr-2" />
                            <h5 className="font-semibold text-green-800 dark:text-green-300">Key Learnings</h5>
                          </div>
                          <ul className="space-y-2">
                            {experience.learnings.map((learning, idx) => (
                              <li key={idx} className="flex items-start space-x-2 text-sm text-green-700 dark:text-green-300">
                                <CheckCircle size={14} className="text-green-500 mt-0.5 flex-shrink-0" />
                                <span>{learning}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Contributions */}
                        <div className="bg-gradient-to-r from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20 rounded-2xl p-4 border border-purple-200 dark:border-purple-700">
                          <div className="flex items-center mb-3">
                            <Target size={18} className="text-purple-600 dark:text-purple-400 mr-2" />
                            <h5 className="font-semibold text-purple-800 dark:text-purple-300">Key Contributions</h5>
                          </div>
                          <ul className="space-y-2">
                            {experience.contributions.map((contribution, idx) => (
                              <li key={idx} className="flex items-start space-x-2 text-sm text-purple-700 dark:text-purple-300">
                                <CheckCircle size={14} className="text-purple-500 mt-0.5 flex-shrink-0" />
                                <span>{contribution}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Impact */}
                        <div className="bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-orange-900/20 dark:to-yellow-900/20 rounded-2xl p-4 border border-orange-200 dark:border-orange-700">
                          <div className="flex items-center mb-2">
                            <TrendingUp size={18} className="text-orange-600 dark:text-orange-400 mr-2" />
                            <h5 className="font-semibold text-orange-800 dark:text-orange-300">Business Impact</h5>
                          </div>
                          <p className="text-sm text-orange-700 dark:text-orange-300">{experience.impact}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Future Aspirations */}
          <motion.div
            variants={itemVariants}
            className="text-center mt-20"
          >
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-12 border border-gray-200 dark:border-gray-700 relative overflow-hidden group hover:shadow-2xl transition-all duration-500 max-w-4xl mx-auto">
              {/* Background Pattern */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-green-50 dark:from-blue-900/20 dark:via-purple-900/20 dark:to-green-900/20 opacity-60"></div>
              
              <div className="relative z-10">
                <div className="flex justify-center mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <Users size={32} className="text-white" />
                  </div>
                </div>
                
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  Ready for the Next Challenge
                </h3>
                
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto leading-relaxed">
                  Seeking a <span className="font-semibold text-blue-600 dark:text-blue-400">Fresher/Junior Full-Stack Developer</span> position 
                  where I can leverage my proven track record of delivering impactful solutions and continue growing alongside exceptional teams.
                </p>
                
                {/* What I Bring */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                  <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-2xl border border-blue-200 dark:border-blue-700">
                    <Code size={24} className="text-blue-600 dark:text-blue-400 mx-auto mb-3" />
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Technical Excellence</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Modern tech stack with focus on scalable, maintainable code</p>
                  </div>
                  
                  <div className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 rounded-2xl border border-green-200 dark:border-green-700">
                    <Lightbulb size={24} className="text-green-600 dark:text-green-400 mx-auto mb-3" />
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Problem Solving</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Creative solutions that drive measurable business impact</p>
                  </div>
                  
                  <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-900/30 dark:to-violet-900/30 rounded-2xl border border-purple-200 dark:border-purple-700">
                    <TrendingUp size={24} className="text-purple-600 dark:text-purple-400 mx-auto mb-3" />
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Growth Mindset</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Continuous learning and adaptation to emerging technologies</p>
                  </div>
                </div>
                
                {/* Call to Action */}
                <div className="mt-10">
                  <div className="inline-flex items-center space-x-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 px-8 py-4 rounded-2xl border border-blue-200 dark:border-blue-700">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-lg font-medium text-gray-700 dark:text-gray-300">
                      Available for opportunities that challenge and inspire
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

export default ExperiencePage;
