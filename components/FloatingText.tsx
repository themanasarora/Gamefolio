import React from 'react';
import { motion } from 'framer-motion';

interface FloatingTextProps {
  x: number;
  y: number;
  text: string;
  color?: string;
  onComplete: () => void;
}

export const FloatingText: React.FC<FloatingTextProps> = ({ x, y, text, color = 'text-yellow-400', onComplete }) => {
  return (
    <motion.div
      initial={{ opacity: 1, y: y, x: x }}
      animate={{ opacity: 0, y: y - 50 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      onAnimationComplete={onComplete}
      className={`absolute pointer-events-none font-bold ${color} z-50`}
      style={{ left: 0, top: 0 }} // Position controlled by motion initial
    >
      {text}
    </motion.div>
  );
};