import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ShinyText from './ShinyText';

interface PreloaderProps {
  onComplete?: () => void;
}

const Preloader = ({ onComplete }: PreloaderProps) => {
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const duration = 4000; // Exactly 4.0 seconds loading preloader

    const timer = setTimeout(() => {
      setIsFinished(true);
      if (onComplete) onComplete();
    }, duration);

    return () => {
      clearTimeout(timer);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.75, ease: [0.76, 0, 0.24, 1] }
          }}
          className="preloader-overlay"
        >
          <motion.div
            initial={{ scale: 1 }}
            exit={{
              scale: 0.96,
              filter: 'blur(8px)',
              transition: { duration: 0.75, ease: [0.76, 0, 0.24, 1] }
            }}
            className="preloader-center-content"
          >
            {/* Signature Name rendered with ShinyText */}
            <div className="preloader-signature-container">
              <ShinyText
                text="Divyansh Chandra"
                speed={3.8}
                delay={0}
                color="#7B7D91"
                shineColor="#ffffff"
                spread={120}
                direction="left"
                className="preloader-shiny-name"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
