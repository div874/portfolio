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
            marginBottom: '10px'
          }}>
            <span className="accent-text">AI, AUTOMATION & DIGITAL MARKETING</span>
          </h2>
          <p style={{
            color: 'var(--text-secondary)',
            fontSize: 'clamp(0.9rem, 1.2vw, 1.1rem)',
            fontWeight: 400,
            marginBottom: '20px',
            lineHeight: 1.5,
            maxWidth: '90%'
          }}>
            I build AI-powered applications, automate workflows, and use data-driven marketing to solve real business problems.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '30px', maxWidth: '90%' }}>
            {['Generative AI', 'LLMs', 'Python', 'AI Automation', 'SEO', 'Analytics'].map((tag) => (
              <span
                key={tag}
                style={{
                  display: 'inline-block',
                  padding: '5px 14px',
                  borderRadius: '999px',
                  border: '1px solid var(--text-secondary)',
                  color: 'var(--text-secondary)',
                  fontSize: 'clamp(0.7rem, 1vw, 0.85rem)',
                  fontWeight: 500,
                  letterSpacing: '0.02em',
                  transition: 'all 0.2s ease',
                  cursor: 'default',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLSpanElement).style.color = 'var(--text-primary)';
                  (e.currentTarget as HTMLSpanElement).style.borderColor = 'var(--text-primary)';
                  (e.currentTarget as HTMLSpanElement).style.background = 'rgba(0,0,0,0.05)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLSpanElement).style.color = 'var(--text-secondary)';
                  (e.currentTarget as HTMLSpanElement).style.borderColor = 'var(--text-secondary)';
                  (e.currentTarget as HTMLSpanElement).style.background = 'transparent';
                }}
              >
                {tag}
              </span>
            ))}
          </div>

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
              Explore My Work →
            </Link>

            <a
              href="/Divyansh_Chandra_Resume.pdf"
              download="Divyansh_Chandra_Resume.pdf"
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
              Download CV <Download size={16} />
            </a>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 1, y: 20 }}
          animate={{ opacity: 1, scale: 1.2, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          style={{ position: 'relative', zIndex: 5, display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
          <img src="/mascot_original.png" alt="Mascot Avatar" className="hero-mascot" style={{ display: 'block' }} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
          style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
        >
          <div style={{ marginBottom: '50px' }}>
            <p style={{ color: 'var(--text-secondary)', fontSize: 'clamp(1rem, 2vw, 1.2rem)', marginBottom: '10px', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase' }}>
              You've spent
            </p>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', marginBottom: '10px' }}>
              <Counter
                value={seconds}
                places={seconds >= 1000 ? [1000, 100, 10, 1] : [100, 10, 1]}
                fontSize={80}
                padding={0}
                gap={5}
                textColor="var(--text-primary)"
                fontWeight="800"
              />
              <span style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', color: 'var(--text-primary)', fontWeight: 700, letterSpacing: '-0.02em' }}>SECONDS</span>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: 'clamp(1rem, 1.8vw, 1.2rem)', marginTop: '0', fontWeight: 500 }}>
              Getting to know me.
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
