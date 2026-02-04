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

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navClass = ({ isActive }: { isActive: boolean }) =>
    `relative inline-flex items-center px-4 py-2 text-sm font-semibold rounded-full transition-colors ${
      isActive
        ? "text-sky-700 dark:text-sky-300 bg-sky-100/80 dark:bg-sky-900/50"
        : "text-slate-600 dark:text-slate-200 hover:text-sky-700 dark:hover:text-sky-300"
    }`;

  const mobileNavClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center w-full px-6 py-4 text-base font-bold rounded-2xl transition-colors ${
      isActive
        ? "text-sky-700 dark:text-sky-300 bg-sky-100/80 dark:bg-sky-900/50"
        : "text-slate-600 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
    }`;

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 dark:bg-slate-950/95 border-b border-slate-200 dark:border-slate-800">
      <div className="container-width flex items-center justify-between h-16 px-4">
        <Link
          to="/"
          className="text-xl font-black tracking-tighter text-slate-900 dark:text-white"
        >
          KANE.DEV
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-1">
          {NAVIGATION_ITEMS.map((item) => (
            <NavLink key={item.name} to={item.path} className={navClass}>
              {item.name}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
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

          {/* Mobile Nav Trigger */}
          <div className="md:hidden">
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full"
                >
                  <Menu size={24} />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="p-0">
                <div className="flex flex-col h-full">
                  <div className="p-6 border-b border-slate-100 dark:border-slate-900">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                      Navigation
                    </p>
                  </div>
                  <nav className="flex-1 px-4 py-6 flex flex-col gap-1">
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
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default memo(Header);
