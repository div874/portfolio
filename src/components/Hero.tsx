import { motion } from 'framer-motion';
import SplitText from './SplitText';
import DarkVeil from './DarkVeil';

interface HeroProps {
  onConnectClick: () => void;
}

const Hero = ({ onConnectClick }: HeroProps) => {
  return (
    <section className="section" id="home" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', paddingTop: '100px' }}>
      <div id="canvas-container">
        <DarkVeil 
          hueShift={-30} 
          noiseIntensity={0.08} 
          scanlineIntensity={0.2} 
          speed={1.5} 
          warpAmount={0.5} 
        />
      </div>

      <div className="content-wrapper" style={{ maxWidth: '800px' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
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
              marginBottom: '20px'
            }}>
              <SplitText
                text="DIVYANSH"
                tag="span"
                splitType="chars"
                textAlign="left"
                delay={80}
                duration={1.5}
                from={{ opacity: 0, filter: 'blur(10px)', y: 30 }}
                to={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
              />
              <br />
              <SplitText
                text="CHANDRA"
                tag="span"
                className="accent-split-text"
                splitType="chars"
                textAlign="left"
                delay={80}
                duration={1.5}
                from={{ opacity: 0, filter: 'blur(10px)', y: 30 }}
                to={{ opacity: 1, filter: 'blur(0px)', y: 0, delay: 0.5 }}
              />
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
            
            <SplitText
              text="I drive measurable growth through data-backed SEO, performance optimization, and marketing automation. Recently helped scale 1page.info across 12+ verticals with 35%+ organic traffic increases."
              tag="p"
              className="hero-scroll-reveal-paragraph-text"
              splitType="words"
              textAlign="left"
              delay={40}
              duration={1.2}
              from={{ opacity: 0, filter: 'blur(5px)', y: 20 }}
              to={{ opacity: 1, filter: 'blur(0px)', y: 0, delay: 0.8 }}
            />
            
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

              <motion.a
                href="#projects"
                whileHover={{ scale: 1.05, color: 'var(--text-primary)' }}
                whileTap={{ scale: 0.95 }}
                style={{
                  color: 'var(--text-secondary)',
                  fontWeight: 600,
                  fontSize: '1rem',
                  cursor: 'pointer',
                  textDecoration: 'none',
                  marginLeft: '10px'
                }}
              >
                View My Work →
              </motion.a>

              <motion.a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, color: 'var(--accent-secondary)' }}
                whileTap={{ scale: 0.95 }}
                style={{
                  color: 'var(--text-secondary)',
                  fontWeight: 600,
                  fontSize: '1rem',
                  cursor: 'pointer',
                  textDecoration: 'none',
                  marginLeft: '10px'
                }}
              >
                Download Resume 📄
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
