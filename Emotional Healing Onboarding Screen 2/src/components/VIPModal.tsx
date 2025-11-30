import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check, Crown } from 'lucide-react';

interface VIPModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const plans = [
  { id: 'day', name: '日卡', price: '0.99', tag: '仅当天', popular: false },
  { id: 'month', name: '月卡', price: '19.9', tag: '80%人的选择', popular: true },
  { id: 'year', name: '年卡', price: '199', tag: '最划算', popular: false }
];

const benefits = [
  '高清无水印图片',
  '专属疗愈音频',
  '动态能量壁纸',
  '90天历史报告'
];

export default function VIPModal({ isOpen, onClose }: VIPModalProps) {
  const [selectedPlan, setSelectedPlan] = useState('month');

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          />

          {/* Modal */}
          <div className="fixed inset-0 flex items-center justify-center z-50 p-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="w-full max-w-sm bg-gradient-to-br from-[#1a1a2e]/95 to-[#16213e]/95 backdrop-blur-2xl rounded-3xl border border-white/10 shadow-[0_8px_64px_rgba(0,0,0,0.8)] overflow-hidden"
            >
              {/* Header */}
              <div className="relative p-6 pb-4 text-center">
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 text-white/40 hover:text-white/80 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>

                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 mb-3 shadow-[0_0_40px_rgba(251,191,36,0.5)]">
                  <Crown className="w-7 h-7 text-white" />
                </div>

                <p className="text-white text-lg">
                  成为VIP，用五行能量陪伴每一天
                </p>
              </div>

              {/* Pricing Cards */}
              <div className="px-5 space-y-2.5 mb-5">
                {plans.map((plan) => (
                  <button
                    key={plan.id}
                    onClick={() => setSelectedPlan(plan.id)}
                    className={`
                      w-full p-4 rounded-2xl border transition-all duration-300 relative overflow-hidden
                      ${selectedPlan === plan.id
                        ? 'bg-white/10 border-purple-400/50 shadow-[0_0_30px_rgba(168,85,247,0.4)]'
                        : 'bg-white/5 border-white/10 hover:bg-white/8'
                      }
                    `}
                  >
                    {plan.popular && (
                      <div className="absolute top-0 right-0 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs px-3 py-1 rounded-bl-xl rounded-tr-2xl">
                        推荐
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`
                          w-5 h-5 rounded-full border-2 transition-all flex items-center justify-center
                          ${selectedPlan === plan.id
                            ? 'border-purple-400 bg-purple-400'
                            : 'border-white/30'
                          }
                        `}>
                          {selectedPlan === plan.id && (
                            <Check className="w-3 h-3 text-white" />
                          )}
                        </div>
                        <div className="text-left">
                          <div className="text-white">{plan.name}</div>
                          <div className={`text-xs ${plan.tag === '80%人的选择' ? 'text-yellow-400' : 'text-white/40'}`}>
                            {plan.tag}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-white text-lg">¥{plan.price}</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              {/* Benefits */}
              <div className="px-5 py-4 bg-white/5 border-t border-white/10">
                <h3 className="text-white/80 text-sm mb-3">VIP特权</h3>
                <div className="space-y-2.5">
                  {benefits.map((benefit) => (
                    <div key={benefit} className="flex items-center gap-2.5">
                      <div className="w-4 h-4 rounded-full bg-purple-500/20 flex items-center justify-center">
                        <Check className="w-2.5 h-2.5 text-purple-400" />
                      </div>
                      <span className="text-white/70 text-sm">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Confirm Button */}
              <div className="p-5">
                <div className="text-center mb-3">
                  <span className="text-yellow-400 text-sm bg-yellow-400/10 px-4 py-1.5 rounded-full border border-yellow-400/30">
                    已有3283人选择陪伴情绪
                  </span>
                </div>
                <button className="w-full py-4 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-[0_0_40px_rgba(251,191,36,0.5)] hover:shadow-[0_0_60px_rgba(251,191,36,0.7)] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                  <span className="relative z-10">立即解锁VIP</span>
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
