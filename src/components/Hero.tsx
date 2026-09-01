import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Download } from 'lucide-react';
import Counter from './Counter';

interface HeroProps {
  onConnectClick: () => void;
  isLoading?: boolean;
}

const Hero = ({ onConnectClick }: HeroProps) => {
  const [seconds, setSeconds] = useState(() => {
    const startTime = sessionStorage.getItem('siteStartTime');
    if (!startTime) {
      sessionStorage.setItem('siteStartTime', Date.now().toString());
      return 0;
    }
    return Math.floor((Date.now() - parseInt(startTime, 10)) / 1000);
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const startTime = sessionStorage.getItem('siteStartTime');
      if (startTime) {
        setSeconds(Math.floor((Date.now() - parseInt(startTime, 10)) / 1000));
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="section" id="home" style={{ minHeight: 'calc(100vh - 80px)', display: 'flex', alignItems: 'center', paddingTop: '80px', paddingBottom: '40px' }}>
      <div className="content-wrapper hero-grid" style={{ width: '100%' }}>
        <div style={{ zIndex: 10, position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
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
            <span style={{ color: '#555555' }}>CHANDRA</span>
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


          <div className="hero-buttons">
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

        <motion.div
          initial={{ opacity: 0, scale: 1, y: 20 }}
          animate={{ opacity: 1, scale: 1.2, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          style={{ position: 'relative', zIndex: 5, display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
          <img src="/mascot_full.png" alt="Mascot Avatar" className="hero-mascot" style={{ display: 'block' }} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
          style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
        >
          <div style={{ marginBottom: '50px' }}>
            <p style={{ color: 'var(--text-secondary)', fontSize: 'clamp(1rem, 2vw, 1.2rem)', marginBottom: '10px', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase' }}>
              YOU SPENT
            </p>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', marginBottom: '10px' }}>
              <Counter
                value={seconds}
                places={[100, 10, 1]}
                fontSize={80}
                padding={0}
                gap={5}
                textColor="var(--text-primary)"
                fontWeight="800"
              />
              <span style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', color: 'var(--text-primary)', fontWeight: 700, letterSpacing: '-0.02em' }}>SECONDS</span>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: 'clamp(1rem, 1.8vw, 1.2rem)', marginTop: '0', fontWeight: 500 }}>
              to know about me.
            </p>
          </div>

          <div>
            <p style={{ color: 'var(--text-primary)', fontWeight: 600, fontSize: 'clamp(1.1rem, 2vw, 1.3rem)', marginBottom: '20px' }}>
              If you liked my work
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              onClick={onConnectClick}
              style={{
                width: 'fit-content',
                padding: '16px 40px',
                borderRadius: '50px',
                border: 'none',
                background: '#171717',
                color: '#ffffff',
                fontSize: '1.25rem',
                fontWeight: 600,
                cursor: 'pointer',
                boxShadow: '0 4px 14px rgba(0, 0, 0, 0.1)'
              }}
            >
              Let's Connect
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
