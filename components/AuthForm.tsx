'use client';

import { useState } from 'react';
import { createSupabaseBrowserClient } from '@/lib/supabase-browser';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

type Props = {
  mode: 'login' | 'register';
};

export default function AuthForm({ mode }: Props) {
  const supabase = createSupabaseBrowserClient();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    if (mode === 'register') {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) setMessage(error.message);
      else setMessage('Konto utworzone. Sprawdź e-mail lub zaloguj się od razu, jeśli potwierdzenie nie jest wymagane.');
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setMessage(error.message);
      else {
        router.push('/dashboard');
        router.refresh();
      }
    }

    setLoading(false);
  }

  return (
    <div className="mx-auto max-w-5xl px-6">
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-[32px] border border-white/10 bg-white/[0.04] p-8 text-white">
          <div className="mb-4 inline-flex rounded-full border border-cyan-300/30 bg-cyan-300/10 px-4 py-2 text-sm font-medium text-cyan-200">
            {mode === 'login' ? 'Logowanie' : 'Rejestracja'}
          </div>
          <h1 className="text-4xl font-black tracking-tight">{mode === 'login' ? 'Wróć do panelu i generuj kolejne analizy.' : 'Załóż konto i uruchom SaaS w praktyce.'}</h1>
          <p className="mt-4 leading-7 text-slate-300">
            Po zalogowaniu użytkownik ma dostęp do panelu, salda, historii analiz i płatnych planów. To gotowa baza pod prawdziwy produkt SaaS.
          </p>
        </div>

        <form onSubmit={onSubmit} className="space-y-4 rounded-[32px] border border-white/10 bg-slate-900/80 p-8 text-white shadow-[0_0_50px_rgba(34,211,238,0.08)]">
          <h2 className="text-3xl font-bold">{mode === 'login' ? 'Zaloguj się' : 'Utwórz konto'}</h2>
          <input className="w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 outline-none ring-0" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input className="w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 outline-none ring-0" type="password" placeholder="Hasło" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button className="w-full rounded-2xl bg-cyan-300 px-4 py-3 font-semibold text-slate-950 transition hover:opacity-90" disabled={loading}>
            {loading ? 'Proszę czekać...' : mode === 'login' ? 'Zaloguj' : 'Utwórz konto'}
          </button>
          {message && <p className="text-sm text-slate-300">{message}</p>}
          <p className="text-sm text-slate-400">
            {mode === 'login' ? (
              <>Nie masz konta? <Link href="/auth/register" className="text-cyan-200">Załóż konto</Link></>
            ) : (
              <>Masz już konto? <Link href="/auth/login" className="text-cyan-200">Zaloguj się</Link></>
            )}
          </p>
        </form>
      </div>
    </div>
  );
}
