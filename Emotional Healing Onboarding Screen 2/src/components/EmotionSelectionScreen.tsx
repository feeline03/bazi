import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Home, BarChart3, User, Sparkles } from 'lucide-react';
import type { Screen, Emotion } from '../App';

interface EmotionSelectionScreenProps {
  onNavigate: (screen: Screen) => void;
  onEmotionSelect: (emotion: Emotion) => void;
  homeScreen?: Screen;
}

export default function EmotionSelectionScreen({ onNavigate, onEmotionSelect, homeScreen = 'emotionSelection' }: EmotionSelectionScreenProps) {
  const [selectedEmotion, setSelectedEmotion] = useState<Emotion | null>(null);
  const [showEmpathyModal, setShowEmpathyModal] = useState(false);
  const [clickedEmotion, setClickedEmotion] = useState<Emotion | null>(null);

  const emotions: { label: Emotion; color: string; emoji: string }[] = [
    { label: '焦虑', color: 'from-orange-500/80 to-red-500/80', emoji: '😰' },
    { label: '疲惫', color: 'from-gray-500/80 to-slate-600/80', emoji: '😔' },
    { label: '压抑', color: 'from-indigo-600/80 to-purple-700/80', emoji: '😞' },
    { label: '烦躁', color: 'from-red-500/80 to-pink-600/80', emoji: '😤' },
    { label: '委屈', color: 'from-blue-500/80 to-cyan-600/80', emoji: '😢' },
    { label: '一般', color: 'from-slate-500/80 to-gray-500/80', emoji: '😐' },
    { label: '平静', color: 'from-green-500/80 to-teal-500/80', emoji: '😌' },
    { label: '还好', color: 'from-blue-400/80 to-indigo-500/80', emoji: '😊' },
  ];

  const empathyMessages: Record<Emotion, string> = {
    '焦虑': '感受到你的不安了\n让我们一起找到内心的平静',
    '疲惫': '你已经很努力了\n是时候好好休息一下',
    '压抑': '被压抑的情绪需要被看见\n我们陪你一起释放',
    '烦躁': '烦躁的情绪背后\n藏着你未被满足的需求',
    '委屈': '你的委屈值得被理解\n让我们温柔对待自己',
    '一般': '平淡的日子里\n也需要关注内心的声音',
    '平静': '平静是一种力量\n让我们保持这份宁静',
    '还好': '感觉还好也值得被记录\n继续保持这份状态',
  };

  const handleEmotionClick = (emotion: Emotion) => {
    setClickedEmotion(emotion);
    setTimeout(() => {
      setSelectedEmotion(emotion);
      onEmotionSelect(emotion);
      setShowEmpathyModal(true);
      setClickedEmotion(null);
    }, 200);
  };

  useEffect(() => {
    if (showEmpathyModal && selectedEmotion) {
      // Auto navigate to emotion source after 2 seconds
      const timer = setTimeout(() => {
        onNavigate('emotionSource');
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [showEmpathyModal, selectedEmotion, onNavigate]);

  return (
    <>
      <div className="min-h-screen px-6 pt-24 pb-24 relative z-10">
        <div className="w-full max-w-md mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-10"
          >
            <div className="text-center">
              <h1 className="text-white/95 text-3xl mb-4 leading-tight">
                此刻的你，感觉如何？
              </h1>
              <p className="text-white/50 text-sm">
                选择最贴近你当下的情绪
              </p>
            </div>
          </motion.div>

          {/* Emotion Grid */}
          <div className="grid grid-cols-2 gap-3">
            {emotions.map((emotion, index) => (
              <motion.button
                key={emotion.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
                onClick={() => handleEmotionClick(emotion.label)}
                className={`
                  w-full p-5 rounded-2xl backdrop-blur-xl border transition-all duration-200 text-center
                  ${clickedEmotion === emotion.label
                    ? 'bg-white/15 border-purple-400/50 shadow-[0_0_40px_rgba(168,85,247,0.6)] scale-[0.98]'
                    : 'bg-white/5 border-white/10'
                  }
                `}
              >
                <span className={`transition-colors ${clickedEmotion === emotion.label ? 'text-white' : 'text-white/80'}`}>
                  {emotion.label}
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
              <button className="flex flex-col items-center gap-1 text-purple-400">
                <Home className="w-6 h-6" />
                <span className="text-xs">首页</span>
              </button>
              <button 
                onClick={() => onNavigate('content')}
                className="flex flex-col items-center gap-1 text-white/50 hover:text-white/90 transition-colors"
              >
                <Sparkles className="w-6 h-6" />
                <span className="text-xs">内容</span>
              </button>
              <button 
                onClick={() => onNavigate('history')}
                className="flex flex-col items-center gap-1 text-white/50 hover:text-white/90 transition-colors"
              >
                <BarChart3 className="w-6 h-6" />
                <span className="text-xs">历史</span>
              </button>
              <button 
                onClick={() => onNavigate('profile')}
                className="flex flex-col items-center gap-1 text-white/50 hover:text-white/90 transition-colors"
              >
                <User className="w-6 h-6" />
                <span className="text-xs">我的</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Empathy Modal */}
      <AnimatePresence>
        {showEmpathyModal && selectedEmotion && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-start justify-center p-6 pt-[30vh] bg-black/60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-sm"
            >
              <div className="relative p-10 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_8px_64px_rgba(0,0,0,0.4)]">
                {/* Glow effect */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 animate-pulse" />
                
                <div className="relative z-10 text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring" }}
                    className="text-7xl mb-6"
                  >
                    {emotions.find(e => e.label === selectedEmotion)?.emoji}
                  </motion.div>
                  
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-white text-xl leading-relaxed whitespace-pre-line"
                  >
                    {empathyMessages[selectedEmotion]}
                  </motion.p>

                  {/* Progress indicator */}
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 2, ease: "linear" }}
                    className="mt-8 h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full origin-left"
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
