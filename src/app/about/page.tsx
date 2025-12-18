'use client';
import { BackgroundAnimation } from '@/components/ui/BackgroundAnimation';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import Link from 'next/link';
import { ArrowLeft, Diamond, Shield, Target, Zap } from 'lucide-react';

export default function AboutPage() {
  return (
    <main className="relative min-h-screen bg-black text-white p-6 md:p-20 overflow-hidden font-sans">
      <BackgroundAnimation />
      
      {/* Кнопка назад */}
      <Link href="/" className="inline-flex items-center gap-2 text-zinc-500 hover:text-yellow-500 transition-colors mb-12 group z-10 relative">
        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
        <span className="text-xs font-black uppercase tracking-widest">Back to Home</span>
      </Link>

      <div className="max-w-4xl mx-auto relative z-10">
        <ScrollReveal>
          <div className="flex items-center gap-4 mb-8">
            <div className="h-12 w-12 bg-yellow-500 rounded-xl flex items-center justify-center rotate-3 shadow-lg">
              <Diamond className="text-black w-7 h-7" />
            </div>
            <h1 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter">
              About <span className="text-yellow-500">YMC</span>
            </h1>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <p className="text-xl md:text-2xl text-zinc-400 leading-relaxed mb-12 italic font-medium">
            Young Millionaires Club — это закрытая экосистема, объединяющая технологии арбитража и опыт крупнейших игроков рынка. Мы не просто даем доступ к связкам, мы строим будущее децентрализованного процессинга.
          </p>
        </ScrollReveal>

        {/* Сетка миссии */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          <div className="p-8 rounded-3xl bg-zinc-900/30 border border-white/5">
            <Target className="text-yellow-500 mb-6" size={32} />
            <h3 className="text-xl font-bold mb-4 uppercase">Наша цель</h3>
            <p className="text-zinc-500 text-sm leading-relaxed">Создать полностью автоматизированную сеть для эффективного обмена активами с минимальными рисками для участников.</p>
          </div>
          <div className="p-8 rounded-3xl bg-zinc-900/30 border border-white/5">
            <Shield className="text-blue-500 mb-6" size={32} />
            <h3 className="text-xl font-bold mb-4 uppercase">Безопасность</h3>
            <p className="text-zinc-500 text-sm leading-relaxed">Все процессы верифицированы смарт-контрактами и защищены алгоритмами двойного подтверждения сделок.</p>
          </div>
        </div>

        <ScrollReveal>
          <div className="p-10 rounded-[3rem] bg-gradient-to-br from-yellow-500 to-yellow-600 text-black text-center">
            <Zap size={48} className="mx-auto mb-6" />
            <h2 className="text-3xl font-black mb-4 uppercase italic">Готовы начать?</h2>
            <p className="font-bold mb-8 opacity-80">Ваш путь в элитный процессинг начинается здесь.</p>
            <Link href="/#pricing" className="inline-block px-10 py-5 bg-black text-white rounded-2xl font-black uppercase italic hover:scale-105 transition-transform shadow-2xl">
              Check Tiers
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </main>
  );
}