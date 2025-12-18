'use client';
import { ScrollReveal } from "./ui/ScrollReveal";
import { Zap, ShieldCheck, Globe, Cpu, Trophy, Star } from 'lucide-react';

export const BentoFeatures = () => {
  return (
    <section className="py-32 px-6 max-w-7xl mx-auto">
      <ScrollReveal>
        <h2 className="text-4xl md:text-6xl font-black text-center mb-20 text-white uppercase">
          ENGINEERED FOR <span className="text-yellow-500 text-glow">SUCCESS</span>
        </h2>
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-6 md:grid-rows-2 gap-4 h-full md:h-[600px]">
        
        {/* Большая карточка 1 */}
        <ScrollReveal className="md:col-span-3 md:row-span-2" direction="left">
          <div className="h-full p-8 rounded-3xl bg-zinc-900/30 border border-white/5 flex flex-col justify-end group hover:bg-zinc-900/50 transition-all relative overflow-hidden">
            <div className="absolute top-8 right-8 text-yellow-500/20 group-hover:text-yellow-500/40 transition-colors">
              <Cpu size={120} />
            </div>
            <h3 className="text-3xl font-bold text-white mb-4">Proprietary AI Software</h3>
            <p className="text-zinc-400 leading-relaxed max-w-md">
              Наш софт анализирует 100+ бирж ежесекундно, находя спреды, которые недоступны обычным пользователям.
            </p>
          </div>
        </ScrollReveal>

        {/* Средняя карточка */}
        <ScrollReveal className="md:col-span-3 md:row-span-1" direction="right">
          <div className="h-full p-8 rounded-3xl bg-gradient-to-br from-yellow-500/10 to-transparent border border-yellow-500/20 flex items-center gap-6 group">
            <div className="p-4 rounded-2xl bg-yellow-500 text-black">
              <Trophy size={32} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Top-Tier Community</h3>
              <p className="text-zinc-400 text-sm">Среди нас — киты с оборотом более $10M в месяц.</p>
            </div>
          </div>
        </ScrollReveal>

        {/* Маленькая карточка 1 */}
        <ScrollReveal className="md:col-span-1.5 md:row-span-1" delay={0.2}>
          <div className="h-full p-6 rounded-3xl bg-zinc-900/30 border border-white/5 flex flex-col items-center justify-center text-center group">
            <Globe className="text-blue-500 mb-4 group-hover:scale-110 transition-transform" size={40} />
            <span className="text-white font-bold tracking-tight">Global Access</span>
          </div>
        </ScrollReveal>

        {/* Маленькая карточка 2 */}
        <ScrollReveal className="md:col-span-1.5 md:row-span-1" delay={0.3}>
          <div className="h-full p-6 rounded-3xl bg-zinc-900/30 border border-white/5 flex flex-col items-center justify-center text-center group">
            <ShieldCheck className="text-green-500 mb-4 group-hover:scale-110 transition-transform" size={40} />
            <span className="text-white font-bold tracking-tight">Bank-Grade Security</span>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
};