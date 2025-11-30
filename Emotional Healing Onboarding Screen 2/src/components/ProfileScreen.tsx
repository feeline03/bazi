import React from 'react';
import { motion } from 'motion/react';
import { Crown, Calendar, Bell, Heart, Settings, ChevronRight, Home, BarChart3, User, Sparkles } from 'lucide-react';
import type { Screen } from '../App';

interface ProfileScreenProps {
  onNavigate: (screen: Screen) => void;
  onShowVIP: () => void;
  homeScreen?: Screen;
}

const menuItems = [
  { icon: Calendar, label: '补打卡', color: 'text-purple-400' },
  { icon: Bell, label: '订阅通知', color: 'text-blue-400' },
  { icon: Heart, label: '我的收藏', color: 'text-pink-400' },
  { icon: Settings, label: '设置', color: 'text-gray-400' }
];

export default function ProfileScreen({ onNavigate, onShowVIP, homeScreen = 'returningUserEmotionSelection' }: ProfileScreenProps) {
  return (
    <div className="min-h-screen relative z-10 pb-24">
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 right-0 z-30 backdrop-blur-xl border-b border-white/5">
        <div className="w-full max-w-md mx-auto px-6 py-4">
          <h1 className="text-white text-xl">我的</h1>
        </div>
      </div>

      <div className="w-full max-w-md mx-auto p-6 pt-20">
        {/* User Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="p-6 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
            <div className="flex items-center gap-4 mb-6">
              {/* Avatar with VIP ring */}
              <div className="relative">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 p-1 shadow-[0_0_30px_rgba(168,85,247,0.5)]">
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-indigo-900 to-purple-900 flex items-center justify-center text-2xl">
                    🧘
                  </div>
                </div>
                <div className="absolute -bottom-1 -right-1 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full p-1 shadow-[0_0_20px_rgba(251,191,36,0.6)]">
                  <Crown className="w-5 h-5 text-white" />
                </div>
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="text-white text-xl">情绪疗愈师</h2>
                  <span className="px-3 py-1 rounded-full bg-gradient-to-r from-yellow-400/20 to-orange-500/20 border border-yellow-400/30 text-yellow-400 text-xs">
                    VIP
                  </span>
                </div>
                <p className="text-white/50 text-sm">剩余 285 天</p>
              </div>
            </div>

            {/* VIP Privilege Card */}
            <button 
              onClick={onShowVIP}
              className="w-full p-4 rounded-2xl bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-400/20 relative overflow-hidden hover:from-yellow-500/15 hover:to-orange-500/15 hover:border-yellow-400/30 hover:shadow-[0_0_20px_rgba(251,191,36,0.3)] transition-all duration-300 group"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-400/10 rounded-full blur-2xl" />
              <div className="relative z-10 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Crown className="w-4 h-4 text-yellow-400" />
                    <span className="text-yellow-400 text-sm">VIP特权</span>
                  </div>
                  <p className="text-white/70 text-xs text-left text-[12px]">
                    尊享完整情绪疗愈方案，高清壁纸，专属音频
                  </p>
                </div>
                <ChevronRight className="w-5 h-5 text-yellow-400/60 group-hover:text-yellow-400 group-hover:translate-x-1 transition-all flex-shrink-0 ml-2" />
              </div>
            </button>
          </div>
        </motion.div>

        {/* Menu Items */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-3"
        >
          {menuItems.map((item, index) => (
            <motion.button
              key={item.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index }}
              className="w-full p-5 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 hover:border-purple-400/30 hover:shadow-[0_0_20px_rgba(168,85,247,0.3)] transition-all duration-300 group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <item.icon className={`w-6 h-6 ${item.color}`} />
                  </div>
                  <span className="text-white/80 group-hover:text-white transition-colors">
                    {item.label}
                  </span>
                </div>
                <ChevronRight className="w-5 h-5 text-white/30 group-hover:text-white/60 group-hover:translate-x-1 transition-all" />
              </div>
            </motion.button>
          ))}
        </motion.div>

        {/* Stats Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 p-6 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
        >
          <h3 className="text-white/80 text-sm mb-4">本月统计</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl text-purple-400 mb-1">28</div>
              <div className="text-white/50 text-xs">打卡天数</div>
            </div>
            <div className="text-center">
              <div className="text-2xl text-blue-400 mb-1">156</div>
              <div className="text-white/50 text-xs">疗愈时长</div>
            </div>
            <div className="text-center">
              <div className="text-2xl text-pink-400 mb-1">23</div>
              <div className="text-white/50 text-xs">收藏内容</div>
            </div>
          </div>
        </motion.div>

        {/* Developer Reset Button (Hidden) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-4"
        >
          <button
            onClick={() => {
              if (window.confirm('重置用户状态？这将清除所有数据，下次启动将进入新用户流程。')) {
                localStorage.clear();
                window.location.reload();
              }
            }}
            className="w-full py-3 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 text-white/30 hover:text-white/60 hover:bg-white/10 transition-all text-sm"
          >
            🔧 开发者：重置用户状态
          </button>
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
              <button 
                onClick={() => onNavigate('history')}
                className="flex flex-col items-center gap-1 text-white/50 hover:text-white/90 transition-colors"
              >
                <BarChart3 className="w-6 h-6" />
                <span className="text-xs">历史</span>
              </button>
              <button className="flex flex-col items-center gap-1 text-purple-400">
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
