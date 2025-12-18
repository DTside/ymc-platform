'use client';
import { ScrollReveal } from './ui/ScrollReveal';
import { Star } from 'lucide-react';

const reviews = [
  {
    name: "Alex 'Crypto Whale'",
    status: "Elite Member",
    text: "YMC — это не просто клуб, это печатный станок. Софт находит такие связки, о которых на рынке даже не слышали. Окупил Elite за 10 дней.",
    profit: "+$12,400/mo"
  },
  {
    name: "Dmitry P2P",
    status: "Starter Member",
    text: "Думал, что 50 баксов за вход — это много, но за первый вечер сделал уже первый профит на арбитраже. Поддержка отвечает моментально.",
    profit: "+$1,200/mo"
  }
];

export const Reviews = () => {
  return (
    <section className="py-32 px-6 bg-zinc-950/50">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <h2 className="text-4xl md:text-6xl font-black text-center mb-20 text-white uppercase italic">
            What <span className="text-yellow-500 text-gold-glow">Members</span> Say
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {reviews.map((rev, i) => (
            <ScrollReveal key={i} delay={i * 0.2}>
              <div className="p-8 md:p-12 rounded-[2.5rem] bg-zinc-900/20 border border-white/5 relative group hover:border-yellow-500/30 transition-all">
                <div className="flex justify-between items-start mb-8">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => <Star key={i} size={14} className="fill-yellow-500 text-yellow-500" />)}
                  </div>
                  <div className="px-3 py-1 rounded-full bg-yellow-500/10 text-yellow-500 text-[10px] font-black uppercase tracking-widest leading-none">
                    {rev.profit}
                  </div>
                </div>
                
                <p className="text-zinc-300 text-lg md:text-xl italic mb-8 leading-relaxed font-medium">
                  "{rev.text}"
                </p>

                <div className="flex items-center gap-4 pt-8 border-t border-white/5">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-zinc-700 to-zinc-900 border border-white/10" />
                  <div>
                    <div className="text-white font-black uppercase text-sm">{rev.name}</div>
                    <div className="text-yellow-500 text-[10px] font-bold uppercase tracking-widest">{rev.status}</div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};