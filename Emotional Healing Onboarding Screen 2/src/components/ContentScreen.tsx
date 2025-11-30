import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Home, Sparkles, BarChart3, User, Play } from 'lucide-react';
import type { Screen } from '../App';

interface ContentScreenProps {
  onNavigate: (screen: Screen, data?: any) => void;
  onShowVIP: () => void;
  homeScreen?: Screen;
}

const wallpapers = [
  {
    id: 1,
    title: '护身壁纸',
    thumbnail: 'https://images.unsplash.com/photo-1687618083947-691b6c4adb4d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMGdyYWRpZW50JTIwd2FsbHBhcGVyfGVufDF8fHx8MTc2NDM4MDg3Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    tag: '护身',
    type: 'image' as const,
    locked: false
  },
  {
    id: 2,
    title: '疗愈壁纸',
    thumbnail: 'https://images.unsplash.com/photo-1764192114257-ae9ecf97eb6f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpdGF0aW9uJTIwcGVhY2VmdWwlMjBuYXR1cmV8ZW58MXx8fHwxNzY0MzcyMTE5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    tag: '护身',
    type: 'image' as const,
    locked: true
  },
  {
    id: 3,
    title: '能量壁纸',
    thumbnail: 'https://images.unsplash.com/photo-1695976725331-eda5d02c98fc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGlyaXR1YWwlMjBlbmVyZ3klMjBsaWdodHxlbnwxfHx8fDE3NjQ0MjE3MzN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    tag: '护身',
    type: 'image' as const,
    locked: true
  },
  {
    id: 4,
    title: '宇宙壁纸',
    thumbnail: 'https://images.unsplash.com/photo-1558470610-5cfea4b5c626?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3NtaWMlMjBwdXJwbGUlMjBibHVlfGVufDF8fHx8MTc2NDQyMTczNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    tag: '护身',
    type: 'image' as const,
    locked: true
  }
];

const dynamicWallpapers = [
  {
    id: 5,
    title: '水晶能量',
    thumbnail: 'https://images.unsplash.com/photo-1743448111530-3654e7b66f26?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsaW5nJTIwY3J5c3RhbCUyMGdyYWRpZW50fGVufDF8fHx8MTc2NDQyMTczNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    tag: '动态',
    type: 'video' as const,
    locked: true
  },
  {
    id: 6,
    title: '流动疗愈',
    thumbnail: 'https://images.unsplash.com/photo-1762383131232-0aaf570505f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkeW5hbWljJTIwd2F0ZXIlMjBmbG93fGVufDF8fHx8MTc2NDQyMTczNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    tag: '动态',
    type: 'video' as const,
    locked: true
  }
];

const audioTracks = [
  {
    id: 7,
    title: '冥想引导',
    tag: '引导',
    duration: '08:45',
    type: 'audio' as const,
    locked: true
  },
  {
    id: 8,
    title: '自然音效',
    tag: '音效',
    duration: '10:20',
    type: 'audio' as const,
    locked: true
  },
  {
    id: 9,
    title: '疗愈音乐',
    tag: '音效',
    duration: '05:32',
    type: 'audio' as const,
    locked: true
  },
  {
    id: 10,
    title: '深度放松',
    tag: '引导',
    duration: '12:15',
    type: 'audio' as const,
    locked: true
  }
];

