import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import type { Screen } from '../App';

interface CalculatingScreenProps {
  onNavigate: (screen: Screen) => void;
}

const elements = [
  { name: '木', color: '#10b981', angle: 0 },
  { name: '火', color: '#f97316', angle: 72 },
  { name: '土', color: '#eab308', angle: 144 },
  { name: '金', color: '#94a3b8', angle: 216 },
  { name: '水', color: '#3b82f6', angle: 288 }
];

const messages = [
  '每个人都有独特的能量密码',
  '你的情绪陪伴即将开始'
];

export default function CalculatingScreen({ onNavigate }: CalculatingScreenProps) {
  const [activeElement, setActiveElement] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const elementInterval = setInterval(() => {
      setActiveElement((prev) => (prev + 1) % elements.length);
    }, 800);

    const messageInterval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % messages.length);
    }, 3000);

    const timeout = setTimeout(() => {
      onNavigate('report');
    }, 5000);

    return () => {
      clearInterval(elementInterval);
      clearInterval(messageInterval);
      clearTimeout(timeout);
    };
  }, [onNavigate]);

  return (
    <div className="min-h-screen flex items-start justify-center px-6 pt-24 pb-12 relative z-10">
      <div className="w-full max-w-md text-center">
        {/* Element Orbs in Circle */}
        <div className="relative w-56 h-56 mx-auto mb-8">
          {/* Center pulsing ring */}
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute inset-0 rounded-full border-2 border-purple-400/50 shadow-[0_0_40px_rgba(168,85,247,0.6)]"
          />

          {/* Element Orbs */}
          {elements.map((element, index) => {
            const radius = 90;
            const angleRad = (element.angle * Math.PI) / 180;
            const x = radius * Math.cos(angleRad - Math.PI / 2);
            const y = radius * Math.sin(angleRad - Math.PI / 2);
            const isActive = index === activeElement;

            return (
              <motion.div
                key={element.name}
                className="absolute top-1/2 left-1/2"
                style={{
                  transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`
                }}
                animate={{
                  scale: isActive ? [1, 1.2, 1] : 1,
                }}
                transition={{
                  duration: 0.8,
                  ease: "easeInOut"
                }}
              >
                <div
                  className="w-14 h-14 rounded-full backdrop-blur-xl border-2 flex items-center justify-center transition-all duration-300"
                  style={{
                    backgroundColor: `${element.color}20`,
                    borderColor: isActive ? element.color : `${element.color}40`,
                    boxShadow: isActive ? `0 0 30px ${element.color}` : `0 0 15px ${element.color}40`
                  }}
                >
                  <span
                    className="transition-all duration-300"
                    style={{
                      color: element.color,
                      textShadow: isActive ? `0 0 15px ${element.color}` : 'none'
                    }}
                  >
                    {element.name}
                  </span>
                </div>
              </motion.div>
            );
          })}

          {/* Center glow */}
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.5, 0.8, 0.5]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-gradient-to-br from-purple-500/40 to-blue-500/40 blur-lg"
          />
        </div>

        {/* Progress Bar */}
        <div className="w-full max-w-xs mx-auto mb-8">
          <div className="relative h-2 bg-white/10 rounded-full overflow-hidden backdrop-blur-xl">
            <motion.div
              animate={{
                width: `${((activeElement + 1) / elements.length) * 100}%`
              }}
              transition={{
                duration: 0.5,
                ease: "easeOut"
              }}
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full shadow-[0_0_20px_rgba(168,85,247,0.8)]"
            />
          </div>
          <p className="text-white/50 text-xs mt-3">
            正在分析中 {Math.round(((activeElement + 1) / elements.length) * 100)}%
          </p>
        </div>

        {/* Dynamic Messages */}
        <AnimatePresence mode="wait">
          <motion.p
            key={messageIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="text-white/80 mb-6"
          >
            {messages[messageIndex]}
          </motion.p>
        </AnimatePresence>

        {/* Loading dots */}
        <div className="flex justify-center gap-2">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 1, 0.3]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2
              }}
              className="w-2 h-2 rounded-full bg-purple-400"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
