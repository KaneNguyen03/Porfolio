import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, Sun, Moon, ArrowUpRight } from "lucide-react";
import { Sheet, SheetTrigger, SheetContent } from "./ui/sheet";
import { useTheme } from "../contexts/ThemeContext";
import { motion } from "framer-motion";
import { useReducedMotion } from "../hooks/use-reduced-motion";
import { portfolioData } from "../data/portfolio";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { TRANSITION } from "../lib/motion";

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const shouldReduceMotion = useReducedMotion();

  const navigationItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Projects", path: "/projects" },
    { name: "Experience", path: "/experience" },
    { name: "Contact", path: "/contact" },
  ];

  const isActivePath = (path: string) => location.pathname === path;

  const { personalInfo } = portfolioData;

  return (
    <motion.header
      initial={{ y: shouldReduceMotion ? 0 : -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={shouldReduceMotion ? { duration: 0 } : TRANSITION.base}
      className="sticky top-0 z-50 w-full bg-white/85 dark:bg-slate-950/85 backdrop-blur-xl border-b border-slate-200/70 dark:border-slate-800/70 shadow-lg shadow-slate-900/10"
    >
      {/* Top Bar */}
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
                transition={{
                  duration: 2.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              Software Engineer @ Bizzi
            </span>
            <span className="md:hidden font-semibold">SWE @ Bizzi</span>
          </div>
          <div className="flex items-center gap-3 text-xs sm:text-sm">
            <Button
              asChild
              size="sm"
              className="rounded-full shadow-lg h-8 shadow-sky-500/25 hover:shadow-sky-500/40"
            >
              <Link to="/contact">
                Let's talk
                <ArrowUpRight size={16} />
              </Link>
            </Button>
            <a
              href={`mailto:${personalInfo.email}`}
              className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 font-semibold hover:border-sky-300 dark:hover:border-sky-500"
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
            className="z-50"
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
                      ? "text-sky-700 dark:text-sky-300"
                      : "text-slate-600 dark:text-slate-200 hover:text-sky-700 dark:hover:text-sky-300"
                  }`}
                >
                  {isActivePath(item.path) && (
                    <motion.span
                      layoutId="activeTab"
                      className="absolute inset-0 rounded-full bg-sky-100/80 dark:bg-sky-900/50 shadow-sm shadow-sky-900/20"
                      transition={TRANSITION.base}
                    />
                  )}
                  <span className="relative z-10">{item.name}</span>
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Actions & Mobile Menu */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            <Button
              onClick={toggleTheme}
              variant="secondary"
              size="icon"
              className="rounded-full w-9 h-9 sm:w-10 sm:h-10 shadow-inner"
              aria-label="Toggle theme"
            >
              {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
            </Button>

            {/* Mobile Sheet */}
            <div className="md:hidden">
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="w-10 h-10 -mr-2"
                  >
                    <Menu size={24} />
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side="right"
                  className="w-[85vw] sm:w-[380px] pt-12"
                >
                  <nav className="flex flex-col gap-2 mt-8">
                    {navigationItems.map((item) => (
                      <Link
                        key={item.name}
                        to={item.path}
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center px-4 py-4 text-lg font-medium rounded-xl transition-all active:scale-[0.98] ${
                          isActivePath(item.path)
                            ? "bg-sky-50 dark:bg-sky-900/20 text-sky-700 dark:text-sky-300"
                            : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                        }`}
                      >
                        {item.name}
                      </Link>
                    ))}
                    <div className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-800">
                      <Button
                        asChild
                        className="w-full rounded-xl h-12 text-lg shadow-lg shadow-sky-500/20"
                      >
                        <Link to="/contact" onClick={() => setIsOpen(false)}>
                          Let's work together
                          <ArrowUpRight className="ml-2" size={20} />
                        </Link>
                      </Button>
                    </div>
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
