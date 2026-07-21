import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';

const navItems = [
  { label: 'Home', path: '/' },
  { label: 'Projects', path: '/projects' },
  { label: 'Clients & Experience', path: '/experience' },
  { label: 'Tech Skills', path: '/skills' },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}
      >
        <Link 
          to="/" 
          className="navbar__logo" 
          onClick={() => setMobileOpen(false)}
          style={{ textDecoration: 'none' }}
        >
          DC<span className="accent-text">.</span>
        </Link>

        {/* Desktop Nav */}
        <div className="navbar__links">
          {navItems.map(item => (
            <NavLink 
              key={item.path} 
              to={item.path} 
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              style={{ textDecoration: 'none' }}
            >
              {item.label}
            </NavLink>
          ))}
          <Link 
            to="/cv"
            className="glow-button"
            style={{ textDecoration: 'none' }}
          >
            Explore My CV
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button 
          className="navbar__hamburger"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <span className={`hamburger-line ${mobileOpen ? 'open' : ''}`} />
          <span className={`hamburger-line ${mobileOpen ? 'open' : ''}`} />
          <span className={`hamburger-line ${mobileOpen ? 'open' : ''}`} />
        </button>
      </motion.nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="mobile-drawer"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            <div className="mobile-drawer__content">
              {navItems.map((item, i) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileOpen(false)}
                  className="mobile-drawer__link"
                  style={{ textDecoration: 'none' }}
                >
                  <span className="mobile-drawer__number">0{i + 1}</span>
                  {item.label}
                </NavLink>
              ))}
              <Link
                to="/cv"
                onClick={() => setMobileOpen(false)}
                className="glow-button"
                style={{ marginTop: '20px', width: '100%', textAlign: 'center', textDecoration: 'none' }}
              >
                Explore My CV
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
