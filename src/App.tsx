import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import ShapeGrid from './components/ShapeGrid';

import { Suspense, lazy } from 'react';
import Home from './pages/Home';

// Lazy loaded routes
const ProjectsPage = lazy(() => import('./pages/ProjectsPage'));
const ExperiencePage = lazy(() => import('./pages/ExperiencePage'));
const SkillsPage = lazy(() => import('./pages/SkillsPage'));
const CVPage = lazy(() => import('./pages/CVPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ProjectDetailPage = lazy(() => import('./pages/ProjectDetailPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));
const JourneyPage = lazy(() => import('./pages/JourneyPage'));
const JourneyArticle = lazy(() => import('./pages/JourneyArticle'));
const AdminLogin = lazy(() => import('./pages/AdminLogin').then(module => ({ default: module.AdminLogin })));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard').then(module => ({ default: module.AdminDashboard })));
const AdminEditor = lazy(() => import('./pages/AdminEditor').then(module => ({ default: module.AdminEditor })));

import { useLocation } from 'react-router-dom';

function AppLayout() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  const handleConnectClick = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="portfolio-container font-inter">
      {/* Clean, Sharp Crisp Fade Reveal into Home Page */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -1 }}>
          <ShapeGrid 
            speed={0.5} 
            squareSize={50}
            direction='diagonal'
            borderColor='#F0F0F0'
            hoverFillColor='#F9F9F9'
            shape='square'
            hoverTrailAmount={5}
          />
        </div>
        
        {!isAdmin && <Navbar />}
        
        <main>
          <Suspense fallback={<div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading...</div>}>
            <Routes>
              <Route path="/" element={<Home onConnectClick={handleConnectClick} />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/projects/:slug" element={<ProjectDetailPage />} />
              <Route path="/experience" element={<ExperiencePage />} />
              <Route path="/skills" element={<SkillsPage />} />
              <Route path="/journey" element={<JourneyPage />} />
              <Route path="/journey/:slug" element={<JourneyArticle />} />
              <Route path="/cv" element={<CVPage />} />
              <Route path="/admin" element={<AdminLogin />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/edit" element={<AdminEditor />} />
              <Route path="/admin/edit/:id" element={<AdminEditor />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
          {!isAdmin && <Contact />}
        </main>

        {!isAdmin && <Footer />}
      </motion.div>
    </div>
  );
}

function App() {
  // Manual scroll restoration & scroll to top immediately on initial mount
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, []);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <AppLayout />
    </BrowserRouter>
  );
}

export default App;
