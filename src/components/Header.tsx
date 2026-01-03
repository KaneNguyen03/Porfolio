import React, { startTransition, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon, ArrowUpRight } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { portfolioData } from '../data/portfolio';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { TRANSITION } from '../lib/motion';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    // Avoid mobile menu re-animating/lingering across route changes.
    if (!isMenuOpen) return;
    startTransition(() => setIsMenuOpen(false));
  }, [location.pathname, isMenuOpen]);

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
      initial={{ y: shouldReduceMotion ? 0 : -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={shouldReduceMotion ? { duration: 0 } : TRANSITION.base}
      className="sticky top-0 z-50 w-full bg-white/85 dark:bg-slate-950/85 backdrop-blur-xl border-b border-slate-200/70 dark:border-slate-800/70 shadow-lg shadow-slate-900/10"
    >
      <div className="bg-linear-to-r from-sky-50/70 via-emerald-50/70 to-amber-50/70 dark:from-slate-900 dark:via-slate-900 dark:to-slate-900 border-b border-slate-200/60 dark:border-slate-800/60">
        <div className="container-width py-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-700 dark:text-slate-200">
            <Badge variant="emerald">Open to Junior/Middle roles</Badge>
            <span className="hidden md:inline-flex items-center gap-2 font-semibold">
              <motion.span
                className="w-2 h-2 bg-emerald-500 rounded-full"
                animate={
                  shouldReduceMotion
                    ? undefined
                    : { opacity: [0.6, 1, 0.6], scale: [0.95, 1.15, 0.95] }
                }
                transition={shouldReduceMotion ? { duration: 0 } : { duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
              />
              Software Engineer @ Bizzi
            </span>
            <span className="md:hidden font-semibold">Software Engineer @ Bizzi</span>
          </div>
          <div className="flex items-center gap-3 text-xs sm:text-sm">
            <Button asChild size="sm" className="rounded-full shadow-lg shadow-sky-500/25 hover:shadow-sky-500/40">
              <Link to="/contact">
                Let's talk
                <ArrowUpRight size={16} />
              </Link>
            </Button>
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
          <motion.div
            whileHover={shouldReduceMotion ? undefined : { y: -1 }}
            transition={TRANSITION.fast}
          >
            <Link
              to="/"
              className="text-xl font-bold tracking-tight bg-(--brand-hero) bg-clip-text text-transparent"
            >
              Kane Nguyen
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-2">
            {navigationItems.map((item) => (
              <motion.div
                key={item.name}
                whileHover={shouldReduceMotion ? undefined : { y: -1 }}
                whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
                transition={TRANSITION.fast}
              >
                <Link
                  to={item.path}
                  className={`relative inline-flex items-center px-3 py-2 text-sm font-semibold rounded-full transition-colors duration-200 ${
                    isActivePath(item.path)
                      ? 'text-sky-700 dark:text-sky-300'
                      : 'text-slate-600 dark:text-slate-200 hover:text-sky-700 dark:hover:text-sky-300'
                  }`}
                >
                  {isActivePath(item.path) && (
                    <motion.span
                      layoutId="activeTab"
                      className="absolute inset-0 rounded-full bg-sky-100/80 dark:bg-sky-900/50 shadow-sm shadow-sky-900/20"
                      transition={TRANSITION.base}
                    />
                  )}
                  <span
                    className={`relative z-10 rounded-full px-0.5 py-0.5 ${
                      isActivePath(item.path)
                        ? ''
                        : 'hover:bg-slate-100/60 dark:hover:bg-slate-800/60'
                    }`}
                  >
                    {item.name}
                  </span>
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Theme Toggle and Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            <Button
              onClick={toggleTheme}
              variant="secondary"
              size="icon"
              className="shadow-inner"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </Button>

            <Button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              variant="secondary"
              size="icon"
              className="md:hidden"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </Button>
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
            transition={shouldReduceMotion ? { duration: 0 } : TRANSITION.fast}
            className="md:hidden bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl border-t border-slate-200 dark:border-slate-800 shadow-lg"
          >
            <motion.nav
              className="container-width py-4"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: shouldReduceMotion
                    ? { duration: 0 }
                    : { staggerChildren: 0.05, delayChildren: 0.05 }
                }
              }}
            >
              {navigationItems.map((item) => (
                <motion.div
                  key={item.name}
                  variants={{
                    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 6 },
                    visible: { opacity: 1, y: 0, transition: TRANSITION.fast }
                  }}
                >
                  <Link
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`block rounded-xl px-3 py-2 text-sm font-semibold transition-colors duration-200 ${
                      isActivePath(item.path)
                        ? 'text-sky-700 dark:text-sky-300 bg-sky-50/80 dark:bg-sky-900/30'
                        : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100/70 dark:hover:bg-slate-800/60'
                    }`}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
