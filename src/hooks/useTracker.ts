'use client';
import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export const useTracker = () => {
  const searchParams = useSearchParams();

  useEffect(() => {
    // Проверяем, что мы в браузере
    if (typeof window === 'undefined') return;

    const ref = searchParams.get('ref');
    if (ref) {
      localStorage.setItem('ymc_ref', ref);
      logRealVisit(ref);
    }
  }, [searchParams]);

  const logRealVisit = async (refCode: string) => {
    try {
      // Запросы к внешним API и navigator должны быть только в браузере
      const geoRes = await fetch('https://ipapi.co/json/').then(res => res.json());
      const device = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) ? 'Mobile' : 'Desktop';

      const { data: traffer } = await supabase
        .from('traffers')
        .select('id')
        .eq('referral_code', refCode)
        .single();

      if (traffer) {
        await supabase.from('analytics').insert({
          traffer_id: traffer.id,
          geo: geoRes.country_name || 'Unknown',
          ip_address: geoRes.ip || '0.0.0.0',
          device: device,
          status: 'visit'
        });
      }
    } catch (e) {
      console.error("Tracking error:", e);
    }
  };
};