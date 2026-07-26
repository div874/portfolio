import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ShinyText from './ShinyText';

interface PreloaderProps {
  onComplete?: () => void;
}

const welcomeWords = [
  'WELCOME',        // English
  'स्वागत है',       // Hindi
  'SWAGAT HAI'      // Hinglish
];

const Preloader = ({ onComplete }: PreloaderProps) => {
  const [wordIndex, setWordIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const duration = 4000; // Exactly 4.0 seconds loading preloader

    const timer = setTimeout(() => {
      setIsFinished(true);
      if (onComplete) onComplete();
    }, duration);

    // Continuous smooth word rotation timer (rotates every 1333ms for 3 words over 4s)
    const wordTimer = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % welcomeWords.length);
    }, 1333);

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
            {/* Multilingual Welcome Subtitle (Smooth Crossfade without blank pause) */}
            <div className="preloader-welcome-wrapper">
              <AnimatePresence>
                <motion.span
                  key={wordIndex}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 0.85, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
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
