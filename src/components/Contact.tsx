import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';
import { FaLinkedinIn, FaGithub } from 'react-icons/fa6';

const Contact = () => {
  return (
    <section className="section" id="contact" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden' }}>
      {/* Subtle gradient backdrop */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '600px',
        height: '600px',
        background: 'radial-gradient(circle, rgba(59, 130, 246, 0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
        zIndex: 0
      }} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        style={{ textAlign: 'left', maxWidth: '800px', width: '100%', position: 'relative', zIndex: 1 }}
      >
        <span className="section-label">07</span>
        <h2 className="accent-text" style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', marginBottom: '20px', lineHeight: 1.2 }}>
          Let's Build Something <br /> That Grows
        </h2>
        
        <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', marginBottom: '40px', maxWidth: '600px', lineHeight: 1.7 }}>
          Whether it's marketing, automation, or scaling systems — I can help you achieve measurable results.
        </p>
        
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
          <motion.a
            href="mailto:divyansh12dc@gmail.com"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="glow-button"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '16px 36px',
              fontSize: '1.1rem',
              textDecoration: 'none'
            }}
          >
            <Mail size={20} /> Get in Touch
          </motion.a>

          <motion.a
            href="https://linkedin.com/in/divyansh-chandra"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1, color: 'var(--accent-color)' }}
            className="social-icon-link"
          >
            <FaLinkedinIn size={22} />
          </motion.a>

          <motion.a
            href="https://github.com/divyansh-chandra"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1, color: 'var(--accent-color)' }}
            className="social-icon-link"
          >
            <FaGithub size={22} />
          </motion.a>
        </div>
      </motion.div>
    </section>
  );
};

export default Contact;
