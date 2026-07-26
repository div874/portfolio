import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
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

  const handleConnectClick = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <BrowserRouter>
      <Preloader onComplete={() => setIsLoading(false)} />
      <ScrollToTop />
      <div className="portfolio-container font-inter">
        {/* Global Persistent WebGL Background */}
        <div id="canvas-container">
          <DarkVeil 
            hueShift={0} 
            noiseIntensity={0.08} 
            scanlineIntensity={0.2} 
            speed={1.5} 
            warpAmount={0.5} 
          />
        </div>

        {/* Main Website Content (Hidden during preloader so only WebGL wavy background + preloader is visible) */}
        <div style={{ opacity: isLoading ? 0 : 1, transition: 'opacity 0.6s ease', pointerEvents: isLoading ? 'none' : 'auto' }}>
          <Navbar />
          
          <main>
            <Routes>
              <Route path="/" element={<Home onConnectClick={handleConnectClick} />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/experience" element={<ExperiencePage />} />
              <Route path="/skills" element={<SkillsPage />} />
              <Route path="/cv" element={<CVPage />} />
            </Routes>
            <Contact />
          </main>

          <Footer />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
