'use client';

import { motion } from 'framer-motion';
import { ScrollReveal } from "./ui/ScrollReveal";
import { Check, Loader2 } from "lucide-react";
import { useEffect } from 'react';
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { sendTelegramNotification } from '@/app/actions/telegram';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

// Компонент иконки USDT (если он не вынесен отдельно)
const USDTLogo = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="inline-block ml-1 mb-1">
    <path d="M12 24c6.627 0 12-5.373 12-12S18.627 0 12 0 0 5.373 0 12s5.373 12 12 12z" fill="#26A17B"/>
    <path d="M12.872 7.746v-.931h3.337v-1.63H7.79v1.63h3.338v.931c-2.88.13-5.06 1.144-5.06 2.36 0 1.217 2.18 2.23 5.06 2.36v4.613h1.745V12.46c2.88-.13 5.061-1.143 5.061-2.358 0-1.217-2.181-2.23-5.062-2.358zm0 3.864c-2.43-.102-4.148-.823-4.148-1.503 0-.68 1.718-1.401 4.148-1.503v3.006zm1.745-3.006c2.43.102 4.148.823 4.148 1.503 0 .68-1.718 1.401-4.148 1.503V8.604z" fill="white"/>
  </svg>
);

const tiers = [
  {
    name: "Starter Pass",
    price: "49.99",
    currency: "USDT",
    features: ["Доступ к P2P связкам (RUB/USDT)", "Общий чат комьюнити", "Базовое обучение", "Поддержка 24/7"],
    highlight: false
  },
  {
    name: "YMC Elite NFT",
    price: "99.99",
    currency: "USDT",
    features: ["Все функции Starter", "Международные связки", "Личный менеджер", "Доступ к софту YMC Bot", "Приватные собрания и воркшопы"],
    highlight: true 
  }
];

export const Pricing = () => {
  const router = useRouter(); // Ініціалізуємо роутер
  const { address, isConnected } = useAccount();

  // 1. Инициализация контракта
  const { data: hash, writeContract, isPending } = useWriteContract();

  // 2. Отслеживание транзакции
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  // 3. Обработка успешного подтверждения (запись в БД и ТГ)
  useEffect(() => {
    if (isConfirmed && address) {
      handleFinalizePayment(address);
    }
  }, [isConfirmed, address]);

  const handleFinalizePayment = async (wallet: string) => {
    const refCode = localStorage.getItem('ymc_ref') || 'Organic';
    const geoRes = await fetch('https://ipapi.co/json/').then(res => res.json()).catch(() => ({}));
    const country = geoRes.country_name || 'Unknown';

    // Запис у базу
    const { data: traffer } = await supabase.from('traffers').select('id').eq('referral_code', refCode).single();
    if (traffer) {
      await supabase.from('analytics').insert({
        traffer_id: traffer.id,
        wallet_address: wallet,
        status: 'lead',
        geo: country
      });
    }

    // Відправка в Telegram
    await sendTelegramNotification({
      traffer: refCode,
      amount: '99.99 USDT', 
      geo: country,
      wallet: wallet
    });

    // НОВЕ: Перенаправлення на сторінку успіху після всіх дій
    router.push('/success');
  };

  const handleMint = (tierName: string) => {
    if (!isConnected) {
      alert('Пожалуйста, подключите кошелек!');
      return;
    }

    // ВЫЗОВ СМАРТ-КОНТРАКТА
    // ЗАМЕНИТЕ ЭТИ ДАННЫЕ НА РЕАЛЬНЫЕ ДАННЫЕ ВАШЕГО КОНТРАКТА
    writeContract({
      address: '0xВАШ_АДРЕС_КОНТРАКТА' as `0x${string}`,
      abi: [
        {
          "inputs": [],
          "name": "mint",
          "outputs": [],
          "stateMutability": "payable",
          "type": "function"
        }
      ],
      functionName: 'mint',
      args: [],
      // Если оплата в BNB/ETH, раскомментируйте строку ниже:
      // value: parseEther('0.1'), 
    });
  };

  return (
    <section id="pricing" className="py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <ScrollReveal>
          <h2 className="text-4xl md:text-5xl font-black text-center mb-20 text-white uppercase tracking-tighter">
            CHOOSE YOUR <span className="text-yellow-500 text-glow italic">LEVEL</span>
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mt-12">
          {tiers.map((tier, i) => (
            <ScrollReveal key={i} delay={i * 0.2} direction={i === 0 ? "left" : "right"}>
              <motion.div 
                whileHover={{ 
                  y: -10,
                  boxShadow: tier.highlight 
                    ? "0 0 60px rgba(234,179,8,0.2)" 
                    : "0 0 40px rgba(255,255,255,0.05)"
                }}
                className={`p-10 rounded-[2.5rem] border relative overflow-hidden transition-all duration-300 group ${
                  tier.highlight 
                    ? "bg-zinc-900 border-yellow-500/50 shadow-2xl z-10" 
                    : "bg-zinc-950 border-white/5 opacity-90"
                }`}
              >
                {tier.highlight && (
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                )}

                {tier.highlight && (
                  <div className="absolute top-0 right-0 bg-yellow-500 text-black text-[10px] font-black px-4 py-1.5 rounded-bl-2xl tracking-widest uppercase">
                    BEST VALUE
                  </div>
                )}
                
                <h3 className="text-2xl font-bold text-white mb-2 relative z-10 uppercase italic">{tier.name}</h3>
                
                <div className="flex items-baseline gap-1 mb-8 relative z-10">
                  <span className="text-5xl font-black text-yellow-500 tracking-tighter italic">
                    {tier.price}
                  </span>
                  <span className="text-xl font-bold text-yellow-500 ml-1 italic">{tier.currency}</span>
                  <USDTLogo />
                </div>
                
                <ul className="space-y-5 mb-10 relative z-10">
                  {tier.features.map((feat, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-zinc-400 group-hover:text-zinc-200 transition-colors">
                      <div className="p-1 rounded-full bg-yellow-500/10 text-yellow-500">
                        <Check className="w-4 h-4" />
                      </div>
                      <span className="text-sm font-semibold italic">{feat}</span>
                    </li>
                  ))}
                </ul>

                <button 
                  onClick={() => handleMint(tier.name)}
                  disabled={isPending || isConfirming}
                  className={`w-full py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all relative z-10 flex items-center justify-center gap-2 ${
                    tier.highlight 
                      ? "bg-yellow-500 hover:bg-yellow-400 text-black shadow-[0_10px_30px_rgba(234,179,8,0.3)]" 
                      : "bg-white text-black hover:bg-zinc-200"
                  } ${(isPending || isConfirming) ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {(isPending || isConfirming) ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    'Purchase Entry'
                  )}
                </button>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};