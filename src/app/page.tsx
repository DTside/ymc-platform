'use client';

import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Diamond, ArrowRight } from "lucide-react";

// Динамические импорты для стабильного билда (SSR: false)
const Pricing = dynamic(() => import('@/components/Pricing').then(mod => mod.Pricing), { ssr: false });
const ConnectButton = dynamic(() => import('@/components/ConnectButton').then(mod => mod.ConnectButton), { ssr: false });
const Roadmap = dynamic(() => import('@/components/Roadmap').then(mod => mod.Roadmap), { ssr: false });
const BackgroundAnimation = dynamic(() => import('@/components/ui/BackgroundAnimation').then(mod => mod.BackgroundAnimation), { ssr: false });

// Обычные компоненты (исправлены пути и имена согласно вашим ошибкам)
import { Stats } from "@/components/Stats";
import { LiveDeals } from "@/components/LiveDeals";
import { Reviews } from "@/components/Review"; // Исправлено имя
import { FAQ } from "@/components/Faq"; // Исправлено имя
import { Marquee } from "@/components/ui/Marquee";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { BentoFeatures } from "@/components/BentoFeatures"; // Исправлен путь
import { useTracker } from "@/hooks/useTracker";

function TrackerWrapper() {
  useTracker();
  return null;
}

export default function Home() {
  return (
    <main className="relative min-h-screen flex flex-col items-center overflow-hidden font-sans bg-black">
      <Suspense fallback={null}>
        <TrackerWrapper />
      </Suspense>
      
      <BackgroundAnimation />
      
      {/* --- PREMIUM NAVBAR --- */}
      <nav className="absolute top-4 md:top-8 left-1/2 -translate-x-1/2 w-[95%] md:w-[90%] max-w-6xl z-50 bg-zinc-900/40 backdrop-blur-xl border border-white/10 rounded-2xl px-4 md:px-8 py-3 md:py-5 flex justify-between items-center shadow-2xl">
         <Link href="/" className="flex items-center gap-2 md:gap-3 group">
            <div className="h-8 w-8 md:h-12 md:w-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg md:rounded-xl flex items-center justify-center rotate-3 shadow-lg transition-transform group-hover:rotate-12">
              <Diamond className="text-black w-5 h-5 md:w-7 md:h-7" />
            </div>
            <span className="text-xl md:text-3xl font-black tracking-tighter text-white uppercase italic">YMC</span>
         </Link>
         
         <div className="hidden lg:flex items-center gap-10">
            <Link href="#features" className="text-[10px] font-black text-zinc-400 hover:text-yellow-500 tracking-[0.3em] uppercase transition-colors">Features</Link>
            <Link href="#roadmap" className="text-[10px] font-black text-zinc-400 hover:text-yellow-500 tracking-[0.3em] uppercase transition-colors">Roadmap</Link>
            <Link href="#pricing" className="text-[10px] font-black text-zinc-400 hover:text-yellow-500 tracking-[0.3em] uppercase transition-colors">Pricing</Link>
            <Link href="#faq" className="text-[10px] font-black text-zinc-400 hover:text-yellow-500 tracking-[0.3em] uppercase transition-colors">FAQ</Link>
         </div>

         <div className="scale-90 md:scale-100">
            <ConnectButton />
         </div>
      </nav>

      {/* --- HERO SECTION RE-DESIGNED --- */}
      <section className="min-h-screen flex flex-col items-center justify-center text-center px-4 pt-32 md:pt-20">
        <ScrollReveal>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-[9px] md:text-[10px] font-black text-yellow-400 mb-8 tracking-[0.2em] uppercase">
              ONLY 50 SPOTS AVAILABLE
            </div>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
            <h1 className="text-4xl sm:text-7xl md:text-[110px] font-black tracking-tighter mb-8 text-white leading-[0.85] uppercase italic">
              YOUNG <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-200 text-gold-glow">
                  MILLIONAIRES
              </span> <br/>
              CLUB
            </h1>
        </ScrollReveal>

        <ScrollReveal delay={0.4}>
            <p className="text-xs md:text-xl text-zinc-500 mb-12 max-w-xl leading-relaxed mx-auto italic font-medium px-4">
              The world's most exclusive P2P arbitrage ecosystem. <br className="hidden md:block"/>
              Engineered for those who play to win.
            </p>
        </ScrollReveal>
        
        <ScrollReveal delay={0.6} className="w-full sm:w-auto">
            <div className="flex flex-col sm:flex-row gap-5 w-full px-6 sm:px-0 justify-center">
                <Link 
                  href="#pricing" 
                  className="w-full sm:px-14 py-5 md:py-7 bg-white text-black rounded-2xl font-black text-sm md:text-xl transition-all hover:scale-105 shadow-xl flex items-center justify-center gap-3 uppercase italic"
                >
                  Join Club
                  <ArrowRight className="w-5 h-5 md:w-6 md:h-6"/>
                </Link>
                
                <Link 
                  href="/about" 
                  className="w-full sm:px-14 py-5 md:py-7 bg-zinc-900/50 text-white border border-white/10 rounded-2xl font-black text-sm md:text-xl backdrop-blur-sm flex justify-center items-center uppercase italic hover:bg-zinc-800 transition-colors"
                >
                  About
                </Link>
            </div>
        </ScrollReveal>
      </section>

      {/* --- FULL DESIGN SECTIONS --- */}
      <Marquee />
      <Stats />
      <LiveDeals />

      <div id="features" className="w-full scroll-mt-24">
        <BentoFeatures />
      </div>

      <div id="roadmap" className="w-full scroll-mt-24">
        <Roadmap />
      </div>

      <div className="w-full py-10 md:py-20">
        <Marquee />
      </div>

      <div id="pricing" className="w-full scroll-mt-24">
        <Pricing />
      </div>

      <Reviews />

      <div id="faq" className="w-full scroll-mt-24">
        <FAQ />
      </div>

      <section className="py-32 md:py-52 px-4 text-center w-full relative">
        <ScrollReveal>
            <div className="max-w-5xl mx-auto p-10 md:p-24 rounded-[3rem] md:rounded-[5rem] bg-gradient-to-b from-zinc-900/50 to-black border border-white/10 relative overflow-hidden backdrop-blur-sm">
                <h2 className="text-4xl md:text-8xl font-black text-white mb-8 relative z-10 uppercase italic leading-[0.9]">
                    Ready to <br/> <span className="text-yellow-500">dominate?</span>
                </h2>
                <div className="flex justify-center relative z-10 scale-110 md:scale-150">
                  <ConnectButton />
                </div>
            </div>
        </ScrollReveal>
      </section>

      <footer className="w-full py-16 border-t border-white/5 bg-zinc-950/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center px-8 gap-10">
          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="text-white font-black italic tracking-widest text-sm uppercase">YMC CLUB</div>
            <div className="text-zinc-600 text-[10px] font-bold tracking-[0.3em] uppercase">
              &copy; 2025. All rights reserved.
            </div>
          </div>
          
          <div className="flex gap-8">
            <Link href="/terms" className="text-zinc-500 hover:text-yellow-500 text-[10px] font-black uppercase tracking-widest transition-colors">
              Terms
            </Link>
            <Link href="/privacy" className="text-zinc-500 hover:text-yellow-500 text-[10px] font-black uppercase tracking-widest transition-colors">
              Privacy
            </Link>
            <a href="#" className="text-zinc-500 hover:text-yellow-500 text-[10px] font-black uppercase tracking-widest transition-colors">
              Telegram
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}