import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Home, BarChart3, User, Sparkles, Flame } from 'lucide-react';
import type { Screen, Emotion } from '../App';

interface ReturningUserEmotionSelectionScreenProps {
  onNavigate: (screen: Screen) => void;
  onEmotionSelect: (emotion: Emotion) => void;
  homeScreen?: Screen;
}

export default function ReturningUserEmotionSelectionScreen({ onNavigate, onEmotionSelect, homeScreen = 'returningUserEmotionSelection' }: ReturningUserEmotionSelectionScreenProps) {
  const [greeting, setGreeting] = useState('');
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [continuousDays, setContinuousDays] = useState(0);
  const [totalDays, setTotalDays] = useState(0);

  // Get time-based greeting
  useEffect(() => {
    const hour = new Date().getHours();
    let greetingText = '';
    
    if (hour >= 5 && hour < 9) {
      greetingText = '早安';
    } else if (hour >= 9 && hour < 11) {
      greetingText = '上午好';
    } else if (hour >= 11 && hour < 14) {
      greetingText = '午安';
    } else if (hour >= 14 && hour < 18) {
      greetingText = '下午好';
    } else if (hour >= 18 || hour < 24) {
      greetingText = '晚安';
    } else if (hour >= 0 && hour < 5) {
      greetingText = '凌晨啦，还不睡吗？';
    }
    
    setGreeting(greetingText);

    // Load streak data from localStorage
    const lastCheckIn = localStorage.getItem('lastCheckInDate');
    const continuous = parseInt(localStorage.getItem('continuousDays') || '0');
    const total = parseInt(localStorage.getItem('totalDays') || '0');
    
    const today = new Date().toDateString();
    
    if (lastCheckIn === today) {
      // Already checked in today
      setContinuousDays(continuous);
      setTotalDays(total);
    } else {
      // Check if yesterday
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      
      if (lastCheckIn === yesterday.toDateString()) {
        // Continue streak
        setContinuousDays(continuous);
        setTotalDays(total);
      } else if (lastCheckIn) {
        // Streak broken, reset continuous
        setContinuousDays(0);
        setTotalDays(total);
      } else {
        // First time
        setContinuousDays(0);
        setTotalDays(0);
      }
    }
  }, []);

  const careQuestions = [
    {
      question: '此刻的你，更接近哪一种状态？',
      options: ['充满活力', '平静安稳', '有些疲惫', '情绪低落']
    }
  ];

  const currentQuestion = careQuestions[0];

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    
    // Save check-in data
    const today = new Date().toDateString();
    const lastCheckIn = localStorage.getItem('lastCheckInDate');
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    
    let newContinuous = continuousDays;
    let newTotal = totalDays;
    
    if (lastCheckIn !== today) {
      // New check-in
      if (lastCheckIn === yesterday.toDateString() || !lastCheckIn) {
        newContinuous = continuousDays + 1;
      } else {
        newContinuous = 1;
      }
      newTotal = totalDays + 1;
      
      localStorage.setItem('lastCheckInDate', today);
      localStorage.setItem('continuousDays', newContinuous.toString());
      localStorage.setItem('totalDays', newTotal.toString());
      
      setContinuousDays(newContinuous);
      setTotalDays(newTotal);
    }
    
    // Show toast
    setShowToast(true);
    
    // After 2 seconds, show modal
    setTimeout(() => {
      setShowToast(false);
      setShowModal(true);
    }, 2000);
  };

  const handleViewReport = () => {
    setShowModal(false);
    onNavigate('calculating');
  };

  const handleSkip = () => {
    onNavigate('calculating');
  };

  return (
    <>
      <div className="min-h-screen px-6 pt-20 pb-24 relative z-10">
        <div className="w-full max-w-md mx-auto">
          {/* Greeting Area - Left aligned with emoji */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-white text-2xl flex items-center gap-1">
              <span className="text-3xl">
                {(() => {
                  const hour = new Date().getHours();
                  if (hour >= 5 && hour < 9) return '🌅';
                  if (hour >= 9 && hour < 11) return '☀️';
                  if (hour >= 11 && hour < 14) return '🌤️';
                  if (hour >= 14 && hour < 18) return '🌆';
                  if (hour >= 18 || hour < 24) return '🌙';
                  return '🌃';
                })()}
              </span>
              <span>{greeting}</span>
            </h1>
          </motion.div>

          {/* Question Header - Left aligned */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8"
          >
            <h2 className="text-white/95 mb-2 leading-tight text-[28px]">
              {currentQuestion.question}
            </h2>
            <p className="text-white/50 text-sm">
              选择最贴近你当下的状态
            </p>
          </motion.div>

          {/* Options - Single column layout */}
          <div className="flex flex-col gap-3 mb-4">
            {currentQuestion.options.map((option, index) => (
              <motion.button
                key={option}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
                onClick={() => handleOptionClick(option)}
                className={`
                  w-full p-5 rounded-2xl backdrop-blur-xl border transition-all duration-200 text-center
                  ${selectedOption === option
                    ? 'bg-white/15 border-purple-400/50 shadow-[0_0_40px_rgba(168,85,247,0.6)] scale-[0.98]'
                    : 'bg-white/5 border-white/10'
                  }
                `}
              >
                <span className={`transition-colors ${selectedOption === option ? 'text-white' : 'text-white/80'}`}>
                  {option}
                </span>
              </motion.button>
            ))}
          </div>

          {/* Skip Link - Subtle text link */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-center"
          >
            <button 
              onClick={handleSkip}
              className="text-white/40 hover:text-white/70 transition-colors text-sm"
            >
              跳过，直接查看今日五行情绪 &gt;&gt;
            </button>
          </motion.div>
        </div>
      </div>

      {/* Continuous Streak Area - Bottom positioned, subtle */}
      <div className="fixed bottom-28 left-0 right-0 z-10 px-6 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="w-full max-w-md mx-auto text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-xl border border-white/10">
            <Flame className="w-4 h-4 text-orange-400/60" />
            <span className="text-white/40 text-xs">
              已连续 <span className="text-orange-400/80">{continuousDays}</span> 天 · 累计 <span className="text-purple-400/80">{totalDays}</span> 天
            </span>
          </div>
        </motion.div>
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

      {/* Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-50"
          >
            <div className="px-8 py-4 rounded-full bg-gradient-to-r from-purple-500/90 to-blue-500/90 backdrop-blur-xl border border-purple-400/50 shadow-[0_8px_32px_rgba(168,85,247,0.6)]">
              <span className="text-white text-sm">✨ 打卡成功</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-sm"
            >
              <div className="relative p-10 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_8px_64px_rgba(0,0,0,0.4)]">
                {/* Animated glow effect */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 animate-pulse" />
                
                <div className="relative z-10 text-center">
                  {/* Icon */}
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    className="text-7xl mb-6"
                  >
                    🔮
                  </motion.div>
                  
                  {/* Title - Fixed height container with dynamic text size */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="h-24 flex items-center justify-center mb-8"
                  >
                    <h3 className={`text-white leading-relaxed ${selectedOption && selectedOption.length > 6 ? 'text-xl' : 'text-2xl'}`}>
                      你的今日五行情绪<br />已准备好
                    </h3>
                  </motion.div>

                  {/* Button */}
                  <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    onClick={handleViewReport}
                    className="w-full py-5 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 text-white text-lg shadow-[0_0_40px_rgba(168,85,247,0.6)] hover:shadow-[0_0_60px_rgba(168,85,247,0.8)] transition-all duration-300"
                  >
                    查看今日五行情绪
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
