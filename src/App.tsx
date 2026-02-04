import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { useLayoutEffect } from "react";
import { ThemeProvider } from "./contexts/ThemeContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ErrorBoundary from "./components/ErrorBoundary";

// Import pages directly for better mobile UX (no lazy loading delays)
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ProjectsPage from "./pages/ProjectsPage";
import ExperiencePage from "./pages/ExperiencePage";
import EducationPage from "./pages/EducationPage";
import ContactPage from "./pages/ContactPage";

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

  // Eliminate layout shift/flicker by ensuring scroll resets before paint.
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="brand-backdrop min-h-screen flex flex-col bg-transparent transition-colors duration-300">
      <Header />
      <main className="flex-1 flex flex-col">
        <div className="flex flex-col flex-1">
          <div key={location.pathname} className="flex-1">
            <Routes location={location}>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/experience" element={<ExperiencePage />} />
              <Route path="/education" element={<EducationPage />} />
              <Route path="/contact" element={<ContactPage />} />
            </Routes>
          </div>
        </div>

        <Footer />
      </main>
    </div>
  );
}

export default App;
