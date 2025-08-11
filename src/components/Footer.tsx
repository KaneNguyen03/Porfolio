import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Linkedin, Mail, Phone, MapPin, Heart } from 'lucide-react';
import { portfolioData } from '../data/portfolio';

const Footer: React.FC = () => {
  const { personalInfo } = portfolioData;

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
      <div className="container-width py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Contact Info */}
          <div className="lg:col-span-2">
            <h3 className="text-xl font-bold mb-6 text-center md:text-left">Get In Touch</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-center md:justify-start space-x-3">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail size={18} className="text-white" />
                </div>
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="text-gray-300 hover:text-white transition-colors duration-200 text-sm md:text-base"
                >
                  {personalInfo.email}
                </a>
              </div>
              <div className="flex items-center justify-center md:justify-start space-x-3">
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
              <div className="flex items-center justify-center md:justify-start space-x-3">
                <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin size={18} className="text-white" />
                </div>
                <span className="text-gray-300 text-sm md:text-base">{personalInfo.location}</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <div className="space-y-3">
              {['About', 'Projects', 'Experience', 'Education', 'Contact'].map((link) => (
                <Link
                  key={link}
                  to={`/${link.toLowerCase()}`}
                  className="block text-gray-300 hover:text-white transition-colors duration-200 text-sm hover:transform hover:translate-x-1"
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                >
                  {link}
                </Link>
              ))}
            </div>
          </div>

          {/* Social Links */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold mb-6">Connect</h3>
            <div className="flex justify-center md:justify-start space-x-4">
              {socialLinks.map((social) => {
                const IconComponent = social.icon;
                
                if (social.external) {
                  return (
                    <a
                      key={social.label}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-12 h-12 bg-gray-800 ${social.color} rounded-lg flex items-center justify-center transition-all duration-200 transform hover:scale-110 hover:-translate-y-1 group`}
                      aria-label={social.label}
                    >
                      <IconComponent
                        size={20}
                        className="text-gray-300 group-hover:text-white transition-colors duration-200"
                      />
                    </a>
                  );
                } else {
                  return (
                    <Link
                      key={social.label}
                      to={social.url}
                      className={`w-12 h-12 bg-gray-800 ${social.color} rounded-lg flex items-center justify-center transition-all duration-200 transform hover:scale-110 hover:-translate-y-1 group`}
                      aria-label={social.label}
                      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    >
                      <IconComponent
                        size={20}
                        className="text-gray-300 group-hover:text-white transition-colors duration-200"
                      />
                    </Link>
                  );
                }
              })}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <p className="text-gray-400 flex items-center justify-center space-x-2 text-sm">
              <span>&copy; 2025 {personalInfo.name}. All rights reserved.</span>
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

export default Footer;
