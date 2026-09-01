import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Preloader from './components/Preloader';
import ShapeGrid from './components/ShapeGrid';

import Home from './pages/Home';
import ProjectsPage from './pages/ProjectsPage';
import ExperiencePage from './pages/ExperiencePage';
import SkillsPage from './pages/SkillsPage';
import CVPage from './pages/CVPage';
import AboutPage from './pages/AboutPage';
import ProjectDetailPage from './pages/ProjectDetailPage';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  // Manual scroll restoration & scroll to top immediately on initial mount
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, []);

  // Lock scroll overflow while preloader is active
  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isLoading]);

  const handlePreloaderComplete = () => {
    setIsLoading(false);
  };

  const handleConnectClick = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <BrowserRouter>
      <Preloader onComplete={handlePreloaderComplete} />
      <ScrollToTop />
      <div className="portfolio-container font-inter">

        {/* Clean, Sharp Crisp Fade Reveal into Home Page */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: isLoading ? 0 : 1
          }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          style={{ pointerEvents: isLoading ? 'none' : 'auto' }}
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
          <Navbar />
          
          <main>
            <Routes>
              <Route path="/" element={<Home onConnectClick={handleConnectClick} isLoading={isLoading} />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/projects/:slug" element={<ProjectDetailPage />} />
              <Route path="/experience" element={<ExperiencePage />} />
              <Route path="/skills" element={<SkillsPage />} />
              <Route path="/cv" element={<CVPage />} />
            </Routes>
            <Contact />
          </main>

          <Footer />
        </motion.div>
      </div>
    </BrowserRouter>
  );
}

export default App;
