'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { ScrollReveal } from './ui/ScrollReveal';

const questions = [
  { q: "Нужен ли опыт в крипте?", a: "Нет. Мы предоставляем полное обучение с нуля: от регистрации на бирже до настройки автоматического софта." },
  { q: "Насколько это безопасно?", a: "Все сделки проходят внутри клуба через Escrow-гаранта. Ваши средства всегда находятся на вашем личном кошельке." },
  { q: "Как быстро я окуплю вход?", a: "Средний срок окупаемости Elite NFT — 3 недели при депозите от $1000. Starter Pass окупается за 3-5 дней активной работы." },
  { q: "Какие карты нужны?", a: "Мы работаем с дропами. Клуб предоставляет проверенных дропов, вам не нужно использовать свои личные карты." },
];

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-24 px-6 bg-zinc-900/20">
      <div className="max-w-3xl mx-auto">
        <ScrollReveal>
          <h2 className="text-4xl font-black text-center mb-12 text-white">FAQ</h2>
        </ScrollReveal>

        <div className="space-y-4">
          {questions.map((item, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <div 
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="group border border-white/5 bg-zinc-900/50 rounded-2xl overflow-hidden cursor-pointer hover:border-yellow-500/30 transition-colors"
              >
                <div className="p-6 flex justify-between items-center">
                  <h3 className="text-lg font-medium text-white group-hover:text-yellow-500 transition-colors">{item.q}</h3>
                  {openIndex === i ? <Minus className="text-yellow-500"/> : <Plus className="text-zinc-500"/>}
                </div>
                
                <AnimatePresence>
                  {openIndex === i && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-6 text-zinc-400 leading-relaxed">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};