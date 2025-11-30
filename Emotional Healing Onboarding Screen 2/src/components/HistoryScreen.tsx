import React, { useState } from 'react';
import { motion } from 'motion/react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Home, BarChart3, User, Sparkles } from 'lucide-react';
import type { Screen } from '../App';

interface HistoryScreenProps {
  onNavigate: (screen: Screen) => void;
  homeScreen?: Screen;
}

type TimeRange = '当天' | '近7天' | '近30天' | '近90天';

const emotionData = [
  { date: '11/22', mood: 65, emoji: '😊' },
  { date: '11/23', mood: 45, emoji: '😔' },
  { date: '11/24', mood: 70, emoji: '😌' },
  { date: '11/25', mood: 55, emoji: '🤔' },
  { date: '11/26', mood: 80, emoji: '😊' },
  { date: '11/27', mood: 60, emoji: '😌' },
  { date: '11/28', mood: 75, emoji: '😊' }
];

const elementData = [
  { name: '木', value: 75, color: '#10b981' },
  { name: '火', value: 90, color: '#f97316' },
  { name: '土', value: 60, color: '#eab308' },
  { name: '金', value: 50, color: '#94a3b8' },
  { name: '水', value: 65, color: '#3b82f6' }
];

const calendarDays = Array.from({ length: 30 }, (_, i) => ({
  day: i + 1,
  intensity: Math.random()
}));

export default function HistoryScreen({ onNavigate, homeScreen = 'returningUserEmotionSelection' }: HistoryScreenProps) {
  const [timeRange, setTimeRange] = useState<TimeRange>('近7天');

  return (
    <div className="min-h-screen relative z-10 pb-24">
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 right-0 z-30 backdrop-blur-xl border-b border-white/5">
        <div className="w-full max-w-md mx-auto px-6 py-4">
          <h1 className="text-white text-xl">情绪历史</h1>
        </div>
      </div>

      <div className="w-full max-w-md mx-auto p-6 pt-20">
        {/* Time Range Filter */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <div className="flex gap-2 overflow-x-auto pb-2">
            {(['当天', '近7天', '近30天', '近90天'] as TimeRange[]).map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`
                  px-5 py-2 rounded-full backdrop-blur-xl border transition-all duration-300 whitespace-nowrap
                  ${timeRange === range
                    ? 'bg-purple-500/20 border-purple-400/50 text-white shadow-[0_0_20px_rgba(168,85,247,0.4)]'
                    : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10'
                  }
                `}
              >
                {range}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Emotion Trend Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6 p-6 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
        >
          <h2 className="text-white/90 text-lg mb-4">情绪趋势</h2>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={emotionData}>
              <XAxis 
                dataKey="date" 
                stroke="rgba(255,255,255,0.3)"
                tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 12 }}
              />
              <YAxis 
                stroke="rgba(255,255,255,0.3)"
                tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 12 }}
              />
              <Line
                type="monotone"
                dataKey="mood"
                stroke="#a855f7"
                strokeWidth={3}
                dot={{ fill: '#a855f7', r: 5 }}
                activeDot={{ r: 7, fill: '#a855f7' }}
              />
            </LineChart>
          </ResponsiveContainer>
          
          <div className="mt-4 p-4 rounded-2xl bg-white/5 border border-white/10">
            <p className="text-white/70 text-sm">
              本周你的整体情绪呈上升趋势，火能量持续旺盛，建议保持当前的生活节奏，同时注意补充水能量以达到平衡。
            </p>
          </div>
        </motion.div>

        {/* Five Elements Bar Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6 p-6 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
        >
          <h2 className="text-white/90 text-lg mb-4">五行能量统计</h2>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={elementData}>
              <XAxis 
                dataKey="name" 
                stroke="rgba(255,255,255,0.3)"
                tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 14 }}
              />
              <YAxis 
                stroke="rgba(255,255,255,0.3)"
                tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 12 }}
              />
              <Bar 
                dataKey="value" 
                fill="#a855f7"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Calendar Heatmap */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-6 p-6 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
        >
          <h2 className="text-white/90 text-lg mb-4">打卡日历</h2>
          <div className="grid grid-cols-7 gap-2">
            {calendarDays.map((day) => {
              const intensity = day.intensity;
              let bgColor = 'bg-white/5';
              if (intensity > 0.7) bgColor = 'bg-purple-500/60';
              else if (intensity > 0.4) bgColor = 'bg-purple-500/40';
              else if (intensity > 0.2) bgColor = 'bg-purple-500/20';
              
              return (
                <div
                  key={day.day}
                  className={`aspect-square rounded-lg ${bgColor} border border-white/10 flex items-center justify-center transition-all hover:scale-110 hover:shadow-[0_0_20px_rgba(168,85,247,0.4)]`}
                >
                  <span className="text-white/60 text-xs">{day.day}</span>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-20">
        <div className="max-w-md mx-auto px-6 pb-6">
          <div className="rounded-full bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.6)] p-4">
            <div className="flex justify-around items-center">
              <button 
                onClick={() => onNavigate(homeScreen)}
                className="flex flex-col items-center gap-1 text-white/50 hover:text-white/90 transition-colors"
              >
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
              <button className="flex flex-col items-center gap-1 text-purple-400">
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
    </div>
  );
}
