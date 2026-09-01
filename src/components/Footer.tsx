import { FaLinkedinIn, FaGithub } from 'react-icons/fa6';
import { Mail } from 'lucide-react';

const navItems = [
  { label: 'About', id: 'about' },
  { label: 'Experience', id: 'experience' },
  { label: 'Projects', id: 'projects' },
  { label: 'Skills', id: 'skills' },
  { label: 'Contact', id: 'contact' },
];

const Footer = () => {
  const handleScroll = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__brand">
          <div className="footer__logo" onClick={() => handleScroll('home')}>
            DC<span className="accent-text">.</span>
          </div>
          <p className="footer__tagline">
            Building practical solutions at the intersection of AI, automation, and digital marketing.
          </p>
        </div>

        <div className="footer__nav">
          <h4 className="footer__heading">Quick Links</h4>
          {navItems.map(item => (
            <button key={item.id} onClick={() => handleScroll(item.id)} className="footer__link">
              {item.label}
            </button>
          ))}
        </div>

        <div className="footer__social">
          <h4 className="footer__heading">Connect</h4>
          <div className="footer__social-row">
            <a href="https://www.linkedin.com/in/div08/" target="_blank" rel="noopener noreferrer" className="social-icon-link" aria-label="LinkedIn">
              <FaLinkedinIn size={18} />
            </a>
            <a href="https://github.com/div874" target="_blank" rel="noopener noreferrer" className="social-icon-link" aria-label="GitHub">
              <FaGithub size={18} />
            </a>
            <a href="mailto:divyansh.chandra.work@gmail.com" className="social-icon-link" aria-label="Email">
              <Mail size={18} />
            </a>
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <p>© 2026 Divyansh Chandra. Crafted with passion.</p>
      </div>
    </footer>
  );
};

export default Footer;
