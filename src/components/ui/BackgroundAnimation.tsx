'use client';
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export const BackgroundAnimation = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  // Оптимизация: Всего 5 элементов вместо 20
  const items = Array.from({ length: 5 });

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {items.map((_, i) => (
        <motion.div
          key={i}
          // Оптимизация: blur-2xl вместо 3xl (меньше нагрузка), opacity поменьше
          // will-change-transform заставляет браузер использовать GPU
          className="absolute bg-blue-500/5 rounded-full blur-2xl will-change-transform"
          initial={{
            width: Math.random() * 300 + 100,
            height: Math.random() * 300 + 100,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            opacity: 0,
          }}
          animate={{
            x: [0, Math.random() * 100 - 50, 0],
            y: [0, Math.random() * 100 - 50, 0],
            opacity: [0.1, 0.2, 0.1], // Меньше прозрачность, чтобы не рябило
            scale: [1, 1.1, 1], // Меньше пульсация
          }}
          transition={{
            duration: Math.random() * 15 + 20, // Очень медленная анимация (20-35 сек)
            repeat: Infinity,
            ease: "linear", // Линейная анимация легче для просчета
          }}
        />
      ))}
      {/* Статичный шум (не грузит систему) */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 brightness-100 contrast-150"></div>
    </div>
  );
};