'use client';
import { BackgroundAnimation } from './BackgroundAnimation';
import { ScrollReveal } from './ScrollReveal';
import Link from 'next/link';
import { ArrowLeft, ShieldAlert } from 'lucide-react';

export const LegalLayout = ({ title, children }: { title: string, children: React.ReactNode }) => {
  return (
    <main className="relative min-h-screen bg-black text-white p-6 md:p-20 font-sans overflow-hidden">
      <BackgroundAnimation />
      <div className="max-w-4xl mx-auto relative z-10">
        <Link href="/" className="inline-flex items-center gap-2 text-zinc-500 hover:text-yellow-500 transition-colors mb-12 group">
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-[10px] font-black uppercase tracking-widest">Вернуться на главную</span>
        </Link>

        <ScrollReveal>
          <h1 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter mb-12">
            {title} <span className="text-yellow-500">.</span>
          </h1>
        </ScrollReveal>

        <div className="glass p-8 md:p-12 rounded-[2.5rem] border-white/5 bg-zinc-900/20 backdrop-blur-md prose prose-invert prose-yellow max-w-none">
          {children}
        </div>

        <div className="mt-12 p-8 rounded-3xl border border-yellow-500/10 bg-yellow-500/5 flex items-start gap-4">
          <ShieldAlert className="text-yellow-500 shrink-0" size={24} />
          <p className="text-xs text-zinc-500 leading-relaxed font-medium">
            Используя платформу YMC, вы подтверждаете, что осознаете риски, связанные с торговлей криптовалютами и P2P-операциями. Клуб не несет ответственности за финансовые потери участников.
          </p>
        </div>
      </div>
    </main>
  );
};