'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { BackgroundAnimation } from '@/components/ui/BackgroundAnimation';
import { Lock, Mail, Loader2, ArrowRight } from 'lucide-react';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError('Неверный логин или пароль');
      setLoading(false);
    } else {
      router.push('/admin');
    }
  };

  return (
    <main className="min-h-screen bg-black flex items-center justify-center p-6">
      <BackgroundAnimation />
      
      <div className="w-full max-w-md relative z-10">
        <div className="glass p-10 md:p-12 rounded-[3rem] border-white/5 shadow-2xl">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-black italic uppercase tracking-tighter text-white">
              YMC <span className="text-yellow-500 text-glow">HQ</span>
            </h1>
            <p className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.3em] mt-2">Authorized Access Only</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" size={18} />
              <input 
                type="email" 
                placeholder="Admin Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-yellow-500/50 transition-all text-sm"
                required
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" size={18} />
              <input 
                type="password" 
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-yellow-500/50 transition-all text-sm"
                required
              />
            </div>

            {error && <p className="text-red-500 text-[10px] font-black uppercase text-center">{error}</p>}

            <button 
              disabled={loading}
              className="w-full py-5 bg-yellow-500 text-black rounded-2xl font-black uppercase italic tracking-widest hover:bg-yellow-400 transition-all flex items-center justify-center gap-2 group"
            >
              {loading ? <Loader2 className="animate-spin" /> : (
                <>
                  Enter Dashboard
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}