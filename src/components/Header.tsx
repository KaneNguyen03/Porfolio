import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon, ArrowUpRight } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import { portfolioData } from '../data/portfolio';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  const navigationItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Projects', path: '/projects' },
    { name: 'Experience', path: '/experience' },
    { name: 'Education', path: '/education' },
    { name: 'Contact', path: '/contact' }
  ];

  const isActivePath = (path: string) => {
    return location.pathname === path;
  };

  const { personalInfo } = portfolioData;

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className="sticky top-0 z-50 w-full bg-white/85 dark:bg-slate-950/85 backdrop-blur-xl border-b border-slate-200/70 dark:border-slate-800/70 shadow-lg shadow-slate-900/10"
    >
      <div className="bg-gradient-to-r from-sky-50/70 via-emerald-50/70 to-amber-50/70 dark:from-slate-900 dark:via-slate-900 dark:to-slate-900 border-b border-slate-200/60 dark:border-slate-800/60">
        <div className="container-width py-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-700 dark:text-slate-200">
            <span className="pill">Open to Junior/Middle roles</span>
            <span className="hidden md:inline-flex items-center gap-2 font-semibold">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
              Software Engineer @ Bizzi
            </span>
            <span className="md:hidden font-semibold">Software Engineer @ Bizzi</span>
          </div>
          <div className="flex items-center gap-3 text-xs sm:text-sm">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-sky-600 text-white font-semibold shadow-lg shadow-sky-500/25 hover:shadow-sky-500/40"
            >
              Let’s talk
              <ArrowUpRight size={16} />
            </Link>
            <a
              href={`mailto:${personalInfo.email}`}
              className="hidden sm:inline-flex items-center gap-2 px-3 py-2 rounded-full bg-white/90 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 font-semibold hover:border-sky-300 dark:hover:border-sky-500"
            >
              {personalInfo.email}
            </a>
          </div>
        </div>
      </div>

      <div className="container-width">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
            Kane Nguyen
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-2">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`relative inline-flex items-center px-3 py-2 text-sm font-semibold rounded-full transition-all duration-200 ${
                  isActivePath(item.path)
                    ? 'text-sky-700 dark:text-sky-300 bg-sky-100/80 dark:bg-sky-900/50 shadow-sm shadow-sky-900/20'
                    : 'text-slate-600 dark:text-slate-200 hover:text-sky-700 dark:hover:text-sky-300 hover:bg-slate-100/60 dark:hover:bg-slate-800/60'
                }`}
              >
                {item.name}
                {isActivePath(item.path) && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 rounded-full bg-sky-200/50 dark:bg-sky-800/40"
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Theme Toggle and Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors duration-200 shadow-inner"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors duration-200"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl border-t border-slate-200 dark:border-slate-800 shadow-lg"
          >
            <nav className="container-width py-4">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block py-2 text-sm font-medium transition-colors duration-200 ${
                    isActivePath(item.path)
                      ? 'text-blue-600 dark:text-blue-400'
                      : 'text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
