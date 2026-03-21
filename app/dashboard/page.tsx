import { redirect } from 'next/navigation';
import Link from 'next/link';
import { createSupabaseServerClient } from '@/lib/supabase-server';

export default async function DashboardPage() {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect('/auth/login');

  const [{ data: profile }, { data: analyses }] = await Promise.all([
    supabase.from('profiles').select('*').eq('id', user.id).single(),
    supabase.from('analyses').select('*').eq('user_id', user.id).order('created_at', { ascending: false }).limit(10),
  ]);

  return (
    <main className="mx-auto max-w-7xl px-6 py-20">
      <div className="mb-10 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-[32px] border border-white/10 bg-white/[0.04] p-8">
          <div className="mb-4 inline-flex rounded-full border border-cyan-300/30 bg-cyan-300/10 px-4 py-2 text-sm font-medium text-cyan-200">
            Panel użytkownika
          </div>
          <h1 className="text-5xl font-black tracking-tight text-white">Generuj analizy i buduj retencję produktu.</h1>
          <p className="mt-4 max-w-2xl leading-7 text-slate-300">
            Ten panel jest gotowy do użycia. Użytkownik wpisuje treść, wybiera typ analizy i otrzymuje wynik zapisany w historii.
          </p>
        </div>

        <div className="rounded-[32px] border border-white/10 bg-slate-900/80 p-8 text-slate-200">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
              <div className="text-xs uppercase tracking-[0.2em] text-slate-400">Plan</div>
              <div className="mt-2 text-2xl font-bold text-white">{profile?.plan_key || 'free'}</div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
              <div className="text-xs uppercase tracking-[0.2em] text-slate-400">Kredyty</div>
              <div className="mt-2 text-2xl font-bold text-white">{profile?.credits_balance ?? 0}</div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
              <div className="text-xs uppercase tracking-[0.2em] text-slate-400">Wykorzystane analizy</div>
              <div className="mt-2 text-2xl font-bold text-white">{profile?.analyses_used_this_month ?? 0}</div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
              <div className="text-xs uppercase tracking-[0.2em] text-slate-400">Billing</div>
              <div className="mt-2 text-base font-semibold text-white">Stripe aktywny</div>
            </div>
          </div>
          <Link href="/pricing" className="mt-5 inline-flex rounded-2xl bg-cyan-300 px-5 py-3 font-semibold text-slate-950 transition hover:opacity-90">
            Zmień lub kup plan
          </Link>
        </div>
      </div>

      <form action="/api/analyze" method="post" className="mb-10 rounded-[32px] border border-white/10 bg-slate-900/80 p-8 shadow-[0_0_50px_rgba(34,211,238,0.08)]">
        <div className="grid gap-6 lg:grid-cols-[0.33fr_0.67fr]">
          <div>
            <label className="mb-2 block text-sm text-slate-300">Typ analizy</label>
            <select name="analysisType" className="w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none">
              <option value="sales">Analiza sprzedażowa</option>
              <option value="offer">Analiza oferty</option>
              <option value="copy">Analiza reklamy i copy</option>
              <option value="landing">Analiza landing page</option>
              <option value="idea">Analiza pomysłu biznesowego</option>
              <option value="private">Analiza dla osoby prywatnej</option>
            </select>
            <p className="mt-3 text-sm leading-6 text-slate-400">Ten zestaw typów analiz działa zarówno dla klientów prywatnych, freelancerów, jak i przedsiębiorców.</p>
          </div>
          <div>
            <label className="mb-2 block text-sm text-slate-300">Treść do analizy</label>
            <textarea name="content" rows={12} className="w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none" placeholder="Wklej opis produktu, ofertę, reklamę, landing page, bio eksperta, CV albo pomysł biznesowy." />
          </div>
        </div>
        <button className="mt-6 rounded-2xl bg-cyan-300 px-6 py-4 font-semibold text-slate-950 transition hover:opacity-90">Generuj analizę</button>
      </form>

      <section>
        <div className="mb-5 flex items-center justify-between gap-4">
          <h2 className="text-2xl font-bold text-white">Ostatnie analizy</h2>
          <span className="text-sm text-slate-400">Ostatnie 10 wyników</span>
        </div>
        <div className="space-y-4">
          {analyses?.length ? analyses.map((item) => (
            <div key={item.id} className="rounded-[28px] border border-white/10 bg-white/[0.03] p-6">
              <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
                <div className="inline-flex rounded-full border border-cyan-300/30 bg-cyan-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200">{item.analysis_type}</div>
                <div className="text-xs text-slate-500">{new Date(item.created_at).toLocaleString('pl-PL')}</div>
              </div>
              <pre className="whitespace-pre-wrap text-sm leading-7 text-slate-200">{item.result_text}</pre>
            </div>
          )) : (
            <div className="rounded-[28px] border border-white/10 bg-white/[0.03] p-6 text-slate-300">Brak analiz. Wygeneruj pierwszą, żeby pokazać użytkownikowi realną wartość produktu.</div>
          )}
        </div>
      </section>
    </main>
  );
}
