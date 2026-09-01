import { useState } from 'react';
import type { FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, Check } from 'lucide-react';
import { FaLinkedinIn, FaGithub } from 'react-icons/fa6';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setStatus('sending');

    try {
      const response = await fetch(`https://formsubmit.co/ajax/divyansh.chandra.work@gmail.com`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          message
        })
      });

      if (response.ok) {
        setStatus('success');
        setName('');
        setEmail('');
        setPhone('');
        setMessage('');
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
      }
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  return (
    <section className="section" id="contact" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden', paddingTop: '80px', paddingBottom: '80px' }}>
      {/* Subtle radial glow background */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '800px',
        height: '800px',
        background: 'radial-gradient(circle, rgba(161, 161, 170, 0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
        zIndex: 0
      }} />

      <div className="contact-grid" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '60px',
        width: '100%',
        position: 'relative',
        zIndex: 1
      }}>
        {/* Left Side: Call to Action */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
        >
          <span className="section-label">07 / CONTACT</span>
          <h2 className="accent-text" style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', marginBottom: '20px', lineHeight: 1.2 }}>
            LET'S BUILD SOMETHING SMARTER
          </h2>
          
          <p style={{ fontSize: '1.15rem', color: 'var(--text-secondary)', marginBottom: '40px', maxWidth: '500px', lineHeight: 1.7 }}>
            Whether you want to build an AI-powered application, automate a workflow, improve your marketing systems, or solve a business problem with technology — let's talk.
          </p>

          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <motion.a
              href="mailto:divyansh.chandra.work@gmail.com"
              whileHover={{ scale: 1.1, color: 'var(--accent-color)' }}
              className="social-icon-link"
              title="Email"
            >
              <Mail size={22} />
            </motion.a>

            <motion.a
              href="https://www.linkedin.com/in/div08/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, color: 'var(--accent-color)' }}
              className="social-icon-link"
              title="LinkedIn"
            >
              <FaLinkedinIn size={22} />
            </motion.a>

            <motion.a
              href="https://github.com/div874"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, color: 'var(--accent-color)' }}
              className="social-icon-link"
              title="GitHub"
            >
              <FaGithub size={22} />
            </motion.a>
          </div>
        </motion.div>

        {/* Right Side: Minimalist Form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-card"
          style={{ padding: '40px', borderRadius: '24px' }}
        >
          {status === 'success' ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                minHeight: '300px',
                textAlign: 'center',
                gap: '16px'
              }}
            >
              <div style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                background: 'rgba(16, 185, 129, 0.1)',
                border: '1px solid #10b981',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#10b981'
              }}>
                <Check size={30} />
              </div>
              <h3 style={{ fontSize: '1.5rem', color: 'var(--text-primary)', textTransform: 'none', margin: 0 }}>Message Sent!</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', maxWidth: '300px', margin: 0, lineHeight: 1.5 }}>
                Thank you. I have received your message and will get back to you within 24 hours.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="minimalist-form-group">
                <input
                  type="text"
                  required
                  placeholder=" "
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="minimalist-input"
                />
                <label className="minimalist-label">Your Name *</label>
              </div>

              <div className="minimalist-form-group">
                <input
                  type="email"
                  required
                  placeholder=" "
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="minimalist-input"
                />
                <label className="minimalist-label">Your Email *</label>
              </div>

              <div className="minimalist-form-group">
                <input
                  type="tel"
                  placeholder=" "
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="minimalist-input"
                />
                <label className="minimalist-label">Phone Number (Optional)</label>
              </div>

              <div className="minimalist-form-group">
                <textarea
                  required
                  placeholder=" "
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="minimalist-input"
                  style={{ resize: 'none' }}
                />
                <label className="minimalist-label">What are you looking to build or solve? *</label>
              </div>

              {status === 'error' && (
                <p style={{ color: '#ef4444', fontSize: '0.88rem', margin: '0 0 16px 0', textAlign: 'center' }}>
                  Oops! Something went wrong. Please try again or email directly.
                </p>
              )}

              <motion.button
                type="submit"
                disabled={status === 'sending'}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="glow-button"
                style={{
                  width: '100%',
                  padding: '14px',
                  fontSize: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                {status === 'sending' ? (
                  <span>Sending Message...</span>
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send size={16} />
                  </>
                )}
              </motion.button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
