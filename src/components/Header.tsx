"use client";

import { Menu, Moon, Sun } from "lucide-react";
import { memo, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

const NAVIGATION_ITEMS = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Projects", path: "/projects" },
  { name: "Experience", path: "/experience" },
  { name: "Contact", path: "/contact" },
];

const navClass = ({ isActive }: { isActive: boolean }) =>
  `relative inline-flex items-center px-4 py-2 text-sm font-semibold rounded-full transition-colors ${
    isActive
      ? "text-sky-700 dark:text-sky-300 bg-sky-100/80 dark:bg-sky-900/50"
      : "text-slate-600 dark:text-slate-200 hover:text-sky-700 dark:hover:text-sky-300"
  }`;

const mobileNavClass = ({ isActive }: { isActive: boolean }) =>
  `flex items-center px-4 py-3 text-lg font-medium transition-colors rounded-lg ${
    isActive
      ? "bg-slate-100 dark:bg-slate-800 text-sky-600 dark:text-sky-400"
      : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900"
  }`;

const ThemeToggle = memo(() => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="rounded-full"
      aria-label="Toggle theme"
    >
      {theme === "light" ? (
        <Moon size={20} className="text-slate-700" />
      ) : (
        <Sun size={20} className="text-yellow-400" />
      )}
    </Button>
  );
});

const MobileNav = memo(() => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="md:hidden">
      <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Menu size={24} />
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="p-6">
          <nav className="flex flex-col gap-2 mt-8">
            {NAVIGATION_ITEMS.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={mobileNavClass}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </NavLink>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
});

const Logo = memo(() => (
  <Link
    to="/"
    className="text-xl font-black tracking-tighter text-slate-900 dark:text-white"
  >
    KANE.DEV
  </Link>
));

const DesktopNav = memo(() => (
  <nav className="hidden md:flex items-center space-x-1">
    {NAVIGATION_ITEMS.map((item) => (
      <NavLink key={item.name} to={item.path} className={navClass}>
        {item.name}
      </NavLink>
    ))}
  </nav>
));

const Header = () => {
  console.log("🏙️ [Render] Header");
  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 dark:bg-slate-950/95 border-b border-slate-200 dark:border-slate-800">
      <div className="container-width flex items-center justify-between h-16 px-4">
        <Logo />
        <DesktopNav />
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <MobileNav />
        </div>
      </div>
    </header>
  );
};

export default memo(Header);
