'use client';
import { ScrollReveal } from './ui/ScrollReveal';

const steps = [
  {
    quarter: "Q1 2025",
    title: "Genesis Launch",
    desc: "Запуск платформы. Первые 50 мест (Early Birds). Открытие доступа к базовым P2P-связкам.",
    active: true
  },
  {
    quarter: "Q2 2025",
    title: "Automation Tools",
    desc: "Релиз бота для авто-хеджирования. Интеграция с Bybit и Binance API. Закрытые воркшопы.",
    active: false
  },
  {
    quarter: "Q3 2025",
    title: "Tokenization",
    desc: "Выпуск YMC Token. Дроп для активных участников. Запуск DAO голосования.",
    active: false
  },
  {
    quarter: "Q4 2025",
    title: "Global Scaling",
    desc: "Выход на международный рынок (LATAM, Asia). Партнерство с крупными финтех-проектами.",
    active: false
  }
];

export const Roadmap = () => {
  return (
    <section className="w-full py-24 relative">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Заголовок секции */}
        <ScrollReveal>
          <h2 className="text-4xl md:text-5xl font-black text-center mb-16 text-white">
            ROAD<span className="text-yellow-500">MAP</span>
          </h2>
        </ScrollReveal>

        <div className="relative">
          {/* Вертикальная светящаяся линия */}
          <div className="absolute left-[19px] md:left-1/2 top-0 bottom-0 w-0.5 bg-zinc-800 md:-ml-[1px]">
             <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-yellow-500 to-transparent opacity-50"></div>
          </div>

          {/* Этапы */}
          <div className="space-y-12">
            {steps.map((step, index) => (
              <div key={index} className={`relative flex items-center md:justify-between ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                
                {/* Пустой блок для выравнивания на десктопе */}
                <div className="hidden md:block w-5/12" />

                {/* Точка на линии */}
                <div className="absolute left-0 md:left-1/2 w-10 h-10 rounded-full bg-zinc-950 border-2 border-zinc-800 flex items-center justify-center z-10 md:-translate-x-1/2">
                   <div className={`w-3 h-3 rounded-full ${step.active ? 'bg-yellow-400 shadow-[0_0_10px_rgba(234,179,8,0.8)] animate-pulse' : 'bg-zinc-600'}`} />
                </div>

                {/* Карточка с контентом */}
                <div className="ml-16 md:ml-0 w-full md:w-5/12">
                  <ScrollReveal direction={index % 2 === 0 ? 'left' : 'right'}>
                    <div className="p-6 rounded-2xl bg-zinc-900/40 border border-white/5 hover:border-yellow-500/20 transition-all backdrop-blur-sm group">
                      <span className="text-sm font-mono text-yellow-500/80 mb-2 block">{step.quarter}</span>
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-yellow-400 transition-colors">{step.title}</h3>
                      <p className="text-zinc-400 text-sm leading-relaxed">{step.desc}</p>
                    </div>
                  </ScrollReveal>
                </div>

              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};