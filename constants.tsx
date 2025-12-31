
import React from 'react';
import { Heart, Star, Sparkles, Moon, Sun, Cloud, Camera, Coffee, Compass } from 'lucide-react';
import { Memory, Wish } from './types';

export const MEMORIES: Memory[] = [
  {
    id: 1,
    title: "Captured Adventures",
    description: "Every photo we took in 2025 holds a story that 2026 will continue to write.",
    icon: "Camera"
  },
  {
    id: 2,
    title: "Quiet Mornings",
    description: "The way the world stays still when we share a coffee and a conversation.",
    icon: "Coffee"
  },
  {
    id: 3,
    title: "Uncharted Paths",
    description: "Looking forward to exploring more of the world (and ourselves) together.",
    icon: "Compass"
  }
];

export const WISHES: Wish[] = [
  { 
    id: 1, 
    text: "Pure Joy", 
    subtext: "May 2026 bring the kind of happiness that makes your eyes crinkle when you smile.",
    glowColor: "from-pink-500/20 to-rose-500/20" 
  },
  { 
    id: 2, 
    text: "Inner Stillness", 
    subtext: "A year of finding peace in the chaos and beauty in the ordinary.",
    glowColor: "from-blue-500/20 to-indigo-500/20" 
  },
  { 
    id: 3, 
    text: "Fearless Dreams", 
    subtext: "I wish you the courage to chase the things that make your heart beat faster.",
    glowColor: "from-amber-400/20 to-orange-500/20" 
  },
  { 
    id: 4, 
    text: "Endless Love", 
    subtext: "To be surrounded by warmth, starting with every word I say to you.",
    glowColor: "from-emerald-400/20 to-teal-500/20" 
  }
];

export const getIcon = (name: string) => {
  switch (name) {
    case "Heart": return <Heart className="w-6 h-6" />;
    case "Star": return <Star className="w-6 h-6" />;
    case "Sparkles": return <Sparkles className="w-6 h-6" />;
    case "Moon": return <Moon className="w-6 h-6" />;
    case "Sun": return <Sun className="w-6 h-6" />;
    case "Cloud": return <Cloud className="w-6 h-6" />;
    case "Camera": return <Camera className="w-6 h-6" />;
    case "Coffee": return <Coffee className="w-6 h-6" />;
    case "Compass": return <Compass className="w-6 h-6" />;
    default: return <Sparkles className="w-6 h-6" />;
  }
};
