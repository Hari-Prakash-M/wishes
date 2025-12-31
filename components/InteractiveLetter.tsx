
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Mail, Sparkles } from 'lucide-react';

const InteractiveLetter: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative flex items-center justify-center py-20 min-h-[600px]">
      {/* Background Glow */}
      <div className="absolute w-[500px] h-[500px] bg-pink-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div 
        className="relative cursor-pointer group"
        onClick={() => setIsOpen(!isOpen)}
      >
        {/* Envelope Container */}
        <div className="relative w-[320px] h-[220px] md:w-[450px] md:h-[300px] bg-white/5 backdrop-blur-md border border-white/10 rounded-xl shadow-2xl transition-transform duration-500 group-hover:scale-105">
          
          {/* Envelope Flap (Static Back) */}
          <div className="absolute inset-0 bg-white/5 rounded-xl overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full border-t-[110px] md:border-t-[150px] border-t-transparent border-l-[160px] md:border-l-[225px] border-l-white/5 border-r-[160px] md:border-r-[225px] border-r-white/5" />
          </div>

          {/* The Letter Content (Animated) */}
          <motion.div
            initial={false}
            animate={isOpen ? { y: -150, scale: 1.05, opacity: 1 } : { y: 0, scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 100, damping: 20 }}
            className="absolute inset-x-4 top-4 bg-white/95 text-slate-900 p-6 md:p-10 rounded-lg shadow-2xl z-20 min-h-[300px] md:min-h-[400px]"
          >
            <div className="flex justify-between items-center mb-6">
              <Heart className="w-6 h-6 text-pink-500 fill-pink-500" />
              <span className="font-serif-elegant italic text-slate-400 text-sm">Jan 1, 2026</span>
            </div>
            
            <div className="space-y-4 font-serif-elegant italic leading-relaxed text-lg md:text-xl text-slate-800">
              <p>My Dearest,</p>
              <p>
                Every year feels like a new chapter, but with you, it feels like a masterpiece unfolding. Thank you for the way you look at me, the way you listen, and the way you make the world feel safe and beautiful.
              </p>
              <p>
                You are my greatest adventure and my favorite destination. Here's to 2026 being the year where we laugh louder, love deeper, and create even more magic together.
              </p>
              <p className="text-right pt-4 font-poetic text-3xl text-pink-600">Forever Yours.</p>
            </div>
          </motion.div>

          {/* Front Flap (Top Layer) */}
          <motion.div
            initial={false}
            animate={isOpen ? { rotateX: 180, zIndex: 0 } : { rotateX: 0, zIndex: 30 }}
            transition={{ duration: 0.6 }}
            style={{ transformOrigin: 'top', transformStyle: 'preserve-3d' }}
            className="absolute top-0 left-0 w-full h-1/2 bg-white/10 backdrop-blur-xl border-x border-t border-white/20 rounded-t-xl overflow-hidden shadow-xl"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-pink-500/20 border border-pink-500/50 flex items-center justify-center">
                <Mail className="w-6 h-6 text-pink-300" />
              </div>
            </div>
          </motion.div>

          {/* Seal / Heart (Middle Layer) */}
          {!isOpen && (
            <motion.div 
              layoutId="seal"
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40"
            >
              <div className="relative group">
                <div className="absolute inset-0 bg-pink-500 blur-md opacity-50 group-hover:opacity-100 transition-opacity animate-pulse" />
                <div className="relative w-14 h-14 bg-pink-600 rounded-full flex items-center justify-center border-2 border-pink-400 shadow-lg">
                  <Heart className="w-7 h-7 text-white fill-white" />
                </div>
              </div>
            </motion.div>
          )}

          {/* Click Prompt */}
          <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 whitespace-nowrap opacity-60 group-hover:opacity-100 transition-opacity flex items-center gap-2 text-xs tracking-widest uppercase text-white font-bold">
            <Sparkles className="w-3 h-3 text-pink-400" />
            {isOpen ? 'Click to Close' : 'Click to Open My Heart'}
            <Sparkles className="w-3 h-3 text-pink-400" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveLetter;
