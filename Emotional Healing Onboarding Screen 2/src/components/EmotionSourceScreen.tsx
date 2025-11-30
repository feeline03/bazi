import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, Home, BarChart3, User } from 'lucide-react';
import type { Screen, Emotion } from '../App';

interface EmotionSourceScreenProps {
  emotion: Emotion;
  onNavigate: (screen: Screen) => void;
  homeScreen?: Screen;
}

const sources = [
  '工作压力',
  '孩子教育',
  '夫妻关系',
  '家庭长辈',
  '经济压力',
  '说不清楚'
];

export default function EmotionSourceScreen({ emotion, onNavigate, homeScreen = 'emotionSelection' }: EmotionSourceScreenProps) {
  const [selectedSource, setSelectedSource] = useState<string | null>(null);

  const handleSourceSelect = (source: string) => {
    setSelectedSource(source);
    // Auto navigate with delay to show selection
    setTimeout(() => {
      onNavigate('birthInfo');
    }, 600);
  };

  return (
    <>
      <div className="min-h-screen px-6 pt-6 pb-24 relative z-10">
        <div className="w-full max-w-md mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <button 
              onClick={() => onNavigate('emotionSelection')}
              className="mb-6 text-white/50 hover:text-white/80 transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            
            <div className="text-center mb-8">
              <p className="text-white/40 text-sm mb-4">
                当前情绪：{emotion}
              </p>
              <h1 className="text-white/95 text-2xl mb-2 leading-tight">
                是什么让你有这样的感觉？
              </h1>
            </div>
          </motion.div>

          {/* Source Cards */}
          <div className="grid grid-cols-2 gap-3">
            {sources.map((source, index) => (
              <motion.button
                key={source}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
                onClick={() => handleSourceSelect(source)}
                className={`
                  w-full p-5 rounded-2xl backdrop-blur-xl border transition-all duration-200 text-center
                  ${selectedSource === source
                    ? 'bg-white/15 border-purple-400/50 shadow-[0_0_40px_rgba(168,85,247,0.6)] scale-[1.02]'
                    : 'bg-white/5 border-white/10 active:bg-white/15 active:border-purple-400/50 active:shadow-[0_0_40px_rgba(168,85,247,0.6)] active:scale-[0.98]'
                  }
                `}
              >
                {selectedSource === source && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/20 to-blue-500/20"
                  />
                )}
                <span className={`
                  relative z-10 transition-colors
                  ${selectedSource === source ? 'text-white' : 'text-white/80'}
                `}>
                  {source}
                </span>
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-20">
        <div className="max-w-md mx-auto px-6 pb-6">
          <div className="rounded-full bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.6)] p-4">
            <div className="flex justify-around items-center">
              <button 
                onClick={() => onNavigate(homeScreen)}
                className="flex flex-col items-center gap-1 text-purple-400"
              >
                <Home className="w-6 h-6" />
                <span className="text-xs">首页</span>
              </button>
              <button 
                onClick={() => onNavigate('history')}
                className="flex flex-col items-center gap-1 text-white/50 active:text-white/90 transition-colors"
              >
                <BarChart3 className="w-6 h-6" />
                <span className="text-xs">历史</span>
              </button>
              <button 
                onClick={() => onNavigate('profile')}
                className="flex flex-col items-center gap-1 text-white/50 active:text-white/90 transition-colors"
              >
                <User className="w-6 h-6" />
                <span className="text-xs">我的</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
