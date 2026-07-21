import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Contact from './components/Contact';
import Footer from './components/Footer';
import DarkVeil from './components/DarkVeil';
import ScrollToTop from './components/ScrollToTop';

import Home from './pages/Home';
import ProjectsPage from './pages/ProjectsPage';
import ExperiencePage from './pages/ExperiencePage';
import SkillsPage from './pages/SkillsPage';
import CVPage from './pages/CVPage';

function App() {
  const handleConnectClick = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <BrowserRouter>
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
    </BrowserRouter>
  );
}

export default App;
