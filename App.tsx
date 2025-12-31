
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence, useScroll, useSpring, useTransform, useMotionValue } from 'framer-motion';
import ParticleBackground from './components/ParticleBackground';
import PetalBackground from './components/PetalBackground';
import FloatingObject from './components/FloatingObject';
import InteractiveLetter from './components/InteractiveLetter';
import { Heart, Star, Music, Pause, Play, ChevronDown, Sparkles, Wand2, ArrowRight } from 'lucide-react';
import { MEMORIES, WISHES, getIcon } from './constants';
import { triggerFireworks, triggerSingleBurst } from './components/Fireworks';

const App: React.FC = () => {
  const [stage, setStage] = useState<'opening' | 'main'>('opening');
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  // Custom Cursor/Glow logic
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.log("Audio play blocked"));
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleStart = () => {
    setStage('main');
    triggerFireworks();
    if (audioRef.current) {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const handleInteraction = (e: React.MouseEvent) => {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    triggerSingleBurst(x, y);
  };

  return (
    <div 
      className="relative min-h-screen bg-[#05010a] overflow-x-hidden selection:bg-pink-500/30 cursor-none" 
      onClick={handleInteraction}
    >
      <ParticleBackground />
      <PetalBackground />

      {/* Interactive Cursor Glow */}
      <motion.div
        className="fixed top-0 left-0 w-96 h-96 bg-pink-500/15 rounded-full blur-[100px] pointer-events-none z-50 mix-blend-screen"
        style={{ x: mouseX, y: mouseY, translateX: '-50%', translateY: '-50%' }}
      />
      
      {/* Visual Cursor Replacement */}
      <motion.div
        className="fixed top-0 left-0 w-4 h-4 bg-white rounded-full pointer-events-none z-[100] mix-blend-difference flex items-center justify-center"
        style={{ x: mouseX, y: mouseY, translateX: '-50%', translateY: '-50%' }}
      >
        <div className="w-1 h-1 bg-black rounded-full" />
      </motion.div>

      {/* Hidden Audio Element */}
      <audio 
        ref={audioRef} 
        loop 
        src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" 
      />

      <AnimatePresence mode="wait">
        {stage === 'opening' ? (
          <motion.div
            key="opening"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: 'blur(20px)' }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black text-white"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="relative text-center space-y-8"
            >
              <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-40 h-40 bg-pink-500/20 blur-3xl rounded-full" />
              
              <h2 className="text-sm md:text-md font-light tracking-[0.4em] uppercase opacity-60">
                A personal journey awaits
              </h2>
              
              <motion.div
                initial={{ letterSpacing: '0.1em' }}
                animate={{ letterSpacing: '0.3em' }}
                transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
              >
                <motion.h1 
                  className="text-5xl md:text-7xl font-serif-elegant italic relative z-10"
                >
                  Unlock 2026
                </motion.h1>
              </motion.div>
              
              <div className="flex flex-col items-center gap-4 mt-12">
                <motion.button
                  onClick={(e) => { e.stopPropagation(); handleStart(); }}
                  whileHover={{ scale: 1.1, letterSpacing: '0.2em' }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative px-10 py-4 rounded-full bg-gradient-to-r from-pink-500/20 to-purple-500/20 backdrop-blur-xl border border-white/10 overflow-hidden transition-all duration-300"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                  <span className="relative z-10 flex items-center gap-3 text-xs tracking-widest uppercase font-semibold">
                    Enter My Heart <Wand2 className="w-4 h-4" />
                  </span>
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        ) : (
          <motion.main
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative z-10 w-full"
          >
            {/* Nav / Audio */}
            <motion.div 
              initial={{ y: -100 }}
              animate={{ y: 0 }}
              className="fixed top-0 left-0 right-0 p-8 flex justify-between items-center z-50"
            >
              <div className="font-serif-elegant italic text-xl opacity-60">2026 • Memories</div>
              <button
                onClick={(e) => { e.stopPropagation(); toggleMusic(); }}
                className="p-4 rounded-full bg-white/5 backdrop-blur-2xl border border-white/10 text-white hover:bg-white/20 transition-all"
              >
                {isPlaying ? <Music className="w-5 h-5 animate-pulse text-pink-400" /> : <Pause className="w-5 h-5" />}
              </button>
            </motion.div>

            {/* Floating Decorations */}
            <FloatingObject top="20%" left="5%" delay={0.5} duration={12} parallaxStrength={120}>
              <div className="w-32 h-32 bg-pink-500/10 rounded-full blur-3xl" />
            </FloatingObject>

            {/* HERO SECTION */}
            <section className="h-screen flex flex-col items-center justify-center text-center px-4 relative">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="space-y-8 max-w-5xl z-30"
              >
                <div className="flex items-center justify-center gap-4 text-pink-400/80 mb-2">
                  <div className="h-[1px] w-12 bg-pink-500/30" />
                  <span className="text-xs uppercase tracking-[0.3em] font-bold">The Year of Us</span>
                  <div className="h-[1px] w-12 bg-pink-500/30" />
                </div>

                <h1 className="text-6xl md:text-[9rem] font-serif-elegant font-bold leading-[0.9] text-white">
                  Happy <br />
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-300 via-white to-purple-300">New Year</span>
                </h1>

                <div className="flex items-center justify-center gap-4 text-4xl md:text-7xl mt-4">
                  <span className="opacity-20 line-through decoration-pink-500">2025</span>
                  <ArrowRight className="w-8 h-8 md:w-12 md:h-12 text-pink-500" />
                  <motion.span 
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="font-bold text-white drop-shadow-[0_0_15px_rgba(236,72,153,0.5)]"
                  >
                    2026
                  </motion.span>
                </div>

                <p className="text-slate-400 text-lg md:text-2xl font-light tracking-wide max-w-2xl mx-auto italic mt-8">
                  "Every petal falls for a reason, just as every second spent with you is a gift I'll cherish forever."
                </p>

                <motion.div 
                  animate={{ y: [0, 10, 0] }}
                  transition={{ repeat: Infinity, duration: 3 }}
                  className="pt-16"
                >
                  <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center p-1 mx-auto">
                    <motion.div 
                      animate={{ y: [0, 12, 0] }} 
                      transition={{ repeat: Infinity, duration: 1.5 }}
                      className="w-1 h-2 bg-pink-500 rounded-full" 
                    />
                  </div>
                </motion.div>
              </motion.div>
            </section>

            {/* HEARTFELT LETTER */}
            <section className="min-h-screen py-32 px-4 flex items-center justify-center relative">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
                className="max-w-4xl w-full bg-gradient-to-b from-white/[0.08] to-transparent backdrop-blur-3xl border border-white/10 rounded-[4rem] p-12 md:p-24 relative overflow-hidden group shadow-2xl"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-pink-500/40 to-transparent" />
                <div className="space-y-10 relative z-10">
                  <Sparkles className="w-12 h-12 text-pink-400 opacity-50 mx-auto" />
                  <h2 className="text-4xl md:text-5xl font-serif-elegant italic text-center">To My Favorite Soul...</h2>
                  <div className="text-slate-300 text-xl md:text-2xl leading-relaxed font-light text-center space-y-8">
                    <p className="first-letter:text-5xl first-letter:font-serif-elegant first-letter:mr-3 first-letter:float-left">
                      Walking into 2026 with you feels like the greatest privilege of my life. You have a way of turning ordinary days into cinematic masterpieces, and quiet moments into eternal memories.
                    </p>
                    <p>
                      In this new year, I promise to be your biggest supporter, your safest harbor, and the person who reminds you every single day how extraordinary you truly are.
                    </p>
                    <div className="pt-8">
                      <span className="font-poetic text-5xl text-pink-300 block">With all my love, always.</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </section>

            {/* INTERACTIVE LETTER SECTION */}
            <section className="py-32 px-4 relative flex flex-col items-center">
              <div className="text-center mb-16 space-y-4">
                <h2 className="text-5xl md:text-7xl font-serif-elegant font-bold">A Special Invitation</h2>
                <p className="text-slate-500 tracking-[0.2em] uppercase text-sm">A secret message just for you</p>
              </div>
              <InteractiveLetter />
            </section>

            {/* 2026 WISHES SECTION */}
            <section className="py-40 bg-white/[0.02] backdrop-blur-3xl relative overflow-hidden">
              <div className="max-w-6xl mx-auto px-4 relative z-10">
                <div className="flex flex-col md:flex-row items-center justify-between mb-24 gap-8">
                  <h2 className="text-4xl md:text-6xl font-serif-elegant font-bold text-left leading-tight">
                    My Intentions <br /> <span className="text-pink-400">For Your 2026</span>
                  </h2>
                  <p className="max-w-md text-slate-400 text-lg italic border-l border-pink-500 pl-6">
                    "I want this year to be the one where every one of your secret dreams finds its way to the surface."
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                  {WISHES.map((wish, idx) => (
                    <motion.div
                      key={wish.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: idx * 0.1 }}
                      className="group relative h-80 perspective-1000"
                    >
                      <motion.div 
                        className="w-full h-full p-8 rounded-[2.5rem] bg-black/40 border border-white/5 backdrop-blur-xl flex flex-col items-center justify-center text-center overflow-hidden transition-all duration-500 group-hover:border-pink-500/40 group-hover:shadow-[0_0_50px_rgba(236,72,153,0.15)]"
                        whileHover="hover"
                      >
                        <div className={`absolute inset-0 rounded-[2.5rem] bg-gradient-to-br ${wish.glowColor} opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-2xl`} />
                        
                        <motion.div 
                          variants={{ hover: { y: -20, scale: 1.1 } }}
                          className="relative z-10 mb-6"
                        >
                          <Sparkles className="w-12 h-12 text-pink-400/50 group-hover:text-pink-400 transition-all duration-500" />
                        </motion.div>
                        
                        <motion.h3 
                          variants={{ hover: { y: -15 } }}
                          className="text-2xl font-bold text-white mb-2"
                        >
                          {wish.text}
                        </motion.h3>

                        <motion.div
                          initial={{ opacity: 0, height: 0, y: 10 }}
                          variants={{ hover: { opacity: 1, height: 'auto', y: 0 } }}
                          className="text-slate-400 text-sm font-light italic leading-relaxed"
                        >
                          {wish.subtext}
                        </motion.div>
                      </motion.div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* FINAL GOOSEBUMPS SECTION */}
            <section className="h-screen flex items-center justify-center relative bg-black overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-pink-900/20 via-black to-black" />
              
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 4 }}
                className="text-center space-y-16 max-w-5xl px-4 z-10"
              >
                <motion.div 
                  animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
                  transition={{ repeat: Infinity, duration: 4 }}
                  className="text-8xl text-pink-500 drop-shadow-[0_0_30px_rgba(236,72,153,0.6)] inline-block"
                >
                  ❤️
                </motion.div>
                
                <div className="space-y-6">
                  <motion.h2 
                    initial={{ y: 30, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 2 }}
                    className="text-4xl md:text-7xl font-serif-elegant font-bold tracking-tight text-white leading-tight"
                  >
                    "No matter how many <br /> years pass by..."
                  </motion.h2>
                  <motion.h2 
                    initial={{ y: 30, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ delay: 1.5, duration: 2 }}
                    className="text-4xl md:text-8xl font-serif-elegant italic text-pink-400"
                  >
                    You’ll always be my favorite.
                  </motion.h2>
                </div>
                
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 3, duration: 1.5 }}
                  className="pt-32"
                >
                  <div className="h-[1px] w-48 bg-gradient-to-r from-transparent via-white/20 to-transparent mx-auto mb-8" />
                  <p className="text-slate-500 tracking-[0.5em] uppercase text-xs font-bold">2026 and Beyond • Forever</p>
                </motion.div>
              </motion.div>
            </section>

            {/* FOOTER */}
            <footer className="py-24 text-center text-slate-700 bg-black border-t border-white/5">
              <div className="max-w-2xl mx-auto px-4 space-y-6">
                <Heart className="w-6 h-6 mx-auto opacity-20" />
                <p className="text-sm font-light italic">Hand-coded with every heartbeat to welcome 2026 with you.</p>
                <p className="text-xs uppercase tracking-widest opacity-40">Designed for My Favorite Person</p>
              </div>
            </footer>
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
