import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '120px 20px 80px',
      textAlign: 'center'
    }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        <img 
          src="/404_mascot.jpg" 
          alt="404 Not Found" 
          style={{
            maxWidth: '100%',
            maxHeight: '70vh',
            objectFit: 'contain',
            marginBottom: '40px'
          }} 
        />
        
        <Link 
          to="/"
          className="glow-button"
          style={{ 
            padding: '16px 32px',
            fontSize: '1.1rem',
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          Return Home
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;
