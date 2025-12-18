'use client';
import { motion } from 'framer-motion';

const items = [
  "LIVE SETTLEMENTS", "P2P ARBITRAGE", "99.9% UPTIME", "YMC ELITE CLUB", 
  "FAST WITHDRAWALS", "NO LIMITS", "SECURE ESCROW", "USDT PAYMENTS"
];

export const Marquee = () => {
  return (
    // Убрали все наклоны, добавили четкое центрирование по вертикали в своем блоке
    <div className="w-full py-6 bg-zinc-900/10 border-y border-white/5 overflow-hidden flex items-center whitespace-nowrap">
      <motion.div 
        initial={{ x: 0 }}
        animate={{ x: "-50%" }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="flex gap-16 items-center"
      >
        {[...items, ...items].map((item, i) => (
          <div key={i} className="flex items-center gap-6">
            <span className="text-zinc-500 font-black text-sm tracking-[0.3em] uppercase italic hover:text-yellow-500 transition-colors cursor-default">
              {item}
            </span>
            {/* Стилизованный разделитель-ромб */}
            <div className="w-2 h-2 rotate-45 bg-yellow-500/40" />
          </div>
        ))}
      </motion.div>
    </div>
  );
};