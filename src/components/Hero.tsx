'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Download, Mail } from 'lucide-react';
import { FaLinkedinIn, FaGithub, FaWhatsapp } from 'react-icons/fa6';
import Counter from './Counter';

interface HeroProps {
  onConnectClick?: () => void;
}

const Hero = ({ onConnectClick }: HeroProps) => {
  const [seconds, setSeconds] = useState(0);

  const handleConnect = () => {
    if (onConnectClick) {
      onConnectClick();
    } else {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    let startTime = Date.now();
    try {
      if (typeof window !== 'undefined') {
        const raw = sessionStorage.getItem('portfolioSiteStartTime_v3');
        const parsed = raw ? parseInt(raw, 10) : NaN;
        const now = Date.now();
        if (raw && !isNaN(parsed) && parsed > 0 && parsed <= now && (now - parsed) < 14400000) {
          startTime = parsed;
        } else {
          sessionStorage.setItem('portfolioSiteStartTime_v3', now.toString());
        }
      }
    } catch {
      // Fallback to in-memory start time
    }

    const updateSeconds = () => {
      const elapsed = Math.max(0, Math.floor((Date.now() - startTime) / 1000));
      setSeconds(elapsed);
    };

    updateSeconds();
    const interval = setInterval(updateSeconds, 1000);
    return () => clearInterval(interval);
  }, []);

  const getPlaces = (val: number) => {
    const safeVal = Math.max(0, Math.floor(val || 0));
    const numDigits = Math.max(3, safeVal.toString().length);
    const placesArr = [];
    for (let i = numDigits - 1; i >= 0; i--) {
      placesArr.push(Math.pow(10, i));
    }
    return placesArr;
  };

  return (
    <section className="section" id="home" style={{ minHeight: 'auto', display: 'flex', alignItems: 'center', paddingTop: '80px', paddingBottom: '20px' }}>
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
            <span className="sr-only"> — AI, Automation & Digital Marketing Developer</span>
          </h1>

          <h2 style={{
            fontFamily: '"Outfit", sans-serif',
            fontSize: 'clamp(1.4rem, 3.2vw, 2.4rem)',
            fontWeight: 800,
            letterSpacing: '0.02em',
            color: 'var(--text-primary)',
            marginBottom: '16px',
            lineHeight: 1.2
          }}>
            <span className="accent-text">AI & AUTOMATION ENGINEER</span>
          </h2>
          <p style={{
            color: 'var(--text-secondary)',
            fontSize: 'clamp(0.95rem, 1.25vw, 1.12rem)',
            fontWeight: 400,
            marginBottom: '10px',
            lineHeight: 1.6,
            maxWidth: '92%'
          }}>
            Building production-grade AI applications, Python workflow automation, and scalable growth systems.
          </p>
          <p style={{
            color: 'var(--text-secondary)',
            fontSize: 'clamp(0.95rem, 1.25vw, 1.12rem)',
            fontWeight: 400,
            marginBottom: '26px',
            lineHeight: 1.6,
            maxWidth: '92%'
          }}>
            <strong style={{ color: 'var(--text-primary)', fontWeight: 700 }}>Published IEEE researcher</strong> in Transformer models; engineered AI pipelines that drove <strong style={{ color: 'var(--text-primary)', fontWeight: 700 }}>240% organic growth</strong> across 12+ industry verticals.
          </p>

          <div className="hero-tags" style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '32px', maxWidth: '90%' }}>
            {['AI Agents & RAG', 'Python & FastAPI', 'Next.js & TypeScript', 'Automated Data Pipelines', 'IEEE Published (CONIT 2026)'].map((tag) => (
              <span
                key={tag}
                style={{
                  display: 'inline-block',
                  padding: '6px 16px',
                  borderRadius: '999px',
                  border: '1px solid rgba(0, 0, 0, 0.18)',
                  color: 'var(--text-secondary)',
                  fontSize: 'clamp(0.75rem, 1vw, 0.88rem)',
                  fontWeight: 500,
                  letterSpacing: '0.02em',
                  transition: 'all 0.2s ease',
                  cursor: 'default',
                  background: 'rgba(0, 0, 0, 0.02)'
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLSpanElement).style.color = 'var(--text-primary)';
                  (e.currentTarget as HTMLSpanElement).style.borderColor = 'var(--text-primary)';
                  (e.currentTarget as HTMLSpanElement).style.background = 'rgba(0,0,0,0.06)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLSpanElement).style.color = 'var(--text-secondary)';
                  (e.currentTarget as HTMLSpanElement).style.borderColor = 'rgba(0, 0, 0, 0.18)';
                  (e.currentTarget as HTMLSpanElement).style.background = 'rgba(0, 0, 0, 0.02)';
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="hero-buttons">
            <Link
              href="/projects"
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
          <img src="/mascot_original.webp" alt="Mascot Avatar" width="500" height="750" fetchPriority="high" className="hero-mascot" style={{ display: 'block' }} />
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
            <div className="hero-counter-container" style={{ display: 'flex', alignItems: 'baseline', gap: '12px', marginBottom: '10px' }}>
              <Counter
                value={seconds}
                places={getPlaces(seconds)}
                fontSize={80}
                padding={0}
                gap={5}
                textColor="var(--text-primary)"
                fontWeight="800"
              />
            </div>
            <p style={{ color: 'var(--text-primary)', fontSize: 'clamp(1.1rem, 2vw, 1.3rem)', marginTop: '0', marginBottom: '8px', fontWeight: 700, letterSpacing: '0.05em' }}>
              SECONDS
            </p>
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
              onClick={handleConnect}
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

            {/* Direct Contact Socials Tray */}
            <div style={{ marginTop: '22px' }}>
              <span style={{ 
                display: 'block', 
                fontSize: '0.78rem', 
                fontWeight: 600, 
                letterSpacing: '1px', 
                textTransform: 'uppercase', 
                color: 'var(--text-secondary)', 
                marginBottom: '10px' 
              }}>
                Or reach out directly:
              </span>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
                <motion.a
                  href="mailto:divyansh.chandra.work@gmail.com"
                  whileHover={{ scale: 1.12, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  title="Email: divyansh.chandra.work@gmail.com"
                  aria-label="Send email to Divyansh Chandra"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '42px',
                    height: '42px',
                    borderRadius: '50%',
                    background: 'rgba(0, 0, 0, 0.05)',
                    border: '1px solid rgba(0, 0, 0, 0.12)',
                    color: 'var(--text-primary)',
                    textDecoration: 'none',
                    transition: 'all 0.2s ease',
                    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.04)'
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = '#171717';
                    e.currentTarget.style.color = '#ffffff';
                    e.currentTarget.style.borderColor = '#171717';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'rgba(0, 0, 0, 0.05)';
                    e.currentTarget.style.color = 'var(--text-primary)';
                    e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.12)';
                  }}
                >
                  <Mail size={18} />
                </motion.a>

                <motion.a
                  href="https://www.linkedin.com/in/div08/"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.12, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  title="LinkedIn: in/div08"
                  aria-label="Divyansh Chandra LinkedIn Profile"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '42px',
                    height: '42px',
                    borderRadius: '50%',
                    background: 'rgba(0, 0, 0, 0.05)',
                    border: '1px solid rgba(0, 0, 0, 0.12)',
                    color: 'var(--text-primary)',
                    textDecoration: 'none',
                    transition: 'all 0.2s ease',
                    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.04)'
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = '#0a66c2';
                    e.currentTarget.style.color = '#ffffff';
                    e.currentTarget.style.borderColor = '#0a66c2';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'rgba(0, 0, 0, 0.05)';
                    e.currentTarget.style.color = 'var(--text-primary)';
                    e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.12)';
                  }}
                >
                  <FaLinkedinIn size={18} />
                </motion.a>

                <motion.a
                  href="https://github.com/div874"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.12, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  title="GitHub: div874"
                  aria-label="Divyansh Chandra GitHub Profile"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '42px',
                    height: '42px',
                    borderRadius: '50%',
                    background: 'rgba(0, 0, 0, 0.05)',
                    border: '1px solid rgba(0, 0, 0, 0.12)',
                    color: 'var(--text-primary)',
                    textDecoration: 'none',
                    transition: 'all 0.2s ease',
                    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.04)'
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = '#24292e';
                    e.currentTarget.style.color = '#ffffff';
                    e.currentTarget.style.borderColor = '#24292e';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'rgba(0, 0, 0, 0.05)';
                    e.currentTarget.style.color = 'var(--text-primary)';
                    e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.12)';
                  }}
                >
                  <FaGithub size={18} />
                </motion.a>

                <motion.a
                  href="https://wa.me/917974780810"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.12, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  title="WhatsApp: +91 7974780810"
                  aria-label="Chat on WhatsApp"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '42px',
                    height: '42px',
                    borderRadius: '50%',
                    background: 'rgba(0, 0, 0, 0.05)',
                    border: '1px solid rgba(0, 0, 0, 0.12)',
                    color: 'var(--text-primary)',
                    textDecoration: 'none',
                    transition: 'all 0.2s ease',
                    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.04)'
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = '#25D366';
                    e.currentTarget.style.color = '#ffffff';
                    e.currentTarget.style.borderColor = '#25D366';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'rgba(0, 0, 0, 0.05)';
                    e.currentTarget.style.color = 'var(--text-primary)';
                    e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.12)';
                  }}
                >
                  <FaWhatsapp size={18} />
                </motion.a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
