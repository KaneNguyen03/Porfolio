import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { memo } from "react";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  useLocation,
  useNavigationType,
} from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { LanguageProvider } from "./contexts/LanguageContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import AboutPage from "./pages/AboutPage";
import BlogPage from "./pages/BlogPage";
import BlogPostPage from "./pages/BlogPostPage";
import ContactPage from "./pages/ContactPage";
import EducationPage from "./pages/EducationPage";
import ExperiencePage from "./pages/ExperiencePage";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import ProjectsPage from "./pages/ProjectsPage";

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <LanguageProvider>
          <Router>
            <AppLayout />
          </Router>
        </LanguageProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

const PAGE_EASE = [0.16, 1, 0.3, 1] as const;

// Route-level transition: the outgoing page fades/blurs out, the incoming
// page rises in. Keyed on pathname so every navigation gets the effect.
const AnimatedRoutes = memo(() => {
  const location = useLocation();
  const navType = useNavigationType();
  const reduceMotion = useReducedMotion();

  // Opacity + translate only: animating CSS filter on the full-page wrapper
  // re-rasterises the whole document every frame and leaves a containing
  // block behind that breaks position:fixed / backdrop-filter descendants.
  const variants = {
    initial: { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -12 },
  };

  const handleExitComplete = () => {
    // Browser back/forward keeps native scroll restoration; only new
    // navigations jump to the top, instantly (not the smooth html scroll).
    if (navType !== "POP") window.scrollTo({ top: 0, behavior: "instant" });
    document.getElementById("main")?.focus({ preventScroll: true });
  };

  return (
    <AnimatePresence mode="wait" initial={false} onExitComplete={handleExitComplete}>
      <motion.div
        key={location.pathname}
        variants={variants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={reduceMotion ? { duration: 0 } : { duration: 0.3, ease: PAGE_EASE }}
        className="flex-1"
      >
        <Routes location={location}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/experience" element={<ExperiencePage />} />
          <Route path="/education" element={<EducationPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
});

const AppLayout = memo(() => {
  return (
    <div className="brand-backdrop min-h-screen flex flex-col bg-transparent transition-colors duration-300">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-full focus:bg-indigo-600 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
      >
        Skip to content
      </a>
      <Header />
      <main id="main" tabIndex={-1} className="flex-1 flex flex-col outline-none">
        <AnimatedRoutes />
      </main>
      <Footer />
    </div>
  );
});

export default App;
