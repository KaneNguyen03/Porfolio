import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Suspense, lazy, useEffect, useMemo } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ThemeProvider } from './contexts/ThemeContext';
import Header from './components/Header';
import Footer from './components/Footer';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorBoundary from './components/ErrorBoundary';
import { pageVariants, TRANSITION } from './lib/motion';

// Lazy load pages for better performance
const loadHomePage = () => import('./pages/HomePage');
const loadAboutPage = () => import('./pages/AboutPage');
const loadProjectsPage = () => import('./pages/ProjectsPage');
const loadExperiencePage = () => import('./pages/ExperiencePage');
const loadEducationPage = () => import('./pages/EducationPage');
const loadContactPage = () => import('./pages/ContactPage');

const HomePage = lazy(loadHomePage);
const AboutPage = lazy(loadAboutPage);
const ProjectsPage = lazy(loadProjectsPage);
const ExperiencePage = lazy(loadExperiencePage);
const EducationPage = lazy(loadEducationPage);
const ContactPage = lazy(loadContactPage);

function scheduleIdle(work: () => void) {
  if (typeof window === 'undefined') return;
  const w = window as unknown as {
    requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
    cancelIdleCallback?: (id: number) => void;
  };

  if (typeof w.requestIdleCallback === 'function') {
    const id = w.requestIdleCallback(work, { timeout: 1500 });
    return () => w.cancelIdleCallback?.(id);
  }

  const id = window.setTimeout(work, 350);
  return () => window.clearTimeout(id);
}

function canPrefetch() {
  if (typeof navigator === 'undefined') return false;
  const connection = (navigator as unknown as { connection?: { saveData?: boolean } }).connection;
  return !connection?.saveData;
}

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
  const variants = useMemo(() => pageVariants(shouldReduceMotion), [shouldReduceMotion]);

  useEffect(() => {
    if (!canPrefetch()) return;

    // Prefetch route chunks during idle time to prevent Suspense flashes on mobile.
    const cancel = scheduleIdle(() => {
      // Fire-and-forget; bundler caches these chunks.
      void loadAboutPage();
      void loadProjectsPage();
      void loadExperiencePage();
      void loadEducationPage();
      void loadContactPage();
    });

    return cancel;
  }, []);

  return (
    <div className="brand-backdrop min-h-screen flex flex-col bg-transparent transition-colors duration-300">
      <Header />
      <main className="flex-1 flex flex-col">
        <div className="flex flex-col flex-1">
          <AnimatePresence initial={false}>
            <motion.div
              key={location.pathname}
              className="flex-1"
              initial="initial"
              animate="animate"
              exit="exit"
              variants={variants}
              transition={shouldReduceMotion ? { duration: 0 } : TRANSITION.fast}
            >
              <Suspense fallback={<LoadingSpinner className="flex-1" label="Loading page…" />}>
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
