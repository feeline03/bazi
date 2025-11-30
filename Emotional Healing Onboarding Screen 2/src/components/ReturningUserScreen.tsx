import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';
import type { Screen, Emotion } from '../App';

interface ReturningUserScreenProps {
  onNavigate: (screen: Screen) => void;
  onEmotionSelect: (emotion: Emotion) => void;
}

export default function ReturningUserScreen({ onNavigate, onEmotionSelect }: ReturningUserScreenProps) {
  useEffect(() => {
    // Auto navigate to emotion selection after 1.5 seconds
    const timer = setTimeout(() => {
      onNavigate('emotionSelection');
    }, 1500);

    return () => clearTimeout(timer);
  }, [onNavigate]);

  return (
    <div className="min-h-screen relative z-10 flex items-start justify-center p-6 pt-[25vh]">
      <div className="w-full max-w-md text-center">
        {/* Splash content - No animations */}
        <div>
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 mb-12 shadow-[0_0_40px_rgba(168,85,247,0.4)]">
            <Sparkles className="w-12 h-12 text-purple-300" />
          </div>
          
          <h1 className="text-white text-3xl mb-8">
            每日五行情绪
          </h1>
          
          <p className="text-white/60">
            用五行能量，安抚每一天的自己
          </p>
        </div>
      </div>
    </div>
  );
}
