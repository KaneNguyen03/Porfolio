import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Github, Linkedin, Send, UserCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { portfolioData } from '../data/portfolio';
import { useThemeClasses } from '../hooks/useThemeClasses';

const ContactPage: React.FC = () => {
  const { personalInfo, references } = portfolioData;
  const { page } = useThemeClasses(); // Ensure component re-renders on theme change
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    
    try {
      // Get EmailJS credentials from environment variables
      const serviceId = import.meta.env.VITE_SERVICE_ID;
      const templateId = import.meta.env.VITE_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_PUBLIC_KEY;
      
      // Check if all credentials are available
      if (!serviceId || !templateId || !publicKey || 
          templateId === 'YOUR_TEMPLATE_ID' || publicKey === 'YOUR_PUBLIC_KEY') {
        console.log('EmailJS not configured, using mailto fallback');
        // Fallback to mailto
        const mailtoLink = `mailto:${personalInfo.email}?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(
          `Hi ${personalInfo.name},\n\n${formData.message}\n\nBest regards,\n${formData.name}\n${formData.email}`
        )}`;
        window.open(mailtoLink);
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
        return;
      }
      
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
        to_email: personalInfo.email,
        sent_date: new Date().toISOString()
      };

      await emailjs.send(serviceId, templateId, templateParams, publicKey);
      
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('Failed to send email:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactMethods = [
    {
      icon: Mail,
      title: 'Email',
      value: personalInfo.email,
      link: `mailto:${personalInfo.email}`,
      color: 'text-blue-600'
    },
    {
      icon: Phone,
      title: 'Phone',
      value: personalInfo.phone,
      link: `tel:${personalInfo.phone}`,
      color: 'text-green-600'
    },
    {
      icon: MapPin,
      title: 'Location',
      value: personalInfo.location,
      link: '#',
      color: 'text-red-600'
    }
  ];

  const socialLinks = [
    {
      icon: Github,
      title: 'GitHub',
      url: personalInfo.github,
      color: 'bg-gray-800 hover:bg-gray-700'
    },
    {
      icon: Linkedin,
      title: 'LinkedIn',
      url: personalInfo.linkedin,
      color: 'bg-blue-600 hover:bg-blue-700'
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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6 }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 pt-20 pb-16 transition-colors duration-300">
      <div className="container-width">{/* Force re-render: {page} */}
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
                <Mail size={32} className="text-white" />
              </div>
            </motion.div>
            
            <motion.h1 
              className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-white dark:via-gray-100 dark:to-white bg-clip-text text-transparent mb-6"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Let's Work Together
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Ready to bring your ideas to life? I'm always excited to discuss new <span className="font-semibold text-green-600 dark:text-green-400">opportunities</span> and challenging projects
            </motion.p>
          </motion.div>

          {/* Main Content */}
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 lg:gap-12">
              {/* Contact Information - 1/3 width */}
              <motion.div variants={itemVariants} className="xl:col-span-1 space-y-8">
                {/* Quick Contact Cards */}
                <div className="space-y-4">
                  {contactMethods.map((method) => {
                    const IconComponent = method.icon;
                    return (
                      <motion.div
                        key={method.title}
                        whileHover={{ scale: 1.02 }}
                        className="group"
                      >
                        {method.link !== '#' ? (
                          <a
                            href={method.link}
                            className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all duration-300 block group relative overflow-hidden"
                          >
                            {/* Background Pattern */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 rounded-full -translate-y-16 translate-x-16 opacity-60 group-hover:scale-150 transition-transform duration-500"></div>
                            
                            <div className="relative z-10 flex items-center space-x-4">
                              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-700 dark:to-gray-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                                <IconComponent size={28} className={method.color} />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                                  {method.title}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400 truncate">
                                  {method.value}
                                </p>
                              </div>
                            </div>
                          </a>
                        ) : (
                          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-6 border border-gray-200 dark:border-gray-700 relative overflow-hidden group">
                            {/* Background Pattern */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-red-100 to-orange-100 dark:from-red-900/20 dark:to-orange-900/20 rounded-full -translate-y-16 translate-x-16 opacity-60"></div>
                            
                            <div className="relative z-10 flex items-center space-x-4">
                              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br from-red-50 to-red-100 dark:from-gray-700 dark:to-gray-600 flex items-center justify-center shadow-lg`}>
                                <IconComponent size={28} className={method.color} />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                                  {method.title}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400">
                                  {method.value}
                                </p>
                              </div>
                            </div>
                          </div>
                        )}
                      </motion.div>
                    );
                  })}
                </div>

                {/* Social Links - Enhanced */}
                <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 border border-gray-200 dark:border-gray-700 relative overflow-hidden group">
                  {/* Background Pattern */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900/20 dark:to-blue-900/20 rounded-full -translate-y-16 translate-x-16 opacity-60 group-hover:scale-125 transition-transform duration-500"></div>
                  
                  <div className="relative z-10">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 text-center flex items-center justify-center">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mr-3">
                        <Github size={16} className="text-white" />
                      </div>
                      Connect & Follow
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      {socialLinks.map((social) => {
                        const IconComponent = social.icon;
                        return (
                          <motion.a
                            key={social.title}
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            className={`${social.color} text-white p-4 rounded-2xl transition-all duration-300 flex flex-col items-center space-y-3 shadow-lg hover:shadow-xl group`}
                          >
                            <IconComponent size={24} />
                            <span className="text-sm font-semibold">{social.title}</span>
                          </motion.a>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* References */}
                <div className="card">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
                    <UserCircle size={20} className="mr-2 text-blue-600" />
                    Professional References
                  </h3>
                  <div className="space-y-4">
                    {references.map((reference, index) => (
                      <motion.div
                        key={index}
                        whileHover={{ scale: 1.02 }}
                        className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300"
                      >
                        <div className="flex items-start space-x-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/50 dark:to-blue-800/50 rounded-full flex items-center justify-center flex-shrink-0">
                            <UserCircle size={20} className="text-blue-600 dark:text-blue-400" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-gray-900 dark:text-white text-sm">
                              {reference.name}
                            </h4>
                            <p className="text-gray-600 dark:text-gray-400 text-xs mb-2">
                              {reference.position}
                            </p>
                            <a
                              href={`mailto:${reference.email}`}
                              className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 text-xs font-medium transition-colors duration-200 hover:underline"
                            >
                              {reference.email}
                            </a>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Contact Form - Enhanced */}
              <motion.div variants={itemVariants} className="xl:col-span-2">
                <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-200 dark:border-gray-700 relative overflow-hidden group">
                  {/* Background Pattern */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 rounded-full -translate-y-32 translate-x-32 opacity-60 group-hover:scale-125 transition-transform duration-500"></div>
                  
                  <div className="relative z-10">
                    <div className="mb-10">
                      <div className="flex items-center mb-6">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mr-4">
                          <Send size={24} className="text-white" />
                        </div>
                        <div>
                          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                            Send a Message
                          </h2>
                          <p className="text-gray-600 dark:text-gray-400 mt-2">
                            Let's discuss how we can work together
                          </p>
                        </div>
                      </div>
                    </div>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {submitStatus === 'success' && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border border-green-200 dark:border-green-700 text-green-800 dark:text-green-300 rounded-xl"
                      >
                        <div className="flex items-center space-x-2">
                          <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <span className="font-medium">Message sent successfully! I'll get back to you soon.</span>
                        </div>
                      </motion.div>
                    )}

                    {submitStatus === 'error' && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 bg-gradient-to-r from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 border border-red-200 dark:border-red-700 text-red-800 dark:text-red-300 rounded-xl"
                      >
                        <div className="flex items-center space-x-2">
                          <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <span className="font-medium">Failed to send message. Please try again or contact me directly.</span>
                        </div>
                      </motion.div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-4 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-300 hover:border-gray-400 dark:hover:border-gray-500"
                          placeholder="John Doe"
                        />
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-4 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-300 hover:border-gray-400 dark:hover:border-gray-500"
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                        Subject *
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-4 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-300 hover:border-gray-400 dark:hover:border-gray-500"
                        placeholder="Project Collaboration Opportunity"
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                        Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={6}
                        className="w-full px-4 py-4 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-300 hover:border-gray-400 dark:hover:border-gray-500 resize-none"
                        placeholder="Tell me about your project, timeline, budget, and what you're looking to achieve. The more details you provide, the better I can help you."
                      />
                    </div>

                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                      whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                      className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 flex items-center justify-center space-x-3 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                          <span>Sending Message...</span>
                        </>
                      ) : (
                        <>
                          <Send size={22} />
                          <span>Send Message</span>
                        </>
                      )}
                    </motion.button>

                    <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                      I typically respond within 24 hours. For urgent matters, feel free to call me directly.
                    </p>
                  </form>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactPage;
