import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Contact from './components/Contact';
import Footer from './components/Footer';
import DarkVeil from './components/DarkVeil';
import ScrollToTop from './components/ScrollToTop';
import Preloader from './components/Preloader';

import Home from './pages/Home';
import ProjectsPage from './pages/ProjectsPage';
import ExperiencePage from './pages/ExperiencePage';
import SkillsPage from './pages/SkillsPage';
import CVPage from './pages/CVPage';

function App() {
  const [isLoading, setIsLoading] = useState(true);

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
    window.scrollTo(0, 0);
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
        {/* Global Persistent WebGL Background (hidden during preloader to prevent blue shader/scrollbar leaks) */}
        <div 
          id="canvas-container"
          style={{ 
            opacity: isLoading ? 0 : 1, 
            transition: 'opacity 0.8s ease',
            pointerEvents: 'none'
          }}
        >
          <DarkVeil 
            hueShift={0} 
            noiseIntensity={0.08} 
            scanlineIntensity={0.2} 
            speed={1.5} 
            warpAmount={0.5} 
          />
        </div>

        {/* Luxury Smooth Zoom & Fade Reveal into Home Page */}
        <motion.div
          initial={{ opacity: 0, scale: 1.02 }}
          animate={{
            opacity: isLoading ? 0 : 1,
            scale: isLoading ? 1.02 : 1
          }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          style={{ pointerEvents: isLoading ? 'none' : 'auto' }}
        >
          <Navbar />
          
          <main>
            <Routes>
              <Route path="/" element={<Home onConnectClick={handleConnectClick} isLoading={isLoading} />} />
              <Route path="/projects" element={<ProjectsPage />} />
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
