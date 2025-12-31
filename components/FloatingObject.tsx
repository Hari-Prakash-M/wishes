
import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface FloatingObjectProps {
  children: React.ReactNode;
  top?: string;
  left?: string;
  delay?: number;
  duration?: number;
  parallaxStrength?: number;
}

const FloatingObject: React.FC<FloatingObjectProps> = ({ 
  children, 
  top = '20%', 
  left = '20%', 
  delay = 0, 
  duration = 6,
  parallaxStrength = 50 
}) => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 5000], [0, parallaxStrength]);

  return (
    <motion.div
      style={{ top, left, y }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ 
        opacity: [0.3, 0.6, 0.3],
        scale: 1,
        y: [0, -20, 0]
      }}
      transition={{
        opacity: { repeat: Infinity, duration: duration, ease: "easeInOut" },
        scale: { duration: 1, delay },
        y: { repeat: Infinity, duration: duration, ease: "easeInOut" }
      }}
      className="fixed pointer-events-none z-10"
    >
      {children}
    </motion.div>
  );
};

export default FloatingObject;
