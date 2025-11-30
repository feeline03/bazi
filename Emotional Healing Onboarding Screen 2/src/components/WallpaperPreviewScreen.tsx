import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Download, Smartphone, ChevronLeft, X } from 'lucide-react';
import type { Screen } from '../App';

interface WallpaperPreviewScreenProps {
  wallpaperUrl: string;
  title: string;
  isVideo?: boolean;
  onNavigate: (screen: Screen) => void;
  onShowVIP: () => void;
}

export default function WallpaperPreviewScreen({ 
  wallpaperUrl, 
  title, 
  isVideo = false,
  onNavigate,
  onShowVIP 
}: WallpaperPreviewScreenProps) {
  const [showPreview, setShowPreview] = useState(false);

  return (
    <div className="min-h-screen relative z-10 overflow-hidden">
      {/* Fullscreen Wallpaper Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${wallpaperUrl})` }}
      />

      {/* Floating Particles Effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/40" />

      {/* Top Bar */}
      <div className="absolute top-0 left-0 right-0 z-20 p-6">
        <button 
          onClick={() => onNavigate('report')}
          className="text-white/70 hover:text-white transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      </div>

      {/* Watermark */}
      <div className="absolute bottom-32 right-6 z-10">
        <div className="text-white/30 text-sm tracking-widest">
          五行情绪
        </div>
      </div>

      {/* Bottom Control Bar */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="absolute bottom-0 left-0 right-0 z-20"
      >
        <div className="max-w-md mx-auto px-6 pb-8">
          <div className="rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.6)] p-4">
            <div className="flex gap-3">
              {/* Primary Button - Save HD Wallpaper */}
              <button
                onClick={onShowVIP}
                className="flex-1 py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-[0_0_30px_rgba(168,85,247,0.6)] hover:shadow-[0_0_40px_rgba(168,85,247,0.8)] transition-all duration-300 flex items-center justify-center gap-2 group"
              >
                <Download className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span>保存高清壁纸</span>
              </button>

              {/* Secondary Button - Preview */}
              <button
                onClick={() => setShowPreview(true)}
                className="px-6 py-4 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 text-white hover:bg-white/20 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Smartphone className="w-5 h-5" />
                <span>预览</span>
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Phone Preview Modal */}
      {showPreview && (
        <div className="absolute inset-0 z-30 bg-black/90 backdrop-blur-xl flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative w-full max-w-sm"
          >
            {/* Preview Text */}
            <div className="text-center mb-6">
              <p className="text-white/60 text-sm">当前预览状态：手机显示效果</p>
            </div>

            {/* Phone Mockup */}
            <div className="relative mx-auto mb-6" style={{ width: '280px' }}>
              {/* Phone Frame */}
              <div className="relative rounded-[3rem] border-[8px] border-gray-800 bg-black shadow-2xl overflow-hidden">
                {/* Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-b-2xl z-10" />
                
                {/* Screen */}
                <div className="relative" style={{ aspectRatio: '9/19.5' }}>
                  <img
                    src={wallpaperUrl}
                    alt={title}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Lock Screen Time */}
                  <div className="absolute top-20 left-0 right-0 text-center">
                    <div className="text-white text-5xl font-light">14:32</div>
                    <div className="text-white/60 text-sm mt-1">11月29日 星期六</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => setShowPreview(false)}
                className="px-6 py-4 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 text-white hover:bg-white/20 transition-all duration-300"
              >
                关闭
              </button>
              <button
                onClick={onShowVIP}
                className="flex-1 py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-[0_0_30px_rgba(168,85,247,0.6)] hover:shadow-[0_0_40px_rgba(168,85,247,0.8)] transition-all duration-300 flex items-center justify-center gap-2 group"
              >
                <Download className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span>保存壁纸</span>
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