export default function ContentScreen({ onNavigate, onShowVIP, homeScreen = 'returningUserEmotionSelection' }: ContentScreenProps) {
  const [activeTab, setActiveTab] = useState<'wallpaper' | 'dynamic' | 'audio'>('wallpaper');

  const handleItemClick = (item: any) => {
    // Check if locked (non-VIP)
    if (item.locked) {
      onShowVIP();
      return;
    }

    // Navigate to appropriate preview screen
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
    <div className="min-h-screen relative z-10 pb-24">
      {/* Fixed Top Navigation Bar */}
      <div className="fixed top-0 left-0 right-0 z-30 backdrop-blur-xl border-b border-white/5">
        <div className="w-full max-w-md mx-auto px-6 py-4">
          <h1 className="text-white text-xl">护身内容</h1>
        </div>
      </div>

      <div className="w-full max-w-md mx-auto pt-16">
        {/* Category Tabs */}
        <div className="px-6 pt-6 pb-4">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide">
            <button
              onClick={() => setActiveTab('wallpaper')}
              className={`
                flex-shrink-0 px-4 py-1.5 rounded-full backdrop-blur-xl border transition-all duration-300 whitespace-nowrap text-sm
                ${activeTab === 'wallpaper'
                  ? 'bg-purple-500/20 border-purple-400/50 text-white shadow-[0_0_20px_rgba(168,85,247,0.4)]'
                  : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10'
                }
              `}
            >
              护身壁纸
            </button>
            <button
              onClick={() => setActiveTab('dynamic')}
              className={`
                flex-shrink-0 px-4 py-1.5 rounded-full backdrop-blur-xl border transition-all duration-300 whitespace-nowrap text-sm
                ${activeTab === 'dynamic'
                  ? 'bg-purple-500/20 border-purple-400/50 text-white shadow-[0_0_20px_rgba(168,85,247,0.4)]'
                  : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10'
                }
              `}
            >
              动态壁纸
            </button>
            <button
              onClick={() => setActiveTab('audio')}
              className={`
                flex-shrink-0 px-4 py-1.5 rounded-full backdrop-blur-xl border transition-all duration-300 whitespace-nowrap text-sm
                ${activeTab === 'audio'
                  ? 'bg-purple-500/20 border-purple-400/50 text-white shadow-[0_0_20px_rgba(168,85,247,0.4)]'
                  : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10'
                }
              `}
            >
              疗愈���频
            </button>
          </div>
        </div>

        <div className="p-6 pt-0">
          {/* 护身壁纸 */}
          {activeTab === 'wallpaper' && (
            <motion.div
              key="wallpaper"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-2 gap-4"
            >
              {wallpapers.map((wallpaper, index) => (
                <motion.button
                  key={wallpaper.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => handleItemClick(wallpaper)}
                  className="relative rounded-2xl overflow-hidden aspect-[9/16] group"
                >
                  <img
                    src={wallpaper.thumbnail}
                    alt={wallpaper.title}
                    className="w-full h-full object-cover"
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
                  
                  <div className="absolute inset-0 border border-white/10 rounded-2xl group-hover:border-purple-400/50 group-hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all duration-300" />
                  
                  <div className="absolute bottom-3 left-3 right-3">
                    <p className="text-white text-sm drop-shadow-lg">{wallpaper.title}</p>
                  </div>
                </motion.button>
              ))}
            </motion.div>
          )}

          {/* 动态壁纸 */}
          {activeTab === 'dynamic' && (
            <motion.div
              key="dynamic"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-2 gap-4"
            >
              {dynamicWallpapers.map((wallpaper, index) => (
                <motion.button
                  key={wallpaper.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => handleItemClick(wallpaper)}
                  className="relative rounded-2xl overflow-hidden aspect-[9/16] group"
                >
                  <img
                    src={wallpaper.thumbnail}
                    alt={wallpaper.title}
                    className="w-full h-full object-cover"
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
                  
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-blue-500/20"
                    animate={{
                      opacity: [0.2, 0.4, 0.2],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  />
                  
                  <div className="absolute inset-0 border border-white/10 rounded-2xl group-hover:border-purple-400/50 group-hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all duration-300" />
                  
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center">
                      <Play className="w-6 h-6 text-white ml-0.5" />
                    </div>
                  </div>
                  
                  <div className="absolute bottom-3 left-3 right-3">
                    <p className="text-white text-sm drop-shadow-lg">{wallpaper.title}</p>
                  </div>
                </motion.button>
              ))}
            </motion.div>
          )}

          {/* 疗愈音频 */}
          {activeTab === 'audio' && (
            <motion.div
              key="audio"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-3"
            >
              {audioTracks.map((audio, index) => (
                <motion.button
                  key={audio.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => handleItemClick(audio)}
                  className="w-full p-4 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 hover:border-purple-400/30 hover:shadow-[0_0_20px_rgba(168,85,247,0.3)] transition-all duration-300 flex items-center gap-4"
                >
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-purple-400/30 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <Play className="w-5 h-5 text-purple-300 ml-0.5" />
                  </div>
                  
                  <div className="flex-1 text-left">
                    <p className="text-white/90 mb-1">{audio.title}</p>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded-full bg-purple-500/20 border border-purple-400/30 text-purple-200 text-xs">
                        {audio.tag}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-white/50 text-sm">{audio.duration}</span>
                  </div>
                </motion.button>
              ))}
            </motion.div>
          )}
        </div>
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
              <button className="flex flex-col items-center gap-1 text-purple-400">
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
    </div>
  );
}
