import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { Suspense, lazy, useLayoutEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ThemeProvider } from "./contexts/ThemeContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LoadingSpinner from "./components/LoadingSpinner";
import ErrorBoundary from "./components/ErrorBoundary";
import { pageVariants, TRANSITION } from "./lib/motion";
import { useReducedMotion } from "./hooks/use-reduced-motion";
import { useIsMobile } from "./hooks/use-mobile";

// Lazy load pages for better performance
// Note: React 19 and modern bundlers handle prefetching strategies better.
// We removed the manual requestIdleCallback polyfill as it's often unnecessary with modern scheduler.
const HomePage = lazy(() => import("./pages/HomePage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const ProjectsPage = lazy(() => import("./pages/ProjectsPage"));
const ExperiencePage = lazy(() => import("./pages/ExperiencePage"));
const EducationPage = lazy(() => import("./pages/EducationPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <Router>
          <AppLayout />
        </Router>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

function AppLayout() {
  const location = useLocation();
  const shouldReduceMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const variants = pageVariants();

  // Disable page transitions on mobile for better UX
  const shouldAnimate = !isMobile && !shouldReduceMotion;

  // Eliminate layout shift/flicker by ensuring scroll resets before paint.
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="brand-backdrop min-h-screen flex flex-col bg-transparent transition-colors duration-300">
      <Header />
      <main className="flex-1 flex flex-col">
        <div className="flex flex-col flex-1">
          <AnimatePresence initial={false} mode="wait">
            <motion.div
              key={location.pathname}
              className="flex-1"
              initial={shouldAnimate ? "initial" : undefined}
              animate={shouldAnimate ? "animate" : undefined}
              exit={shouldAnimate ? "exit" : undefined}
              variants={shouldAnimate ? variants : undefined}
              transition={shouldAnimate ? TRANSITION.base : { duration: 0 }}
            >
              <Suspense
                fallback={
                  <LoadingSpinner className="flex-1" label="Loading page…" />
                }
              >
                <Routes location={location}>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/projects" element={<ProjectsPage />} />
                  <Route path="/experience" element={<ExperiencePage />} />
                  <Route path="/education" element={<EducationPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                </Routes>
              </Suspense>
            </motion.div>
          </AnimatePresence>
        </div>

        <Footer />
      </main>
    </div>
  );
}

export default App;
