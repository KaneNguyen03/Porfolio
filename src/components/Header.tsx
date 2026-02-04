import { motion } from "framer-motion";
import { Menu, Moon, Sun } from "lucide-react";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";
import { useIsMobile } from "../hooks/use-mobile";
import { useReducedMotion } from "../hooks/use-reduced-motion";
import { TRANSITION } from "../lib/motion";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

const NAVIGATION_ITEMS = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Projects", path: "/projects" },
  { name: "Experience", path: "/experience" },
  { name: "Contact", path: "/contact" },
];

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const isMobile = useIsMobile();
  const shouldReduceMotion = useReducedMotion();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  console.log("Header render (Static Shell)");

  const navClass = ({ isActive }: { isActive: boolean }) =>
    `relative inline-flex items-center px-3 py-2 text-sm font-semibold rounded-full transition-colors duration-200 ${
      isActive
        ? "text-sky-700 dark:text-sky-300 bg-sky-100/80 dark:bg-sky-900/50"
        : "text-slate-600 dark:text-slate-200 hover:text-sky-700 dark:hover:text-sky-300"
    }`;

  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="sticky top-0 z-50 w-full bg-white/85 dark:bg-slate-950/85 backdrop-blur-xl border-b border-slate-200/70 dark:border-slate-800/70"
    >
      <div className="container-width flex items-center justify-between h-16 px-4">
        <Link
          to="/"
          className="text-xl font-bold tracking-tight text-slate-900 dark:text-white"
        >
          Kane Nguyen
        </Link>

        {/* Desktop Nav - Using Library NavLink */}
        {!isMobile && (
          <nav className="hidden md:flex items-center space-x-2">
            {NAVIGATION_ITEMS.map((item) => (
              <NavLink key={item.name} to={item.path} className={navClass}>
                {item.name}
              </NavLink>
            ))}
          </nav>
        )}

        <div className="flex items-center space-x-4">
          <Button
            onClick={toggleTheme}
            variant="ghost"
            size="icon"
            className="rounded-full"
          >
            {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
          </Button>

          {/* Mobile Nav */}
          {isMobile && (
            <div className="md:hidden">
              <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu size={24} />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[85vw] pt-12">
                  <nav className="flex flex-col gap-2 mt-8">
                    {NAVIGATION_ITEMS.map((item) => (
                      <NavLink
                        key={item.name}
                        to={item.path}
                        className={navClass}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.name}
                      </NavLink>
                    ))}
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          )}
        </div>
      </div>
    </motion.header>
  );
}
