import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Download } from 'lucide-react';

interface HeroProps {
  onConnectClick: () => void;
  isLoading?: boolean;
}

const Hero = ({ onConnectClick }: HeroProps) => {
  return (
    <section className="section" id="home" style={{ minHeight: 'calc(100vh - 80px)', display: 'flex', alignItems: 'center', paddingTop: '80px', paddingBottom: '40px' }}>
      <div className="content-wrapper" style={{ maxWidth: '800px' }}>
        <div style={{ zIndex: 10, position: 'relative' }}>
          <p style={{ color: 'var(--text-secondary)', fontSize: 'clamp(1rem, 2vw, 1.2rem)', marginBottom: '10px', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase' }}>
            HELLO! I'M
          </p>

          <h1 style={{ 
            fontFamily: '"Outfit", sans-serif',
            fontSize: 'clamp(2.8rem, 8vw, 7rem)', 
            lineHeight: 1.05,
            fontWeight: 800,
            letterSpacing: '-0.02em',
            marginBottom: '20px',
            color: 'var(--text-primary)'
          }}>
            DIVYANSH
            <br />
            <span className="accent-text">CHANDRA</span>
          </h1>

          <h2 style={{ 
            fontFamily: '"Outfit", sans-serif',
            fontSize: 'clamp(1.2rem, 3vw, 2.2rem)', 
            fontWeight: 600, 
            letterSpacing: '0.02em',
            color: 'var(--text-primary)', 
            marginBottom: '30px' 
          }}>
            <span className="accent-text">SEO Strategist & Growth Marketer</span>
          </h2>
          
          <p style={{ 
            color: 'var(--text-secondary)', 
            fontSize: 'clamp(1rem, 1.8vw, 1.15rem)', 
            lineHeight: 1.7, 
            marginBottom: '30px',
            fontWeight: 400
          }}>
            I drive measurable growth through data-backed SEO, performance optimization, and marketing automation. Recently helped scale 1page.info across 12+ verticals with 35%+ organic traffic increases.
          </p>
          
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginTop: '40px', alignItems: 'center' }}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              onClick={onConnectClick}
              style={{
                padding: '14px 28px',
                borderRadius: '50px',
                border: 'none',
                background: 'linear-gradient(to right, var(--accent-color), var(--accent-secondary))',
                color: 'white',
                fontSize: '1rem',
                fontWeight: 600,
                cursor: 'pointer',
                boxShadow: '0 10px 20px rgba(59, 130, 246, 0.3)'
              }}
            >
              Let's Connect
            </motion.button>

            <Link
              to="/projects"
              style={{
                color: 'var(--text-primary)',
                textDecoration: 'none',
                fontWeight: 600,
                fontSize: '1rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              View My Work →
            </Link>

            <a
              href="https://divyanshchandra.online/Divyansh%20Chandra%20Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: 'var(--text-secondary)',
                textDecoration: 'none',
                fontWeight: 600,
                fontSize: '1rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                marginLeft: '10px'
              }}
            >
              Download Resume <Download size={16} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
