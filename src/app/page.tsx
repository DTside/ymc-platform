'use client';

import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Diamond, ArrowRight } from "lucide-react";

// Динамические импорты БЕЗ серверного рендеринга (SSR: false)
const Pricing = dynamic(() => import('@/components/Pricing').then(mod => mod.Pricing), { ssr: false });
const ConnectButton = dynamic(() => import('@/components/ConnectButton').then(mod => mod.ConnectButton), { ssr: false });
const Roadmap = dynamic(() => import('@/components/Roadmap').then(mod => mod.Roadmap), { ssr: false });
const BackgroundAnimation = dynamic(() => import('@/components/ui/BackgroundAnimation').then(mod => mod.BackgroundAnimation), { ssr: false });

// Обычные легкие компоненты
import { Stats } from "@/components/Stats";
import { LiveDeals } from "@/components/LiveDeals";
import { Reviews } from "@/components/Review";
import { FAQ } from "@/components/Faq";
import { Marquee } from "@/components/ui/Marquee";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { BentoFeatures } from "@/components/BentoFeatures";
import { useTracker } from "@/hooks/useTracker";

// Обертка для хука, так как useSearchParams требует Suspense в Next.js 15
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
      
      <nav className="absolute top-4 md:top-8 left-1/2 -translate-x-1/2 w-[95%] md:w-[90%] max-w-6xl z-50 bg-zinc-900/40 backdrop-blur-md border border-white/5 rounded-2xl px-4 md:px-8 py-3 md:py-5 flex justify-between items-center">
         <Link href="/" className="flex items-center gap-2 md:gap-3 group cursor-pointer">
            <div className="h-8 w-8 md:h-12 md:w-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg md:rounded-xl flex items-center justify-center shadow-lg">
              <Diamond className="text-black w-5 h-5 md:w-7 md:h-7" />
            </div>
            <span className="text-xl md:text-3xl font-black text-white uppercase italic">YMC</span>
         </Link>
         
         <div className="hidden lg:flex items-center gap-10 text-[10px] font-black text-zinc-400 uppercase tracking-[0.3em]">
            <Link href="#features" className="hover:text-yellow-500 transition-colors">Features</Link>
            <Link href="#roadmap" className="hover:text-yellow-500 transition-colors">Roadmap</Link>
            <Link href="#pricing" className="hover:text-yellow-500 transition-colors">Pricing</Link>
            <Link href="#faq" className="hover:text-yellow-500 transition-colors">FAQ</Link>
         </div>

         <ConnectButton />
      </nav>

      <section className="min-h-screen flex flex-col items-center justify-center text-center px-4 pt-32">
        <ScrollReveal>
            <h1 className="text-4xl sm:text-7xl md:text-[110px] font-black tracking-tighter text-white leading-[0.85] uppercase italic">
              YOUNG <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-200">MILLIONAIRES</span> <br/>
              CLUB
            </h1>
            <p className="text-xs md:text-xl text-zinc-500 mt-8 mb-12 max-w-xl mx-auto italic">
              The world's most exclusive P2P arbitrage ecosystem.
            </p>
            <Link href="#pricing" className="px-14 py-7 bg-white text-black rounded-2xl font-black uppercase italic hover:scale-105 transition-transform flex items-center gap-3">
              Join Club <ArrowRight />
            </Link>
        </ScrollReveal>
      </section>

      <Marquee />
      <Stats />
      <LiveDeals />
      <div id="features" className="scroll-mt-24"><BentoFeatures /></div>
      <div id="roadmap" className="scroll-mt-24"><Roadmap /></div>
      <div id="pricing" className="scroll-mt-24"><Pricing /></div>
      <Reviews />
      <div id="faq" className="scroll-mt-24"><FAQ /></div>

      <footer className="w-full py-16 border-t border-white/5 text-center text-zinc-600 text-[10px] font-bold uppercase tracking-[0.3em]">
        &copy; 2025 YMC CLUB. All rights reserved.
      </footer>
    </main>
  );
}