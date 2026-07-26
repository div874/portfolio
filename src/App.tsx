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
        {/* Global Persistent WebGL Background */}
        <div 
          id="canvas-container"
          style={{ 
            opacity: isLoading ? 0 : 1, 
            transition: 'opacity 0.5s ease',
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

        {/* Clean, Sharp Crisp Fade Reveal into Home Page */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: isLoading ? 0 : 1
          }}
          transition={{ duration: 0.4, ease: "easeOut" }}
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
