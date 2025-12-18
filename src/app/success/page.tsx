'use client';

import { motion } from 'framer-motion';
import { BackgroundAnimation } from '@/components/ui/BackgroundAnimation';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import Link from 'next/link';
import { Diamond, CheckCircle2, ArrowRight, Send } from 'lucide-react';

export default function SuccessPage() {
  return (
    <main className="relative min-h-screen bg-black text-white flex items-center justify-center p-6 overflow-hidden">
      <BackgroundAnimation />
      
      <div className="max-w-2xl w-full relative z-10 text-center">
        <ScrollReveal>
          {/* Анімована іконка успіху */}
          <motion.div 
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-10 shadow-[0_0_50px_rgba(234,179,8,0.5)]"
          >
            <CheckCircle2 className="text-black w-12 h-12 md:w-16 md:h-16" />
          </motion.div>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <h1 className="text-4xl md:text-7xl font-black uppercase italic tracking-tighter mb-6">
            WELCOME TO <br />
            <span className="text-yellow-500 text-glow">THE ELITE</span>
          </h1>
          <p className="text-zinc-500 text-sm md:text-lg mb-12 italic max-w-md mx-auto leading-relaxed">
            Ваш транзакцію підтверджено. Тепер ви офіційний учасник Young Millionaires Club. Ласкаво просимо в сім'ю.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.4}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Кнопка переходу в Telegram */}
            <a 
              href="https://t.me/your_private_channel" 
              target="_blank"
              className="flex items-center justify-center gap-3 py-5 bg-white text-black rounded-2xl font-black uppercase italic tracking-widest hover:scale-105 transition-transform"
            >
              <Send size={20} />
              Join Community
            </a>
            
            {/* Кнопка повернення додому */}
            <Link 
              href="/"
              className="flex items-center justify-center gap-3 py-5 bg-zinc-900 text-white border border-white/10 rounded-2xl font-black uppercase italic tracking-widest hover:bg-zinc-800 transition-colors"
            >
              Back to Home
              <ArrowRight size={20} />
            </Link>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.6}>
          <div className="mt-16 flex items-center justify-center gap-2 opacity-30">
            <Diamond size={14} className="text-yellow-500" />
            <span className="text-[10px] font-black uppercase tracking-[0.5em]">Membership Activated</span>
          </div>
        </ScrollReveal>
      </div>
    </main>
  );
}