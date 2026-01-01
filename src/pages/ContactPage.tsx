import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Mail, Phone, MapPin, Github, Linkedin, Send, UserCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { portfolioData } from '../data/portfolio';
import { useThemeClasses } from '../hooks/useThemeClasses';
import SEO from '../components/SEO';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { fadeUpItem, hoverLift, staggerContainer, TRANSITION } from '../lib/motion';

const ContactPage: React.FC = () => {
  const { personalInfo, references } = portfolioData;
  const shouldReduceMotion = useReducedMotion();
  useThemeClasses(); // Ensure component re-renders on theme change
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

  const containerVariants = staggerContainer(shouldReduceMotion, { stagger: 0.08, delay: 0.08 });
  const itemVariants = fadeUpItem(shouldReduceMotion, 12);

  return (
    <div className="bg-gradient-to-br from-slate-50/70 via-white/60 to-blue-50/70 dark:from-gray-950/80 dark:via-gray-900/70 dark:to-slate-900/80 py-20 sm:py-24 overflow-hidden">
      <SEO
        title="Contact"
        description={`Contact ${personalInfo.name} — ${personalInfo.title}. Email, phone, and social links.`}
      />

      {/* Subtle spotlight */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[var(--brand-hero)] blur-[110px] opacity-20 dark:opacity-10"
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
                <div aria-hidden="true" className="absolute -inset-3 rounded-3xl bg-[var(--brand-hero)] blur-2xl opacity-35" />
                <div className="relative inline-flex items-center justify-center w-20 h-20 bg-white/80 dark:bg-slate-950/60 border border-slate-200/70 dark:border-slate-800/70 rounded-2xl shadow-xl shadow-slate-900/10">
                  <Mail size={32} className="text-sky-700 dark:text-sky-300" />
                </div>
              </div>
            </motion.div>
            
            <motion.h1
              className="text-4xl md:text-6xl font-bold text-slate-950 dark:text-white mb-4 tracking-tight"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={shouldReduceMotion ? { duration: 0 } : { ...TRANSITION.slow, delay: 0.08 }}
            >
              Let&apos;s Work Together
            </motion.h1>
            
            <motion.p 
              className="text-lg md:text-2xl text-slate-700 dark:text-slate-200 max-w-4xl mx-auto leading-relaxed"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={shouldReduceMotion ? { duration: 0 } : { ...TRANSITION.slow, delay: 0.16 }}
            >
              Ready to bring your ideas to life? I'm always excited to discuss new{' '}
              <span className="font-semibold text-sky-700 dark:text-sky-300">opportunities</span> and challenging projects.
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
                        {...hoverLift(shouldReduceMotion)}
                        className="group"
                      >
                        {method.link !== '#' ? (
                          <Card className="glass-panel border border-slate-200/70 dark:border-slate-800/70 overflow-hidden">
                            <CardContent className="p-0">
                              <a href={method.link} className="block p-6 relative">
                                <div aria-hidden="true" className="absolute -top-16 -right-16 h-48 w-48 rounded-full bg-[var(--brand-hero)] blur-3xl opacity-10" />
                                <div className="relative z-10 flex items-center space-x-4">
                                  <div className="w-14 h-14 rounded-2xl bg-white/80 dark:bg-slate-950/60 border border-slate-200/70 dark:border-slate-800/70 flex items-center justify-center shadow-xl shadow-slate-900/10">
                                    <IconComponent size={26} className={method.color} />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <h3 className="text-lg font-semibold text-slate-950 dark:text-white mb-1">{method.title}</h3>
                                    <p className="text-slate-600 dark:text-slate-300 truncate">{method.value}</p>
                                  </div>
                                </div>
                              </a>
                            </CardContent>
                          </Card>
                        ) : (
                          <Card className="glass-panel border border-slate-200/70 dark:border-slate-800/70 overflow-hidden">
                            <CardContent className="p-6 relative">
                              <div aria-hidden="true" className="absolute -top-16 -right-16 h-48 w-48 rounded-full bg-[var(--brand-hero)] blur-3xl opacity-10" />
                              <div className="relative z-10 flex items-center space-x-4">
                                <div className="w-14 h-14 rounded-2xl bg-white/80 dark:bg-slate-950/60 border border-slate-200/70 dark:border-slate-800/70 flex items-center justify-center shadow-xl shadow-slate-900/10">
                                  <IconComponent size={26} className={method.color} />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <h3 className="text-lg font-semibold text-slate-950 dark:text-white mb-1">{method.title}</h3>
                                  <p className="text-slate-600 dark:text-slate-300">{method.value}</p>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        )}
                      </motion.div>
                    );
                  })}
                </div>

                {/* Social Links - Enhanced */}
                <Card className="glass-panel border border-slate-200/70 dark:border-slate-800/70 overflow-hidden">
                  <div aria-hidden="true" className="absolute -top-20 -right-20 h-56 w-56 rounded-full bg-[var(--brand-hero)] blur-3xl opacity-10" />
                  <CardContent className="relative z-10 p-8">
                    <h3 className="text-xl font-bold text-slate-950 dark:text-white mb-6 text-center flex items-center justify-center">
                      <div className="w-8 h-8 bg-white/80 dark:bg-slate-950/60 border border-slate-200/70 dark:border-slate-800/70 rounded-lg flex items-center justify-center mr-3 shadow-xl shadow-slate-900/10">
                        <Github size={16} className="text-sky-700 dark:text-sky-300" />
                      </div>
                      Connect & Follow
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                      {socialLinks.map((social) => {
                        const IconComponent = social.icon;
                        return (
                          <motion.a
                            key={social.title}
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={shouldReduceMotion ? undefined : { y: -2, scale: 1.03 }}
                            whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
                            transition={TRANSITION.fast}
                            className={`${social.color} text-white p-4 rounded-2xl transition-all duration-300 flex flex-col items-center space-y-3 shadow-lg hover:shadow-xl`}
                          >
                            <IconComponent size={24} />
                            <span className="text-sm font-semibold">{social.title}</span>
                          </motion.a>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>

                {/* References */}
                <Card className="glass-panel border border-slate-200/70 dark:border-slate-800/70 overflow-hidden">
                  <div aria-hidden="true" className="absolute -top-20 -right-20 h-56 w-56 rounded-full bg-[var(--brand-hero)] blur-3xl opacity-10" />
                  <CardContent className="relative z-10 p-8">
                    <h3 className="text-lg font-semibold text-slate-950 dark:text-white mb-6 flex items-center">
                      <UserCircle size={20} className="mr-2 text-sky-700 dark:text-sky-300" />
                      Professional Re ferences
                    </h3>
                    <div className="space-y-3">
                      {references.map((reference, index) => (
                        <motion.div
                          key={index}
                          {...hoverLift(shouldReduceMotion)}
                          className="p-4 rounded-2xl border border-slate-200/70 dark:border-slate-800/70 bg-white/60 dark:bg-slate-950/30"
                        >
                          <div className="flex items-start space-x-3">
                            <div className="w-12 h-12 bg-white/80 dark:bg-slate-950/60 border border-slate-200/70 dark:border-slate-800/70 rounded-full flex items-center justify-center flex-shrink-0 shadow-xl shadow-slate-900/10">
                              <UserCircle size={20} className="text-sky-700 dark:text-sky-300" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-semibold text-slate-950 dark:text-white text-sm">{reference.name}</h4>
                              <p className="text-slate-600 dark:text-slate-300 text-xs mb-2">{reference.position}</p>
                              <a
                                href={`mailto:${reference.email}`}
                                className="text-sky-700 hover:text-sky-800 dark:text-sky-300 dark:hover:text-sky-200 text-xs font-medium transition-colors duration-200 hover:underline p-2"
                              >
                                {reference.email}
                              </a>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Contact Form - Enhanced */}
              <motion.div variants={itemVariants} className="xl:col-span-2">
                <Card className="p-8 md:p-12 relative overflow-hidden group">
                  {/* Background Pattern */}
                  <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-[var(--brand-hero)] blur-3xl opacity-10 group-hover:opacity-15 transition-opacity"></div>
                  
                  <div className="relative z-10">
                    <div className="mb-10">
                      <div className="flex items-center mb-6">
                        <div className="w-12 h-12 bg-white/80 dark:bg-slate-950/60 border border-slate-200/70 dark:border-slate-800/70 rounded-2xl flex items-center justify-center mr-4 shadow-xl shadow-slate-900/10">
                          <Send size={22} className="text-sky-700 dark:text-sky-300" />
                        </div>
                        <div>
                          <h2 className="text-3xl md:text-4xl font-bold text-slate-950 dark:text-white">
                            Send a Message
                          </h2>
                          <p className="text-slate-600 dark:text-slate-300 mt-2">
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
                        transition={shouldReduceMotion ? { duration: 0 } : TRANSITION.fast}
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
                        transition={shouldReduceMotion ? { duration: 0 } : TRANSITION.fast}
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
                        <Label htmlFor="name" className="mb-3 block">
                          Full Name *
                        </Label>
                        <Input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="h-12 rounded-xl px-4"
                          placeholder="John Doe"
                        />
                      </div>

                      <div>
                        <Label htmlFor="email" className="mb-3 block">
                          Email Address *
                        </Label>
                        <Input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="h-12 rounded-xl px-4"
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="subject" className="mb-3 block">
                        Subject *
                      </Label>
                      <Input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        className="h-12 rounded-xl px-4"
                        placeholder="Project Collaboration Opportunity"
                      />
                    </div>

                    <div>
                      <Label htmlFor="message" className="mb-3 block">
                        Message *
                      </Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={6}
                        className="rounded-xl px-4 py-3 resize-none"
                        placeholder="Tell me about your project, timeline, budget, and what you're looking to achieve. The more details you provide, the better I can help you."
                      />
                    </div>

                    <Button type="submit" disabled={isSubmitting} className="w-full h-12 rounded-xl">
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                          <span>Sending Message...</span>
                        </>
                      ) : (
                        <>
                          <Send size={20} />
                          <span>Send Message</span>
                        </>
                      )}
                    </Button>

                    <p className="text-sm text-slate-600 dark:text-slate-300 text-center">
                      I typically respond within 24 hours. For urgent matters, feel free to call me directly.
                    </p>
                  </form>
                  </div>
                </Card>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactPage;
