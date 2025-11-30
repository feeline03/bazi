import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, Play, Pause, Heart, Clock, Volume2 } from 'lucide-react';
import type { Screen } from '../App';

interface AudioPlayerScreenProps {
  title: string;
  duration: string;
  onNavigate: (screen: Screen) => void;
  onShowVIP: () => void;
}

export default function AudioPlayerScreen({ 
  title, 
  duration,
  onNavigate,
  onShowVIP 
}: AudioPlayerScreenProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTimerModal, setShowTimerModal] = useState(false);

  const handlePlayClick = () => {
    onShowVIP(); // Trigger VIP for full playback
  };

  const handleFavoriteClick = () => {
    onShowVIP(); // Trigger VIP for favorite
  };

  const handleTimerClick = () => {
    setShowTimerModal(true);
  };

  const handleTimerSelect = (minutes: number) => {
    setShowTimerModal(false);
    onShowVIP(); // Trigger VIP for timer setting
  };

  return (
    <div className="min-h-screen relative z-10 flex flex-col">
      {/* Top Bar */}
      <div className="p-6">
        <button 
          onClick={() => onNavigate('report')}
          className="text-white/70 hover:text-white transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6">
        {/* Audio Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-white/90 text-2xl text-center mb-12"
        >
          {title}
        </motion.h1>

        {/* Large Circular Audio Disk with Glow Ring */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="relative mb-12"
        >
          {/* Animated Glow Rings */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(168,85,247,0.4) 0%, transparent 70%)',
              filter: 'blur(20px)',
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.4, 0.6, 0.4],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          {/* Main Disk */}
          <div className="relative w-64 h-64 rounded-full bg-gradient-to-br from-purple-500/20 to-blue-500/20 backdrop-blur-xl border border-purple-400/30 shadow-[0_0_60px_rgba(168,85,247,0.6),inset_0_0_60px_rgba(168,85,247,0.2)] flex items-center justify-center">
            {/* Inner Glow */}
            <div className="absolute inset-8 rounded-full bg-gradient-to-br from-purple-600/10 to-blue-600/10 border border-purple-400/20" />
            
            {/* Volume Icon */}
            <Volume2 className="w-24 h-24 text-white/80" />

            {/* Animated Wave Lines */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
              <motion.circle
                cx="50"
                cy="50"
                r="35"
                stroke="rgba(168,85,247,0.3)"
                strokeWidth="0.5"
                fill="none"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
              <motion.circle
                cx="50"
                cy="50"
                r="40"
                stroke="rgba(59,130,246,0.3)"
                strokeWidth="0.5"
                fill="none"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 0.5,
                }}
              />
            </svg>
          </div>
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="w-full max-w-sm mb-3"
        >
          <div className="h-1 bg-white/10 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-to-r from-purple-500 to-blue-500"
              initial={{ width: '0%' }}
              animate={{ width: '30%' }}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </div>
        </motion.div>

        {/* Time Display */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex justify-between w-full max-w-sm text-white/50 text-sm mb-12"
        >
          <span>0:00</span>
          <span>{duration}</span>
        </motion.div>

        {/* Control Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex items-center gap-6"
        >
          {/* Favorite Button */}
          <button
            onClick={handleFavoriteClick}
            className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/20 hover:border-purple-400/50 hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all duration-300"
          >
            <Heart className="w-6 h-6" />
          </button>

          {/* Play/Pause Button */}
          <button
            onClick={handlePlayClick}
            className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white shadow-[0_0_40px_rgba(168,85,247,0.7)] hover:shadow-[0_0_60px_rgba(168,85,247,0.9)] hover:scale-105 transition-all duration-300"
          >
            {isPlaying ? (
              <Pause className="w-10 h-10" />
            ) : (
              <Play className="w-10 h-10 ml-1" />
            )}
          </button>

          {/* Timer Button */}
          <button
            onClick={handleTimerClick}
            className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/20 hover:border-purple-400/50 hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all duration-300"
          >
            <Clock className="w-6 h-6" />
          </button>
        </motion.div>
      </div>

      {/* Bottom Hint Text */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="pb-8 text-center"
      >
        <p className="text-white/30 text-xs">未解锁功能需开通VIP</p>
      </motion.div>

      {/* Timer Modal */}
      {showTimerModal && (
        <div 
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-6"
          onClick={() => setShowTimerModal(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-sm rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.6)] p-6"
          >
            <h3 className="text-white/90 text-lg mb-4 text-center">选择播放时长</h3>
            <div className="space-y-3">
              {[5, 10, 20, 30].map((minutes) => (
                <button
                  key={minutes}
                  onClick={() => handleTimerSelect(minutes)}
                  className="w-full py-4 rounded-2xl bg-white/5 border border-white/10 text-white/80 hover:bg-purple-500/20 hover:border-purple-400/50 hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all duration-300"
                >
                  {minutes}分钟
                </button>
              ))}
            </div>
            <button
              onClick={() => setShowTimerModal(false)}
              className="w-full mt-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-white/50 hover:text-white/80 transition-colors"
            >
              取消
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
}
