import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Linkedin, Mail, Phone, MapPin, Heart } from 'lucide-react';
import { portfolioData } from '../data/portfolio';
import { Button } from './ui/button';
import { motion, useReducedMotion } from 'framer-motion';
import { fadeUpItem, staggerContainer } from '../lib/motion';

const Footer: React.FC = () => {
  const { personalInfo } = portfolioData;
  const shouldReduceMotion = useReducedMotion();
  const container = staggerContainer(shouldReduceMotion, { stagger: 0.06, delay: 0.04 });
  const item = fadeUpItem(shouldReduceMotion, 10);

  const socialLinks = [
    {
      icon: Github,
      url: personalInfo.github,
      label: 'GitHub',
      color: 'hover:bg-gray-700',
      external: true
    },
    {
      icon: Linkedin,
      url: personalInfo.linkedin,
      label: 'LinkedIn',
      color: 'hover:bg-blue-700',
      external: true
    },
    {
      icon: Mail,
      url: '/contact',
      label: 'Email',
      color: 'hover:bg-red-600',
      external: false
    }
  ];

  return (
    <footer className="bg-gray-900 dark:bg-black text-white">
      <div className="container-width py-12 px-6 md:px-0">{" "}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {/* Contact Info */}
          <motion.div variants={item} className="lg:col-span-2">
            <h3 className="text-xl font-bold mb-6 text-center md:text-left">Get In Touch</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-start space-x-3">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail size={18} className="text-white" />
                </div>
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="text-gray-300 hover:text-white transition-colors duration-200 text-sm md:text-base break-all"
                >
                  {personalInfo.email}
                </a>
              </div>
              <div className="flex items-center justify-start space-x-3">
                <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone size={18} className="text-white" />
                </div>
                <a
                  href={`tel:${personalInfo.phone}`}
                  className="text-gray-300 hover:text-white transition-colors duration-200 text-sm md:text-base"
                >
                  {personalInfo.phone}
                </a>
              </div>
              <div className="flex items-center justify-start space-x-3">
                <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin size={18} className="text-white" />
                </div>
                <span className="text-gray-300 text-sm md:text-base">{personalInfo.location}</span>
              </div>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={item} className="text-center md:text-left">
            <h3 className="text-center md:text-left text-lg font-semibold mb-6">Quick Links</h3>
            <div className="grid grid-cols-2 gap-x-4 gap-y-4 md:flex md:justify-start md:flex-col">
              {['About', 'Projects', 'Experience', 'Education', 'Contact'].map((link, index, array) => (
                <Link
                  key={link}
                  to={`/${link.toLowerCase()}`}
                  className={`block text-gray-300 hover:text-white transition-colors duration-200 text-sm hover:transform hover:translate-x-1 ${
                    index === array.length - 1 && array.length % 2 !== 0 
                      ? 'col-span-2 text-center' 
                      : ''
                  } md:col-span-1 md:text-left`}
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                >
                  {link}
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Social Links */}
          <motion.div variants={item} className="text-center md:text-left">
            <h3 className="text-lg font-semibold mb-6">Connect</h3>
            <div className="flex justify-center md:justify-start space-x-4">
              {socialLinks.map((social) => {
                const IconComponent = social.icon;
                
                if (social.external) {
                  return (
                    <Button
                      key={social.label}
                      asChild
                      variant="ghost"
                      size="icon"
                      className={`w-12 h-12 rounded-lg bg-gray-800 text-gray-300 hover:text-white ${social.color} transition-all duration-200 transform hover:scale-110 hover:-translate-y-1`}
                    >
                      <a
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.label}
                      >
                        <IconComponent size={20} />
                      </a>
                    </Button>
                  );
                } else {
                  return (
                    <Button
                      key={social.label}
                      asChild
                      variant="ghost"
                      size="icon"
                      className={`w-12 h-12 rounded-lg bg-gray-800 text-gray-300 hover:text-white ${social.color} transition-all duration-200 transform hover:scale-110 hover:-translate-y-1`}
                    >
                      <Link
                        to={social.url}
                        aria-label={social.label}
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                      >
                        <IconComponent size={20} />
                      </Link>
                    </Button>
                  );
                }
              })}
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <p className="text-gray-400 flex items-center justify-center space-x-2 text-sm">
              <span>&copy; {new Date().getFullYear()} {personalInfo.name}. All rights reserved.</span>
            </p>
            <p className="text-gray-400 flex items-center justify-center space-x-1 text-sm">
              <span>Made with</span>
              <Heart size={16} className="text-red-500 animate-pulse" />
              <span>and React</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default React.memo(Footer);
