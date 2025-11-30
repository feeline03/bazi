import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import { Home, BarChart3, User, Lock, Play, Volume2, ChevronLeft, ChevronDown } from 'lucide-react';
import type { Screen } from '../App';

interface EmotionalReportScreenProps {
  onNavigate: (screen: Screen, data?: any) => void;
  onShowVIP: () => void;
}

type MediaType = 'image' | 'video' | 'audio';

const radarData = [
  { element: '木', value: 75 },
  { element: '火', value: 90 },
  { element: '土', value: 60 },
  { element: '金', value: 50 },
  { element: '水', value: 65 }
];

const prescriptionItems = [
  { 
    title: '护身壁纸', 
    locked: false,
    type: 'image' as const,
    thumbnail: 'https://images.unsplash.com/photo-1687618084751-64f314f7c15e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMHdhbGxwYXBlciUyMGdyYWRpZW50fGVufDF8fHx8MTc2NDMyODI5OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  },
  { 
    title: '护身壁纸', 
    locked: false,
    type: 'image' as const,
    thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxhYnN0cmFjdCUyMHdhbGxwYXBlciUyMGdyYWRpZW50fGVufDF8fHx8MTc2NDMyODI5OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  },
  { 
    title: '动态能量壁纸', 
    locked: true,
    type: 'video' as const,
    thumbnail: 'https://images.unsplash.com/photo-1608657354857-7da58e290436?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpdGF0aW9uJTIwcGVhY2VmdWwlMjB2aWRlb3xlbnwxfHx8fDE3NjQzMjgyOTl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  },
  { 
    title: '疗愈音频', 
    locked: true,
    type: 'audio' as const,
    duration: '5:32'
  }
];

export default function EmotionalReportScreen({ onNavigate, onShowVIP }: EmotionalReportScreenProps) {
  const handleMediaClick = (item: typeof prescriptionItems[0]) => {
    if (item.type === 'audio') {
      onNavigate('audioPlayer', {
        title: item.title,
        duration: item.duration
      });
    } else {
      onNavigate('wallpaperPreview', {
        wallpaperUrl: item.thumbnail,
        title: item.title,
        isVideo: item.type === 'video'
      });
    }
  };

  return (
    <div className="min-h-screen relative z-10 pb-8">
      {/* Fixed Top bar with back button and date */}
      <div className="fixed top-0 left-0 right-0 z-30 backdrop-blur-xl border-b border-white/5">
        <div className="w-full max-w-md mx-auto px-6 py-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between"
          >
            <button 
              onClick={() => onNavigate('emotionSelection')}
              className="text-white/50 hover:text-white/80 transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <p className="text-white text-sm text-[20px]">2025年11月28日</p>
            <div className="w-6" /> {/* Spacer for centering */}
          </motion.div>
        </div>
      </div>

      <div className="w-full max-w-md mx-auto p-6 pt-20">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-center mb-6"
        >
          <h1 className="flex items-center justify-center gap-2 bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
            <span className="text-4xl">🔥</span>
            <span className="text-4xl">火能量日</span>
          </h1>
        </motion.div>

        {/* Five Elements Radar Chart */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-6 p-6 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
        >
          <h2 className="text-white/90 text-lg mb-4 text-center text-[20px]">五行能量分布</h2>
          <ResponsiveContainer width="100%" height={280}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="rgba(255,255,255,0.1)" />
              <PolarAngleAxis 
                dataKey="element" 
                tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 14 }}
              />
              <Radar
                dataKey="value"
                stroke="#a855f7"
                fill="#a855f7"
                fillOpacity={0.4}
                strokeWidth={2}
              />
            </RadarChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-4">
            <p className="text-white/70 text-sm leading-relaxed">
              今天你的火能量达到顶峰，这意味着你充满激情和创造力。建议多做一些需要专注的事情，同时注意控制情绪，避免过度焦虑。
            </p>
            <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            <p className="text-white/70 text-sm leading-relaxed">
              你的金能量较弱，需要补充一些冷静和理性的思考。
            </p>
          </div>
        </motion.div>

        {/* Color Energy Recommendation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-6 p-6 rounded-2xl bg-gradient-to-r from-red-500 to-orange-500 shadow-[0_0_40px_rgba(239,68,68,0.5)] flex items-center gap-5"
        >
          {/* Icon */}
          <div className="flex-none w-16 h-16 rounded-xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-3xl">
            🔥
          </div>
          
          {/* Text Content */}
          <div className="flex-1 flex flex-col justify-center">
            <h3 className="text-white mb-2">
              今天需要补红色能量
            </h3>
            <p className="text-white/80 text-xs leading-relaxed">
              使用红色相关物品可以增强你的活力
            </p>
          </div>
        </motion.div>

        {/* Emotional Prescription Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          {/* Title */}
          <h2 className="text-white/90 text-lg mb-4 text-[20px]">你的今日情绪处方</h2>
          
          {/* Guide */}
          <div className="mb-6 p-4 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
            <h3 className="text-white/90 mb-1 text-[20px] text-center">壁纸护身</h3>
            <p className="text-white/50 leading-relaxed text-center text-[16px]">
              每1次激活手机都是1次能量补充
            </p>
            <div className="flex justify-center mt-3">
              <motion.div
                animate={{
                  y: [0, 8, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <ChevronDown className="w-6 h-6 text-red-500" />
              </motion.div>
            </div>
          </div>

          {/* Prescription Items Grid */}
          <div className="grid grid-cols-2 gap-4">
            {prescriptionItems.map((item, index) => (
              <button
                key={`${item.title}-${index}`}
                onClick={() => handleMediaClick(item)}
                className="relative rounded-3xl overflow-hidden group"
                style={{ aspectRatio: '3/4' }}
              >
                {/* Background Image for wallpapers and videos */}
                {item.type !== 'audio' && item.thumbnail && (
                  <div 
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${item.thumbnail})` }}
                  />
                )}
                
                {/* Audio Card - Glassmorphic */}
                {item.type === 'audio' && (
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-blue-500/20 backdrop-blur-xl border border-purple-400/30 shadow-[0_0_40px_rgba(168,85,247,0.6),inset_0_0_40px_rgba(168,85,247,0.2)]">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-blue-600/10" />
                  </div>
                )}

                {/* Subtle overlay for image/video cards */}
                {item.type !== 'audio' && (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                )}

                {/* Hover effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />

                {/* Content */}
                <div className="relative h-full flex flex-col">
                  {/* Audio: Duration at top right */}
                  {item.type === 'audio' && item.duration && (
                    <div className="absolute top-4 right-4">
                      <span className="inline-block px-3 py-1 rounded-full bg-black/30 backdrop-blur-md border border-white/20 text-white/90 text-xs">
                        {item.duration}
                      </span>
                    </div>
                  )}

                  {/* Play Button - Centered for Audio and Video */}
                  {(item.type === 'video' || item.type === 'audio') && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
                        {item.type === 'audio' ? (
                          <Volume2 className="w-8 h-8 text-white" />
                        ) : (
                          <Play className="w-8 h-8 text-white ml-1" />
                        )}
                      </div>
                    </div>
                  )}

                  {/* Title at bottom */}
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <span className="text-white text-sm drop-shadow-lg">
                      {item.title}
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </motion.div>

        {/* More Content Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 mb-8"
        >
          <button
            onClick={() => onNavigate('content')}
            className="w-full py-4 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 backdrop-blur-xl border border-purple-400/30 hover:from-purple-500/30 hover:to-blue-500/30 hover:border-purple-400/50 hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] transition-all duration-300 text-white"
          >
            更多护身内容
          </button>
        </motion.div>
      </div>
    </div>
  );
}
