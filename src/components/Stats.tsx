'use client';
import { ScrollReveal } from "./ui/ScrollReveal";

const stats = [
  { label: "Active Members", value: "842" },
  { label: "Total Volume", value: "$124M+" },
  { label: "Success Rate", value: "98.5%" },
  { label: "Avg. Daily APY", value: "2.4%" },
];

export const Stats = () => {
  return (
    <section className="w-full py-20 border-y border-white/5 bg-zinc-900/20 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((stat, i) => (
          <ScrollReveal key={i} delay={i * 0.1}>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-black text-white mb-2 tracking-tighter">
                {stat.value}
              </div>
              <div className="text-zinc-500 uppercase text-xs font-bold tracking-widest">
                {stat.label}
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
};