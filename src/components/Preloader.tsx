import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ShinyText from './ShinyText';

interface PreloaderProps {
  onComplete?: () => void;
}

const welcomeWords = [
  'WELCOME',        // English
  'स्वागत है',       // Hindi
  'SWAGAT HAI',     // Hinglish
  'BIENVENUE'       // French
];

const Preloader = ({ onComplete }: PreloaderProps) => {
  const [wordIndex, setWordIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const duration = 2000; // 2 seconds loading preloader

    const timer = setTimeout(() => {
      setIsFinished(true);
      if (onComplete) onComplete();
    }, duration);

    // Multilingual word rotation timer (rotates every 500ms for 4 languages)
    const wordTimer = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % welcomeWords.length);
    }, 500);

    return () => {
      clearTimeout(timer);
      clearInterval(wordTimer);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1, scale: 1 }}
          exit={{
            opacity: 0,
            scale: 1.04,
            filter: 'blur(8px)',
            transition: { duration: 0.85, ease: [0.76, 0, 0.24, 1] }
          }}
          className="preloader-overlay"
        >
          <div className="preloader-center-content">
            {/* Multilingual Welcome Subtitle (ABOVE the name) */}
            <div className="preloader-welcome-wrapper">
              <AnimatePresence mode="wait">
                <motion.span
                  key={wordIndex}
                  initial={{ opacity: 0, y: 3 }}
                  animate={{ opacity: 0.85, y: 0 }}
                  exit={{ opacity: 0, y: -3 }}
                  transition={{ duration: 0.25 }}
                  className="preloader-welcome-text"
                >
                  {welcomeWords[wordIndex]}
                </motion.span>
              </AnimatePresence>
            </div>

            {/* Signature Name rendered with ShinyText */}
            <div className="preloader-signature-container">
              <ShinyText
                text="Divyansh Chandra"
                speed={2.2}
                delay={0}
                color="#7B7D91"
                shineColor="#ffffff"
                spread={120}
                direction="left"
                className="preloader-shiny-name"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
