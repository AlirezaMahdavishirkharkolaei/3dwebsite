import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const WORDS = ['Design', 'Create', 'Inspire'];

interface Props {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: Props) {
  const [count, setCount] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);
  const startTime = useRef(Date.now());
  const animRef = useRef<number>(0);
  const DURATION = 2700;

  useEffect(() => {
    const tick = () => {
      const elapsed = Date.now() - startTime.current;
      const progress = Math.min(elapsed / DURATION, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const next = Math.round(eased * 100);
      setCount(next);
      if (progress < 1) {
        animRef.current = requestAnimationFrame(tick);
      } else {
        setTimeout(onComplete, 400);
      }
    };
    animRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animRef.current);
  }, [onComplete]);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex(i => (i + 1) % WORDS.length);
    }, 900);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex flex-col"
      style={{ backgroundColor: 'hsl(var(--bg))' }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
    >
      {/* Top-left label */}
      <motion.div
        className="absolute top-8 left-8"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <span
          className="text-xs uppercase tracking-[0.3em]"
          style={{ color: 'hsl(var(--muted))' }}
        >
          Portfolio
        </span>
      </motion.div>

      {/* Center word */}
      <div className="flex-1 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.span
            key={wordIndex}
            className="text-4xl md:text-6xl lg:text-7xl"
            style={{
              fontFamily: "'Instrument Serif', serif",
              fontStyle: 'italic',
              color: 'hsla(var(--text), 0.8)',
            }}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            {WORDS[wordIndex]}
          </motion.span>
        </AnimatePresence>
      </div>

      {/* Bottom right: counter */}
      <div className="absolute bottom-16 right-8">
        <span
          className="text-6xl md:text-8xl lg:text-9xl tabular-nums"
          style={{
            fontFamily: "'Instrument Serif', serif",
            color: 'hsl(var(--text))',
          }}
        >
          {String(count).padStart(3, '0')}
        </span>
      </div>

      {/* Bottom progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-[3px]" style={{ backgroundColor: 'hsla(var(--stroke), 0.5)' }}>
        <motion.div
          className="h-full accent-gradient origin-left"
          style={{
            scaleX: count / 100,
            boxShadow: '0 0 8px rgba(137, 170, 204, 0.35)',
          }}
        />
      </div>
    </motion.div>
  );
}
