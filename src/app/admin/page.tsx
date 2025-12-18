'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { BackgroundAnimation } from '@/components/ui/BackgroundAnimation';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, Target, Globe, Smartphone, 
  Plus, Copy, TrendingUp, DollarSign, 
  Loader2, X, Clock, Shield, LogOut, ChevronRight
} from 'lucide-react';

export default function AdminDashboard() {
  const router = useRouter();
  
  // Состояния для авторизации и загрузки
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Данные аналитики
  const [traffers, setTraffers] = useState<any[]>([]);
  const [totals, setTotals] = useState({ visits: 0, leads: 0, revenue: 0, cr: '0' });
  const [newNick, setNewNick] = useState('');
  const [selectedTraffer, setSelectedTraffer] = useState<any>(null);

  // 1. ПРОВЕРКА АВТОРИЗАЦИИ
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        router.push('/admin/login');
      } else {
        setSession(session);
        fetchRealData();
      }
      setLoading(false);
    };

    checkAuth();

    // Подписка на изменения данных в реальном времени
    const channel = supabase.channel('admin_realtime')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'analytics' }, () => {
        fetchRealData();
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [router]);

  // 2. ЗАГРУЗКА РЕАЛЬНЫХ ДАННЫХ
  const fetchRealData = async () => {
    const { data: trafferData, error } = await supabase
      .from('traffers')
      .select('*, analytics(*)');

    if (error) {
      console.error("Fetch error:", error);
      return;
    }

    if (trafferData) {
      let v_total = 0;
      let l_total = 0;

      trafferData.forEach(t => {
        v_total += t.analytics?.filter((a: any) => a.status === 'visit').length || 0;
        l_total += t.analytics?.filter((a: any) => a.status === 'lead').length || 0;
      });

      setTraffers(trafferData);
      setTotals({
        visits: v_total,
        leads: l_total,
        revenue: l_total * 99.99,
        cr: v_total > 0 ? ((l_total / v_total) * 100).toFixed(2) : '0'
      });
    }
  };

  // 3. ДЕЙСТВИЯ (Создание, Копирование, Выход)
  const createTraffer = async () => {
    if (!newNick) return;
    const { error } = await supabase
      .from('traffers')
      .insert({ nickname: newNick, referral_code: newNick });
    
    if (!error) {
      setNewNick('');
      fetchRealData();
    }
  };

  const copyLink = (e: React.MouseEvent, code: string) => {
    e.stopPropagation(); // Чтобы не открывалась модалка при клике на кнопку
    const url = `${window.location.origin}/?ref=${code}`;
    navigator.clipboard.writeText(url);
    alert(`Link copied for ${code}`);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/admin/login');
  };

  if (loading) return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <Loader2 className="animate-spin text-yellow-500 w-12 h-12" />
    </div>
  );

  return (
    <main className="relative min-h-screen bg-black text-white p-6 md:p-12 overflow-x-hidden font-sans">
      <BackgroundAnimation />
      
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* HEADER */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-8">
          <ScrollReveal>
            <div className="flex items-center gap-4">
               <div className="h-12 w-12 bg-yellow-500 rounded-2xl flex items-center justify-center rotate-3 shadow-[0_0_20px_rgba(234,179,8,0.4)]">
                  <Shield className="text-black w-7 h-7" />
               </div>
               <div>
                  <h1 className="text-4xl md:text-5xl font-black italic tracking-tighter uppercase leading-none">
                    YMC <span className="text-yellow-500 text-glow">HQ</span>
                  </h1>
                  <p className="text-zinc-600 text-[9px] font-black uppercase tracking-[0.3em] mt-2">
                    Operator: {session?.user?.email}
                  </p>
               </div>
            </div>
          </ScrollReveal>

          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="flex gap-2 flex-grow md:flex-grow-0">
               <input 
                value={newNick}
                onChange={(e) => setNewNick(e.target.value)}
                placeholder="Traffer ID..."
                className="bg-zinc-900 border border-white/5 px-6 py-3 rounded-xl outline-none focus:border-yellow-500/50 transition-all text-sm w-full md:w-48"
              />
              <button onClick={createTraffer} className="bg-yellow-500 text-black px-6 rounded-xl font-black hover:bg-yellow-400 transition-all">
                <Plus size={20} />
              </button>
            </div>
            <button onClick={handleLogout} className="p-3 bg-zinc-900 border border-white/5 rounded-xl text-zinc-500 hover:text-red-500 transition-colors">
              <LogOut size={20} />
            </button>
          </div>
        </header>

        {/* STATS CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <StatCard label="Total Visits" val={totals.visits} icon={Users} color="text-blue-500" />
          <StatCard label="Confirmed Leads" val={totals.leads} icon={Target} color="text-green-500" />
          <StatCard label="Avg. Conversion" val={`${totals.cr}%`} icon={TrendingUp} color="text-yellow-500" />
          <StatCard label="Total Revenue" val={`$${totals.revenue.toFixed(2)}`} icon={DollarSign} color="text-yellow-500" />
        </div>

        {/* TRAFFERS TABLE */}
        <ScrollReveal delay={0.4}>
          <div className="glass rounded-[2.5rem] border-white/5 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-white/5 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 border-b border-white/5">
                    <th className="px-10 py-8 italic">Source / Nickname</th>
                    <th className="px-10 py-8 text-center italic">Stats (V/L/CR)</th>
                    <th className="px-10 py-8 italic">Main GEO Activity</th>
                    <th className="px-10 py-8 text-right italic">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {traffers.map((t) => {
                    const v = t.analytics?.filter((a: any) => a.status === 'visit').length || 0;
                    const l = t.analytics?.filter((a: any) => a.status === 'lead').length || 0;
                    const cr = v > 0 ? ((l / v) * 100).toFixed(1) : 0;
                    const geos = Array.from(new Set(t.analytics?.map((a:any) => a.geo).filter(Boolean))).slice(0,2).join(', ');

                    return (
                      <tr 
                        key={t.id} 
                        onClick={() => setSelectedTraffer(t)}
                        className="hover:bg-white/[0.02] cursor-pointer transition-colors group"
                      >
                        <td className="px-10 py-10">
                          <div className="flex items-center gap-4">
                             <div className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse shadow-[0_0_8px_rgba(234,179,8,1)]" />
                             <span className="text-xl font-black italic uppercase text-white tracking-tighter">{t.nickname}</span>
                          </div>
                        </td>
                        <td className="px-10 py-10">
                          <div className="flex justify-center gap-8">
                             <div className="text-center">
                                <div className="text-lg font-black">{v}</div>
                                <div className="text-[8px] font-bold text-zinc-600 uppercase">Visits</div>
                             </div>
                             <div className="text-center">
                                <div className="text-lg font-black text-green-500">{l}</div>
                                <div className="text-[8px] font-bold text-zinc-600 uppercase">Leads</div>
                             </div>
                             <div className="text-center">
                                <div className="text-lg font-black text-yellow-500">{cr}%</div>
                                <div className="text-[8px] font-bold text-zinc-600 uppercase">CR</div>
                             </div>
                          </div>
                        </td>
                        <td className="px-10 py-10">
                           <div className="flex items-center gap-2 text-zinc-400 text-xs font-bold uppercase tracking-tighter">
                              <Globe size={12} className="text-blue-500" />
                              {geos || 'No Activity'}
                           </div>
                        </td>
                        <td className="px-10 py-10 text-right">
                          <button 
                            onClick={(e) => copyLink(e, t.referral_code)}
                            className="p-3 bg-zinc-900 rounded-xl hover:text-yellow-500 transition-colors border border-white/5"
                          >
                            <Copy size={16} />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            {traffers.length === 0 && (
              <div className="p-20 text-center text-zinc-700 font-bold uppercase italic tracking-widest">
                System awaiting incoming traffic...
              </div>
            )}
          </div>
        </ScrollReveal>
      </div>

      {/* DETAILED LOGS MODAL */}
      <AnimatePresence>
        {selectedTraffer && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSelectedTraffer(null)}
              className="absolute inset-0 bg-black/90 backdrop-blur-md"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-3xl bg-zinc-950 border border-white/10 rounded-[3rem] shadow-[0_0_50px_rgba(0,0,0,1)] overflow-hidden"
            >
              <div className="p-8 border-b border-white/5 flex justify-between items-center bg-white/5">
                <div>
                  <h2 className="text-3xl font-black italic uppercase tracking-tighter">
                    Logs: <span className="text-yellow-500">{selectedTraffer.nickname}</span>
                  </h2>
                  <p className="text-[10px] text-zinc-600 font-black uppercase tracking-[0.3em] mt-1">Encrypted Data Stream</p>
                </div>
                <button onClick={() => setSelectedTraffer(null)} className="p-3 hover:bg-white/10 rounded-full transition-colors text-zinc-500">
                  <X size={24}/>
                </button>
              </div>

              <div className="p-4 max-h-[60vh] overflow-y-auto">
                <table className="w-full text-left">
                  <thead className="sticky top-0 bg-zinc-950 text-[9px] font-black uppercase text-zinc-600 border-b border-white/5">
                    <tr>
                      <th className="py-4 px-6 italic">Time (UTC)</th>
                      <th className="py-4 px-6 italic">IP Address</th>
                      <th className="py-4 px-6 italic">GEO / Device</th>
                      <th className="py-4 px-6 italic text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {[...selectedTraffer.analytics].reverse().map((log: any) => (
                      <tr key={log.id} className="text-[11px] hover:bg-white/[0.02] group">
                        <td className="py-5 px-6 text-zinc-500 font-mono">
                          {new Date(log.created_at).toLocaleString('ru-RU', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit' })}
                        </td>
                        <td className="py-5 px-6 font-black text-zinc-300 tracking-wider group-hover:text-white transition-colors">
                          {log.ip_address || '0.0.0.0'}
                        </td>
                        <td className="py-5 px-6 uppercase italic">
                          <div className="text-zinc-400 font-bold">{log.geo}</div>
                          <div className="text-[9px] text-zinc-700">{log.device}</div>
                        </td>
                        <td className="py-5 px-6 text-right">
                          <span className={`px-3 py-1 rounded-md text-[9px] font-black uppercase tracking-widest ${
                            log.status === 'lead' 
                              ? 'bg-green-500/10 text-green-500 border border-green-500/20' 
                              : 'bg-blue-500/10 text-blue-500 border border-blue-500/20'
                          }`}>
                            {log.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="p-8 bg-white/5 text-center">
                 <p className="text-[10px] text-zinc-700 font-black uppercase tracking-[0.4em]">End of Transmission</p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}

// ПЕРЕИСПОЛЬЗУЕМЫЙ КОМПОНЕНТ КАРТОЧКИ СТАТИСТИКИ
function StatCard({ label, val, icon: Icon, color }: any) {
  return (
    <div className="glass p-8 rounded-[2.5rem] border-white/5 relative overflow-hidden group">
      <Icon className={`absolute -right-4 -bottom-4 w-28 h-28 opacity-5 group-hover:opacity-10 transition-opacity ${color}`} />
      <div className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.2em] mb-3">{label}</div>
      <div className="text-4xl font-black italic tracking-tighter text-white">{val}</div>
    </div>
  );
}