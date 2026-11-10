"use client";

import { Menu, Moon, Sun } from "lucide-react";
import { memo, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import logoImage from "../assets/logo.webp";
import { useLanguage } from "../contexts/LanguageContext";
import { useTheme } from "../contexts/ThemeContext";
import { useTranslation } from "../i18n/useTranslation";
import { NAV_ITEMS } from "../lib/navigation";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

const navClass = ({ isActive }: { isActive: boolean }) =>
  `relative inline-flex items-center px-4 py-2 text-sm font-semibold rounded-full transition-colors ${
    isActive
      ? "text-indigo-700 dark:text-indigo-200 bg-gradient-to-r from-indigo-50 to-sky-50 dark:from-indigo-950/60 dark:to-sky-950/60 ring-1 ring-inset ring-indigo-200/70 dark:ring-indigo-800/60"
      : "text-slate-600 dark:text-slate-200 hover:text-indigo-700 dark:hover:text-indigo-300 hover:bg-slate-100/70 dark:hover:bg-slate-800/60"
  }`;

const mobileNavClass = ({ isActive }: { isActive: boolean }) =>
  `flex items-center px-4 py-3 text-lg font-medium transition-colors rounded-lg ${
    isActive
      ? "bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300"
      : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900"
  }`;

const ThemeToggle = memo(() => {
  const { theme, toggleTheme } = useTheme();
  const { t } = useTranslation();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="rounded-full"
      aria-label={theme === "light" ? t.common.switchToDark : t.common.switchToLight}
    >
      {theme === "light" ? (
        <Moon size={20} className="text-slate-700" />
      ) : (
        <Sun size={20} className="text-yellow-400" />
      )}
    </Button>
  );
});

const LanguageToggle = memo(() => {
  const { language, setLanguage } = useLanguage();

  return (
    <div
      className="flex items-center rounded-full bg-slate-100 dark:bg-slate-800 p-0.5"
      role="group"
      aria-label="Language"
    >
      {(["en", "vi"] as const).map((lang) => (
        <button
          key={lang}
          type="button"
          onClick={() => setLanguage(lang)}
          aria-pressed={language === lang}
          className={`px-2.5 py-1.5 min-h-8 text-xs font-bold rounded-full transition-colors ${
            language === lang
              ? "bg-white dark:bg-slate-950 text-indigo-700 dark:text-indigo-300 shadow-sm"
              : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
          }`}
        >
          {lang.toUpperCase()}
        </button>
      ))}
    </div>
  );
});

const MobileNav = memo(() => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useTranslation();

  return (
    <div className="md:hidden">
      <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="rounded-full" aria-label={t.common.openMenu}>
            <Menu size={24} />
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="p-6">
          <nav className="flex flex-col gap-2 mt-8">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={mobileNavClass}
                onClick={() => setIsMenuOpen(false)}
              >
                {t.nav[item.key]}
              </NavLink>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
});

const Logo = memo(() => (
  <Link to="/" className="flex items-center" aria-label="Kane Nguyen — Home">
    {/* Source artwork is black-on-transparent; invert in dark mode so the
        mark stays visible against the dark header background. */}
    <img
      src={logoImage}
      alt=""
      className="h-8 w-auto dark:invert"
      width={590}
      height={181}
    />
  </Link>
));

const DesktopNav = memo(() => {
  const { t } = useTranslation();
  return (
    <nav className="hidden md:flex items-center space-x-1">
      {NAV_ITEMS.map((item) => (
        <NavLink key={item.path} to={item.path} className={navClass}>
          {t.nav[item.key]}
        </NavLink>
      ))}
    </nav>
  );
});

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border-b border-slate-200/70 dark:border-slate-800/70 shadow-[0_1px_0_rgba(15,23,42,0.03)]">
      <div className="container-width flex items-center justify-between h-16 px-4">
        <Logo />
        <DesktopNav />
        <div className="flex items-center gap-2">
          <LanguageToggle />
          <ThemeToggle />
          <MobileNav />
        </div>
      </div>
    </header>
  );
};

export default memo(Header);
