'use client';
import { motion } from 'framer-motion';
import { ScrollReveal } from './ui/ScrollReveal';
import { Circle } from 'lucide-react';

const deals = [
  { wallet: "0x7a...4e21", amount: "1,240 USDT", profit: "+42.3$", time: "Just now" },
  { wallet: "0x3b...1a90", amount: "450 USDT", profit: "+12.1$", time: "2 min ago" },
  { wallet: "0xf2...d332", amount: "3,100 USDT", profit: "+114.5$", time: "5 min ago" },
  { wallet: "0x9d...8c11", amount: "890 USDT", profit: "+28.7$", time: "8 min ago" },
];

export const LiveDeals = () => {
  return (
    <section className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-black text-white uppercase italic">
              Live <span className="text-yellow-500">Processing</span>
            </h2>
            <div className="flex items-center gap-2 px-3 py-1 bg-green-500/10 rounded-full border border-green-500/20">
              <Circle className="w-2 h-2 fill-green-500 text-green-500 animate-pulse" />
              <span className="text-[10px] font-bold text-green-500 uppercase tracking-widest">Network Live</span>
            </div>
          </div>
        </ScrollReveal>

        <div className="space-y-3">
          {deals.map((deal, i) => (
            <ScrollReveal key={i} delay={i * 0.1} direction="left">
              <div className="grid grid-cols-2 md:grid-cols-4 items-center p-4 md:p-6 rounded-2xl bg-zinc-900/30 border border-white/5 hover:border-yellow-500/20 transition-all group overflow-hidden relative">
                <div className="text-xs font-mono text-zinc-500 group-hover:text-zinc-300">{deal.wallet}</div>
                <div className="text-sm font-black text-white text-right md:text-left">{deal.amount}</div>
                <div className="text-sm font-black text-green-500 hidden md:block">{deal.profit}</div>
                <div className="text-[10px] font-bold text-zinc-600 text-right uppercase tracking-widest">{deal.time}</div>
                
                {/* Эффект сканирующей линии */}
                <motion.div 
                  initial={{ x: "-100%" }}
                  animate={{ x: "200%" }}
                  transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
                  className="absolute top-0 left-0 w-1/4 h-full bg-gradient-to-r from-transparent via-yellow-500/5 to-transparent skew-x-12"
                />
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};